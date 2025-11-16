import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string;
  isAnchor: boolean;
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks: NavLink[] = [
    { path: '/', label: 'Home', isAnchor: false },
    { path: '#events', label: 'Events', isAnchor: true },
    { path: '/gallery', label: 'Gallery', isAnchor: false },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold">
              <span className="text-secondary-900">TEDx</span>
              <span className="text-primary-500">Pantami</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.isAnchor) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => {
                      if (location.pathname !== '/') {
                        e.preventDefault();
                        window.location.href = '/' + link.path;
                      }
                    }}
                    className="font-medium transition-colors text-secondary-700 hover:text-primary-500"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-500'
                      : 'text-secondary-700 hover:text-primary-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-700 hover:bg-secondary-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            {navLinks.map((link) => {
              if (link.isAnchor) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (location.pathname !== '/') {
                        e.preventDefault();
                        window.location.href = '/' + link.path;
                      }
                    }}
                    className="block py-2 font-medium transition-colors text-secondary-700 hover:text-primary-500"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-500'
                      : 'text-secondary-700 hover:text-primary-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

