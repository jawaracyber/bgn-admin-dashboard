import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SPPGData {
  id: string;
  nama_sppg: string;
  kota_kabupaten: string;
  kecamatan: string;
  provinsi: string;
  alamat?: string;
  status?: string;
  reff_attention?: string;
  created_at?: string;
  updated_at?: string;
}
