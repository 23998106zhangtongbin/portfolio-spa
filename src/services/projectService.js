import api from './api';

const projectService = {
  // 获取所有项目
  getAllProjects: async () => {
    return await api.get('/projects');
  },

  // 获取单个项目
  getProjectById: async (id) => {
    return await api.get(`/projects/${id}`);
  },

  // 创建项目（管理员）
  createProject: async (projectData) => {
    return await api.post('/projects', projectData);
  },

  // 更新项目（管理员）
  updateProject: async (id, projectData) => {
    return await api.put(`/projects/${id}`, projectData);
  },

  // 删除项目（管理员）
  deleteProject: async (id) => {
    return await api.delete(`/projects/${id}`);
  },
};

export default projectService;