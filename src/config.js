export const base = import.meta.env.BASE_URL || "./";

export const asset = (path) => {
  const clean = String(path).replace(/^\//, "");
  return `${base}${clean}`;
};

export const SITE = {
  title: "ArchitectGenesis",
  motto: "Every civilization begins with a single year.",
  question: "What happens if this mind is allowed to shape history?",
  copyright: "Copyright © 2026 Bryan Antler. All Rights Reserved.",
  founderId: "00000001",
};

/**
 * Replace these with live listings and official channels before launch.
 * QR codes and social icons read from this object.
 */
export const LINKS = {
  appStore: `${typeof location !== "undefined" ? location.origin + location.pathname : ""}#/app`,
  x: "https://x.com/ArchitectGen",
  instagram: "https://www.instagram.com/architectgenesis/",
  facebook: "https://www.facebook.com/architectgenesis",
  tiktok: "https://www.tiktok.com/@ArchitectGen",
  discord: "https://discord.gg/JHfm7HY9y",
  novel: "https://www.amazon.com/Josephus-Novel-B-Michael-Antler-ebook/dp/B089NYXM3B",
};

export const FOUNDER = {
  name: "Bryan Antler",
  role: "Founder, Lead Architect & Copyright Holder",
  credentials: "Undergraduate degree · Juris Doctor",
  novelTitle: "Josephus: A Novel",
  novelUrl: LINKS.novel,
};

export const CAROUSEL = {
  intervalMs: 18000,
  resumeMs: 12000,
};

export const NAV = [
  { href: "#/gameplay", label: "Gameplay" },
  { href: "#/features", label: "Features" },
  { href: "#/demo", label: "Demo" },
  { href: "#/pricing", label: "Pricing" },
  { href: "#/store", label: "Store" },
  { href: "#/about", label: "About" },
  { href: "#/faq", label: "FAQ" },
  { href: "#/community", label: "Community" },
  { href: "#/support", label: "Support" },
];

export const PLANS = [
  {
    id: "premium-monthly",
    tier: "Premium",
    cadence: "Monthly",
    price: "$9.99",
    period: "/ month",
    blurb: "The full simulation, Chronicle access, and living-world updates.",
    features: [
      "Create and simulate Architects",
      "Situation Room and Time Travel",
      "Founder Chronicle",
      "Standard Registry certificate",
    ],
  },
  {
    id: "premium-annual",
    tier: "Premium",
    cadence: "Annual",
    price: "$79",
    period: "/ year",
    save: "Save two months",
    blurb: "A year of history, billed once.",
    features: [
      "Everything in Premium Monthly",
      "Annual Founder seal",
      "Priority demo civilizations",
    ],
  },
  {
    id: "ultimate-monthly",
    tier: "Ultimate",
    cadence: "Monthly",
    price: "$19.99",
    period: "/ month",
    featured: true,
    blurb: "For Founders who intend to leave a dynasty.",
    features: [
      "Everything in Premium",
      "Great House tools (when they open)",
      "Ultimate Registry illumination",
      "Gift a one-month preview each cycle",
    ],
  },
  {
    id: "ultimate-annual",
    tier: "Ultimate",
    cadence: "Annual",
    price: "$159",
    period: "/ year",
    save: "Best value",
    blurb: "The long view.",
    features: [
      "Everything in Ultimate Monthly",
      "Annual illuminated certificate",
      "Founders Night invitation list",
    ],
  },
];

export const GIFT_DURATIONS = [
  { id: "1m", label: "1 month", price: "$12" },
  { id: "3m", label: "3 months", price: "$32" },
  { id: "6m", label: "6 months", price: "$58" },
  { id: "12m", label: "12 months", price: "$99" },
];
