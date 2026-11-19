export interface Venue { name: string; location: string; blurb: string; image: string; region: string }

export const VENUES: Venue[] = [
  { name: "Rainy Creek Estates", location: "Swan Valley, Idaho", region: "Mountain & Lakeside", blurb: "Mountain views, outdoor weddings, and relaxed rustic elegance.", image: "/images/wedding-venue.jpg" },
  { name: "The Red Barn", location: "Blackfoot, Idaho", region: "Rustic & Barn", blurb: "Classic barn charm for weddings and country celebrations.", image: "/images/mr-mrs-doors.jpg" },
  { name: "Red Barn 1st", location: "Idaho Falls, Idaho", region: "Rustic & Barn", blurb: "Rustic character paired with versatile modern amenities.", image: "/images/table-centerpiece.jpg" },
  { name: "The Waterfront", location: "Idaho Falls, Idaho", region: "Mountain & Lakeside", blurb: "An elegant riverside setting for polished celebrations.", image: "/images/waterfront-wedding.jpg" },
  { name: "The Atrium", location: "Rexburg, Idaho", region: "Event Centers", blurb: "A flexible indoor venue for elegant and modern gatherings.", image: "/images/private-events.jpg" },
  { name: "The Millhouse", location: "Rigby, Idaho", region: "Rustic & Barn", blurb: "Historic mill character with inviting indoor and outdoor spaces.", image: "/images/spring-garden-wedding.jpeg" },
  { name: "The Hive", location: "Chubbuck, Idaho", region: "Event Centers", blurb: "A modern event space with a flexible layout for groups.", image: "/images/appetizer-cups.jpg" },
  { name: "Riverwoods Event Center", location: "Pocatello, Idaho", region: "Event Centers", blurb: "A scenic setting for indoor and outdoor events.", image: "/images/floral-arrangements.jpg" },
  { name: "Emalee’s Venue", location: "Rexburg, Idaho", region: "Rustic & Barn", blurb: "Charming surroundings for intimate celebrations and bridal events.", image: "/images/dessert-spread.jpg" },
  { name: "LaBelle Lake", location: "Rigby, Idaho", region: "Mountain & Lakeside", blurb: "A naturally beautiful lakeside setting for outdoor weddings.", image: "/images/labelle-desserts.jpg" },
  { name: "Meridell Park Farm", location: "Pocatello, Idaho", region: "Rustic & Barn", blurb: "Farm charm for rustic events and seasonal celebrations.", image: "/images/fruit-charcuterie.jpeg" },
  { name: "The DEC", location: "Idaho Falls, Idaho", region: "Event Centers", blurb: "A versatile downtown venue for corporate and social events.", image: "/images/corporate-catering-live.jpg" },
  { name: "Westbank Events Center", location: "Idaho Falls, Idaho", region: "Event Centers", blurb: "Spacious facilities suited to large celebrations and galas.", image: "/images/westbank-best-bbq.jpg" },
  { name: "ISU & University of Idaho", location: "Pocatello & Moscow, Idaho", region: "Campus & Community", blurb: "Faculty dinners, campus celebrations, and university events.", image: "/images/corporate-buffet-line.jpg" },
  { name: "Church Events", location: "Throughout East Idaho", region: "Campus & Community", blurb: "Receptions, youth events, community meals, and celebrations.", image: "/images/buffet-spread-blue.jpg" },
];
export const VENUE_REGIONS = ["All", "Mountain & Lakeside", "Rustic & Barn", "Event Centers", "Campus & Community"];
