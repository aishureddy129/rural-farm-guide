import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Leaf, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

const primaryNav = navItems.slice(0, 6);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useT();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="gradient-canopy flex size-9 items-center justify-center rounded-xl text-primary-foreground shadow-soft">
            <Leaf className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">{t("brand.name")}</span>
            <span className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {t("brand.tagline")}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {t(item.shortKey)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <LanguageSelector />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/assistant">{t("common.askAi")}</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={t("common.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-card lg:border-t-0",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              <item.icon className="size-4 text-primary" />
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
