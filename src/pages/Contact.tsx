import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { BUSINESS } from "@/lib/constants";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await supabase.from("leads").insert({
      full_name: form.get("name") as string,
      email: form.get("email") as string,
      message: form.get("message") as string,
      source: "quick_question",
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <Layout>
      <section className="relative py-20 text-primary-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387328861_197261626655318_5497212651419768350_n.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">Contact Simply Delicious Catering</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Have a question or ready to start planning your event?</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Get in Touch</h2>
            <p className="mb-6 text-muted-foreground">
              Contact Simply Delicious Catering to learn more about our services or request a quote.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <a href={`tel:${BUSINESS.phone1.replace(/\D/g, "")}`}>{BUSINESS.phone1}</a>
                  <br />
                  <a href={`tel:${BUSINESS.phone2.replace(/\D/g, "")}`}>{BUSINESS.phone2}</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              </li>
            </ul>
            <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387329700_166175556561960_3353963838566535720_n.jpg"
                alt="Simply Delicious catering setup"
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Quick Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required maxLength={1000} rows={4} />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <CTABand backgroundImage="https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387341855_216830891285400_4660425896227567006_n.jpg" />
    </Layout>
  );
};

export default Contact;
