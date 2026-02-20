import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Star, CheckCircle, Heart, Briefcase, PartyPopper, Truck } from "lucide-react";

const SERVICE_CITY_COPY: Record<string, (city: string) => { title: string; desc: string }> = {
  "wedding-catering": (c) => ({
    title: `Wedding Catering in ${c}`,
    desc: "Make your wedding day unforgettable with custom menus and professional service.",
  }),
  "corporate-catering": (c) => ({
    title: `Corporate Catering in ${c}`,
    desc: "Reliable catering for meetings, trainings, and business events.",
  }),
  "private-social-events": (c) => ({
    title: `Private Event Catering in ${c}`,
    desc: "Perfect for birthdays, celebrations, and special occasions.",
  }),
  "drop-off-catering": (c) => ({
    title: `Drop-Off Catering in ${c}`,
    desc: "Convenient catering delivered fresh and ready to serve.",
  }),
};

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="h-7 w-7" />,
  briefcase: <Briefcase className="h-7 w-7" />,
  "party-popper": <PartyPopper className="h-7 w-7" />,
  truck: <Truck className="h-7 w-7" />,
};

const TRUST_POINTS = [
  "Professional service",
  "Dependable delivery",
  "Custom menu planning",
  "Beautiful presentation",
];

const DEFAULT_FAQ = (city: string) => [
  {
    q: `How far in advance should I book catering in ${city}?`,
    a: "We recommend booking as early as possible to ensure availability, especially for weddings and large events.",
  },
  {
    q: `Do you offer drop-off catering in ${city}?`,
    a: "Yes, we provide convenient drop-off catering for businesses and private events.",
  },
  {
    q: "Can you accommodate dietary restrictions?",
    a: "Yes, we offer flexible menu options to accommodate dietary needs.",
  },
];

const CityLanding = () => {
  const { citySlug } = useParams<{ citySlug: string }>();

  const { data: city } = useQuery({
    queryKey: ["city", citySlug],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("*").eq("slug", citySlug).single();
      return data;
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services-city"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("name, slug, tagline, icon").order("sort_order");
      return data || [];
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-city", city?.id],
    queryFn: async () => {
      if (!city?.id) return [];
      const { data } = await supabase.from("testimonials").select("*").eq("city_id", city.id).limit(3);
      return data || [];
    },
    enabled: !!city?.id,
  });

  if (!city) return <Layout><div className="container py-20 text-center text-muted-foreground">Loading...</div></Layout>;

  const faq = (city.faq as Array<{ q: string; a: string }>) || [];
  const displayFaq = faq.length > 0 ? faq : DEFAULT_FAQ(city.name);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Catering in {city.name}, Idaho
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Professional wedding, corporate, and event catering in {city.name}. Simply Delicious Catering provides dependable service, beautiful presentation, and exceptional food for events of all sizes.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to={`/get-a-quote?city=${city.name}`}>Get a Catering Quote</Link>
          </Button>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <p className="text-lg text-muted-foreground">
            Simply Delicious Catering proudly provides catering services throughout {city.name}, Idaho. We help clients host successful weddings, corporate events, private parties, and social gatherings with food and service they can trust.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our team handles every detail with professionalism and care, helping you create an event that is seamless and memorable.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted py-16">
        <div className="container">
          <SectionHeading title={`Catering Services in ${city.name}`} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(services || []).map((s) => {
              const copy = SERVICE_CITY_COPY[s.slug]?.(city.name);
              return (
                <Link
                  key={s.slug}
                  to={`/${s.slug}/${citySlug}`}
                  className="group rounded-lg border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mb-3 flex justify-center text-primary">
                    {iconMap[s.icon || "heart"] || <Heart className="h-7 w-7" />}
                  </div>
                  <h3 className="mb-2 font-display font-semibold">{copy?.title || `${s.name} in ${city.name}`}</h3>
                  <p className="text-sm text-muted-foreground">{copy?.desc || s.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Teaser */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <SectionHeading title="Flexible Catering Menus" />
          <p className="mt-4 text-muted-foreground">
            Our catering menus offer flexible options for any event, including buffet service, boxed lunches, custom event menus, and dietary accommodations.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/menus">Browse Menus →</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-muted py-16">
          <div className="container">
            <SectionHeading title={`Reviews from ${city.name}`} />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.id}>
                  <CardContent className="p-6">
                    <div className="mb-2 flex gap-1 text-accent">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mb-3 italic text-muted-foreground">"{t.quote}"</p>
                    <p className="text-sm font-semibold">{t.client_name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <SectionHeading title={`Why ${city.name} Trusts Simply Delicious`} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TRUST_POINTS.map((point, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-16">
        <div className="container max-w-3xl">
          <SectionHeading title={`FAQ — Catering in ${city.name}`} />
          <div className="mt-8 space-y-6">
            {displayFaq.map((item, i) => (
              <div key={i}>
                <h3 className="mb-2 font-display font-semibold">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-10">
        <div className="container flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/get-a-quote">Get a Quote</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/menus">View Menus</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/service-area">All Service Areas</Link>
          </Button>
        </div>
      </section>

      <CTABand
        title={`Ready to plan catering in ${city.name}?`}
        buttonHref={`/get-a-quote?city=${city.name}`}
        buttonText="Get a Catering Quote"
      />
    </Layout>
  );
};

export default CityLanding;
