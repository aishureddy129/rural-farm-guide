import {
  Home,
  Bot,
  Stethoscope,
  Landmark,
  CloudSun,
  IndianRupee,
  Megaphone,
  Search,
  Sprout,
  Map,
  BookOpen,
  LifeBuoy,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { TranslationKey } from "@/lib/i18n/translations";

export type NavItem = {
  to: string;
  labelKey: TranslationKey;
  shortKey: TranslationKey;
  descriptionKey: TranslationKey;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    labelKey: "nav.home",
    shortKey: "navShort.home",
    descriptionKey: "brand.blurb",
    label: "Home",
    short: "Home",
    description: "Overview of every GramSahay service in one place.",
    icon: Home,
  },

  {
    to: "/assistant",
    labelKey: "nav.assistant",
    shortKey: "navShort.assistant",
    descriptionKey: "page.assistant.description",
    label: "AI Rural Assistant",
    short: "Assistant",
    description:
      "Ask anything in your language — farming, paperwork, schemes.",
    icon: Bot,
  },

  {
    to: "/crop-doctor",
    labelKey: "nav.cropDoctor",
    shortKey: "navShort.cropDoctor",
    descriptionKey: "page.cropDoctor.description",
    label: "AI Crop Doctor",
    short: "Crop Doctor",
    description:
      "Photograph a leaf and get a disease diagnosis with treatment.",
    icon: Stethoscope,
  },

  {
    to: "/schemes",
    labelKey: "nav.schemes",
    shortKey: "navShort.schemes",
    descriptionKey: "page.schemes.description",
    label: "Government Scheme Finder",
    short: "Schemes",
    description:
      "Match subsidies and welfare schemes to your exact profile.",
    icon: Landmark,
  },

  {
    to: "/weather",
    labelKey: "nav.weather",
    shortKey: "navShort.weather",
    descriptionKey: "page.weather.description",
    label: "Weather & Farming Advisory",
    short: "Weather",
    description:
      "7-day village forecast with sowing and spraying advice.",
    icon: CloudSun,
  },

  {
    to: "/market",
    labelKey: "nav.market",
    shortKey: "navShort.market",
    descriptionKey: "page.market.description",
    label: "Agricultural Market Prices",
    short: "Mandi Prices",
    description:
      "Live mandi rates, trends and best-selling windows.",
    icon: IndianRupee,
  },

  {
    to: "/report",
    labelKey: "nav.report",
    shortKey: "navShort.report",
    descriptionKey: "page.report.description",
    label: "Rural Issue Reporting",
    short: "Report Issue",
    description:
      "Report roads, water, power and health issues to officials.",
    icon: Megaphone,
  },

  {
    to: "/tracking",
    labelKey: "nav.report",
    shortKey: "navShort.report",
    descriptionKey: "page.report.description",
    label: "Track Report",
    short: "Track Report",
    description:
      "Check the status and progress of your submitted rural issue.",
    icon: Search,
  },

  {
    to: "/my-farm",
    labelKey: "nav.myFarm",
    shortKey: "navShort.myFarm",
    descriptionKey: "page.myFarm.description",
    label: "My Farm",
    short: "My Farm",
    description:
      "Your plots, crop calendar, expenses and yield records.",
    icon: Sprout,
  },

  {
    to: "/issue-map",
    labelKey: "nav.issueMap",
    shortKey: "navShort.issueMap",
    descriptionKey: "page.issueMap.description",
    label: "Issue Map",
    short: "Issue Map",
    description:
      "See what is broken and what is fixed across the district.",
    icon: Map,
  },

  {
    to: "/knowledge",
    labelKey: "nav.knowledge",
    shortKey: "navShort.knowledge",
    descriptionKey: "page.knowledge.description",
    label: "Knowledge Hub",
    short: "Knowledge",
    description:
      "Guides, videos and best practices in simple language.",
    icon: BookOpen,
  },

  {
    to: "/services",
    labelKey: "nav.services",
    shortKey: "navShort.services",
    descriptionKey: "page.services.description",
    label: "Essential Services",
    short: "Services",
    description:
      "Helplines, health centres, banks, transport and more.",
    icon: LifeBuoy,
  },

  {
    to: "/admin",
    labelKey: "nav.admin",
    shortKey: "navShort.admin",
    descriptionKey: "page.admin.description",
    label: "Admin Dashboard",
    short: "Admin",
    description:
      "District-level analytics and issue resolution tracking.",
    icon: ShieldCheck,
  },
];

export const featureItems = navItems.filter(
  (item) => item.to !== "/",
);