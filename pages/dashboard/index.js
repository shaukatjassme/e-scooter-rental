// pages/dashboard/index.js
import React, { useEffect, useState } from 'react';
import withAuth from '../../utils/withAuth';
import { supabase } from '../../utils/supabaseClient';
import styles from '../../styles/Dashboard.module.css'; // Import the CSS module

const DashboardPage = () => {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScooters = async () => {
      const { data, error } = await supabase.from('scooters').select('*');
      if (error) {
        setError(error);
        console.error('Error fetching scooters:', error);
      } else {
        console.log('Scooters data:', data);
        setScooters(data);
      }
      setLoading(false);
    };

    fetchScooters();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading scooters: {error.message}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <a href="/map" className={styles.mapLink}>View Map</a>
      <ul className={styles.scooterList}>
        {scooters.length > 0 ? (
          scooters.map((scooter) => (
            <li key={scooter.id} className={styles.scooterItem}>
              <div className={styles.scooterDetails}>
                <div className={styles.scooterText}>
                  <h2 className={styles.scooterModel}>{scooter.model}</h2>
                  <p className={styles.scooterStatus}>Status: {scooter.is_available ? 'Available' : 'Unavailable'}</p>
                  <p className={styles.scooterManufacturer}>Manufacturer: {scooter.manufacturer}</p>
                  <p className={styles.scooterPrice}>Price: ${scooter.price.toFixed(2)}</p>
                  <p className={styles.scooterBattery}>Battery Status: {scooter.battery_status}</p>
                  <p className={styles.scooterLocation}>
                    Location: {scooter.latitude && scooter.longitude ? 
                      `Lat: ${scooter.latitude}, Lon: ${scooter.longitude}` : 'N/A'}
                  </p>
                  <a 
                    href={`/map?lat=${scooter.latitude}&lon=${scooter.longitude}`} 
                    className={styles.mapLink}
                  >
                    View on Map
                  </a>
                </div>
                <div className={styles.scooterImage}>
                  {scooter.image_url ? <img src={scooter.image_url} alt={scooter.model} /> : <div className={styles.noImage}>No Image</div>}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className={styles.noScooters}>No scooters available.</li>
        )}
      </ul>
    </div>
  );
};

export default withAuth(DashboardPage);
