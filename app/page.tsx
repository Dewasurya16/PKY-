import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";

// Lazy-loaded components (below the fold)
const StatsStrip = dynamic(() => import("@/components/sections/StatsStrip").then(mod => mod.StatsStrip));
const Profile = dynamic(() => import("@/components/sections/profile").then(mod => mod.Profile));
const Workflow = dynamic(() => import("@/components/sections/workflow").then(mod => mod.Workflow));
const Process = dynamic(() => import("@/components/sections/process").then(mod => mod.Process));
const Gallery = dynamic(() => import("@/components/sections/gallery").then(mod => mod.Gallery));
const Organization = dynamic(() => import("@/components/sections/organization").then(mod => mod.Organization));
const Transparency = dynamic(() => import("@/components/sections/transparency").then(mod => mod.Transparency));
const News = dynamic(() => import("@/components/sections/news").then(mod => mod.News));
const CtaChannels = dynamic(() => import("@/components/sections/CtaChannels").then(mod => mod.CtaChannels));
const Faq = dynamic(() => import("@/components/sections/faq").then(mod => mod.Faq));
const Footer = dynamic(() => import("@/components/sections/footer").then(mod => mod.Footer));

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsStrip />
      <Profile />
      <Workflow />
      <Process />
      <Gallery />
      <Organization />
      <Transparency />
      <News />
      <CtaChannels />
      <Faq />
      <Footer />
    </main>
  );
}
