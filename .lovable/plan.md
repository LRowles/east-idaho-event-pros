

## Plan: Extract and Integrate Images from Existing Website

### Overview
Copy the two uploaded logo files into the project and seed the galleries table with curated images from the existing WordPress site. The WordPress image URLs will be referenced directly (hotlinked) since the old site is still live and hosts all the original photos.

### Step 1: Copy Logo Files into Project

- Copy `Simply_Delicious_web_trans.png` (transparent background) to `public/images/logo-transparent.png` -- used in the Header and light backgrounds
- Copy `Simply_Delicious_Logo.png` (dark background) to `public/images/logo-dark.png` -- used in the Footer and dark sections

### Step 2: Update Header to Use Logo Image

Replace the text-only "Simply Delicious" link in `src/components/layout/Header.tsx` with an `<img>` tag using the transparent logo.

### Step 3: Update Footer to Use Logo Image

Update `src/components/layout/Footer.tsx` to display the dark-background logo variant.

### Step 4: Seed Gallery Table with Curated Images

Insert ~30-40 curated full-size images from the URL list into the `public.galleries` table, organized by event type. I will select only the original (non-resized) versions and assign appropriate categories:

**Wedding** (~10 images): Wedding setup shots, table settings, food displays from the 2023/10 and 2025/03 uploads

**Corporate** (~8 images): Food platters, buffet setups, boxed lunches from landscape-oriented photos

**Social** (~8 images): Party setups, dessert displays, casual food spreads

**Drop-Off** (~6 images): Individual meal shots, delivery-ready trays, labeled food items

Each record will include:
- `title`: Descriptive name
- `event_type`: Wedding / Corporate / Social / Drop-Off
- `image_url`: Full-size WordPress URL
- `caption`: Brief description
- `sort_order`: Sequential ordering

### Step 5: Add Hero Background Images

Update `src/pages/Index.tsx` to use one of the food photos (like the grilling chicken hero from the existing site) as a background image in the hero section, replacing the plain color background.

Use key background images:
- Homepage hero: `catering-services-bg.jpg` or the grilling photo
- Service pages: `wedding-resized.jpg`, `food-serving.jpg`, etc.

### Technical Details

- WordPress URLs are used directly as `image_url` values -- no downloading needed since the old site hosts them
- The uploaded logo PNGs are copied into `public/images/` for direct reference in HTML
- Gallery page (`GalleryHub.tsx`) already renders from the `galleries` table with filtering by event_type, so seeded data will display immediately
- No schema changes needed -- the existing `galleries` table structure supports all fields

