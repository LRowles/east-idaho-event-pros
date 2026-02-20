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
          <h1 className="mb-4 font-display text-4xl font-bold">Thank You — Your Request Has Been Received</h1>
          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
            A member of our team will review your request and contact you soon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/menus">Browse Menus</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;
