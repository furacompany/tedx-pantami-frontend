import React from 'react';
import type { GalleryItem } from '../../types/gallery';
import { GalleryCard } from './GalleryCard';

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick?: (item: GalleryItem) => void;
  limit?: number;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemClick, limit }) => {
  const displayItems = limit ? items.slice(0, limit) : items;

  if (displayItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-500 text-lg">No gallery items found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {displayItems.map((item) => (
        <GalleryCard key={item._id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
};


