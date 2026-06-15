"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowRight, ArrowUp, ArrowDown, Sparkles, Activity, User, Star, Check, ChevronRight, Layout, Bell, Shield, Zap, Globe } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_COLORS } from "@/lib/data";

// ─── Inline Mock Data ────────────────────────────────────────────────────────

const kpiCards = [
  { label: "Monthly Revenue", value: "$124,820", change: 18.4, prefix: "$", icon: Star, color: "indigo" },
  { label: "Active Users", value: "38,291", change: 12.1, icon: User, color: "violet" },
  { label: "Churn Rate", value: "2.4%", change: -0.8, icon: Activity, color: "cyan" },
  { label: "Avg. Session", value: "6m 42s", change: 5.3, icon: Layout, color: "emerald" },
];

const revenueData = [
  { name: "Jan", value: 62000, secondary: 41000 },
  { name: "Feb", value: 74000, secondary: 53000 },
  { name: "Mar", value: 68000, secondary: 49000 },
  { name: "Apr", value: 91000, secondary: 67000 },
  { name: "May", value: 87000, secondary: 72000 },
  { name: "Jun", value: 103000, secondary: 81000 },
  { name: "Jul", value: 98000, secondary: 76000 },
  { name: "Aug", value: 115000, secondary: 89000 },
  { name: "Sep", value: 109000, secondary: 94000 },
  { name: "Oct", value: 124820, secondary: 102000 },
];

const userGrowthData = [
  { name: "Jan", value: 12400 },
  { name: "Feb", value: 15800 },
  { name: "Mar", value: 18200 },
  { name: "Apr", value: 22600 },
  { name: "May", value: 26900 },
  { name: "Jun", value: 29400 },
  { name: "Jul", value: 31800 },
  { name: "Aug", value: 34200 },
  { name: "Sep", value: 36700 },
  { name: "Oct", value: 38291 },
];

const planDistribution = [
  { name: "Enterprise", value: 38 },
  { name: "Pro", value: 44 },
  { name: "Starter", value: 18 },
];

const recentTransactions = [
  { id: "txn_001", customer: "Acme Corp", email: "billing@acme.com", amount: 2400, status: "paid", plan: "Enterprise", date: "Oct 28" },
  { id: "txn_002", customer: "Bright Labs", email: "admin@brightlabs.io", amount: 890, status: "paid", plan: "Pro", date: "Oct 27" },
  { id: "txn_003", customer: "Nova Systems", email: "finance@novasys.com", amount: 2400, status: "pending", plan: "Enterprise", date: "Oct 27" },
  { id: "txn_004", customer: "Pixel Studio", email: "hello@pixelstudio.co", amount: 290, status: "paid", plan: "Starter", date: "Oct 26" },
  { id: "txn_005", customer: "Drift AI", email: "ops@driftai.com", amount: 890, status: "failed", plan: "Pro", date: "Oct 26" },
];

const features = [
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description: "Watch revenue, signups, and engagement metrics update live — no page refresh needed. React instantly to what's happening right now.",
    color: "indigo",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Set custom thresholds for churn, MRR drops, or traffic spikes. Get notified via Slack, email, or in-app before problems escalate.",
    color: "violet",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. Role-based access, SSO, audit logs, and end-to-end encryption keep your business data safe.",
    color: "cyan",
  },
  {
    icon: Zap,
    title: "Instant Integrations",
    description: "Connect Stripe, Salesforce, HubSpot, and 80+ tools in minutes. Your data flows in automatically — no engineering required.",
    color: "emerald",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "99.99% uptime SLA backed by multi-region redundancy. Your dashboard loads in under 200ms from anywhere on the planet.",
    color: "amber",
  },
  {
    icon: Layout,
    title: "Custom Dashboards",
    description: "Drag-and-drop widgets, shareable report links, and white-label exports. Build the exact view your team or clients need.",
    color: "rose",
  },
];

