"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { Sparkles, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Product",
    links: navLinks.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">{APP_NAME}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {APP_TAGLINE} Track revenue, users, and growth metrics from a single, beautifully designed workspace.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-600">All systems operational</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}