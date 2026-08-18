import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Stethoscope, Upload, ShieldAlert, Droplets, Bug, X, RotateCcw, Leaf } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/crop-doctor")({
  head: () => ({
    meta: [
      { title: "AI Crop Doctor — GramSahay AI" },
      {
        name: "description",
        content:
          "Upload a leaf photo to identify crop diseases and pests, with treatment, dosage and prevention guidance.",
      },
      { property: "og:title", content: "AI Crop Doctor — GramSahay AI" },
      {
        property: "og:description",
        content: "Photo-based crop disease diagnosis with practical treatment plans.",
      },
    ],
  }),
  component: CropDoctorPage,
});

type CropKey = "tomato" | "wheat" | "paddy" | "cotton" | "groundnut";

type Diagnosis = {
  crop: string;
  disease: string;
  confidence: number;
  severity: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
};

const demoDiagnoses: Record<CropKey, Diagnosis> = {
  tomato: {
    crop: "Tomato",
    disease: "Early Blight (Alternaria solani)",
    confidence: 92,
    severity: "Moderate",
    symptoms: [
      "Dark brown spots with concentric rings on lower leaves.",
      "Yellowing spreads upward from the bottom of the plant.",
      "Stems show dark, sunken lesions near the soil line.",
    ],
    treatment: [
      "Remove and burn affected lower leaves immediately.",
      "Spray Mancozeb 75% WP @ 2 g per litre of water, repeat after 10 days.",
      "Avoid overhead irrigation; water at the base in the morning.",
      "Mulch beds to stop soil splash onto lower foliage.",
    ],
    prevention: [
      "Use certified, disease-resistant tomato varieties.",
      "Rotate with non-solanaceous crops for 2–3 years.",
      "Maintain 45–60 cm spacing for good airflow.",
      "Apply neem-based bio-pesticide every 15 days as a preventive.",
    ],
  },
  wheat: {
    crop: "Wheat",
    disease: "Yellow Rust (Puccinia striiformis)",
    confidence: 88,
    severity: "Severe",
    symptoms: [
      "Yellow-orange pustules in streaks along the leaf veins.",
      "Pustules merge and turn brown as the infection ages.",
      "Stunted growth and reduced grain filling in heavy infections.",
    ],
    treatment: [
      "Apply Propiconazole 25% EC @ 1 ml per litre at first sign.",
      "Repeat spray after 12–15 days if weather stays cool and humid.",
      "Add 10 kg urea per acre to help the crop recover after control.",
    ],
    prevention: [
      "Sow rust-resistant varieties such as HD-2967 or PBW-343.",
      "Avoid late sowing, which overlaps with peak rust weather.",
      "Keep the field free of volunteer wheat and grassy weeds.",
      "Monitor edges of the field where infection first appears.",
    ],
  },
  paddy: {
    crop: "Rice / Paddy",
    disease: "Bacterial Leaf Blight (Xanthomonas oryzae)",
    confidence: 94,
    severity: "High",
    symptoms: [
      "Water-soaked lesions at the leaf tips that turn yellowish-white.",
      "Lesions run down the leaf margins, giving a wavy appearance.",
      "Infected leaves roll up and dry from the tip downwards.",
    ],
    treatment: [
      "Stop nitrogen top-dressing until the infection is controlled.",
      "Spray copper oxychloride 50% WP @ 2.5 g per litre of water.",
      "Drain standing water for 2–3 days to reduce bacterial spread.",
      "Remove severely infected leaves and burn them away from the field.",
    ],
    prevention: [
      "Use resistant varieties like IR-64 or Swarna-Sub1.",
      "Treat seeds with hot water (50°C for 25 min) before sowing.",
      "Avoid excessive nitrogen; split doses evenly.",
      "Keep fields weed-free and avoid stagnant water for long periods.",
    ],
  },
  cotton: {
    crop: "Cotton",
    disease: "Pink Bollworm (Pectinophora gossypiella)",
    confidence: 86,
    severity: "Moderate",
    symptoms: [
      "Bolls show small, round entry holes with frass at the base.",
      "Lint inside attacked bolls is stained and damaged.",
      "Premature boll opening and shedding of young bolls.",
    ],
    treatment: [
      "Remove and destroy all fallen and damaged bolls every 3 days.",
      "Set up pheromone traps at 5 per acre; replace lures every 3 weeks.",
      "Spray Chlorantraniliprole 18.5% SC @ 0.3 ml per litre at peak flowering.",
      "Keep the field free of ratoon cotton after harvest.",
    ],
    prevention: [
      "Use Bt cotton hybrids recommended for your region.",
      "Adopt crop rotation with pigeon pea or maize in the next season.",
      "Harvest cotton promptly; do not leave mature bolls in the field.",
      "Erect bird perches at 10 per acre to attract natural predators.",
    ],
  },
  groundnut: {
    crop: "Groundnut",
    disease: "Late Leaf Spot (Cercosporidium personatum)",
    confidence: 89,
    severity: "Moderate",
    symptoms: [
      "Circular dark-brown spots on the upper leaf surface.",
      "Yellow halo around spots; leaves turn yellow and drop early.",
      "Defoliation starts from the bottom and moves upward rapidly.",
    ],
    treatment: [
      "Spray Carbendazim 12% + Mancozeb 63% WP @ 2 g per litre.",
      "Repeat the spray 2–3 times at 15-day intervals.",
      "Add a sticker-spreader for better coverage on waxy leaves.",
      "Irrigate lightly to avoid leaf wetness in the evening.",
    ],
    prevention: [
      "Use tolerant varieties like GJG-9 or GG-7.",
      "Follow a 2-year rotation with cereals or pulses.",
      "Remove and burn infected crop residues after harvest.",
      "Maintain adequate plant spacing to reduce humidity inside the canopy.",
    ],
  },
};

