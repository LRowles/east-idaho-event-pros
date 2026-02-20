
-- Add new columns to cities table for CSV data
ALTER TABLE public.cities ADD COLUMN IF NOT EXISTS nearby_areas text[] DEFAULT '{}';
ALTER TABLE public.cities ADD COLUMN IF NOT EXISTS venues_or_landmarks text[] DEFAULT '{}';
ALTER TABLE public.cities ADD COLUMN IF NOT EXISTS service_radius_notes text;
