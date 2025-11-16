import apiClient from './client';
import type { Ticket } from '../types';

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

export async function listTicketsByEventId(eventId: string): Promise<{
  success: boolean;
  data: Ticket[];
}> {
  const { data } = await apiClient.get<{ success: boolean; data: Ticket[] }>(`/api/tickets/event/${eventId}`);
  return data;
}

export async function getTicketById(id: string): Promise<{
  success: boolean;
  data: Ticket;
}> {
  const { data } = await apiClient.get<{ success: boolean; data: Ticket }>(`/api/tickets/${id}`);
  return data;
}

export async function listAdminTickets(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  eventId?: string;
  status?: 'active' | 'inactive' | '';
  minPrice?: number;
  maxPrice?: number;
} = {}): Promise<PaginatedResponse<Ticket>> {
  const { data } = await apiClient.get<PaginatedResponse<Ticket>>('/api/tickets/admin/all', { params });
  return data;
}

export async function getTicketWithEvent(id: string): Promise<{
  success: boolean;
  data: any;
}> {
  const { data } = await apiClient.get(`/api/tickets/admin/${id}/event`);
  return data;
}

export async function createTicket(payload: {
  eventId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  status?: 'active' | 'inactive';
}): Promise<{ success: boolean; message: string; data: Ticket }> {
  const { data } = await apiClient.post('/api/tickets', payload);
  return data;
}

export async function updateTicket(id: string, payload: Partial<{
  name: string;
  description?: string;
  price: number;
  quantity: number;
  status: 'active' | 'inactive';
}>): Promise<{ success: boolean; message: string; data: Ticket }> {
  const { data } = await apiClient.put(`/api/tickets/${id}`, payload);
  return data;
}

export async function deleteTicket(id: string): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete(`/api/tickets/${id}`);
  return data;
}


