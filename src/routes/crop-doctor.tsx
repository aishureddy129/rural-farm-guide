import { createFileRoute } from "@tanstack/react-router";
import { Stethoscope, Upload, ShieldAlert, Droplets, Bug } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

const diagnosis = {
  crop: "Tomato",
  disease: "Early Blight (Alternaria solani)",
  confidence: 92,
  severity: "Moderate",
  treatment: [
    "Remove and burn affected lower leaves immediately.",
    "Spray Mancozeb 75% WP @ 2 g per litre of water, repeat after 10 days.",
    "Avoid overhead irrigation; water at the base in the morning.",
    "Mulch beds to stop soil splash onto lower foliage.",
  ],
};

const recentScans = [
  { crop: "Wheat", issue: "Yellow rust", confidence: 88, status: "Treated" },
  { crop: "Cotton", issue: "Pink bollworm", confidence: 79, status: "Monitoring" },
  { crop: "Paddy", issue: "Bacterial leaf blight", confidence: 94, status: "Treated" },
  { crop: "Chilli", issue: "Nutrient deficiency (Mg)", confidence: 71, status: "Open" },
];

const tips = [
  { icon: Droplets, title: "Scan in daylight", text: "Natural light gives the model 20% better accuracy." },
  { icon: Bug, title: "Show both sides", text: "Many pests hide on the underside of leaves." },
  { icon: ShieldAlert, title: "Capture the whole plant", text: "Add a wide shot to reveal spread patterns." },
];

function CropDoctorPage() {
  return (
    <>
      <PageHeader
        icon={Stethoscope}
        eyebrow="Plant health"
        title="AI Crop Doctor"
        description="Photograph the affected leaf or plant and receive a likely diagnosis, severity rating and an affordable treatment plan."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">Upload a crop photo</CardTitle>
              <CardDescription>JPG or PNG, up to 10 MB. Works offline-first.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 px-6 py-14 text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary shadow-soft">
                  <Upload className="size-6" />
                </span>
                <p className="mt-4 text-sm font-medium">Drag a photo here or use your camera</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  AI analysis will be connected in the next step
                </p>
                <Button className="mt-5" disabled>
                  Select photo
                </Button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
                <CardTitle className="text-base">Sample diagnosis</CardTitle>
                <CardDescription>{diagnosis.crop} · uploaded 2 days ago</CardDescription>
              </div>
              <Badge className="bg-warning text-warning-foreground hover:bg-warning">
                {diagnosis.severity}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold">{diagnosis.disease}</h3>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={diagnosis.confidence} className="h-2" />
                  <span className="text-sm font-medium">{diagnosis.confidence}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Model confidence</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Recommended treatment</h4>
                <ol className="mt-3 space-y-2.5">
                  {diagnosis.treatment.map((t, i) => (
                    <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-foreground">
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Recent scans" description="Diagnoses saved to your farm record.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentScans.map((s) => (
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
}
