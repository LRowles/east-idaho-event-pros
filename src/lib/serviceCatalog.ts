export const SERVICE_IMAGES: Record<string, string> = {
  "bbq-catering": "/images/bbq-catering.jpg",
  "wedding-catering": "/images/wedding-cake-cutting.jpg",
  "corporate-catering": "/images/corporate-catering.jpg",
  "private-social-events": "/images/private-events.jpg",
  "drop-off-catering": "/images/drop-off-catering.jpeg",
  "school-community-events": "/images/buffet-spread-blue.jpg",
  "holiday-catering": "/images/dessert-spread.jpg",
  "rentals": "/images/style-buffet-setup.jpeg",
  "event-rentals": "/images/event-rentals.jpg",
  "floral-arrangements": "/images/floral-arrangements.jpg",
  "wedding-flowers": "/images/wedding-flowers.jpg",
  "wedding-event-decor": "/images/wedding-event-decor.jpg",
  "event-venue": "/images/event-venue.jpg",
  "overnight-accommodations-coming-soon": "/images/mr-mrs-doors.jpg",
};

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "bbq-catering": "Slow-smoked BBQ built for crowds: brisket, pulled pork, ribs, and more. The Best BBQ Around.",
  "wedding-catering":
    "Full-service wedding catering with elegant presentation and attentive coordination, so you can enjoy your day.",
  "corporate-catering":
    "Reliable catering for meetings, trainings, and team events. On time, professional, and genuinely delicious.",
  "private-social-events":
    "Birthdays, reunions, showers, and celebrations, with food your guests will remember for all the right reasons.",
  "drop-off-catering":
    "Fresh, ready-to-serve catering delivered with care—perfect for offices, smaller gatherings, and casual events.",
  "event-rentals": "Tables, décor, and event essentials. One vendor, fewer headaches, a polished guest experience.",
  "floral-arrangements":
    "Custom florals designed to complement your event—centerpieces, accents, and statement pieces.",
  "wedding-flowers": "Bouquets, boutonnieres, and ceremony florals tailored to your wedding style and season.",
  "wedding-event-decor":
    "Cohesive styling and décor that transforms your space—tablescapes, accents, and finishing touches.",
  "event-venue": "Indoor and outdoor event space options (up to 300 guests). Ask about packages and add-ons.",
};

export const HOME_SERVICE_ORDER: string[] = [
  "bbq-catering",
  "wedding-catering",
  "corporate-catering",
  "private-social-events",
  "drop-off-catering",
  "holiday-catering",
  "school-community-events",
  "event-rentals",
  "event-venue",
  "wedding-event-decor",
  "wedding-flowers",
  "floral-arrangements",
  "rentals",
  "overnight-accommodations-coming-soon",
];

export const sortServicesForHome = <T extends { slug: string; name?: string }>(items: T[]) => {
  const rank = new Map(HOME_SERVICE_ORDER.map((slug, i) => [slug, i]));
  return [...items].sort((a, b) => {
    const ra = rank.has(a.slug) ? (rank.get(a.slug) as number) : 999;
    const rb = rank.has(b.slug) ? (rank.get(b.slug) as number) : 999;
    if (ra !== rb) return ra - rb;
    return (a.name || "").localeCompare(b.name || "");
  });
};


