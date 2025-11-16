import apiClient from './client';
import type { Booking } from '../types';

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function listAdminBookings(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  eventId?: string;
  ticketId?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | '';
  email?: string;
  dateFrom?: string;
  dateTo?: string;
} = {}): Promise<PaginatedResponse<Booking>> {
  const { data } = await apiClient.get<PaginatedResponse<Booking>>('/api/bookings/admin/all', { params });
  return data;
}

export async function listAdminBookingsByEvent(eventId: string, params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<PaginatedResponse<Booking>> {
  const { data } = await apiClient.get<PaginatedResponse<Booking>>(`/api/bookings/admin/event/${eventId}`, { params });
  return data;
}

export async function listAdminBookingsByTicket(ticketId: string, params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<PaginatedResponse<Booking>> {
  const { data } = await apiClient.get<PaginatedResponse<Booking>>(`/api/bookings/admin/ticket/${ticketId}`, { params });
  return data;
}


