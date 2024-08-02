// pages/map.js
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useRouter } from 'next/router'; // Import useRouter from next/router
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { supabase } from '../utils/supabaseClient';

// Dynamically import Leaflet components with ssr: false
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MapPage = () => {
  const router = useRouter();
  const { lat, lon } = router.query;
  const [scooters, setScooters] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 34.011009, // Default to Peshawar latitude
    longitude: 71.585047, // Default to Peshawar longitude
    zoom: 12,
  });
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    const fetchScooters = async () => {
      const { data, error } = await supabase.from('scooters').select('*');
      if (error) {
        console.error('Error fetching scooters:', error);
      } else {
        setScooters(data);
      }
    };

    fetchScooters();
  }, []);

  useEffect(() => {
    if (lat && lon) {
      setViewport({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        zoom: 14,
      });
    }
  }, [lat, lon]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      // Create a custom icon for the scooter using the GIF
      const scooterIcon = new L.Icon({
        iconUrl: '/17469.gif', // Path to your GIF icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Anchor point of the icon
        popupAnchor: [0, -32], // Popup anchor point
      });

      setCustomIcon(scooterIcon);
    }
  }, []);

  // Filter for available scooters
  const availableScooters = scooters.filter(scooter => scooter.is_available);

  return (
    <MapContainer
      center={[viewport.latitude, viewport.longitude]}
      zoom={viewport.zoom}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {availableScooters.map((scooter) => (
        scooter.latitude && scooter.longitude && customIcon && (
          <Marker
            key={scooter.id}
            position={[scooter.latitude, scooter.longitude]}
            icon={customIcon} // Use the custom icon
          >
            <Popup>
              <div>
                <h3>{scooter.model}</h3>
                <p>Status: {scooter.is_available ? 'Available' : 'Unavailable'}</p>
                <p>Manufacturer: {scooter.manufacturer}</p>
                <p>Price: ${scooter.price.toFixed(2)}</p>
                <p>Battery Status: {scooter.battery_status}</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapPage;
