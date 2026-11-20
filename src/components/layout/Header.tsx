import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SERVICE_NAV } from "@/lib/serviceCatalog";
import { Button } from "@/components/ui/button";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary text-primary-foreground supports-[backdrop-filter]:bg-primary/95 backdrop-blur">
        <div className="container flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/logo-transparent.png" alt="Simply Delicious Catering" className="h-20 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => link.label === "Services" ?
          <DropdownMenu key={link.href} modal={false}>
              <DropdownMenuTrigger className="flex items-center gap-1 rounded-sm text-sm font-medium text-primary-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent data-[state=open]:text-accent">
                Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="grid w-[30rem] grid-cols-2 gap-x-2 p-3">
                {SERVICE_NAV.map((g) =>
              <div key={g.group}>
                    <DropdownMenuLabel className="font-subheading text-xs uppercase tracking-wide text-muted-foreground">{g.group}</DropdownMenuLabel>
                    {g.links.map((l) =>
                <DropdownMenuItem key={l.href} asChild><Link to={l.href} className="cursor-pointer">{l.label}</Link></DropdownMenuItem>
                )}
                  </div>
              )}
                <DropdownMenuSeparator className="col-span-2" />
                <DropdownMenuItem asChild className="col-span-2 font-semibold text-primary"><Link to="/our-services">View all services</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> :
          <Link
            key={link.href}
            to={link.href}
            className="text-sm font-medium text-primary-foreground transition-colors hover:text-accent">

              {link.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`} className="hidden items-center gap-1 text-sm font-medium text-accent md:flex">
            <Phone className="h-4 w-4" />
            {BUSINESS.phone1}
          </a>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/get-a-quote">Get a Quote</Link>
          </Button>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">

            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen &&
      <div className="border-t border-primary-foreground/10 bg-primary lg:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            {NAV_LINKS.map((link) => link.label === "Services" ?
          <div key={link.href}>
                <button type="button" aria-expanded={mobileServices} onClick={() => setMobileServices(!mobileServices)} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10">
                  Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileServices &&
            <div className="ml-3 border-l border-primary-foreground/20 pl-3">
                    {SERVICE_NAV.map((g) =>
              <div key={g.group} className="py-1">
                        <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-accent">{g.group}</p>
                        {g.links.map((l) =>
                <Link key={l.href} to={l.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10">{l.label}</Link>
                )}
                      </div>
              )}
                    <Link to="/our-services" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm font-semibold text-accent hover:bg-primary-foreground/10">View all services</Link>
                  </div>
            }
              </div> :
          <Link
            key={link.href}
            to={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 hover:text-accent"
            onClick={() => setMobileOpen(false)}>

                {link.label}
              </Link>
          )}
            <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-accent">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone1}
            </a>
          </nav>
        </div>
      }
    </header>);

};

export default Header;