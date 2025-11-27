import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import CommentForm from '../components/blog/CommentForm';
import blogService from '../services/blogService';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取博客详情
  const fetchBlogDetail = async () => {
    try {
      const data = await blogService.getBlogById(id);
      setBlog(data);
    } catch (err) {
      setError(err.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  // 评论添加后刷新博客详情
  const handleCommentAdded = () => {
    fetchBlogDetail();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!blog) return <ErrorMessage message="Blog post not found" />;

  // 格式化日期
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Header />
      <main>
        <Link to="/blog" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Blog List
        </Link>

        <article className="max-w-3xl mx-auto">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <div className="text-gray-500 text-sm mb-4">{formattedDate}</div>
          <h1 className="text-4xl mb-6">{blog.title}</h1>
          <div className="text-gray-700 mb-8">
            {blog.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-lg">{paragraph}</p>
            ))}
          </div>

          {/* 评论区 */}
          <section className="mt-12">
            <h2>Comments ({blog.comments?.length || 0})</h2>
            <div className="mt-4 space-y-4">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((comment, idx) => (
                  <div key={idx} className="card">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <p className="text-gray-600">{comment.comment}</p>
                    <div className="text-gray-400 text-sm mt-2">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* 评论表单 */}
            <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}