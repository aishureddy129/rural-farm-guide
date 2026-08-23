import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Report = {
  id: number;
  tracking_id: string;
  title: string;
  category: string;
  village: string;
  description: string;
  status: string;
  priority: string;
  department: string | null;
  photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
};

function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadReports = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("id", { ascending: false });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Failed to load reports.");
      return;
    }

    setReports(data || []);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const updateStatus = async (
    id: number,
    status: string,
  ) => {
    const { error } = await supabase
      .from("reports")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Failed to update status.");
      return;
    }

    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? { ...report, status }
          : report,
      ),
    );
  };

  const totalReports = reports.length;

  const openReports = reports.filter(
    (report) => report.status === "Open",
  ).length;

  const inProgressReports = reports.filter(
    (report) =>
      report.status === "In Progress",
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved",
  ).length;

  return (
    <>
      <PageHeader
        icon={BarChart3}
        eyebrow="ADMIN DASHBOARD"
        title="Rural Issue Dashboard"
        description="Monitor village issues, departments and resolution status."
      />

      <Section>
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={loadReports}
              disabled={loading}
            >
              <RefreshCw className="size-4" />
              Refresh
            </Button>
          </div>

          {message && (
            <div className="rounded-lg bg-secondary p-3 text-sm">
              {message}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <BarChart3 className="size-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Reports
                    </p>

                    <p className="text-2xl font-bold">
                      {totalReports}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Open
                    </p>

                    <p className="text-2xl font-bold">
                      {openReports}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Clock className="size-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      In Progress
                    </p>

                    <p className="text-2xl font-bold">
                      {inProgressReports}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-5" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Resolved
                    </p>

                    <p className="text-2xl font-bold">
                      {resolvedReports}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                All Reports
              </CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">
                  Loading reports...
                </p>
              ) : reports.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No reports found.
                </p>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="rounded-lg border p-4"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">
                              {report.title}
                            </p>

                            <Badge>
                              {report.status}
                            </Badge>

                            <Badge variant="outline">
                              {report.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            Tracking ID:{" "}
                            <strong>
                              {report.tracking_id}
                            </strong>
                          </p>

                          <p className="text-sm">
                            <strong>Category:</strong>{" "}
                            {report.category}
                          </p>

                          <p className="text-sm">
                            <strong>Village:</strong>{" "}
                            {report.village}
                          </p>

                          <p className="text-sm">
                            <strong>Department:</strong>{" "}
                            {report.department ||
                              "Not assigned"}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {report.description}
                          </p>

                          {report.latitude !== null &&
                            report.longitude !== null && (
                              <p className="text-xs text-muted-foreground">
                                Location:{" "}
                                {report.latitude},{" "}
                                {report.longitude}
                              </p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateStatus(
                                report.id,
                                "Open",
                              )
                            }
                          >
                            Open
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateStatus(
                                report.id,
                                "In Progress",
                              )
                            }
                          >
                            In Progress
                          </Button>

                          <Button
                            size="sm"
                            onClick={() =>
                              updateStatus(
                                report.id,
                                "Resolved",
                              )
                            }
                          >
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}