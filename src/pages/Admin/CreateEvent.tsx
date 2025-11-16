import React, { useState } from 'react';
import { uploadImage, deleteImage } from '../../api/images';
import { createEvent } from '../../api/events';
import { useNavigate } from 'react-router-dom';

export const AdminCreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    imageUrl: '',
    status: 'active',
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: res.data.url }));
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to upload image';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!form.imageUrl) return;
    try {
      // Attempt server-side delete; ignore failures to allow UI removal
      await deleteImage(form.imageUrl);
    } catch {}
    setForm((prev) => ({ ...prev, imageUrl: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createEvent({
        title: form.title,
        description: form.description || undefined,
        date: form.date,
        venue: form.venue || undefined,
        imageUrl: form.imageUrl || undefined,
        status: form.status as 'active' | 'inactive',
      });
      navigate('/admin/events', { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to create event';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary-700 mb-1">Event Image</label>
            {form.imageUrl ? (
              <div className="space-y-2">
                <img src={form.imageUrl} alt="Event" className="max-h-48 rounded-lg border border-secondary-200" />
                <div className="flex gap-2">
                  <button type="button" onClick={handleRemoveImage} className="px-3 py-2 rounded-lg bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition">
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="w-full" />
            )}
            {uploading && <div className="text-sm text-secondary-600">Uploading...</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full border border-secondary-300 rounded-lg px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="pt-2">
          <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition disabled:opacity-60">
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};


