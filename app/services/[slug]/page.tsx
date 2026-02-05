"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "next/navigation";
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
  IconSettings,
  IconSeo,
  IconArrowRight,
  IconCheck,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";

// Service data
const servicesData: Record<string, {
  name: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  price: string;
  priceUnit: string;
  heroImage?: string;
  benefits: string[];
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  platforms?: { name: string; icon: React.ElementType }[];
  pricing?: { name: string; price: string; features: string[] }[];
}> = {
  "ai-creatives": {
    name: "AI Creatives",
    icon: IconSparkles,
    tagline: "Generate stunning ad creatives in seconds",
    price: "RM 688",
    priceUnit: "/batch",
    description:
      "Leverage the power of AI to create high-converting ad creatives at scale. Our AI analyzes top-performing ads in your industry and generates unlimited variations optimized for engagement and conversions.",
    benefits: [
      "Generate hundreds of ad variations in minutes",
      "A/B test creatives automatically",
      "Maintain brand consistency across all assets",
      "Reduce creative production costs by 80%",
      "Scale your advertising without creative bottlenecks",
    ],
    features: [
      {
        title: "AI-Powered Generation",
        description: "Our AI learns from millions of high-performing ads to create creatives that convert.",
      },
      {
        title: "Brand Voice Matching",
        description: "Upload your brand guidelines and our AI maintains perfect consistency.",
      },
      {
        title: "Multi-Format Export",
        description: "Generate creatives for all platforms - Meta, Google, TikTok, and more.",
      },
      {
        title: "Performance Prediction",
        description: "AI scores each creative based on predicted performance before you spend.",
      },
    ],
    process: [
      { step: "01", title: "Brand Analysis", description: "We analyze your brand, competitors, and target audience." },
      { step: "02", title: "AI Training", description: "Our AI learns your brand voice and visual style." },
      { step: "03", title: "Generation", description: "Generate unlimited creative variations for testing." },
      { step: "04", title: "Optimization", description: "Continuous learning from performance data." },
    ],
  },
  "ai-videos": {
    name: "AI Video Production",
    icon: IconVideo,
    tagline: "Professional videos at unprecedented scale",
    price: "RM 688",
    priceUnit: "/video",
    description:
      "Create scroll-stopping video content for social media, ads, and marketing at a fraction of traditional costs. Our AI-powered video production combines cutting-edge technology with creative expertise.",
    benefits: [
      "Produce videos 10x faster than traditional methods",
      "Create personalized videos at scale",
      "Automatic subtitles and translations",
      "Platform-optimized formats",
      "Consistent quality across all content",
    ],
    features: [
      {
        title: "AI Script Writing",
        description: "Generate compelling video scripts optimized for engagement.",
      },
      {
        title: "Automated Editing",
        description: "AI handles cuts, transitions, and pacing for maximum impact.",
      },
      {
        title: "Voice Synthesis",
        description: "Natural-sounding AI voiceovers in multiple languages.",
      },
      {
        title: "Dynamic Personalization",
        description: "Create thousands of personalized video variants.",
      },
    ],
    process: [
      { step: "01", title: "Brief", description: "Share your video goals and brand guidelines." },
      { step: "02", title: "Script & Storyboard", description: "AI generates script options for approval." },
      { step: "03", title: "Production", description: "Automated video assembly and editing." },
      { step: "04", title: "Delivery", description: "Multi-format export ready for all platforms." },
    ],
  },
  "content-creation": {
    name: "Real Content Creation",
    icon: IconCamera,
    tagline: "Authentic content that connects",
    price: "RM 1,288",
    priceUnit: "/session",
    description:
      "Professional photography and videography services that capture your brand&apos;s authentic story. From product shoots to lifestyle content, we create visuals that resonate with your audience.",
    benefits: [
      "Professional on-location shoots",
      "Studio production facilities",
      "Expert post-production editing",
      "Content optimized for all platforms",
      "Consistent visual brand identity",
    ],
    features: [
      {
        title: "Product Photography",
        description: "High-quality product shots that drive conversions.",
      },
      {
        title: "Lifestyle Content",
        description: "Authentic imagery showing your products in action.",
      },
      {
        title: "Video Production",
        description: "Professional video content from concept to delivery.",
      },
      {
        title: "Content Calendar",
        description: "Planned shooting schedules for consistent content flow.",
      },
    ],
    process: [
      { step: "01", title: "Creative Brief", description: "Define your content needs and brand vision." },
      { step: "02", title: "Pre-Production", description: "Planning, styling, and location scouting." },
      { step: "03", title: "Production", description: "Professional shoot with expert crew." },
      { step: "04", title: "Post-Production", description: "Editing, retouching, and final delivery." },
    ],
  },
  "social-media-management": {
    name: "Social Media Management",
    icon: IconBrandFacebook,
    tagline: "Full-service social media excellence",
    price: "RM 888",
    priceUnit: "/mo",
    description:
      "Comprehensive social media management across all major platforms. We handle everything from content strategy to community management, ensuring your brand stays relevant and engaged.",
    platforms: [
      { name: "Facebook", icon: IconBrandFacebook },
      { name: "Instagram", icon: IconBrandInstagram },
      { name: "LinkedIn", icon: IconBrandLinkedin },
      { name: "TikTok", icon: IconBrandTiktok },
      { name: "YouTube", icon: IconBrandYoutube },
      { name: "X (Twitter)", icon: IconBrandX },
    ],
    benefits: [
      "Consistent posting across all platforms",
      "Engaging content that builds community",
      "Real-time community management",
      "Data-driven strategy optimization",
      "Monthly performance reporting",
    ],
    features: [
      {
        title: "Content Strategy",
        description: "Platform-specific strategies aligned with your goals.",
      },
      {
        title: "Content Calendar",
        description: "Planned, consistent posting schedule.",
      },
      {
        title: "Community Management",
        description: "Active engagement with your audience.",
      },
      {
        title: "Analytics & Reporting",
        description: "Detailed insights and performance tracking.",
      },
    ],
    process: [
      { step: "01", title: "Audit", description: "Analyze current social presence and competitors." },
      { step: "02", title: "Strategy", description: "Develop platform-specific content strategy." },
      { step: "03", title: "Execution", description: "Create and publish engaging content." },
      { step: "04", title: "Optimize", description: "Continuous improvement based on data." },
    ],
  },
  "influencer-marketing": {
    name: "Influencer Marketing",
    icon: IconUsers,
    tagline: "Amplify your reach through authentic voices",
    price: "RM 799",
    priceUnit: "/mo",
    description:
      "Connect with the right influencers to authentically promote your brand. We handle everything from influencer discovery to campaign management and ROI tracking.",
    benefits: [
      "Access to vetted influencer network",
      "Authentic brand partnerships",
      "Full campaign management",
      "Performance tracking and ROI measurement",
      "Content rights and usage management",
    ],
    features: [
      {
        title: "Influencer Matching",
        description: "AI-powered matching based on audience fit and engagement.",
      },
      {
        title: "Campaign Management",
        description: "End-to-end campaign coordination and execution.",
      },
      {
        title: "Content Review",
        description: "Quality control for all influencer content.",
      },
      {
        title: "ROI Tracking",
        description: "Detailed performance metrics and attribution.",
      },
    ],
    process: [
      { step: "01", title: "Strategy", description: "Define campaign goals and target audience." },
      { step: "02", title: "Selection", description: "Identify and vet the perfect influencers." },
      { step: "03", title: "Campaign", description: "Coordinate and launch influencer content." },
      { step: "04", title: "Report", description: "Analyze performance and optimize." },
    ],
  },
  advertising: {
    name: "Digital Advertising",
    icon: IconAd2,
    tagline: "Data-driven campaigns that convert",
    price: "RM 588",
    priceUnit: "/mo",
    description:
      "Expert paid advertising management across Meta, Google, TikTok, and more. We combine AI-powered optimization with human expertise to maximize your ROAS.",
    benefits: [
      "Average 3x ROAS across campaigns",
      "Real-time budget optimization",
      "Advanced audience targeting",
      "Creative testing at scale",
      "Transparent reporting",
    ],
    features: [
      {
        title: "Multi-Platform Campaigns",
        description: "Meta, Google, TikTok, LinkedIn, and more.",
      },
      {
        title: "AI Optimization",
        description: "Automated bidding and budget allocation.",
      },
      {
        title: "Audience Building",
        description: "Custom and lookalike audience development.",
      },
      {
        title: "Conversion Tracking",
        description: "Full-funnel attribution and tracking.",
      },
    ],
    process: [
      { step: "01", title: "Research", description: "Market analysis and competitor research." },
      { step: "02", title: "Setup", description: "Campaign structure and tracking implementation." },
      { step: "03", title: "Launch", description: "Campaign launch with monitoring." },
      { step: "04", title: "Scale", description: "Optimize and scale winning campaigns." },
    ],
  },
  "analytics-reporting": {
    name: "Analytics & Reporting",
    icon: IconChartBar,
    tagline: "Insights that drive decisions",
    price: "RM 488",
    priceUnit: "",
    description:
      "Comprehensive analytics and reporting solutions that give you complete visibility into your marketing performance. Make data-driven decisions with confidence.",
    benefits: [
      "Custom dashboard for your KPIs",
      "Automated weekly/monthly reports",
      "Attribution modeling",
      "Competitor benchmarking",
      "Actionable recommendations",
    ],
    features: [
      {
        title: "Custom Dashboards",
        description: "Real-time visibility into all your metrics.",
      },
      {
        title: "Automated Reporting",
        description: "Scheduled reports delivered to your inbox.",
      },
      {
        title: "Attribution Modeling",
        description: "Understand the true impact of each channel.",
      },
      {
        title: "Insights & Recommendations",
        description: "Expert analysis with actionable next steps.",
      },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Understand your goals and KPIs." },
      { step: "02", title: "Setup", description: "Configure tracking and dashboards." },
      { step: "03", title: "Monitor", description: "Ongoing data collection and analysis." },
      { step: "04", title: "Report", description: "Regular insights and recommendations." },
    ],
  },
  "website-design": {
    name: "Website Design & Development",
    icon: IconWorld,
    tagline: "Beautiful designs that convert, built to scale",
    price: "RM 2,676",
    priceUnit: "/package",
    description:
      "Stunning, conversion-focused website design and custom development in one package. We combine aesthetics with strategic UX and modern technology to deliver fast, secure, and scalable websites.",
    benefits: [
      "Mobile-first responsive design",
      "Modern tech stack (React, Next.js)",
      "Conversion rate optimization",
      "Brand-aligned visual identity",
      "SEO-optimized structure",
      "Easy content management",
    ],
    features: [
      {
        title: "UI/UX Design",
        description: "Research-backed designs that users love.",
      },
      {
        title: "Custom Development",
        description: "Tailored solutions built with modern technologies.",
      },
      {
        title: "Responsive Design",
        description: "Flawless experience on all devices.",
      },
      {
        title: "E-commerce & CMS",
        description: "Full online store and easy content management.",
      },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Understand your brand, goals, and requirements." },
      { step: "02", title: "Design", description: "Wireframes, user flows, and high-fidelity visuals." },
      { step: "03", title: "Development", description: "Build, test, and optimize for performance." },
      { step: "04", title: "Launch", description: "Deployment and ongoing support." },
    ],
  },
  "website-hosting": {
    name: "Website Hosting",
    icon: IconServer,
    tagline: "Fast, secure, reliable hosting",
    price: "RM 288",
    priceUnit: "/mo",
    description:
      "Enterprise-grade hosting solutions that keep your website fast, secure, and always online. We handle all the technical details so you can focus on your business.",
    benefits: [
      "99.9% uptime guarantee",
      "Free SSL certificates",
      "Daily automated backups",
      "CDN for global speed",
      "24/7 monitoring",
    ],
    features: [
      {
        title: "Managed Hosting",
        description: "We handle all server management.",
      },
      {
        title: "Security",
        description: "SSL, firewalls, and DDoS protection.",
      },
      {
        title: "Performance",
        description: "Optimized servers and global CDN.",
      },
      {
        title: "Backups",
        description: "Automated daily backups with easy restore.",
      },
    ],
    process: [
      { step: "01", title: "Assessment", description: "Evaluate your hosting needs." },
      { step: "02", title: "Migration", description: "Seamless migration to our servers." },
      { step: "03", title: "Optimization", description: "Performance and security setup." },
      { step: "04", title: "Monitor", description: "Ongoing monitoring and support." },
    ],
  },
  "crm-integration": {
    name: "CRM Integration",
    icon: IconDatabase,
    tagline: "Unified customer data management",
    price: "RM 888",
    priceUnit: "/mo",
    description:
      "Seamless CRM setup and integration that gives you a 360-degree view of your customers. Connect all your tools and automate your sales pipeline.",
    benefits: [
      "Centralized customer data",
      "Automated lead scoring",
      "Pipeline visualization",
      "Integration with all your tools",
      "Custom automation rules",
    ],
    features: [
      {
        title: "CRM Setup",
        description: "HubSpot, Salesforce, or custom solutions.",
      },
      {
        title: "Data Migration",
        description: "Clean migration of existing data.",
      },
      {
        title: "Integrations",
        description: "Connect your marketing and sales tools.",
      },
      {
        title: "Automation",
        description: "Automated workflows and triggers.",
      },
    ],
    process: [
      { step: "01", title: "Audit", description: "Assess current systems and needs." },
      { step: "02", title: "Design", description: "Plan CRM structure and workflows." },
      { step: "03", title: "Implement", description: "Setup and data migration." },
      { step: "04", title: "Train", description: "Team training and documentation." },
    ],
  },
  "ai-chatbot": {
    name: "AI Chatbot & Voice",
    icon: IconRobot,
    tagline: "24/7 AI-powered customer engagement",
    price: "RM 888",
    priceUnit: "/mo",
    description:
      "Deploy intelligent AI chatbots and voice agents that handle customer inquiries, qualify leads, and book appointments around the clock. Never miss a lead again.",
    benefits: [
      "Instant response to all inquiries",
      "24/7 availability",
      "Qualify leads automatically",
      "Book appointments directly",
      "Seamless human handoff",
    ],
    features: [
      {
        title: "WhatsApp Integration",
        description: "AI chatbot on WhatsApp Business.",
      },
      {
        title: "Website Chat",
        description: "Embedded chat widget for your site.",
      },
      {
        title: "Voice AI",
        description: "AI-powered phone agents.",
      },
      {
        title: "Lead Qualification",
        description: "Automated qualification based on your criteria.",
      },
    ],
    process: [
      { step: "01", title: "Design", description: "Define conversation flows and responses." },
      { step: "02", title: "Train", description: "Train AI on your products and FAQs." },
      { step: "03", title: "Deploy", description: "Launch across all channels." },
      { step: "04", title: "Optimize", description: "Continuous learning and improvement." },
    ],
  },
  "seo-ppc": {
    name: "SEO & PPC",
    icon: IconSeo,
    tagline: "Get found. Get clicks. Get customers.",
    price: "Contact us",
    priceUnit: "",
    description:
      "Drive sustainable organic traffic with SEO and capture high-intent buyers with PPC advertising. We combine search engine optimization with pay-per-click campaigns to maximize your visibility and ROI across Google and other search engines.",
    benefits: [
      "Rank higher on Google for keywords that matter",
      "Immediate traffic through targeted PPC campaigns",
      "Lower cost-per-acquisition over time",
      "Dominate both paid and organic search results",
      "Data-driven strategy with transparent reporting",
    ],
    features: [
      {
        title: "Technical SEO Audit",
        description: "Full site audit covering speed, indexing, structure, and mobile-friendliness to fix what's holding your rankings back.",
      },
      {
        title: "Keyword Research & Strategy",
        description: "Identify high-value keywords your customers are searching for and build a content plan to rank for them.",
      },
      {
        title: "On-Page & Off-Page SEO",
        description: "Optimize your pages, meta tags, content, and backlink profile to build authority and climb rankings.",
      },
      {
        title: "Google Ads Management",
        description: "Search, display, and shopping campaigns managed end-to-end — from ad copy to bid strategy to conversion tracking.",
      },
      {
        title: "Landing Page Optimization",
        description: "Build and optimize high-converting landing pages that turn ad clicks into leads and sales.",
      },
      {
        title: "Monthly Reporting & Insights",
        description: "Clear reports showing keyword rankings, traffic growth, ad performance, and ROI so you always know what's working.",
      },
    ],
    process: [
      { step: "01", title: "Audit & Research", description: "Analyze your current search presence, competitors, and target keywords." },
      { step: "02", title: "Strategy & Setup", description: "Build your SEO roadmap and launch PPC campaigns with proper tracking." },
      { step: "03", title: "Execute & Optimize", description: "Implement on-page changes, publish content, and refine ad performance." },
      { step: "04", title: "Scale & Report", description: "Double down on what works, scale winning campaigns, and report results monthly." },
    ],
  },
  automation: {
    name: "Workflow Automation",
    icon: IconSettings,
    tagline: "Automate everything, scale faster",
    price: "Contact us",
    priceUnit: "",
    description:
      "Comprehensive workflow automation that eliminates repetitive tasks and streamlines your operations. From lead routing to follow-ups to booking systems.",
    benefits: [
      "Eliminate manual data entry",
      "Instant lead response",
      "Automated follow-up sequences",
      "Smart lead distribution",
      "Integrated booking system",
    ],
    features: [
      {
        title: "Lead Routing",
        description: "Automatic distribution to the right team member.",
      },
      {
        title: "Follow-up Automation",
        description: "Timely, personalized follow-up sequences.",
      },
      {
        title: "Calendar Booking",
        description: "Self-service scheduling for prospects.",
      },
      {
        title: "Automated Quotations",
        description: "Generate and send quotes automatically.",
      },
    ],
    process: [
      { step: "01", title: "Map", description: "Document current processes and pain points." },
      { step: "02", title: "Design", description: "Design automated workflows." },
      { step: "03", title: "Build", description: "Implement automation systems." },
      { step: "04", title: "Refine", description: "Monitor and optimize performance." },
    ],
  },
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const openLeadForm = () => setIsLeadFormOpen(true);
  const closeLeadForm = () => setIsLeadFormOpen(false);

  const service = servicesData[slug];

  if (!service) {
    return (
      <main className="min-h-screen bg-black">
        <Navbar onOpenLeadForm={openLeadForm} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <p className="text-white/60 mb-8">
              The service you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Services
            </Link>
          </div>
        </div>
        <Footer />
        <LeadFormModal isOpen={isLeadFormOpen} onClose={closeLeadForm} />
      </main>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <main className="min-h-screen bg-black">
      <Navbar onOpenLeadForm={openLeadForm} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 radial-glow opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            ← Back to Services
          </Link>

          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 mb-6">
              <ServiceIcon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-blue-400 mb-4">{service.tagline}</p>
            {service.price !== "Contact us" ? (
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-semibold text-cyan-300 backdrop-blur-sm mb-6">
                {service.price}<span className="text-cyan-300/60 font-normal">{service.priceUnit}</span>
              </span>
            ) : (
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
                Custom pricing — contact us
              </span>
            )}
            <p className="text-lg text-white/60 mb-8">{service.description}</p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Get Started
              <IconArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Platforms (if applicable) */}
      {service.platforms && (
        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Platforms We Manage
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {service.platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/5"
                  >
                    <platform.icon className="h-6 w-6 text-blue-400" />
                    <span className="text-white">{platform.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Benefits of {service.name}
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                  <IconCheck className="h-4 w-4" />
                </div>
                <span className="text-white/80">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20">
        <div className="absolute inset-0 radial-glow opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Features
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              What&apos;s Included
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-300 hover:border-blue-500/50"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 backdrop-blur-sm p-8 sm:p-10 text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
                Pricing
              </span>
              {service.price !== "Contact us" ? (
                <>
                  <div className="mb-4">
                    <span className="text-4xl sm:text-5xl font-bold gradient-text-cyan">
                      {service.price}
                    </span>
                    <span className="text-white/50 text-lg">{service.priceUnit}</span>
                  </div>
                  <p className="text-white/60 mb-6">
                    Individual service pricing. Save more with our bundled packages.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4">Custom Pricing</h3>
                  <p className="text-white/60 mb-6">
                    This service is tailored to your needs. Contact us for a custom quote.
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openLeadForm}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
                >
                  {service.price !== "Contact us" ? "Get Started" : "Contact Us"}
                  <IconArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  View Bundled Packages
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/60 backdrop-blur-sm mb-6">
              Our Process
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              How It Works
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-xl border border-white/10 bg-white/5"
              >
                <span className="text-4xl font-bold gradient-text-cyan opacity-50">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Book a free consultation and let&apos;s discuss how {service.name} can help
              grow your business.
            </p>
            <button
              onClick={openLeadForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] hover:-translate-y-1"
            >
              Book Free Consultation
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
