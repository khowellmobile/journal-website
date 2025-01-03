import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL_1099;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY_1099;

// Create a Supabase client
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);