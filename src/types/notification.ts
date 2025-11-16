export interface NotificationData {
  _id: string;
  message: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
