// Improved AdminPanel.jsx with full sliding sidebar across all screen sizes

import React, { useState, useEffect } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import AdminsList from './AdminsList';
import ArticlesList from './ArticlesList';
import AddArticleModal from './AddArticleModal';
import UpdateArticleModal from './UpdateArticleModal';
import AddAdminModal from './AddAdminModal';
import AdminEditContentPage from './AdminEditContentPage';

const AdminPanel = () => {
  const [token, setToken] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [activeTab, setActiveTab] = useState('articles');
  const [showSidebar, setShowSidebar] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [updateArticles, setUpdateArticles] = useState({
    id: '', type: 'blog', title: '', url: '', summary: '',
    content: '', label: [], source: '', featuredImage: null, currentImage: ''
  });

  const [newArticle, setNewArticle] = useState({
    type: 'blog', title: '', url: '', summary: '', content: '', label: [], source: '', featuredImage: null
  });

  const [newAdmin, setNewAdmin] = useState({
    username: '', email: '', password: ''
  });

  const [loading, setLoading] = useState(false);
  const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const storedToken = sessionStorage.getItem('adminToken');
    const storedInfo = JSON.parse(sessionStorage.getItem('adminInfo'));
    if (storedToken) setToken(storedToken);
    if (storedInfo) setAdminInfo(storedInfo);
    if (storedToken) {
      fetchArticles(storedToken);
      if (storedInfo?.isRoot) fetchAdmins(storedToken);
    }
  }, []);

  const fetchArticles = async (authToken = token) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/api/v1/admin/articles`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok) setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async (authToken = token) => {
    if (!adminInfo?.isRoot) return;
    try {
      const response = await fetch(`${BASE_API}/api/v1/rootAdmin/admins`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      const data = await response.json();
      if (response.ok) setAdmins(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminInfo');
    setToken('');
    setAdminInfo(null);
    setArticles([]);
    setAdmins([]);
  };

  const handleDelete = async (articleId) => {
    if (!confirm('Delete this article?')) return;
    try {
      const response = await fetch(`${BASE_API}/api/v1/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) setArticles(articles.filter(a => a._id !== articleId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (articleId) => {
    const selected = articles.find(a => a._id === articleId);
    if (selected) {
      setUpdateArticles({
        id: selected._id,
        type: selected.type || 'blog',
        title: selected.title || '',
        url: selected.url || '',
        summary: selected.summary || '',
        content: selected.content || '',
        label: Array.isArray(selected.label) ? selected.label : [],
        source: selected.source || '',
        featuredImage: null,
        currentImage: selected.featuredImage || ''
      });
      setShowUpdateModal(true);
    }
  };

  const handleUpdateArticles = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(updateArticles).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'currentImage' && value) {
        formData.append(key, Array.isArray(value) ? value.join(', ') : value);
      }
    });

    try {
      const response = await fetch(`${BASE_API}/api/v1/admin/articles/${updateArticles.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setArticles(articles.map(a => a._id === updateArticles.id ? data.data : a));
        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(newArticle).forEach(([k, v]) => v && formData.append(k, v));

    try {
      const res = await fetch(`${BASE_API}/api/v1/admin/articles`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setArticles([data.data, ...articles]);
        setShowAddModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API}/api/v1/rootAdmin/admins/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        setAdmins([...admins, data.admin]);
        setShowAddAdminModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Delete admin?')) return;
    try {
      const res = await fetch(`${BASE_API}/api/v1/rootAdmin/admins/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setAdmins(admins.filter(a => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-40 w-64 bg-white border-r border-green-100 shadow-md transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-green-100">
          <h2 className="text-lg font-semibold text-emerald-700">Admin Menu</h2>
          <button className="lg:hidden" onClick={() => setShowSidebar(false)}>
            <X className="text-emerald-700" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-2">
          <button onClick={() => { setActiveTab('articles'); setShowSidebar(false); }} className={`px-4 py-2 rounded-lg text-left ${activeTab === 'articles' ? 'bg-emerald-100 font-semibold text-emerald-700' : 'hover:bg-emerald-50 text-gray-700'}`}>📄 Articles</button>
          {adminInfo?.isRoot && (
            <button onClick={() => { setActiveTab('admins'); setShowSidebar(false); }} className={`px-4 py-2 rounded-lg text-left ${activeTab === 'admins' ? 'bg-emerald-100 font-semibold text-emerald-700' : 'hover:bg-emerald-50 text-gray-700'}`}>👤 Admins</button>
          )}
          <button onClick={() => { setActiveTab('editContent'); setShowSidebar(false); }} className={`px-4 py-2 rounded-lg text-left ${activeTab === 'editContent' ? 'bg-emerald-100 font-semibold text-emerald-700' : 'hover:bg-emerald-50 text-gray-700'}`}>✏️ Edit Content</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-green-100">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSidebar(!showSidebar)} className="text-emerald-600">
                <Menu />
              </button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-800 bg-green-50 px-3 py-1 rounded-md">Welcome, <strong>{adminInfo?.username}</strong>{adminInfo?.isRoot && <span className="ml-2 text-xs bg-green-100 text-emerald-700 px-2 py-0.5 rounded-full">Root</span>}</span>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4">
          {activeTab === 'editContent' && <AdminEditContentPage />}
          {activeTab === 'articles' && (
            <ArticlesList
              articles={articles}
              loading={loading}
              onRefresh={fetchArticles}
              onAddArticle={() => setShowAddModal(true)}
              onUpdateArticle={handleUpdate}
              onDeleteArticle={handleDelete}
              apiBase={BASE_API}
            />
          )}
          {activeTab === 'admins' && adminInfo?.isRoot && (
            <AdminsList
              admins={admins}
              onDeleteAdmin={handleDeleteAdmin}
              onAddAdmin={() => setShowAddAdminModal(true)}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {showAddModal && <AddArticleModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} newArticle={newArticle} setNewArticle={setNewArticle} onSubmit={handleAddArticle} loading={loading} />}
      {showUpdateModal && <UpdateArticleModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} updateArticles={updateArticles} setUpdateArticles={setUpdateArticles} onSubmit={handleUpdateArticles} loading={loading} />}
      {showAddAdminModal && <AddAdminModal isOpen={showAddAdminModal} onClose={() => setShowAddAdminModal(false)} newAdmin={newAdmin} setNewAdmin={setNewAdmin} onSubmit={handleAddAdmin} loading={loading} />}
    </div>
  );
};

export default AdminPanel;
