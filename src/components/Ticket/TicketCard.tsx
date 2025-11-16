import React from 'react';
import type { Ticket } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Shared/Button';

interface TicketCardProps {
  ticket: Ticket;
  isSelected?: boolean;
  onSelect?: (ticket: Ticket) => void;
  onBook?: (ticket: Ticket) => void;
  showBookButton?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  isSelected = false,
  onSelect,
  onBook,
  showBookButton = false,
}) => {
  const isSoldOut = ticket.availableQuantity === 0;
  const isLowStock = ticket.availableQuantity > 0 && ticket.availableQuantity <= 10;

  return (
    <div
      className={`
        bg-white rounded-xl shadow-soft p-6 border-2 transition-all
        ${isSelected 
          ? 'border-primary-500 ring-2 ring-primary-200' 
          : 'border-secondary-200 hover:shadow-medium'
        }
        ${isSoldOut ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-secondary-900 mb-2">
            {ticket.name}
          </h3>
          {ticket.description && (
            <p className="text-secondary-600 text-sm mb-3">
              {ticket.description}
            </p>
          )}
        </div>
        {isSelected && (
          <div className="ml-4 flex-shrink-0">
            <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
              <svg
                className="h-4 w-4 text-white"
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
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="font-display text-3xl font-bold text-secondary-900">
            {formatPrice(ticket.price)}
          </span>
          <span className="text-secondary-500 text-sm">per ticket</span>
        </div>
        <p className="text-sm text-secondary-600">
          {isSoldOut ? (
            <span className="text-red-600 font-medium">Sold Out</span>
          ) : isLowStock ? (
            <span className="text-orange-600 font-medium">
              Only {ticket.availableQuantity} tickets left!
            </span>
          ) : (
            <span>{ticket.availableQuantity} tickets available</span>
          )}
        </p>
      </div>

      <div className="flex gap-3">
        {onSelect && !showBookButton && (
          <Button
            variant={isSelected ? 'secondary' : 'primary'}
            className="flex-1"
            onClick={() => onSelect(ticket)}
            disabled={isSoldOut}
          >
            {isSelected ? 'Selected' : 'Select Ticket'}
          </Button>
        )}
        {showBookButton && onBook && (
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onBook(ticket)}
            disabled={isSoldOut}
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};

