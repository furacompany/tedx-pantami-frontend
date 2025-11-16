import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO 8601 date string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {/* Days */}
      <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-soft border border-secondary-200">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-2 font-display">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-semibold text-primary-500 uppercase tracking-widest">
          Days
        </div>
      </div>

      {/* Hours */}
      <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-soft border border-secondary-200">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-2 font-display">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-semibold text-primary-500 uppercase tracking-widest">
          Hours
        </div>
      </div>

      {/* Minutes */}
      <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-soft border border-secondary-200">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-2 font-display">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-semibold text-primary-500 uppercase tracking-widest">
          Minutes
        </div>
      </div>

      {/* Seconds */}
      <div className="bg-white rounded-xl p-5 md:p-6 text-center shadow-soft border border-secondary-200">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-2 font-display">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm font-semibold text-primary-500 uppercase tracking-widest">
          Seconds
        </div>
      </div>
    </div>
  );
};
