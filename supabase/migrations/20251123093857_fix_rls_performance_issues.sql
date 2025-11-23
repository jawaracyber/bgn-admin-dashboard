/*
  # Fix RLS Performance and Policy Issues

  1. Changes
    - Drop all existing RLS policies on user_roles and sppg tables
    - Recreate policies with optimized auth.uid() calls using SELECT wrapper
    - Remove duplicate policies causing conflicts
    - Drop unused indexes on user_roles table
  
  2. Performance Improvements
    - Wrap auth.uid() with (SELECT auth.uid()) to prevent re-evaluation per row
    - This caches the user ID value for the entire query instead of calling it for each row
  
  3. Security
    - SUPER_USER: Full access to all tables
    - USER_GRANTED: Read-only access to sppg table
    - All users can read their own role from user_roles table
*/

-- Drop all existing policies on user_roles
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Super users can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can update roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can delete roles" ON user_roles;

-- Drop all existing policies on sppg
DROP POLICY IF EXISTS "All authenticated users can view SPPG" ON sppg;
DROP POLICY IF EXISTS "Anyone can read SPPG data" ON sppg;
DROP POLICY IF EXISTS "Only super users can insert SPPG" ON sppg;
DROP POLICY IF EXISTS "Anyone can insert SPPG data" ON sppg;
DROP POLICY IF EXISTS "Only super users can update SPPG" ON sppg;
DROP POLICY IF EXISTS "Anyone can update SPPG data" ON sppg;
DROP POLICY IF EXISTS "Only super users can delete SPPG" ON sppg;
DROP POLICY IF EXISTS "Anyone can delete SPPG data" ON sppg;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON sppg;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON sppg;

-- Drop unused indexes on user_roles
DROP INDEX IF EXISTS idx_user_roles_user_id;
DROP INDEX IF EXISTS idx_user_roles_email;
DROP INDEX IF EXISTS idx_user_roles_role;

-- Create optimized RLS policies for user_roles table
CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Super users can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  );

CREATE POLICY "Super users can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  );

CREATE POLICY "Super users can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  );

CREATE POLICY "Super users can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  );

-- Create optimized RLS policies for sppg table
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
      WHERE user_roles.user_id = (SELECT auth.uid())
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
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = (SELECT auth.uid())
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
      WHERE user_roles.user_id = (SELECT auth.uid())
      AND user_roles.role = 'SUPER_USER'
    )
  );
