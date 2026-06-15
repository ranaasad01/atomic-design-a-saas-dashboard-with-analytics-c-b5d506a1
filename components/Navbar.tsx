"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, APP_NAME } from "@/lib/data";
import { Bell, User, Menu, X, Sparkles, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const notifications = [
    { id: 1, text: "Revenue milestone: $50k MRR reached 🎉", time: "2m ago" },
    { id: 2, text: "3 new Enterprise sign-ups today", time: "18m ago" },
    { id: 3, text: "Churn alert: 2 accounts cancelled", time: "1h ago" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20"
            : "bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                {APP_NAME}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-all"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
                </motion.button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-11 w-80 bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-100">Notifications</span>
                        <span className="text-xs text-indigo-400 font-medium">3 new</span>
                      </div>
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-4 py-3 hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0"
                        >
                          <p className="text-sm text-slate-200 leading-snug">{n.text}</p>
                          <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Avatar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 transition-all"
              >
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-300">Alex Kim</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 overflow-hidden md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}