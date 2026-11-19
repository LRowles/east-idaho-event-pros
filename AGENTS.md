# Project conventions
- Keep homepage and service-directory ordering, descriptions, and image mappings in one shared catalog module so both displays remain consistent.
- Keep original-site URL mappings in a pure resolver with tests; redirects preserve query parameters and fragments.
- Use the shared OurStory section for migrated homepage story content, within the existing Layout and theme.- Page titles, descriptions, canonical and share images go through src/lib/seo.ts (STATIC_SEO for fixed pages via Layout, useSeo for data-driven pages) so every route stays consistent.
