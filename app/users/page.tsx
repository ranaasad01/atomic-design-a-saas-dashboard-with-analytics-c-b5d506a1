"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, ArrowUp, ArrowDown, User, Users, Activity, Star, Calendar, ArrowUpDown, Eye, Mail } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: "u1", name: "Sophia Hartwell", email: "sophia@hartwell.io", plan: "Enterprise", status: "active", mrr: 1200, joined: "2023-01-15", avatar: "SH" },
  { id: "u2", name: "Marcus Chen", email: "m.chen@techflow.com", plan: "Pro", status: "active", mrr: 79, joined: "2023-03-08", avatar: "MC" },
  { id: "u3", name: "Priya Nair", email: "priya@nairdesign.co", plan: "Starter", status: "trial", mrr: 0, joined: "2024-05-01", avatar: "PN" },
  { id: "u4", name: "James Okafor", email: "james.o@buildfast.dev", plan: "Pro", status: "active", mrr: 79, joined: "2023-07-22", avatar: "JO" },
  { id: "u5", name: "Elena Vasquez", email: "elena@vasquez.studio", plan: "Enterprise", status: "active", mrr: 1200, joined: "2022-11-30", avatar: "EV" },
  { id: "u6", name: "Tom Briggs", email: "tom@briggscorp.net", plan: "Starter", status: "churned", mrr: 0, joined: "2023-09-14", avatar: "TB" },
  { id: "u7", name: "Aisha Kamara", email: "aisha@kamara.tech", plan: "Pro", status: "active", mrr: 79, joined: "2024-01-03", avatar: "AK" },
  { id: "u8", name: "Luca Romano", email: "luca.r@romanoventures.it", plan: "Enterprise", status: "active", mrr: 1200, joined: "2023-05-19", avatar: "LR" },
  { id: "u9", name: "Yuki Tanaka", email: "yuki@tanaka.jp", plan: "Starter", status: "active", mrr: 29, joined: "2024-02-28", avatar: "YT" },
  { id: "u10", name: "Fatima Al-Rashid", email: "fatima@alrashid.ae", plan: "Pro", status: "churned", mrr: 0, joined: "2023-06-11", avatar: "FA" },
  { id: "u11", name: "Noah Williams", email: "noah@willtech.io", plan: "Pro", status: "active", mrr: 79, joined: "2024-03-15", avatar: "NW" },
  { id: "u12", name: "Chloe Dupont", email: "chloe@dupont.fr", plan: "Enterprise", status: "active", mrr: 1200, joined: "2022-08-07", avatar: "CD" },
  { id: "u13", name: "Raj Patel", email: "raj@patelanalytics.in", plan: "Starter", status: "trial", mrr: 0, joined: "2024-05-10", avatar: "RP" },
  { id: "u14", name: "Sara Lindqvist", email: "sara@lindqvist.se", plan: "Pro", status: "active", mrr: 79, joined: "2023-12-01", avatar: "SL" },
  { id: "u15", name: "Diego Morales", email: "diego@moralesgroup.mx", plan: "Enterprise", status: "active", mrr: 1200, joined: "2023-02-20", avatar: "DM" },
  { id: "u16", name: "Hannah Kim", email: "hannah@kimstudio.kr", plan: "Starter", status: "churned", mrr: 0, joined: "2023-10-05", avatar: "HK" },
  { id: "u17", name: "Oliver Bauer", email: "oliver@bauertech.de", plan: "Pro", status: "active", mrr: 79, joined: "2024-04-18", avatar: "OB" },
  { id: "u18", name: "Amara Diallo", email: "amara@diallo.sn", plan: "Starter", status: "active", mrr: 29, joined: "2024-01-22", avatar: "AD" },
];

const GROWTH_DATA = [
  { name: "Jun '23", value: 120, newUsers: 18 },
  { name: "Jul '23", value: 145, newUsers: 25 },
  { name: "Aug '23", value: 168, newUsers: 23 },
  { name: "Sep '23", value: 195, newUsers: 27 },
  { name: "Oct '23", value: 224, newUsers: 29 },
  { name: "Nov '23", value: 258, newUsers: 34 },
  { name: "Dec '23", value: 291, newUsers: 33 },
  { name: "Jan '24", value: 330, newUsers: 39 },
  { name: "Feb '24", value: 374, newUsers: 44 },
  { name: "Mar '24", value: 421, newUsers: 47 },
  { name: "Apr '24", value: 476, newUsers: 55 },
  { name: "May '24", value: 534, newUsers: 58 },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey = "name" | "plan" | "status" | "mrr" | "joined";
type SortDir = "asc" | "desc";
type PlanFilter = "All" | "Starter" | "Pro" | "Enterprise";
type StatusFilter = "All" | "active" | "trial" | "churned";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const planOrder: Record<string, number> = { Starter: 0, Pro: 1, Enterprise: 2 };

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  trial: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  churned: "bg-red-500/15 text-red-400 border border-red-500/25",
};

const planColors: Record<string, string> = {
  Starter: "bg-slate-700/60 text-slate-300 border border-slate-600/40",
  Pro: "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25",
  Enterprise: "bg-violet-500/15 text-violet-400 border border-violet-500/25",
};

const avatarColors = [
  "from-indigo-500 to-violet-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-violet-500 to-purple-600",
];

function getAvatarGradient(id: string) {
  const idx = parseInt(id.replace("u", ""), 10) % avatarColors.length;
  return avatarColors[idx] ?? avatarColors[0];
}

