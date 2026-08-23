import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, CheckCircle, Clock, Building2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/tracking")({
  component: TrackingPage,
});

type Report = {
  tracking_id: string;
  title: string;
  category: string;
  village: string;
  description: string;
  phone: string | null;
  status: string;
  priority: string;
  department: string | null;
  photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
};

function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const searchReport = async () => {
    setMessage("");
    setReport(null);

    const id = trackingId.trim().toUpperCase();

    if (!id) {
      setMessage("Please enter your tracking ID.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("reports")
      .select(
        "tracking_id, title, category, village, description, phone, status, priority, department, photo_url, latitude, longitude",
      )
      .eq("tracking_id", id)
      .maybeSingle();

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Unable to find the report. Please try again.");
      return;
    }

    if (!data) {
      setMessage("No report found with this tracking ID.");
      return;
    }

    setReport(data);
  };

  return (
    <>
      <PageHeader
        icon={Search}
        eyebrow="REPORT TRACKING"
        title="Track Your Report"
        description="Enter your tracking ID to check the status of your village issue."
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                Enter Tracking ID
              </CardTitle>

              <CardDescription>
                Example: GS-057114
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchReport();
                    }
                  }}
                  placeholder="GS-XXXXXX"
                  className="sm:flex-1"
                />

                <Button
                  type="button"
                  onClick={searchReport}
                  disabled={loading}
                >
                  <Search className="size-4" />
                  {loading ? "Searching..." : "Track report"}
                </Button>
              </div>

              {message && (
                <div className="mt-4 rounded-lg bg-secondary p-3 text-sm">
                  {message}
                </div>
              )}
            </CardContent>
          </Card>

          {report && (
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">
                      {report.title}
                    </CardTitle>

                    <CardDescription>
                      Tracking ID: {report.tracking_id}
                    </CardDescription>
                  </div>

                  <Badge>{report.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      Category
                    </p>

                    <p className="mt-1 font-medium">
                      {report.category}
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      Village / Ward
                    </p>

                    <p className="mt-1 font-medium">
                      {report.village}
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      Department
                    </p>

                    <div className="mt-1 flex items-center gap-2 font-medium">
                      <Building2 className="size-4" />
                      {report.department || "Not assigned"}
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      Priority
                    </p>

                    <p className="mt-1 font-medium">
                      {report.priority}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">
                    Problem description
                  </p>

                  <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                    {report.description}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">
                    Report progress
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <CheckCircle className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          Reported
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Report received
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Clock className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          {report.status}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Current status
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Building2 className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          Department
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {report.department || "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {report.photo_url && (
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Uploaded photo
                    </p>

                    <img
                      src={report.photo_url}
                      alt="Reported issue"
                      className="max-h-80 rounded-lg object-cover"
                    />
                  </div>
                )}

                {report.latitude !== null &&
                  report.longitude !== null && (
                    <div className="rounded-lg bg-secondary p-4">
                      <p className="text-sm font-medium">
                        Location
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Latitude: {report.latitude}
                        <br />
                        Longitude: {report.longitude}
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  );
}