import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockBooking } from '../data/mockData';
import { formatDateTime } from '../utils/formatDate';
import { formatPrice } from '../utils/formatPrice';
import { Button } from '../components/Shared/Button';

export const BookingConfirmation: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const booking = mockBooking; // In real app, fetch by reference

  return (
    <div className="py-12 md:py-16 bg-secondary-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-xl shadow-soft p-8 md:p-12 text-center mb-8">
            <div className="mb-6">
              <div className="h-20 w-20 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-4">
                <svg
                  className="h-10 w-10 text-primary-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-secondary-600">
                Your tickets have been booked successfully.
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
            <h2 className="font-display text-2xl font-semibold text-secondary-900 mb-6">
              Booking Details
            </h2>

            <div className="space-y-6">
              {/* Reference */}
              <div>
                <label className="text-sm font-medium text-secondary-500 block mb-2">
                  Booking Reference
                </label>
                <p className="text-lg font-mono font-semibold text-secondary-900">
                  {booking.reference || reference}
                </p>
              </div>

              {/* Event Info */}
              {typeof booking.eventId !== 'string' && (
                <div>
                  <label className="text-sm font-medium text-secondary-500 block mb-2">
                    Event
                  </label>
                  <p className="text-lg font-semibold text-secondary-900 mb-2">
                    {booking.eventId.title}
                  </p>
                  {booking.eventId.date && (
                    <p className="text-sm text-secondary-600">
                      {formatDateTime(booking.eventId.date)}
                    </p>
                  )}
                  {booking.eventId.venue && (
                    <p className="text-sm text-secondary-600">
                      {booking.eventId.venue}
                    </p>
                  )}
                </div>
              )}

              {/* Ticket Info */}
              {typeof booking.ticketId !== 'string' && (
                <div>
                  <label className="text-sm font-medium text-secondary-500 block mb-2">
                    Ticket
                  </label>
                  <p className="text-lg font-semibold text-secondary-900">
                    {booking.ticketId.name} × {booking.quantity}
                  </p>
                </div>
              )}

              {/* Contact Info */}
              <div>
                <label className="text-sm font-medium text-secondary-500 block mb-2">
                  Contact Information
                </label>
                <p className="text-secondary-900">{booking.fullName}</p>
                <p className="text-secondary-900">{booking.email}</p>
                <p className="text-secondary-900">{booking.phoneNumber}</p>
              </div>

              {/* Total Amount */}
              <div className="border-t border-secondary-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-secondary-700">Total Amount</span>
                  <span className="font-display text-2xl font-bold text-primary-500">
                    {formatPrice(booking.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white rounded-xl shadow-soft p-8 mb-8 text-center">
            <h3 className="font-display text-xl font-semibold text-secondary-900 mb-4">
              Your Ticket QR Code
            </h3>
            <div className="bg-secondary-100 rounded-lg p-8 inline-block">
              <div className="w-48 h-48 bg-secondary-300 rounded-lg flex items-center justify-center mx-auto">
                <p className="text-secondary-500 text-sm">QR Code Placeholder</p>
              </div>
            </div>
            <p className="text-sm text-secondary-600 mt-4">
              A confirmation email with your PDF ticket has been sent to {booking.email}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex-1 sm:flex-none">
              Download PDF Ticket
            </Button>
            <Link to="/" className="flex-1 sm:flex-none">
              <Button variant="primary" className="w-full">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

