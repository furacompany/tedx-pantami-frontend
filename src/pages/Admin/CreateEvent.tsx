import React, { useState } from 'react';

export const AdminCreateEvent: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    imageUrl: '',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only, no API integration yet
    alert('UI-only: Event would be created with entered data.');
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-secondary-900">Create Event</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-soft p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
          <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Date</label>
            <input type="datetime-local" name="date" value={form.date} onChange={handleChange} required className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Venue</label>
            <input name="venue" value={form.venue} onChange={handleChange} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition">
            Save (UI-only)
          </button>
        </div>
      </form>
    </div>
  );
};


