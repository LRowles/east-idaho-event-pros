import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import JsonLd from "@/components/shared/JsonLd";
import RecentEvents from "@/components/shared/RecentEvents";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle } from "lucide-react";

import OurStory from "@/components/shared/OurStory";
import { SERVICE_IMAGES, SERVICE_DESCRIPTIONS, sortServicesForHome } from "@/lib/serviceCatalog";

const TRUST_INDICATORS = [
  "Trusted throughout East Idaho",
  "Custom menus + flexible service styles",
  "Professional presentation",
  "Reliable delivery & execution",
];

const Index = () => {
  const { data: services } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*");
      return sortServicesForHome(data || []);
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").in("client_name", ["Jennifer Fick", "Jayne Nitz", "Kenzie Hinckley"]).order("client_name").limit(3);
      return data || [];
    },
  });

  const { data: cities } = useQuery({
    queryKey: ["cities-home"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("name, slug").order("name");
      return data || [];
    },
  });

  return (
    <Layout>
      <JsonLd />

      {/* HERO */}
      <section className="relative isolate overflow-hidden py-24 text-white md:py-32">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bbq-ribs.jpg')",
          }}
        />
        {/* Premium overlays: adds polish + readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />

        <div className="container relative text-center">
          <img
            src="/images/logo-transparent.png"
            alt="Simply Delicious Catering & BBQ"
            className="mx-auto mb-6 h-20 w-auto drop-shadow md:h-28"
            loading="eager"
          />

          <h1 className="mx-auto mb-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            East Idaho's Best Catering — Featuring <span className="whitespace-nowrap">The Best BBQ Around</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-lg opacity-95 md:text-xl">
            From slow-smoked BBQ to elegant weddings and full-service events, Simply Delicious makes hosting effortless
            — and unforgettable.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/get-a-quote">Get a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/menus">View Menus</Link>
            </Button>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/85">
            {TRUST_INDICATORS.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-white/90" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Everything You Need for a Seamless, Beautiful Event" />
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
            Catering, BBQ, appetizers, desserts — plus florals, rentals, décor, and venue options. Choose what you need,
            and we’ll help you build the perfect plan.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(services || []).slice(0, 9).map((service) => {
              const img = SERVICE_IMAGES[service.slug];
              const desc = SERVICE_DESCRIPTIONS[service.slug] || service.tagline;

              return (
                <Card
                  key={service.id}
                  className="group overflow-hidden border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {img && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={img}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      {/* subtle gradient for premium feel */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                  )}

                  <CardContent className="p-6">
                    <h3 className="mb-2 font-display text-xl font-semibold leading-snug">{service.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>

                    <div className="flex items-center justify-between">
                      <Link to={`/${service.slug}`} className="text-sm font-semibold text-primary hover:underline">
                        Learn more →
                      </Link>
                      <Link to="/get-a-quote" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        Get a quote
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link to="/our-services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      <OurStory />

      {/* SOCIAL PROOF */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-muted py-20">
          <div className="container">
            <SectionHeading title="What Our Clients Say" />
            <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
              Real feedback from weddings, corporate events, and celebrations across East Idaho.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.id} className="border bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-1 text-accent">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>

                    <div className="text-sm font-semibold">{t.client_name}</div>
                    {t.event_type && <div className="text-xs text-muted-foreground">{t.event_type}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <RecentEvents />

      {/* SERVICE AREA */}
      {cities && cities.length > 0 && (
        <section className="py-20">
          <div className="container">
            <SectionHeading title="Serving Communities Throughout East Idaho" />
            <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
              Find catering near you — and request a quote in minutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {cities.slice(0, 30).map((city) => (
                <Link
                  key={city.slug}
                  to={`/catering/${city.slug}`}
                  className="rounded-full border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {city.name}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="secondary">
                <Link to="/service-area">See all cities</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <CTABand
        title="Request Your Catering Quote Today"
        subtitle="Share your date, guest count, and location — we’ll follow up with menu options and a clear plan."
        buttonText="Get a Quote"
        backgroundImage="/images/fruit-spread.jpg"
      />
    </Layout>
  );
};

export default Index;
