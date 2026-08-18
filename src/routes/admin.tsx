import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Users, FileWarning, Timer, CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — GramSahay AI" },
      {
        name: "description",
        content:
          "District analytics for issue resolution, scheme uptake, AI usage and village engagement.",
      },
      { property: "og:title", content: "Admin Dashboard — GramSahay AI" },
      {
        property: "og:description",
        content: "Monitor rural service delivery and departmental performance.",
      },
    ],
  }),
  component: AdminPage,
});

const kpis = [
  { icon: Users, label: "Registered users", value: "12,486", delta: "+8.2% this month" },
  { icon: FileWarning, label: "Open issues", value: "62", delta: "-11 vs last week" },
  { icon: Timer, label: "Avg. resolution", value: "5.4 days", delta: "target 7 days" },
  { icon: CheckCircle2, label: "Resolution rate", value: "88%", delta: "+3 pts" },
];

const departments = [
  { name: "Water Supply", open: 18, resolved: 74, sla: 82 },
  { name: "Public Works (Roads)", open: 21, resolved: 58, sla: 64 },
  { name: "Electricity Board", open: 9, resolved: 96, sla: 91 },
  { name: "Health & Sanitation", open: 8, resolved: 63, sla: 77 },
  { name: "Education", open: 6, resolved: 41, sla: 88 },
];

const queue = [
  { id: "GS-2411", issue: "Approach road washed out", village: "Kolwadi", dept: "Public Works", age: "9d", priority: "High" },
  { id: "GS-2418", issue: "Hand pump dry, Ward 3", village: "Rampur", dept: "Water Supply", age: "3d", priority: "Medium" },
  { id: "GS-2405", issue: "Canal breach near culvert", village: "Pimpalgaon", dept: "Irrigation", age: "6d", priority: "High" },
  { id: "GS-2396", issue: "Anganwadi ration delay", village: "Devgaon", dept: "Health", age: "1d", priority: "Medium" },
  { id: "GS-2388", issue: "Street lights out on main lane", village: "Sinnar", dept: "Electricity", age: "4d", priority: "Low" },
];

const usage = [
  { label: "AI Assistant queries", value: 8420, pct: 100 },
  { label: "Crop Doctor scans", value: 3160, pct: 38 },
  { label: "Scheme eligibility checks", value: 2740, pct: 33 },
  { label: "Mandi price lookups", value: 5180, pct: 62 },
];

const priorityTone: Record<string, string> = {
  High: "bg-destructive text-destructive-foreground hover:bg-destructive",
  Medium: "bg-warning text-warning-foreground hover:bg-warning",
  Low: "bg-secondary text-secondary-foreground hover:bg-secondary",
};

function AdminPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        icon={ShieldCheck}
        eyebrow={t("page.admin.eyebrow")}
        title={t("nav.admin")}
        description={t("page.admin.description")}
        actions={<Badge variant="secondary" className="h-9 px-4 text-sm">Demo data · Aug 2026</Badge>}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label} className="card-hover shadow-soft">
              <CardHeader className="pb-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <k.icon className="size-5" />
                </span>
                <CardDescription className="pt-3">{k.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.delta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Department performance</CardTitle>
              <CardDescription>SLA compliance over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {departments.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{d.name}</span>
                    <span className="text-muted-foreground">
                      {d.open} open · {d.resolved} resolved
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={d.sla} className="h-2" />
                    <span className="w-10 text-right text-xs font-medium">{d.sla}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Platform usage</CardTitle>
              <CardDescription>Interactions this month across services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {usage.map((u) => (
                <div key={u.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{u.label}</span>
                    <span className="text-muted-foreground">
                      {u.value.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Progress value={u.pct} className="mt-2 h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Escalation queue" description="Issues nearing or past their service-level deadline.">
        <Card className="shadow-soft">
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queue.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-medium">{q.id}</TableCell>
                    <TableCell>{q.issue}</TableCell>
                    <TableCell className="text-muted-foreground">{q.village}</TableCell>
                    <TableCell className="text-muted-foreground">{q.dept}</TableCell>
                    <TableCell className="text-muted-foreground">{q.age}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={priorityTone[q.priority]}>{q.priority}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
