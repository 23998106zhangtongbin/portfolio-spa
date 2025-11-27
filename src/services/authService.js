import api from './api';

const authService = {
  // 登录
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return {
      token: response.token,
      userData: response.user,
    };
  },

  // 注册
  register: async (userData) => {
    return await api.post('/users/register', userData);
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    return await api.get('/users/me');
  },
};

export default authService;