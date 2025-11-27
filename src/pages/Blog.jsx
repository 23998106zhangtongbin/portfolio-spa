import { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BlogPostCard from '../components/blog/BlogPostCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import blogService from '../services/blogService';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取所有博客
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        // 按创建时间排序（最新在前）
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(data);
      } catch (err) {
        setError(err.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Header />
      <main>
        <h1>Blog Posts</h1>
        {blogs.length === 0 ? (
          <p className="text-gray-600">No blog posts found. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogPostCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}