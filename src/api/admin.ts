import apiClient from './client';
import type { Admin, AdminLoginResponse } from '../types';

export async function loginAdmin(payload: { email: string; password: string }): Promise<AdminLoginResponse> {
  const { data } = await apiClient.post<AdminLoginResponse>('/api/admin/login', payload);
  return data;
}

export async function getAdminProfile(): Promise<{ success: boolean; data: Admin }> {
  const { data } = await apiClient.get<{ success: boolean; data: Admin }>('/api/admin/profile');
  return data;
}

export async function updateAdminProfile(payload: Partial<Pick<Admin, 'name' | 'email'>>): Promise<{
  success: boolean;
  message: string;
  data: { id: string; email: string; name: string; role: string };
}> {
  const { data } = await apiClient.put('/api/admin/profile', payload);
  return data;
}


