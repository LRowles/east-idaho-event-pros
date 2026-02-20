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
          <p className="mb-6 text-lg text-muted-foreground">
            Simply Delicious Catering is dedicated to helping clients throughout East Idaho host exceptional events with delicious food and dependable service.
          </p>
          <p className="mb-6 text-muted-foreground">
            Our team brings experience, professionalism, and attention to detail to every event. We work closely with clients to design menus that fit their vision and ensure everything runs smoothly.
          </p>
          <p className="text-muted-foreground">
            Our goal is to make catering simple, reliable, and enjoyable.
          </p>
        </div>
      </section>

      <CTABand />
    </Layout>
  );
};

export default About;
