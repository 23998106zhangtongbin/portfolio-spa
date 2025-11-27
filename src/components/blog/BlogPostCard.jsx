import { Link } from 'react-router-dom';

export default function BlogPostCard({ blog }) {
  const { _id, title, excerpt, imageUrl, createdAt } = blog;

  // 格式化日期
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="card">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover rounded mb-4"
      />
      <div className="text-gray-500 text-sm mb-2">{formattedDate}</div>
      <h3>{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <Link to={`/blog/${_id}`} className="btn-outline inline-block">
        Read More
      </Link>
    </div>
  );
}