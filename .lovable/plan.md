

# Simply Delicious Catering — Full Build Plan

## Business Details
- **Address:** 1149 E 1250 N, Shelley, Idaho 83274
- **Phone:** (208) 757-8222 / (775) 287-0792
- **Email:** Simplydeliciousmeals4you@gmail.com

---

## Phase 1: Backend & Data (Lovable Cloud / Supabase)

### Database Collections
Create all 8 tables with relationships:

1. **Cities** — 27 East Idaho cities seeded (Idaho Falls, Ammon, Shelley, Rigby, Rexburg, etc.) with slugs, intro blurbs, SEO fields, and FAQ
2. **Services** — 7 services seeded (Wedding, Corporate, Private/Social, Drop-Off, School/Community, Holiday, Rentals)
3. **Menus** — 7 menu categories seeded (Wedding, Corporate, Social/Party, Drop-Off/Boxed, Appetizers, Desserts, Beverages)
4. **Menu Items** — Individual food items with dietary tags (GF, V, VG, DF, NF), photos, and pricing notes
5. **Testimonials** — Client reviews linked to cities and event types with ratings
6. **Galleries** — Photo galleries organized by event type and city
7. **Blog Posts** — Blog entries with categories, city relations, and SEO fields
8. **Leads** — Quote form submissions stored for follow-up

---

## Phase 2: Site Layout & Navigation

### Sticky Header
- Logo + nav: Home | Weddings | Corporate | Menus | Gallery | Service Area | Blog | Get a Quote
- Sticky "Get a Quote" button always visible
- Click-to-call phone number on mobile
- Responsive hamburger menu on mobile

### Footer
- Business NAP (name, address, phone)
- Quick links to all main pages
- "Quick Question" mini-form (name, email, message)
- Social media links placeholder
- © Simply Delicious Catering

---

## Phase 3: Static Pages (14 pages)

### 1. Home Page
- **Hero** with H1: "East Idaho Catering for Weddings, Corporate Events & Private Parties"
- Trust row: Full-service • Drop-off • Custom menus • Experienced event team
- Services grid (4 cards from Services collection)
- Social proof (3 testimonials)
- Featured menus (4 tiles)
- Gallery preview montage
- Service area city list with links
- "How It Works" 4-step process
- Final CTA band

### 2. Wedding Catering
- Hero, planning help details, menu highlights, FAQ, CTA

### 3. Corporate Catering
- Fast ordering, recurring options, boxed lunches/buffets, CTA

### 4. Private & Social Events
- Birthdays, anniversaries, graduations — flexible styles, CTA

### 5. Drop-Off Catering
- On-time promise, popular options, CTA

### 6. Menus Hub
- Grid of menu categories with event type and dietary filters

### 7. Gallery Hub
- Filterable photo grid (Weddings / Corporate / Social / Drop-Off)

### 8. Testimonials Page
- Sortable by event type and city, CTA

### 9. About Page
- Story, team photos placeholder, service standards, CTA

### 10. Blog Hub
- Category and city tag filters, CTA

### 11. Contact Page
- NAP, hours, map embed placeholder, quick question form, quote CTA

### 12. Get a Quote Page
- Full quote form with all required/optional fields
- Benefits bullets, FAQ, testimonials, trust badges

### 13. Rentals Page
- Equipment/rental options placeholder, CTA

### 14. Service Area Hub
- All 27 cities listed with blurbs and internal links to city pages and service combos

---

## Phase 4: Dynamic Page Templates

### A. City Landing Pages — `/catering/{city-slug}/`
- H1: "Catering in {City Name}, Idaho"
- City-specific intro blurb
- Services available in that city
- Featured menus
- City-filtered testimonials and gallery (fallback to general)
- City-specific FAQ
- CTA with city pre-selected in quote form
- **27 city pages generated from seeded data**

### B. City + Service Pages — `/{service-slug}/{city-slug}/`
- H1: "{Service Name} in {City Name}, Idaho"
- Combined service + city content
- Menu links, combined FAQ
- CTA with city + service pre-selected
- **~100+ combination pages for maximum SEO coverage**

### C. Blog Post Template — `/blog/{post-slug}/`
- Title, featured image, category, date, content, related posts, CTA

### D. Menu Category Template — `/menus/{menu-slug}/`
- Menu name, description, sections, individual items with dietary tags, FAQ, CTA

### E. Gallery Category Template — `/gallery/{gallery-slug}/`
- Gallery name, filterable image grid with captions and city tags

---

## Phase 5: Forms & Lead Capture

### Primary: "Get a Catering Quote" Form
- **Required:** Full name, email, phone, event type, event date, guest count, event city (populated from Cities)
- **Optional:** Venue/address, service style, budget range, dietary needs, menu interest, message
- On submit: save to Leads table, redirect to Thank You page

### Thank You Page
- Confirmation message: "Expect a reply within [X] business hours"
- Browse Menus + Gallery buttons

### Secondary: "Quick Question" Form (footer + contact page)
- Name, email, message — saved to database

---

## Phase 6: SEO & Schema

### On-Page SEO
- Unique H1 per page, structured H2 sections
- SEO title and meta description fields on all dynamic pages
- Internal linking mesh: Services ↔ Menus ↔ City Pages ↔ Quote
- Default SEO title pattern for cities: "Catering {City}, ID | Weddings, Corporate & Events | Simply Delicious"

### JSON-LD Structured Data
- **CateringBusiness** schema site-wide with real business details
- **FAQPage** schema on service pages and city pages
- **BlogPosting** schema on blog templates

### Performance
- Lazy-loaded images in galleries
- Compressed image handling
- No heavy video backgrounds

---

## Content You'll Need to Provide
Since you selected "I'll provide everything," we'll need from you:
- **Menu items** — dish names, descriptions, dietary tags, photos
- **Testimonials** — client names, quotes, event types, ratings, cities
- **Gallery photos** — organized by event type and city
- **Team/about photos** and company story text
- **Blog posts** (or we can build the template and you add posts later)
- **City-specific blurbs** for each of the 27 cities (or approve AI-generated drafts)
- **Business hours** for the contact page

We can start building the full structure immediately and you can supply content as we go.

