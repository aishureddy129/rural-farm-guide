import { createFileRoute } from "@tanstack/react-router";
import { Bot, Mic, Send, User } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Rural Assistant — GramSahay AI" },
      {
        name: "description",
        content:
          "Ask farming, scheme and paperwork questions in your own language and get clear step-by-step answers.",
      },
      { property: "og:title", content: "AI Rural Assistant — GramSahay AI" },
      {
        property: "og:description",
        content: "A voice-first multilingual assistant for farmers and rural families.",
      },
    ],
  }),
  component: AssistantPage,
});

const conversation = [
  { role: "user", text: "मेरे गेहूं में पीले पत्ते आ रहे हैं, क्या करूं?" },
  {
    role: "bot",
    text: "Yellowing in wheat at this stage usually means nitrogen deficiency or waterlogging. Check drainage first, then apply 25 kg urea per acre with the next irrigation. If yellowing starts at leaf tips and moves inward, share a photo in Crop Doctor for confirmation.",
  },
  { role: "user", text: "What subsidy can I get for a drip irrigation set?" },
  {
    role: "bot",
    text: "Under PMKSY – Per Drop More Crop, small and marginal farmers get 55% subsidy on drip systems. With 1.8 acres registered on your farm profile, your estimated support is ₹41,300. Apply through your block horticulture officer with Aadhaar, land record and quotation.",
  },
];

const suggestions = [
  "When should I sow mustard this season?",
  "How do I apply for PM-Kisan?",
  "Best price for tomato near Nashik",
  "My tractor loan EMI is overdue — options?",
  "Nearest veterinary camp this week",
];

const languages = ["हिन्दी", "English", "मराठी", "తెలుగు", "தமிழ்", "ಕನ್ನಡ", "বাংলা"];

function AssistantPage() {
  return (
    <>
      <PageHeader
        icon={Bot}
        eyebrow="Conversational help"
        title="AI Rural Assistant"
        description="A patient, multilingual assistant that understands farming, welfare schemes and everyday rural paperwork — by text or voice."
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="shadow-soft">
            <CardHeader className="flex-row items-center justify-between border-b border-border">
              <CardTitle className="text-base">Chat preview</CardTitle>
              <Badge variant="secondary">Demo conversation</Badge>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {conversation.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "bot" && (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <p
                    className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.text}
                  </p>
                  {m.role === "user" && (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <User className="size-4" />
                    </span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 border-t border-border pt-5">
                <Input placeholder="Ask anything — AI responses coming soon" disabled />
                <Button variant="outline" size="icon" aria-label="Voice input" disabled>
                  <Mic className="size-4" />
                </Button>
                <Button size="icon" aria-label="Send" disabled>
                  <Send className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Popular questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="w-full rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-secondary"
                  >
                    {s}
                  </button>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Languages</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <Badge key={l} variant="secondary">
                    {l}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
