
CREATE TABLE public.menu_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_section_name TEXT NOT NULL,
  menu_section_slug TEXT NOT NULL UNIQUE,
  parent_section_slug TEXT,
  section_intro TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.menu_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu sections are publicly readable"
ON public.menu_sections
FOR SELECT
USING (true);
