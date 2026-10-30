export type GalleryPhoto = { src: string; caption: string; category: "Wedding" | "Corporate" | "Social" | "BBQ" | "Food" };

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/images/spring-garden-wedding.jpeg", caption: "Spring garden wedding reception", category: "Wedding" },
  { src: "/images/waterfront-wedding.jpg", caption: "Wedding reception at The Waterfront, Idaho Falls", category: "Wedding" },
  { src: "/images/wedding-venue.jpg", caption: "Reception tables set for dinner", category: "Wedding" },
  { src: "/images/wedding-cake-cutting.jpg", caption: "Cake cutting moment", category: "Wedding" },
  { src: "/images/mr-mrs-doors.jpg", caption: "Mr & Mrs rustic door backdrop", category: "Wedding" },
  { src: "/images/table-centerpiece.jpg", caption: "Lantern centerpiece", category: "Wedding" },
  { src: "/images/westbank-best-bbq.jpg", caption: "Company BBQ at Westbank Events Center", category: "BBQ" },
  { src: "/images/company-bbq-chicken.jpg", caption: "Glazed barbecue chicken", category: "BBQ" },
  { src: "/images/bbq-ribs.jpg", caption: "Slow-smoked ribs", category: "BBQ" },
  { src: "/images/smoked-brisket.jpg", caption: "Smoked brisket", category: "BBQ" },
  { src: "/images/corporate-catering-live.jpg", caption: "Corporate catering spread", category: "Corporate" },
  { src: "/images/corporate-buffet-line.jpg", caption: "Corporate buffet line", category: "Corporate" },
  { src: "/images/labelle-desserts.jpg", caption: "Dessert table at LaBelle Lake, Rigby", category: "Social" },
  { src: "/images/appetizer-cups.jpg", caption: "Individual appetizer cups", category: "Social" },
  { src: "/images/private-events.jpg", caption: "Private celebration", category: "Social" },
  { src: "/images/fruit-charcuterie.jpeg", caption: "Fresh fruit and charcuterie display", category: "Food" },
  { src: "/images/cheese-fruit-table.jpg", caption: "Cheese and fruit table", category: "Food" },
  { src: "/images/buffet-spread-blue.jpg", caption: "Veggie and appetizer buffet", category: "Food" },
  { src: "/images/dessert-spread.jpg", caption: "Cupcakes and dessert table", category: "Food" },
];

export const RECENT_EVENTS = [
  { title: "Spring Garden Wedding Reception", venue: "The Waterfront", city: "Idaho Falls", guests: "200+ Guests", image: "/images/spring-garden-wedding.jpeg", text: "An elegant seasonal menu with polished service and thoughtful presentation." },
  { title: "Annual Company BBQ Celebration", venue: "Westbank Events Center", city: "Idaho Falls", guests: "150 Guests", image: "/images/company-bbq-chicken.jpg", text: "Slow-smoked favorites and relaxed buffet service for a memorable team gathering." },
  { title: "Graduation Party & Family Reunion", venue: "LaBelle Lake", city: "Rigby", guests: "120 Guests", image: "/images/appetizer-cups.jpg", text: "Fresh appetizers, hearty favorites, and a complete dessert table for family and friends." },
];
