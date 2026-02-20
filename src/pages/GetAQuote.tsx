import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const EVENT_TYPES = ["Wedding", "Corporate", "Private Party", "Drop-Off", "School/Community", "Holiday", "Other"];
const SERVICE_STYLES = ["Buffet", "Plated", "Family-Style", "Cocktail", "Drop-Off", "Not Sure"];
const BUDGET_RANGES = ["Under $500", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+", "Not Sure"];

const GetAQuote = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: cities } = useQuery({
    queryKey: ["cities-quote"],
    queryFn: async () => {
      const { data } = await supabase.from("cities").select("name, slug").order("name");
      return data || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await supabase.from("leads").insert({
      full_name: form.get("full_name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      event_type: form.get("event_type") as string,
      event_date: form.get("event_date") as string || null,
      guest_count: form.get("guest_count") ? Number(form.get("guest_count")) : null,
      event_city: form.get("event_city") as string,
      venue_address: form.get("venue_address") as string || null,
      service_style: form.get("service_style") as string || null,
      budget_range: form.get("budget_range") as string || null,
      dietary_needs: form.get("dietary_needs") as string || null,
      menu_interest: form.get("menu_interest") as string || null,
      message: form.get("message") as string || null,
      source: "quote_form",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      navigate("/thank-you");
    }
  };

  return (
    <Layout>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Request a Catering Quote</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Tell us about your event and our team will help you create a catering plan tailored to your needs. We respond quickly and make the process simple.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" name="full_name" required maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required maxLength={20} />
                </div>
                <div>
                  <Label htmlFor="event_type">Event Type *</Label>
                  <Select name="event_type" defaultValue={searchParams.get("service") || ""}>
                    <SelectTrigger><SelectValue placeholder="Select event type" /></SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="event_date">Event Date</Label>
                  <Input id="event_date" name="event_date" type="date" />
                </div>
                <div>
                  <Label htmlFor="guest_count">Estimated Guest Count *</Label>
                  <Input id="guest_count" name="guest_count" type="number" min={1} required />
                </div>
                <div>
                  <Label htmlFor="event_city">Event City *</Label>
                  <Select name="event_city" defaultValue={searchParams.get("city") || ""}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>
                      {(cities || []).map((c) => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="service_style">Service Style</Label>
                  <Select name="service_style">
                    <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                    <SelectContent>
                      {SERVICE_STYLES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="venue_address">Venue / Address</Label>
                <Input id="venue_address" name="venue_address" maxLength={255} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <Select name="budget_range">
                    <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dietary_needs">Dietary Needs</Label>
                  <Input id="dietary_needs" name="dietary_needs" placeholder="e.g. gluten-free, vegan" maxLength={255} />
                </div>
              </div>
              <div>
                <Label htmlFor="menu_interest">Menu Interest</Label>
                <Input id="menu_interest" name="menu_interest" placeholder="e.g. BBQ buffet, Italian plated" maxLength={255} />
              </div>
              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea id="message" name="message" rows={4} maxLength={2000} />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border bg-muted p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">Our Team Can Assist With</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Menu selection",
                  "Event planning support",
                  "Service options",
                  "Scheduling",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Submit your request and we'll follow up with next steps.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default GetAQuote;
