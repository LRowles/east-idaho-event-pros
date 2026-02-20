import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

interface ServicePageProps {
  slug: string;
  title: string;
  hero: string;
  description: string;
  highlights: string[];
  bodyText?: string;
  ctaText?: string;
  heroImage?: string;
}

const ServicePage = ({ slug, title, hero, description, highlights, bodyText, ctaText, heroImage }: ServicePageProps) => {
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials", slug],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").eq("event_type", title).limit(3);
      return data || [];
    },
  });

  return (
    <Layout>
      <section className="relative py-20 text-primary-foreground">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}
        <div className="container relative text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">{hero}</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">{description}</p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to={`/get-a-quote?service=${slug}`}>{ctaText || "Request a Quote"}</Link>
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading title="What We Offer" />
          <ul className="mx-auto mt-8 max-w-xl space-y-3">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
          {bodyText && (
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{bodyText}</p>
          )}
        </div>
      </section>

      {testimonials && testimonials.length > 0 && (
        <section className="bg-muted py-16">
          <div className="container">
            <SectionHeading title="Client Reviews" />
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

      <CTABand
        buttonText={ctaText || "Get a Catering Quote"}
        backgroundImage="https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387335684_3153498594952564_5437634036837287037_n.jpg"
      />
    </Layout>
  );
};

export default ServicePage;