const cropOptions: { key: CropKey | "auto"; label: string }[] = [
  { key: "auto", label: "Auto-detect from filename" },
  { key: "tomato", label: "Tomato" },
  { key: "wheat", label: "Wheat" },
  { key: "paddy", label: "Rice / Paddy" },
  { key: "cotton", label: "Cotton" },
  { key: "groundnut", label: "Groundnut" },
];

const tips = [
  { icon: Droplets, title: "Scan in daylight", text: "Natural light gives the model 20% better accuracy." },
  { icon: Bug, title: "Show both sides", text: "Many pests hide on the underside of leaves." },
  { icon: ShieldAlert, title: "Capture the whole plant", text: "Add a wide shot to reveal spread patterns." },
];

function detectCropFromFilename(filename: string): CropKey {
  const lower = filename.toLowerCase();
  if (lower.includes("tomato")) return "tomato";
  if (lower.includes("wheat")) return "wheat";
  if (lower.includes("paddy") || lower.includes("rice")) return "paddy";
  if (lower.includes("cotton")) return "cotton";
  if (lower.includes("groundnut") || lower.includes("peanut")) return "groundnut";
  return "tomato";
}

function CropDoctorPage() {
  const t = useT();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropKey | "auto">("auto");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const analyze = () => {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    const fileName = fileInputRef.current?.files?.[0]?.name ?? "";
    const crop = selectedCrop === "auto" ? detectCropFromFilename(fileName) : selectedCrop;
    window.setTimeout(() => {
      setResult(demoDiagnoses[crop]);
      setLoading(false);
    }, 1800);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setLoading(false);
    setSelectedCrop("auto");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <PageHeader
        icon={Stethoscope}
        eyebrow={t("page.cropDoctor.eyebrow")}
        title={t("nav.cropDoctor")}
        description={t("page.cropDoctor.description")}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Upload a crop photo</CardTitle>
              <CardDescription>JPG or PNG, up to 10 MB. This demo uses local sample logic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload crop photo"
              />

              {!preview ? (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-14 text-center"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary shadow-soft">
                    <Upload className="size-6" />
                  </span>
                  <p className="mt-4 text-sm font-medium">Drag a photo here or use your camera</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Demo analysis works best with tomato, wheat, paddy, cotton or groundnut photos
                  </p>
                  <Button className="mt-5" onClick={() => fileInputRef.current?.click()}>
                    Select photo
                  </Button>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40">
                  <button
                    type="button"
                    onClick={reset}
                    className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-background"
                    aria-label="Clear uploaded photo"
                  >
                    <X className="size-4" />
                  </button>
                  <img
                    src={preview}
                    alt="Uploaded crop preview"
                    className="mx-auto max-h-64 w-full object-contain"
                  />
                  <div className="border-t border-border bg-background px-4 py-3">
                    <p className="text-xs text-muted-foreground">Uploaded preview</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="crop-select" className="text-sm font-medium">
                  Crop type
                </label>
                <Select value={selectedCrop} onValueChange={(v) => setSelectedCrop(v as CropKey | "auto")}>
                  <SelectTrigger id="crop-select" className="w-full" aria-label="Select crop type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((c) => (
                      <SelectItem key={c.key} value={c.key}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose a crop or leave Auto-detect to match the filename.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={analyze} disabled={!preview || loading}>
                  <Leaf className="mr-2 size-4" />
                  {loading ? "Analyzing…" : "Analyze Crop"}
                </Button>
                {preview && (
                  <Button variant="outline" onClick={reset}>
                    <RotateCcw className="mr-2 size-4" />
                    Clear / Reset
                  </Button>
                )}
              </div>

              {loading && (
                <div className="rounded-2xl border border-border bg-muted/40 px-6 py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Stethoscope className="size-7 animate-pulse text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-medium">AI-assisted analysis in progress</p>
                  <p className="mt-1 text-xs text-muted-foreground">Checking symptoms, confidence and treatment guidance…</p>
                  <div className="mt-5 flex justify-center gap-2">
                    <span className="size-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
                    <span className="size-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "120ms" }} />
                    <span className="size-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: "240ms" }} />
                  </div>
                </div>
              )}

              <div className="mt-2 grid gap-4 sm:grid-cols-3">
                {tips.map((t) => (
                  <div key={t.title} className="rounded-xl bg-secondary/60 p-4">
                    <t.icon className="size-4 text-primary" />
                    <p className="mt-2 text-sm font-medium">{t.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base">
                  {result ? "Diagnosis result" : "Sample diagnosis"}
                </CardTitle>
                <CardDescription>
                  {result ? `${result.crop} · demo AI-assisted result` : "Tomato · uploaded 2 days ago"}
                </CardDescription>
              </div>
              <Badge className="bg-warning text-warning-foreground hover:bg-warning">
                {result ? result.severity : "Moderate"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              {!result ? (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold">Early Blight (Alternaria solani)</h3>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={92} className="h-2" />
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Model confidence</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Recommended treatment</h4>
                    <ol className="mt-3 space-y-2.5">
                      {demoDiagnoses.tomato.treatment.map((t, i) => (
                        <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                            {i + 1}
                          </span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <p className="text-xs font-medium text-foreground">Demo mode</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Upload a crop photo and click “Analyze Crop” to see a local demo result for tomato, wheat, paddy, cotton or groundnut.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">{result.disease}</h3>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={result.confidence} className="h-2" />
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Model confidence</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">Symptoms</h4>
                    <ul className="mt-3 space-y-2">
                      {result.symptoms.map((s) => (
                        <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">Recommended treatment</h4>
                    <ol className="mt-3 space-y-2.5">
                      {result.treatment.map((t, i) => (
                        <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                            {i + 1}
                          </span>
                          {t}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">Prevention tips</h4>
                    <ul className="mt-3 space-y-2">
                      {result.prevention.map((p) => (
                        <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
                    <p className="text-xs font-semibold text-warning-foreground">
                      Demo / AI-assisted result — not a trained diagnosis
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      This result is generated locally for demonstration only. Please consult a local agriculture officer or certified plant pathologist before buying or applying any chemical.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={analyzeAnother}>
                      <RotateCcw className="mr-2 size-4" />
                      Analyze Another Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Recent scans" description="Diagnoses saved to your farm record.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { crop: "Wheat", issue: "Yellow rust", confidence: 88, status: "Treated" },
            { crop: "Cotton", issue: "Pink bollworm", confidence: 79, status: "Monitoring" },
            { crop: "Paddy", issue: "Bacterial leaf blight", confidence: 94, status: "Treated" },
            { crop: "Chilli", issue: "Nutrient deficiency (Mg)", confidence: 71, status: "Open" },
          ].map((s) => (
            <Card key={s.crop} className="card-hover shadow-soft">
              <CardHeader>
                <CardDescription>{s.crop}</CardDescription>
                <CardTitle className="text-base">{s.issue}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.confidence}% match</span>
                <Badge variant={s.status === "Open" ? "destructive" : "secondary"}>
                  {s.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );

  function analyzeAnother() {
    reset();
  }
}
