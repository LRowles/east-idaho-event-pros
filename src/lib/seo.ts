import { useEffect } from "react";

export const SITE_URL = "https://idaho-eats-easy.lovable.app";
export const DEFAULT_IMAGE = "/images/bbq-ribs.jpg";

export interface SeoMeta { title: string; description: string; image?: string; noindex?: boolean }

export const STATIC_SEO: Record<string, SeoMeta> = {
  "/": { title: "Catering East Idaho | Wedding, Corporate & BBQ | Simply Delicious", description: "East Idaho's best catering featuring slow-smoked BBQ, weddings, corporate events, florals, rentals and venue options. Request your catering quote today.", image: "/images/bbq-ribs.jpg" },
  "/our-services": { title: "Catering & Event Services in East Idaho | Simply Delicious", description: "Explore all Simply Delicious services: wedding, corporate, BBQ and drop-off catering plus florals, décor, rentals and event venue options across East Idaho.", image: "/images/buffet-spread-blue.jpg" },
  "/venues": { title: "Venues We Serve | Catering Across East Idaho | Simply Delicious", description: "We cater at East Idaho venues including The Waterfront, Westbank, LaBelle Lake, Rainy Creek Estates and The Red Barn. Request a quote for your venue.", image: "/images/wedding-venue.jpg" },
  "/menus": { title: "Catering Menus | BBQ, Appetizers & Desserts | Simply Delicious", description: "Browse Simply Delicious catering menus: slow-smoked BBQ, entrées, sides, appetizers, salads and desserts for weddings and events across East Idaho.", image: "/images/smoked-brisket.jpg" },
  "/gallery": { title: "Catering Photo Gallery | Weddings & Events | Simply Delicious", description: "See real weddings, corporate events, BBQ spreads and celebrations catered by Simply Delicious Catering & BBQ throughout East Idaho.", image: "/images/spring-garden-wedding.jpeg" },
  "/testimonials": { title: "Client Reviews | Simply Delicious Catering East Idaho", description: "Read reviews from couples, businesses and families who trusted Simply Delicious Catering & BBQ with their East Idaho events.", image: "/images/wedding-cake-cutting.jpg" },
  "/about": { title: "About Simply Delicious Catering & BBQ | Shelley, Idaho", description: "Meet the family-run team behind Simply Delicious Catering & BBQ in Shelley, Idaho, serving weddings, businesses and celebrations across East Idaho.", image: "/images/corporate-catering-live.jpg" },
  "/blog": { title: "Catering Tips & Event Planning Blog | Simply Delicious", description: "Event planning guides, menu ideas and catering tips for weddings, graduations, reunions and corporate events in East Idaho.", image: "/images/table-centerpiece.jpg" },
  "/contact": { title: "Contact Simply Delicious Catering | Shelley, Idaho", description: "Call 208-757-8222 or send a message to Simply Delicious Catering & BBQ in Shelley, Idaho. We cater events throughout East Idaho.", image: "/images/appetizer-cups.jpg" },
  "/service-area": { title: "Catering Service Area | 70 East Idaho Cities | Simply Delicious", description: "Simply Delicious caters across East Idaho: Idaho Falls, Rexburg, Pocatello, Blackfoot, Driggs and more. Find catering in your city.", image: "/images/company-bbq-chicken.jpg" },
  "/get-a-quote": { title: "Get a Catering Quote | Simply Delicious Catering East Idaho", description: "Request a free catering quote. Share your date, guest count and location and we'll follow up with menu options and a clear plan.", image: "/images/fruit-spread.jpg" },
  "/thank-you": { title: "Thank You | Simply Delicious Catering", description: "Thanks for reaching out to Simply Delicious Catering & BBQ. We'll be in touch soon.", noindex: true },
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function applySeo(meta: SeoMeta, pathname: string) {
  const url = absoluteUrl(pathname === "/" ? "/" : pathname.replace(/\/+$/, ""));
  const image = absoluteUrl(meta.image || DEFAULT_IMAGE);
  document.title = meta.title;
  setMeta("name", "description", meta.description);
  setMeta("name", "robots", meta.noindex ? "noindex" : "index, follow");
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("name", "twitter:title", meta.title);
  setMeta("name", "twitter:description", meta.description);
  setMeta("name", "twitter:image", image);
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
  link.href = url;
}

export function useSeo(meta: SeoMeta | null | undefined) {
  const key = meta ? `${meta.title}|${meta.description}|${meta.image}` : "";
  useEffect(() => {
    if (meta) applySeo(meta, window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
