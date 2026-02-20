
-- Add new columns to services table
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS what_you_get text[] DEFAULT '{}';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS starting_price_note text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS process_steps jsonb DEFAULT '[]'::jsonb;

-- Add new columns to menus table
ALTER TABLE public.menus ADD COLUMN IF NOT EXISTS best_for text;
ALTER TABLE public.menus ADD COLUMN IF NOT EXISTS dietary_notes text;
ALTER TABLE public.menus ADD COLUMN IF NOT EXISTS menu_sections jsonb DEFAULT '[]'::jsonb;

-- Add new columns to menu_items table
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.menu_items ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;
