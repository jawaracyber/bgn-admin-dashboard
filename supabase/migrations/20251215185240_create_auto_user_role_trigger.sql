/*
  # Auto-create user role on signup

  1. Changes
    - Creates a trigger function to automatically insert user_roles entry
    - Adds trigger to auth.users table
    - Sets default role to USER_GRANTED for safety
    - First user gets SUPER_USER role automatically
  
  2. Security
    - Trigger runs with SECURITY DEFINER to bypass RLS
    - Only creates role if one doesn't already exist
  
  3. Important Notes
    - This ensures every new user gets a role entry automatically
    - First user in the system becomes SUPER_USER
    - All subsequent users become USER_GRANTED by default
*/

-- Function to automatically create user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_count INTEGER;
  default_role TEXT;
BEGIN
  -- Check if this is the first user
  SELECT COUNT(*) INTO user_count FROM auth.users;
  
  -- First user gets SUPER_USER, others get USER_GRANTED
  IF user_count <= 1 THEN
    default_role := 'SUPER_USER';
  ELSE
    default_role := 'USER_GRANTED';
  END IF;

  -- Insert user role if not exists
  INSERT INTO public.user_roles (user_id, email, role, full_name, position)
  VALUES (
    NEW.id,
    NEW.email,
    default_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'position', 'Staff')
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Drop trigger if exists to avoid duplicate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
