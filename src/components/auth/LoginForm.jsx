import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../context/AuthContext';
import ErrorMessage from '../common/ErrorMessage';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();

  // 表单配置
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      await login(data);
      // 登录成功后自动跳转首页
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card max-w-md mx-auto">
      <h2 className="text-center">Login</h2>
      {error && <ErrorMessage message={error} />}
      
      <div>
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          {...register('email')}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-input"
          {...register('password')}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}