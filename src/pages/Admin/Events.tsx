import React from 'react';
import { Link } from 'react-router-dom';
import { mockEvents } from '../../data/mockData';
import { formatDateTime } from '../../utils/formatDate';

export const AdminEvents: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Events</h2>
        <Link to="/admin/events/new" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition">
          Create Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
          <div className="text-sm text-secondary-600">UI-only list (mock data)</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead>
              <tr className="text-left text-sm text-secondary-600">
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Venue</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {mockEvents.map((e) => (
                <tr key={e._id}>
                  <td className="py-3 px-6 font-medium text-secondary-900">{e.title}</td>
                  <td className="py-3 px-6">{e.date ? formatDateTime(e.date) : 'TBD'}</td>
                  <td className="py-3 px-6">{e.venue ?? '—'}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${e.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-secondary-100 text-secondary-700'}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 space-x-2">
                    <button className="px-3 py-1 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
                      Edit (UI-only)
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
                      Delete (UI-only)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


