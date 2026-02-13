"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconShieldCheck,
  IconSparkles,
  IconDiscount2,
} from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";

interface PricingProps {
  onOpenLeadForm: () => void;
}

const tiers = [
  {
    name: "Beginner",
    subtitle: "Generate leads & test our service",
    price: "RM 1,888",
    period: "/mo",
    badge: null,
    oneTime: null,
    guarantee: false,
    contract: null,
    discount: "10% off (6+ mo) · 15% off (10+ mo)",
    features: [
      { name: "AI Posters", included: true, detail: "Up to 20" },
      { name: "AI Videos", included: false },
      { name: "Digital Ads", included: true },
      { name: "CRM Setup", included: false },
      { name: "Reporting", included: true, detail: "Basic" },
      { name: "Influencer Marketing", included: false },
      { name: "Real Content Creation", included: false },
      { name: "Social Media", included: true, detail: "FB & IG only" },
    ],
    highlighted: false,
  },
  {
    name: "Intermediate",
    subtitle: "Systemize lead management with CRM & analytics",
    price: "RM 2,888",
    period: "/mo",
    badge: "Most Popular",
    oneTime: null,
    guarantee: true,
    contract: "Min 6 months",
    discount: "10% off (6+ mo) · 15% off (10+ mo)",
    features: [
      { name: "AI Posters", included: true, detail: "Up to 40" },
      { name: "AI Videos", included: true, detail: "1/month" },
      { name: "Digital Ads", included: true },
      { name: "CRM Setup", included: true },
      { name: "Reporting", included: true, detail: "Advanced" },
      { name: "Influencer Marketing", included: false },
      { name: "Real Content Creation", included: false },
      { name: "Social Media", included: true, detail: "FB & IG only" },
    ],
    highlighted: true,
  },
  {
    name: "Advanced",
    subtitle: "Scale your brand with content, influencers & every platform",
    price: "RM 6,888",
    period: "/mo",
    badge: null,
    oneTime: null,
    guarantee: true,
    contract: null,
    discount: "10% off (6+ mo) · 15% off (10+ mo)",
    features: [
      { name: "AI Posters", included: true, detail: "Up to 70" },
      { name: "AI Videos", included: true, detail: "4/month" },
      { name: "Digital Ads", included: true },
      { name: "CRM Setup", included: true },
      { name: "Reporting", included: true, detail: "Advanced" },
      { name: "Influencer Marketing", included: true },
      { name: "Real Content Creation", included: true },
      { name: "Social Media", included: true, detail: "Every Platform" },
    ],
    highlighted: false,
  },
];

const individualServices = [
  { name: "Social Media Management", price: "RM 888", unit: "/mo" },
  { name: "AI Creative Posters (up to 70)", price: "RM 688", unit: "/batch" },
  { name: "High-Quality AI Video", price: "RM 488", unit: "/video" },
  { name: "Real Content Creation (4hr)", price: "RM 1,288", unit: "/session" },
  { name: "Website Design + Building", price: "RM 2,676", unit: "/package" },
  { name: "Website Hosting", price: "RM 288", unit: "/mo" },
  { name: "CRM Setup & Integration", price: "RM 888", unit: "/mo" },
  { name: "AI Chatbot", price: "RM 888", unit: "/mo" },
  { name: "AI Voice Setup", price: "RM 888", unit: "/mo" },
  { name: "Digital Ads Management (PPC)", price: "RM 588", unit: "/mo" },
  { name: "Landing Page", price: "RM 1,367", unit: "/page" },
  { name: "Business Automation (Workflow)", price: "Contact us", unit: "" },
  { name: "SEO Management", price: "Contact us", unit: "" },
  { name: "Influencer Marketing", price: "RM 799", unit: "/mo" },
  { name: "Advanced Analytics", price: "RM 488", unit: "" },
];

const pricingFaqs = [
  {
    question: "What happens after I sign up?",
    answer:
      "After signing up, you'll be assigned a dedicated onboarding specialist who will schedule a kickoff call. We'll learn about your business, set up your accounts, and start executing within the first week.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. If you upgrade mid-cycle, we'll prorate the difference.",
  },
  {
    question: "What does the 100% money-back guarantee cover?",
    answer:
      "Our money-back guarantee applies to Intermediate and Advanced plans. If you're not satisfied with our services within the first 30 days, we'll refund your payment in full — no questions asked.",
  },
  {
    question: "Are there any setup fees?",
    answer:
      "No hidden setup fees on any plan. All pricing is straightforward — what you see is what you pay.",
  },
  {
    question: "What's included in the prepay discount?",
    answer:
      "Prepay 6 or more months on any plan and get 10% off. Prepay 10 or more months and get 15% off plus a free website (worth RM 2,676). The discount is applied automatically when you choose the prepay option.",
  },
  {
    question: "Do I own the content you create?",
    answer:
      "Yes, you own 100% of all content we create for you — including AI creatives, videos, website designs, and copy. Everything is yours to use however you like.",
  },
];

