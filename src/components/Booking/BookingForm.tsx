import React, { useState } from 'react';
import { Input } from '../Shared/Input';
import { Button } from '../Shared/Button';

interface BookingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  quantity: number;
}

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void;
  isLoading?: boolean;
  defaultQuantity?: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  isLoading = false,
  defaultQuantity = 1,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    quantity: defaultQuantity,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-semibold text-secondary-900 mb-4">
          Booking Information
        </h3>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="+234 801 234 5678"
          />

          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity.toString()}
            onChange={handleChange}
            required
            helperText="Number of tickets you want to book"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isLoading}
        disabled={!formData.fullName || !formData.email || !formData.phoneNumber}
      >
        Proceed to Payment
      </Button>
    </form>
  );
};

