/*
  # Add prog_stat column to sppg table

  1. Changes
    - Add `prog_stat` column to `sppg` table
      - Type: text
      - Default: 'PENDING UPDATE'
      - Used for tracking program status in the frontend "Status Pengajuan" column
    
  2. Notes
    - This column will replace the current `status` column usage for "Status Pengajuan"
    - Possible values: 'PENDING UPDATE', 'Waiting Review', 'Rejected', 'Approved Kuota', 'Approved Coordinate'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sppg' AND column_name = 'prog_stat'
  ) THEN
    ALTER TABLE sppg ADD COLUMN prog_stat text DEFAULT 'PENDING UPDATE';
  END IF;
END $$;