export function Pricing({ onOpenLeadForm }: PricingProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
              Pricing
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-white/60">
              Choose the plan that fits your business. All plans include our
              AI-powered tools and a dedicated team to help you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Prepay Discount Banner */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400">
                <IconDiscount2 className="h-7 w-7" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-white mb-1">
                  Save More with Prepay
                </h3>
                <p className="text-white/60 text-sm">
                  The longer you commit, the more you save. Discounts are applied automatically.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold gradient-text-cyan mb-1">10% Off</p>
                <p className="text-sm text-white/60">Prepay 6+ months on any plan</p>
              </div>
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-center">
                <p className="text-2xl font-bold gradient-text-cyan mb-1">15% Off</p>
                <p className="text-sm text-white/60">Prepay 10+ months</p>
                <p className="text-xs text-cyan-400 mt-1">+ Free Website (worth RM 2,676)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex flex-col rounded-2xl border p-6 lg:p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                    : "border-white/10 bg-white/5"
                } backdrop-blur-sm hover:border-blue-500/30`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold ${
                        tier.badge === "Most Popular"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                          : "bg-white/10 text-white/80 border border-white/20"
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-lg font-semibold text-white mb-1 mt-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-white/50 mb-4">{tier.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold gradient-text-cyan">
                    {tier.price}
                  </span>
                  <span className="text-white/50 text-sm">{tier.period}</span>
                </div>

                {/* Meta Info */}
                <div className="space-y-2 mb-6">
                  {tier.oneTime && (
                    <p className="text-xs text-white/50">
                      {tier.oneTime}
                    </p>
                  )}
                  {tier.guarantee && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <IconShieldCheck className="h-3.5 w-3.5" />
                      100% money-back guarantee
                    </p>
                  )}
                  {tier.contract && (
                    <p className="text-xs text-white/50">{tier.contract}</p>
                  )}
                  {tier.discount && (
                    <p className="text-xs text-cyan-400 flex items-center gap-1">
                      <IconDiscount2 className="h-3.5 w-3.5" />
                      Prepay: {tier.discount}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.name}
                      className={`flex items-start gap-2 text-sm ${feature.included ? "text-white/70" : "text-white/30"}`}
                    >
                      {feature.included ? (
                        <IconCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                      ) : (
                        <IconX className="h-4 w-4 text-white/20 shrink-0 mt-0.5" />
                      )}
                      <span>
                        {feature.name}
                        {feature.detail && (
                          <span className="text-white/40 ml-1">— {feature.detail}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={onOpenLeadForm}
                  className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
                      : "border border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="relative py-20">
        <div className="absolute inset-0 radial-glow-bottom opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Individual Services
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              See How Much You{" "}
              <span className="gradient-text-cyan">Save</span>
            </h2>
            <p className="text-white/60">
              Here&apos;s what each service would cost individually. Our packages
              bundle everything at a fraction of the price.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {individualServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:border-white/20 transition-colors"
              >
                <span className="text-sm text-white/70">{service.name}</span>
                <span className="text-sm font-semibold text-white whitespace-nowrap ml-3">
                  {service.price}
                  <span className="text-white/40 font-normal">
                    {service.unit}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* Total Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-6 sm:p-8 text-center"
          >
            <p className="text-white/60 mb-2">
              Total if purchased individually (monthly equivalent)
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-white mb-2">
              <span className="line-through text-white/30 mr-3">
                RM 10,000+
              </span>
              <span className="gradient-text-cyan">from RM 1,888/mo</span>
            </p>
            <p className="text-sm text-cyan-400">
              Save up to 80% with our bundled packages
            </p>
          </motion.div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm p-8 sm:p-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400 mx-auto mb-6">
              <IconShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              100% Money-Back Guarantee
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Try our Intermediate or Advanced plan risk-free. If you&apos;re not
              completely satisfied within the first 30 days, we&apos;ll refund your
              payment in full. No questions asked, no fine print.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Pricing Questions
            </h2>
            <p className="text-lg text-white/60">
              Common questions about our plans, billing, and guarantees.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {pricingFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/5 backdrop-blur-sm px-6 rounded-xl overflow-hidden transition-colors hover:border-white/20"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left text-white font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Book a free strategy call and let&apos;s find the right plan for
              you.
            </p>
            <button
              onClick={onOpenLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Get Started Today
              <IconArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
