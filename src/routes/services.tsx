import { createFileRoute } from "@tanstack/react-router";
import {
  LifeBuoy,
  Phone,
  HeartPulse,
  Landmark,
  Bus,
  GraduationCap,
  Tractor,
  Shield,
  Flame,
} from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Essential Services — GramSahay AI" },
      {
        name: "description",
        content:
          "Helplines, health centres, banks, transport, veterinary and emergency contacts for your village and block.",
      },
      { property: "og:title", content: "Essential Services — GramSahay AI" },
      {
        property: "og:description",
        content: "Every important rural contact and facility in one directory.",
      },
    ],
  }),
  component: ServicesPage,
});

const helplines = [
  { icon: Phone, name: "Kisan Call Centre", number: "1800-180-1551", note: "Agri advice, 6am–10pm" },
  { icon: HeartPulse, name: "Ambulance", number: "108", note: "24×7 emergency" },
  { icon: Shield, name: "Police", number: "100", note: "24×7" },
  { icon: Flame, name: "Fire & rescue", number: "101", note: "24×7" },
];

const facilities = [
  {
    icon: HeartPulse,
    title: "Primary Health Centre, Rampur",
    detail: "OPD 9am–2pm · Doctor Mon–Sat · 4.2 km",
    tag: "Health",
  },
  {
    icon: Landmark,
    title: "Bank of Maharashtra, Sinnar branch",
    detail: "KCC, PM-Kisan enrolment · 9.6 km",
    tag: "Banking",
  },
  {
    icon: Tractor,
    title: "Custom Hiring Centre",
    detail: "Tractor ₹700/hr, rotavator ₹450/hr · 3.1 km",
    tag: "Machinery",
  },
  {
    icon: Bus,
    title: "ST Bus Stand, Sinnar",
    detail: "Nashik every 30 min from 5:30am · 9.2 km",
    tag: "Transport",
  },
  {
    icon: GraduationCap,
    title: "Zilla Parishad School",
    detail: "Class 1–8 · Mid-day meal · 1.4 km",
    tag: "Education",
  },
  {
    icon: HeartPulse,
    title: "Veterinary Dispensary",
    detail: "Cattle care Tue & Fri camps · 5.8 km",
    tag: "Livestock",
  },
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        icon={LifeBuoy}
        eyebrow="Directory"
        title="Essential Services"
        description="The numbers and places rural families actually need — emergency helplines, health, banking, transport, machinery and livestock support near you."
      />
      <Section title="Emergency helplines">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {helplines.map((h) => (
            <Card key={h.name} className="card-hover shadow-soft">
              <CardHeader className="pb-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <h.icon className="size-5" />
                </span>
                <CardTitle className="mt-3 text-base">{h.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">{h.number}</p>
                <p className="text-xs text-muted-foreground">{h.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Nearby facilities" description="Rampur village, Sinnar block, Nashik district.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <Card key={f.title} className="card-hover shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <f.icon className="size-5" />
                  </span>
                  <Badge variant="secondary">{f.tag}</Badge>
                </div>
                <CardTitle className="mt-3 text-base leading-snug">{f.title}</CardTitle>
                <CardDescription>{f.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
