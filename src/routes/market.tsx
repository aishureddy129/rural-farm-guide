import { createFileRoute } from "@tanstack/react-router";
import { IndianRupee, TrendingUp, TrendingDown, Search } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Agricultural Market Prices — GramSahay AI" },
      {
        name: "description",
        content:
          "Daily mandi prices for grains, pulses, vegetables and cash crops with 7-day trends and best-selling windows.",
      },
      { property: "og:title", content: "Agricultural Market Prices — GramSahay AI" },
      {
        property: "og:description",
        content: "Compare mandi rates nearby and decide when and where to sell.",
      },
    ],
  }),
  component: MarketPage,
});

const highlights = [
  { crop: "Onion", price: "₹2,450", unit: "per quintal", change: 8.4, mandi: "Lasalgaon" },
  { crop: "Soybean", price: "₹4,780", unit: "per quintal", change: -2.1, mandi: "Latur" },
  { crop: "Tomato", price: "₹1,320", unit: "per quintal", change: 14.6, mandi: "Pimpalgaon" },
  { crop: "Wheat", price: "₹2,610", unit: "per quintal", change: 1.2, mandi: "Nashik" },
];

const rows = [
  { crop: "Onion", variety: "Red, medium", mandi: "Lasalgaon", min: 1800, modal: 2450, max: 2900, change: 8.4 },
  { crop: "Soybean", variety: "Yellow", mandi: "Latur", min: 4400, modal: 4780, max: 5100, change: -2.1 },
  { crop: "Tomato", variety: "Hybrid", mandi: "Pimpalgaon", min: 900, modal: 1320, max: 1750, change: 14.6 },
  { crop: "Wheat", variety: "Lokwan", mandi: "Nashik", min: 2380, modal: 2610, max: 2840, change: 1.2 },
  { crop: "Cotton", variety: "Medium staple", mandi: "Jalgaon", min: 6900, modal: 7420, max: 7800, change: 3.5 },
  { crop: "Gram", variety: "Desi", mandi: "Akola", min: 5100, modal: 5480, max: 5720, change: -0.8 },
  { crop: "Sugarcane", variety: "Co-86032", mandi: "Kolhapur", min: 2900, modal: 3150, max: 3300, change: 0.4 },
  { crop: "Grapes", variety: "Thompson", mandi: "Nashik", min: 4200, modal: 5600, max: 7200, change: -5.2 },
];

function Change({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium ${
        up ? "text-success" : "text-destructive"
      }`}
    >
      {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
      {up ? "+" : ""}
      {value}%
    </span>
  );
}

function MarketPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        icon={IndianRupee}
        eyebrow={t("page.market.eyebrow")}
        title={t("nav.market")}
        description={t("page.market.description")}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Card key={h.crop} className="card-hover shadow-soft">
              <CardHeader className="pb-2">
                <CardDescription>{h.mandi} mandi</CardDescription>
                <CardTitle className="text-base">{h.crop}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{h.price}</p>
                <p className="text-xs text-muted-foreground">{h.unit}</p>
                <div className="mt-3">
                  <Change value={h.change} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Today's rates" description="Updated 14 Aug 2026, 07:30 IST · Source: demo dataset">
        <Card className="shadow-soft">
          <CardHeader className="gap-4 border-b border-border sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search crop or mandi" className="pl-9" />
            </div>
            <Badge variant="secondary">8 commodities · 6 mandis</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Variety</TableHead>
                    <TableHead>Mandi</TableHead>
                    <TableHead className="text-right">Min</TableHead>
                    <TableHead className="text-right">Modal</TableHead>
                    <TableHead className="text-right">Max</TableHead>
                    <TableHead className="text-right">7-day</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.crop}>
                      <TableCell className="font-medium">{r.crop}</TableCell>
                      <TableCell className="text-muted-foreground">{r.variety}</TableCell>
                      <TableCell className="text-muted-foreground">{r.mandi}</TableCell>
                      <TableCell className="text-right">₹{r.min.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{r.modal.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right">₹{r.max.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right">
                        <Change value={r.change} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
