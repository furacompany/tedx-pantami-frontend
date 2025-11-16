import React from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { formatDate, formatCardDate } from '../../utils/formatDate';
import { Button } from '../Shared/Button';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isActive = event.status === 'active';

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow">
      {/* Event Image */}
      {event.imageUrl ? (
        <div className="aspect-video relative overflow-hidden bg-secondary-200">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {!isActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-secondary-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                Inactive
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gradient-primary flex items-center justify-center">
          <span className="font-display text-4xl font-bold text-white">
            TEDx
          </span>
        </div>
      )}

      {/* Event Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          {isActive && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              Active
            </span>
          )}
          {event.date && (
            <span className="text-sm text-secondary-500">
              {formatCardDate(event.date)}
            </span>
          )}
        </div>

        <h3 className="font-display text-xl font-semibold text-secondary-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
            {event.description}
          </p>
        )}

        {event.venue && (
          <div className="flex items-center text-sm text-secondary-500 mb-4">
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
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        )}

        <Link to={`/events/${event._id}`}>
          <Button variant="primary" className="w-full" disabled={!isActive}>
            {isActive ? 'View Details' : 'Coming Soon'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

