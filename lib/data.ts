// ─── Brand Constants ────────────────────────────────────────────────────────
export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Business intelligence that moves at your speed.";
export const APP_DESCRIPTION =
  "Monitor revenue, users, and growth metrics in real time — all from one beautifully designed dashboard.";

// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

/** Single source of truth for all navigation links. */
export const navLinks: NavLink[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

export const sidebarLinks: NavLink[] = [
  { label: "Overview", href: "/dashboard", icon: "Layout" },
  { label: "Analytics", href: "/analytics", icon: "Activity" },
  { label: "Users", href: "/users", icon: "User" },
  { label: "Revenue", href: "/revenue", icon: "Star" },
  { label: "Settings", href: "/settings", icon: "Settings" },
];

// ─── Shared TypeScript Types ─────────────────────────────────────────────────
export interface KPICard {
  label: string;
  value: string;
  change: number; // percentage, positive = up
  prefix?: string;
  suffix?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "active" | "churned" | "trial";
  mrr: number;
  joined: string;
}

// ─── Color Palette ───────────────────────────────────────────────────────────
export const BRAND_COLORS = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  dark: "#1e1b4b",
  light: "#f8fafc",
  border: "#e2e8f0",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  chart: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
} as const;