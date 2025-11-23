/*
  # Update SPPG RLS policies with role-based permissions

  1. Changes
    - Drop existing SPPG policies
    - Add new policies that check user_roles table
    - SUPER_USER: Full access (SELECT, INSERT, UPDATE, DELETE)
    - USER_GRANTED: Read-only access (SELECT only)
  
  2. Security
    - All authenticated users can view SPPG data (read-only default)
    - Only SUPER_USER can insert new SPPG records
    - Only SUPER_USER can update SPPG records
    - Only SUPER_USER can delete SPPG records
*/

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON sppg;

CREATE POLICY "All authenticated users can view SPPG"
  ON sppg
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only super users can insert SPPG"
  ON sppg
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );

CREATE POLICY "Only super users can update SPPG"
  ON sppg
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

CREATE POLICY "Only super users can delete SPPG"
  ON sppg
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );
