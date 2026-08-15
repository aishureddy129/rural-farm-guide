import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Eraser, Mic, Send, User } from "lucide-react";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

type Message = { id: number; role: "user" | "bot"; text: string };

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "bn", label: "বাংলা (Bengali)" },
];

const greetings: Record<string, string> = {
  en: "Namaste! I am your GramSahay assistant. Ask me about crops, weather, mandi prices or government schemes.",
  hi: "नमस्ते! मैं आपका ग्रामसहाय सहायक हूँ। फसल, मौसम, मंडी भाव या सरकारी योजनाओं के बारे में पूछें।",
  ta: "வணக்கம்! நான் உங்கள் கிராமசகாய் உதவியாளர். பயிர், வானிலை, சந்தை விலை அல்லது அரசு திட்டங்கள் பற்றி கேளுங்கள்.",
  te: "నమస్తే! నేను మీ గ్రామసహాయ్ సహాయకుడిని. పంటలు, వాతావరణం, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగండి.",
  kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಗ್ರಾಮಸಹಾಯ್ ಸಹಾಯಕ. ಬೆಳೆ, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರ ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
  mr: "नमस्कार! मी तुमचा ग्रामसहाय सहाय्यक आहे. पीक, हवामान, बाजारभाव किंवा सरकारी योजनांबद्दल विचारा.",
  bn: "নমস্কার! আমি আপনার গ্রামসহায় সহকারী। ফসল, আবহাওয়া, বাজারদর বা সরকারি প্রকল্প নিয়ে জিজ্ঞাসা করুন।",
};

const suggestions = [
  "When should I sow mustard this season?",
  "How do I apply for PM-Kisan?",
  "Best price for tomato near Nashik",
  "My wheat leaves are turning yellow",
  "Subsidy for drip irrigation",
  "Nearest veterinary camp this week",
];

type Rule = { keys: string[]; answer: string };

const rules: Rule[] = [
  {
    keys: ["yellow", "पीले", "leaf", "पत्ते", "wheat", "गेहूं"],
    answer:
      "Yellowing in wheat usually means nitrogen deficiency or waterlogging. Check field drainage first, then apply 25 kg urea per acre with the next irrigation. If the yellowing starts at leaf tips and moves inward, upload a photo in AI Crop Doctor for confirmation.",
  },
  {
    keys: ["pm-kisan", "pm kisan", "kisan samman"],
    answer:
      "PM-Kisan gives ₹6,000 per year in three instalments. Apply at your CSC or on the PM-Kisan portal with Aadhaar, land record (khasra/khatauni) and a bank passbook linked to Aadhaar. Approval usually takes 3–5 weeks; check status with your registration number.",
  },
  {
    keys: ["drip", "irrigation", "सिंचाई", "pmksy"],
    answer:
      "Under PMKSY – Per Drop More Crop, small and marginal farmers get 55% subsidy on drip systems. For a 1.8-acre plot the estimated support is about ₹41,300. Apply through your block horticulture officer with Aadhaar, land record and a vendor quotation.",
  },
  {
    keys: ["mustard", "sow", "sowing", "बुवाई", "सरसों"],
    answer:
      "Mustard is best sown between 10–25 October, when soil temperature settles near 25°C. Use 4–5 kg seed per acre at 30 cm row spacing, with 40 kg DAP as basal dose. Late sowing after mid-November cuts yield sharply.",
  },
  {
    keys: ["tomato", "price", "mandi", "भाव", "rate", "market"],
    answer:
      "Today's tomato modal rate near Nashik is about ₹1,850 per quintal, up 6% over the last week. Rates typically peak on Tuesday and Friday arrivals. See the Mandi Prices page for the full 7-day trend before you decide to sell.",
  },
  {
    keys: ["weather", "rain", "मौसम", "बारिश", "forecast"],
    answer:
      "Light rain of 8–12 mm is expected in the next 48 hours, with humidity above 80%. Delay urea top-dressing and any spraying until the field dries. Open drainage channels in low-lying plots today.",
  },
  {
    keys: ["loan", "emi", "credit", "kcc", "कर्ज"],
    answer:
      "Kisan Credit Card loans up to ₹3 lakh carry 7% interest, dropping to 4% if repaid on time. If an EMI is overdue, visit the branch and ask for a restructuring under the RBI relief window before it becomes an NPA — carry your KCC passbook and last two receipts.",
  },
  {
    keys: ["vet", "veterinary", "cattle", "animal", "पशु"],
    answer:
      "The mobile veterinary unit (helpline 1962) visits your block on Thursday, 10 AM–2 PM at the panchayat ground. Free deworming and FMD vaccination are available. Carry the animal's ear-tag number.",
  },
  {
    keys: ["water", "road", "electricity", "complaint", "शिकायत"],
    answer:
      "You can log this on the Rural Issue Reporting page with a photo and location. Complaints are routed to the concerned department with a tracking number, and the Issue Map shows resolution status for your village.",
  },
];

const fallback =
  "I can help with crops and pests, weather advisories, mandi prices, government schemes, loans and village issue reporting. Could you share a little more detail — your crop, village or the scheme name?";

const langNote: Record<string, string> = {
  en: "",
  hi: "\n\n(हिन्दी में उत्तर जल्द उपलब्ध होगा — यह डेमो उत्तर है।)",
  ta: "\n\n(தமிழ் பதில் விரைவில் — இது ஒரு டெமோ பதில்.)",
  te: "\n\n(తెలుగు సమాధానం త్వరలో — ఇది డెమో సమాధానం.)",
  kn: "\n\n(ಕನ್ನಡ ಉತ್ತರ ಶೀಘ್ರದಲ್ಲೇ — ಇದು ಡೆಮೊ ಉತ್ತರ.)",
  mr: "\n\n(मराठी उत्तर लवकरच — हे डेमो उत्तर आहे.)",
  bn: "\n\n(বাংলা উত্তর শীঘ্রই — এটি একটি ডেমো উত্তর।)",
};

function getReply(question: string, lang: string) {
  const q = question.toLowerCase();
  const hit = rules.find((r) => r.keys.some((k) => q.includes(k.toLowerCase())));
  return (hit ? hit.answer : fallback) + (langNote[lang] ?? "");
}

let idCounter = 0;
const nextId = () => ++idCounter;

function AssistantPage() {
  const [lang, setLang] = useState("en");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: "bot", text: greetings['en']! },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: value }]);
    setInput("");
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: getReply(value, lang) }]);
      setTyping(false);
    }, 900);
  };

  const clearChat = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTyping(false);
    setInput("");
    setMessages([{ id: nextId(), role: "bot", text: greetings[lang] ?? greetings['en']! }]);
  };

  const changeLang = (value: string) => {
    setLang(value);
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "bot", text: greetings[value] ?? greetings['en']! },
    ]);
  };

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
            <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 border-b border-border">
              <CardTitle className="text-base">Chat</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={lang} onValueChange={changeLang}>
                  <SelectTrigger className="h-9 w-[170px]" aria-label="Select language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((l) => (
                      <SelectItem key={l.code} value={l.code}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <Eraser className="size-4" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div
                ref={scrollRef}
                className="max-h-[26rem] space-y-4 overflow-y-auto pr-1"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                  >
                    {m.role === "bot" && (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Bot className="size-4" />
                      </span>
                    )}
                    <p
                      className={`max-w-lg whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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
                {typing && (
                  <div className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <Bot className="size-4" />
                    </span>
                    <span className="flex items-center gap-1.5 rounded-2xl bg-muted px-4 py-4">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-2 animate-bounce rounded-full bg-muted-foreground/70"
                          style={{ animationDelay: `${i * 140}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>

              <form
                className="flex items-center gap-2 border-t border-border pt-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crops, weather, prices or schemes…"
                  aria-label="Message"
                />
                <Button type="button" variant="outline" size="icon" aria-label="Voice input" disabled>
                  <Mic className="size-4" />
                </Button>
                <Button type="submit" size="icon" aria-label="Send" disabled={!input.trim() || typing}>
                  <Send className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Quick questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    disabled={typing}
                    className="w-full rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-60"
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
                  <Badge
                    key={l.code}
                    variant={l.code === lang ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => changeLang(l.code)}
                  >
                    {l.label}
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
