import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OurStory = () => (
  <section className="bg-muted py-20">
    <div className="container grid items-center gap-10 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase text-primary">Our Story</p>
        <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">Where Passion Meets the Plate</h2>
        <p className="mb-5 text-muted-foreground">
          At Simply Delicious Catering &amp; BBQ, every dish tells a story. From our signature slow-smoked brisket to our elegant plated entrees, we bring heart, craft, and the finest ingredients to every event we serve.
        </p>
        <p className="mb-6 text-muted-foreground">
          Based in Eastern Idaho, we’ve spent years perfecting the art of catering that feels both personal and polished. Whether it’s a backyard BBQ for 50 or a wedding reception for 500, we approach every event with the same dedication to excellence.
        </p>
        <Button asChild size="lg"><Link to="/about">Learn More About Us</Link></Button>
      </div>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-card shadow-card">
        <img src="/images/fruit-charcuterie.jpeg" alt="Fresh fruit and charcuterie prepared by Simply Delicious Catering" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Simply Delicious Catering &amp; BBQ</span>
          <p className="mt-2 text-sm text-background">Serving East Idaho with heart</p>
        </div>
      </div>
    </div>
  </section>
);

export default OurStory;