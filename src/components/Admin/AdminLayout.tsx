import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors ${
      isActive ? 'bg-primary-50 text-primary-700' : 'text-secondary-700 hover:bg-secondary-100'
    }`;

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-primary-500">TEDxPantami Admin</h1>
          <button
            onClick={handleLogout}
            className="text-secondary-700 hover:text-primary-600 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 xl:col-span-2">
          <nav className="bg-white rounded-xl shadow-soft p-3 space-y-1 sticky top-4">
            <NavLink to="/admin/dashboard" className={linkClasses}>
              <span className="ml-1">Dashboard</span>
            </NavLink>
            <NavLink to="/admin/events" className={linkClasses}>
              <span className="ml-1">Events</span>
            </NavLink>
            <NavLink to="/admin/events/new" className={linkClasses}>
              <span className="ml-1">Create Event</span>
            </NavLink>
            <NavLink to="/admin/tickets" className={linkClasses}>
              <span className="ml-1">Tickets</span>
            </NavLink>
            <NavLink to="/admin/bookings" className={linkClasses}>
              <span className="ml-1">Bookings</span>
            </NavLink>
            <NavLink to="/admin/notifications" className={linkClasses}>
              <span className="ml-1">Notifications</span>
            </NavLink>
            <NavLink to="/admin/profile" className={linkClasses}>
              <span className="ml-1">Profile</span>
            </NavLink>
          </nav>
        </aside>

        <section className="lg:col-span-9 xl:col-span-10">
          {children}
        </section>
      </div>
    </div>
  );
};


