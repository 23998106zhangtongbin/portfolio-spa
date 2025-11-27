import { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import AdminProjects from './AdminProjects';
import AdminBlog from './AdminBlog';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <>
      <Header />
      <main>
        <h1>Admin Dashboard</h1>
        
        {/* 标签切换 */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'projects' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'blog' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            Manage Blog
          </button>
        </div>

        {/* 内容区域 */}
        {activeTab === 'projects' ? <AdminProjects /> : <AdminBlog />}
      </main>
      <Footer />
    </>
  );
}