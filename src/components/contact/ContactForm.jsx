import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '../../utils/validationSchemas';
import contactService from '../../services/contactService';
import ErrorMessage from '../common/ErrorMessage';

export default function ContactForm() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // 表单配置
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      await contactService.sendMessage(data);
      setSuccess('Your message has been sent successfully! I will get back to you soon.');
      reset(); // 清空表单
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card max-w-2xl mx-auto">
      <h2 className="text-center">Contact Me</h2>
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

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
        <label className="form-label" htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          {...register('email')}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          className="form-input"
          {...register('subject')}
        />
        {errors.subject && <p className="error">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          className="form-input h-48"
          {...register('message')}
        ></textarea>
        {errors.message && <p className="error">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}