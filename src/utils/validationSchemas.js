import * as yup from 'yup';

// 登录表单验证
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// 注册表单验证
export const registerSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

// 项目表单验证
export const projectSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  imageUrl: yup.string().url('Invalid URL').required('Image URL is required'),
  link: yup.string().url('Invalid URL').required('Project link is required'),
});

// 博客表单验证
export const blogSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  excerpt: yup.string().required('Excerpt is required').max(200, 'Excerpt must be less than 200 characters'),
  imageUrl: yup.string().url('Invalid URL').required('Image URL is required'),
});

// 评论表单验证
export const commentSchema = yup.object({
  name: yup.string().required('Name is required'),
  comment: yup.string().required('Comment is required').min(10, 'Comment must be at least 10 characters'),
});

// 联系表单验证
export const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(20, 'Message must be at least 20 characters'),
});