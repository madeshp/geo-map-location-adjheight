import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { LatLngTuple } from 'leaflet';
import { Location } from '../src/types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';

const API_URL = 'https://temp.staticsave.com/673244e3f3dbf.json';

export default function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isMapEnabled, setIsMapEnabled] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Validate coordinates
        const validLocations = data.filter(
          (location: Location) =>
            Array.isArray(location.coordinates) &&
            location.coordinates.length === 2 &&
            location.coordinates.every(coord => typeof coord === 'number')
        );

        setLocations(validLocations);
        setIsMapEnabled(validLocations.length > 0);
        setError(null);
      } catch (err: any) {
        setError("Failed to load locations. Please try again later.");
        setIsMapEnabled(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  // Detect clicks outside the map container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapContainerRef.current && !mapContainerRef.current.contains(event.target as Node)) {
        setIsMapVisible(false); // Close map if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const center: LatLngTuple = locations.length > 0
    ? [locations[0].coordinates[0], locations[0].coordinates[1]]
    : [39.8283, -98.5795];

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize(); // Ensure the map resizes properly
    }
  }, [locations]); // Re-run if locations change

  return (
    <div className="App">
      {isMapVisible && (
        <div className="map-container" ref={mapContainerRef}>
          {isLoading ? (
            <div className="loading">Loading locations...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }} ref={mapRef}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map(location => (
                <Marker key={location.id} position={location.coordinates as LatLngTuple}>
                  <Popup>
                    <strong>{location.name}</strong><br />
                    {location.address}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      )}

      <button
        className="map-toggle-button"
        onClick={toggleMapVisibility}
        disabled={!isMapEnabled || isLoading}
        style={{
          backgroundColor: isMapEnabled && !isLoading ? 'white' : 'lightgray',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isMapEnabled && !isLoading ? 'url(http://www.rw-designer.com/cursor-extern.php?id=18260), pointer' : 'not-allowed',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {isMapVisible ? (
          <FaTimes size={20} style={{ color: 'red' }} />
        ) : (
          <FaMapMarkedAlt size={20} style={{ color: isMapEnabled && !isLoading ? 'green' : 'gray' }} />
        )}
      </button>
    </div>
  );
}
