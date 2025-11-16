import React, { useState } from 'react';
import { mockGalleryItems } from '../data/mockData';
import { GalleryGrid } from '../components/Gallery/GalleryGrid';
import type { GalleryItem } from '../types/gallery';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(mockGalleryItems.map(item => item.category).filter(Boolean))) as string[];

  // Filter items by category
  const filteredItems = selectedCategory
    ? mockGalleryItems.filter(item => item.category === selectedCategory)
    : mockGalleryItems;

  return (
    <div className="py-12 md:py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            Event Gallery
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Relive the moments that have shaped our community. From inspiring talks to networking sessions, see how we're making an impact together.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <GalleryGrid items={filteredItems} />

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};


