import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../context/AuthContext';
import ErrorMessage from '../common/ErrorMessage';

export default function RegisterForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register: registerUser, loading } = useAuth();

  // 表单配置
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setSuccess('Registration successful! You can now login.');
      // 清空表单
      document.querySelector('form').reset();
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card max-w-md mx-auto">
      <h2 className="text-center">Register</h2>
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div>
        <label className="form-label" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="form-input"
          {...register('name')}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

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

      <div>
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-input"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}