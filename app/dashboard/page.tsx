"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, AlertCircle, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, XCircle, Filter, Download } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$284,500",
    raw: 284500,
    change: 12.4,
    prefix: "$",
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/20",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
  },
  {
    label: "Active Users",
    value: "18,342",
    raw: 18342,
    change: 8.1,
    icon: Users,
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$52,800",
    raw: 52800,
    change: 5.7,
    prefix: "$",
    icon: Activity,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    label: "Churn Rate",
    value: "2.4%",
    raw: 2.4,
    change: -0.6,
    suffix: "%",
    icon: AlertCircle,
    color: "rose",
    gradient: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    invertDelta: true,
  },
];

const revenueData = [
  { name: "Jan", revenue: 38000, mrr: 31000 },
  { name: "Feb", revenue: 42000, mrr: 34000 },
  { name: "Mar", revenue: 39500, mrr: 33000 },
  { name: "Apr", revenue: 51000, mrr: 40000 },
  { name: "May", revenue: 47000, mrr: 38000 },
  { name: "Jun", revenue: 58000, mrr: 45000 },
  { name: "Jul", revenue: 62000, mrr: 48000 },
  { name: "Aug", revenue: 55000, mrr: 44000 },
  { name: "Sep", revenue: 71000, mrr: 52000 },
  { name: "Oct", revenue: 68000, mrr: 50000 },
  { name: "Nov", revenue: 79000, mrr: 56000 },
  { name: "Dec", revenue: 84500, mrr: 62000 },
];

const usersData = [
  { name: "Jan", users: 9200, newUsers: 1100 },
  { name: "Feb", users: 10100, newUsers: 1300 },
  { name: "Mar", users: 10800, newUsers: 980 },
  { name: "Apr", users: 11900, newUsers: 1500 },
  { name: "May", users: 12600, newUsers: 1200 },
  { name: "Jun", users: 13800, newUsers: 1700 },
  { name: "Jul", users: 14500, newUsers: 1400 },
  { name: "Aug", users: 15200, newUsers: 1100 },
  { name: "Sep", users: 16400, newUsers: 1800 },
  { name: "Oct", users: 17100, newUsers: 1300 },
  { name: "Nov", users: 17800, newUsers: 1500 },
  { name: "Dec", users: 18342, newUsers: 1900 },
];

