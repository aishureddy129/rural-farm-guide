import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Search, FileCheck2 } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Scheme Finder — GramSahay AI" },
      {
        name: "description",
        content:
          "Find central and state schemes you qualify for — subsidies, insurance, pensions and credit — with documents and application steps.",
      },
      { property: "og:title", content: "Government Scheme Finder — GramSahay AI" },
      {
        property: "og:description",
        content: "Personalised eligibility matching for rural welfare and farm subsidy schemes.",
      },
    ],
  }),
  component: SchemesPage,
});

const schemes = [
  {
    name: "PM-KISAN Samman Nidhi",
    dept: "Ministry of Agriculture",
    benefit: "₹6,000 / year in three instalments",
    match: 96,
    status: "Eligible",
    docs: ["Aadhaar", "Land record (7/12)", "Bank passbook"],
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    dept: "Crop insurance",
    benefit: "Premium 2% for kharif, full sum insured cover",
    match: 91,
    status: "Eligible",
    docs: ["Sowing certificate", "Aadhaar", "Bank details"],
  },
  {
    name: "PMKSY – Per Drop More Crop",
    dept: "Micro-irrigation subsidy",
    benefit: "Up to 55% subsidy on drip / sprinkler sets",
    match: 88,
    status: "Eligible",
    docs: ["Land record", "Vendor quotation", "Aadhaar"],
  },
  {
    name: "Kisan Credit Card",
    dept: "Department of Financial Services",
    benefit: "Crop loan up to ₹3 lakh at 4% effective interest",
    match: 84,
    status: "Documents pending",
    docs: ["Land record", "Photo ID", "Existing loan NOC"],
  },
  {
    name: "Soil Health Card Scheme",
    dept: "Soil testing",
    benefit: "Free soil analysis and nutrient recommendation",
    match: 78,
    status: "Eligible",
    docs: ["Aadhaar", "Plot survey number"],
  },
  {
    name: "MGNREGA Household Job Card",
    dept: "Rural Development",
    benefit: "100 days guaranteed wage employment per household",
    match: 72,
    status: "Applied",
    docs: ["Ration card", "Aadhaar", "Residence proof"],
  },
];

const filters = ["All", "Agriculture", "Insurance", "Credit", "Welfare", "Women", "Youth"];

function SchemesPage() {
  return (
    <>
      <PageHeader
        icon={Landmark}
        eyebrow="Entitlements"
        title="Government Scheme Finder"
        description="We match your land size, crops, income and household details against 300+ central and state schemes, then explain exactly how to apply."
        actions={
          <Button size="lg" variant="secondary">
            <FileCheck2 className="size-4" /> Update my profile
          </Button>
        }
      />
      <Section>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search schemes, benefits or departments" className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f, i) => (
              <Badge key={f} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer">
                {f}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {schemes.map((s) => (
            <Card key={s.name} className="card-hover shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{s.name}</CardTitle>
                    <CardDescription>{s.dept}</CardDescription>
                  </div>
                  <Badge
                    variant={s.status === "Eligible" ? "default" : "secondary"}
                    className={s.status === "Eligible" ? "bg-success hover:bg-success" : ""}
                  >
                    {s.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium">{s.benefit}</p>
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Eligibility match</span>
                    <span>{s.match}%</span>
                  </div>
                  <Progress value={s.match} className="mt-2 h-2" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.docs.map((d) => (
                    <Badge key={d} variant="outline">
                      {d}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View application steps
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
