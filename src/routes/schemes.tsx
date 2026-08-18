import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Landmark,
  Search,
  FileCheck2,
  ChevronDown,
  RotateCcw,
  User,
  AlertCircle,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const categories = ["Small Farmer", "Marginal Farmer", "Other Farmer"];
const cropTypes = [
  "Paddy / Rice",
  "Wheat",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Tomato",
  "Groundnut",
  "Mustard",
  "Pulses",
  "Vegetables (other)",
];
const irrigationTypes = [
  "Rain-fed",
  "Flood / Canal",
  "Drip irrigation",
  "Sprinkler",
  "Borewell / Pump",
  "Mixed",
];
const incomeRanges = [
  "Below ₹1 lakh",
  "₹1 lakh – ₹2.5 lakh",
  "₹2.5 lakh – ₹5 lakh",
  "₹5 lakh – ₹10 lakh",
  "Above ₹10 lakh",
];

const categoriesAll = ["All", "Agriculture", "Insurance", "Credit", "Subsidy", "Welfare", "Women", "Youth"];

type Profile = {
  state: string;
  age: string;
  category: string;
  land: string;
  crop: string;
  irrigation: string;
  income: string;
};

const emptyProfile: Profile = {
  state: "",
  age: "",
  category: "",
  land: "",
  crop: "",
  irrigation: "",
  income: "",
};

type SchemeDetail = {
  id: string;
  name: string;
  category: string;
  dept: string;
  shortDesc: string;
  eligibility: string[];
  benefit: string;
  estimatedBenefit: string;
  docs: string[];
  guidance: string[];
};

const schemeCatalog: SchemeDetail[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    category: "Agriculture",
    dept: "Ministry of Agriculture & Farmers Welfare",
    shortDesc: "Direct income support of ₹6,000 per year for farmer families.",
    eligibility: [
      "Small and marginal farmer family owning cultivable land",
      "Applicant age between 18 and 70 years",
      "Aadhaar linked to bank account",
      "Active land record in revenue records",
    ],
    benefit: "₹6,000 per year in three equal instalments of ₹2,000",
    estimatedBenefit: "₹6,000/year",
    docs: ["Aadhaar", "Land record (7/12 / Khata)", "Bank passbook", "Mobile number"],
    guidance: [
      "Visit the PM-KISAN portal or your nearest CSC",
      "Fill the e-KYC form and upload land documents",
      "Check Aadhaar-bank linking status before applying",
      "Track status using your registration number",
    ],
  },
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    category: "Insurance",
    dept: "Ministry of Agriculture",
    shortDesc: "Affordable crop insurance against natural calamities, pests and diseases.",
    eligibility: [
      "Farmers growing notified crops in notified areas",
      "Must have insurable interest in the crop",
      "Loanee and non-loanee farmers both eligible",
      "Sowing declaration submitted to insurer / bank",
    ],
    benefit: "Kharif premium ~2%, Rabi ~1.5%, commercial crops ~5% of sum insured",
    estimatedBenefit: "Full sum insured minus subsidised premium",
    docs: ["Sowing certificate", "Aadhaar", "Bank details", "Land record", "Crop declaration"],
    guidance: [
      "Enrol through your bank branch or nearest agriculture office",
      "Pay premium before the cut-off date for the season",
      "Report crop loss within 72 hours of the event",
      "Cooperate with crop-cutting experiment survey",
    ],
  },
  {
    id: "pmksy",
    name: "PMKSY – Per Drop More Crop",
    category: "Subsidy",
    dept: "Micro-irrigation division, MoA&FW",
    shortDesc: "Subsidy for drip and sprinkler systems to improve water use efficiency.",
    eligibility: [
      "Small and marginal farmers get higher subsidy share",
      "Must own or lease land with a valid record",
      "System should be purchased from empanelled vendor",
      "Water source must be available for irrigation",
    ],
    benefit: "Up to 55% subsidy on drip / sprinkler sets for small and marginal farmers",
    estimatedBenefit: "Approx ₹40,000 – ₹80,000 per acre depending on crop spacing",
    docs: ["Land record", "Vendor quotation", "Aadhaar", "Water source proof"],
    guidance: [
      "Contact your block horticulture / agriculture officer",
      "Get a site-specific design from an empanelled vendor",
      "Submit the application online or through the ATMA office",
      "Install the system after approval and geo-tag the plot",
    ],
  },
  {
    id: "soil-health",
    name: "Soil Health Card Scheme",
    category: "Agriculture",
    dept: "Department of Agriculture",
    shortDesc: "Free soil testing and customised nutrient recommendations for your plot.",
    eligibility: [
      "Any farmer with a cultivable plot",
      "Plot should have a survey / khata number",
      "Priority for small and marginal farmers",
    ],
    benefit: "Free soil analysis report with fertiliser dose recommendations",
    estimatedBenefit: "Saves 10–20% on fertiliser cost; improves yield",
    docs: ["Aadhaar", "Plot survey number", "Land record"],
    guidance: [
      "Approach the village-level soil health officer",
      "Collect soil sample from the field at 15 cm depth",
      "Submit sample with the plot details",
      "Receive the printed card within 3–4 weeks",
    ],
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    category: "Credit",
    dept: "Department of Financial Services",
    shortDesc: "Short-term credit for crop cultivation and allied activities at low interest.",
    eligibility: [
      "Farmers, sharecroppers or tenant farmers with land proof",
      "Joint liability groups and self-help groups are eligible",
      "Loan limit generally up to ₹3 lakh at concessional interest",
    ],
    benefit: "Crop loan up to ₹3 lakh at 7% interest, dropping to 4% on timely repayment",
    estimatedBenefit: "Up to ₹3 lakh credit at 4% effective interest",
    docs: ["Land record", "Photo ID", "Address proof", "Existing loan NOC (if any)"],
    guidance: [
      "Apply at your nearest bank branch or through the KCC portal",
      "Submit the crop-wise loan estimate from the local agriculture office",
      "Complete the KYC and Aadhaar seeding process",
      "Renew the card annually before the season starts",
    ],
  },
];

