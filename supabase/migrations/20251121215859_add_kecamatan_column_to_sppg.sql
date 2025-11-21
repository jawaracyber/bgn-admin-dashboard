/*
  # Add Kecamatan Column to SPPG Table

  1. Changes
    - Add `kecamatan` column to `sppg` table
    - Column type: text
    - Nullable with empty string as default value
    - Position: after kota_kabupaten, before provinsi

  2. Notes
    - Existing data will have empty string for kecamatan
    - No data migration needed as table uses empty string default
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sppg' AND column_name = 'kecamatan'
  ) THEN
    ALTER TABLE sppg ADD COLUMN kecamatan text DEFAULT '' NOT NULL;
  END IF;
END $$;