/*
  # Fix Infinite Recursion in user_roles RLS Policies

  1. Problem
    - RLS policies on user_roles table checking the same table causes infinite recursion
    - Need to allow users to read their own role without policy checking other roles
  
  2. Solution
    - Drop all existing policies on user_roles
    - Create simple policy that only checks auth.uid() = user_id (no subquery to user_roles)
    - Super users can manage roles through service role key or direct database access
  
  3. Security
    - Users can only read their own role (by user_id)
    - Prevents infinite recursion by not checking role within the policy itself
*/

-- Drop all existing policies on user_roles to prevent conflicts
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Super users can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can update roles" ON user_roles;
DROP POLICY IF EXISTS "Super users can delete roles" ON user_roles;

-- Simple policy: Users can only read their own role (no recursion)
CREATE POLICY "Users can read own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
