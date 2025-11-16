import type { Event, Ticket, Booking, NotificationData } from '../types';
import type { GalleryItem } from '../types/gallery';

export const mockEvents: Event[] = [
  {
    _id: 'event-1',
    title: 'TEDxPantami Youth 2025',
    description: 'Redefining Possibilities - Join us for an inspiring journey of innovation, creativity, and transformative ideas that will reshape our future.',
    date: '2025-09-27T10:00:00.000Z',
    venue: 'Matrix International Academy Hall, Gombe',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'event-2',
    title: 'Tech Innovation Summit',
    description: 'A deep dive into emerging technologies and their impact on Northern Nigeria. Explore the future of tech with industry leaders.',
    date: '2025-04-20T10:00:00.000Z',
    venue: 'Pantami Tech Hub, Gombe',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'event-3',
    title: 'Climate Action Summit',
    description: 'Addressing environmental challenges and creating sustainable solutions for our communities.',
    date: '2025-07-08T10:00:00.000Z',
    venue: 'Gombe State University, Gombe',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'event-4',
    title: 'Youth Innovation Workshop',
    description: 'Hands-on workshop for young innovators to learn, create, and network.',
    date: '2025-05-20T10:00:00.000Z',
    venue: 'Pantami Innovation Center, Gombe',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    status: 'inactive',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

export const mockTickets: Ticket[] = [
  // Event 1 tickets
  {
    _id: 'ticket-1-1',
    eventId: 'event-1',
    name: 'Gold',
    description: 'VIP access with premium seating, networking dinner, and exclusive materials',
    price: 5000000, // ₦50,000
    quantity: 100,
    availableQuantity: 75,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'ticket-1-2',
    eventId: 'event-1',
    name: 'Silver',
    description: 'Standard access with good seating and event materials',
    price: 3000000, // ₦30,000
    quantity: 200,
    availableQuantity: 150,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'ticket-1-3',
    eventId: 'event-1',
    name: 'Bronze',
    description: 'General admission with standard seating',
    price: 2000000, // ₦20,000
    quantity: 300,
    availableQuantity: 250,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  // Event 2 tickets
  {
    _id: 'ticket-2-1',
    eventId: 'event-2',
    name: 'Early Bird',
    description: 'Limited early bird pricing for tech enthusiasts',
    price: 2500000, // ₦25,000
    quantity: 50,
    availableQuantity: 30,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'ticket-2-2',
    eventId: 'event-2',
    name: 'Standard',
    description: 'Regular admission for Tech Innovation Summit',
    price: 3500000, // ₦35,000
    quantity: 150,
    availableQuantity: 120,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  // Event 3 tickets
  {
    _id: 'ticket-3-1',
    eventId: 'event-3',
    name: 'Regular',
    description: 'General admission to Climate Action Summit',
    price: 1500000, // ₦15,000
    quantity: 200,
    availableQuantity: 180,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: 'ticket-3-2',
    eventId: 'event-3',
    name: 'Student',
    description: 'Discounted ticket for students with valid ID',
    price: 1000000, // ₦10,000
    quantity: 100,
    availableQuantity: 80,
    status: 'active',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

export const mockNotification: NotificationData | null = {
  _id: 'notification-1',
  message: 'Early bird tickets now available! Register now to save up to 30%.',
  status: 'active',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
};

export const mockBooking: Booking = {
  _id: 'booking-1',
  eventId: mockEvents[0],
  ticketId: mockTickets[0],
  transactionId: 'transaction-1',
  email: 'john.doe@example.com',
  fullName: 'John Doe',
  phoneNumber: '+2348012345678',
  quantity: 2,
  totalAmount: 10000000, // ₦100,000
  status: 'confirmed',
  qrCodeData: 'a1b2c3d4e5f6789012345678901234567890abcdef',
  reference: 'TEDX-1234567890-ABCD',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
};

// Helper functions
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event._id === id);
};

export const getTicketsByEventId = (eventId: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.eventId === eventId && ticket.status === 'active');
};

export const getTicketById = (id: string): Ticket | undefined => {
  return mockTickets.find(ticket => ticket._id === id);
};

export const mockGalleryItems: GalleryItem[] = [
  {
    _id: 'gallery-1',
    title: 'TEDxPantami 2024: Breaking Barriers',
    description: 'A moment captured during our inspiring event',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'event',
    eventId: 'event-1',
    createdAt: '2024-11-10T00:00:00.000Z',
  },
  {
    _id: 'gallery-2',
    title: 'Women in Tech Conference',
    description: 'Empowering women in technology',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    category: 'conference',
    eventId: 'event-2',
    createdAt: '2024-09-15T00:00:00.000Z',
  },
  {
    _id: 'gallery-3',
    title: 'Climate Action Summit',
    description: 'Addressing environmental challenges',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'summit',
    eventId: 'event-3',
    createdAt: '2024-07-08T00:00:00.000Z',
  },
  {
    _id: 'gallery-4',
    title: 'Youth Innovation Workshop',
    description: 'Young minds creating solutions',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    category: 'workshop',
    eventId: 'event-4',
    createdAt: '2024-05-20T00:00:00.000Z',
  },
  {
    _id: 'gallery-5',
    title: 'Tech Startup Pitch Competition',
    description: 'Innovative startups pitching their ideas',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'competition',
    createdAt: '2024-03-12T00:00:00.000Z',
  },
  {
    _id: 'gallery-6',
    title: 'Community Impact Awards',
    description: 'Celebrating community champions',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80',
    category: 'awards',
    createdAt: '2024-01-15T00:00:00.000Z',
  },
  {
    _id: 'gallery-7',
    title: 'Digital Transformation Summit',
    description: 'Embracing digital innovation',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a1b87b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'summit',
    createdAt: '2023-12-05T00:00:00.000Z',
  },
  {
    _id: 'gallery-8',
    title: 'Innovation Lab Opening',
    description: 'Launching our innovation hub',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'opening',
    createdAt: '2023-10-18T00:00:00.000Z',
  },
  {
    _id: 'gallery-9',
    title: 'Networking Session',
    description: 'Connecting innovators and entrepreneurs',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    category: 'networking',
    createdAt: '2024-08-20T00:00:00.000Z',
  },
];

