/*
  # Delete All Tables - Complete Database Cleanup

  ## WARNING: DESTRUCTIVE OPERATION
  This migration will permanently delete all tables and their data.
  This action CANNOT be undone.

  ## Tables to be dropped:
  1. `sppg` - Contains 256 SPPG records
  2. `announcements` - Contains 1 announcement
  3. `attendance_confirmations` - Contains 1 attendance confirmation
  4. `kpi_baseline` - Contains 3 KPI baseline records
  5. `system_settings` - Contains 1 system setting
  6. `user_roles` - Contains 3 user role records

  ## Order of deletion:
  - Tables with foreign keys dropped first
  - Independent tables dropped last
*/

-- Drop tables with foreign key constraints first
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;

-- Drop independent tables
DROP TABLE IF EXISTS kpi_baseline CASCADE;
DROP TABLE IF EXISTS attendance_confirmations CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS sppg CASCADE;