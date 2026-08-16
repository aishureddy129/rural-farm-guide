import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  AlertTriangle,
  Sprout,
  RefreshCw,
  MapPin,
  Thermometer,
  Umbrella,
  CloudFog,
} from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const states = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

const crops = ["Wheat", "Rice / Paddy", "Tomato", "Cotton", "Groundnut"];

const conditions = [
  { label: "Sunny", icon: Sun },
  { label: "Partly cloudy", icon: CloudSun },
  { label: "Cloudy", icon: CloudFog },
  { label: "Showers", icon: CloudRain },
  { label: "Thunderstorm", icon: CloudLightning },
  { label: "Clear", icon: Sun },
];

type DayForecast = {
  date: string;
  dayName: string;
  icon: typeof Sun;
  high: number;
  low: number;
  rain: number;
  humidity: number;
  wind: number;
  label: string;
};

function seedRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 9973;
  return () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
}

function buildForecast(state: string, district: string, seedOffset: number): DayForecast[] {
  const base = state + district + seedOffset;
  const rand = seedRandom(base);
  const today = new Date();
  const days: DayForecast[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const rain = Math.floor(rand() * 100);
    const conditionIndex =
      rain > 80 ? 4 : rain > 50 ? 3 : rain > 30 ? 2 : rain > 15 ? 1 : 0;
    const high = Math.floor(26 + rand() * 14);
    const low = high - Math.floor(7 + rand() * 6);
    const humidity = Math.floor(50 + rand() * 45);
    const wind = Math.floor(5 + rand() * 25);
    days.push({
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      dayName: i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      icon: conditions[conditionIndex].icon,
      high,
      low,
      rain,
      humidity,
      wind,
      label: conditions[conditionIndex].label,
    });
  }
  return days;
}

const cropAdvice: Record<
  string,
  {
    sowing: string;
    irrigation: string;
    fertilizer: string;
    pest: string;
    spraying: string;
    rain: string;
  }
> = {
  Wheat: {
    sowing: "Sow wheat when soil temperature is 15–22°C and the field is well-prepared after rice harvest.",
    irrigation: "Irrigate at crown-root stage and again at flowering. Avoid waterlogging after rain.",
    fertilizer: "Apply first split of 60 kg urea per acre at tillering stage if the forecast is dry.",
    pest: "Watch for yellow rust in cool humid spells; yellow-orange streaks on leaves need urgent spray.",
    spraying: "Foliar fungicide works best on dry, calm mornings with wind below 12 km/h.",
    rain: "Heavy rain after sowing can delay emergence and promote root rot; ensure field drainage.",
  },
  "Rice / Paddy": {
    sowing: "Transplant 20–25 day-old seedlings after monsoon rain fills the field.",
    irrigation: "Maintain 2–5 cm standing water during tillering and booting; drain before harvest.",
    fertilizer: "Avoid top-dressing nitrogen if heavy rain is expected in the next 48 hours.",
    pest: "Bacterial leaf blight spreads in warm humid weather; watch for water-soaked leaf tips.",
    spraying: "Do not spray within 6 hours of expected rain; use a sticker-spreader in drizzles.",
    rain: "Strong winds during rain can lodge the crop; keep fields at moderate water depth.",
  },
  Tomato: {
    sowing: "Sow nursery seeds in warm soil; transplant after danger of frost and heavy rain passes.",
    irrigation: "Drip irrigation at 6–8 mm daily gives the best yield and reduces fruit cracking.",
    fertilizer: "Top-dress with NPK 19:19:19 after fruit-set; pause before forecast rain.",
    pest: "Early blight and leaf curl thrive in humid weather; scout lower leaves twice a week.",
    spraying: "Apply fungicide early morning; avoid spraying when wind is above 15 km/h.",
    rain: "Sudden heavy rain causes fruit splitting and blossom-end rot; mulch beds to reduce splash.",
  },
  Cotton: {
    sowing: "Sow cotton when soil temperature stays above 20°C and monsoon is active but not flooding.",
    irrigation: "Irrigate during flowering and boll formation; reduce water after first flush.",
    fertilizer: "Apply 40 kg urea per acre at squaring stage; skip if heavy rain is expected.",
    pest: "Pink bollworm and whitefly peak in warm dry spells; monitor bolls for entry holes.",
    spraying: "Bollworm spray is effective on calm, rain-free days; spray before 9 AM.",
    rain: "Prolonged rain increases boll rot; ensure drainage and pick mature bolls quickly.",
  },
  Groundnut: {
    sowing: "Sow groundnut when soil moisture is adequate and 3–4 days of rain are not expected.",
    irrigation: "Critical irrigations at pegging and pod-filling; avoid during harvest.",
    fertilizer: "Apply gypsum at flowering and a light dose of DAP at 25 days after sowing.",
    pest: "Leaf miner and red hairy caterpillar appear in dry spells; inspect under the canopy.",
    spraying: "Foliar calcium and fungicide sprays should be done on dry, cloudy mornings.",
    rain: "Waterlogging during pod-filling causes root rot; build raised ridges and open drains.",
  },
};

