import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

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
      const { data } = await supabase.from("services").select("name, slug, tagline").order("sort_order");
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

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Catering in {city.name}, Idaho
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">{city.intro_blurb}</p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to={`/get-a-quote?city=${city.name}`}>Get a Quote in {city.name}</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <SectionHeading title={`Services in ${city.name}`} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(services || []).map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}/${citySlug}`}
                className="rounded-lg border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <h3 className="mb-1 font-display font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

      {faq.length > 0 && (
        <section className="py-16">
          <div className="container max-w-3xl">
            <SectionHeading title={`FAQ — ${city.name} Catering`} />
            <div className="mt-8 space-y-6">
              {faq.map((item, i) => (
                <div key={i}>
                  <h3 className="mb-2 font-display font-semibold">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand buttonHref={`/get-a-quote?city=${city.name}`} buttonText={`Get a Quote in ${city.name}`} />
    </Layout>
  );
};

export default CityLanding;
