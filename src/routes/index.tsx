import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Languages, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero-fields.jpg";
import { featureItems } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GramSahay AI — Smart Rural Assistance Platform" },
      {
        name: "description",
        content:
          "One platform for rural India: AI assistant, crop disease diagnosis, scheme finder, weather advisory, mandi prices and civic issue reporting.",
      },
      { property: "og:title", content: "GramSahay AI — Smart Rural Assistance Platform" },
      {
        property: "og:description",
        content:
          "AI-powered help for farmers and villages — crops, schemes, weather, market prices and civic issues.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "12", label: "Connected services" },
  { value: "22", label: "Languages planned" },
  { value: "1,480", label: "Demo farm records" },
  { value: "94%", label: "Issues routed < 48h" },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Answers, not paperwork",
    text: "Ask in plain words and get a clear next step, the right form and the right office.",
  },
  {
    icon: Languages,
    title: "Built for every village",
    text: "Voice-first, low-bandwidth and local-language interfaces designed for shared phones.",
  },
  {
    icon: Users,
    title: "Community accountability",
    text: "Village issues are mapped, tracked publicly and escalated to block officials.",
  },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Farmer walking along terraced paddy fields at sunrise"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <Badge className="bg-background/90 text-foreground hover:bg-background">
            Smart Rural Assistance Platform
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold text-background sm:text-5xl lg:text-6xl">
            Every answer a village needs, in one trusted place.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-background/85">
            GramSahay AI brings crop diagnosis, government schemes, weather advice, mandi prices
            and civic issue reporting together for farmers and rural families.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/assistant">
                Talk to the AI Assistant <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/crop-doctor">Diagnose my crop</Link>
            </Button>
          </div>
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-semibold text-background">{s.value}</dt>
                <dd className="mt-1 text-sm text-background/75">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">Explore the platform</h2>
          <p className="mt-2 text-muted-foreground">
            Eleven connected services covering the full rural journey — from seed to sale, and
            from complaint to resolution.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((item) => (
            <Link key={item.to} to={item.to} className="block">
              <Card className="card-hover h-full border-border/70 shadow-soft">
                <CardHeader>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-4 text-lg">{item.label}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Open <ArrowRight className="size-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-soft">
                <h.icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Card className="gradient-canopy overflow-hidden border-0 text-primary-foreground shadow-lift">
          <CardContent className="flex flex-col gap-6 p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Bring your panchayat onto GramSahay
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/90">
                {[
                  "Public issue map with resolution timelines",
                  "Scheme eligibility screening for every household",
                  "Weekly crop advisory pushed to every farmer",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link to="/admin">View Admin Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
