import React, { useState } from 'react';
import type { NotificationData } from '../../types';

interface NotificationBannerProps {
  notification: NotificationData | null;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ notification }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!notification || isDismissed || notification.status !== 'active') {
    return null;
  }

  return (
    <div className="bg-gradient-primary text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base font-medium flex-1 text-center">
          {notification.message}
        </p>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

