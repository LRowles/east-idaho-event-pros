import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { supabase } from "@/integrations/supabase/client";

const ServiceArea = () => {
  const { data: cities } = useQuery({
    queryKey: ["cities-all"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("*").order("name");
      return data || [];
    },
  });

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Catering Services Throughout East Idaho</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Simply Delicious Catering proudly serves communities across East Idaho. We provide professional catering for weddings, corporate events, private parties, and drop-off catering.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading title="Select Your City" subtitle="Select your city to learn more about catering in your area." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(cities || []).map((city) => (
              <Link
                key={city.slug}
                to={`/catering/${city.slug}`}
                className="group rounded-lg border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <h3 className="mb-1 font-display text-lg font-semibold group-hover:text-primary">
                  {city.name}, {city.state}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{city.intro_blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default ServiceArea;
