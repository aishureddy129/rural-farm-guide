import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="gradient-field border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="gradient-canopy flex size-11 items-center justify-center rounded-2xl text-primary-foreground shadow-soft">
              <Icon className="size-5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base text-muted-foreground">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {title ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          {description ? (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