const testimonials = [
  {
    quote: "Pulse Analytics replaced four separate tools for us. Our team finally has one source of truth for revenue and growth.",
    name: "Sarah Chen",
    role: "VP of Growth",
    company: "Meridian SaaS",
    avatar: "/images/sarah-chen-vp-growth.jpg",
    stars: 5,
  },
  {
    quote: "The real-time churn alerts alone saved us $40k in ARR last quarter. The ROI was immediate and undeniable.",
    name: "Marcus Webb",
    role: "CEO & Co-founder",
    company: "Stackline",
    avatar: "/images/marcus-webb-ceo-founder.jpg",
    stars: 5,
  },
  {
    quote: "I've used every analytics platform out there. Pulse is the first one my entire team actually opens every morning.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Orbit Cloud",
    avatar: "/images/priya-nair-head-product.jpg",
    stars: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: ["Up to 5,000 tracked users", "10 custom dashboards", "7-day data history", "Email alerts", "Stripe integration"],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$89",
    period: "/mo",
    description: "For growing teams that need deeper insight and automation.",
    features: ["Up to 50,000 tracked users", "Unlimited dashboards", "90-day data history", "Slack + email alerts", "80+ integrations", "Team collaboration"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$249",
    period: "/mo",
    description: "Full power for large teams with compliance requirements.",
    features: ["Unlimited users", "Unlimited dashboards", "Unlimited history", "Custom alert rules", "SSO & SAML", "SOC 2 compliance", "Dedicated CSM"],
    cta: "Contact sales",
    highlighted: false,
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", glow: "shadow-indigo-500/20" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", glow: "shadow-violet-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", glow: "shadow-cyan-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", glow: "shadow-amber-500/20" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", glow: "shadow-rose-500/20" },
};

const statusStyles: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  failed: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4"];

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name?: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {typeof entry.value === 'number' && entry.value > 1000
            ? `$${entry.value.toLocaleString()}`
            : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : {
          variants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-80px" },
        };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">{APP_NAME}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            {["Features", "Dashboard", "Pricing", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...motionProps(fadeIn as Variants)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {APP_TAGLINE}
          </motion.div>
          <motion.h1
            {...motionProps(fadeInUp as Variants)}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
          >
            Analytics that
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
              {" "}accelerate growth
            </span>
          </motion.h1>
          <motion.p
            {...motionProps(fadeInUp as Variants)}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {APP_DESCRIPTION}
          </motion.p>
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition-colors"
            >
              See live demo <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── KPI CARDS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {kpiCards.map((card, i) => {
              const colors = colorMap[card.color];
              const Icon = card.icon;
              const isNeg = card.change < 0;
              return (
                <motion.div
                  key={i}
                  {...motionProps(fadeInUp as Variants)}
                  className={`relative rounded-2xl border ${colors.border} bg-slate-900/60 backdrop-blur-sm p-6 hover:shadow-lg ${colors.glow} transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isNeg ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {isNeg ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
                      {Math.abs(card.change)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                  <p className="text-sm text-slate-400">{card.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section id="dashboard" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your metrics, beautifully visualized</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Every chart updates in real-time. Spot trends, track goals, and share insights with your team instantly.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <motion.div
              {...motionProps(slideInLeft as Variants)}
              className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white">Revenue Overview</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Monthly recurring revenue vs. new revenue</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1.5 rounded-lg">Last 10 months</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
                  <Area type="monotone" dataKey="secondary" stroke="#8b5cf6" strokeWidth={2} fill="url(#secGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Plan Distribution */}
            <motion.div
              {...motionProps(slideInRight as Variants)}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-white">Plan Distribution</h3>
                <p className="text-sm text-slate-400 mt-0.5">Active subscriptions by tier</p>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {planDistribution.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {planDistribution.map((plan, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                      <span className="text-slate-300">{plan.name}</span>
                    </div>
                    <span className="text-slate-400 font-medium">{plan.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* User Growth + Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
            {/* User Growth */}
            <motion.div
              {...motionProps(fadeInUp as Variants)}
              className="lg:col-span-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
            >
              <div className="mb-6">
                <h3 className="font-semibold text-white">User Growth</h3>
                <p className="text-sm text-slate-400 mt-0.5">Total active users over time</p>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Transactions */}
            <motion.div
              {...motionProps(fadeInUp as Variants)}
              className="lg:col-span-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white">Recent Transactions</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Latest billing activity</p>
                </div>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View all</button>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                        {txn.customer[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{txn.customer}</p>
                        <p className="text-xs text-slate-500">{txn.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[txn.status]}`}>
                        {txn.status}
                      </span>
                      <span className="text-sm font-semibold text-white">${txn.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything your team needs</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">From real-time data to enterprise security, Pulse gives you the full stack of analytics tools in one platform.</p>
          </motion.div>
          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => {
              const colors = colorMap[feature.color];
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  {...motionProps(fadeInUp as Variants)}
                  className={`rounded-2xl border ${colors.border} bg-slate-900/60 backdrop-blur-sm p-6 hover:shadow-lg ${colors.glow} transition-shadow`}
                >
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by fast-growing teams</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">See why hundreds of SaaS companies use Pulse to drive their growth decisions.</p>
          </motion.div>
          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...motionProps(scaleIn as Variants)}
                className="rounded-2xl border border-slate-800/60 bg-slate-900/60 backdrop-blur-sm p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp as Variants)}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">No hidden fees. No per-seat nonsense. Pick the plan that fits your stage.</p>
          </motion.div>
          <motion.div
            {...motionProps(staggerContainer as Variants)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
          >
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                {...motionProps(fadeInUp as Variants)}
                className={`rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-indigo-500/50 bg-indigo-950/40 shadow-xl shadow-indigo-500/10"
                    : "border-slate-800/60 bg-slate-900/60"
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
                    <Sparkles className="w-3 h-3" /> Most popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.highlighted ? "/signup" : "/contact"}
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...motionProps(scaleIn as Variants)}
            className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-violet-950/60 p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start making data-driven decisions</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">Join thousands of SaaS teams using Pulse to track, understand, and accelerate growth.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Get started free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition-colors"
              >
                Watch demo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800/60 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">{APP_NAME}</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
