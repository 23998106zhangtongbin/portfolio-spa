import { useState, useEffect } from 'react';
import BlogPostForm from '../../components/blog/BlogPostForm';
import BlogPostCard from '../../components/blog/BlogPostCard';
import ErrorMessage from '../../components/common/ErrorMessage';
import blogService from '../../services/blogService';

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // 获取所有博客（管理员视角）
  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err.message || 'Failed to load blog posts');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 创建博客
  const handleCreateBlog = async (data) => {
    try {
      await blogService.createBlog(data);
      fetchBlogs(); // 刷新博客列表
    } catch (err) {
      setError(err.message || 'Failed to create blog post');
    }
  };

  // 更新博客
  const handleUpdateBlog = async (data) => {
    try {
      await blogService.updateBlog(editingBlog._id, data);
      setEditingBlog(null); // 退出编辑模式
      fetchBlogs(); // 刷新博客列表
    } catch (err) {
      setError(err.message || 'Failed to update blog post');
    }
  };

  // 删除博客
  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        fetchBlogs(); // 刷新博客列表
      } catch (err) {
        setError(err.message || 'Failed to delete blog post');
      }
    }
  };

  return (
    <div>
      <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
      {error && <ErrorMessage message={error} />}
      
      <BlogPostForm
        onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
        initialData={editingBlog || {}}
        buttonText={editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
      />

      {editingBlog && (
        <button
          onClick={() => setEditingBlog(null)}
          className="btn-outline mt-4"
        >
          Cancel Edit
        </button>
      )}

      <section className="mt-12">
        <h2>Manage Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="relative">
              <BlogPostCard blog={blog} />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  aria-label="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}