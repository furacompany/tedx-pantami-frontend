import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { listAdminTickets, deleteTicket } from '../../api/tickets';
import type { Ticket } from '../../types';
import { toast } from 'sonner';
import { confirmDialog } from '../../utils/confirm';

export const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await listAdminTickets({ page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' });
      setTickets(res.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to load tickets';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = await confirmDialog({
      title: 'Delete ticket?',
      text: 'This will permanently delete the ticket.',
      confirmButtonText: 'Delete',
      icon: 'warning',
    });
    if (!ok) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
      toast.success('Ticket deleted');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to delete ticket');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-secondary-900">Tickets</h2>
        <button className="px-4 py-2 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
          Create Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {error && <div className="px-6 py-4 border-b border-secondary-200 text-sm text-red-600">{error}</div>}
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
              {isLoading && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={6}>Loading tickets...</td>
                </tr>
              )}
              {!isLoading && tickets.length === 0 && (
                <tr>
                  <td className="py-6 px-6 text-secondary-600" colSpan={6}>No tickets found</td>
                </tr>
              )}
              {tickets.map((t) => (
                <tr key={t._id}>
                  <td className="py-3 px-6 font-medium text-secondary-900">{t.name}</td>
                  <td className="py-3 px-6">
                    {typeof t.eventId === 'object' && t.eventId && 'title' in t.eventId
                      ? (t.eventId as any).title
                      : (t as any)?.eventId?.title ?? '—'}
                  </td>
                  <td className="py-3 px-6">{formatPrice(t.price)}</td>
                  <td className="py-3 px-6">{t.availableQuantity}/{t.quantity}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-secondary-100 text-secondary-700'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 space-x-2">
                    <button className="px-3 py-1 rounded-lg bg-secondary-100 text-secondary-700 cursor-not-allowed" disabled>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t._id)} className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition">
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


