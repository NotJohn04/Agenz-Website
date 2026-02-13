"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import {
  IconSparkles,
  IconVideo,
  IconCamera,
  IconBrandFacebook,
  IconUsers,
  IconAd2,
  IconChartBar,
  IconWorld,
  IconServer,
  IconDatabase,
  IconRobot,
  IconFileText,
  IconShare,
  IconCalendar,
  IconSettings,
  IconArrowRight,
} from "@tabler/icons-react";

const allServices = [
  {
    category: "AI Creative Solutions",
    services: [
      {
        name: "AI Creatives",
        slug: "ai-creatives",
        icon: IconSparkles,
        description: "Generate stunning, high-converting ad creatives powered by AI in seconds.",
        features: ["Unlimited variations", "A/B testing ready", "Brand consistency"],
        price: "RM 688/batch",
      },
      {
        name: "AI Video Production",
        slug: "ai-videos",
        icon: IconVideo,
        description: "Create professional video content at scale with AI-powered tools.",
        features: ["Short-form content", "Product videos", "Social media clips"],
        price: "RM 488/video",
      },
      {
        name: "Real Content Creation",
        slug: "content-creation",
        icon: IconCamera,
        description: "Professional photography and videography for authentic brand content.",
        features: ["On-location shoots", "Studio production", "Post-production"],
        price: "RM 1,288/session",
      },
    ],
  },
  {
    category: "Digital Marketing",
    services: [
      {
        name: "Social Media Management",
        slug: "social-media-management",
        icon: IconBrandFacebook,
        description: "Full-service management across all major platforms.",
        features: ["Content calendar", "Community management", "Analytics"],
        price: "RM 888/mo",
      },
      {
        name: "Influencer Marketing",
        slug: "influencer-marketing",
        icon: IconUsers,
        description: "Connect with the right influencers to amplify your brand.",
        features: ["Influencer matching", "Campaign management", "ROI tracking"],
        price: "RM 799/mo",
      },
      {
        name: "Advertisement",
        slug: "advertising",
        icon: IconAd2,
        description: "Data-driven paid advertising across all digital channels.",
        features: ["Meta Ads", "Google Ads", "TikTok Ads"],
        price: "RM 588/mo",
      },
      {
        name: "Analytics & Reporting",
        slug: "analytics-reporting",
        icon: IconChartBar,
        description: "Comprehensive insights and performance tracking.",
        features: ["Custom dashboards", "Weekly reports", "Attribution modeling"],
        price: "RM 488",
      },
    ],
  },
  {
    category: "Web Solutions",
    services: [
      {
        name: "Website Design & Development",
        slug: "website-design",
        icon: IconWorld,
        description: "Beautiful, conversion-focused website design and custom development in one package.",
        features: ["UI/UX design", "React/Next.js", "Mobile-first"],
        price: "RM 2,676/pkg",
      },
      {
        name: "Landing Page",
        slug: "landing-page",
        icon: IconFileText,
        description: "High-converting landing pages designed to capture leads and drive action.",
        features: ["Custom design", "Mobile responsive", "Conversion optimized"],
        price: "RM 1,367/page",
      },
      {
        name: "Website Hosting",
        slug: "website-hosting",
        icon: IconServer,
        description: "Fast, secure, and reliable hosting solutions.",
        features: ["SSL included", "Daily backups", "99.9% uptime"],
        price: "RM 288/mo",
      },
    ],
  },
  {
    category: "Business Automation",
    services: [
      {
        name: "CRM Integration",
        slug: "crm-integration",
        icon: IconDatabase,
        description: "Seamless CRM setup and integration for better lead management.",
        features: ["HubSpot", "Salesforce", "Custom CRM"],
        price: "RM 888/mo",
      },
      {
        name: "AI Chatbot & Voice",
        slug: "ai-chatbot",
        icon: IconRobot,
        description: "24/7 AI-powered customer engagement across all channels.",
        features: ["WhatsApp", "Website chat", "Voice AI"],
        price: "RM 888/mo",
      },
      {
        name: "Workflow Automation",
        slug: "automation",
        icon: IconSettings,
        description: "Automate repetitive tasks and streamline operations.",
        features: ["Lead routing", "Follow-ups", "Booking systems"],
        price: "Contact us",
      },
    ],
  },
];

const categories = ["All", ...allServices.map((cat) => cat.category)];

export default function ServicesPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const filteredServices =
    activeCategory === "All"
      ? allServices
      : allServices.filter((cat) => cat.category === activeCategory);

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
              Our Services
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              AI-Powered Solutions for{" "}
              <span className="gradient-text">Modern Business</span>
            </h1>
            <p className="text-lg text-white/60">
              From creative production to full-stack automation, we provide everything
              you need to acquire and convert customers at scale.
            </p>
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

      {/* Services Grid */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredServices.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                {category.category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, serviceIndex) => (
                  <motion.a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: serviceIndex * 0.1 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.08] hover:-translate-y-1"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 mb-4 transition-colors group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
                      <service.icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {service.name}
                      </h3>
                      <span className={`text-xs font-medium whitespace-nowrap mt-1 ${service.price === "Contact us" ? "text-white/40" : "text-cyan-400"}`}>
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 mb-4">{service.description}</p>

                    {/* Features */}
                    <ul className="space-y-1 mb-4">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-xs text-white/40 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Arrow */}
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                      Learn more
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Book a free consultation and we&apos;ll help you identify the best
              solutions for your business goals.
            </p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Get Free Consultation
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
