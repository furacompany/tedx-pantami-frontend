import apiClient from './client';
import type { NotificationData } from '../types';

export async function listNotifications(): Promise<{ success: boolean; data: NotificationData[] }> {
  const { data } = await apiClient.get<{ success: boolean; data: NotificationData[] }>('/api/notifications/all');
  return data;
}

export async function getActiveNotification(): Promise<{ success: boolean; data: NotificationData | null }> {
  const { data } = await apiClient.get<{ success: boolean; data: NotificationData | null }>('/api/notifications');
  return data;
}

export async function createNotification(payload: { message: string; status?: 'active' | 'inactive' }): Promise<{
  success: boolean;
  message: string;
  data: NotificationData;
}> {
  const { data } = await apiClient.post('/api/notifications', payload);
  return data;
}

export async function updateNotification(id: string, payload: Partial<{ message: string; status: 'active' | 'inactive' }>): Promise<{
  success: boolean;
  message: string;
  data: NotificationData;
}> {
  const { data } = await apiClient.put(`/api/notifications/${id}`, payload);
  return data;
}

export async function deleteNotification(id: string): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete(`/api/notifications/${id}`);
  return data;
}


