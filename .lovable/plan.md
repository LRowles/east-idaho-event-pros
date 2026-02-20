

## Add Missing SEO Metadata to Services

Two services currently lack `seo_title` and `seo_description`:

1. **School & Community Events** (`school-community-events`)
2. **Holiday Catering** (`holiday-catering`)

All other 12 services already have SEO metadata populated.

### Proposed Metadata

**School & Community Events**
- **seo_title**: `School & Community Event Catering East Idaho | Simply Delicious Catering`
- **seo_description**: `School and community event catering across East Idaho with crowd-friendly menus, reliable delivery, and flexible service options. Request a quote today.`

**Holiday Catering**
- **seo_title**: `Holiday Catering East Idaho | Thanksgiving, Christmas & More`
- **seo_description**: `Holiday catering across East Idaho for Thanksgiving, Christmas, Easter, and more. Complete holiday meal packages with delivery or pickup. Request a quote today.`

### Technical Steps

- Run two `UPDATE` statements against the `services` table to set `seo_title` and `seo_description` for the two slugs above.
- No code or schema changes are needed; the site already reads and renders these fields dynamically.

