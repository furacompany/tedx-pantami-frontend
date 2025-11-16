import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Shared/Button';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

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
      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-soft p-12 text-center">
          <h2 className="font-display text-4xl font-bold text-secondary-900 mb-4">
            Hello World
          </h2>
          <p className="text-lg text-secondary-600">
            Admin dashboard placeholder
          </p>
        </div>
      </main>
    </div>
  );
};

