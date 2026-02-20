import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import JsonLd from "@/components/shared/JsonLd";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Briefcase, PartyPopper, Truck, Star, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="h-8 w-8" />,
  briefcase: <Briefcase className="h-8 w-8" />,
  "party-popper": <PartyPopper className="h-8 w-8" />,
  truck: <Truck className="h-8 w-8" />,
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "wedding-catering": "Celebrate your wedding day with a menu designed around your vision. We provide full-service catering, elegant presentation, and attentive coordination so you can focus on enjoying every moment.",
  "corporate-catering": "Dependable catering for meetings, trainings, employee appreciation, and company events. We deliver on time, present professionally, and make planning easy.",
  "private-social-events": "From birthdays and anniversaries to reunions and celebrations, we help you create memorable experiences with food your guests will love.",
  "drop-off-catering": "Convenient, reliable catering delivered fresh and ready to serve. Perfect for office lunches, smaller gatherings, and informal events.",
};

const TRUST_INDICATORS = [
  "Trusted throughout East Idaho",
  "Professional service",
  "Reliable delivery",
  "Custom menus",
];

const Index = () => {
  const { data: services } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order").limit(4);
      return data || [];
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").limit(3);
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

      {/* Hero */}
      <section className="relative py-24 text-white md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://simplydeliciousmeals4you.com/wp-content/uploads/2022/03/catering-services-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative text-center">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Catering in East Idaho Made Easy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            Exceptional food. Dependable service. Stress-free events.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/get-a-quote">Get a Quote</Link>
          </Button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b bg-background py-6">
        <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {TRUST_INDICATORS.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Our Catering Services" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(services || []).map((service) => (
              <Card key={service.id} className="group transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 text-primary">
                    {iconMap[service.icon || "heart"] || <Heart className="h-8 w-8" />}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{service.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {SERVICE_DESCRIPTIONS[service.slug] || service.tagline}
                  </p>
                  <Link to={`/${service.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Learn more →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-muted py-20">
          <div className="container">
            <SectionHeading title="What Our Clients Say" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.id}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex gap-1 text-accent">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mb-4 italic text-muted-foreground">"{t.quote}"</p>
                    <p className="text-sm font-semibold">{t.client_name}</p>
                    {t.event_type && <p className="text-xs text-muted-foreground">{t.event_type}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Area */}
      {cities && cities.length > 0 && (
        <section className="py-20">
          <div className="container">
            <SectionHeading title="Serving Communities Throughout East Idaho" />
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/catering/${city.slug}`}
                  className="rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/service-area" className="text-sm font-medium text-primary hover:underline">
                Find catering in your city →
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABand
        title="Request Your Catering Quote Today"
        subtitle="Tell us about your event and we'll help you create the perfect catering plan."
        buttonText="Get a Quote"
      />
    </Layout>
  );
};

export default Index;
