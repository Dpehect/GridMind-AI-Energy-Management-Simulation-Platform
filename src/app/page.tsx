import { CapabilitiesGrid } from "@/components/marketing/capabilities-grid";
import { FAQ } from "@/components/marketing/faq";
import { FinalCTA } from "@/components/marketing/final-cta";
import { Hero } from "@/components/marketing/hero";
import { ImpactStrip } from "@/components/marketing/impact-strip";
import { ProductPreview } from "@/components/marketing/product-preview";
import { ScrollStory } from "@/components/marketing/scroll-story";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { UseCases } from "@/components/marketing/use-cases";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export default function HomePage() {
  return (
    <main className="overflow-clip">
      <SmoothScroll />
      <SiteHeader />
      <Hero />
      <ImpactStrip />
      <ScrollStory />
      <ProductPreview />
      <CapabilitiesGrid />
      <UseCases />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
