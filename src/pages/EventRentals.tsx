import ServicePage from "@/components/shared/ServicePage";

const EventRentals = () => (
  <ServicePage
    slug="event-rentals"
    title="Event Rentals"
    hero="Event Rentals for Seamless Events"
    description="Tables, linens, décor, and essentials—all coordinated for you."
    highlights={[
      "Complete event support with tables, linens, and décor",
      "Simplify planning by working with one provider",
      "Professional presentation for a cohesive experience",
      "Delivery, setup, and pickup available",
      "Discounted when bundled with catering",
    ]}
    bodyText="We provide rentals that help your event feel complete and professionally presented."
    ctaText="Explore Rentals"
  />
);

export default EventRentals;
