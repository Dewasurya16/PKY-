import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Profile } from "@/components/sections/Profile";
import { Workflow } from "@/components/sections/Workflow";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Organization } from "@/components/sections/Organization";
import { Transparency } from "@/components/sections/Transparency";
import { News } from "@/components/sections/News";
import { CtaChannels } from "@/components/sections/CtaChannels";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

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
