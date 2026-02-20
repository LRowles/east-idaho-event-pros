import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { BUSINESS } from "@/lib/constants";

const About = () => {
  return (
    <Layout>
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">About {BUSINESS.name}</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Locally owned and operated in Shelley, Idaho — proudly serving East Idaho.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold">Our Story</h2>
          <p className="mb-6 text-muted-foreground">
            Simply Delicious Catering was born from a love of great food and a passion for bringing people together. Based in Shelley, Idaho, we serve weddings, corporate events, private parties, and community gatherings across 27+ East Idaho communities.
          </p>
          <p className="mb-6 text-muted-foreground">
            Every dish is prepared with fresh, quality ingredients and care. Whether you need an elegant plated dinner for 200 or a casual drop-off lunch for 20, we bring the same dedication to every event.
          </p>

          <h2 className="mb-4 mt-12 font-display text-2xl font-bold">Our Standards</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" /> Fresh, locally sourced ingredients whenever possible</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" /> Custom menus tailored to your event and dietary needs</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" /> Professional, friendly service from start to finish</li>
            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" /> On-time delivery and setup, every time</li>
          </ul>
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default About;
