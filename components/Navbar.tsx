"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconMenu2,
  IconX,
  IconSparkles,
  IconVideo,
  IconCamera,
  IconBrandFacebook,
  IconUsers,
  IconAd2,
  IconChartBar,
  IconWorld,
  IconCode,
  IconServer,
  IconDatabase,
  IconRobot,
  IconFileText,
  IconShare,
  IconCalendar,
  IconSettings,
  IconChevronDown,
} from "@tabler/icons-react";
import Image from "next/image";

// Service categories data
const serviceCategories = [
  {
    title: "AI Creative Solutions",
    items: [
      { name: "AI Creatives", href: "/services/ai-creatives", icon: IconSparkles },
      { name: "AI Video Production", href: "/services/ai-videos", icon: IconVideo },
      { name: "Real Content Creation", href: "/services/content-creation", icon: IconCamera },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      { name: "Social Media Management", href: "/services/social-media-management", icon: IconBrandFacebook },
      { name: "Influencer Marketing", href: "/services/influencer-marketing", icon: IconUsers },
      { name: "Advertisement", href: "/services/advertising", icon: IconAd2 },
      { name: "Analytics & Reporting", href: "/services/analytics-reporting", icon: IconChartBar },
    ],
  },
  {
    title: "Web Solutions",
    items: [
      { name: "Website Design", href: "/services/website-design", icon: IconWorld },
      { name: "Website Development", href: "/services/website-development", icon: IconCode },
      { name: "Website Hosting", href: "/services/website-hosting", icon: IconServer },
    ],
  },
  {
    title: "Business Automation",
    items: [
      { name: "CRM Integration", href: "/services/crm-integration", icon: IconDatabase },
      { name: "AI Chatbot & Voice", href: "/services/ai-chatbot", icon: IconRobot },
      { name: "Automated Quotations", href: "/services/automation", icon: IconFileText },
      { name: "Lead Distribution", href: "/services/automation", icon: IconShare },
      { name: "Calendar Booking", href: "/services/automation", icon: IconCalendar },
      { name: "Workflow Automation", href: "/services/automation", icon: IconSettings },
    ],
  },
];

const navItems = [
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "About Us", href: "/about", hasDropdown: false },
  { name: "Case Studies", href: "/case-studies", hasDropdown: false },
  { name: "Blog", href: "/blog", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

interface NavbarProps {
  onOpenLeadForm: () => void;
}

export function Navbar({ onOpenLeadForm }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 relative z-50">
              <div className="relative h-8 w-8 lg:h-10 lg:w-10">
                <Image
                  src="/images/logo1.png"
                  alt="Agenz.my"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-bold text-white lg:text-xl">
                Agenz<span className="text-blue-500">.my</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={item.hasDropdown ? handleServicesMouseEnter : undefined}
                  onMouseLeave={item.hasDropdown ? handleServicesMouseLeave : undefined}
                >
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white",
                      item.hasDropdown && isServicesOpen && "text-white"
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <IconChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isServicesOpen && "rotate-180"
                        )}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                onClick={onOpenLeadForm}
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <IconX className="h-6 w-6 text-white" />
              ) : (
                <IconMenu2 className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full hidden lg:block"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="glass-card p-6">
                  <div className="grid grid-cols-4 gap-8">
                    {serviceCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="mb-4 text-sm font-semibold text-white">
                          {category.title}
                        </h3>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className="group flex items-center gap-3 rounded-lg p-2 text-sm text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white"
                              >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                                  <item.icon className="h-4 w-4" />
                                </div>
                                <span>{item.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                    <p className="text-sm text-white/50">
                      Not sure which service you need?
                    </p>
                    <a
                      href="/services"
                      className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View all services →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
            >
              <div className="px-6 pt-24 pb-6">
                {/* Mobile Nav Items */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                            className="flex w-full items-center justify-between py-3 text-lg font-medium text-white/80 hover:text-white transition-colors"
                          >
                            {item.name}
                            <IconChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform duration-200",
                                isMobileServicesOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {isMobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="py-2 pl-4 space-y-4">
                                  {serviceCategories.map((category) => (
                                    <div key={category.title}>
                                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                        {category.title}
                                      </h4>
                                      <ul className="space-y-1">
                                        {category.items.map((service) => (
                                          <li key={service.name}>
                                            <a
                                              href={service.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="flex items-center gap-2 py-2 text-sm text-white/60 hover:text-white transition-colors"
                                            >
                                              <service.icon className="h-4 w-4 text-blue-400" />
                                              {service.name}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-3 text-lg font-medium text-white/80 hover:text-white transition-colors"
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenLeadForm();
                    }}
                    className="w-full py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                  >
                    Get Started
                  </button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                  <p className="text-sm text-white/50">Get in touch</p>
                  <a
                    href="mailto:hello@agenz.my"
                    className="block text-sm text-white/70 hover:text-white transition-colors"
                  >
                    hello@agenz.my
                  </a>
                  <a
                    href="tel:+60182915479"
                    className="block text-sm text-white/70 hover:text-white transition-colors"
                  >
                    +60 18-291 5479
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
