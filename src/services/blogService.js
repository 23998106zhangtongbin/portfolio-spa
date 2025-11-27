import api from './api';

const blogService = {
  // 获取所有博客
  getAllBlogs: async () => {
    return await api.get('/blog');
  },

  // 获取单个博客
  getBlogById: async (id) => {
    return await api.get(`/blog/${id}`);
  },

  // 创建博客（管理员）
  createBlog: async (blogData) => {
    return await api.post('/blog', blogData);
  },

  // 更新博客（管理员）
  updateBlog: async (id, blogData) => {
    return await api.put(`/blog/${id}`, blogData);
  },

  // 删除博客（管理员）
  deleteBlog: async (id) => {
    return await api.delete(`/blog/${id}`);
  },

  // 发布评论
  postComment: async (postId, commentData) => {
    return await api.post(`/blog/${postId}/comments`, commentData);
  },
};

export default blogService;