import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { listAdminTickets, deleteTicket, createTicket } from '../../api/tickets';
import type { Ticket } from '../../types';
import { toast } from 'sonner';
import { confirmDialog } from '../../utils/confirm';
import { listAdminEvents } from '../../api/events';
import type { Event } from '../../types';

export const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    eventId: '',
    name: '',
    description: '',
    priceNaira: '', // user-friendly input; will convert to kobo
    quantity: '',
    status: 'active' as 'active' | 'inactive',
  });

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

  const openCreate = async () => {
    setShowCreate(true);
    setLoadingEvents(true);
    try {
      const ev = await listAdminEvents({ page: 1, limit: 100, sortBy: 'date', sortOrder: 'desc', status: '' });
      setEvents(ev.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to load events');
    } finally {
      setLoadingEvents(false);
    }
  };

  const resetForm = () => {
    setForm({
      eventId: '',
      name: '',
      description: '',
      priceNaira: '',
      quantity: '',
      status: 'active',
    });
  };

  const nairaToKobo = (val: string) => {
    const n = Number(val);
    if (Number.isNaN(n)) return 0;
    return Math.round(n * 100);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventId || !form.name || !form.priceNaira || !form.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }
    setCreating(true);
    try {
      await createTicket({
        eventId: form.eventId,
        name: form.name,
        description: form.description || undefined,
        price: nairaToKobo(form.priceNaira),
        quantity: Number(form.quantity),
        status: form.status,
      });
      toast.success('Ticket created');
      setShowCreate(false);
      resetForm();
      fetchTickets();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create ticket');
    } finally {
      setCreating(false);
    }
  };

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
        <button onClick={openCreate} className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition">
          Create Ticket
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-secondary-900">Create Ticket</h3>
            <button onClick={() => setShowCreate(false)} className="text-secondary-700 hover:text-primary-600 text-sm font-medium">Close</button>
          </div>
          <form onSubmit={handleCreate} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-1">Event</label>
              <select
                value={form.eventId}
                onChange={(e) => setForm((p) => ({ ...p, eventId: e.target.value }))}
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
                disabled={loadingEvents}
                required
              >
                <option value="">{loadingEvents ? 'Loading events...' : 'Select an event'}</option>
                {events.map((ev) => (
                  <option key={ev._id} value={ev._id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
                placeholder="e.g. Gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))}
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
                placeholder="Optional description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Price (₦)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.priceNaira}
                onChange={(e) => setForm((p) => ({ ...p, priceNaira: e.target.value }))}
                required
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
                placeholder="e.g. 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                required
                className="w-full border border-secondary-300 rounded-lg px-3 py-2"
                placeholder="e.g. 100"
              />
            </div>
            <div className="md:col-span-2 pt-2">
              <button type="submit" disabled={creating} className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition disabled:opacity-60">
                {creating ? 'Creating...' : 'Create Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}

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


