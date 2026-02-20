import ServicePage from "@/components/shared/ServicePage";

const EventVenue = () => (
  <ServicePage
    slug="event-venue"
    title="Event Venue"
    hero="Event Venue for Up to 300 Guests"
    description="Indoor and outdoor event space available."
    highlights={[
      "Indoor and outdoor flexible spaces",
      "Accommodates up to 300 guests",
      "Perfect for weddings, receptions, and corporate events",
      "Convenient and comfortable setting",
      "Paired with catering and add-on services for a seamless event",
    ]}
    bodyText="Host your event in our beautiful venue."
    ctaText="Schedule a Tour"
  />
);

export default EventVenue;
