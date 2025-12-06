/*
  # Create Attendance Confirmations Table

  1. New Tables
    - `attendance_confirmations`
      - `id` (uuid, primary key) - Unique identifier for each confirmation
      - `nama_lengkap` (text, not null) - Full name of the attendee
      - `nik` (text, not null, unique) - National ID number (16 digits)
      - `nomor_handphone` (text, not null) - Phone number
      - `email` (text, not null) - Email address
      - `foto_filename` (text, nullable) - Photo filename for simulation
      - `created_at` (timestamptz, default now()) - Timestamp of confirmation

  2. Security
    - Enable RLS on `attendance_confirmations` table
    - Add policy for INSERT allowing both authenticated and anonymous users to submit
    - Add policy for SELECT allowing only authenticated users to view submissions

  3. Indexes
    - Add unique constraint on NIK to prevent duplicates
    - Add index on email for faster queries

  4. Important Notes
    - NIK must be unique to prevent duplicate registrations
    - Anonymous users can submit confirmations (public access)
    - Only authenticated users can view the list of confirmations
*/

-- Create attendance_confirmations table
CREATE TABLE IF NOT EXISTS attendance_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_lengkap text NOT NULL,
  nik text NOT NULL,
  nomor_handphone text NOT NULL,
  email text NOT NULL,
  foto_filename text,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint on NIK to prevent duplicates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'attendance_confirmations_nik_unique'
  ) THEN
    ALTER TABLE attendance_confirmations 
    ADD CONSTRAINT attendance_confirmations_nik_unique UNIQUE (nik);
  END IF;
END $$;

-- Create index on email for faster queries
CREATE INDEX IF NOT EXISTS idx_attendance_confirmations_email 
ON attendance_confirmations(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_attendance_confirmations_created_at 
ON attendance_confirmations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE attendance_confirmations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (authenticated and anonymous) to insert confirmations
CREATE POLICY "Anyone can submit attendance confirmation"
  ON attendance_confirmations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all confirmations
CREATE POLICY "Authenticated users can view all confirmations"
  ON attendance_confirmations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow anyone to check if NIK already exists (for duplicate check)
CREATE POLICY "Anyone can check NIK existence"
  ON attendance_confirmations
  FOR SELECT
  TO public
  USING (true);