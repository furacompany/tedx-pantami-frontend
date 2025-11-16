import React from 'react';
import { mockBooking } from '../../data/mockData';
import { formatDateTime } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';

export const AdminBookings: React.FC = () => {
  const rows = [mockBooking]; // UI-only example row

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Bookings</h2>
        <div className="text-sm text-secondary-600">UI-only list (mock data)</div>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead>
              <tr className="text-left text-sm text-secondary-600">
                <th className="py-3 px-6">Reference</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Event</th>
                <th className="py-3 px-6">Ticket</th>
                <th className="py-3 px-6">Qty</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {rows.map((b) => (
                <tr key={b._id}>
                  <td className="py-3 px-6 font-mono text-sm text-secondary-900">{b.reference}</td>
                  <td className="py-3 px-6">
                    <div className="text-secondary-900">{b.fullName}</div>
                    <div className="text-xs text-secondary-600">{b.email}</div>
                  </td>
                  <td className="py-3 px-6">
                    {typeof b.eventId !== 'string' ? (
                      <div>
                        <div className="text-secondary-900">{b.eventId.title}</div>
                        {b.eventId.date && (
                          <div className="text-xs text-secondary-600">{formatDateTime(b.eventId.date)}</div>
                        )}
                      </div>
                    ) : '—'}
                  </td>
                  <td className="py-3 px-6">
                    {typeof b.ticketId !== 'string' ? b.ticketId.name : '—'}
                  </td>
                  <td className="py-3 px-6">{b.quantity}</td>
                  <td className="py-3 px-6 font-medium text-secondary-900">{formatPrice(b.totalAmount)}</td>
                  <td className="py-3 px-6">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-700">
                      {b.status}
                    </span>
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


