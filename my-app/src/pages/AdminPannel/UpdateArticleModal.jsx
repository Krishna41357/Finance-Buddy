// components/UpdateArticleModal.js
import React from 'react';

const UpdateArticleModal = ({ isOpen, onClose, updateArticles, setUpdateArticles, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage') {
      setUpdateArticles({ ...updateArticles, [name]: files[0] });
    } else {
      setUpdateArticles({ ...updateArticles, [name]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">Update Article</h2>

        {['title', 'url', 'summary', 'source'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={updateArticles[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        ))}

        <textarea
          name="content"
          placeholder="Content"
          value={updateArticles.content}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 h-32"
          required
        />

        <input
          name="label"
          placeholder="Comma-separated labels"
          value={updateArticles.label.join(', ')}
          onChange={(e) =>
            setUpdateArticles({ ...updateArticles, label: e.target.value.split(',').map((l) => l.trim()) })
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

        {updateArticles.currentImage && (
          <img
            src={updateArticles.currentImage}
            alt="Current Featured"
            className="w-32 h-auto rounded border"
          />
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {loading ? 'Updating...' : 'Update Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticleModal;
