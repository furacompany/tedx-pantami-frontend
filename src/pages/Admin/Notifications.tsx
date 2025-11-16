import React, { useState } from 'react';
import { mockNotification } from '../../data/mockData';

export const AdminNotifications: React.FC = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('UI-only: Notification would be created/updated.');
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-secondary-900">Notifications</h2>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="font-display text-lg font-semibold text-secondary-900 mb-4">Active Notification</h3>
        {mockNotification ? (
          <div className="flex items-center justify-between">
            <p className="text-secondary-800">{mockNotification.message}</p>
            <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700">active</span>
          </div>
        ) : (
          <p className="text-secondary-600">No active notification</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-secondary-900">Create/Update Notification (UI-only)</h3>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Message</label>
          <input value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition">
          Save (UI-only)
        </button>
      </form>
    </div>
  );
};


