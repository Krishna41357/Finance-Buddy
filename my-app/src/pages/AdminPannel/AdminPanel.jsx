import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Plus, LogOut, Edit, Users, X, UserPlus, Pencil } from 'lucide-react';

const AdminPanel = () => {
  const [token , setToken] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);
  const [articles, setArticles] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateArticles , setUpdateArticles] = useState({
      id: '',
  type: 'blog',
  title: '',
  url: '',
  summary: '',
  content: '',
  label: [],
  source: '',
  featuredImage: null,
  currentImage: ''
  });
  const [loading, setLoading] = useState(false);
  const articleCount = articles.length;
  const adminCount = admins.length;
 
  const [newArticle, setNewArticle] = useState({
    type: 'blog',
    title: '',
    url: '',
    summary: '',
    content: '',
    label: [],
    source: '',
    featuredImage: null
  });
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: ''
  });
useEffect(() => {
  const storedToken = sessionStorage.getItem('adminToken');
  const storedInfo = JSON.parse(sessionStorage.getItem('adminInfo'));

  if (storedToken) setToken(storedToken);
  if (storedInfo) setAdminInfo(storedInfo);

  // Only fetch if token is available
  if (storedToken) {
    fetchArticles(storedToken);
    if (storedInfo?.isRoot) {
      fetchAdmins(storedToken);
    }
  }
}, []);


  // API Base URL - Update this to match your backend
  const API_BASE = 'http://localhost:8000/api/v1';


  // Fetch all articles
  const fetchArticles = async (authToken = token) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/admin/articles`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        alert('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error while fetching articles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all admins (only for root admin)
  const fetchAdmins = async (authToken = token) => {
    if (!adminInfo?.isRoot) return;
    
    try {
      const response = await fetch(`${API_BASE}/rootAdmin/admins`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        console.error('Failed to fetch admins');
      }
    } catch (error) {
      console.error('Fetch admins error:', error);
    }
  };
fetchAdmins();
  // Add new admin (only for root admin)
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/rootAdmin/admins/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await response.json();
      
      if (response.ok) {
        setAdmins([...admins, data.admin]);
        setShowAddAdminModal(false);
        setNewAdmin({ username: '', email: '', password: '' });
        alert('Admin created successfully');
      } else {
        alert(data.message || 'Failed to create admin');
      }
    } catch (error) {
      console.error('Create admin error:', error);
      alert('Network error while creating admin');
    } finally {
      setLoading(false);
    }
  };

  // Delete admin (only for root admin)
  const handleDeleteAdmin = async (adminId) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      const response = await fetch(`${API_BASE}/rootAdmin/admins/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAdmins(admins.filter(admin => admin._id !== adminId));
        alert('Admin deleted successfully');
      } else {
        alert('Failed to delete admin');
      }
    } catch (error) {
      console.error('Delete admin error:', error);
      alert('Network error while deleting admin');
    }
  };

  // Delete article
  const handleDelete = async (articleId) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`${API_BASE}/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setArticles(articles.filter(article => article._id !== articleId));
        alert('Article deleted successfully');
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error while deleting article');
    }
  };

  // Add new article
  const handleAddArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(newArticle).forEach(key => {
      if (newArticle[key] !== null && newArticle[key] !== '') {
        formData.append(key, newArticle[key]);
      }
    });

    try {
      const response = await fetch(`${API_BASE}/admin/articles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setArticles([data.data, ...articles]);
        setShowAddModal(false);
        setNewArticle({
          type: 'blog',
          title: '',
          url: '',
          summary: '',
          content: '',
          label: [],
          source: '',
          featuredImage: null
        });
        alert('Article created successfully');
      } else {
        alert(data.message || 'Failed to create article');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('Network error while creating article');
    } finally {
      setLoading(false);
    }
  };
