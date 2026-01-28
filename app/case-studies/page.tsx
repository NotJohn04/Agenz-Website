"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconArrowRight,
  IconTrendingUp,
  IconUsers,
  IconClock,
  IconChartBar,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
  {
    slug: "fashion-ecommerce-40-conversion-boost",
    title: "Fashion E-commerce: 40% Conversion Boost",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    description:
      "How we helped a fashion retailer increase conversions by 40% with AI-powered WhatsApp automation.",
    client: "Fashion Retailer",
    industry: "E-commerce",
    results: [
      { metric: "Conversion Rate", value: "+40%" },
      { metric: "Response Time", value: "<30s" },
      { metric: "Customer Satisfaction", value: "4.8/5" },
    ],
  },
  {
    slug: "hr-tech-80-inquiry-automation",
    title: "HR Tech Startup: 80% Inquiry Automation",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
    description:
      "Implementing AI chatbot to handle 80% of customer inquiries automatically for a growing SaaS company.",
    client: "HR Tech Startup",
    industry: "SaaS / Technology",
    results: [
      { metric: "Automated Inquiries", value: "80%" },
      { metric: "Support Cost", value: "-60%" },
      { metric: "Lead Quality", value: "+35%" },
    ],
  },
  {
    slug: "property-developer-lead-distribution",
    title: "Property Developer: Automated Lead Distribution",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    description:
      "Transforming sales pipeline with automated lead distribution and follow-up systems.",
    client: "Property Developer",
    industry: "Real Estate",
    results: [
      { metric: "Lead Response", value: "Instant" },
      { metric: "Sales Pipeline", value: "+55%" },
      { metric: "Agent Efficiency", value: "+70%" },
    ],
  },
  {
    slug: "restaurant-chain-5x-outlets-no-staff",
    title: "Restaurant Chain: 5 Outlets, No Added Sales Staff",
    category: "F&B",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    description:
      "Full-funnel automation enabling rapid expansion without hiring additional sales staff.",
    client: "Restaurant Chain",
    industry: "Food & Beverage",
    results: [
      { metric: "Outlets Scaled", value: "5x" },
      { metric: "Booking Rate", value: "+85%" },
      { metric: "Staff Needed", value: "0 Added" },
    ],
  },
  {
    slug: "solar-company-3x-roas",
    title: "Solar Company: 3x ROAS with AI Creatives",
    category: "Energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop",
    description:
      "Achieving 3x return on ad spend through AI-generated creatives and automated follow-ups.",
    client: "Solar Energy Company",
    industry: "Renewable Energy",
    results: [
      { metric: "ROAS", value: "3x" },
      { metric: "Lead Cost", value: "-45%" },
      { metric: "Conversion", value: "+67%" },
    ],
  },
  {
    slug: "healthcare-clinic-booking-automation",
    title: "Healthcare Clinic: 24/7 Booking Automation",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    description:
      "Implementing round-the-clock appointment booking and patient inquiry handling.",
    client: "Medical Clinic",
    industry: "Healthcare",
    results: [
      { metric: "Bookings", value: "+120%" },
      { metric: "No-shows", value: "-40%" },
      { metric: "Staff Time Saved", value: "25hrs/week" },
    ],
  },
];

const categories = ["All", "E-commerce", "SaaS", "Real Estate", "F&B", "Energy", "Healthcare"];

export default function CaseStudiesPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const filteredStudies =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeCategory);

  return (
    <main className="min-h-screen bg-black">
      <Navbar onOpenLeadForm={openLeadForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              Case Studies
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              Real Results for{" "}
              <span className="gradient-text">Real Businesses</span>
            </h1>
            <p className="text-lg text-white/60">
              Explore how we&apos;ve helped businesses across industries transform their
              customer acquisition with AI-powered solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-12 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold gradient-text-cyan">
                <IconTrendingUp className="h-8 w-8" />
                50+
              </div>
              <p className="text-sm text-white/50 mt-1">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold gradient-text-cyan">
                <IconChartBar className="h-8 w-8" />
                3x
              </div>
              <p className="text-sm text-white/50 mt-1">Average ROAS</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold gradient-text-cyan">
                <IconUsers className="h-8 w-8" />
                10+
              </div>
              <p className="text-sm text-white/50 mt-1">Industries Served</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-3xl font-bold gradient-text-cyan">
                <IconClock className="h-8 w-8" />
                &lt;30s
              </div>
              <p className="text-sm text-white/50 mt-1">Response Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm border border-blue-500/30">
                      {study.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">{study.description}</p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {study.results.map((result) => (
                        <div key={result.metric} className="text-center">
                          <p className="text-lg font-bold gradient-text-cyan">
                            {result.value}
                          </p>
                          <p className="text-xs text-white/40">{result.metric}</p>
                        </div>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      Read case study
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-[#0a0a0a]">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Let&apos;s discuss how we can achieve similar results for your business.
            </p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Book Free Strategy Call
              <IconArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
    </main>
  );
}
