export default function ProjectCard({ project }) {
  const { title, description, imageUrl, link } = project;

  return (
    <div className="card">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3>{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-outline inline-block"
      >
        View Project
      </a>
    </div>
  );
}