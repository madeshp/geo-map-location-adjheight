import React from 'react';
import { Location } from '../types';
import LocationList from './LocationList';
import DeletedList from './DeleteList';

interface SidebarProps {
  locations: Location[];
  deletedLocations: Location[];
  onRemoveLocation: (id: number) => void;
  onRestoreLocation: (id: number) => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  isLoading: boolean;
}

export default function Sidebar({
  locations,
  deletedLocations,
  onRemoveLocation,
  onRestoreLocation,
  onFileUpload,
  error,
  isLoading
}: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2 style={{ margin: 0, display: 'inline-block', marginRight: '10px' }}>Locations</h2>
            <input type="file" id="fileUpload" className="file-upload" accept=".json" onChange={onFileUpload} />
            <label htmlFor="fileUpload" className="upload-btn">Upload a file</label>
          </div>
        </div>
        <div style={{ color: '#666', fontSize: '0.9em', marginTop: '5px' }}>Click location to focus, x to delete</div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <LocationList locations={locations} onRemoveLocation={onRemoveLocation} isLoading={isLoading} />
      <div className="stats">
        Showing {locations.length} location{locations.length !== 1 ? 's' : ''}
      </div>
      <DeletedList deletedLocations={deletedLocations} onRestoreLocation={onRestoreLocation} />
    </div>
  );
}