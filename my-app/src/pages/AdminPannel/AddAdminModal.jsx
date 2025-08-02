// components/AddAdminModal.js
import React from 'react';

const AddAdminModal = ({ isOpen, onClose, newAdmin, setNewAdmin, onSubmit, loading }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg w-full max-w-lg space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800">Add New Admin</h2>

        <input
          name="username"
          placeholder="Username"
          value={newAdmin.username}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
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
            {loading ? 'Creating...' : 'Create Admin'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminModal;
