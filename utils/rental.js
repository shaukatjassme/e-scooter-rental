// utils/rental.js
import { supabase } from './supabaseClient';

export const bookScooter = async (scooterId) => {
  const user = supabase.auth.user();
  if (!user) {
    alert('Please log in to rent a scooter.');
    return;
  }

  const { data, error } = await supabase
    .from('rentals')
    .insert([{ user_id: user.id, scooter_id: scooterId, start_time: new Date(), end_time: null, cost: 0 }]);

  if (error) {
    console.error('Error booking scooter:', error);
  } else {
    console.log('Scooter booked successfully:', data);
  }
};

export const returnScooter = async (rentalId) => {
    const { data, error } = await supabase
      .from('rentals')
      .update({ end_time: new Date(), cost: calculateCost() })
      .eq('id', rentalId);
  
    if (error) {
      console.error('Error returning scooter:', error);
    } else {
      console.log('Scooter returned successfully:', data);
    }
  };
  
  const calculateCost = () => {
    // Implement cost calculation logic
    return 10; // Example cost
  };
  