type MatchResult = {
  scheme: SchemeDetail;
  match: number;
  status: "Likely Eligible" | "Check Eligibility";
};

function evaluateEligibility(profile: Profile): MatchResult[] {
  const age = parseInt(profile.age || "0", 10);
  const land = parseFloat(profile.land || "0");
  const isSmallMarginal = profile.category === "Small Farmer" || profile.category === "Marginal Farmer";
  const isKharif = ["Paddy / Rice", "Maize", "Cotton", "Sugarcane", "Groundnut"].includes(profile.crop);
  const isDrip = profile.irrigation === "Drip irrigation";

  return schemeCatalog.map((scheme) => {
    let match = 50;
    let status: MatchResult["status"] = "Check Eligibility";

    if (scheme.id === "pm-kisan") {
      if (isSmallMarginal && land > 0 && age >= 18 && age <= 70) match += 40;
      else if (land > 0 && age >= 18) match += 20;
      if (match >= 80) status = "Likely Eligible";
    } else if (scheme.id === "pmfby") {
      if (isKharif && land > 0) match += 35;
      if (land > 0) match += 15;
      if (match >= 80) status = "Likely Eligible";
    } else if (scheme.id === "pmksy") {
      if (isDrip && isSmallMarginal) match += 40;
      else if (isDrip) match += 25;
      else if (isSmallMarginal) match += 15;
      if (match >= 80) status = "Likely Eligible";
    } else if (scheme.id === "soil-health") {
      if (land > 0) match += 45;
      if (match >= 80) status = "Likely Eligible";
    } else if (scheme.id === "kcc") {
      if (land > 0 && age >= 18) match += 35;
      if (isSmallMarginal) match += 15;
      if (match >= 80) status = "Likely Eligible";
    }

    return { scheme, match: Math.min(match, 99), status };
  });
}

