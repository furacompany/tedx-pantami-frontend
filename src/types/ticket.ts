export interface Ticket {
  _id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number; // in kobo
  quantity: number;
  availableQuantity: number;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

