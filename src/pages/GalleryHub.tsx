import { useState } from "react";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import RecentEvents from "@/components/shared/RecentEvents";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/lib/gallery";

const FILTERS = ["All", "Wedding", "Corporate", "BBQ", "Social", "Food"];

const GalleryHub = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<GalleryPhoto | null>(null);
  const filtered = filter === "All" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((g) => g.category === filter);

  return (
    <Layout>
      <section className="relative isolate overflow-hidden py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/waterfront-wedding.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/60 to-secondary/80" />
        <div className="container relative text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Weddings, company BBQs, and celebrations we've catered across East Idaho.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
                {f}
              </Button>
            ))}
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((g) => (
              <button
                key={g.src}
                onClick={() => setOpen(g)}
                className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[18px] border bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <img src={g.src} alt={g.caption} loading="lazy" className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">{g.category}</span>
                  <p className="text-sm font-medium text-background">{g.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-0">
          <DialogTitle className="sr-only">{open?.caption}</DialogTitle>
          {open && (
            <>
              <img src={open.src} alt={open.caption} className="max-h-[80vh] w-full object-contain bg-foreground" />
              <p className="p-4 text-sm text-muted-foreground">{open.caption}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

      <RecentEvents />
      <CTABand />
    </Layout>
  );
};

export default GalleryHub;
