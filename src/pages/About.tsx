import Layout from "@/components/layout/Layout";
import CTABand from "@/components/shared/CTABand";
import { BUSINESS } from "@/lib/constants";

const About = () => {
  return (
    <Layout>
      <section className="relative py-20 text-primary-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387330076_195247146932499_4524724591102155355_n.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">About {BUSINESS.name}</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">Locally owned and operated in Shelley, Idaho — proudly serving East Idaho.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div>
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
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387315687_1293051664684159_3464295970262061447_n.jpg"
              alt="Simply Delicious Catering team at work"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <CTABand backgroundImage="https://simplydeliciousmeals4you.com/wp-content/uploads/2023/10/387334824_1284647166268806_6697426632736343610_n.jpg" />
    </Layout>
  );
};

export default About;
