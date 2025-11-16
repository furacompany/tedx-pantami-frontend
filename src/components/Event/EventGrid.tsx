import React from 'react';
import type { Event } from '../../types';
import { EventCard } from './EventCard';
import { LoadingSpinner } from '../Shared/LoadingSpinner';

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
}

export const EventGrid: React.FC<EventGridProps> = ({ events, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" className="mx-auto" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-500 text-lg mb-4">No events found.</p>
        <p className="text-secondary-400">Check back later for upcoming events.</p>
      </div>
    );
  }

  const count = events.length;
  const gridClass =
    count >= 3
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      : count === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center'
      : 'grid grid-cols-1 gap-8 justify-items-center';

  return (
    <div className={gridClass}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

