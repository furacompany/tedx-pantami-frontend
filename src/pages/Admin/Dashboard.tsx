import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Shared/Button';
import { mockEvents, mockTickets, mockBooking } from '../../data/mockData';
import { formatDateTime } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Derived stats (UI-only using mock data)
  const totalEvents = mockEvents.length;
  const activeEvents = mockEvents.filter((e) => e.status === 'active').length;
  const totalTickets = mockTickets.length;
  const activeTickets = mockTickets.filter((t) => t.status === 'active').length;
  const totalAvailable = mockTickets.reduce((sum, t) => sum + (t.availableQuantity ?? 0), 0);

  // Next upcoming event
  const upcomingEvent = [...mockEvents]
    .filter((e) => e.status === 'active' && e.date)
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())[0];

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
        {/* Overview Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Total Events</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{totalEvents}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">{activeEvents} active</p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Tickets</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{totalTickets}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A2 2 0 0122 9.528V17a2 2 0 01-2 2H9m6-9v10M9 19H5a2 2 0 01-2-2v-7.472a2 2 0 011.447-1.804L9 6m0 13V6m0 0l6 4" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">{activeTickets} active</p>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Available Tickets</p>
                <p className="mt-2 font-display text-3xl font-bold text-secondary-900">{totalAvailable}</p>
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
                  {upcomingEvent ? upcomingEvent.title : '—'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-sm text-secondary-600">
              {upcomingEvent && upcomingEvent.date ? formatDateTime(upcomingEvent.date) : 'TBD'}
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
                <span className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600">
                  UI only
                </span>
              </div>
              <div className="p-6">
                {mockBooking ? (
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
                          <td className="py-3 pr-4 font-mono text-sm text-secondary-900">{mockBooking.reference}</td>
                          <td className="py-3 pr-4">
                            <div className="text-secondary-900">{mockBooking.fullName}</div>
                            <div className="text-xs text-secondary-600">{mockBooking.email}</div>
                          </td>
                          <td className="py-3 pr-4">
                            {typeof mockBooking.eventId !== 'string' ? (
                              <div>
                                <div className="text-secondary-900">{mockBooking.eventId.title}</div>
                                {mockBooking.eventId.date && (
                                  <div className="text-xs text-secondary-600">
                                    {formatDateTime(mockBooking.eventId.date)}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-secondary-700">—</span>
                            )}
                          </td>
                          <td className="py-3 pr-4">
                            {typeof mockBooking.ticketId !== 'string' ? (
                              <div className="text-secondary-900">{mockBooking.ticketId.name}</div>
                            ) : (
                              <span className="text-secondary-700">—</span>
                            )}
                          </td>
                          <td className="py-3 pr-4">{mockBooking.quantity}</td>
                          <td className="py-3 pr-4 font-medium text-secondary-900">{formatPrice(mockBooking.totalAmount)}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              {mockBooking.status}
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
                <Button variant="primary" className="w-full" disabled>
                  Create Event (UI only)
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Create Ticket (UI only)
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  Manage Notifications (UI only)
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-secondary-200">
                <h3 className="font-display text-lg font-semibold text-secondary-900">Active Events</h3>
              </div>
              <ul className="divide-y divide-secondary-100">
                {mockEvents.filter((e) => e.status === 'active').map((e) => (
                  <li key={e._id} className="px-6 py-4">
                    <div className="font-medium text-secondary-900">{e.title}</div>
                    <div className="text-sm text-secondary-600">
                      {e.date ? formatDateTime(e.date) : 'TBD'}{e.venue ? ` • ${e.venue}` : ''}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

