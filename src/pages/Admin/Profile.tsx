import React, { useEffect, useState } from 'react';
import { getAdminProfile, updateAdminProfile } from '../../api/admin';

export const AdminProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAdminProfile();
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Failed to load profile';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateAdminProfile({ name, email });
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to update profile';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-secondary-900">Profile</h2>

      <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-soft p-6 space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && <div className="text-sm text-green-700">{success}</div>}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full border border-secondary-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Role</label>
          <input value={role} readOnly className="w-full border border-secondary-300 rounded-lg px-3 py-2 bg-secondary-50" />
        </div>
        <div className="pt-2">
          <button type="submit" disabled={loading || saving} className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition disabled:opacity-60">
            {saving ? 'Saving...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};


