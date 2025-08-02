import React from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';

const AdminsList = ({ admins, onAddAdmin, onDeleteAdmin }) => {
  const adminCount = admins.length;

  return (
    <div className="w-64 bg-white shadow-lg border-r border-green-100">
      <div className="p-4 border-b border-green-100 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users size={20} />
            Admins ({adminCount})
          </h2>
          <button
            onClick={onAddAdmin}
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200"
            title="Add Admin"
          >
            <UserPlus size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
        {admins.map((admin) => (
          <div 
            key={admin._id} 
            className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-200"
          >
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
                onClick={() => onDeleteAdmin(admin._id)}
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
  );
};

export default AdminsList;