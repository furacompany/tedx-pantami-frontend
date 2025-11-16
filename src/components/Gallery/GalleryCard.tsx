import React from 'react';
import type { GalleryItem } from '../../types/gallery';

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: (item: GalleryItem) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow cursor-pointer group"
      onClick={() => onClick && onClick(item)}
    >
      <div className="aspect-video relative overflow-hidden bg-secondary-200">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        {item.category && (
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {item.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-display text-lg md:text-xl font-semibold text-secondary-900 mb-2 line-clamp-2">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-secondary-600 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};


