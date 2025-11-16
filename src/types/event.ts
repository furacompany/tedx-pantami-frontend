export interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string; // ISO 8601 date string
  venue?: string;
  imageUrl?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