function WeatherPage() {
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Nashik");
  const [crop, setCrop] = useState("Tomato");
  const [seedOffset, setSeedOffset] = useState(0);
  const [forecast, setForecast] = useState<DayForecast[]>(() => buildForecast("Maharashtra", "Nashik", 0));

  useEffect(() => {
    setForecast(buildForecast(state, district, seedOffset));
  }, [state, district, seedOffset]);

  const today = forecast[0];
  const maxRain = Math.max(...forecast.map((d) => d.rain));
  const maxTemp = Math.max(...forecast.map((d) => d.high));
  const anyRain = forecast.some((d) => d.rain >= 60);
  const dryDays = forecast.filter((d) => d.rain < 20).length;
  const highTempDays = forecast.filter((d) => d.high >= 38).length;

  const alerts = useMemo(() => {
    const list: { label: string; message: string; tone: "warning" | "info" | "success" }[] = [];
    if (maxRain >= 80) {
      list.push({
        label: "Heavy Rain Expected",
        message: "More than 80% rain chance in the coming week. Secure stored crops and clear drains.",
        tone: "warning",
      });
    }
    if (highTempDays >= 2) {
      list.push({
        label: "High Temperature",
        message: `${highTempDays} day(s) above 38°C. Avoid heavy field work at midday; irrigate sensitive crops.",
        tone: "warning",
      });
    }
    if (dryDays >= 3 && maxTemp < 38) {
      list.push({
        label: "Suitable for Irrigation",
        message: "Several dry, warm days ahead. Good window for basin or drip irrigation and fertilizer application.",
        tone: "success",
      });
    }
    if (anyRain) {
      list.push({
        label: "Avoid Spraying Before Rain",
        message: "Rain is expected within the next 7 days. Delay pesticide and foliar sprays until after the rain passes.",
        tone: "warning",
      });
    }
    if (list.length === 0) {
      list.push({
        label: "Normal Weather",
        message: "No strong weather extremes expected. Follow routine crop care and scout the field every 2–3 days.",
        tone: "info",
      });
    }
    return list;
  }, [forecast, maxRain, highTempDays, dryDays, maxTemp, anyRain]);

  const advice = cropAdvice[crop];

  return (
    <>
      <PageHeader
        icon={CloudSun}
        eyebrow="Hyperlocal forecast"
        title="Weather & Farming Advisory"
        description="Forecasts for your chosen village — translated into what you should do on the field this week."
      />
      <Section>
        <div className="mb-6 rounded-2xl border border-border bg-background p-5 shadow-soft md:p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="weather-state">State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger id="weather-state" aria-label="Select state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weather-district">District / Village</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="weather-district"
                  placeholder="e.g. Rampur, Nashik"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weather-crop">Crop</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger id="weather-crop" aria-label="Select crop">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => setSeedOffset((s) => s + 1)}>
                <RefreshCw className="mr-2 size-4" />
                Refresh Forecast
              </Button>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-warning/30 bg-warning/10 p-4">
            <p className="text-sm font-semibold text-warning-foreground">
              Demo forecast — connect to a live weather service in the future.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The data shown here is simulated for demonstration. Do not use it for real-time farming decisions without checking IMD or a trusted local source.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="gradient-canopy border-0 text-primary-foreground shadow-lift">
            <CardContent className="p-8">
              <p className="text-sm uppercase tracking-widest text-primary-foreground/80">
                {district}, {state}
              </p>
              <div className="mt-3 flex items-end gap-4">
                <span className="text-6xl font-semibold">{today.high}°</span>
                <div className="pb-2">
                  <p className="text-lg font-medium">{today.label}</p>
                  <p className="text-sm text-primary-foreground/80">
                    Feels like {today.high + 3}° · Low {today.low}°
                  </p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div className="rounded-2xl bg-background/15 p-4">
                  <Droplets className="size-4" />
                  <p className="mt-2 font-semibold">{today.humidity}%</p>
                  <p className="text-primary-foreground/80">Humidity</p>
                </div>
                <div className="rounded-2xl bg-background/15 p-4">
                  <Wind className="size-4" />
                  <p className="mt-2 font-semibold">{today.wind} km/h</p>
                  <p className="text-primary-foreground/80">Wind</p>
                </div>
                <div className="rounded-2xl bg-background/15 p-4">
                  <CloudRain className="size-4" />
                  <p className="mt-2 font-semibold">{today.rain}%</p>
                  <p className="text-primary-foreground/80">Rain chance</p>
                </div>
                <div className="rounded-2xl bg-background/15 p-4">
                  <Thermometer className="size-4" />
                  <p className="mt-2 font-semibold">{today.low}°</p>
                  <p className="text-primary-foreground/80">Low</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/40 shadow-soft">
            <CardHeader className="flex-row items-center gap-3">
              <AlertTriangle className="size-5 text-warning" />
              <CardTitle className="text-base">Active alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.slice(0, 2).map((a) => (
                <Badge
                  key={a.label}
                  className={
                    a.tone === "success"
                      ? "bg-success text-success-foreground hover:bg-success"
                      : "bg-warning text-warning-foreground hover:bg-warning"
                  }
                >
                  {a.label}
                </Badge>
              ))}
              <p className="text-sm text-muted-foreground">
                {alerts[0].message}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {forecast.map((d) => (
            <Card key={d.dayName + d.date} className="card-hover text-center shadow-soft">
              <CardContent className="p-5">
                <p className="text-sm font-semibold">{d.dayName}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
                <d.icon className="mx-auto mt-3 size-7 text-primary" />
                <p className="mt-3 text-lg font-semibold">
                  {d.high}° <span className="text-sm text-muted-foreground">/ {d.low}°</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{d.label}</p>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center justify-center gap-1">
                    <Umbrella className="size-3" /> {d.rain}%
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <Droplets className="size-3" /> {d.humidity}%
                  </p>
                  <p className="flex items-center justify-center gap-1">
                    <Wind className="size-3" /> {d.wind} km/h
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Today's farming advice" description={`Generated for ${crop} in ${district}.`}>
        <div className="grid gap-5 lg:grid-cols-3">
          {alerts.map((a) => (
            <Card key={a.label} className="shadow-soft">
              <CardHeader>
                <span
                  className={`flex size-10 items-center justify-center rounded-2xl ${
                    a.tone === "success"
                      ? "bg-success/20 text-success"
                      : a.tone === "info"
                      ? "bg-primary/10 text-primary"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {a.tone === "success" ? (
                    <Sprout className="size-5" />
                  ) : a.tone === "info" ? (
                    <CloudSun className="size-5" />
                  ) : (
                    <AlertTriangle className="size-5" />
                  )}
                </span>
                <CardTitle className="mt-3 text-base">{a.label}</CardTitle>
                <CardDescription>{a.message}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Crop-specific advisory" description={`Sowing, irrigation, pest and spraying guidance for ${crop}.`}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Sowing advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.sowing}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Irrigation advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.irrigation}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Fertilizer advice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.fertilizer}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Pest / disease precaution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.pest}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Spraying recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.spraying}</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Rain warning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{advice.rain}</p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
