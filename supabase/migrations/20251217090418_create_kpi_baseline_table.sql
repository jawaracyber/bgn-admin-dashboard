/*
  # Create KPI Baseline Configuration Table

  ## Overview
  This migration creates a table to store baseline KPI data for SPPG dashboard calculations.
  The baseline data is sourced from official BGN (Badan Gizi Nasional) statistics:
  - 17,555 SPPG units serving 50 million beneficiaries as of December 2025
  - Plus 10% projection for growth calculations

  ## New Tables
  - `kpi_baseline`
    - `id` (uuid, primary key) - Unique identifier
    - `key` (text, unique) - Configuration key (e.g., 'sppg_baseline', 'penerima_baseline')
    - `value` (numeric) - Numeric value for the baseline
    - `description` (text) - Description of what this baseline represents
    - `created_at` (timestamptz) - Timestamp when record was created
    - `updated_at` (timestamptz) - Timestamp when record was last updated

  ## Initial Data
  The migration inserts three baseline records:
  1. SPPG Baseline: 19,311 units (17,555 + 10%)
  2. Beneficiaries Baseline: 55,000,000 people (50,000,000 + 10%)
  3. Average Beneficiaries per SPPG: 2,848 people (calculated from real data)

  ## Security
  - Enable RLS on kpi_baseline table
  - Allow all authenticated users to read baseline data
  - Only allow service role to update baseline data (manual updates only)

  ## Notes
  - Baseline data represents official BGN statistics plus 10% growth projection
  - Additional SPPG records in the database will be added to these baseline numbers
  - Source: BGN December 2025 report (17,555 SPPG, 50M beneficiaries)
*/

-- Create kpi_baseline table
CREATE TABLE IF NOT EXISTS kpi_baseline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value numeric NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert baseline data from BGN statistics (17,555 SPPG + 10%, 50M beneficiaries + 10%)
INSERT INTO kpi_baseline (key, value, description) VALUES
  ('sppg_baseline', 19311, 'Baseline SPPG units from BGN data (17,555) plus 10% growth projection'),
  ('penerima_baseline', 55000000, 'Baseline beneficiaries from BGN data (50,000,000) plus 10% growth projection'),
  ('avg_penerima_per_sppg', 2848, 'Average beneficiaries per SPPG unit (50,000,000 / 17,555)')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE kpi_baseline ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read baseline data
CREATE POLICY "Anyone can read KPI baseline data"
  ON kpi_baseline
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow public access to read baseline data (for unauthenticated users on dashboard)
CREATE POLICY "Public can read KPI baseline data"
  ON kpi_baseline
  FOR SELECT
  TO anon
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_kpi_baseline_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_kpi_baseline_updated_at
  BEFORE UPDATE ON kpi_baseline
  FOR EACH ROW
  EXECUTE FUNCTION update_kpi_baseline_updated_at();
