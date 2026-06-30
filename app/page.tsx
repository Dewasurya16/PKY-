import nextDynamic from "next/dynamic";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { getAllFacilities } from "@/lib/queries/facility.queries";
import { getAllNews } from "@/lib/queries/news.queries";

export const dynamic = "force-dynamic";

// Lazy-loaded components (below the fold)
const StatsStrip = nextDynamic(() => import("@/components/sections/StatsStrip").then(mod => mod.StatsStrip));
const Profile = nextDynamic(() => import("@/components/sections/profile").then(mod => mod.Profile));
const Workflow = nextDynamic(() => import("@/components/sections/workflow").then(mod => mod.Workflow));
const Process = nextDynamic(() => import("@/components/sections/process").then(mod => mod.Process));
const Gallery = nextDynamic(() => import("@/components/sections/gallery").then(mod => mod.Gallery));
const Organization = nextDynamic(() => import("@/components/sections/organization").then(mod => mod.Organization));
const Transparency = nextDynamic(() => import("@/components/sections/transparency").then(mod => mod.Transparency));
const News = nextDynamic(() => import("@/components/sections/news").then(mod => mod.News));
const CtaChannels = nextDynamic(() => import("@/components/sections/CtaChannels").then(mod => mod.CtaChannels));
const Faq = nextDynamic(() => import("@/components/sections/faq").then(mod => mod.Faq));
const Footer = nextDynamic(() => import("@/components/sections/footer").then(mod => mod.Footer));

export default async function HomePage() {
  const [facilities, news] = await Promise.all([
    getAllFacilities(),
    getAllNews(),
  ]);

  // Hanya ambil 3 berita terbaru yang sudah di-publish
  const latestNews = news.filter((n) => n.is_published).slice(0, 3);

  return (
    <main>
      <Navbar />
      <Hero facilities={facilities} />
      <StatsStrip />
      <Profile />
      <Workflow />
      <Process />
      <Gallery />
      <Organization />
      <Transparency />
      <News newsItems={latestNews} />
      <CtaChannels />
      <Faq />
      <Footer />
    </main>
  );
}
