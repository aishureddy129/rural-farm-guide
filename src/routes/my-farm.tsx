import { createFileRoute } from "@tanstack/react-router";
import { Sprout, Ruler, Wallet, CalendarDays } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/my-farm")({
  head: () => ({
    meta: [
      { title: "My Farm — GramSahay AI" },
      {
        name: "description",
        content:
          "Track your plots, crop calendar, input expenses and expected yield in one simple farm record.",
      },
      { property: "og:title", content: "My Farm — GramSahay AI" },
      {
        property: "og:description",
        content: "A digital record of your land, crops, costs and harvests.",
      },
    ],
  }),
  component: MyFarmPage,
});

const summary = [
  { icon: Ruler, label: "Total land", value: "4.6 acres", sub: "3 plots registered" },
  { icon: Sprout, label: "Active crops", value: "3", sub: "Onion, soybean, wheat" },
  { icon: Wallet, label: "Season spend", value: "₹86,400", sub: "Seed, fertiliser, labour" },
  { icon: CalendarDays, label: "Next harvest", value: "22 Sep", sub: "Onion — Plot A" },
];

const plots = [
  { name: "Plot A — Canal side", size: "2.1 acres", crop: "Onion", sown: "12 Jun", progress: 74, soil: "Black cotton" },
  { name: "Plot B — Upper field", size: "1.6 acres", crop: "Soybean", sown: "28 Jun", progress: 58, soil: "Loamy" },
  { name: "Plot C — Near well", size: "0.9 acres", crop: "Wheat (planned)", sown: "Nov (planned)", progress: 8, soil: "Sandy loam" },
];

const expenses = [
  { item: "Onion seed (Nashik red)", amount: 18500, date: "08 Jun" },
  { item: "DAP + urea", amount: 24200, date: "21 Jun" },
  { item: "Labour — weeding", amount: 14800, date: "10 Jul" },
  { item: "Drip pipe repair", amount: 6300, date: "02 Aug" },
  { item: "Fungicide spray", amount: 9600, date: "09 Aug" },
];

const tasks = [
  { task: "Second irrigation — Plot A", due: "16 Aug", tag: "Irrigation" },
  { task: "Pod-borer scouting — Plot B", due: "18 Aug", tag: "Pest watch" },
  { task: "Soil test sample — Plot C", due: "24 Aug", tag: "Soil" },
  { task: "Book harvest labour", due: "12 Sep", tag: "Harvest" },
];

function MyFarmPage() {
  return (
    <>
      <PageHeader
        icon={Sprout}
        eyebrow="Farm record"
        title="My Farm"
        description="Ramesh Patil · Rampur, Nashik. Keep every plot, cost and crop stage in one place so advice and subsidies fit your real land."
        actions={<Button size="lg" variant="secondary">Add a plot</Button>}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((s) => (
            <Card key={s.label} className="card-hover shadow-soft">
              <CardHeader className="pb-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <s.icon className="size-5" />
                </span>
                <CardDescription className="pt-3">{s.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Tabs defaultValue="plots">
          <TabsList>
            <TabsTrigger value="plots">Plots</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="plots" className="mt-6 grid gap-5 lg:grid-cols-3">
            {plots.map((p) => (
              <Card key={p.name} className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>
                    {p.size} · {p.soil}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{p.crop}</Badge>
                    <span className="text-xs text-muted-foreground">Sown {p.sown}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Season progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} className="mt-2 h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="mt-6 grid gap-4 sm:grid-cols-2">
            {tasks.map((t) => (
              <Card key={t.task} className="shadow-soft">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium">{t.task}</p>
                    <p className="text-sm text-muted-foreground">Due {t.due}</p>
                  </div>
                  <Badge variant="outline">{t.tag}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <Card className="shadow-soft">
              <CardContent className="divide-y divide-border p-0">
                {expenses.map((e) => (
                  <div key={e.item} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="font-medium">{e.item}</p>
                      <p className="text-sm text-muted-foreground">{e.date}</p>
                    </div>
                    <p className="font-semibold">₹{e.amount.toLocaleString("en-IN")}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-secondary/50 px-6 py-4">
                  <p className="font-semibold">Total this season</p>
                  <p className="font-semibold">
                    ₹{expenses.reduce((a, b) => a + b.amount, 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  );
}
