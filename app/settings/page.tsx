"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Star, Settings, Upload, Check, ChevronRight, CreditCard, Shield, Palette, ToggleLeft, ToggleRight, Mail, Phone, Layout, Sun, Moon, Monitor, Zap, AlertCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND_COLORS, APP_NAME } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToggleState {
  emailDigest: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
  smsMarketing: boolean;
  inAppAll: boolean;
  inAppMentions: boolean;
  inAppRevenue: boolean;
  inAppChurn: boolean;
}

type ThemeMode = "light" | "dark" | "system";
type AccentColor = "indigo" | "violet" | "cyan" | "emerald" | "amber" | "rose";

// ─── Section Tab Config ───────────────────────────────────────────────────────

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
] as const;

type TabId = (typeof tabs)[number]["id"];

// ─── Accent Colors ────────────────────────────────────────────────────────────

const accentColors: { id: AccentColor; label: string; hex: string; tailwind: string }[] = [
  { id: "indigo", label: "Indigo", hex: "#6366f1", tailwind: "bg-indigo-500" },
  { id: "violet", label: "Violet", hex: "#8b5cf6", tailwind: "bg-violet-500" },
  { id: "cyan", label: "Cyan", hex: "#06b6d4", tailwind: "bg-cyan-500" },
  { id: "emerald", label: "Emerald", hex: "#10b981", tailwind: "bg-emerald-500" },
  { id: "amber", label: "Amber", hex: "#f59e0b", tailwind: "bg-amber-500" },
  { id: "rose", label: "Rose", hex: "#ef4444", tailwind: "bg-rose-500" },
];

// ─── Plan Data ────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    features: ["Up to 5 team members", "10k events/month", "30-day data retention", "Email support"],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    features: ["Up to 25 team members", "500k events/month", "1-year data retention", "Priority support", "Custom dashboards"],
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 249,
    features: ["Unlimited team members", "Unlimited events", "Unlimited retention", "Dedicated CSM", "SSO & SAML", "SLA guarantee"],
    current: false,
  },
];

