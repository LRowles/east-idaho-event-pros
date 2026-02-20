import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const FILTERS = ["All", "Wedding", "Corporate", "Social", "Drop-Off"];

const GalleryHub = () => {
  const [filter, setFilter] = useState("All");

  const { data: galleries } = useQuery({
    queryKey: ["galleries"],
    queryFn: async () => {
      const { data } = await supabase.from("galleries").select("*").order("sort_order");
      return data || [];
    },
  });

  const filtered = filter === "All" ? galleries : galleries?.filter((g) => g.event_type === filter);

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">See our work in action — from weddings to corporate events.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          {filtered && filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <div key={g.id} className="group overflow-hidden rounded-lg border">
                  <img
                    src={g.image_url}
                    alt={g.caption || g.title}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  {g.caption && (
                    <div className="p-3">
                      <p className="text-sm text-muted-foreground">{g.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Gallery photos coming soon! Check back for photos of our events.</p>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default GalleryHub;
