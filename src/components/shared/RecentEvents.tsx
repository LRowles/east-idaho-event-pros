import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";
import { RECENT_EVENTS } from "@/lib/gallery";

const RecentEvents = () => (
  <section className="py-20">
    <div className="container">
      <SectionHeading title="Recent Events We've Catered" />
      <p className="mx-auto mt-3 max-w-3xl text-center text-muted-foreground">
        A look at recent celebrations at venues across East Idaho, where thoughtful menus, polished presentation, and dependable service brought each event together.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {RECENT_EVENTS.map((e) => (
          <article key={e.title} className="group overflow-hidden rounded-[18px] border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Users className="h-3 w-3" /> {e.guests}
              </span>
            </div>
            <div className="p-6">
              <h3 className="mb-1 font-display text-xl font-semibold">{e.title}</h3>
              <p className="mb-3 flex items-center gap-1 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" /> {e.venue} · {e.city}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">{e.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="secondary">
          <Link to="/gallery">View the gallery</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default RecentEvents;
