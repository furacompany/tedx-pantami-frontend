import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { Footer } from "./components/Layout/Footer";
import { NotificationBanner } from "./components/Layout/NotificationBanner";
import { Home } from "./pages/Home";
import { EventDetail } from "./pages/EventDetail";
import { Booking } from "./pages/Booking";
import { BookingConfirmation } from "./pages/BookingConfirmation";
import { Gallery } from "./pages/Gallery";
import { AdminLogin } from "./pages/Admin/Login";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { AdminEvents } from "./pages/Admin/Events";
import { AdminCreateEvent } from "./pages/Admin/CreateEvent";
import { AdminTickets } from "./pages/Admin/Tickets";
import { AdminBookings } from "./pages/Admin/Bookings";
import { AdminNotifications } from "./pages/Admin/Notifications";
import { AdminProfile } from "./pages/Admin/Profile";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import { AdminLayout } from "./components/Admin/AdminLayout";
import { mockNotification } from "./data/mockData";
import "./App.css";

// Admin base path gate: redirect to dashboard if logged in, else to login
const AdminIndex: React.FC = () => {
  const token = localStorage.getItem("adminToken");
  return token ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <NotificationBanner notification={mockNotification} />}
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Home />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking/:eventId/:ticketId" element={<Booking />} />
          <Route
            path="/booking/confirmation/:reference"
            element={<BookingConfirmation />}
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminEvents />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events/new"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCreateEvent />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminTickets />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminNotifications />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProfile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
