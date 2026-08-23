import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Megaphone, Camera, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Rural Issue Reporting — GramSahay AI" },
      {
        name: "description",
        content:
          "Report broken roads, water shortages, power cuts and health gaps.",
      },
    ],
  }),
  component: ReportPage,
});

const categories = [
  "Road & bridge",
  "Drinking water",
  "Electricity",
  "Health & sanitation",
  "School & anganwadi",
  "Irrigation canal",
  "Ration & PDS",
  "Other",
];

const departmentMap: Record<string, string> = {
  "Road & bridge": "Public Works Department",
  "Drinking water": "Water Department",
  Electricity: "Electricity Board",
  "Health & sanitation": "Health Department",
  "School & anganwadi": "Education Department",
  "Irrigation canal": "Irrigation Department",
  "Ration & PDS": "Food & Civil Supplies Department",
  Other: "General Administration",
};

function ReportPage() {
  const t = useT();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Location is not supported by your browser.");
      return;
    }

    setMessage("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setMessage("Location added successfully!");
      },
      () => {
        setMessage(
          "Unable to get your location. Please allow location access.",
        );
      },
    );
  };

  const submitReport = async () => {
    setMessage("");

    if (!title || !category || !village || !description) {
      setMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const trackingId = `GS-${Date.now().toString().slice(-6)}`;

    const department =
      departmentMap[category] || "General Administration";

    let photoUrl: string | null = null;

    if (photo) {
      const fileExt = photo.name.split(".").pop() || "jpg";
      const fileName = `${trackingId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("report-photos")
        .upload(fileName, photo);

      if (uploadError) {
        console.error(uploadError);
        setLoading(false);
        setMessage("Failed to upload photo. Please try again.");
        return;
      }

      const { data } = supabase.storage
        .from("report-photos")
        .getPublicUrl(fileName);

      photoUrl = data.publicUrl;
    }

    const { error } = await supabase.from("reports").insert([
      {
        tracking_id: trackingId,
        title,
        category,
        village,
        description,
        phone: phone || null,
        status: "Open",
        priority: "Medium",
        department,
        photo_url: photoUrl,
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Failed to submit report. Please try again.");
      return;
    }

    setMessage(
      `Report submitted successfully! Your tracking ID is ${trackingId}`,
    );

    setTitle("");
    setCategory("");
    setVillage("");
    setPhone("");
    setDescription("");
    setPhoto(null);
    setLocation(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <PageHeader
        icon={Megaphone}
        eyebrow={t("page.report.eyebrow")}
        title={t("nav.report")}
        description={t("page.report.description")}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                File a new report
              </CardTitle>

              <CardDescription>
                Report a problem in your village or ward.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue title *</Label>

                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Street light not working"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>

                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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
                  <Label htmlFor="village">
                    Village / ward *
                  </Label>

                  <Input
                    id="village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="Rampur, Ward 3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Contact number
                  </Label>

                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">
                  Describe the problem *
                </Label>

                <Textarea
                  id="desc"
                  rows={5}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="What is wrong, since when, who is affected?"
                />
              </div>

              {message && (
                <div className="rounded-lg bg-secondary p-3 text-sm">
                  {message}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setPhoto(e.target.files?.[0] || null);
                  }}
                />

                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  <Camera className="size-4" />

                  {photo ? photo.name : "Add photo"}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={getLocation}
                >
                  <MapPin className="size-4" />

                  {location
                    ? "Location added"
                    : "Use my location"}
                </Button>

                <Button
                  type="button"
                  className="sm:ml-auto"
                  onClick={submitReport}
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : "Submit report"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                How it works
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {[
                {
                  title: "Report",
                  description:
                    "Add a short description of the problem.",
                },
                {
                  title: "Route",
                  description:
                    "The issue is automatically sent to the appropriate department.",
                },
                {
                  title: "Track",
                  description:
                    "Follow the status of your submitted report.",
                },
                {
                  title: "Resolve",
                  description:
                    "The department works on resolving the issue.",
                },
              ].map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {i + 1}
                  </span>

                  <div>
                    <p className="font-medium">
                      {step.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Report status">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Badge>Open</Badge>

              <p className="text-sm text-muted-foreground">
                New reports will appear here after submission.
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}