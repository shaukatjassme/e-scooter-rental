// components/MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import styles from './MapComponent.module.css'; // Import CSS module for styling

const MapComponent = ({ scooters }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform browser-specific actions here
    }
  }, []);

  return (
    <MapContainer center={[viewport.latitude, viewport.longitude]} zoom={viewport.zoom} className={styles.map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {scooters.map((scooter) => (
        scooter.location && scooter.location.latitude && scooter.location.longitude ? (
          <Marker
            key={scooter.id}
            position={[scooter.location.latitude, scooter.location.longitude]}
          >
            <Popup>
              <strong>{scooter.model}</strong><br />
              Manufacturer: {scooter.manufacturer}<br />
              Price: ${scooter.price.toFixed(2)}
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapComponent;
