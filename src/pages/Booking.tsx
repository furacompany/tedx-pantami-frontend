import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventById, getTicketById } from '../data/mockData';
import { BookingForm } from '../components/Booking/BookingForm';
import { BookingSummary } from '../components/Booking/BookingSummary';
import { Button } from '../components/Shared/Button';

interface BookingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
}

export const Booking: React.FC = () => {
  const { eventId, ticketId } = useParams<{ eventId: string; ticketId: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const event = eventId ? getEventById(eventId) : null;
  const ticket = ticketId ? getTicketById(ticketId) : null;

  const handleSubmit = async (formData: BookingFormData) => {
    // UI only - no actual submission
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate processing
      const reference = `TEDX-${Date.now()}-ABCD`;
      navigate(`/booking/confirmation/${reference}`);
    }, 1500);
  };

  if (!event || !ticket) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-secondary-900 mb-4">
          Event or Ticket Not Found
        </h1>
        <p className="text-secondary-600 mb-6">The event or ticket you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-secondary-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-secondary-600">
            <Link to="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={`/events/${event._id}`} className="hover:text-primary-500 transition-colors">
              {event.title}
            </Link>
            <span>/</span>
            <span className="text-secondary-900">Booking</span>
          </nav>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-secondary-700">Select Ticket</span>
            </div>
            <div className="w-16 h-1 bg-primary-500" />
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-secondary-700">Fill Form</span>
            </div>
            <div className="w-16 h-1 bg-secondary-300" />
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-secondary-300 text-secondary-600 flex items-center justify-center font-semibold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-secondary-500">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
              <BookingForm
                onSubmit={handleSubmit}
                isLoading={isProcessing}
                defaultQuantity={1}
              />
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              event={event}
              ticket={ticket}
              quantity={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

