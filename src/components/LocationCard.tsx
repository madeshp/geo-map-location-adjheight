import React from 'react';
import { Location } from '../types';

interface LocationCardProps {
  location: Location;
  onRemove: (id: number) => void;
}

export default function LocationCard({ location, onRemove }: LocationCardProps) {
  return (
    <div className="location-card" data-id={location.id} data-lat={location.coordinates[0]} data-lng={location.coordinates[1]}>
      <button className="remove-btn" onClick={() => onRemove(location.id)}>×</button>
      <div className="name">{location.name}</div>
      <div className="address">{location.address}</div>
      <div className="details">Status: {location.status || 'Active'} • Last Updated: {location.lastUpdate || 'Just now'}</div>
    </div>
  );
}