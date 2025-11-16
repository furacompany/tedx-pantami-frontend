export interface Admin {
  _id: string;
  email: string;
  name: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    admin: Admin;
  };
}

