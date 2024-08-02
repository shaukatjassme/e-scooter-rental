// components/Scooter/ScooterDetails.js
import React from 'react';

const ScooterDetails = ({ scooter }) => {
  if (!scooter) return null;

  return (
    <div>
      <h2>{scooter.model}</h2>
      <p>Location: {scooter.location.coordinates.join(', ')}</p>
      <p>Status: {scooter.is_available ? 'Available' : 'Unavailable'}</p>
    </div>
  );
};

export default ScooterDetails;
