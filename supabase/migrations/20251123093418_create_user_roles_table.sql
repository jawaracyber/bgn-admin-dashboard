/*
  # Create user roles table

  1. New Tables
    - `user_roles`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key to auth.users) - References the user
      - `email` (text) - User's email for easy reference
      - `role` (text) - Role type: 'SUPER_USER' or 'USER_GRANTED'
      - `created_at` (timestamptz) - When the role was assigned
      - `updated_at` (timestamptz) - Last modification time
  
  2. Security
    - Enable RLS on `user_roles` table
    - Add policy for authenticated users to read their own role
    - Add policy for SUPER_USER to manage all roles
  
  3. Important Notes
    - SUPER_USER: Full access - can create, edit, delete SPPG data
    - USER_GRANTED: Read-only access - can only view SPPG data
    - Default role is USER_GRANTED for safety
*/

CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('SUPER_USER', 'USER_GRANTED')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Super users can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
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
      WHERE user_roles.user_id = auth.uid()
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

CREATE POLICY "Super users can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'SUPER_USER'
    )
  );

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_email ON user_roles(email);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
