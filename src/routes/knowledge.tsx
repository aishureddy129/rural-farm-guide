import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, PlayCircle, Clock, Search } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub — GramSahay AI" },
      {
        name: "description",
        content:
          "Practical farming and rural-living guides, short videos and FAQs in simple local language.",
      },
      { property: "og:title", content: "Knowledge Hub — GramSahay AI" },
      {
        property: "og:description",
        content: "Learn better practices for soil, water, livestock, finance and health.",
      },
    ],
  }),
  component: KnowledgePage,
});

const topics = ["Soil health", "Water saving", "Organic inputs", "Livestock", "Post-harvest", "Rural finance", "Women & SHG", "Health"];

const guides = [
  { title: "Making quality vermicompost in 45 days", topic: "Organic inputs", mins: 6, level: "Beginner" },
  { title: "Drip irrigation layout for 1 acre onion", topic: "Water saving", mins: 9, level: "Intermediate" },
  { title: "Reading your Soil Health Card correctly", topic: "Soil health", mins: 5, level: "Beginner" },
  { title: "Preventing mastitis in dairy cattle", topic: "Livestock", mins: 7, level: "Intermediate" },
  { title: "Storing onion to cut 30% losses", topic: "Post-harvest", mins: 8, level: "Beginner" },
  { title: "How a self-help group gets a bank loan", topic: "Rural finance", mins: 10, level: "Beginner" },
];

const videos = [
  { title: "Seed treatment before kharif sowing", dur: "4:12", lang: "हिन्दी" },
  { title: "Identifying fall armyworm early", dur: "6:38", lang: "मराठी" },
  { title: "Filling the PM-Fasal Bima form", dur: "8:05", lang: "हिन्दी" },
];

const faqs = [
  {
    q: "How often should I test my soil?",
    a: "Once every two to three years for the same plot, and always before switching to a new crop cycle. Free testing is available through the Soil Health Card scheme at your block office.",
  },
  {
    q: "Is organic farming profitable on small holdings?",
    a: "It can be, but plan a 2–3 year transition. Start with one plot, build compost capacity on-farm, and secure a buyer or FPO tie-up before converting all your land.",
  },
  {
    q: "What is the best way to reduce irrigation cost?",
    a: "Combine drip or sprinkler systems with mulching and early-morning watering. With the PMKSY subsidy, most small farmers recover the drip cost within two seasons.",
  },
  {
    q: "Can I sell directly without going through a trader?",
    a: "Yes. Through eNAM, FPOs and direct farmgate buyers. Track mandi rates first so you know your floor price before negotiating.",
  },
];

function KnowledgePage() {
  return (
    <>
      <PageHeader
        icon={BookOpen}
        eyebrow="Learn"
        title="Knowledge Hub"
        description="Short, practical lessons written for real village conditions — no jargon, no expensive inputs, tested advice."
      />
      <Section>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search guides, crops or topics" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((t, i) => (
              <Badge key={t} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Card key={g.title} className="card-hover shadow-soft">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  {g.topic}
                </Badge>
                <CardTitle className="mt-3 text-base leading-snug">{g.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" /> {g.mins} min read
                </span>
                <span>{g.level}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Watch & learn" description="Short videos in local languages, made for low bandwidth.">
        <div className="grid gap-5 lg:grid-cols-3">
          {videos.map((v) => (
            <Card key={v.title} className="card-hover overflow-hidden shadow-soft">
              <div className="gradient-canopy flex h-40 items-center justify-center text-primary-foreground">
                <PlayCircle className="size-12" />
              </div>
              <CardHeader>
                <CardTitle className="text-base leading-snug">{v.title}</CardTitle>
                <CardDescription>
                  {v.dur} · {v.lang}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Frequently asked">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
