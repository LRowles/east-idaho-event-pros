import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import JsonLd from "@/components/shared/JsonLd";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Briefcase, PartyPopper, Truck, Star, ChefHat, Users, CalendarCheck } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="h-8 w-8" />,
  briefcase: <Briefcase className="h-8 w-8" />,
  "party-popper": <PartyPopper className="h-8 w-8" />,
  truck: <Truck className="h-8 w-8" />,
};

const STEPS = [
  { icon: <CalendarCheck className="h-8 w-8" />, title: "Tell Us About Your Event", desc: "Fill out our quick quote form with your event details." },
  { icon: <ChefHat className="h-8 w-8" />, title: "Get a Custom Menu", desc: "We'll craft a personalized menu and proposal for you." },
  { icon: <Users className="h-8 w-8" />, title: "We Handle Everything", desc: "From setup to cleanup, our team takes care of it all." },
  { icon: <Star className="h-8 w-8" />, title: "Enjoy Your Event", desc: "Relax and let your guests rave about the food." },
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
      <section className="relative bg-primary py-24 text-primary-foreground md:py-32">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            East Idaho Catering for Weddings,
            <br className="hidden md:block" /> Corporate Events & Private Parties
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Full-service · Drop-off · Custom menus · Experienced event team
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/get-a-quote">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/menus">View Our Menus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="Our Catering Services" subtitle="From intimate dinners to large-scale events, we've got you covered." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(services || []).map((service) => (
              <Card key={service.id} className="group transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 text-primary">
                    {iconMap[service.icon || "heart"] || <Heart className="h-8 w-8" />}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{service.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{service.tagline}</p>
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

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <SectionHeading title="How It Works" subtitle="Getting started is simple — just four easy steps." />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <span className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {i + 1}</span>
                <h3 className="mb-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      {cities && cities.length > 0 && (
        <section className="bg-muted py-20">
          <div className="container">
            <SectionHeading title="Serving 27+ East Idaho Communities" />
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
          </div>
        </section>
      )}

      <CTABand />
    </Layout>
  );
};

export default Index;
