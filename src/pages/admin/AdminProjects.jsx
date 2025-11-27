import { useState, useEffect } from 'react';
import ProjectForm from '../../components/projects/ProjectForm';
import ProjectCard from '../../components/projects/ProjectCard';
import ErrorMessage from '../../components/common/ErrorMessage';
import projectService from '../../services/projectService';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // 获取所有项目（管理员视角）
  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message || 'Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 创建项目
  const handleCreateProject = async (data) => {
    try {
      await projectService.createProject(data);
      fetchProjects(); // 刷新项目列表
    } catch (err) {
      setError(err.message || 'Failed to create project');
    }
  };

  // 更新项目
  const handleUpdateProject = async (data) => {
    try {
      await projectService.updateProject(editingProject._id, data);
      setEditingProject(null); // 退出编辑模式
      fetchProjects(); // 刷新项目列表
    } catch (err) {
      setError(err.message || 'Failed to update project');
    }
  };

  // 删除项目
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        fetchProjects(); // 刷新项目列表
      } catch (err) {
        setError(err.message || 'Failed to delete project');
      }
    }
  };

  return (
    <div>
      <h2>{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
      {error && <ErrorMessage message={error} />}
      
      <ProjectForm
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        initialData={editingProject || {}}
        buttonText={editingProject ? 'Update Project' : 'Create Project'}
      />

      {editingProject && (
        <button
          onClick={() => setEditingProject(null)}
          className="btn-outline mt-4"
        >
          Cancel Edit
        </button>
      )}

      <section className="mt-12">
        <h2>Manage Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {projects.map((project) => (
            <div key={project._id} className="relative">
              <ProjectCard project={project} />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  aria-label="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}