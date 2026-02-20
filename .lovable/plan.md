

## Redo Menus Frontend with Dish Catalog Data

### Current Problem
- `/menus` shows 7 generic event-menu cards (Wedding Menu, Corporate Menu, etc.)
- `/menus/:menuSlug` shows basic `menu_items` — sparse data, no real dish details
- The rich dish catalog (16 sections, 132 items with descriptions, options, popular flags) in `menu_sections` + `section_menu_items` is completely unused

### Proposed Design

**`/menus` — Full Dish Catalog Hub**

1. Hero banner (keep existing style, update copy to "Our Menu" / "Explore our full catering menu")
2. Sticky section nav — horizontal scrollable bar of section names (Appetizers, Salads, Soups, Sandwiches, Side Dishes, Main Dishes, Breads, Breakfast, Desserts) that scrolls to sections on click
3. Sections rendered in sort_order, each with:
   - Section heading + `section_intro` text
   - If the section has child sections (e.g., Main Dishes has Pastas, BBQ, Chicken, Fish, Around the World), show them as sub-sections with their own heading
   - Items displayed as a clean list/card grid with:
     - Item name (bold) + popular badge if `is_popular`
     - `short_description`
     - `options_list` (displayed as small tags/chips if present)
     - `serving_size` (subtle text if present)
     - `price_text` shown subtly
4. CTA band at bottom

**Event Menus as secondary** — The 7 event menus (`menus` table) can be linked from service pages or shown as a small "Event Menu Packages" section at the top of `/menus` with cards that anchor-link or filter the catalog. This keeps them discoverable without cluttering the main experience.

### Data Flow

```text
menu_sections (parent_section_slug = null)
  -> top-level sections: Appetizers, Salads, Soups, etc.
  -> child sections (parent_section_slug = "main-dishes"): Pastas, BBQ, Chicken, Fish, Around the World
  -> child sections (parent_section_slug = "appetizers"): Charcuterie Boards, Grazing Table

section_menu_items
  -> joined by menu_section_slug to their section
  -> each has name, description, options, serving_size, is_popular
```

### Technical Steps

1. **Rewrite `MenusHub.tsx`**
   - Fetch `menu_sections` ordered by `sort_order`
   - Fetch all `section_menu_items` ordered by `sort_order`
   - Group items by `menu_section_slug`
   - Build parent/child section hierarchy from `parent_section_slug`
   - Render sections with scroll-to IDs
   - Add a sticky horizontal nav bar listing top-level section names
   - Show items in each section as a list with name, description, options chips, popular badge, and price

2. **Simplify or remove `MenuCategory.tsx`**
   - Since the full catalog is now on `/menus`, the old `/menus/:menuSlug` route (which used the `menus` + `menu_items` tables) becomes unnecessary
   - Option A: Remove the route entirely
   - Option B: Redirect `/menus/:slug` to `/menus#section-slug` anchors
   - Recommend Option B for any existing links

3. **Optional: Event Menu cards at top**
   - Small horizontal card row at the top of `/menus` linking to service pages (Wedding Catering, Corporate Catering, etc.) or anchoring to relevant sections
   - Keeps the event-type context without duplicating data

4. **No database changes needed** — all data already exists in `menu_sections` and `section_menu_items`

### UI Details
- Popular items get a small amber/gold "Popular" badge next to the name
- Options lists render as inline comma-separated text or small chips
- Sections use `id="section-{slug}"` for anchor scrolling
- Sub-sections are indented or styled with a lighter heading weight
- Mobile: sticky nav becomes horizontally scrollable, sections stack naturally
- Loading state with skeleton placeholders while data fetches
