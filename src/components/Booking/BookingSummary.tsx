import React from 'react';
import type { Event, Ticket } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { formatDateTime } from '../../utils/formatDate';

interface BookingSummaryProps {
  event: Event;
  ticket: Ticket;
  quantity: number;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  event,
  ticket,
  quantity,
}) => {
  const totalAmount = ticket.price * quantity;

  return (
    <div className="bg-secondary-50 rounded-xl p-6 sticky top-24">
      <h3 className="font-display text-xl font-semibold text-secondary-900 mb-6">
        Booking Summary
      </h3>

      <div className="space-y-6">
        {/* Event Info */}
        <div>
          <h4 className="font-medium text-secondary-700 mb-3">Event Details</h4>
          <div className="space-y-2">
            <p className="font-semibold text-secondary-900">{event.title}</p>
            {event.date && (
              <div className="flex items-center text-sm text-secondary-600">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDateTime(event.date)}
              </div>
            )}
            {event.venue && (
              <div className="flex items-center text-sm text-secondary-600">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.venue}
              </div>
            )}
          </div>
        </div>

        {/* Ticket Info */}
        <div className="border-t border-secondary-200 pt-6">
          <h4 className="font-medium text-secondary-700 mb-3">Ticket</h4>
          <div className="space-y-2">
            <p className="font-semibold text-secondary-900">{ticket.name}</p>
            {ticket.description && (
              <p className="text-sm text-secondary-600">{ticket.description}</p>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-secondary-200 pt-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600">
                {formatPrice(ticket.price)} × {quantity} ticket{quantity > 1 ? 's' : ''}
              </span>
              <span className="text-secondary-900 font-medium">
                {formatPrice(totalAmount)}
              </span>
            </div>
            <div className="border-t border-secondary-200 pt-3 flex justify-between items-center">
              <span className="font-semibold text-secondary-900">Total</span>
              <span className="font-display text-2xl font-bold text-primary-500">
                {formatPrice(totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

