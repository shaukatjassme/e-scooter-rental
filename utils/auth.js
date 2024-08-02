// utils/auth.js
import { supabase } from './supabaseClient';

// Sign Up
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { user: data.user, error };
};

// Sign In
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error };
};

// Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
