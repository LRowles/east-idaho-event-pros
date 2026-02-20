import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const EVENT_TYPES = ["All", "Wedding", "Corporate", "Private & Social", "Drop-Off", "Holiday"];

const TestimonialsPage = () => {
  const [filter, setFilter] = useState("All");

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials-all"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*, cities(name)");
      return data || [];
    },
  });

  const filtered = filter === "All" ? testimonials : testimonials?.filter((t) => t.event_type === filter);

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Client Testimonials</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Hear from our happy clients across East Idaho.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {EVENT_TYPES.map((t) => (
              <Button key={t} variant={filter === t ? "default" : "outline"} size="sm" onClick={() => setFilter(t)}>
                {t}
              </Button>
            ))}
          </div>

          {filtered && filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <Card key={t.id}>
                  <CardContent className="p-6">
                    <div className="mb-2 flex gap-1 text-accent">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mb-4 italic text-muted-foreground">"{t.quote}"</p>
                    <p className="text-sm font-semibold">{t.client_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.event_type}
                      {t.cities && ` · ${(t.cities as any).name}`}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Testimonials coming soon! We'd love to hear about your experience.</p>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default TestimonialsPage;
