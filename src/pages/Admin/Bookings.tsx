import React, { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { listAdminBookings } from '../../api/bookings';
import type { Booking } from '../../types';
import { listAdminEvents } from '../../api/events';
import { listAdminTickets } from '../../api/tickets';
import type { Event, Ticket } from '../../types';

export const AdminBookings: React.FC = () => {
  const [rows, setRows] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [email, setEmail] = useState('');
  const [eventId, setEventId] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchBookings = async (opts?: { page?: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listAdminBookings({
        page: opts?.page ?? page,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        search: search.trim() || undefined,
        status: (status as any) || '',
        email: email.trim() || undefined,
        eventId: eventId || undefined,
        ticketId: ticketId || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      setRows(res.data);
      setTotalPages(res.pagination?.totalPages ?? 1);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load bookings';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // preload filters
    (async () => {
      try {
        const [ev, tk] = await Promise.all([
          listAdminEvents({ page: 1, limit: 100, sortBy: 'date', sortOrder: 'desc', status: '' }),
          listAdminTickets({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' }),
        ]);
        setEvents(ev.data);
        setTickets(tk.data);
      } catch {}
    })();
    fetchBookings({ page: 1 });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, email, eventId, ticketId, dateFrom, dateTo]);

  // When event filter changes, update tickets filter options to only that event
  useEffect(() => {
    (async () => {
      try {
        if (eventId) {
          const tk = await listAdminTickets({ page: 1, limit: 200, eventId, sortBy: 'createdAt', sortOrder: 'desc' });
          setTickets(tk.data);
        } else {
          const tk = await listAdminTickets({ page: 1, limit: 200, sortBy: 'createdAt', sortOrder: 'desc' });
          setTickets(tk.data);
        }
      } catch {}
    })();
  }, [eventId]);
  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Bookings</h2>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      <div className="bg-white rounded-xl shadow-soft p-4 grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone or email"
          className="w-full border border-secondary-300 rounded-lg px-3 py-2"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Filter by email"
          className="w-full border border-secondary-300 rounded-lg px-3 py-2"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
          <option value="">All events</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>{ev.title}</option>
          ))}
        </select>
        <select value={ticketId} onChange={(e) => setTicketId(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
          <option value="">All tickets</option>
          {tickets.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-secondary-600">Page {page} of {totalPages}</div>
        <div className="space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 py-2 rounded-lg border border-secondary-300 text-secondary-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};


