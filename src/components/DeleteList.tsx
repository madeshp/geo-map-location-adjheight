import React from 'react';
import { Location } from '../types';

interface DeletedListProps {
  deletedLocations: Location[];
  onRestoreLocation: (id: number) => void;
}

export default function DeletedList({ deletedLocations, onRestoreLocation }: DeletedListProps) {
  return (
    <div className="deleted-section">
      <div className="deleted-header">Deleted Locations</div>
      <div className="deleted-list">
        {deletedLocations.map(location => (
          <div key={location.id} className="location-card" data-id={location.id} data-lat={location.coordinates[0]} data-lng={location.coordinates[1]}>
            <button className="restore-btn" onClick={() => onRestoreLocation(location.id)} title="Restore location">+</button>
            <div className="name">{location.name}</div>
            <div className="address">{location.address}</div>
            <div className="details">{location.status} • {location.lastUpdate}</div>
          </div>
        ))}
      </div>
    </div>
  );
}