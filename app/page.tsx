"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VideoHero } from "@/components/VideoHero";
import LogoTicker from "@/components/LogoTicker";
import { ValueProposition } from "@/components/ValueProposition";
import { ServicesGrid } from "@/components/ServicesGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Results } from "@/components/Results";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";

// Partner logos
import questEnergy from "@/components/partners/Untitled design (5).png";
import assignSolar from "@/components/partners/Untitled design (6).png";
import KStructure from "@/components/partners/Untitled design (7).png";
import Amsolar from "@/components/partners/3.png";
import DE from "@/components/partners/Untitled design (12).png";
import Rewatts from "@/components/partners/5.png";
import Solarock from "@/components/partners/Untitled (600 x 205 px).png";
import SolarSunyield from "@/components/partners/solarsunyield.png";
import raygosolar from "@/components/partners/Untitled design (13).png";
import AD from "@/components/partners/Untitled design (14).png";
import IPS from "@/components/partners/logo_footer.png";
import IJRVenture from "@/components/partners/realIJRventure.png";
import Vantage from "@/components/partners/whitevantage.png";
import TwentyThree from "@/components/partners/twentythree.png";
import TrueBioScience from "@/components/partners/truebioscience.png";
import Macglo from "@/components/partners/Macglo.png";
import Geosav from "@/components/partners/geosav.png";
import ElevatedStudios from "@/components/partners/elevatedstud.png";

export default function Home() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar onOpenLeadForm={openLeadForm} />

      {/* Hero Section with Video Background */}
      <VideoHero onOpenLeadForm={openLeadForm} />

      {/* Trusted By / Logo Ticker */}
      <section id="trusted-by">
        <LogoTicker
          logos={[
            { src: DE, alt: "DE Solar" },
            { src: raygosolar, alt: "RES Ray Go Solar" },
            { src: questEnergy, alt: "Quest Energy" },
            { src: assignSolar, alt: "Assign Solar" },
            { src: KStructure, alt: "K-Structures" },
            { src: Amsolar, alt: "AM Solar" },
            { src: AD, alt: "AD Power" },
            { src: SolarSunyield, alt: "Solar Sunyield" },
            { src: Solarock, alt: "Solarock" },
            { src: Rewatts, alt: "R Brand" },
            { src: IPS, alt: "IPS" },
            { src: IJRVenture, alt: "IJR Venture" },
            { src: Vantage, alt: "Steel Works Sdn Bhd" },
            { src: TwentyThree, alt: "Twenty 3 Florist" },
            { src: TrueBioScience, alt: "True BioScience" },
            { src: Macglo, alt: "Macglo" },
            { src: Geosav, alt: "Geosav" },
            { src: ElevatedStudios, alt: "Elevated Studios" },
          ]}
          speed={33}
          logoHeight={64}
          cardHeight={104}
        />
      </section>

      {/* Value Proposition / Mission Statement */}
      <ValueProposition />

      {/* Services Overview */}
      <ServicesGrid />

      {/* How It Works */}
      <HowItWorks onOpenLeadForm={openLeadForm} />

      {/* Results & Testimonials */}
      <Results />

      {/* FAQ */}
      <FAQ />

      {/* Call to Action */}
      <CTA onOpenLeadForm={openLeadForm} />

      {/* Footer */}
      <Footer />

      {/* Lead Form Modal */}
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </main>
  );
}
