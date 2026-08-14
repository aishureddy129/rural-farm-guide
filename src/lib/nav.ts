import {
  Home,
  Bot,
  Stethoscope,
  Landmark,
  CloudSun,
  IndianRupee,
  Megaphone,
  Sprout,
  Map,
  BookOpen,
  LifeBuoy,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Home",
    short: "Home",
    description: "Overview of every GramSahay service in one place.",
    icon: Home,
  },
  {
    to: "/assistant",
    label: "AI Rural Assistant",
    short: "Assistant",
    description: "Ask anything in your language — farming, paperwork, schemes.",
    icon: Bot,
  },
  {
    to: "/crop-doctor",
    label: "AI Crop Doctor",
    short: "Crop Doctor",
    description: "Photograph a leaf and get a disease diagnosis with treatment.",
    icon: Stethoscope,
  },
  {
    to: "/schemes",
    label: "Government Scheme Finder",
    short: "Schemes",
    description: "Match subsidies and welfare schemes to your exact profile.",
    icon: Landmark,
  },
  {
    to: "/weather",
    label: "Weather & Farming Advisory",
    short: "Weather",
    description: "7-day village forecast with sowing and spraying advice.",
    icon: CloudSun,
  },
  {
    to: "/market",
    label: "Agricultural Market Prices",
    short: "Mandi Prices",
    description: "Live mandi rates, trends and best-selling windows.",
    icon: IndianRupee,
  },
  {
    to: "/report",
    label: "Rural Issue Reporting",
    short: "Report Issue",
    description: "Report roads, water, power and health issues to officials.",
    icon: Megaphone,
  },
  {
    to: "/my-farm",
    label: "My Farm",
    short: "My Farm",
    description: "Your plots, crop calendar, expenses and yield records.",
    icon: Sprout,
  },
  {
    to: "/issue-map",
    label: "Issue Map",
    short: "Issue Map",
    description: "See what is broken and what is fixed across the district.",
    icon: Map,
  },
  {
    to: "/knowledge",
    label: "Knowledge Hub",
    short: "Knowledge",
    description: "Guides, videos and best practices in simple language.",
    icon: BookOpen,
  },
  {
    to: "/services",
    label: "Essential Services",
    short: "Services",
    description: "Helplines, health centres, banks, transport and more.",
    icon: LifeBuoy,
  },
  {
    to: "/admin",
    label: "Admin Dashboard",
    short: "Admin",
    description: "District-level analytics and issue resolution tracking.",
    icon: ShieldCheck,
  },
];

export const featureItems = navItems.filter((item) => item.to !== "/");
