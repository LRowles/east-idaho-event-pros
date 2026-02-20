import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
}

const CTABand = ({
  title = "Ready to Make Catering the Easiest Part of Your Event?",
  subtitle = "Tell us about your event and we'll help you create the perfect catering plan.",
  buttonText = "Get a Catering Quote",
  buttonHref = "/get-a-quote",
  backgroundImage,
}: CTABandProps) => {
  return (
    <section className="relative py-16 text-primary-foreground">
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}
      <div className="container relative text-center">
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
