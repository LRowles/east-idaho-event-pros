import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(200_18%_22%)] text-white supports-[backdrop-filter]:bg-[hsl(200_18%_22%/0.95)] backdrop-blur">
        <div className="container flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/logo-transparent.png" alt="Simply Delicious Catering" className="h-28 w-auto object-center object-fill" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className="text-sm font-medium text-white/70 transition-colors hover:text-white">

              {link.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`} className="hidden items-center gap-1 text-sm font-medium text-secondary md:flex">
            <Phone className="h-4 w-4" />
            {BUSINESS.phone1}
          </a>
          <Button asChild size="sm">
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
      <div className="border-t border-white/10 bg-[hsl(200_18%_22%)] lg:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            {NAV_LINKS.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => setMobileOpen(false)}>

                {link.label}
              </Link>
          )}
            <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-secondary">
              <Phone className="h-4 w-4" />
              {BUSINESS.phone1}
            </a>
          </nav>
        </div>
      }
    </header>);

};

export default Header;