/** Extra photos shown on each service page: [section photo 1, section photo 2, closing banner]. */
export const SERVICE_PAGE_PHOTOS: Record<string, [string, string, string]> = {
  "bbq-catering": ["/images/smoked-brisket.jpg", "/images/westbank-best-bbq.jpg", "/images/company-bbq-chicken.jpg"],
  "wedding-catering": ["/images/spring-garden-wedding.jpeg", "/images/waterfront-wedding.jpg", "/images/table-centerpiece.jpg"],
  "corporate-catering": ["/images/corporate-buffet-line.jpg", "/images/corporate-catering-live.jpg", "/images/appetizer-cups.jpg"],
  "private-social-events": ["/images/reunion-spread.jpeg", "/images/graduation-desserts.jpg", "/images/reunion-private-event.jpg"],
  "drop-off-catering": ["/images/style-food-station.jpeg", "/images/fruit-charcuterie.jpeg", "/images/cheese-fruit-table.jpg"],
  "school-community-events": ["/images/company-bbq-chicken.jpg", "/images/reunion-spread.jpeg", "/images/fruit-spread.jpg"],
  "holiday-catering": ["/images/labelle-desserts.jpg", "/images/smoked-brisket.jpg", "/images/table-centerpiece.jpg"],
  "rentals": ["/images/event-rentals.jpg", "/images/wedding-event-decor.jpg", "/images/event-venue.jpg"],
  "event-rentals": ["/images/style-buffet-setup.jpeg", "/images/table-centerpiece.jpg", "/images/wedding-venue.jpg"],
  "floral-arrangements": ["/images/table-centerpiece.jpg", "/images/wedding-flowers.jpg", "/images/spring-garden-wedding.jpeg"],
  "wedding-flowers": ["/images/floral-arrangements.jpg", "/images/spring-garden-wedding.jpeg", "/images/waterfront-wedding.jpg"],
  "wedding-event-decor": ["/images/mr-mrs-doors.jpg", "/images/table-centerpiece.jpg", "/images/wedding-venue.jpg"],
  "event-venue": ["/images/wedding-venue.jpg", "/images/waterfront-wedding.jpg", "/images/wedding-event-decor.jpg"],
  "overnight-accommodations-coming-soon": ["/images/event-venue.jpg", "/images/wedding-venue.jpg", "/images/spring-garden-wedding.jpeg"],
};

/** Warm event photos used to give each city page its own banner. */
export const CITY_PHOTO_POOL = [
  "/images/cheese-fruit-table.jpg", "/images/buffet-spread-blue.jpg", "/images/smoked-brisket.jpg",
  "/images/spring-garden-wedding.jpeg", "/images/corporate-buffet-line.jpg", "/images/fruit-charcuterie.jpeg",
  "/images/waterfront-wedding.jpg", "/images/company-bbq-chicken.jpg", "/images/appetizer-cups.jpg",
  "/images/reunion-spread.jpeg", "/images/table-centerpiece.jpg", "/images/westbank-best-bbq.jpg",
  "/images/labelle-desserts.jpg", "/images/style-food-station.jpeg", "/images/wedding-venue.jpg",
  "/images/fruit-spread.jpg", "/images/dessert-spread.jpg", "/images/corporate-catering-live.jpg",
];

/** Stable photo choice for a slug, so a page always shows the same photo but neighbours differ. */
export const pickPhoto = (seed: string, pool: readonly string[] = CITY_PHOTO_POOL, offset = 0) => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return pool[(h + offset) % pool.length];
};

/** Services shown under the "Services" menu, grouped like the original site. */
export const SERVICE_NAV: { group: string; links: { label: string; href: string }[] }[] = [
  { group: "Catering", links: [
    { label: "BBQ Catering", href: "/bbq-catering" },
    { label: "Wedding Catering", href: "/wedding-catering" },
    { label: "Corporate Catering", href: "/corporate-catering" },
    { label: "Private & Social Events", href: "/private-social-events" },
    { label: "Drop-Off Catering", href: "/drop-off-catering" },
    { label: "Holiday Catering", href: "/holiday-catering" },
    { label: "School & Community Events", href: "/school-community-events" },
  ]},
  { group: "Events & Décor", links: [
    { label: "Event Rentals", href: "/event-rentals" },
    { label: "Event Venue", href: "/event-venue" },
    { label: "Wedding & Event Décor", href: "/wedding-event-decor" },
    { label: "Wedding Flowers", href: "/wedding-flowers" },
    { label: "Floral Arrangements", href: "/floral-arrangements" },
    { label: "Overnight Stays (Coming Soon)", href: "/overnight-accommodations-coming-soon" },
  ]},
];
