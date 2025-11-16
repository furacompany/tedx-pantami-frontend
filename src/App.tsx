import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import { mockNotification } from "./data/mockData";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NotificationBanner notification={mockNotification} />
        <Navbar />
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
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
