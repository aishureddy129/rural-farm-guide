import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Camera, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Rural Issue Reporting — GramSahay AI" },
      {
        name: "description",
        content:
          "Report broken roads, water shortages, power cuts and health gaps with photo and location, and track official resolution.",
      },
      { property: "og:title", content: "Rural Issue Reporting — GramSahay AI" },
      {
        property: "og:description",
        content: "File village civic complaints and follow them to resolution.",
      },
    ],
  }),
  component: ReportPage,
});

const categories = [
  "Road & bridge",
  "Drinking water",
  "Electricity",
  "Health & sanitation",
  "School & anganwadi",
  "Irrigation canal",
  "Ration & PDS",
  "Other",
];

const recent = [
  {
    id: "GS-2418",
    title: "Hand pump dry near Ward 3",
    category: "Drinking water",
    village: "Rampur",
    status: "In progress",
    days: 3,
  },
  {
    id: "GS-2411",
    title: "Approach road washed out after rain",
    category: "Road & bridge",
    village: "Kolwadi",
    status: "Escalated",
    days: 9,
  },
  {
    id: "GS-2402",
    title: "Transformer failure — 40 houses dark",
    category: "Electricity",
    village: "Sinnar",
    status: "Resolved",
    days: 2,
  },
  {
    id: "GS-2396",
    title: "Anganwadi ration not delivered",
    category: "Ration & PDS",
    village: "Devgaon",
    status: "Open",
    days: 1,
  },
];

const statusTone: Record<string, string> = {
  Resolved: "bg-success hover:bg-success text-success-foreground",
  "In progress": "bg-sky hover:bg-sky text-sky-foreground",
  Escalated: "bg-destructive hover:bg-destructive text-destructive-foreground",
  Open: "bg-warning hover:bg-warning text-warning-foreground",
};

function ReportPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        icon={Megaphone}
        eyebrow={t("page.report.eyebrow")}
        title={t("nav.report")}
        description={t("page.report.description")}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">File a new report</CardTitle>
              <CardDescription>Submission will be connected to the backend next.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue title</Label>
                  <Input id="title" placeholder="e.g. Street light not working" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="village">Village / ward</Label>
                  <Input id="village" placeholder="Rampur, Ward 3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact number</Label>
                  <Input id="phone" placeholder="+91 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Describe the problem</Label>
                <Textarea id="desc" rows={5} placeholder="What is wrong, since when, who is affected?" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" type="button">
                  <Camera className="size-4" /> Add photo
                </Button>
                <Button variant="outline" type="button">
                  <MapPin className="size-4" /> Use my location
                </Button>
                <Button type="button" className="sm:ml-auto">
                  Submit report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { t: "Report", d: "Add a photo, location and short description." },
                { t: "Route", d: "AI classifies the issue and sends it to the right department." },
                { t: "Track", d: "Follow status updates with your GS tracking ID." },
                { t: "Escalate", d: "Unresolved after 7 days? It escalates to the block officer." },
              ].map((s, i) => (
                <div key={s.t} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Recent reports in your block">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recent.map((r) => (
            <Card key={r.id} className="card-hover shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>{r.id}</CardDescription>
                  <Badge className={statusTone[r.status]}>{r.status}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">{r.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {r.category} · {r.village} · {r.days}d ago
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
