import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Templates } from "@/components/landing/templates";
import { Collaboration } from "@/components/landing/collaboration";
import { UseCases } from "@/components/landing/use-cases";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SystemPad | Design Scalable System Architectures in Minutes",
  description: "Infinite canvas, real-time collaboration, ready architecture components, and AI-generated diagrams. The fastest way to design engineering systems.",
  openGraph: {
    title: "SystemPad | Professional System Design Tool",
    description: "Design scalable architectures with ease. Infinite canvas, AI diagrams, and real-time collaboration.",
    images: ["/hero-visual.png"],
  },
};

const HERO_IMAGE_URL = "/hero-visual.png";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-fg">
      <Navbar />
      
      <main>
        <Hero heroImageUrl={HERO_IMAGE_URL} />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Templates />
        <Collaboration heroImageUrl={HERO_IMAGE_URL} />
        <UseCases />
        <Pricing />
        <FinalCTA />
      </main>

      <Footer />

      {/* Floating CTA for small/medium screens on scroll */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button className="btn-primary shadow-2xl px-6 py-3 flex items-center gap-2">
          Start Free
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
