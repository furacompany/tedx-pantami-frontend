import apiClient from './client';
import type { Event } from '../types';

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

export async function listAdminEvents(params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: 'active' | 'inactive' | '';
  dateFrom?: string;
  dateTo?: string;
} = {}): Promise<PaginatedResponse<Event>> {
  const { data } = await apiClient.get<PaginatedResponse<Event>>('/api/events/admin/all', { params });
  return data;
}

export async function createEvent(payload: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<{
  success: boolean;
  message: string;
  data: Event;
}> {
  const { data } = await apiClient.post('/api/events', payload);
  return data;
}

export async function updateEvent(id: string, payload: Partial<Event>): Promise<{
  success: boolean;
  message: string;
  data: Event;
}> {
  const { data } = await apiClient.put(`/api/events/${id}`, payload);
  return data;
}

export async function deleteEvent(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  const { data } = await apiClient.delete(`/api/events/${id}`);
  return data;
}


