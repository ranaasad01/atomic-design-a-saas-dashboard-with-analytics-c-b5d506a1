"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
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
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Clock, Globe, MousePointerClick, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const weeklySignups = [
  { name: "Week 1", signups: 142, returning: 58 },
  { name: "Week 2", signups: 189, returning: 74 },
  { name: "Week 3", signups: 167, returning: 91 },
  { name: "Week 4", signups: 234, returning: 103 },
  { name: "Week 5", signups: 198, returning: 88 },
  { name: "Week 6", signups: 276, returning: 121 },
  { name: "Week 7", signups: 312, returning: 145 },
  { name: "Week 8", signups: 289, returning: 132 },
];

const monthlySignups = [
  { name: "Jan", signups: 520, returning: 210 },
  { name: "Feb", signups: 634, returning: 278 },
  { name: "Mar", signups: 712, returning: 315 },
  { name: "Apr", signups: 689, returning: 301 },
  { name: "May", signups: 845, returning: 389 },
  { name: "Jun", signups: 923, returning: 421 },
  { name: "Jul", signups: 1042, returning: 487 },
  { name: "Aug", signups: 978, returning: 453 },
  { name: "Sep", signups: 1134, returning: 521 },
  { name: "Oct", signups: 1089, returning: 498 },
  { name: "Nov", signups: 1267, returning: 589 },
  { name: "Dec", signups: 1389, returning: 641 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: BRAND_COLORS.primary },
  { name: "Paid Ads", value: 24, color: BRAND_COLORS.secondary },
  { name: "Referral", value: 19, color: "#06b6d4" },
  { name: "Direct", value: 12, color: BRAND_COLORS.success },
  { name: "Social", value: 7, color: BRAND_COLORS.warning },
];

const sessionDuration = [
  { name: "Mon", avg: 3.2, p75: 5.1 },
  { name: "Tue", avg: 4.1, p75: 6.3 },
  { name: "Wed", avg: 3.8, p75: 5.9 },
  { name: "Thu", avg: 5.2, p75: 7.8 },
  { name: "Fri", avg: 4.7, p75: 7.1 },
  { name: "Sat", avg: 6.1, p75: 9.2 },
  { name: "Sun", avg: 5.8, p75: 8.7 },
];

const sparklineData = [
  [12, 18, 14, 22, 19, 28, 31],
  [45, 52, 48, 61, 58, 67, 72],
  [3.1, 3.4, 3.2, 3.8, 4.1, 3.9, 4.4],
  [88, 84, 91, 87, 93, 89, 95],
];

const topMetrics = [
  {
    label: "Total Visitors",
    value: "84,291",
    change: 12.4,
    icon: Globe,
    color: "indigo",
    sparkIndex: 0,
  },
  {
    label: "New Sign-ups",
    value: "9,204",
    change: 8.7,
    icon: Users,
    color: "violet",
    sparkIndex: 1,
  },
  {
    label: "Avg. Session",
    value: "4.4 min",
    change: 5.2,
    icon: Clock,
    color: "cyan",
    sparkIndex: 2,
  },
  {
    label: "Conversion Rate",
    value: "10.9%",
    change: -1.3,
    icon: MousePointerClick,
    color: "emerald",
    sparkIndex: 3,
  },
];

const colorMap: Record<string, string> = {
  indigo: "from-indigo-500 to-indigo-600",
  violet: "from-violet-500 to-violet-600",
  cyan: "from-cyan-500 to-cyan-600",
  emerald: "from-emerald-500 to-emerald-600",
};

const bgMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/20",
  violet: "bg-violet-500/10 border-violet-500/20",
  cyan: "bg-cyan-500/10 border-cyan-500/20",
  emerald: "bg-emerald-500/10 border-emerald-500/20",
};

const sparkColorMap: Record<string, string> = {
  indigo: "#6366f1",
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  emerald: "#10b981",
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {(payload ?? []).map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {(payload ?? []).map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toFixed(1)} min</span>
        </div>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-sm text-white font-semibold">{item?.name}</p>
      <p className="text-xs text-slate-400 mt-1">{item?.value}% of traffic</p>
    </div>
  );
};

