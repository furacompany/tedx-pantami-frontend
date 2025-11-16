import React from 'react';

export const AdminProfile: React.FC = () => {
  // UI-only placeholder
  const admin = {
    name: 'Admin Name',
    email: 'admin@tedxpantami.com',
    role: 'admin',
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-secondary-900">Profile</h2>

      <div className="bg-white rounded-xl shadow-soft p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
          <input value={admin.name} readOnly className="w-full border border-secondary-300 rounded-lg px-3 py-2 bg-secondary-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
          <input value={admin.email} readOnly className="w-full border border-secondary-300 rounded-lg px-3 py-2 bg-secondary-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
          <input value={admin.role} readOnly className="w-full border border-secondary-300 rounded-lg px-3 py-2 bg-secondary-50" />
        </div>
        <div className="pt-2">
          <button className="px-4 py-2 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
            Update Profile (UI-only)
          </button>
        </div>
      </div>
    </div>
  );
};


