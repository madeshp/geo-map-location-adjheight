import React from 'react';
import { Location } from '../types';
import LocationCard from './LocationCard';

interface LocationListProps {
  locations: Location[];
  onRemoveLocation: (id: number) => void;
  isLoading: boolean;
}

export default function LocationList({ locations, onRemoveLocation, isLoading }: LocationListProps) {
  if (isLoading) {
    return (
      <div className="location-list">
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="location-list">
      {locations.map(location => (
        <LocationCard key={location.id} location={location} onRemove={onRemoveLocation} />
      ))}
    </div>
  );
}