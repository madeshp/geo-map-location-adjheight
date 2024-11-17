import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Location } from '../types';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

/*L.Icon.Default.imagePath = '';
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
}); */

L.Marker.prototype.options.icon = L.icon({
  iconUrl: '/marker-icon-2x.png',
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Default anchor
  shadowUrl: '/marker-shadow.png',
  shadowSize: [41, 41], // Default shadow size
  shadowAnchor: [12, 41], // Default shadow anchor
});
/*L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
}); */
interface MapProps {
  locations: Location[];
  activeLocation?: Location;
}
//const customIcon = new L.Icon({
//  iconUrl: '/assets/images/marker-icon.png',
//  iconRetinaUrl: '/assets/images/marker-icon-2x.png',
//  shadowUrl: '/assets/images/marker-shadow.png',
//  iconSize: [25, 41],
//  iconAnchor: [12, 41],
//  popupAnchor: [1, -34],
//  shadowSize: [41, 41]
//});


export const Map: React.FC<MapProps> = ({ locations, activeLocation }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});
  L.Icon.Default.imagePath = '/path/to/your/images/';
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([39.8283, -98.5795], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    //
    locations.forEach(location => {
      const marker = L.marker(location.coordinates)
        .bindPopup(`<strong>${location.name}</strong><br>${location.address}`)
        .addTo(mapRef.current!);
      markersRef.current[location.id] = marker;
    });

    // Fit bounds if there are markers
    if (locations.length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [locations]);

  useEffect(() => {
    if (!mapRef.current || !activeLocation) return;

    const marker = markersRef.current[activeLocation.id];
    if (marker) {
      mapRef.current.setView(activeLocation.coordinates, 13);
      marker.openPopup();
    }
  }, [activeLocation]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};