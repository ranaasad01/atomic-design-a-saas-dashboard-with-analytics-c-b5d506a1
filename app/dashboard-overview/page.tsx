"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Star, ArrowRight, Eye, Clock, CheckCircle, AlertCircle, XCircle, ChevronUp, ChevronDown, MoreHorizontal, Download, Filter, RefreshCw } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: "Monthly Revenue",
    value: "$52,840",
    change: 12.4,
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    label: "Active Users",
    value: "8,291",
    change: 7.2,
    icon: Users,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    label: "Avg. Session",
    value: "4m 38s",
    change: -2.1,
    icon: Clock,
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    label: "Conversion Rate",
    value: "3.86%",
    change: 0.9,
    icon: Activity,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

const revenueData = [
  { name: "Jan", revenue: 28400, expenses: 18200 },
  { name: "Feb", revenue: 32100, expenses: 19800 },
  { name: "Mar", revenue: 29800, expenses: 17400 },
  { name: "Apr", revenue: 38600, expenses: 21000 },
  { name: "May", revenue: 41200, expenses: 22500 },
  { name: "Jun", revenue: 39800, expenses: 20800 },
  { name: "Jul", revenue: 45100, expenses: 24200 },
  { name: "Aug", revenue: 48700, expenses: 25600 },
  { name: "Sep", revenue: 44300, expenses: 23100 },
  { name: "Oct", revenue: 51200, expenses: 26800 },
  { name: "Nov", revenue: 49600, expenses: 25200 },
  { name: "Dec", revenue: 52840, expenses: 27400 },
];

const userGrowthData = [
  { name: "Jan", users: 3200 },
  { name: "Feb", users: 3800 },
  { name: "Mar", users: 4100 },
  { name: "Apr", users: 4900 },
  { name: "May", users: 5600 },
  { name: "Jun", users: 5900 },
  { name: "Jul", users: 6400 },
  { name: "Aug", users: 7100 },
  { name: "Sep", users: 7400 },
  { name: "Oct", users: 7900 },
  { name: "Nov", users: 8100 },
  { name: "Dec", users: 8291 },
];

const planDistribution = [
  { name: "Starter", value: 42, color: "#6366f1" },
  { name: "Pro", value: 35, color: "#8b5cf6" },
  { name: "Enterprise", value: 23, color: "#06b6d4" },
];

const transactions = [
  {
    id: "TXN-001",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 1200,
    status: "paid" as const,
    date: "Dec 28, 2024",
    plan: "Enterprise",
  },
  {
    id: "TXN-002",
    customer: "Nova Labs",
    email: "admin@novalabs.io",
    amount: 299,
    status: "paid" as const,
    date: "Dec 27, 2024",
    plan: "Pro",
  },
  {
    id: "TXN-003",
    customer: "Bright Media",
    email: "finance@brightmedia.co",
    amount: 49,
    status: "pending" as const,
    date: "Dec 27, 2024",
    plan: "Starter",
  },
  {
    id: "TXN-004",
    customer: "Vertex Systems",
    email: "ops@vertexsys.com",
    amount: 1200,
    status: "paid" as const,
    date: "Dec 26, 2024",
    plan: "Enterprise",
  },
  {
    id: "TXN-005",
    customer: "Drift Studio",
    email: "hello@driftstudio.com",
    amount: 299,
    status: "failed" as const,
    date: "Dec 26, 2024",
    plan: "Pro",
  },
  {
    id: "TXN-006",
    customer: "Lunar Tech",
    email: "pay@lunartech.dev",
    amount: 49,
    status: "paid" as const,
    date: "Dec 25, 2024",
    plan: "Starter",
  },
  {
    id: "TXN-007",
    customer: "Cascade AI",
    email: "billing@cascadeai.com",
    amount: 1200,
    status: "pending" as const,
    date: "Dec 25, 2024",
    plan: "Enterprise",
  },
];

const topPages = [
  { page: "/dashboard", views: 14820, change: 8.2 },
  { page: "/analytics", views: 9340, change: 12.5 },
  { page: "/users", views: 7210, change: -3.1 },
  { page: "/revenue", views: 6890, change: 5.7 },
  { page: "/settings", views: 3120, change: 1.4 },
];

