/*
  # Add progress column to sppg table

  1. Changes
    - Add `progress` column to `sppg` table
      - Type: text
      - Default: 'PERSIAPAN UPDATE'
      - Used for tracking preparation progress
    
  2. Notes
    - This column will be displayed instead of verifikator in the main table view
    - Verifikator information remains accessible in the detail dialog
    - All existing records will automatically have "PERSIAPAN UPDATE" as default
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sppg' AND column_name = 'progress'
  ) THEN
    ALTER TABLE sppg ADD COLUMN progress text DEFAULT 'PERSIAPAN UPDATE';
  END IF;
END $$;
