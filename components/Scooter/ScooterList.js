// components/Scooter/ScooterList.js
import React from 'react';

const ScooterList = ({ scooters, onSelect }) => {
  return (
    <ul>
      {scooters.map((scooter) => (
        <li key={scooter.id} onClick={() => onSelect(scooter.id)}>
          {scooter.model} - {scooter.is_available ? 'Available' : 'Unavailable'}
        </li>
      ))}
    </ul>
  );
};

export default ScooterList;
