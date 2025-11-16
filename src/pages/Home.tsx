import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mockGalleryItems } from '../data/mockData';
import { EventGrid } from '../components/Event/EventGrid';
import { GalleryGrid } from '../components/Gallery/GalleryGrid';
import { Button } from '../components/Shared/Button';
import { CountdownTimer } from '../components/Shared/CountdownTimer';
import { formatDate } from '../utils/formatDate';
import type { Event } from '../types';
import { listPublicEvents } from '../api/events';
import { toast } from 'sonner';

export const Home: React.FC = () => {
  const location = useLocation();
  const showAll = location.pathname === '/events';
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await listPublicEvents();
        if (res.success && Array.isArray(res.data)) {
          if (isMounted) setEvents(res.data);
        } else {
          const msg = 'Failed to load events';
          if (isMounted) setError(msg);
          toast.error(msg);
        }
      } catch (err: any) {
        const msg = err?.response?.data?.message || 'Unable to load events';
        if (isMounted) setError(msg);
        toast.error(msg);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Active events sorted ascending by date (soonest first)
  const activeEvents = useMemo(() => {
    return events
      .filter(event => event.status === 'active')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  // Choose upcoming event: nearest future active date; fallback to latest past active if none
  const upcomingEvent: Event | null = useMemo(() => {
    const now = Date.now();
    const future = activeEvents.filter(e => new Date(e.date).getTime() >= now);
    if (future.length > 0) {
      return future[0];
    }
    // fallback: pick the most recent past active
    const past = activeEvents.filter(e => new Date(e.date).getTime() < now);
    if (past.length > 0) {
      return past[past.length - 1];
    }
    return null;
  }, [activeEvents]);

  const displayedEvents = showAll ? activeEvents : activeEvents.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* TEDxPantami Logo/Heading - TEDx in black, Pantami in red with underline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-secondary-900">TEDx</span>
              <span className="text-primary-500 underline decoration-primary-500 decoration-2 underline-offset-4">
                Pantami
              </span>
            </h1>

            {/* Subheading */}
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-secondary-900 mb-6">
              Redefining Possibilities
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-secondary-600 mb-12 max-w-2xl mx-auto">
              Join us in Gombe, Nigeria for an inspiring journey of innovation, creativity, and transformative ideas that will reshape our future.
            </p>

            {/* Event Countdown Card */}
            {upcomingEvent && (
              <div className="bg-secondary-50 rounded-2xl shadow-soft p-6 md:p-8 mb-8 max-w-3xl mx-auto">
                {/* Event Countdown Header */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <svg
                    className="h-5 w-5 text-primary-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-secondary-900">
                    Event Countdown
                  </h3>
                </div>

                {/* Countdown Timer */}
                <div className="mb-8">
                  <CountdownTimer targetDate={upcomingEvent.date} />
                </div>

                {/* Event Details Card */}
                <div className="bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  {upcomingEvent.date && (
                    <div className="flex items-center gap-2 text-secondary-700">
                      <svg
                        className="h-5 w-5 text-primary-500 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium text-base">{formatDate(upcomingEvent.date, 'MMMM yyyy')}</span>
                    </div>
                  )}
                  {upcomingEvent.venue && (
                    <div className="flex items-center gap-2 text-secondary-700">
                      <svg
                        className="h-5 w-5 text-primary-500 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium text-base">
                        {upcomingEvent.venue.includes(',') 
                          ? upcomingEvent.venue.split(',')[0] + ', Nigeria'
                          : upcomingEvent.venue + ', Nigeria'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {upcomingEvent && (
                <Link to={`/events/${upcomingEvent._id}`}>
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Register Now
                  </Button>
                </Link>
              )}
              <a href="#about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-500 text-primary-500 hover:bg-primary-50">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="events" className="py-16 md:py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover our diverse range of events, from inspiring TEDx talks to hands-on workshops and innovation summits.
            </p>
          </div>
          <EventGrid events={displayedEvents} isLoading={isLoading} />
          {error && (
            <div className="text-center mt-6 text-red-600">{error}</div>
          )}
          {!showAll && activeEvents.length > 3 && (
            <div className="text-center mt-10">
              <Link to="/events">
                <Button variant="secondary" size="lg">
                  View more events
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              About TEDxPantami
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              TEDxPantami is an independently organized TED event that brings together brilliant minds to share ideas worth spreading. Based in Gombe, Nigeria, we're committed to fostering innovation and inspiring positive change in our community.
            </p>
            <p className="text-lg text-secondary-600">
              Our events bring together entrepreneurs, innovators, artists, and thought leaders who are reshaping industries and communities across Northern Nigeria and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-16 md:py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Gallery
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore highlights from past events, workshops, and community moments.
            </p>
          </div>
          <div className="mb-10">
            <GalleryGrid items={mockGalleryItems} limit={6} />
          </div>
          <div className="text-center">
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-primary text-white mb-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Us?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Be part of the conversation that's shaping the future of innovation in Northern Nigeria.
          </p>
          <Link to="/events">
            <Button variant="secondary" size="lg">
              Browse Events
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