const recentActivity = [
  {
    id: 1,
    type: "signup",
    text: "Cascade AI signed up for Enterprise",
    time: "2 min ago",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    icon: CheckCircle,
  },
  {
    id: 2,
    type: "upgrade",
    text: "Nova Labs upgraded from Starter to Pro",
    time: "18 min ago",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "alert",
    text: "Drift Studio payment failed — retry scheduled",
    time: "1h ago",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    icon: AlertCircle,
  },
  {
    id: 4,
    type: "churn",
    text: "Pixel Works cancelled their subscription",
    time: "3h ago",
    color: "text-red-400",
    bg: "bg-red-500/10",
    icon: XCircle,
  },
  {
    id: 5,
    type: "milestone",
    text: "Revenue milestone: $50k MRR reached 🎉",
    time: "5h ago",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    icon: Star,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const map = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-red-500/15 text-red-400 border-red-500/25",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            ${(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function UserTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-1 font-medium">{label}</p>
      <p className="text-white font-semibold text-sm">
        {(payload[0]?.value ?? 0).toLocaleString()} users
      </p>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");
  const [txFilter, setTxFilter] = useState<"all" | "paid" | "pending" | "failed">("all");

  const filteredTransactions =
    txFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.status === txFilter);

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              Welcome back — here's what's happening with Pulse Analytics today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-800 hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/25"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isUp = card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-slate-900/80 border ${card.border} p-5 shadow-xl cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isUp
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {isUp ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-0.5">
                  {card.value}
                </p>
                <p className="text-xs text-slate-400">{card.label}</p>
                {/* Decorative gradient blob */}
                <div
                  className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-xl`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Revenue / Users Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Performance Overview
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Full-year trend — Jan to Dec 2024
                </p>
              </div>
              <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1">
                {(["revenue", "users"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab === "revenue" ? "Revenue" : "Users"}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              {activeTab === "revenue" ? (
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                  <Area type="monotone" dataKey="expenses" stroke="#8b5cf6" strokeWidth={2} fill="url(#expGrad)" dot={false} activeDot={{ r: 4, fill: "#8b5cf6" }} />
                </AreaChart>
              ) : (
                <AreaChart data={userGrowthData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                  <Tooltip content={<UserTooltip />} />
                  <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2.5} fill="url(#userGrad)" dot={false} activeDot={{ r: 5, fill: "#06b6d4" }} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution Pie */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-xl"
          >
            <h2 className="text-base font-semibold text-white mb-1">
              Plan Distribution
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Active subscriptions by tier
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {planDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#e2e8f0",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 mt-4">
              {planDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Monthly Bar Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-6 shadow-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Monthly Revenue Breakdown
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Revenue vs. expenses — 2024
              </p>
            </div>
            <Link
              href="/revenue"
              className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              View full report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }} iconType="circle" iconSize={8} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={28} />
              <Bar dataKey="expenses" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Bottom Row: Transactions + Activity + Top Pages ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Transactions Table */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800/60 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-slate-800/60">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Recent Transactions
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest billing activity
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1">
                  {(["all", "paid", "pending", "failed"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTxFilter(f)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize ${
                        txFilter === f
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/40">
                    <th className="text-left text-xs font-medium text-slate-500 px-5 py-3">
                      Customer
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 hidden sm:table-cell">
                      Plan
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">
                      Amount
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 px-3 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 hidden md:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredTransactions ?? []).map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-slate-200 font-medium text-sm">
                            {tx.customer}
                          </p>
                          <p className="text-slate-500 text-xs">{tx.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 hidden sm:table-cell">
                        <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md">
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-white font-semibold">
                          ${(tx.amount ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <StatusBadge status={tx.status} />
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell">
                        <span className="text-slate-500 text-xs">{tx.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredTransactions.length === 0 && (
                <div className="py-10 text-center text-slate-500 text-sm">
                  No transactions match this filter.
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-800/40 flex justify-end">
              <Link
                href="/revenue"
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                View all transactions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Activity + Top Pages */}
          <div className="flex flex-col gap-6">

            {/* Recent Activity */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-5 shadow-xl"
            >
              <h2 className="text-base font-semibold text-white mb-1">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Live event stream
              </p>
              <div className="space-y-3">
                {recentActivity.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 3 }}
                      className="flex items-start gap-3 group cursor-default"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-300 leading-snug">
                          {item.text}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Top Pages */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/60 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Top Pages
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    By page views this month
                  </p>
                </div>
                <Eye className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-3">
                {topPages.map((page, i) => {
                  const maxViews = topPages[0]?.views ?? 1;
                  const pct = Math.round(((page.views ?? 0) / maxViews) * 100);
                  const isUp = page.change >= 0;
                  return (
                    <div key={page.page}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300 font-mono">
                          {page.page}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {(page.views ?? 0).toLocaleString()}
                          </span>
                          <span
                            className={`text-xs font-medium flex items-center gap-0.5 ${
                              isUp ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {isUp ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(page.change)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}