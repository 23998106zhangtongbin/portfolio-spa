import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import authService from '../services/authService';

// 创建Context
const AuthContext = createContext(null);

// Provider组件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化：检查是否已登录（从Cookie获取token）
  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          // 获取当前用户信息
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // 登录
  const login = async (credentials) => {
    const { token, userData } = await authService.login(credentials);
    Cookies.set('token', token, { expires: 7 }); // 7天过期
    setUser(userData);
    return userData;
  };

  // 注册
  const register = async (userData) => {
    return await authService.register(userData);
  };

  // 退出登录
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    window.location.href = '/';
  };

  // 检查是否已认证
  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 自定义Hook：方便组件使用
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};