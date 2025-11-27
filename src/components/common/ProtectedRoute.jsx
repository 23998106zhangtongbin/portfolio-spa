import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  // 未认证则跳转登录页
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}