// ─── Sparkline Component ─────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={(data ?? []).map((v, i) => ({ v, i }))}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [signupRange, setSignupRange] = useState<"weekly" | "monthly">("monthly");

  const signupData = signupRange === "weekly" ? weeklySignups : monthlySignups;

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Live Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Analytics Overview
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Deep-dive into user acquisition, traffic sources, engagement, and conversion trends across your product.
          </p>
        </motion.div>

        {/* ── Top Metrics Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {topMetrics.map((metric) => {
            const Icon = metric.icon;
            const isUp = metric.change >= 0;
            return (
              <motion.div
                key={metric.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 flex flex-col gap-3 shadow-lg shadow-black/20"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${bgMap[metric.color]}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isUp
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-red-400 bg-red-500/10"
                    }`}
                  >
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{metric.label}</p>
                </div>
                <div className="mt-1">
                  <Sparkline
                    data={sparklineData[metric.sparkIndex] ?? []}
                    color={sparkColorMap[metric.color] ?? "#6366f1"}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Signup Bar Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-black/20"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">User Sign-ups</h2>
              <p className="text-sm text-slate-500 mt-0.5">New vs. returning users over time</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/50 rounded-xl p-1">
              {(["weekly", "monthly"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSignupRange(range)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                    signupRange === range
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={signupData} barGap={4} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
              <Bar dataKey="signups" name="New Sign-ups" fill={BRAND_COLORS.primary} radius={[6, 6, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill={BRAND_COLORS.secondary} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-3 h-3 rounded-sm" style={{ background: BRAND_COLORS.primary }} />
              New Sign-ups
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-3 h-3 rounded-sm" style={{ background: BRAND_COLORS.secondary }} />
              Returning Users
            </div>
          </div>
        </motion.div>

        {/* ── Traffic + Session Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Traffic Source Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-lg shadow-black/20"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
              <p className="text-sm text-slate-500 mt-0.5">Channel breakdown for the last 30 days</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {trafficSources.map((src) => (
                <div key={src.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: src.color }} />
                  <span className="text-xs text-slate-400 truncate">{src.name}</span>
                  <span className="text-xs font-semibold text-white ml-auto">{src.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Session Duration Area */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-lg shadow-black/20"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Session Duration</h2>
              <p className="text-sm text-slate-500 mt-0.5">Average and 75th percentile (minutes) this week</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={sessionDuration}>
                <defs>
                  <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="p75Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={32}
                  tickFormatter={(v) => `${v}m`}
                />
                <Tooltip content={<CustomAreaTooltip />} />
                <Area
                  type="monotone"
                  dataKey="p75"
                  name="75th Percentile"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#p75Grad)"
                />
                <Area
                  type="monotone"
                  dataKey="avg"
                  name="Average"
                  stroke={BRAND_COLORS.primary}
                  strokeWidth={2}
                  fill="url(#avgGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-3 h-3 rounded-sm" style={{ background: BRAND_COLORS.primary }} />
                Average
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-3 h-3 rounded-sm" style={{ background: "#06b6d4" }} />
                75th Percentile
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Insight Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: TrendingUp,
              color: "emerald",
              title: "Best Performing Channel",
              value: "Organic Search",
              sub: "38% of all traffic — up 6.2% vs last month",
            },
            {
              icon: Users,
              color: "indigo",
              title: "Peak Sign-up Day",
              value: "Thursday",
              sub: "Avg. 312 new users — 24% above weekly mean",
            },
            {
              icon: Clock,
              color: "cyan",
              title: "Highest Engagement",
              value: "Saturday",
              sub: "Avg. session 6.1 min — users explore 4.3 pages",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 shadow-lg shadow-black/20"
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${bgMap[card.color] ?? "bg-indigo-500/10 border-indigo-500/20"}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">{card.title}</p>
                <p className="text-xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-sm text-slate-400">{card.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}