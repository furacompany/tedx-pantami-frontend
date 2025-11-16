import React from 'react';
import { mockTickets, mockEvents } from '../../data/mockData';
import { formatPrice } from '../../utils/formatPrice';

export const AdminTickets: React.FC = () => {
  const getEventTitle = (eventId: string) => mockEvents.find(e => e._id === eventId)?.title ?? '—';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Tickets</h2>
        <button className="px-4 py-2 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
          Create Ticket (UI-only)
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
          <div className="text-sm text-secondary-600">UI-only list (mock data)</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead>
              <tr className="text-left text-sm text-secondary-600">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Event</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Available</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {mockTickets.map((t) => (
                <tr key={t._id}>
                  <td className="py-3 px-6 font-medium text-secondary-900">{t.name}</td>
                  <td className="py-3 px-6">{getEventTitle(t.eventId)}</td>
                  <td className="py-3 px-6">{formatPrice(t.price)}</td>
                  <td className="py-3 px-6">{t.availableQuantity}/{t.quantity}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-secondary-100 text-secondary-700'}`}>
                      {t.status}
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


