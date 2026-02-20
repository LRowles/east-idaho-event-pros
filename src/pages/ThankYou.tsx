import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  return (
    <Layout>
      <section className="py-32">
        <div className="container text-center">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-secondary" />
          <h1 className="mb-4 font-display text-4xl font-bold">Thank You!</h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            We've received your quote request and will get back to you within 24 business hours with a custom proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/menus">Browse Our Menus</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/gallery">View Our Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;
