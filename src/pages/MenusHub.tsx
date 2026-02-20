import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface MenuSection {
  id: string;
  menu_section_name: string;
  menu_section_slug: string;
  parent_section_slug: string | null;
  section_intro: string | null;
  sort_order: number;
  is_featured: boolean;
}

interface SectionMenuItem {
  id: string;
  menu_item_name: string;
  menu_item_slug: string;
  menu_section_slug: string;
  short_description: string | null;
  options_list: string | null;
  serving_size: string | null;
  price_text: string | null;
  is_popular: boolean;
  sort_order: number;
}

interface SectionWithChildren extends MenuSection {
  children: MenuSection[];
}

const MenusHub = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ["menu-sections"],
    queryFn: async () => {
      const { data } = await supabase
        .from("menu_sections")
        .select("*")
        .order("sort_order");
      return (data || []) as MenuSection[];
    },
  });

  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["section-menu-items"],
    queryFn: async () => {
      const { data } = await supabase
        .from("section_menu_items")
        .select("*")
        .order("sort_order");
      return (data || []) as SectionMenuItem[];
    },
  });

  // Build hierarchy
  const topLevelSections: SectionWithChildren[] = (sections || [])
    .filter((s) => !s.parent_section_slug)
    .map((s) => ({
      ...s,
      children: (sections || [])
        .filter((c) => c.parent_section_slug === s.menu_section_slug)
        .sort((a, b) => a.sort_order - b.sort_order),
    }));

  // Group items by section slug
  const itemsBySection: Record<string, SectionMenuItem[]> = {};
  (items || []).forEach((item) => {
    if (!itemsBySection[item.menu_section_slug]) {
      itemsBySection[item.menu_section_slug] = [];
    }
    itemsBySection[item.menu_section_slug].push(item);
  });

  // Intersection observer for active section tracking
  useEffect(() => {
    if (!topLevelSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace("section-", ""));
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    topLevelSections.forEach((s) => {
      const el = sectionRefs.current[s.menu_section_slug];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [topLevelSections.length]);

  const scrollToSection = (slug: string) => {
    const el = sectionRefs.current[slug];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isLoading = sectionsLoading || itemsLoading;

  const renderItems = (sectionSlug: string) => {
    const sectionItems = itemsBySection[sectionSlug] || [];
    if (!sectionItems.length) return null;

    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {sectionItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-base font-semibold text-foreground">
                {item.menu_item_name}
              </h4>
              {item.is_popular && (
                <Badge variant="secondary" className="shrink-0 border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/10">
                  Popular
                </Badge>
              )}
            </div>
            {item.short_description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.short_description}
              </p>
            )}
            {item.options_list && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.options_list.split(";").map((opt) => (
                  <span
                    key={opt.trim()}
                    className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                  >
                    {opt.trim()}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              {item.serving_size && <span>{item.serving_size}</span>}
              {item.price_text && (
                <span className="font-medium text-primary">{item.price_text}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Our Menu
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Explore our full catering menu — from appetizers and salads to smoked BBQ, desserts, and everything in between.
          </p>
        </div>
      </section>

      {/* Sticky Section Nav */}
      {!isLoading && topLevelSections.length > 0 && (
        <nav
          ref={navRef}
          className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        >
          <div className="container">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {topLevelSections.map((s) => (
                <button
                  key={s.menu_section_slug}
                  onClick={() => scrollToSection(s.menu_section_slug)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    activeSection === s.menu_section_slug
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {s.menu_section_name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Menu Content */}
      <section className="py-16">
        <div className="container max-w-5xl">
          {isLoading ? (
            <div className="space-y-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-28 rounded-lg" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {topLevelSections.map((section) => (
                <div
                  key={section.menu_section_slug}
                  id={`section-${section.menu_section_slug}`}
                  ref={(el) => {
                    sectionRefs.current[section.menu_section_slug] = el;
                  }}
                >
                  <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {section.menu_section_name}
                  </h2>
                  {section.section_intro && (
                    <p className="mb-6 max-w-2xl text-muted-foreground">
                      {section.section_intro}
                    </p>
                  )}

                  {/* Items directly under this top-level section */}
                  {renderItems(section.menu_section_slug)}

                  {/* Child sub-sections */}
                  {section.children.length > 0 && (
                    <div className="mt-8 space-y-10">
                      {section.children.map((child) => (
                        <div
                          key={child.menu_section_slug}
                          id={`section-${child.menu_section_slug}`}
                        >
                          <h3 className="mb-1 font-display text-xl font-semibold text-foreground">
                            {child.menu_section_name}
                          </h3>
                          {child.section_intro && (
                            <p className="mb-4 text-sm text-muted-foreground">
                              {child.section_intro}
                            </p>
                          )}
                          {renderItems(child.menu_section_slug)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default MenusHub;
