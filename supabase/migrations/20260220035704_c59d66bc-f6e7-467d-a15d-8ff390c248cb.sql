
CREATE TABLE public.section_menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_item_name TEXT NOT NULL,
  menu_item_slug TEXT NOT NULL UNIQUE,
  menu_section_slug TEXT NOT NULL,
  subsection_slug TEXT,
  short_description TEXT,
  details TEXT,
  serving_size TEXT,
  options_list TEXT,
  price_text TEXT DEFAULT 'Quote based',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.section_menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Section menu items are publicly readable"
ON public.section_menu_items
FOR SELECT
USING (true);

CREATE INDEX idx_section_menu_items_section ON public.section_menu_items(menu_section_slug);