function SchemesPage() {
  const t = useT();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof Profile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setError(null);
  };

  const findSchemes = () => {
    if (!profile.state || !profile.age || !profile.category || !profile.land || !profile.crop || !profile.irrigation || !profile.income) {
      setError("Please fill all profile fields to see matching schemes.");
      setResults(null);
      return;
    }
    setError(null);
    setResults(evaluateEligibility(profile));
  };

  const resetProfile = () => {
    setProfile(emptyProfile);
    setResults(null);
    setSearch("");
    setCategory("All");
    setExpanded(new Set());
    setError(null);
  };

  const tryAnotherProfile = () => {
    resetProfile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredResults = results
    ?.filter((r) => (category === "All" ? true : r.scheme.category === category))
    .filter(
      (r) =>
        r.scheme.name.toLowerCase().includes(search.toLowerCase()) ||
        r.scheme.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
        r.scheme.dept.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => b.match - a.match);

  return (
    <>
      <PageHeader
        icon={Landmark}
        eyebrow={t("page.schemes.eyebrow")}
        title={t("nav.schemes")}
        description={t("page.schemes.description")}
      />
      <Section>
        <div className="mb-8 rounded-2xl border border-border bg-background p-5 shadow-soft md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Farmer profile</h2>
              <p className="text-sm text-muted-foreground">
                Fill the form below to see a demo list of schemes you may qualify for.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={profile.state} onValueChange={(v) => update("state", v)}>
                <SelectTrigger id="state" aria-label="Select state">
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
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={18}
                max={100}
                placeholder="e.g. 45"
                value={profile.age}
                onChange={(e) => update("age", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Farmer category</Label>
              <Select value={profile.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger id="category" aria-label="Select farmer category">
                  <SelectValue placeholder="Select category" />
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
              <Label htmlFor="land">Land holding (acres)</Label>
              <Input
                id="land"
                type="number"
                min={0}
                step={0.1}
                placeholder="e.g. 2.5"
                value={profile.land}
                onChange={(e) => update("land", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Crop type</Label>
              <Select value={profile.crop} onValueChange={(v) => update("crop", v)}>
                <SelectTrigger id="crop" aria-label="Select crop type">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigation">Irrigation type</Label>
              <Select value={profile.irrigation} onValueChange={(v) => update("irrigation", v)}>
                <SelectTrigger id="irrigation" aria-label="Select irrigation type">
                  <SelectValue placeholder="Select irrigation" />
                </SelectTrigger>
                <SelectContent>
                  {irrigationTypes.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-3">
              <Label htmlFor="income">Annual income range</Label>
              <Select value={profile.income} onValueChange={(v) => update("income", v)}>
                <SelectTrigger id="income" aria-label="Select annual income range">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="size-4" />
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={findSchemes}>
              <FileCheck2 className="mr-2 size-4" />
              Find Eligible Schemes
            </Button>
            <Button variant="outline" onClick={resetProfile}>
              <RotateCcw className="mr-2 size-4" />
              Reset Profile
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search schemes, benefits or departments"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categoriesAll.map((c) => (
              <Badge
                key={c}
                variant={category === c ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setCategory(c)}
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <p className="text-sm font-semibold text-warning-foreground">
            Demo information — verify eligibility and current benefits through official government sources.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Eligibility and benefit numbers shown here are simulated for demonstration only. Please confirm details on the official scheme portal, CSC or local agriculture office before applying.
          </p>
        </div>

        {results === null ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
            <Landmark className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium text-foreground">No matches yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete the farmer profile and click “Find Eligible Schemes” to see a demo result list.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredResults?.length ?? 0} demo scheme match{filteredResults?.length === 1 ? "" : "es"}
              </p>
              <Button variant="outline" size="sm" onClick={tryAnotherProfile}>
                Try Another Profile
              </Button>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {filteredResults?.map((r) => {
                const isOpen = expanded.has(r.scheme.id);
                return (
                  <Card key={r.scheme.id} className="card-hover shadow-soft">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-lg">{r.scheme.name}</CardTitle>
                          <CardDescription>{r.scheme.dept}</CardDescription>
                        </div>
                        <Badge
                          variant={r.status === "Likely Eligible" ? "default" : "secondary"}
                          className={r.status === "Likely Eligible" ? "bg-success hover:bg-success" : ""}
                        >
                          {r.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{r.scheme.shortDesc}</p>
                      <p className="text-sm font-medium">{r.scheme.benefit}</p>
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Eligibility match</span>
                          <span>{r.match}%</span>
                        </div>
                        <Progress value={r.match} className="mt-2 h-2" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {r.scheme.docs.map((d) => (
                          <Badge key={d} variant="outline">
                            {d}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => toggleExpand(r.scheme.id)}
                      >
                        {isOpen ? "Hide details" : "View details"}
                        <ChevronDown
                          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </Button>

                      {isOpen && (
                        <div className="space-y-4 rounded-xl bg-muted/40 p-4">
                          <div>
                            <h4 className="text-sm font-semibold">Eligibility</h4>
                            <ul className="mt-2 space-y-1.5">
                              {r.scheme.eligibility.map((e) => (
                                <li key={e} className="flex gap-2 text-sm text-muted-foreground">
                                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                  {e}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">Estimated benefit</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{r.scheme.estimatedBenefit}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">Application guidance</h4>
                            <ol className="mt-2 space-y-1.5">
                              {r.scheme.guidance.map((g, i) => (
                                <li key={g} className="flex gap-2 text-sm text-muted-foreground">
                                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-foreground">
                                    {i + 1}
                                  </span>
                                  {g}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
