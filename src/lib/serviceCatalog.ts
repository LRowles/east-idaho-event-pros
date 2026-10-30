export const SERVICE_IMAGES: Record<string, string> = {
  "bbq-catering": "/images/bbq-catering.jpg",
  "wedding-catering": "/images/wedding-cake-cutting.jpg",
  "corporate-catering": "/images/corporate-catering.jpg",
  "private-social-events": "/images/private-events.jpg",
  "drop-off-catering": "/images/drop-off-catering.jpeg",
  "school-community-events": "/images/buffet-spread-blue.jpg",
  "holiday-catering": "/images/dessert-spread.jpg",
  "rentals": "/images/event-rentals.jpg",
  "event-rentals": "/images/event-rentals.jpg",
  "floral-arrangements": "/images/floral-arrangements.jpg",
  "wedding-flowers": "/images/wedding-flowers.jpg",
  "wedding-event-decor": "/images/wedding-event-decor.jpg",
  "event-venue": "/images/event-venue.jpg",
  "overnight-accommodations-coming-soon": "/images/mr-mrs-doors.jpg",
};

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "bbq-catering": "Slow-smoked BBQ built for crowds—brisket, pulled pork, ribs, and more. The Best BBQ Around.",
  "wedding-catering":
    "Full-service wedding catering with elegant presentation and attentive coordination—so you can enjoy your day.",
  "corporate-catering":
    "Reliable catering for meetings, trainings, and team events—on-time, professional, and genuinely delicious.",
  "private-social-events":
    "Birthdays, reunions, showers, and celebrations—food your guests will remember for all the right reasons.",
  "drop-off-catering":
    "Fresh, ready-to-serve catering delivered with care—perfect for offices, smaller gatherings, and casual events.",
  "event-rentals": "Tables, décor, and event essentials—one vendor, fewer headaches, a polished guest experience.",
  "floral-arrangements":
    "Custom florals designed to complement your event—centerpieces, accents, and statement pieces.",
  "wedding-flowers": "Bouquets, boutonnieres, and ceremony florals tailored to your wedding style and season.",
  "wedding-event-decor":
    "Cohesive styling and décor that transforms your space—tablescapes, accents, and finishing touches.",
  "event-venue": "Indoor + outdoor event space options (up to 300 guests). Ask about packages and add-ons.",
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

