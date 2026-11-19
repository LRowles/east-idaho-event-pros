import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { VENUES, VENUE_REGIONS } from "@/lib/venues";

const Venues = () => {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? VENUES : VENUES.filter(v => v.region === filter);

  return (
    <Layout>
      <section className="relative isolate overflow-hidden py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/wedding-venue.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
        <div className="container relative text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest opacity-90">Catering Across East Idaho</p>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Venues We Serve</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">From mountain estates and lakeside celebrations to university events and community gatherings, we bring dependable catering to distinctive venues throughout East Idaho.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeading title="Favorite Places We Cater" subtitle="Familiar kitchens, load-in routes, and layouts mean a smoother day for you." />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {VENUE_REGIONS.map(r => (
              <button key={r} onClick={() => setFilter(r)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === r ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:border-primary hover:text-primary"}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(v => (
              <article key={v.name} className="group overflow-hidden rounded-[18px] border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={v.image} alt={`Catering at ${v.name}, ${v.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-semibold text-secondary-foreground">{v.region}</span>
                </div>
                <div className="p-6">
                  <p className="mb-1 flex items-center gap-1 text-sm text-primary"><MapPin className="h-4 w-4" />{v.location}</p>
                  <h3 className="mb-2 font-display text-xl font-semibold">{v.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{v.blurb}</p>
                  <Link to="/get-a-quote" className="text-sm font-semibold text-primary hover:underline">Request a quote for this venue →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-3xl rounded-[18px] bg-muted p-8 text-center md:p-10">
            <h2 className="mb-3 font-display text-2xl font-bold md:text-3xl">Already Have a Venue?</h2>
            <p className="mb-6 text-muted-foreground">We cater at venues, churches, businesses, homes, and outdoor locations throughout East Idaho. Tell us where you are gathering and we will help plan the food and service.</p>
            <Button asChild size="lg"><Link to="/get-a-quote">Request a Catering Quote</Link></Button>
          </div>
        </div>
      </section>
      <CTABand />
    </Layout>
  );
};
export default Venues;
