/*
  # Create announcements table for dashboard notifications

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text) - Main title of the announcement
      - `short_description` (text) - Brief description shown in banner
      - `full_content` (text) - Full detailed content for modal
      - `is_active` (boolean) - Whether announcement is currently active
      - `priority` (integer) - Priority level for ordering (higher = more important)
      - `created_at` (timestamptz) - When announcement was created
      - `updated_at` (timestamptz) - Last update timestamp
  
  2. Security
    - Enable RLS on `announcements` table
    - Add policy for authenticated users to read active announcements
*/

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  full_content text NOT NULL,
  is_active boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Public users can view active announcements"
  ON announcements
  FOR SELECT
  TO anon
  USING (is_active = true);