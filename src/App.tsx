import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WeddingCatering from "./pages/WeddingCatering";
import CorporateCatering from "./pages/CorporateCatering";
import PrivateSocialEvents from "./pages/PrivateSocialEvents";
import DropOffCatering from "./pages/DropOffCatering";
import SchoolCommunityEvents from "./pages/SchoolCommunityEvents";
import HolidayCatering from "./pages/HolidayCatering";
import Rentals from "./pages/Rentals";
import MenusHub from "./pages/MenusHub";
import MenuCategory from "./pages/MenuCategory";
import GalleryHub from "./pages/GalleryHub";
import TestimonialsPage from "./pages/TestimonialsPage";
import About from "./pages/About";
import BlogHub from "./pages/BlogHub";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ServiceArea from "./pages/ServiceArea";
import GetAQuote from "./pages/GetAQuote";
import ThankYou from "./pages/ThankYou";
import CityLanding from "./pages/CityLanding";
import ServiceCityLanding from "./pages/ServiceCityLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wedding-catering" element={<WeddingCatering />} />
          <Route path="/corporate-catering" element={<CorporateCatering />} />
          <Route path="/private-social-events" element={<PrivateSocialEvents />} />
          <Route path="/drop-off-catering" element={<DropOffCatering />} />
          <Route path="/school-community-events" element={<SchoolCommunityEvents />} />
          <Route path="/holiday-catering" element={<HolidayCatering />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/menus" element={<MenusHub />} />
          <Route path="/menus/:menuSlug" element={<MenuCategory />} />
          <Route path="/gallery" element={<GalleryHub />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogHub />} />
          <Route path="/blog/:postSlug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-area" element={<ServiceArea />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/catering/:citySlug" element={<CityLanding />} />
          <Route path="/:serviceSlug/:citySlug" element={<ServiceCityLanding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
