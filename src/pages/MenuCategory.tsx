import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const MenuCategory = () => {
  const { menuSlug } = useParams<{ menuSlug: string }>();

  const { data: menu } = useQuery({
    queryKey: ["menu", menuSlug],
    queryFn: async () => {
      const { data } = await supabase.from("menus").select("*").eq("slug", menuSlug).single();
      return data;
    },
  });

  const { data: items } = useQuery({
    queryKey: ["menu-items", menu?.id],
    queryFn: async () => {
      if (!menu?.id) return [];
      const { data } = await supabase.from("menu_items").select("*").eq("menu_id", menu.id).order("sort_order");
      return data || [];
    },
    enabled: !!menu?.id,
  });

  if (!menu) return <Layout><div className="container py-20 text-center text-muted-foreground">Loading...</div></Layout>;

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">{menu.name}</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">{menu.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          {items && items.length > 0 ? (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-5">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="h-20 w-20 shrink-0 rounded-md object-cover" loading="lazy" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-semibold">{item.name}</h3>
                      {item.pricing_note && <span className="text-sm font-medium text-primary">{item.pricing_note}</span>}
                    </div>
                    {item.description && <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>}
                    {item.dietary_tags && item.dietary_tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.dietary_tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Menu items coming soon! Contact us for current options.</p>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default MenuCategory;
