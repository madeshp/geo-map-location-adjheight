import { LatLngTuple } from 'leaflet';
import { Location } from '../types';
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  locations: Location[];
}

export default function MapView({ locations }: MapViewProps) {
  // Define 'center' with a LatLngTuple type to ensure it's exactly two numbers
  const center: LatLngTuple = locations.length > 0
    ? [locations[0].coordinates[0], locations[0].coordinates[1]]
    : [39.8283, -98.5795];

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.invalidateSize(); // Ensure the map resizes properly
    }
  }, [locations]); // Re-run if locations change


  return (
    <div className="map-container">
      <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}  ref={mapRef}>
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
    </div>
  );
}