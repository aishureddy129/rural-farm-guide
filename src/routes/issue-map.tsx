import { createFileRoute } from "@tanstack/react-router";
import { Map, MapPin, Filter } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/issue-map")({
  head: () => ({
    meta: [
      { title: "Issue Map — GramSahay AI" },
      {
        name: "description",
        content:
          "A live district map of reported rural issues — what is open, in progress, escalated and resolved.",
      },
      { property: "og:title", content: "Issue Map — GramSahay AI" },
      {
        property: "og:description",
        content: "See village issues geographically and hold departments accountable.",
      },
    ],
  }),
  component: IssueMapPage,
});

const pins = [
  { id: "GS-2418", title: "Hand pump dry", village: "Rampur", status: "In progress", top: "28%", left: "34%" },
  { id: "GS-2411", title: "Road washed out", village: "Kolwadi", status: "Escalated", top: "56%", left: "58%" },
  { id: "GS-2402", title: "Transformer failure", village: "Sinnar", status: "Resolved", top: "42%", left: "72%" },
  { id: "GS-2396", title: "Anganwadi ration delay", village: "Devgaon", status: "Open", top: "68%", left: "26%" },
  { id: "GS-2390", title: "Canal breach", village: "Pimpalgaon", status: "In progress", top: "18%", left: "63%" },
];

const tone: Record<string, string> = {
  Resolved: "bg-success text-success-foreground hover:bg-success",
  "In progress": "bg-sky text-sky-foreground hover:bg-sky",
  Escalated: "bg-destructive text-destructive-foreground hover:bg-destructive",
  Open: "bg-warning text-warning-foreground hover:bg-warning",
};

const dot: Record<string, string> = {
  Resolved: "bg-success",
  "In progress": "bg-sky",
  Escalated: "bg-destructive",
  Open: "bg-warning",
};

const counts = [
  { label: "Open", value: 34 },
  { label: "In progress", value: 21 },
  { label: "Escalated", value: 7 },
  { label: "Resolved (30d)", value: 118 },
];

function IssueMapPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        icon={Map}
        eyebrow={t("page.issueMap.eyebrow")}
        title={t("nav.issueMap")}
        description={t("page.issueMap.description")}
        actions={
          <Button size="lg" variant="secondary">
            <Filter className="size-4" /> Filter by category
          </Button>
        }
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {counts.map((c) => (
            <Card key={c.label} className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-3xl font-semibold">{c.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="overflow-hidden shadow-soft">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base">District view</CardTitle>
              <CardDescription>Interactive map integration comes in a later step.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="gradient-field relative h-[420px] w-full">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px]" />
                {pins.map((p) => (
                  <div
                    key={p.id}
                    className="absolute -translate-x-1/2 -translate-y-full text-center"
                    style={{ top: p.top, left: p.left }}
                  >
                    <span
                      className={`mx-auto flex size-8 items-center justify-center rounded-full text-background shadow-lift ${dot[p.status]}`}
                    >
                      <MapPin className="size-4" />
                    </span>
                    <span className="mt-1 block rounded-md bg-background/90 px-2 py-0.5 text-[11px] font-medium shadow-soft">
                      {p.village}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Pinned issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pins.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.id} · {p.village}
                    </p>
                  </div>
                  <Badge className={tone[p.status]}>{p.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
