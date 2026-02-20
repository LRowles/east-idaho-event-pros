import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const MenusHub = () => {
  const { data: menus } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const { data } = await supabase.from("menus").select("*").order("sort_order");
      return data || [];
    },
  });

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Our Menus</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Browse our menu categories and find the perfect fit for your event.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(menus || []).map((menu) => (
              <Card key={menu.id} className="group transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display text-xl font-semibold">{menu.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{menu.description}</p>
                  <Link to={`/menus/${menu.slug}`} className="text-sm font-medium text-primary hover:underline">
                    View menu →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default MenusHub;