function formatMRR(val: number) {
  if (val === 0) return "—";
  return `$${val.toLocaleString()}`;
}

function formatDate(dateStr: string) {
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[parseInt(parts[1] ?? "1", 10) - 1] ?? "";
  const year = parts[0] ?? "";
  return `${month} ${year}`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-slate-400 mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {p.name === "value" ? "Total Users" : "New Users"}:{" "}
          <span className="text-indigo-400">{(p.value ?? 0).toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

interface SummaryCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

function SummaryCard({ label, value, change, icon, color }: SummaryCardProps) {
  const isUp = change >= 0;
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 flex flex-col gap-3 shadow-lg shadow-black/10 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400 font-medium">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isUp ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
          {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "active").length;
  const churnedUsers = MOCK_USERS.filter((u) => u.status === "churned").length;
  const trialUsers = MOCK_USERS.filter((u) => u.status === "trial").length;

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") rows = rows.filter((u) => u.plan === planFilter);
    if (statusFilter !== "All") rows = rows.filter((u) => u.status === statusFilter);

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "plan") cmp = (planOrder[a.plan] ?? 0) - (planOrder[b.plan] ?? 0);
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else if (sortKey === "mrr") cmp = a.mrr - b.mrr;
      else if (sortKey === "joined") cmp = a.joined.localeCompare(b.joined);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, planFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
    return sortDir === "asc"
      ? <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
      : <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />;
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-1">
            <User className="w-4 h-4" />
            <span>User Management</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Users
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-slate-400 text-base max-w-xl">
            Track user growth, manage accounts, and monitor plan distribution across your customer base.
          </motion.p>
        </motion.div>

        {/* ── Summary Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <SummaryCard
            label="Total Users"
            value={totalUsers.toLocaleString()}
            change={12}
            icon={<Users className="w-4 h-4 text-white" />}
            color="bg-gradient-to-br from-indigo-500 to-violet-600"
          />
          <SummaryCard
            label="Active"
            value={activeUsers.toLocaleString()}
            change={8}
            icon={<Activity className="w-4 h-4 text-white" />}
            color="bg-gradient-to-br from-emerald-500 to-teal-600"
          />
          <SummaryCard
            label="Churned"
            value={churnedUsers.toLocaleString()}
            change={-3}
            icon={<ArrowDown className="w-4 h-4 text-white" />}
            color="bg-gradient-to-br from-red-500 to-rose-600"
          />
          <SummaryCard
            label="New This Month"
            value={trialUsers.toLocaleString()}
            change={22}
            icon={<Star className="w-4 h-4 text-white" />}
            color="bg-gradient-to-br from-amber-500 to-orange-600"
          />
        </motion.div>

        {/* ── Growth Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 shadow-lg shadow-black/10 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">User Growth</h2>
              <p className="text-sm text-slate-400 mt-0.5">Total and new users over the last 12 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                Total Users
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-cyan-400 inline-block" />
                New Users
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={GROWTH_DATA} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradTotal)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
              <Area type="monotone" dataKey="newUsers" stroke="#06b6d4" strokeWidth={2} fill="url(#gradNew)" dot={false} activeDot={{ r: 4, fill: "#06b6d4" }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Table Section ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-800/60 border border-slate-700/50 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm overflow-hidden"
        >
          {/* Filters */}
          <div className="p-5 border-b border-slate-700/50 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Plan Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {(["All", "Starter", "Pro", "Enterprise"] as PlanFilter[]).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPlanFilter(p); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    planFilter === p
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {(["All", "active", "trial", "churned"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    statusFilter === s
                      ? "bg-violet-500 text-white shadow-md shadow-violet-500/30"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {[
                    { key: "name" as SortKey, label: "User" },
                    { key: "plan" as SortKey, label: "Plan" },
                    { key: "status" as SortKey, label: "Status" },
                    { key: "mrr" as SortKey, label: "MRR" },
                    { key: "joined" as SortKey, label: "Joined" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors select-none"
                    >
                      <span className="flex items-center gap-1.5">
                        {label}
                        <SortIcon col={key} />
                      </span>
                    </th>
                  ))}
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-16 text-slate-500">
                        No users match your filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((user, idx) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.04, duration: 0.3 }}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                      >
                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarGradient(user.id)} flex items-center justify-center text-white text-xs font-bold shadow-md flex-shrink-0`}>
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-slate-100 leading-tight">{user.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Plan */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${planColors[user.plan] ?? ""}`}>
                            {user.plan}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[user.status] ?? ""}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-400" : user.status === "trial" ? "bg-amber-400" : "bg-red-400"}`} />
                            {user.status}
                          </span>
                        </td>

                        {/* MRR */}
                        <td className="px-5 py-4">
                          <span className={`font-semibold ${user.mrr > 0 ? "text-slate-100" : "text-slate-600"}`}>
                            {formatMRR(user.mrr)}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                            <Calendar className="w-3.5 h-3.5 text-slate-600" />
                            {formatDate(user.joined)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-7 h-7 rounded-lg bg-slate-700/60 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-400 flex items-center justify-center transition-colors"
                              title="View profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-7 h-7 rounded-lg bg-slate-700/60 hover:bg-indigo-500/20 hover:text-indigo-400 text-slate-400 flex items-center justify-center transition-colors"
                              title="Send email"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Showing <span className="text-slate-300 font-medium">{Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)}</span> of <span className="text-slate-300 font-medium">{filtered.length}</span> users
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    page === p
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                      : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {p}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}