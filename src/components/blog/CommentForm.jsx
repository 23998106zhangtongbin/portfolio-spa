import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { commentSchema } from '../../utils/validationSchemas';
import blogService from '../../services/blogService';
import ErrorMessage from '../common/ErrorMessage';

export default function CommentForm({ postId, onCommentAdded }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 表单配置
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      setLoading(true);
      await blogService.postComment(postId, data);
      onCommentAdded(); // 通知父组件刷新评论
      reset(); // 清空表单
    } catch (err) {
      setError(err.message || 'Failed to post comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <h3>Leave a Comment</h3>
      {error && <ErrorMessage message={error} />}

      <div>
        <label className="form-label" htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          className="form-input"
          {...register('name')}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          className="form-input h-32"
          {...register('comment')}
        ></textarea>
        {errors.comment && <p className="error">{errors.comment.message}</p>}
      </div>

      <button
        type="submit"
        className="btn"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}