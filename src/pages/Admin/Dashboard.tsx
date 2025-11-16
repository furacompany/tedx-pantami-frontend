import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/Shared/Button';
import { formatDateTime } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';
import { listAdminEvents } from '../../api/events';
import { listAdminTickets } from '../../api/tickets';
import { listAdminBookings } from '../../api/bookings';
import type { Event, Ticket, Booking } from '../../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ev, tk, bk] = await Promise.all([
          listAdminEvents({ page: 1, limit: 100, sortBy: 'date', sortOrder: 'asc' }),
          listAdminTickets({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' }),
          listAdminBookings({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' }),
        ]);
        setEvents(ev.data);
        setTickets(tk.data);
        setBookings(bk.data);
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Failed to load dashboard data';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const totalEvents = events.length;
  const activeEvents = useMemo(() => events.filter((e) => e.status === 'active').length, [events]);
  const totalTickets = tickets.length;
  const activeTickets = useMemo(() => tickets.filter((t) => t.status === 'active').length, [tickets]);
  const totalAvailable = useMemo(() => tickets.reduce((sum, t) => sum + (t.availableQuantity ?? 0), 0), [tickets]);

  // Next upcoming event
  const upcomingEvent = useMemo(() => {
    return [...events]
      .filter((e) => e.status === 'active' && e.date)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())[0];
  }, [events]);

  const recentBooking = bookings[0];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Admin Header */}
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-primary-500">
                TEDxPantami Admin
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {error && <div className="mb-6 text-sm text-red-600">{error}</div>}
        {/* Overview Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Total Events</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{loading ? '—' : totalEvents}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">{loading ? '—' : `${activeEvents} active`}</p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Tickets</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{loading ? '—' : totalTickets}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A2 2 0 0122 9.528V17a2 2 0 01-2 2H9m6-9v10M9 19H5a2 2 0 01-2-2v-7.472a2 2 0 011.447-1.804L9 6m0 13V6m0 0l6 4" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">{loading ? '—' : `${activeTickets} active`}</p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Available Tickets</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{loading ? '—' : totalAvailable}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">Across active tickets</p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Next Event</p>
                <p className="mt-2 font-display text-xl font-semibold text-secondary-900">
                  {loading ? '—' : (upcomingEvent ? upcomingEvent.title : '—')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">
              {loading ? '—' : (upcomingEvent && upcomingEvent.date ? formatDateTime(upcomingEvent.date) : 'TBD')}
            </p>
          </div>
        </section>

        {/* Two-column layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Booking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-secondary-900">Recent Booking</h3>
              </div>
              <div className="p-6">
                {recentBooking ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary-200">
                      <thead>
                        <tr className="text-left text-sm text-secondary-600">
                          <th className="py-2 pr-4">Reference</th>
                          <th className="py-2 pr-4">Customer</th>
                          <th className="py-2 pr-4">Event</th>
                          <th className="py-2 pr-4">Ticket</th>
                          <th className="py-2 pr-4">Qty</th>
                          <th className="py-2 pr-4">Total</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-secondary-100">
                        <tr>
                          <td className="py-3 pr-4 font-mono text-sm text-secondary-900">{recentBooking.reference}</td>
                          <td className="py-3 pr-4">
                            <div className="text-secondary-900">{recentBooking.fullName}</div>
                            <div className="text-xs text-secondary-600">{recentBooking.email}</div>
                          </td>
                          <td className="py-3 pr-4">
                            {recentBooking.eventId && typeof recentBooking.eventId !== 'string' ? (
                              <div>
                                <div className="text-secondary-900">{recentBooking.eventId.title}</div>
                                {recentBooking.eventId.date && (
                                  <div className="text-xs text-secondary-600">
                                    {formatDateTime(recentBooking.eventId.date)}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-secondary-700">—</span>
                            )}
                          </td>
                          <td className="py-3 pr-4">
                            {recentBooking.ticketId && typeof recentBooking.ticketId !== 'string' ? (
                              <div className="text-secondary-900">{recentBooking.ticketId.name}</div>
                            ) : (
                              <span className="text-secondary-700">—</span>
                            )}
                          </td>
                          <td className="py-3 pr-4">{recentBooking.quantity}</td>
                          <td className="py-3 pr-4 font-medium text-secondary-900">{formatPrice(recentBooking.totalAmount)}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              {recentBooking.status}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-secondary-600">No recent bookings</div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions / Shortcuts */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-200">
                <h3 className="font-display text-lg font-semibold text-secondary-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Link to="/admin/events/new" className="block">
                  <Button variant="primary" className="w-full">
                    Create Event
                  </Button>
                </Link>
                <Link to="/admin/tickets" className="block">
                  <Button variant="outline" className="w-full">
                    Manage Tickets
                  </Button>
                </Link>
                <Link to="/admin/notifications" className="block">
                  <Button variant="outline" className="w-full">
                    Manage Notifications
                  </Button>
                </Link>
              </div>
            </div>

            {/* Removed Active Events card as requested */}
          </div>
        </section>
      </main>
    </div>
  );
};

