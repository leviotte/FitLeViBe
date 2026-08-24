import { AboutLevi } from "@/components/about-levi";
import { Faq } from "@/components/faq";
import { FitCheckSection } from "@/components/fitcheck-section";
import { GoalCards } from "@/components/goal-cards";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { TrustRow } from "@/components/trust-row";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <GoalCards />
      <HowItWorks />
      <AboutLevi />
      <FitCheckSection />
      <Faq />
    </>
  );
}
