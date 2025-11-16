import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById, getTicketsByEventId } from '../data/mockData';
import { TicketList } from '../components/Ticket/TicketList';
import { formatDateTime } from '../utils/formatDate';
import { Button } from '../components/Shared/Button';
import type { Ticket } from '../types';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = id ? getEventById(id) : null;
  const tickets = id ? getTicketsByEventId(id) : [];

  const handleBookTicket = (ticket: Ticket) => {
    navigate(`/booking/${id}/${ticket._id}`);
  };

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-secondary-900 mb-4">
          Event Not Found
        </h1>
        <p className="text-secondary-600 mb-6">The event you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Event Hero */}
      <section className="relative">
        {event.imageUrl ? (
          <div className="h-64 md:h-96 bg-secondary-200 relative overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <div className="container mx-auto">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {event.title}
                </h1>
                {event.venue && (
                  <p className="text-lg md:text-xl text-white/90">
                    {event.venue}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 md:h-96 bg-gradient-primary flex items-end">
            <div className="container mx-auto p-8 md:p-12 text-white">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              {event.venue && (
                <p className="text-lg md:text-xl text-white/90">
                  {event.venue}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Event Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Event Info */}
            <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {event.date && (
                  <div className="flex items-center text-secondary-700">
                    <svg
                      className="h-5 w-5 mr-3 text-primary-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{formatDateTime(event.date)}</span>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center text-secondary-700">
                    <svg
                      className="h-5 w-5 mr-3 text-primary-500"
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
                    <span className="font-medium">{event.venue}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="prose max-w-none">
                  <p className="text-lg text-secondary-700 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
              )}
            </div>

            {/* Tickets Section */}
            {tickets.length > 0 ? (
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
                  Available Tickets
                </h2>
                <TicketList
                  tickets={tickets}
                  onBookTicket={handleBookTicket}
                  showBookButton={true}
                />
              </div>
            ) : (
              <div className="bg-secondary-50 rounded-xl p-8 text-center">
                <p className="text-secondary-600 text-lg mb-4">
                  No tickets available for this event yet.
                </p>
                <Link to="/">
                  <Button variant="primary">Browse Other Events</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

