import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

const REGIONS: Record<string, string[]> = {
  "Idaho Falls & Surrounding": [
    "idaho-falls", "ammon", "iona", "ucon", "shelley", "firth", "rigby", "ririe",
    "lewisville", "menan", "basalt", "roberts",
  ],
  "Rexburg & Upper Valley": [
    "rexburg", "sugar-city", "thornton", "st-anthony", "ashton", "chester",
    "lorenzo", "hibbard", "teton", "parker", "newdale",
  ],
  "Pocatello & Chubbuck": [
    "pocatello", "chubbuck", "inkom", "fort-hall", "american-falls", "aberdeen",
    "rockland", "mccammon",
  ],
  "Blackfoot & Bingham County": [
    "blackfoot",
  ],
  "Teton Valley": [
    "driggs", "victor", "tetonia",
  ],
  "Island Park & North": [
    "island-park", "kilgore", "spencer", "dubois", "hamer", "mud-lake", "terreton",
  ],
  "Swan Valley & East": [
    "swan-valley", "irwin", "palisades",
  ],
  "Bear Lake & Caribou County": [
    "montpelier", "paris", "fish-haven", "st-charles", "georgetown", "bennington",
    "dingle", "bern", "ovid", "nounan", "geneva", "bloomington", "wayan",
  ],
  "Soda Springs & Surrounding": [
    "soda-springs", "grace", "bancroft", "swan-lake", "lava-hot-springs",
  ],
  "Preston & Franklin County": [
    "preston", "franklin", "dayton", "weston", "clifton", "oxford",
  ],
  "Southeast Idaho": [
    "malad-city", "downey", "arimo",
  ],
  "Salmon & Lemhi Valley": [
    "salmon", "leadore", "tendoy", "challis", "mackay", "clayton", "stanley",
  ],
  "Lost River & West": [
    "arco", "howe",
  ],
};

const ServiceArea = () => {
  const { data: cities } = useQuery({
    queryKey: ["cities-all"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("*").order("name");
      return data || [];
    },
  });

  const cityMap = new Map((cities || []).map((c) => [c.slug, c]));

  // Collect any cities not assigned to a region
  const assignedSlugs = new Set(Object.values(REGIONS).flat());
  const unassigned = (cities || []).filter((c) => !assignedSlugs.has(c.slug));

  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Catering Services Throughout East Idaho
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Simply Delicious Catering proudly serves {cities?.length || "60+"}
            &nbsp;communities across East Idaho. Select your city to learn more about
            catering in your area.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container space-y-14">
          {Object.entries(REGIONS).map(([region, slugs]) => {
            const regionCities = slugs
              .map((s) => cityMap.get(s))
              .filter(Boolean);
            if (regionCities.length === 0) return null;

            return (
              <div key={region}>
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold">{region}</h2>
                  <span className="text-sm text-muted-foreground">
                    ({regionCities.length} {regionCities.length === 1 ? "city" : "cities"})
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {regionCities.map((city) => (
                    <Link
                      key={city!.slug}
                      to={`/catering/${city!.slug}`}
                      className="group rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                    >
                      <h3 className="font-display text-base font-semibold group-hover:text-primary">
                        {city!.name}, {city!.state}
                      </h3>
                      {city!.service_radius_notes && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {city!.service_radius_notes}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {unassigned.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-bold">Other Areas</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {unassigned.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/catering/${city.slug}`}
                    className="group rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                  >
                    <h3 className="font-display text-base font-semibold group-hover:text-primary">
                      {city.name}, {city.state}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default ServiceArea;
