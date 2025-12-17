/*
  # Create System Settings Table

  1. New Tables
    - `system_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `setting_key` (text, unique) - Unique key for each setting
      - `setting_value` (boolean) - Boolean value for toggle settings
      - `description` (text) - Human-readable description of the setting
      - `updated_at` (timestamptz) - Last update timestamp
      - `updated_by` (uuid) - References auth.users, tracks who made the change
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `system_settings` table
    - Add policy for authenticated users to read settings
    - Add policy for super users only to insert/update/delete settings

  3. Initial Data
    - Insert default setting for SPPG page access control (enabled by default)
*/

CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value boolean NOT NULL DEFAULT true,
  description text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can read settings
CREATE POLICY "Authenticated users can read system settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only super users can insert settings
CREATE POLICY "Super users can insert system settings"
  ON system_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );

-- Policy: Only super users can update settings
CREATE POLICY "Super users can update system settings"
  ON system_settings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );

-- Policy: Only super users can delete settings
CREATE POLICY "Super users can delete system settings"
  ON system_settings
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );

-- Insert default SPPG page access setting
INSERT INTO system_settings (setting_key, setting_value, description)
VALUES (
  'sppg_page_enabled',
  true,
  'Controls whether the SPPG page is accessible to all users. When OFF, no users (including super users) can access the SPPG page.'
)
ON CONFLICT (setting_key) DO NOTHING;