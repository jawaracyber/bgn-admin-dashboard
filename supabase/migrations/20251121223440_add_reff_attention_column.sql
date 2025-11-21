/*
  # Add reff_attention column to sppg table

  1. Changes
    - Add `reff_attention` column to `sppg` table with default empty string
    - Column is nullable and can be updated
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sppg' AND column_name = 'reff_attention'
  ) THEN
    ALTER TABLE sppg ADD COLUMN reff_attention text DEFAULT '';
  END IF;
END $$;
