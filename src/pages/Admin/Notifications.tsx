import React, { useEffect, useState } from 'react';
import { createNotification, deleteNotification, getActiveNotification, listNotifications, updateNotification } from '../../api/notifications';
import type { NotificationData } from '../../types';

export const AdminNotifications: React.FC = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [active, setActive] = useState<NotificationData | null>(null);
  const [all, setAll] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const [activeRes, allRes] = await Promise.all([getActiveNotification(), listNotifications()]);
      setActive(activeRes.data);
      setAll(allRes.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load notifications';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!message.trim()) return;
    (async () => {
      try {
        await createNotification({ message, status });
        setMessage('');
        setStatus('active');
        await fetchNotifications();
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Failed to save notification';
        setError(msg);
      }
    })();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-secondary-900">Notifications</h2>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="font-display text-lg font-semibold text-secondary-900 mb-4">Active Notification</h3>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        {loading ? <p className="text-secondary-600">Loading...</p> : (
          active ? (
            <div className="flex items-center justify-between">
              <p className="text-secondary-800">{active.message}</p>
              <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700">active</span>
            </div>
          ) : (
            <p className="text-secondary-600">No active notification</p>
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-secondary-900">Create Notification</h3>
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
          Save
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-soft p-6 space-y-3">
        <h3 className="font-display text-lg font-semibold text-secondary-900">All Notifications</h3>
        {loading ? <p className="text-secondary-600">Loading...</p> : (
          <ul className="divide-y divide-secondary-200">
            {all.length === 0 && <li className="py-3 text-secondary-600">No notifications</li>}
            {all.map((n) => (
              <li key={n._id} className="py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-secondary-900">{n.message}</div>
                  <div className="text-xs text-secondary-600">{n.status}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await updateNotification(n._id, { status: n.status === 'active' ? 'inactive' : 'active' });
                        await fetchNotifications();
                      } catch (err: any) {
                        alert(err?.response?.data?.message || 'Failed to update');
                      }
                    }}
                    className="px-3 py-1 rounded-lg bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition"
                  >
                    {n.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={async () => {
                      if (!confirm('Delete this notification?')) return;
                      try {
                        await deleteNotification(n._id);
                        await fetchNotifications();
                      } catch (err: any) {
                        alert(err?.response?.data?.message || 'Failed to delete');
                      }
                    }}
                    className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


