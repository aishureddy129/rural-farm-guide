import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  CloudSun,
  Home,
  IndianRupee,
  Landmark,
  Leaf,
  Map,
  Menu,
  Megaphone,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";

import {
  languages,
  useI18n,
  type LanguageCode,
} from "@/lib/i18n";

type NavItem = {
  to:
    | "/"
    | "/assistant"
    | "/crop-doctor"
    | "/schemes"
    | "/weather"
    | "/market"
    | "/report"
    | "/my-farm"
    | "/issue-map"
    | "/knowledge"
    | "/services"
    | "/tracking";

  labelKey:
    | "nav.home"
    | "nav.assistant"
    | "nav.cropDoctor"
    | "nav.schemes"
    | "nav.weather"
    | "nav.market"
    | "nav.report"
    | "nav.myFarm"
    | "nav.issueMap"
    | "nav.knowledge"
    | "nav.services"
    | "nav.trackReport";

  shortKey:
    | "navShort.home"
    | "navShort.assistant"
    | "navShort.cropDoctor"
    | "navShort.schemes"
    | "navShort.weather"
    | "navShort.market"
    | "navShort.report"
    | "navShort.myFarm"
    | "navShort.issueMap"
    | "navShort.knowledge"
    | "navShort.services"
    | "navShort.trackReport";

  icon: typeof Home;
};

const navItems: NavItem[] = [
  {
    to: "/",
    labelKey: "nav.home",
    shortKey: "navShort.home",
    icon: Home,
  },
  {
    to: "/assistant",
    labelKey: "nav.assistant",
    shortKey: "navShort.assistant",
    icon: Leaf,
  },
  {
    to: "/crop-doctor",
    labelKey: "nav.cropDoctor",
    shortKey: "navShort.cropDoctor",
    icon: Leaf,
  },
  {
    to: "/schemes",
    labelKey: "nav.schemes",
    shortKey: "navShort.schemes",
    icon: Landmark,
  },
  {
    to: "/weather",
    labelKey: "nav.weather",
    shortKey: "navShort.weather",
    icon: CloudSun,
  },
  {
    to: "/market",
    labelKey: "nav.market",
    shortKey: "navShort.market",
    icon: IndianRupee,
  },
  {
    to: "/report",
    labelKey: "nav.report",
    shortKey: "navShort.report",
    icon: Megaphone,
  },
  {
    to: "/my-farm",
    labelKey: "nav.myFarm",
    shortKey: "navShort.myFarm",
    icon: Leaf,
  },
  {
    to: "/issue-map",
    labelKey: "nav.issueMap",
    shortKey: "navShort.issueMap",
    icon: Map,
  },
  {
    to: "/knowledge",
    labelKey: "nav.knowledge",
    shortKey: "navShort.knowledge",
    icon: BookOpen,
  },
  {
    to: "/services",
    labelKey: "nav.services",
    shortKey: "navShort.services",
    icon: Phone,
  },
  {
    to: "/tracking",
    labelKey: "nav.trackReport",
    shortKey: "navShort.trackReport",
    icon: Search,
  },
];

export function SiteHeader() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * This helper keeps Track Report working even if the
   * TranslationKey union in translations.ts has not refreshed yet.
   */
  const translate = (key: string): string => {
    return (t as (key: string) => string)(key);
  };

  const primaryNav = navItems.slice(0, 6);

  function handleLanguageChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    setLang(event.target.value as LanguageCode);
  }

  function isActive(path: string) {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
            <Leaf className="size-5" />
          </div>

          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-base font-bold text-foreground">
              {t("brand.name")}
            </div>

            <div className="truncate text-xs text-muted-foreground">
              {t("brand.tagline")}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="size-4" />

                <span>
                  {translate(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Language selector */}
          <div className="hidden sm:block">
            <select
              value={lang}
              onChange={handleLanguageChange}
              aria-label={t("common.language")}
              className="h-9 rounded-lg border bg-background px-2 text-sm text-foreground outline-none transition focus:border-primary"
            >
              {languages.map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                >
                  {language.native}
                </option>
              ))}
            </select>
          </div>

          {/* Ask AI */}
          <Link
            to="/assistant"
            className="hidden rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:inline-flex"
          >
            {t("common.askAi")}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-lg border bg-background text-foreground transition hover:bg-muted lg:hidden"
            aria-label={t("common.menu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Hamburger Menu */}
      {menuOpen && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    <Icon className="size-5 shrink-0" />

                    <span>
                      {translate(item.labelKey)}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile language selector */}
            <div className="mt-4 border-t pt-4 sm:hidden">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                {t("common.language")}
              </label>

              <select
                value={lang}
                onChange={handleLanguageChange}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              >
                {languages.map((language) => (
                  <option
                    key={language.code}
                    value={language.code}
                  >
                    {language.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Ask AI */}
            <Link
              to="/assistant"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              {t("common.askAi")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}