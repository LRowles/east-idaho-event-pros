import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t bg-foreground text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Contact */}
          <div>
            <img src="/images/logo-dark.png" alt="Simply Delicious Catering" className="mb-4 h-14 w-auto" />
            <ul className="space-y-2 text-sm opacity-80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {BUSINESS.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`}>{BUSINESS.phone1}</a>
                {" / "}
                <a href={`tel:${BUSINESS.phone2.replace(/\D/g, "")}`}>{BUSINESS.phone2}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="break-all">{BUSINESS.email}</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-1 text-sm opacity-80">
              {[
                { label: "Wedding Catering", href: "/wedding-catering" },
                { label: "Corporate Catering", href: "/corporate-catering" },
                { label: "Menus", href: "/menus" },
                { label: "Gallery", href: "/gallery" },
                { label: "Service Area", href: "/service-area" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Get a Quote", href: "/get-a-quote" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="transition-opacity hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider">Serving East Idaho</h4>
            <p className="text-sm opacity-80">
              Idaho Falls · Ammon · Shelley · Rigby · Rexburg · Blackfoot · Pocatello · and 20+ more communities across East Idaho.
            </p>
            <Link to="/service-area" className="mt-2 inline-block text-sm font-medium text-accent underline-offset-2 hover:underline">
              View all service areas →
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
