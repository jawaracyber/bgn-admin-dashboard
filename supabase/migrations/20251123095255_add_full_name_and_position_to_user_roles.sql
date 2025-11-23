/*
  # Add full_name and position to user_roles table

  1. Changes
    - Add `full_name` column (text, not null with default)
    - Add `position` column (text, not null with default)
  
  2. Important Notes
    - These columns will store user's full name and job position
    - Used for display in the navbar instead of just email
    - Default values provided for existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_roles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE user_roles ADD COLUMN full_name text NOT NULL DEFAULT 'User';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_roles' AND column_name = 'position'
  ) THEN
    ALTER TABLE user_roles ADD COLUMN position text NOT NULL DEFAULT 'Staff';
  END IF;
END $$;
