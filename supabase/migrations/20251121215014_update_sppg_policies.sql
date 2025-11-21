/*
  # Update SPPG RLS Policies

  1. Changes
    - Drop existing restrictive policies
    - Create new public policies that allow anyone to insert, update, and delete
    - This is needed because the app doesn't have authentication yet

  2. Security Notes
    - These policies allow public access for testing
    - In production, authentication should be added and policies restricted
*/

DROP POLICY IF EXISTS "Authenticated users can insert SPPG data" ON sppg;
DROP POLICY IF EXISTS "Authenticated users can update SPPG data" ON sppg;
DROP POLICY IF EXISTS "Authenticated users can delete SPPG data" ON sppg;

CREATE POLICY "Anyone can insert SPPG data"
  ON sppg
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update SPPG data"
  ON sppg
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete SPPG data"
  ON sppg
  FOR DELETE
  USING (true);