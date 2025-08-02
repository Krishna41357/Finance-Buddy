// AddArticleModal.js
import React from 'react';

const AddArticleModal = ({ isOpen, onClose, newArticle, setNewArticle, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage') {
      setNewArticle({ ...newArticle, [name]: files[0] });
    } else {
      setNewArticle({ ...newArticle, [name]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">Add New Article</h2>

        {['title', 'url', 'summary', 'source'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={newArticle[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        ))}

        <textarea
          name="content"
          placeholder="Content"
          value={newArticle.content}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 h-32"
          required
        />

        <input
          name="label"
          placeholder="Comma-separated labels"
          value={newArticle.label}
          onChange={(e) =>
            setNewArticle({ ...newArticle, label: e.target.value.split(',').map((l) => l.trim()) })
          }
          className="w-full border border-gray-300 rounded p-2"
        />

        <input
          type="file"
          name="featuredImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? 'Saving...' : 'Add Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticleModal;
