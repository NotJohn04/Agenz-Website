"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  return (
    <main className="min-h-screen bg-black">
      <Navbar onOpenLeadForm={openLeadForm} />
      <Pricing onOpenLeadForm={openLeadForm} />
      <Footer />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </main>
  );
}
