

## Visual Overhaul: Bigger Logo, Better Hero, Photos Throughout

### What's Changing

Based on reviewing the current site, here are the main issues and what we'll fix:

1. **The header logo is tiny and hard to see** -- we'll make it much bigger and more prominent
2. **The hero image is barely visible** (too dark, generic stock feel) -- we'll replace it with a better photo and lighter overlay
3. **Most pages are text-only with no imagery** -- we'll add food photos throughout to make the site feel alive
4. **Service cards on the homepage have no images** -- we'll add photos to each service card
5. **The "About" page is plain text** -- we'll add a side-by-side layout with a photo
6. **Service pages (Wedding, Corporate, etc.) have no hero images** -- we'll add background photos to each

---

### Detailed Changes

**1. Header -- Bigger, More Prominent Logo**
- Increase header height from `h-16` to `h-20`
- Increase logo from `h-12` to `h-16` (desktop) for much more visual presence
- This makes the brand immediately recognizable at the top of every page

**2. Homepage Hero -- Replace Background Image**
- Swap the current dark/generic `catering-services-bg.jpg` for a brighter, more appetizing food photo from the gallery (the grilling station or wedding buffet shot)
- Lighten the overlay from `bg-black/60` to `bg-black/40` so the food is more visible
- Add the logo prominently in the hero area above the headline for extra brand impact

**3. Homepage Service Cards -- Add Photos**
- Convert the icon-only service cards into image cards with a photo at the top
- Map each service to a relevant photo from the gallery:
  - Wedding Catering: wedding table setting photo
  - Corporate Catering: corporate lunch buffet photo
  - Private Events: party food display photo  
  - Drop-Off Catering: ready-to-serve platters photo
- Each card will show photo, title, description, and "Learn more" link

**4. ServicePage Component -- Add Hero Background Images**
- Update the shared `ServicePage` component to accept an optional `heroImage` prop
- When provided, display it as a background image with overlay (like the homepage hero)
- Assign photos to each service page:
  - Wedding: `wedding-resized.jpg`
  - Corporate: `food-serving.jpg`
  - Private Events: party food display
  - Drop-Off: delivered meal setup
  - Holiday: holiday gathering photo
  - School/Community: family reunion spread
  - Rentals: company event buffet

**5. About Page -- Add Photo Layout**
- Change from single-column text to a two-column layout
- Left column: existing text content
- Right column: a food/event photo from the gallery
- This makes the page feel warmer and more inviting

**6. Contact Page -- Add a Photo**
- Add a food photo alongside the contact form to break up the text-heavy layout

**7. CTABand Component -- Add Background Photo Option**
- Add an optional background image to the CTA sections with overlay
- Use a different food photo than the hero so the site feels varied

**8. Footer Logo -- Bigger**
- Increase footer logo from `h-14` to `h-20` to match the more prominent brand presence

---

### Technical Summary

Files to modify:
- `src/components/layout/Header.tsx` -- bigger logo, taller header
- `src/components/layout/Footer.tsx` -- bigger footer logo
- `src/pages/Index.tsx` -- new hero image, photo service cards, logo in hero
- `src/components/shared/ServicePage.tsx` -- add heroImage prop with background photo support
- `src/pages/WeddingCatering.tsx` -- pass heroImage URL
- `src/pages/CorporateCatering.tsx` -- pass heroImage URL
- `src/pages/PrivateSocialEvents.tsx` -- pass heroImage URL
- `src/pages/DropOffCatering.tsx` -- pass heroImage URL
- `src/pages/HolidayCatering.tsx` -- pass heroImage URL
- `src/pages/SchoolCommunityEvents.tsx` -- pass heroImage URL
- `src/pages/Rentals.tsx` -- pass heroImage URL
- `src/pages/About.tsx` -- two-column layout with photo
- `src/pages/Contact.tsx` -- add photo element
- `src/components/shared/CTABand.tsx` -- optional background image

All images will use existing WordPress URLs already in the gallery database -- no new assets needed.

