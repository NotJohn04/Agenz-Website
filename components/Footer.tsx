"use client";

import React from "react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";

const footerLinks = {
  services: [
    { name: "AI Creatives", href: "/services/ai-creatives" },
    { name: "AI Videos", href: "/services/ai-videos" },
    { name: "Social Media Management", href: "/services/social-media-management" },
    { name: "Business Automation", href: "/services/automation" },
    { name: "Web Development", href: "/services/website-development" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: IconBrandFacebook, href: "https://facebook.com/agenz.my" },
  { name: "Instagram", icon: IconBrandInstagram, href: "https://instagram.com/agenz.my" },
  { name: "LinkedIn", icon: IconBrandLinkedin, href: "https://linkedin.com/company/agenz-my" },
  { name: "TikTok", icon: IconBrandTiktok, href: "https://tiktok.com/@agenz.my" },
  { name: "YouTube", icon: IconBrandYoutube, href: "https://youtube.com/@agenz.my" },
  { name: "X", icon: IconBrandX, href: "https://x.com/agenz_my" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black pt-20 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 radial-glow-bottom opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo.png"
                  alt="Agenz.my"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">
                Agenz<span className="text-blue-500">.my</span>
              </span>
            </a>
            <p className="text-white/60 max-w-sm mb-6">
              Revolutionizing customer acquisition with AI. We build autonomous growth
              systems that acquire customers while you sleep.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@agenz.my"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <IconMail className="h-5 w-5 text-blue-400" />
                <span>hello@agenz.my</span>
              </a>
              <a
                href="tel:+60182915479"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <IconPhone className="h-5 w-5 text-blue-400" />
                <span>+60 18-291 5479</span>
              </a>
              <div className="flex items-start gap-3 text-white/60">
                <IconMapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Kuala Lumpur, Malaysia</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Text Hover Effect */}
        <div className="flex justify-center mb-8 h-24 sm:h-32">
          <TextHoverEffect text="AGENZ" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Agenz MY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
