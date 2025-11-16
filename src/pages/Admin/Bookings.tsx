import React, { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { listAdminBookings } from '../../api/bookings';
import type { Booking } from '../../types';

export const AdminBookings: React.FC = () => {
  const [rows, setRows] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listAdminBookings({ page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' });
      setRows(res.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load bookings';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Bookings</h2>
        {error && <div className="text-sm text-red-600">{error}</div>}
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
              {isLoading && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={7}>Loading bookings...</td>
                </tr>
              )}
              {!isLoading && rows.length === 0 && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={7}>No bookings found</td>
                </tr>
              )}
              {rows.map((b) => (
                <tr key={b._id}>
                  <td className="py-3 px-6 font-mono text-sm text-secondary-900">{b.reference}</td>
                  <td className="py-3 px-6">
                    <div className="text-secondary-900">{b.fullName}</div>
                    <div className="text-xs text-secondary-600">{b.email}</div>
                  </td>
                  <td className="py-3 px-6">
                    {b.eventId && typeof b.eventId !== 'string' ? (
                      <div>
                        <div className="text-secondary-900">{b.eventId.title}</div>
                        {b.eventId.date && (
                          <div className="text-xs text-secondary-600">{formatDateTime(b.eventId.date)}</div>
                        )}
                      </div>
                    ) : '—'}
                  </td>
                  <td className="py-3 px-6">
                    {b.ticketId && typeof b.ticketId !== 'string' ? b.ticketId.name : '—'}
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


