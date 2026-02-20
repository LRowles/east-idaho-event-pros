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

  const { data: cities } = useQuery({
    queryKey: ["all-cities"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("name, slug").order("name");
      return data || [];
    },
  });

  if (!service || !city) return <Layout><div className="container py-20 text-center text-muted-foreground">Loading...</div></Layout>;

  const serviceLower = service.name.toLowerCase();
  const otherCities = (cities || []).filter((c) => c.slug !== citySlug);

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            {service.name} in {city.name}, Idaho
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Simply Delicious Catering provides professional {serviceLower} services throughout {city.name}. Our experienced team helps clients create seamless events with exceptional food and dependable service.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link to={`/get-a-quote?service=${service.slug}&city=${city.name}`}>
              Get a Quote →
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <p className="mb-6 text-lg text-muted-foreground">
            Whether you are planning a wedding, corporate event, or private celebration, we provide catering solutions tailored to your needs.
          </p>
          <h2 className="mb-4 font-display text-2xl font-bold">About {service.name}</h2>
          <p className="mb-6 text-muted-foreground">{service.description}</p>
          <h2 className="mb-4 font-display text-2xl font-bold">Serving {city.name}</h2>
          <p className="mb-8 text-muted-foreground">{city.intro_blurb}</p>

          {/* Internal links */}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to={`/catering/${citySlug}`}>More about {city.name} catering</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/${serviceSlug}`}>Learn about {service.name}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/menus">View Menus</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/get-a-quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Other city links for this service */}
      {otherCities.length > 0 && (
        <section className="bg-muted py-12">
          <div className="container">
            <h2 className="mb-6 text-center font-display text-xl font-bold">
              {service.name} in Other East Idaho Cities
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {otherCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${serviceSlug}/${c.slug}`}
                  className="rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {service.name} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        buttonHref={`/get-a-quote?service=${service.slug}&city=${city.name}`}
        buttonText="Get a Quote"
      />
    </Layout>
  );
};

export default ServiceCityLanding;
