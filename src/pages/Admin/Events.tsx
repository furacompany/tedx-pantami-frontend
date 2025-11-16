import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatDate';
import { listAdminEvents, deleteEvent } from '../../api/events';
import type { Event } from '../../types';
import { toast } from 'sonner';
import { confirmDialog } from '../../utils/confirm';

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listAdminEvents({ page: 1, limit: 20, sortBy: 'date', sortOrder: 'desc' });
      setEvents(res.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load events';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirmDialog({
      title: 'Delete event?',
      text: 'This will permanently delete the event.',
      confirmButtonText: 'Delete',
      icon: 'warning',
    });
    if (!ok) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success('Event deleted');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Events</h2>
        <Link to="/admin/events/new" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition">
          Create Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {error && (
          <div className="px-6 py-4 border-b border-secondary-200 text-sm text-red-600">{error}</div>
        )}
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
              {isLoading && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={5}>Loading events...</td>
                </tr>
              )}
              {!isLoading && events.length === 0 && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={5}>No events found</td>
                </tr>
              )}
              {events.map((e) => (
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
                    <Link to={`/admin/events/${e._id}/edit`} className="px-3 py-1 rounded-lg bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(e._id)} className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition">
                      Delete
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


