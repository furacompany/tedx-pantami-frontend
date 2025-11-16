import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Shared/Input';
import { Button } from '../../components/Shared/Button';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no actual API call
    setIsLoading(true);
    setTimeout(() => {
      // Simulate login
      localStorage.setItem('adminToken', 'mock-token-123');
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-primary-500 mb-2">
              TEDxPantami
            </h1>
            <h2 className="font-display text-2xl font-semibold text-secondary-900 mb-2">
              Admin Login
            </h2>
            <p className="text-secondary-600">
              Sign in to manage events and bookings
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-6 bg-white rounded-xl shadow-soft p-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@tedxpantami.com"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              disabled={!formData.email || !formData.password}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

