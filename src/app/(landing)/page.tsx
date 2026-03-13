import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Templates } from "@/components/landing/templates";
import { Collaboration } from "@/components/landing/collaboration";
import { UseCases } from "@/components/landing/use-cases";
import { Pricing } from "@/components/landing/pricing";
import { FinalCTA } from "@/components/landing/final-cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SystemPad | Design Scalable System Architectures",
  description: "The fastest way to design, document, and share system architectures.",
};

export default function Home() {
  const HERO_IMAGE_URL = "/hero-visual.png";
  
  return (
    <>
      <Hero heroImageUrl={HERO_IMAGE_URL} />
      <SocialProof />
      <Features />
      <HowItWorks />
      <Templates />
      <Collaboration heroImageUrl={HERO_IMAGE_URL} />
      <UseCases />
      <Pricing />
      <FinalCTA />
    </>
  );
}
