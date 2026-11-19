import ServicePage from "@/components/shared/ServicePage";

const Rentals = () => (
  <ServicePage
    slug="rentals"
    title="Equipment Rentals"
    hero="Event Equipment Rentals"
    description="Tables, chairs, linens, chafing dishes, and more — available as add-ons or standalone rentals."
    highlights={[
      "Tables and chairs for any event size",
      "Linens in a variety of colors",
      "Chafing dishes and serving equipment",
      "Beverage dispensers and coolers",
      "Delivery, setup, and pickup available",
      "Discounted when bundled with catering",
    ]}
  />
);

export default Rentals;
