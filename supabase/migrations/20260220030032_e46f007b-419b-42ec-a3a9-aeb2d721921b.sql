
CREATE TABLE public.rental_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  item_slug TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  price_text TEXT,
  price_min NUMERIC(8,2),
  price_max NUMERIC(8,2),
  unit TEXT,
  colors TEXT,
  notes TEXT,
  service_slug TEXT NOT NULL DEFAULT 'event-rentals',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rental_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rental items are publicly readable"
ON public.rental_items
FOR SELECT
USING (true);
