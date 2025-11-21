/*
  # Create SPPG Table

  1. New Tables
    - `sppg`
      - `id` (text, primary key) - ID SPPG yang di-generate
      - `nama_sppg` (text) - Nama SPPG
      - `kota_kabupaten` (text) - Kota/Kabupaten
      - `provinsi` (text) - Provinsi
      - `alamat` (text, optional) - Alamat lengkap
      - `status` (text, optional) - Status operasional
      - `created_at` (timestamptz) - Waktu data dibuat
      - `updated_at` (timestamptz) - Waktu data diupdate

  2. Security
    - Enable RLS on `sppg` table
    - Add policy for public to read SPPG data
    - Add policy for authenticated users to insert SPPG data
    - Add policy for authenticated users to update SPPG data
    - Add policy for authenticated users to delete SPPG data

  3. Notes
    - ID SPPG akan di-generate di aplikasi dengan format custom
    - Data provinsi dan kota/kabupaten akan diambil dari API public Indonesia
*/

CREATE TABLE IF NOT EXISTS sppg (
  id text PRIMARY KEY,
  nama_sppg text NOT NULL,
  kota_kabupaten text NOT NULL,
  provinsi text NOT NULL,
  alamat text DEFAULT '',
  status text DEFAULT 'Aktif',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sppg ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read SPPG data"
  ON sppg
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert SPPG data"
  ON sppg
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update SPPG data"
  ON sppg
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete SPPG data"
  ON sppg
  FOR DELETE
  TO authenticated
  USING (true);