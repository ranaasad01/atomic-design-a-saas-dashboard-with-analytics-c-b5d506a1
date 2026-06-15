"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, ArrowUpRight, ArrowDownRight, Filter, Download } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const mrrArrData = [
  { name: "Jan", mrr: 28400, arr: 340800 },
  { name: "Feb", mrr: 31200, arr: 374400 },
  { name: "Mar", mrr: 33800, arr: 405600 },
  { name: "Apr", mrr: 36500, arr: 438000 },
  { name: "May", mrr: 39100, arr: 469200 },
  { name: "Jun", mrr: 42700, arr: 512400 },
  { name: "Jul", mrr: 45300, arr: 543600 },
  { name: "Aug", mrr: 47900, arr: 574800 },
  { name: "Sep", mrr: 50200, arr: 602400 },
  { name: "Oct", mrr: 53600, arr: 643200 },
  { name: "Nov", mrr: 56800, arr: 681600 },
  { name: "Dec", mrr: 61400, arr: 736800 },
];

const revenueByPlanData = [
  { name: "Jan", Basic: 6200, Pro: 14800, Enterprise: 7400 },
  { name: "Feb", Basic: 6800, Pro: 16200, Enterprise: 8200 },
  { name: "Mar", Basic: 7100, Pro: 17400, Enterprise: 9300 },
  { name: "Apr", Basic: 7400, Pro: 18900, Enterprise: 10200 },
  { name: "May", Basic: 7800, Pro: 20100, Enterprise: 11200 },
  { name: "Jun", Basic: 8200, Pro: 22100, Enterprise: 12400 },
  { name: "Jul", Basic: 8600, Pro: 23400, Enterprise: 13300 },
  { name: "Aug", Basic: 8900, Pro: 24700, Enterprise: 14300 },
  { name: "Sep", Basic: 9200, Pro: 25800, Enterprise: 15200 },
  { name: "Oct", Basic: 9600, Pro: 27400, Enterprise: 16600 },
  { name: "Nov", Basic: 9900, Pro: 29100, Enterprise: 17800 },
  { name: "Dec", Basic: 10400, Pro: 31800, Enterprise: 19200 },
];

const donutData = [
  { name: "Enterprise", value: 19200, color: "#6366f1" },
  { name: "Pro", value: 31800, color: "#8b5cf6" },
  { name: "Basic", value: 10400, color: "#06b6d4" },
];

const transactions = [
  { id: "TXN-001", customer: "Acme Corp", email: "billing@acme.com", amount: 2400, status: "paid" as const, date: "2024-12-15", plan: "Enterprise" },
  { id: "TXN-002", customer: "Bright Labs", email: "finance@brightlabs.io", amount: 299, status: "paid" as const, date: "2024-12-14", plan: "Pro" },
  { id: "TXN-003", customer: "Nova Systems", email: "accounts@novasys.com", amount: 2400, status: "pending" as const, date: "2024-12-14", plan: "Enterprise" },
  { id: "TXN-004", customer: "Pixel Studio", email: "pay@pixelstudio.co", amount: 99, status: "paid" as const, date: "2024-12-13", plan: "Basic" },
  { id: "TXN-005", customer: "Quantum AI", email: "billing@quantumai.dev", amount: 299, status: "paid" as const, date: "2024-12-13", plan: "Pro" },
  { id: "TXN-006", customer: "Orbit Media", email: "ops@orbitmedia.net", amount: 299, status: "failed" as const, date: "2024-12-12", plan: "Pro" },
  { id: "TXN-007", customer: "Stellar Inc", email: "finance@stellar.com", amount: 2400, status: "paid" as const, date: "2024-12-12", plan: "Enterprise" },
  { id: "TXN-008", customer: "Drift Analytics", email: "hello@drift.io", amount: 99, status: "paid" as const, date: "2024-12-11", plan: "Basic" },
  { id: "TXN-009", customer: "Cascade Tech", email: "billing@cascade.tech", amount: 299, status: "pending" as const, date: "2024-12-11", plan: "Pro" },
  { id: "TXN-010", customer: "Apex Ventures", email: "accounts@apexvc.com", amount: 2400, status: "paid" as const, date: "2024-12-10", plan: "Enterprise" },
  { id: "TXN-011", customer: "Bloom Digital", email: "pay@bloomdigital.co", amount: 99, status: "paid" as const, date: "2024-12-10", plan: "Basic" },
  { id: "TXN-012", customer: "Forge Software", email: "billing@forgesw.com", amount: 299, status: "failed" as const, date: "2024-12-09", plan: "Pro" },
];