const transactions = [
  {
    id: "TXN-001",
    customer: "Acme Corp",
    email: "billing@acme.com",
    amount: 2400,
    status: "paid" as const,
    date: "2024-12-18",
    plan: "Enterprise",
  },
  {
    id: "TXN-002",
    customer: "Bright Labs",
    email: "admin@brightlabs.io",
    amount: 799,
    status: "paid" as const,
    date: "2024-12-17",
    plan: "Pro",
  },
  {
    id: "TXN-003",
    customer: "Nova Systems",
    email: "finance@novasys.com",
    amount: 199,
    status: "pending" as const,
    date: "2024-12-17",
    plan: "Starter",
  },
  {
    id: "TXN-004",
    customer: "Orbit Digital",
    email: "ops@orbitdigital.co",
    amount: 2400,
    status: "paid" as const,
    date: "2024-12-16",
    plan: "Enterprise",
  },
  {
    id: "TXN-005",
    customer: "Flux Studio",
    email: "hello@fluxstudio.design",
    amount: 799,
    status: "failed" as const,
    date: "2024-12-16",
    plan: "Pro",
  },
  {
    id: "TXN-006",
    customer: "Zenith Cloud",
    email: "accounts@zenithcloud.net",
    amount: 2400,
    status: "paid" as const,
    date: "2024-12-15",
    plan: "Enterprise",
  },
  {
    id: "TXN-007",
    customer: "Pixel Works",
    email: "pay@pixelworks.io",
    amount: 199,
    status: "pending" as const,
    date: "2024-12-15",
    plan: "Starter",
  },
  {
    id: "TXN-008",
    customer: "Cascade AI",
    email: "billing@cascadeai.com",
    amount: 799,
    status: "paid" as const,
    date: "2024-12-14",
    plan: "Pro",
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatter?: (v: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800/95 backdrop-blur border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {formatter ? formatter(entry.value) : (entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const config = {
    paid: {
      label: "Paid",
      icon: CheckCircle,
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className: "bg-rose-500/15 text-rose-400 border-rose-500/25",
    },
  };
  const { label, icon: Icon, className } = config[status] ?? config.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

// ─── Plan Badge ───────────────────────────────────────────────────────────────

function PlanBadge({ plan }: { plan: string }) {
  const config: Record<string, string> = {
    Enterprise: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    Pro: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    Starter: "bg-slate-500/15 text-slate-300 border-slate-500/25",
  };
  const cls = config[plan] ?? config["Starter"];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cls}`}
    >
      {plan}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [txFilter, setTxFilter] = useState<"all" | "paid" | "pending" | "failed">("all");

  const filteredTx =
    txFilter === "all"
      ? transactions
      : transactions.filter((t) => t.status === txFilter);

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                Dashboard Overview
              </h1>
              <p className="text-slate-400 text-base">
                Welcome back — here&apos;s what&apos;s happening with Pulse Analytics today.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium shadow-lg shadow-indigo-500/25 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isGood = card.invertDelta ? !isPositive : isPositive;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} border ${card.border} p-6 backdrop-blur-sm cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isGood
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-sm text-slate-400">{card.label}</p>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/[0.02] blur-xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          {/* Revenue & MRR Line Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Revenue vs MRR</h2>
                <p className="text-sm text-slate-400 mt-0.5">Full-year performance overview</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" />
                  MRR
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  width={44}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(v) => `$${(v ?? 0).toLocaleString()}`}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={BRAND_COLORS.primary}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: BRAND_COLORS.primary, strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke={BRAND_COLORS.secondary}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: BRAND_COLORS.secondary, strokeWidth: 0 }}
                  strokeDasharray="5 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Active Users Area Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Active Users</h2>
                <p className="text-sm text-slate-400 mt-0.5">Total &amp; new user growth</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-cyan-400 inline-block" />
                  Total
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-emerald-400 inline-block" />
                  New
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={usersData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                  width={36}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={(v) => (v ?? 0).toLocaleString()}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fill="url(#gradUsers)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#06b6d4", strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#gradNew)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#10b981", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 overflow-hidden backdrop-blur-sm"
        >
          {/* Table Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <p className="text-sm text-slate-400 mt-0.5">Latest billing activity across all plans</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              {(["all", "paid", "pending", "failed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTxFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    txFilter === f
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/40">
                  {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(filteredTx ?? []).map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                    className="border-b border-slate-800/30 hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{tx.customer}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{tx.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <PlanBadge plan={tx.plan} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs tabular-nums">
                      {tx.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredTx.length === 0 && (
              <div className="py-16 text-center text-slate-500 text-sm">
                No transactions match this filter.
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {filteredTx.length} of {transactions.length} transactions
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View all transactions →
            </motion.button>
          </div>
        </motion.div>

        {/* ── Bottom Insight Strip ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8"
        >
          {[
            {
              label: "Avg. Revenue Per User",
              value: "$15.51",
              sub: "Based on 18,342 active users",
              trend: TrendingUp,
              trendColor: "text-emerald-400",
            },
            {
              label: "Top Plan by Revenue",
              value: "Enterprise",
              sub: "Accounts for 61% of total MRR",
              trend: TrendingUp,
              trendColor: "text-indigo-400",
            },
            {
              label: "Avg. Transaction Value",
              value: "$1,374",
              sub: "Up 9.2% from last month",
              trend: TrendingUp,
              trendColor: "text-violet-400",
            },
          ].map((item) => {
            const TrendIcon = item.trend;
            return (
              <motion.div
                key={item.label}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className="rounded-2xl bg-slate-900/50 border border-slate-800/50 px-6 py-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/60 flex items-center justify-center flex-shrink-0">
                  <TrendIcon className={`w-5 h-5 ${item.trendColor}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-lg font-bold text-white">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </main>
  );
}