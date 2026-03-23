import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
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
      <Features />
      <Pricing />
      <FinalCTA />
    </>
  );
}
