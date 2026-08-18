import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { featureItems } from "@/lib/nav";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="gradient-canopy flex size-9 items-center justify-center rounded-xl text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-lg font-semibold">{t("brand.name")}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t("brand.blurb")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {featureItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {t("brand.name")} · {t("footer.note")}
      </div>
    </footer>
  );
}
