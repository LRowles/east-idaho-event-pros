
-- =============================================
-- Simply Delicious Catering — Full Schema
-- =============================================

-- 1. Cities
CREATE TABLE public.cities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL DEFAULT 'Idaho',
  intro_blurb TEXT,
  seo_title TEXT,
  seo_description TEXT,
  faq JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cities are publicly readable" ON public.cities FOR SELECT USING (true);

-- 2. Services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  icon TEXT,
  seo_title TEXT,
  seo_description TEXT,
  faq JSONB DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are publicly readable" ON public.services FOR SELECT USING (true);

-- 3. Menus (categories)
CREATE TABLE public.menus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menus are publicly readable" ON public.menus FOR SELECT USING (true);

-- 4. Menu Items
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  dietary_tags TEXT[] DEFAULT '{}',
  pricing_note TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menu items are publicly readable" ON public.menu_items FOR SELECT USING (true);

-- 5. Testimonials
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  quote TEXT NOT NULL,
  event_type TEXT,
  city_id UUID REFERENCES public.cities(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials are publicly readable" ON public.testimonials FOR SELECT USING (true);

-- 6. Galleries
CREATE TABLE public.galleries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  event_type TEXT,
  city_id UUID REFERENCES public.cities(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Galleries are publicly readable" ON public.galleries FOR SELECT USING (true);

-- 7. Blog Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category TEXT,
  city_id UUID REFERENCES public.cities(id),
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts FOR SELECT USING (published = true);

-- 8. Leads
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT,
  event_date DATE,
  guest_count INT,
  event_city TEXT,
  venue_address TEXT,
  service_style TEXT,
  budget_range TEXT,
  dietary_needs TEXT,
  menu_interest TEXT,
  message TEXT,
  source TEXT DEFAULT 'quote_form',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Leads: anyone can insert (public form), no public read
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);

-- Seed 27 East Idaho cities
INSERT INTO public.cities (name, slug, intro_blurb) VALUES
  ('Idaho Falls', 'idaho-falls', 'Full-service catering for weddings, corporate events, and private parties in Idaho Falls.'),
  ('Ammon', 'ammon', 'Professional catering services for every occasion in Ammon, Idaho.'),
  ('Shelley', 'shelley', 'Locally owned catering company proudly based in Shelley, Idaho.'),
  ('Rigby', 'rigby', 'Delicious catering for your next event in Rigby, Idaho.'),
  ('Rexburg', 'rexburg', 'Wedding and event catering serving the Rexburg community.'),
  ('Blackfoot', 'blackfoot', 'Quality catering for Blackfoot gatherings and celebrations.'),
  ('Pocatello', 'pocatello', 'East Idaho catering extending to Pocatello for all event types.'),
  ('Chubbuck', 'chubbuck', 'Reliable catering services in Chubbuck, Idaho.'),
  ('Iona', 'iona', 'Personalized catering for Iona events big and small.'),
  ('Ucon', 'ucon', 'Farm-fresh catering for Ucon, Idaho celebrations.'),
  ('Lewisville', 'lewisville', 'Custom catering menus for Lewisville events.'),
  ('Menan', 'menan', 'Local catering for Menan community events.'),
  ('Roberts', 'roberts', 'Dependable catering for Roberts, Idaho gatherings.'),
  ('Firth', 'firth', 'Catering services tailored for Firth, Idaho.'),
  ('Basalt', 'basalt', 'Event catering for the Basalt area.'),
  ('Sugar City', 'sugar-city', 'Catering for Sugar City weddings and events.'),
  ('St. Anthony', 'st-anthony', 'Full-service catering in St. Anthony, Idaho.'),
  ('Ashton', 'ashton', 'Catering for Ashton events and celebrations.'),
  ('Driggs', 'driggs', 'Mountain-town catering in Driggs, Idaho.'),
  ('Victor', 'victor', 'Teton Valley catering services in Victor, Idaho.'),
  ('Mud Lake', 'mud-lake', 'Community catering in Mud Lake, Idaho.'),
  ('Terreton', 'terreton', 'Event catering for Terreton and surrounding areas.'),
  ('Hamer', 'hamer', 'Catering services for Hamer, Idaho events.'),
  ('Dubois', 'dubois', 'Catering for Dubois celebrations and gatherings.'),
  ('Arco', 'arco', 'Quality catering for Arco, Idaho events.'),
  ('Mackay', 'mackay', 'Mountain catering for Mackay, Idaho.'),
  ('Salmon', 'salmon', 'Full-service catering for Salmon, Idaho events.');

-- Seed 7 services
INSERT INTO public.services (name, slug, tagline, description, icon, sort_order) VALUES
  ('Wedding Catering', 'wedding-catering', 'Make your big day unforgettable', 'From elegant plated dinners to relaxed buffets, we craft wedding menus that reflect your style and delight every guest.', 'heart', 1),
  ('Corporate Catering', 'corporate-catering', 'Fuel your team & impress clients', 'Professional catering for meetings, conferences, team lunches, and corporate events of any size.', 'briefcase', 2),
  ('Private & Social Events', 'private-social-events', 'Celebrate every milestone', 'Birthdays, anniversaries, graduations, reunions — we handle the food so you can enjoy the party.', 'party-popper', 3),
  ('Drop-Off Catering', 'drop-off-catering', 'Hot & ready, right on time', 'Freshly prepared meals delivered to your door — perfect for office lunches, family gatherings, and casual events.', 'truck', 4),
  ('School & Community Events', 'school-community-events', 'Feeding your community', 'Affordable, large-scale catering for school functions, fundraisers, church events, and community gatherings.', 'school', 5),
  ('Holiday Catering', 'holiday-catering', 'Seasonal menus, zero stress', 'Thanksgiving, Christmas, Easter, and beyond — let us handle the holiday feast while you enjoy family.', 'gift', 6),
  ('Equipment Rentals', 'equipment-rentals', 'Everything you need for your event', 'Tables, chairs, linens, chafing dishes, and more — available as add-ons or standalone rentals.', 'settings', 7);

-- Seed 7 menu categories
INSERT INTO public.menus (name, slug, description, sort_order) VALUES
  ('Wedding Menus', 'wedding-menus', 'Elegant menus for your special day, from cocktail hour to dessert.', 1),
  ('Corporate Menus', 'corporate-menus', 'Professional boxed lunches, buffets, and plated meals for the office.', 2),
  ('Social & Party Menus', 'social-party-menus', 'Fun, flexible menus for birthdays, reunions, and celebrations.', 3),
  ('Drop-Off & Boxed Meals', 'drop-off-boxed-meals', 'Ready-to-serve meals delivered hot and fresh.', 4),
  ('Appetizers & Sides', 'appetizers-sides', 'Starters and sides to complement any event menu.', 5),
  ('Desserts', 'desserts', 'Sweet endings for every occasion.', 6),
  ('Beverages', 'beverages', 'Refreshing drinks and beverage service for your event.', 7);
