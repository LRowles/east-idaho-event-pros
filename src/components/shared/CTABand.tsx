import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

const CTABand = ({
  title = "Ready to Make Catering the Easiest Part of Your Event?",
  subtitle = "Tell us about your event and we'll help you create the perfect catering plan.",
  buttonText = "Get a Catering Quote",
  buttonHref = "/get-a-quote",
}: CTABandProps) => {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container text-center">
        <h2 className="mb-3 font-display text-3xl font-bold">{title}</h2>
        <p className="mx-auto mb-6 max-w-lg text-lg opacity-90">{subtitle}</p>
        <Button asChild size="lg" variant="secondary">
          <Link to={buttonHref}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTABand;
