import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { Profile } from "@/components/sections/profile";
import { Workflow } from "@/components/sections/workflow";
import { Process } from "@/components/sections/process";
import { Gallery } from "@/components/sections/gallery";
import { Organization } from "@/components/sections/organization";
import { News } from "@/components/sections/news";
import { CtaChannels } from "@/components/sections/cta-channels";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

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
      <News />
      <CtaChannels />
      <Faq />
      <Footer />
    </main>
  );
}