const kpiCards = [
  {
    label: "Monthly Recurring Revenue",
    value: "$61,400",
    change: 8.1,
    icon: DollarSign,
    color: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-500/20",
  },
  {
    label: "Annual Recurring Revenue",
    value: "$736,800",
    change: 8.1,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
  },
  {
    label: "Avg Revenue Per User",
    value: "$184",
    change: 3.4,
    icon: Users,
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
  },
  {
    label: "Total Transactions",
    value: "1,284",
    change: -1.2,
    icon: CreditCard,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
];

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <p className="text-xs font-semibold text-slate-300 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="text-white font-semibold">${(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const DonutTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <div className="flex items-center gap-2 text-xs">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item?.payload?.color }} />
        <span className="text-slate-400">{item?.name}:</span>
        <span className="text-white font-semibold">${(item?.value ?? 0).toLocaleString()}</span>
      </div>
    </div>
  );
};

// ─── Status Badge ────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: "paid" | "pending" | "failed" }) => {
  const styles = {
    paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── Plan Badge ─────────────────────────────────────────────────────────────

const PlanBadge = ({ plan }: { plan: string }) => {
  const styles: Record<string, string> = {
    Enterprise: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Pro: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Basic: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };
  const style = styles[plan] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {plan}
    </span>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "failed">("all");

  const filteredTransactions = (transactions ?? []).filter(
    (tx) => statusFilter === "all" || tx.status === statusFilter
  );

  const totalRevenue = (transactions ?? [])
    .filter((tx) => tx.status === "paid")
    .reduce((sum, tx) => sum + (tx.amount ?? 0), 0);

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Revenue
              </h1>
              <p className="mt-1.5 text-slate-400 text-sm">
                Track MRR, ARR, and transaction history across all plans.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-colors self-start sm:self-auto"
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
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative bg-slate-900/80 border border-slate-800/60 rounded-2xl p-5 overflow-hidden group cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.shadow}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(card.change)}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-xs text-slate-500">{card.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MRR / ARR Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">MRR & ARR Trend</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly and annual recurring revenue over the past 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-indigo-400 rounded-full inline-block" />
                MRR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-violet-400 rounded-full inline-block" />
                ARR
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mrrArrData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="mrr"
                name="MRR"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="arr"
                name="ARR"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                dot={false}
                strokeDasharray="6 3"
                activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Stacked Bar + Donut ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Stacked Bar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Revenue by Plan</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly breakdown across Basic, Pro, and Enterprise tiers</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByPlanData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8", paddingTop: "12px" }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar dataKey="Basic" name="Basic" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Pro" name="Pro" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Enterprise" name="Enterprise" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-6 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Revenue Mix</h2>
              <p className="text-xs text-slate-500 mt-0.5">December 2024 breakdown</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {donutData.map((item) => {
                const total = donutData.reduce((s, d) => s + d.value, 0);
                const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-white">${(item.value ?? 0).toLocaleString()}</span>
                      <span className="text-xs text-slate-500 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-900/80 border border-slate-800/60 rounded-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-800/60">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} shown
                {statusFilter !== "all" ? ` · filtered by ${statusFilter}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "paid" | "pending" | "failed")}
                className="bg-slate-800 border border-slate-700/60 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Plan</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Date</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {(filteredTransactions ?? []).map((tx, idx) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                          {tx.customer}
                        </p>
                        <p className="text-xs text-slate-500">{tx.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <PlanBadge plan={tx.plan} />
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-400">{tx.date}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No transactions match the selected filter.
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 border-t border-slate-800/60 bg-slate-900/40">
            <p className="text-xs text-slate-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <p className="text-xs text-slate-400">
              Total collected:{" "}
              <span className="font-semibold text-emerald-400">
                ${totalRevenue.toLocaleString()}
              </span>
            </p>
          </div>
        </motion.div>

      </div>
    </main>
  );
}