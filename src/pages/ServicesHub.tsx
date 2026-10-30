import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_IMAGES, SERVICE_DESCRIPTIONS, sortServicesForHome } from "@/lib/serviceCatalog";

const ServicesHub = () => {
  const { data: services, isPending, isError, refetch } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) throw error;
      return sortServicesForHome(data || []);
    },
  });

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto max-w-3xl text-lg opacity-90">Catering, BBQ, florals, rentals, décor, and venue options for celebrations across East Idaho.</p>
          <Button asChild size="lg" variant="secondary" className="mt-6"><Link to="/get-a-quote">Get a Catering Quote</Link></Button>
        </div>
      </section>
      <section className="py-20">
        <div className="container">
          {isError ? <div className="text-center"><p className="mb-4 text-muted-foreground">We couldn’t load the services. Please try again.</p><Button onClick={() => refetch()}>Try again</Button></div> : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {isPending ? Array.from({ length: 9 }, (_, i) => <Skeleton key={i} className="h-96 rounded-lg" />) : services?.map(service => (
                <Card key={service.id} className="group overflow-hidden shadow-card transition-all motion-safe:hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={SERVICE_IMAGES[service.slug] || "/images/fruit-spread.jpg"} alt={service.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{service.slug === "overnight-accommodations-coming-soon" ? "Coming Soon" : "Simply Delicious"}</span>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="mb-2 font-display text-xl font-semibold">{service.name}</h2>
                    <p className="mb-5 text-sm text-muted-foreground">{SERVICE_DESCRIPTIONS[service.slug] || service.tagline}</p>
                    <Button asChild variant="outline"><Link to={`/${service.slug}`}>Learn more</Link></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABand backgroundImage="/images/fruit-spread.jpg" />
    </Layout>
  );
};

export default ServicesHub;