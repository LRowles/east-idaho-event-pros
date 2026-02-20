import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const ServiceCityLanding = () => {
  const { serviceSlug, citySlug } = useParams<{ serviceSlug: string; citySlug: string }>();

  const { data: service } = useQuery({
    queryKey: ["service", serviceSlug],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").eq("slug", serviceSlug).single();
      return data;
    },
  });

  const { data: city } = useQuery({
    queryKey: ["city", citySlug],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("*").eq("slug", citySlug).single();
      return data;
    },
  });

  if (!service || !city) return <Layout><div className="container py-20 text-center text-muted-foreground">Loading...</div></Layout>;

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            {service.name} in {city.name}, Idaho
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            {service.description}
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to={`/get-a-quote?service=${service.slug}&city=${city.name}`}>
              Get a {service.name} Quote in {city.name}
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold">About {service.name}</h2>
          <p className="mb-6 text-muted-foreground">{service.description}</p>
          <h2 className="mb-4 font-display text-2xl font-bold">Serving {city.name}</h2>
          <p className="mb-6 text-muted-foreground">{city.intro_blurb}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to={`/catering/${citySlug}`}>More about {city.name} catering</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/${serviceSlug}`}>Learn about {service.name}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/menus">View menus</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABand
        buttonHref={`/get-a-quote?service=${service.slug}&city=${city.name}`}
        buttonText={`Get a Quote`}
      />
    </Layout>
  );
};

export default ServiceCityLanding;
