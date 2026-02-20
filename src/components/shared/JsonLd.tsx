import { BUSINESS } from "@/lib/constants";

interface JsonLdProps {
  data?: Record<string, unknown>;
}

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "CateringBusiness",
  name: BUSINESS.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "1149 E 1250 N",
    addressLocality: "Shelley",
    addressRegion: "ID",
    postalCode: "83274",
    addressCountry: "US",
  },
  telephone: BUSINESS.phone1,
  email: BUSINESS.email,
  url: window.location.origin,
  areaServed: {
    "@type": "State",
    name: "Idaho",
  },
};

const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data || defaultSchema) }}
    />
  );
};

export default JsonLd;
