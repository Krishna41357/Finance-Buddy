// 3. Updated AdminEditContentPage.jsx with inline editing in Features section too

import React, { useEffect, useState } from 'react';
import AdminBeforeLogin from './Preview/AdminBeforeLogin';
// import AdminFeatures from '../landingPage/AdminFeatures';
const BASE_API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const FETCH_API = `${BASE_API}/api/v1/content`;
const UPDATE_API = `${BASE_API}/api/v1/content/update`;  

const AdminEditContentPage = () => {
  const [draftContentMap, setDraftContentMap] = useState({});
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await fetch(FETCH_API);
        const data = await res.json();
        const map = {};
        if (Array.isArray(data)) {
          data.forEach(item => {
            map[item.key] = item.content;
          });
        }
        setDraftContentMap(map);
      } catch (err) {
        console.warn('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handlePublish = async () => {
    setStatus('saving');
    try {
      const updates = Object.entries(draftContentMap).map(([key, content]) => ({ key, content }));
      const res = await fetch(UPDATE_API, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Publish failed');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (err) {
      console.error('Publish error:', err.message);
      setStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen text-black flex justify-center items-center text-lg">Loading content...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-[600] font-semibold text-green-600">Live Inline Editor</h1>
        <button
          onClick={handlePublish}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
        >
          Publish Changes
        </button>
      </div>

      {status === 'saving' && <p className="text-blue-600">Saving...</p>}
      {status === 'success' && <p className="text-green-600">Published successfully!</p>}
      {status === 'error' && <p className="text-red-600">Failed to publish.</p>}

      <div className="bg-white rounded-lg shadow-sm p-4">
        <AdminBeforeLogin content={draftContentMap} setContent={setDraftContentMap} />
        {/* <AdminFeatures content={draftContentMap} setContent={setDraftContentMap} /> */}
      </div>
    </div>
  );
};

export default AdminEditContentPage;
