import React from 'react';
import type { Ticket } from '../../types';
import { TicketCard } from './TicketCard';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId?: string;
  onSelectTicket?: (ticket: Ticket) => void;
  onBookTicket?: (ticket: Ticket) => void;
  showBookButton?: boolean;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  selectedTicketId,
  onSelectTicket,
  onBookTicket,
  showBookButton = false,
}) => {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-500 text-lg">No tickets available for this event.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          isSelected={selectedTicketId === ticket._id}
          onSelect={onSelectTicket}
          onBook={onBookTicket}
          showBookButton={showBookButton}
        />
      ))}
    </div>
  );
};