// ─── Toggle Component ─────────────────────────────────────────────────────────

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        enabled ? "bg-indigo-500" : "bg-slate-700"
      }`}
      role="switch"
      aria-checked={enabled}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-md ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </motion.button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Input Component ──────────────────────────────────────────────────────────

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 transition-all"
      />
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // ── Tab state ──
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  // ── Profile state ──
  const [profileName, setProfileName] = useState("Alex Rivera");
  const [profileEmail, setProfileEmail] = useState("alex.rivera@company.io");
  const [profileRole, setProfileRole] = useState("Product Manager");
  const [profileCompany, setProfileCompany] = useState("Acme Corp");
  const [profileTimezone, setProfileTimezone] = useState("America/New_York");
  const [profileSaved, setProfileSaved] = useState(false);

  // ── Notification state ──
  const [toggles, setToggles] = useState<ToggleState>({
    emailDigest: true,
    emailAlerts: true,
    smsAlerts: false,
    smsMarketing: false,
    inAppAll: true,
    inAppMentions: true,
    inAppRevenue: true,
    inAppChurn: false,
  });

  // ── Billing state ──
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // ── Appearance state ──
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [accentColor, setAccentColor] = useState<AccentColor>("indigo");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // ── Handlers ──
  const flipToggle = (key: keyof ToggleState) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // ─── Render Sections ──────────────────────────────────────────────────────

  const renderProfile = () => (
    <motion.div
      key="profile"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Avatar */}
      <SectionCard title="Profile Photo" description="Upload a photo to personalize your account.">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/30 select-none">
              {(profileName ?? "?").charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-xl text-sm font-medium hover:bg-indigo-500/20 transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </motion.button>
            <p className="text-xs text-slate-500">PNG, JPG or GIF · Max 2 MB</p>
          </div>
        </div>
      </SectionCard>

      {/* Personal Info */}
      <SectionCard title="Personal Information" description="Update your name, email, and role details.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Full Name" value={profileName} onChange={setProfileName} placeholder="Your full name" />
          <FormInput label="Email Address" value={profileEmail} onChange={setProfileEmail} type="email" placeholder="you@company.com" />
          <FormInput label="Job Title" value={profileRole} onChange={setProfileRole} placeholder="e.g. Product Manager" />
          <FormInput label="Company" value={profileCompany} onChange={setProfileCompany} placeholder="Your company name" />
        </div>
      </SectionCard>

      {/* Preferences */}
      <SectionCard title="Regional Preferences" description="Set your timezone and locale for accurate reporting.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Timezone</label>
            <select
              value={profileTimezone}
              onChange={(e) => setProfileTimezone(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Currency Display</label>
            <select
              value="USD"
              onChange={() => {}}
              className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60 transition-all"
            >
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="JPY">JPY — Japanese Yen</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSaveProfile}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
            profileSaved
              ? "bg-emerald-500 text-white shadow-emerald-500/30"
              : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/30"
          }`}
        >
          {profileSaved ? <Check className="w-4 h-4" /> : null}
          {profileSaved ? "Saved!" : "Save Changes"}
        </motion.button>
      </div>
    </motion.div>
  );

  const renderNotifications = () => {
    const groups = [
      {
        title: "Email Notifications",
        icon: Mail,
        items: [
          { key: "emailDigest" as keyof ToggleState, label: "Weekly digest", desc: "A summary of your key metrics every Monday morning." },
          { key: "emailAlerts" as keyof ToggleState, label: "Critical alerts", desc: "Immediate email when revenue drops or churn spikes." },
        ],
      },
      {
        title: "SMS Notifications",
        icon: Phone,
        items: [
          { key: "smsAlerts" as keyof ToggleState, label: "Urgent alerts", desc: "Text message for P0 incidents and downtime events." },
          { key: "smsMarketing" as keyof ToggleState, label: "Product updates", desc: "Occasional texts about new features and releases." },
        ],
      },
      {
        title: "In-App Notifications",
        icon: Bell,
        items: [
          { key: "inAppAll" as keyof ToggleState, label: "All notifications", desc: "Master toggle for all in-app notification banners." },
          { key: "inAppMentions" as keyof ToggleState, label: "Mentions & comments", desc: "When a teammate mentions you in a note or comment." },
          { key: "inAppRevenue" as keyof ToggleState, label: "Revenue milestones", desc: "Celebrate MRR milestones and new Enterprise deals." },
          { key: "inAppChurn" as keyof ToggleState, label: "Churn alerts", desc: "Notify when an account cancels or downgrades." },
        ],
      },
    ];

    return (
      <motion.div
        key="notifications"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {groups.map((group) => (
          <SectionCard key={group.title} title={group.title}>
            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 py-1">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle enabled={toggles[item.key]} onToggle={() => flipToggle(item.key)} />
                </div>
              ))}
            </div>
          </SectionCard>
        ))}

        <motion.div variants={fadeInUp} className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300">
            SMS notifications require a verified phone number. Visit your profile to add one.
          </p>
        </motion.div>
      </motion.div>
    );
  };

  const renderBilling = () => (
    <motion.div
      key="billing"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Billing Cycle Toggle */}
      <SectionCard title="Billing Cycle" description="Switch between monthly and annual billing. Annual saves 20%.">
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900/60 border border-slate-700/50 rounded-xl p-1 gap-1">
            {(["monthly", "annual"] as const).map((cycle) => (
              <motion.button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  billingCycle === cycle
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cycle}
                {cycle === "annual" && (
                  <span className="ml-1.5 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                    −20%
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Plans */}
      <SectionCard title="Choose Your Plan" description="Upgrade or downgrade at any time. Changes take effect immediately.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const displayPrice = billingCycle === "annual" ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <motion.div
                key={plan.id}
                variants={scaleIn}
                whileHover={{ y: -3 }}
                className={`relative rounded-xl p-5 border transition-all ${
                  plan.current
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                    : "border-slate-700/50 bg-slate-900/40 hover:border-slate-600/60"
                }`}
              >
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Current Plan
                  </div>
                )}
                <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">${displayPrice}</span>
                  <span className="text-slate-400 text-sm">/mo</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                    plan.current
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 cursor-default"
                      : plan.id === "enterprise"
                      ? "bg-violet-500 hover:bg-violet-400 text-white shadow-md shadow-violet-500/20"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  {plan.current ? "Active" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </SectionCard>

      {/* Payment Method */}
      <SectionCard title="Payment Method" description="Manage your saved payment methods.">
        <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Visa ending in 4242</p>
              <p className="text-xs text-slate-500">Expires 08 / 2027</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full font-medium">
              Default
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs text-slate-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Replace
            </motion.button>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-3 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Shield className="w-4 h-4" />
          Add new payment method
        </motion.button>
      </SectionCard>

      {/* Billing History */}
      <SectionCard title="Recent Invoices" description="Download past invoices for your records.">
        <div className="space-y-2">
          {[
            { date: "Jun 1, 2025", amount: 79, status: "Paid", id: "INV-2025-06" },
            { date: "May 1, 2025", amount: 79, status: "Paid", id: "INV-2025-05" },
            { date: "Apr 1, 2025", amount: 79, status: "Paid", id: "INV-2025-04" },
          ].map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-2.5 border-b border-slate-700/40 last:border-0">
              <div>
                <p className="text-sm text-white font-medium">{inv.id}</p>
                <p className="text-xs text-slate-500">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white font-semibold">${inv.amount}.00</span>
                <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full">{inv.status}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  PDF
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );

  const renderAppearance = () => {
    const themeModes: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
      { id: "light", label: "Light", icon: Sun },
      { id: "dark", label: "Dark", icon: Moon },
      { id: "system", label: "System", icon: Monitor },
    ];

    return (
      <motion.div
        key="appearance"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Theme Mode */}
        <SectionCard title="Theme Mode" description="Choose how Pulse Analytics looks on your device.">
          <div className="grid grid-cols-3 gap-3">
            {themeModes.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setThemeMode(id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all ${
                  themeMode === id
                    ? "border-indigo-500/60 bg-indigo-500/10 text-indigo-300"
                    : "border-slate-700/50 bg-slate-900/40 text-slate-400 hover:border-slate-600/60 hover:text-slate-200"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
                {themeMode === id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </motion.button>
            ))}
          </div>
        </SectionCard>

        {/* Accent Color */}
        <SectionCard title="Accent Color" description="Pick a primary color for buttons, highlights, and active states.">
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <motion.button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                title={color.label}
                className={`relative w-10 h-10 rounded-xl ${color.tailwind} shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white/50`}
              >
                {accentColor === color.id && (
                  <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                )}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Selected: <span className="text-slate-300 capitalize">{accentColor}</span>
          </p>
        </SectionCard>

        {/* Layout Preferences */}
        <SectionCard title="Layout Preferences" description="Customize the dashboard layout to fit your workflow.">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-700/60 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Collapsed Sidebar</p>
                  <p className="text-xs text-slate-500">Show only icons in the sidebar by default.</p>
                </div>
              </div>
              <Toggle enabled={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
            </div>

            <div className="h-px bg-slate-700/40" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-700/60 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Compact Mode</p>
                  <p className="text-xs text-slate-500">Reduce padding and spacing for denser data views.</p>
                </div>
              </div>
              <Toggle enabled={compactMode} onToggle={() => setCompactMode((v) => !v)} />
            </div>

            <div className="h-px bg-slate-700/40" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-700/60 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Animations</p>
                  <p className="text-xs text-slate-500">Enable smooth transitions and motion effects.</p>
                </div>
              </div>
              <Toggle enabled={animationsEnabled} onToggle={() => setAnimationsEnabled((v) => !v)} />
            </div>
          </div>
        </SectionCard>

        {/* Preview Badge */}
        <motion.div variants={fadeInUp} className="flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-300">
            Appearance changes are previewed live. They&apos;ll be saved automatically when you navigate away.
          </p>
        </motion.div>
      </motion.div>
    );
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
          </div>
          <p className="text-slate-400 text-sm ml-12">
            Manage your account, notifications, billing, and appearance preferences.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Tabs */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {tabs.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap w-full text-left ${
                    activeTab === id
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                  {activeTab === id && (
                    <ChevronRight className="w-3.5 h-3.5 ml-auto text-indigo-400 hidden lg:block" />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === "profile" && renderProfile()}
            {activeTab === "notifications" && renderNotifications()}
            {activeTab === "billing" && renderBilling()}
            {activeTab === "appearance" && renderAppearance()}
          </div>
        </div>
      </div>
    </main>
  );
}

// Need to import Sparkles used in appearance section
function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

// Need to import slideInLeft used in the component
import { slideInLeft } from "@/lib/motion";