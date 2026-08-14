import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, Droplets, Wind, Sun, CloudRain, AlertTriangle, Sprout } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather & Farming Advisory — GramSahay AI" },
      {
        name: "description",
        content:
          "Village-level 7-day forecasts with sowing, irrigation and spraying advisories plus severe weather alerts.",
      },
      { property: "og:title", content: "Weather & Farming Advisory — GramSahay AI" },
      {
        property: "og:description",
        content: "Hyperlocal forecasts translated into practical farm actions.",
      },
    ],
  }),
  component: WeatherPage,
});

const forecast = [
  { day: "Today", icon: Sun, high: 34, low: 23, rain: 10, label: "Sunny" },
  { day: "Sat", icon: CloudSun, high: 33, low: 23, rain: 20, label: "Partly cloudy" },
  { day: "Sun", icon: CloudRain, high: 30, low: 22, rain: 70, label: "Showers" },
  { day: "Mon", icon: CloudRain, high: 28, low: 22, rain: 85, label: "Heavy rain" },
  { day: "Tue", icon: CloudSun, high: 31, low: 22, rain: 35, label: "Cloudy" },
  { day: "Wed", icon: Sun, high: 33, low: 23, rain: 10, label: "Clear" },
  { day: "Thu", icon: Sun, high: 34, low: 24, rain: 5, label: "Clear" },
];

const advisories = [
  {
    title: "Delay urea top-dressing",
    text: "Heavy rain expected Sunday–Monday. Apply nitrogen only after Tuesday to avoid runoff loss.",
    tone: "warning" as const,
  },
  {
    title: "Good sowing window for moong",
    text: "Soil moisture after Monday's rain will be ideal for green gram sowing from Wednesday.",
    tone: "success" as const,
  },
  {
    title: "Avoid pesticide spraying",
    text: "Wind speeds above 18 km/h on Saturday will cause drift and wash-off.",
    tone: "warning" as const,
  },
];

function WeatherPage() {
  return (
    <>
      <PageHeader
        icon={CloudSun}
        eyebrow="Hyperlocal forecast"
        title="Weather & Farming Advisory"
        description="Forecasts for Rampur village, Nashik block — translated into what you should do on the field this week."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="gradient-canopy border-0 text-primary-foreground shadow-lift">
            <CardContent className="p-8">
              <p className="text-sm uppercase tracking-widest text-primary-foreground/80">
                Rampur, Nashik
              </p>
              <div className="mt-3 flex items-end gap-4">
                <span className="text-6xl font-semibold">34°</span>
                <div className="pb-2">
                  <p className="text-lg font-medium">Sunny</p>
                  <p className="text-sm text-primary-foreground/80">Feels like 37° · Low 23°</p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                <div className="rounded-2xl bg-background/15 p-4">
                  <Droplets className="size-4" />
                  <p className="mt-2 font-semibold">62%</p>
                  <p className="text-primary-foreground/80">Humidity</p>
                </div>
                <div className="rounded-2xl bg-background/15 p-4">
                  <Wind className="size-4" />
                  <p className="mt-2 font-semibold">12 km/h</p>
                  <p className="text-primary-foreground/80">Wind</p>
                </div>
                <div className="rounded-2xl bg-background/15 p-4">
                  <CloudRain className="size-4" />
                  <p className="mt-2 font-semibold">10%</p>
                  <p className="text-primary-foreground/80">Rain chance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/40 shadow-soft">
            <CardHeader className="flex-row items-center gap-3">
              <AlertTriangle className="size-5 text-warning" />
              <CardTitle className="text-base">Active alert</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge className="bg-warning text-warning-foreground hover:bg-warning">
                Orange alert · Mon 17 Aug
              </Badge>
              <p className="text-sm text-muted-foreground">
                IMD forecasts 70–110 mm rainfall in 24 hours across Nashik and Dindori blocks.
                Harvest ready onion, secure stored fodder and clear field drains before Sunday
                evening.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {forecast.map((d) => (
            <Card key={d.day} className="card-hover text-center shadow-soft">
              <CardContent className="p-5">
                <p className="text-sm font-semibold">{d.day}</p>
                <d.icon className="mx-auto mt-3 size-7 text-primary" />
                <p className="mt-3 text-lg font-semibold">
                  {d.high}° <span className="text-sm text-muted-foreground">/ {d.low}°</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{d.label}</p>
                <p className="mt-2 text-xs font-medium text-sky">{d.rain}% rain</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="This week's farm advisory" description="Generated for your registered crops: onion, soybean, wheat.">
        <div className="grid gap-5 lg:grid-cols-3">
          {advisories.map((a) => (
            <Card key={a.title} className="shadow-soft">
              <CardHeader>
                <span
                  className={`flex size-10 items-center justify-center rounded-2xl ${
                    a.tone === "warning"
                      ? "bg-warning/20 text-warning-foreground"
                      : "bg-success/20 text-success"
                  }`}
                >
                  {a.tone === "warning" ? (
                    <AlertTriangle className="size-5" />
                  ) : (
                    <Sprout className="size-5" />
                  )}
                </span>
                <CardTitle className="mt-3 text-base">{a.title}</CardTitle>
                <CardDescription>{a.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