// update existing article 
const handleUpdate = (articleId)=>{

  const selectedArticle = articles.find(a=>a._id === articleId)
  if(selectedArticle){
    setUpdateArticles({
        id: selectedArticle._id,
      type: selectedArticle.type || 'blog',
      title: selectedArticle.title || '',
      url:  selectedArticle.url || '',
      summary:  selectedArticle.summary || '',
      content:  selectedArticle.content || '',
      label: Array.isArray(selectedArticle.label) ? selectedArticle.label : [], 
      source:  selectedArticle.source || '',
      featuredImage: null,
      currentImage:  selectedArticle.featuredImage || ''
    })
    setShowUpdateModal(true);
     

  };
};

const handleupdateArticles = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = new FormData();
  
  // Add all fields except id and currentImage
  Object.keys(updateArticles).forEach(key => {
    if (key !== "id" && key !== 'currentImage') {
      let value = updateArticles[key];
      
      // Handle different field types properly
      if (key === 'label') {
        // Ensure label is a string, not an array
        if (Array.isArray(value)) {
          value = value.filter(item => item && item.trim() !== '').join(', ');
        }
        // Only add if not empty
        if (value && value.trim() !== '') {
          formData.append(key, value);
        }
      } else if (key === 'featuredImage') {
        // Only add if a new file is selected
        if (value && value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === 'type') {
        // Always include type as it's required
        formData.append(key, value || 'blog');
      } else {
        // Add other fields if they have values
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      }
    }
  });

  try {
    const response = await fetch(`${API_BASE}/admin/articles/${updateArticles.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    
    if (response.ok) {
      // Update the articles list with the updated article
      setArticles(articles.map(article =>
        article._id === updateArticles.id ? data.data : article
      ));
      
      setShowUpdateModal(false);
      setUpdateArticles({
        id: '',
        type: 'blog',
        title: '',
        url: '',
        summary: '',
        content: '',
        label: [],
        source: '',
        featuredImage: null,
        currentImage: ''
      });
      alert('Article updated successfully');
    } else {
      alert(data.message || 'Failed to update article');
    }
  } catch (error) {
    console.error('Update error:', error);
    alert('Network error while updating article');
  } finally {
    setLoading(false);
  }
};

  // Logout
const handleLogout = () => {
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminInfo');
  setToken('');
  setAdminInfo(null);
  setArticles([]);
  setAdmins([]);
};


  // Login Form Component
  

  // Main Admin Dashboard
return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex">
    {/* Left Sidebar - Admins List (only for root admin) */}
    {adminInfo?.isRoot && (
      <div className="w-64 bg-white shadow-lg border-r border-green-100">
        <div className="p-4 border-b border-green-100 bg-gradient-to-r from-green-500 to-emerald-500">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users size={20} />
              Admins ({adminCount})
            </h2>
            <button
              onClick={() => setShowAddAdminModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200"
              title="Add Admin"
            >
              <UserPlus size={16} />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          {admins.map((admin) => (
            <div key={admin._id} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200">
              <div>
                <div className="font-medium text-gray-900">
                  {admin.username}
                  {admin.isRoot && (
                    <span className="ml-2 px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-xs rounded-full border border-emerald-200">
                      Root
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{admin.email}</div>
              </div>
              {!admin.isRoot && (
                <button
                  onClick={() => handleDeleteAdmin(admin._id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                  title="Delete Admin"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="text-sm bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-100 text-black">
                Welcome, <span className="font-medium text-green-800">{adminInfo?.username}</span>
                {adminInfo?.isRoot && (
                  <span className="ml-2 px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-xs rounded-full border border-emerald-200">
                    Root Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Feeds Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <span className='text-black text-xl font-[700] text-green-600'>
            Total available articles : ({articleCount})
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchArticles()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Get All Feeds
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus size={16} />
              Add Article
            </button>
          </div>
        </div>
        
        <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid gap-6">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300">
                <div className="flex">
                  {/* Image Section */}
                  <div className="w-80 h-60 bg-gradient-to-br from-green-100 to-emerald-100 flex-shrink-0">
                    {article.featuredImage ? (
                      <img
                        src={`${API_BASE.replace('/api/v1', '')}/${article.featuredImage}`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <span className="text-green-600 font-medium">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                            article.type === 'blog' 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                              : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {article.type}
                          </span>
                         {Array.isArray(article.label) && article.label.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                        {article.label.map((lbl, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                          >
                            {lbl}
                          </span>
                            ))}
                         </div>
                        )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-left leading-tight">
                          {article.title || 'Untitled Article'}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-left leading-relaxed">
                          {article.summary || 'No summary available'}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 ml-4">
                        {article.url && (
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-blue-200"
                            title="View Article"
                          >
                            <Eye size={16} />
                          </a>
                        )}
                        <button
                          onClick={() => handleUpdate(article._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 border border-green-200"
                          title="Edit Article"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200"
                          title="Delete Article"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-green-50">
                      <div className="flex items-center gap-4">
                        {article.source && (
                          <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">
                            Source: {article.source}
                          </span>
                        )}
                        <span className="text-gray-600">
                          {new Date(article.scrapedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium hover:underline transition-all duration-200"
                        >
                          Read More →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {articles.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-green-600" />
                </div>
                <p className="text-gray-500 text-lg mb-2">No articles found</p>
                <p className="text-gray-400">Click "Get All Feeds" to load articles or add a new article</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>

    {/* Add Article Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto border border-green-100">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-green-100">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Add New Article
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    value={newArticle.type}
                    onChange={(e) => setNewArticle({...newArticle, type: e.target.value})}
                  >
                    <option value="blog">Blog</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                 <select
  multiple
  value={newArticle.label}
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setNewArticle(prev => ({ ...prev, label: selectedOptions }));
  }}
  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
>
  {[
    'Personal Finance',
    'Loans and Credit',
    'Cryptocurrency',
    'Equity and Stock Market',
    'Retirement Planning',
    'Gold and Commodities',
    'Mutual Funds and SIPs',
    'Other'
  ].map(label => (
    <option key={label} value={label}>{label}</option>
  ))}
</select>

                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newArticle.url}
                  onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newArticle.source}
                  onChange={(e) => setNewArticle({...newArticle, source: e.target.value})}
                  placeholder="Source name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle({...newArticle, summary: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={(e) => setNewArticle({...newArticle, featuredImage: e.target.files[0]})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-green-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddArticle}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {loading ? 'Creating...' : 'Create Article'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Update Article Modal */}
    {showUpdateModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto border border-green-100">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-green-100">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Update Article
              </h2>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={updateArticles.title}
                  onChange={(e) => setUpdateArticles({...updateArticles, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    value={updateArticles.type}
                    onChange={(e) => setUpdateArticles({...updateArticles, type: e.target.value})}
                  >
                    <option value="blog">Blog</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <select
  multiple
  value={updateArticles.label}
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setUpdateArticles(prev => ({ ...prev, label: selectedOptions }));
  }}
  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
>
  {[
    'Personal Finance',
    'Loans and Credit',
    'Cryptocurrency',
    'Equity and Stock Market',
    'Retirement Planning',
    'Gold and Commodities',
    'Mutual Funds and SIPs',
    'Other'
  ].map(label => (
    <option key={label} value={label}>{label}</option>
  ))}
</select>

                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={updateArticles.url}
                  onChange={(e) => setUpdateArticles({...updateArticles, url: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={updateArticles.source}
                  onChange={(e) => setUpdateArticles({...updateArticles, source: e.target.value})}
                  placeholder="Source name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={updateArticles.summary}
                  onChange={(e) => setUpdateArticles({...updateArticles, summary: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  value={updateArticles.content}
                  onChange={(e) => setUpdateArticles({...updateArticles, content: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={(e) => setUpdateArticles({...updateArticles, featuredImage: e.target.files[0]})}
                  />
                  {updateArticles.currentImage && (
                    <p className="text-sm text-gray-600 mt-2">
                      Current image: {updateArticles.currentImage}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-green-100">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleupdateArticles}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {loading ? 'Updating...' : 'Update Article'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )}

    {/* Add Admin Modal */}
    {showAddAdminModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full m-4 border border-green-100">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-green-100">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Add New Admin
              </h2>
              <button
                onClick={() => setShowAddAdminModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-green-100">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {loading ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default AdminPanel;