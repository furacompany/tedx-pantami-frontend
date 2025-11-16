import type { Event } from './event';
import type { Ticket } from './ticket';

export interface Booking {
  _id: string;
  eventId: string | Event;
  ticketId: string | Ticket;
  transactionId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  quantity: number;
  totalAmount: number; // in kobo
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCodeData?: string;
  reference?: string;
  createdAt?: string;
  updatedAt?: string;
}

