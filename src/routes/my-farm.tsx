import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  Sprout,
  MapPin,
  IndianRupee,
  CalendarDays,
  Plus,
  Wheat,
  Leaf,
  Droplets,
  Tractor,
  X,
  Trash2,
} from "lucide-react";

import {
  useI18n,
  type LanguageCode,
} from "@/lib/i18n";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/my-farm")({
  component: MyFarmPage,
});

/* =========================================================
   TYPES
========================================================= */

type FarmStatus =
  | "growingWell"
  | "growing"
  | "planned";

type Farm = {
  id: number;
  name?: string;
  area: string;
  soil?: string;
  crop?: string;
  sowingDate?: string;
  progress: number;
  status: FarmStatus;
};

type NewPlot = {
  name: string;
  area: string;
  soil: string;
  crop: string;
  sowingDate: string;
};

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "gramsahay.myFarm";

/* =========================================================
   DEFAULT FARMS
========================================================= */

const defaultFarms: Farm[] = [
  {
    id: 1,
    name: "Plot A",
    area: "2.1",
    soil: "Black cotton soil",
    crop: "Onion",
    sowingDate: "2026-06-12",
    progress: 74,
    status: "growingWell",
  },
  {
    id: 2,
    name: "Plot B",
    area: "1.6",
    soil: "Loamy soil",
    crop: "Soybean",
    sowingDate: "2026-06-28",
    progress: 58,
    status: "growing",
  },
  {
    id: 3,
    name: "Plot C",
    area: "0.9",
    soil: "Sandy loam",
    crop: "Wheat",
    sowingDate: "2026-11-01",
    progress: 8,
    status: "planned",
  },
];

/* =========================================================
   LOCALIZED TEXT TYPE
========================================================= */

type FarmLanguageText = {
  addPlot: string;
  addPlotTitle: string;
  plotName: string;
  area: string;
  soil: string;
  crop: string;
  sowingDate: string;
  savePlot: string;
  cancel: string;
  deletePlot: string;

  totalLand: string;
  acres: string;
  activeCrops: string;
  seasonSpend: string;
  nextHarvest: string;

  plots: string;
  tasks: string;
  expenses: string;

  seasonProgress: string;
  sown: string;

  expensesTitle: string;
  totalSeason: string;

  farmingAdvice: string;
  farmingAdviceDescription: string;
  askAi: string;

  growingWell: string;
  growing: string;
  planned: string;

  today: string;
  tomorrow: string;
  november: string;

  weedingRequired: string;
  irrigationCheck: string;
  prepareWheatField: string;

  seeds: string;
  fertilizer: string;
  labour: string;
  pesticides: string;

  noPlots: string;
  noPlotsDescription: string;

  plotA: string;
  plotB: string;
  plotC: string;

  blackCotton: string;
  loamy: string;
  sandyLoam: string;

  onion: string;
  soybean: string;
  wheat: string;
};

/* =========================================================
   ENGLISH
========================================================= */

const englishText: FarmLanguageText = {
  addPlot: "Add Plot",
  addPlotTitle: "Add New Plot",
  plotName: "Plot Name",
  area: "Area",
  soil: "Soil Type",
  crop: "Crop",
  sowingDate: "Sowing Date",
  savePlot: "Save Plot",
  cancel: "Cancel",
  deletePlot: "Delete Plot",

  totalLand: "Total Land",
  acres: "acres",
  activeCrops: "Active Crops",
  seasonSpend: "Season Spend",
  nextHarvest: "Next Harvest",

  plots: "Plots",
  tasks: "Tasks",
  expenses: "Expenses",

  seasonProgress: "Season Progress",
  sown: "Sown",

  expensesTitle: "Season Expenses",
  totalSeason: "Total Season Spend",

  farmingAdvice: "Need farming advice?",
  farmingAdviceDescription:
    "Ask the AI Rural Assistant for crop care, irrigation, pest and farming guidance.",
  askAi: "Ask AI",

  growingWell: "Growing well",
  growing: "Growing",
  planned: "Planned",

  today: "Today",
  tomorrow: "Tomorrow",
  november: "November",

  weedingRequired: "Weeding required",
  irrigationCheck: "Irrigation check",
  prepareWheatField: "Prepare wheat field",

  seeds: "Seeds",
  fertilizer: "Fertilizer",
  labour: "Labour",
  pesticides: "Pesticides",

  noPlots: "No plots added",
  noPlotsDescription:
    "Add your first farm plot to start managing your farm.",

  plotA: "Plot A",
  plotB: "Plot B",
  plotC: "Plot C",

  blackCotton: "Black cotton soil",
  loamy: "Loamy soil",
  sandyLoam: "Sandy loam",

  onion: "Onion",
  soybean: "Soybean",
  wheat: "Wheat",
};

/* =========================================================
   TELUGU
========================================================= */

const teluguText: FarmLanguageText = {
  addPlot: "పొలం జోడించండి",
  addPlotTitle: "కొత్త పొలం జోడించండి",
  plotName: "పొలం పేరు",
  area: "విస్తీర్ణం",
  soil: "నేల రకం",
  crop: "పంట",
  sowingDate: "విత్తిన తేదీ",
  savePlot: "పొలం సేవ్ చేయండి",
  cancel: "రద్దు",
  deletePlot: "పొలం తొలగించండి",

  totalLand: "మొత్తం భూమి",
  acres: "ఎకరాలు",
  activeCrops: "ప్రస్తుతం ఉన్న పంటలు",
  seasonSpend: "సీజన్ ఖర్చు",
  nextHarvest: "తదుపరి కోత",

  plots: "పొలాలు",
  tasks: "పనులు",
  expenses: "ఖర్చులు",

  seasonProgress: "పంట పురోగతి",
  sown: "విత్తిన తేదీ",

  expensesTitle: "సీజన్ ఖర్చులు",
  totalSeason: "మొత్తం సీజన్ ఖర్చు",

  farmingAdvice: "వ్యవసాయ సలహా కావాలా?",
  farmingAdviceDescription:
    "పంట సంరక్షణ, నీటిపారుదల, తెగుళ్లు మరియు వ్యవసాయంపై AI గ్రామీణ సహాయకుడిని అడగండి.",
  askAi: "AIని అడగండి",

  growingWell: "బాగా పెరుగుతోంది",
  growing: "పెరుగుతోంది",
  planned: "ప్రణాళికలో ఉంది",

  today: "ఈరోజు",
  tomorrow: "రేపు",
  november: "నవంబర్",

  weedingRequired: "కలుపు తీయాలి",
  irrigationCheck: "నీటిపారుదల తనిఖీ",
  prepareWheatField: "గోధుమ పొలాన్ని సిద్ధం చేయండి",

  seeds: "విత్తనాలు",
  fertilizer: "ఎరువులు",
  labour: "కూలీ",
  pesticides: "పురుగుమందులు",

  noPlots: "పొలాలు ఏవీ లేవు",
  noPlotsDescription:
    "మీ పొలాన్ని నిర్వహించడం ప్రారంభించడానికి మొదటి పొలాన్ని జోడించండి.",

  plotA: "పొలం A",
  plotB: "పొలం B",
  plotC: "పొలం C",

  blackCotton: "నల్ల పత్తి నేల",
  loamy: "లోమీ నేల",
  sandyLoam: "ఇసుక లోమీ నేల",

  onion: "ఉల్లిపాయ",
  soybean: "సోయాబీన్",
  wheat: "గోధుమ",
};

/* =========================================================
   HINDI
========================================================= */

const hindiText: FarmLanguageText = {
  addPlot: "खेत जोड़ें",
  addPlotTitle: "नया खेत जोड़ें",
  plotName: "खेत का नाम",
  area: "क्षेत्रफल",
  soil: "मिट्टी का प्रकार",
  crop: "फसल",
  sowingDate: "बुवाई की तारीख",
  savePlot: "खेत सेव करें",
  cancel: "रद्द करें",
  deletePlot: "खेत हटाएं",

  totalLand: "कुल भूमि",
  acres: "एकड़",
  activeCrops: "सक्रिय फसलें",
  seasonSpend: "सीजन खर्च",
  nextHarvest: "अगली कटाई",

  plots: "खेत",
  tasks: "कार्य",
  expenses: "खर्च",

  seasonProgress: "फसल प्रगति",
  sown: "बुवाई",

  expensesTitle: "सीजन के खर्च",
  totalSeason: "कुल सीजन खर्च",

  farmingAdvice: "कृषि सलाह चाहिए?",
  farmingAdviceDescription:
    "फसल देखभाल, सिंचाई, कीट और खेती की जानकारी के लिए AI ग्रामीण सहायक से पूछें।",
  askAi: "AI से पूछें",

  growingWell: "अच्छी तरह बढ़ रही है",
  growing: "बढ़ रही है",
  planned: "योजना में",

  today: "आज",
  tomorrow: "कल",
  november: "नवंबर",

  weedingRequired: "निराई आवश्यक",
  irrigationCheck: "सिंचाई की जांच",
  prepareWheatField: "गेहूं का खेत तैयार करें",

  seeds: "बीज",
  fertilizer: "उर्वरक",
  labour: "मजदूरी",
  pesticides: "कीटनाशक",

  noPlots: "कोई खेत नहीं जोड़ा गया",
  noPlotsDescription:
    "अपने खेत का प्रबंधन शुरू करने के लिए पहला खेत जोड़ें।",

  plotA: "खेत A",
  plotB: "खेत B",
  plotC: "खेत C",

  blackCotton: "काली कपास मिट्टी",
  loamy: "दोमट मिट्टी",
  sandyLoam: "बलुई दोमट मिट्टी",

  onion: "प्याज",
  soybean: "सोयाबीन",
  wheat: "गेहूं",
};

/* =========================================================
   MARATHI
========================================================= */

const marathiText: FarmLanguageText = {
  addPlot: "शेत जोडा",
  addPlotTitle: "नवीन शेत जोडा",
  plotName: "शेताचे नाव",
  area: "क्षेत्रफळ",
  soil: "मातीचा प्रकार",
  crop: "पीक",
  sowingDate: "पेरणीची तारीख",
  savePlot: "शेत जतन करा",
  cancel: "रद्द करा",
  deletePlot: "शेत हटवा",

  totalLand: "एकूण जमीन",
  acres: "एकर",
  activeCrops: "सक्रिय पिके",
  seasonSpend: "हंगामातील खर्च",
  nextHarvest: "पुढील कापणी",

  plots: "शेत",
  tasks: "कामे",
  expenses: "खर्च",

  seasonProgress: "हंगामातील प्रगती",
  sown: "पेरणी",

  expensesTitle: "हंगामातील खर्च",
  totalSeason: "एकूण हंगाम खर्च",

  farmingAdvice: "शेतीचा सल्ला हवा आहे?",
  farmingAdviceDescription:
    "पीक काळजी, सिंचन, कीड आणि शेतीविषयक मार्गदर्शनासाठी AI ग्रामीण सहाय्यकाला विचारा.",
  askAi: "AI ला विचारा",

  growingWell: "चांगले वाढत आहे",
  growing: "वाढत आहे",
  planned: "नियोजित",

  today: "आज",
  tomorrow: "उद्या",
  november: "नोव्हेंबर",

  weedingRequired: "तण काढणे आवश्यक",
  irrigationCheck: "सिंचन तपासणी",
  prepareWheatField: "गव्हाचे शेत तयार करा",

  seeds: "बियाणे",
  fertilizer: "खत",
  labour: "मजुरी",
  pesticides: "कीटकनाशके",

  noPlots: "कोणतेही शेत जोडलेले नाही",
  noPlotsDescription:
    "शेतीचे व्यवस्थापन सुरू करण्यासाठी पहिले शेत जोडा.",

  plotA: "शेत A",
  plotB: "शेत B",
  plotC: "शेत C",

  blackCotton: "काळी कापूस माती",
  loamy: "चिकणमाती",
  sandyLoam: "वालुकामय चिकणमाती",

  onion: "कांदा",
  soybean: "सोयाबीन",
  wheat: "गहू",
};

/* =========================================================
   TAMIL
========================================================= */

const tamilText: FarmLanguageText = {
  addPlot: "வயலைச் சேர்க்கவும்",
  addPlotTitle: "புதிய வயலைச் சேர்க்கவும்",
  plotName: "வயல் பெயர்",
  area: "பரப்பளவு",
  soil: "மண் வகை",
  crop: "பயிர்",
  sowingDate: "விதைத்த தேதி",
  savePlot: "வயலைச் சேமிக்கவும்",
  cancel: "ரத்து செய்",
  deletePlot: "வயலை நீக்கவும்",

  totalLand: "மொத்த நிலம்",
  acres: "ஏக்கர்",
  activeCrops: "செயலில் உள்ள பயிர்கள்",
  seasonSpend: "பருவச் செலவு",
  nextHarvest: "அடுத்த அறுவடை",

  plots: "வயல்கள்",
  tasks: "பணிகள்",
  expenses: "செலவுகள்",

  seasonProgress: "பருவ முன்னேற்றம்",
  sown: "விதைத்தது",

  expensesTitle: "பருவச் செலவுகள்",
  totalSeason: "மொத்த பருவச் செலவு",

  farmingAdvice: "விவசாய ஆலோசனை வேண்டுமா?",
  farmingAdviceDescription:
    "பயிர் பராமரிப்பு, நீர்ப்பாசனம், பூச்சிகள் மற்றும் விவசாய வழிகாட்டுதலுக்கு AI கிராமப்புற உதவியாளரிடம் கேளுங்கள்.",
  askAi: "AI-யிடம் கேளுங்கள்",

  growingWell: "நன்றாக வளர்கிறது",
  growing: "வளர்கிறது",
  planned: "திட்டமிடப்பட்டுள்ளது",

  today: "இன்று",
  tomorrow: "நாளை",
  november: "நவம்பர்",

  weedingRequired: "களை எடுக்க வேண்டும்",
  irrigationCheck: "நீர்ப்பாசனச் சோதனை",
  prepareWheatField: "கோதுமை வயலைத் தயார் செய்யவும்",

  seeds: "விதைகள்",
  fertilizer: "உரம்",
  labour: "தொழிலாளர் செலவு",
  pesticides: "பூச்சிக்கொல்லிகள்",

  noPlots: "வயல்கள் எதுவும் இல்லை",
  noPlotsDescription:
    "உங்கள் பண்ணையை நிர்வகிக்க முதல் வயலைச் சேர்க்கவும்.",

  plotA: "வயல் A",
  plotB: "வயல் B",
  plotC: "வயல் C",

  blackCotton: "கரிசல் மண்",
  loamy: "வண்டல் மண்",
  sandyLoam: "மணல் கலந்த வண்டல் மண்",

  onion: "வெங்காயம்",
  soybean: "சோயாபீன்",
  wheat: "கோதுமை",
};

/* =========================================================
   KANNADA
========================================================= */

const kannadaText: FarmLanguageText = {
  addPlot: "ಹೊಲ ಸೇರಿಸಿ",
  addPlotTitle: "ಹೊಸ ಹೊಲ ಸೇರಿಸಿ",
  plotName: "ಹೊಲದ ಹೆಸರು",
  area: "ವಿಸ್ತೀರ್ಣ",
  soil: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
  crop: "ಬೆಳೆ",
  sowingDate: "ಬಿತ್ತನೆ ದಿನಾಂಕ",
  savePlot: "ಹೊಲ ಉಳಿಸಿ",
  cancel: "ರದ್ದುಮಾಡಿ",
  deletePlot: "ಹೊಲ ಅಳಿಸಿ",

  totalLand: "ಒಟ್ಟು ಭೂಮಿ",
  acres: "ಎಕರೆ",
  activeCrops: "ಸಕ್ರಿಯ ಬೆಳೆಗಳು",
  seasonSpend: "ಋತುವಿನ ಖರ್ಚು",
  nextHarvest: "ಮುಂದಿನ ಕೊಯ್ಲು",

  plots: "ಹೊಲಗಳು",
  tasks: "ಕಾರ್ಯಗಳು",
  expenses: "ಖರ್ಚುಗಳು",

  seasonProgress: "ಋತುವಿನ ಪ್ರಗತಿ",
  sown: "ಬಿತ್ತನೆ",

  expensesTitle: "ಋತುವಿನ ಖರ್ಚುಗಳು",
  totalSeason: "ಒಟ್ಟು ಋತುವಿನ ಖರ್ಚು",

  farmingAdvice: "ಕೃಷಿ ಸಲಹೆ ಬೇಕೇ?",
  farmingAdviceDescription:
    "ಬೆಳೆ ಆರೈಕೆ, ನೀರಾವರಿ, ಕೀಟಗಳು ಮತ್ತು ಕೃಷಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ AI ಗ್ರಾಮೀಣ ಸಹಾಯಕನನ್ನು ಕೇಳಿ.",
  askAi: "AI ಕೇಳಿ",

  growingWell: "ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತಿದೆ",
  growing: "ಬೆಳೆಯುತ್ತಿದೆ",
  planned: "ಯೋಜಿಸಲಾಗಿದೆ",

  today: "ಇಂದು",
  tomorrow: "ನಾಳೆ",
  november: "ನವೆಂಬರ್",

  weedingRequired: "ಕಳೆ ತೆಗೆಯಬೇಕು",
  irrigationCheck: "ನೀರಾವರಿ ಪರಿಶೀಲನೆ",
  prepareWheatField: "ಗೋಧಿ ಹೊಲವನ್ನು ಸಿದ್ಧಪಡಿಸಿ",

  seeds: "ಬೀಜಗಳು",
  fertilizer: "ರಸಗೊಬ್ಬರ",
  labour: "ಕಾರ್ಮಿಕ ವೆಚ್ಚ",
  pesticides: "ಕೀಟನಾಶಕಗಳು",

  noPlots: "ಯಾವುದೇ ಹೊಲಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ",
  noPlotsDescription:
    "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ನಿರ್ವಹಿಸಲು ಮೊದಲ ಹೊಲವನ್ನು ಸೇರಿಸಿ.",

  plotA: "ಹೊಲ A",
  plotB: "ಹೊಲ B",
  plotC: "ಹೊಲ C",

  blackCotton: "ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು",
  loamy: "ಲೋಮಿ ಮಣ್ಣು",
  sandyLoam: "ಮರಳು ಲೋಮಿ ಮಣ್ಣು",

  onion: "ಈರುಳ್ಳಿ",
  soybean: "ಸೋಯಾಬೀನ್",
  wheat: "ಗೋಧಿ",
};

/* =========================================================
   BENGALI
========================================================= */

const bengaliText: FarmLanguageText = {
  addPlot: "জমি যোগ করুন",
  addPlotTitle: "নতুন জমি যোগ করুন",
  plotName: "জমির নাম",
  area: "জমির পরিমাণ",
  soil: "মাটির ধরন",
  crop: "ফসল",
  sowingDate: "বপনের তারিখ",
  savePlot: "জমি সংরক্ষণ করুন",
  cancel: "বাতিল",
  deletePlot: "জমি মুছুন",

  totalLand: "মোট জমি",
  acres: "একর",
  activeCrops: "সক্রিয় ফসল",
  seasonSpend: "মৌসুমের খরচ",
  nextHarvest: "পরবর্তী ফসল সংগ্রহ",

  plots: "জমি",
  tasks: "কাজ",
  expenses: "খরচ",

  seasonProgress: "মৌসুমের অগ্রগতি",
  sown: "বপন",

  expensesTitle: "মৌসুমের খরচ",
  totalSeason: "মোট মৌসুমের খরচ",

  farmingAdvice: "কৃষি পরামর্শ চান?",
  farmingAdviceDescription:
    "ফসলের যত্ন, সেচ, পোকামাকড় এবং কৃষি নির্দেশনার জন্য AI গ্রামীণ সহকারীকে জিজ্ঞাসা করুন।",
  askAi: "AI-কে জিজ্ঞাসা করুন",

  growingWell: "ভালোভাবে বেড়ে উঠছে",
  growing: "বেড়ে উঠছে",
  planned: "পরিকল্পিত",

  today: "আজ",
  tomorrow: "আগামীকাল",
  november: "নভেম্বর",

  weedingRequired: "আগাছা পরিষ্কার করা দরকার",
  irrigationCheck: "সেচ পরীক্ষা",
  prepareWheatField: "গমের জমি প্রস্তুত করুন",

  seeds: "বীজ",
  fertilizer: "সার",
  labour: "শ্রমিক খরচ",
  pesticides: "কীটনাশক",

  noPlots: "কোনও জমি যোগ করা হয়নি",
  noPlotsDescription:
    "আপনার খামার পরিচালনা শুরু করতে প্রথম জমিটি যোগ করুন।",

  plotA: "জমি A",
  plotB: "জমি B",
  plotC: "জমি C",

  blackCotton: "কালো তুলা মাটি",
  loamy: "দোআঁশ মাটি",
  sandyLoam: "বেলে দোআঁশ মাটি",

  onion: "পেঁয়াজ",
  soybean: "সয়াবিন",
  wheat: "গম",
};

/* =========================================================
   ALL LANGUAGES
========================================================= */

const farmLanguages: Record<
  LanguageCode,
  FarmLanguageText
> = {
  en: englishText,
  te: teluguText,
  hi: hindiText,
  mr: marathiText,
  ta: tamilText,
  kn: kannadaText,
  bn: bengaliText,
};

/* =========================================================
   PAGE
========================================================= */

function MyFarmPage() {
  const { lang, t } = useI18n();
  const navigate = useNavigate();

  const text =
    farmLanguages[lang] ?? englishText;

  /* =======================================================
     STATE
  ======================================================= */

  const [showAddPlot, setShowAddPlot] =
    useState(false);

  const [newPlot, setNewPlot] =
    useState<NewPlot>({
      name: "",
      area: "",
      soil: "",
      crop: "",
      sowingDate: "",
    });

  const [farms, setFarms] =
    useState<Farm[]>(defaultFarms);

  /* =======================================================
     LOAD FARMS
  ======================================================= */

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(
          STORAGE_KEY,
        );

      if (!saved) {
        return;
      }

      const parsed: unknown =
        JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setFarms(parsed as Farm[]);
      }
    } catch {
      setFarms(defaultFarms);
    }
  }, []);

  /* =======================================================
     SAVE FARMS
  ======================================================= */

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(farms),
      );
    } catch {
      // Ignore localStorage errors.
    }
  }, [farms]);

  /* =======================================================
     TASKS
  ======================================================= */

  const tasks = [
    {
      id: 1,
      title: text.weedingRequired,
      plot: text.plotA,
      date: text.today,
      icon: Leaf,
    },
    {
      id: 2,
      title: text.irrigationCheck,
      plot: text.plotB,
      date: text.tomorrow,
      icon: Droplets,
    },
    {
      id: 3,
      title: text.prepareWheatField,
      plot: text.plotC,
      date: text.november,
      icon: Wheat,
    },
  ];

  /* =======================================================
     EXPENSES
  ======================================================= */

  const expenses = [
    {
      id: 1,
      title: text.seeds,
      amount: "₹18,500",
    },
    {
      id: 2,
      title: text.fertilizer,
      amount: "₹24,000",
    },
    {
      id: 3,
      title: text.labour,
      amount: "₹28,400",
    },
    {
      id: 4,
      title: text.pesticides,
      amount: "₹15,500",
    },
  ];

  /* =======================================================
     ADD PLOT
  ======================================================= */

  const addPlot = () => {
    const name =
      newPlot.name.trim();

    const area =
      newPlot.area.trim();

    const soil =
      newPlot.soil.trim();

    const crop =
      newPlot.crop.trim();

    const sowingDate =
      newPlot.sowingDate.trim();

    if (!name || !area) {
      return;
    }

    const numericArea =
      Number.parseFloat(area);

    if (
      Number.isNaN(numericArea) ||
      numericArea <= 0
    ) {
      return;
    }

    const farm: Farm = {
      id: Date.now(),

      name,

      area: numericArea.toString(),

      ...(soil
        ? { soil }
        : {}),

      ...(crop
        ? { crop }
        : {}),

      ...(sowingDate
        ? { sowingDate }
        : {}),

      progress: 0,

      status: "planned",
    };

    setFarms((previous) => [
      ...previous,
      farm,
    ]);

    setNewPlot({
      name: "",
      area: "",
      soil: "",
      crop: "",
      sowingDate: "",
    });

    setShowAddPlot(false);
  };

  /* =======================================================
     DELETE PLOT
  ======================================================= */

  const deletePlot = (id: number) => {
    setFarms((previous) =>
      previous.filter(
        (farm) => farm.id !== id,
      ),
    );
  };

  /* =======================================================
     DISPLAY NAME
  ======================================================= */

  const getFarmName = (
    farm: Farm,
  ): string => {
    if (farm.id === 1) {
      return text.plotA;
    }

    if (farm.id === 2) {
      return text.plotB;
    }

    if (farm.id === 3) {
      return text.plotC;
    }

    return farm.name ?? text.plotA;
  };

  /* =======================================================
     DISPLAY SOIL
  ======================================================= */

  const getFarmSoil = (
    farm: Farm,
  ): string => {
    if (farm.id === 1) {
      return text.blackCotton;
    }

    if (farm.id === 2) {
      return text.loamy;
    }

    if (farm.id === 3) {
      return text.sandyLoam;
    }

    return farm.soil ?? "—";
  };

  /* =======================================================
     DISPLAY CROP
  ======================================================= */

  const getFarmCrop = (
    farm: Farm,
  ): string => {
    if (farm.id === 1) {
      return text.onion;
    }

    if (farm.id === 2) {
      return text.soybean;
    }

    if (farm.id === 3) {
      return text.wheat;
    }

    return farm.crop ?? "—";
  };

  /* =======================================================
     DISPLAY SOWING DATE
  ======================================================= */

  const getFarmSowingDate = (
    farm: Farm,
  ): string => {
    if (!farm.sowingDate) {
      return "—";
    }

    const date =
      new Date(
        `${farm.sowingDate}T00:00:00`,
      );

    if (Number.isNaN(date.getTime())) {
      return farm.sowingDate;
    }

    /* -----------------------------------------------------
       TELUGU
    ----------------------------------------------------- */

    if (lang === "te") {
      const months = [
        "జనవరి",
        "ఫిబ్రవరి",
        "మార్చి",
        "ఏప్రిల్",
        "మే",
        "జూన్",
        "జూలై",
        "ఆగస్టు",
        "సెప్టెంబర్",
        "అక్టోబర్",
        "నవంబర్",
        "డిసెంబర్",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       HINDI
    ----------------------------------------------------- */

    if (lang === "hi") {
      const months = [
        "जनवरी",
        "फरवरी",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्त",
        "सितंबर",
        "अक्टूबर",
        "नवंबर",
        "दिसंबर",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       MARATHI
    ----------------------------------------------------- */

    if (lang === "mr") {
      const months = [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जून",
        "जुलै",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       TAMIL
    ----------------------------------------------------- */

    if (lang === "ta") {
      const months = [
        "ஜனவரி",
        "பிப்ரவரி",
        "மார்ச்",
        "ஏப்ரல்",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆகஸ்ட்",
        "செப்டம்பர்",
        "அக்டோபர்",
        "நவம்பர்",
        "டிசம்பர்",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       KANNADA
    ----------------------------------------------------- */

    if (lang === "kn") {
      const months = [
        "ಜನವರಿ",
        "ಫೆಬ್ರವರಿ",
        "ಮಾರ್ಚ್",
        "ಏಪ್ರಿಲ್",
        "ಮೇ",
        "ಜೂನ್",
        "ಜುಲೈ",
        "ಆಗಸ್ಟ್",
        "ಸೆಪ್ಟೆಂಬರ್",
        "ಅಕ್ಟೋಬರ್",
        "ನವೆಂಬರ್",
        "ಡಿಸೆಂಬರ್",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       BENGALI
    ----------------------------------------------------- */

    if (lang === "bn") {
      const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
      ];

      return `${String(
        date.getDate(),
      ).padStart(2, "0")}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }

    /* -----------------------------------------------------
       ENGLISH
    ----------------------------------------------------- */

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    );
  };

  /* =======================================================
     STATUS
  ======================================================= */

  const getStatusText = (
    status: FarmStatus,
  ): string => {
    if (status === "growingWell") {
      return text.growingWell;
    }

    if (status === "growing") {
      return text.growing;
    }

    return text.planned;
  };

  /* =======================================================
     CALCULATIONS
  ======================================================= */

  const totalLand =
    farms.reduce(
      (sum, farm) => {
        const area =
          Number.parseFloat(
            farm.area,
          );

        return (
          sum +
          (Number.isNaN(area)
            ? 0
            : area)
        );
      },
      0,
    );

  const activeCrops =
    farms.filter(
      (farm) =>
        farm.progress > 0,
    ).length;

  /* =======================================================
     NEXT HARVEST
  ======================================================= */

  const nextHarvestMonth =
    lang === "te"
      ? "సెప్టెంబర్"
      : lang === "hi"
        ? "सितंबर"
        : lang === "mr"
          ? "सप्टेंबर"
          : lang === "ta"
            ? "செப்டம்பர்"
            : lang === "kn"
              ? "ಸೆಪ್ಟೆಂಬರ್"
              : lang === "bn"
                ? "সেপ্টেম্বর"
                : "September";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-background">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="border-b bg-muted/30">

        <div className="container mx-auto px-4 py-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="mb-2 text-sm font-medium text-primary">
                {t(
                  "page.myFarm.eyebrow",
                )}
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {t("nav.myFarm")}
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                {t(
                  "page.myFarm.description",
                )}
              </p>

            </div>

            <Button
              className="gap-2"
              onClick={() =>
                setShowAddPlot(true)
              }
            >

              <Plus className="h-4 w-4" />

              {text.addPlot}

            </Button>

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="container mx-auto px-4 py-8">

        {/* =================================================
            ADD PLOT
        ================================================= */}

        {showAddPlot && (
          <Card className="mb-8">

            <CardHeader>

              <div className="flex items-center justify-between">

                <CardTitle>
                  {text.addPlotTitle}
                </CardTitle>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setShowAddPlot(false)
                  }
                  aria-label={
                    text.cancel
                  }
                >
                  <X className="h-4 w-4" />
                </Button>

              </div>

            </CardHeader>

            <CardContent>

              <div className="grid gap-4 md:grid-cols-2">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    {text.plotName}
                  </label>

                  <input
                    value={newPlot.name}
                    onChange={(event) =>
                      setNewPlot({
                        ...newPlot,
                        name:
                          event.target.value,
                      })
                    }
                    placeholder={
                      text.plotName
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

                {/* AREA */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    {text.area}
                  </label>

                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={newPlot.area}
                    onChange={(event) =>
                      setNewPlot({
                        ...newPlot,
                        area:
                          event.target.value,
                      })
                    }
                    placeholder="2.0"
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

                {/* SOIL */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    {text.soil}
                  </label>

                  <input
                    value={newPlot.soil}
                    onChange={(event) =>
                      setNewPlot({
                        ...newPlot,
                        soil:
                          event.target.value,
                      })
                    }
                    placeholder={
                      text.soil
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

                {/* CROP */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    {text.crop}
                  </label>

                  <input
                    value={newPlot.crop}
                    onChange={(event) =>
                      setNewPlot({
                        ...newPlot,
                        crop:
                          event.target.value,
                      })
                    }
                    placeholder={
                      text.crop
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

                {/* SOWING DATE */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    {text.sowingDate}
                  </label>

                  <input
                    type="date"
                    value={
                      newPlot.sowingDate
                    }
                    onChange={(event) =>
                      setNewPlot({
                        ...newPlot,
                        sowingDate:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="mt-5 flex flex-wrap gap-3">

                <Button
                  onClick={addPlot}
                  disabled={
                    !newPlot.name.trim() ||
                    !newPlot.area.trim()
                  }
                >

                  <Plus className="mr-2 h-4 w-4" />

                  {text.savePlot}

                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setNewPlot({
                      name: "",
                      area: "",
                      soil: "",
                      crop: "",
                      sowingDate: "",
                    });

                    setShowAddPlot(
                      false,
                    );
                  }}
                >
                  {text.cancel}
                </Button>

              </div>

            </CardContent>

          </Card>
        )}

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL LAND */}

          <Card>

            <CardContent className="flex items-center gap-4 p-6">

              <div className="rounded-xl bg-primary/10 p-3">

                <MapPin className="h-6 w-6 text-primary" />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  {text.totalLand}
                </p>

                <p className="text-2xl font-bold">
                  {totalLand.toFixed(1)}{" "}
                  {text.acres}
                </p>

              </div>

            </CardContent>

          </Card>

          {/* ACTIVE CROPS */}

          <Card>

            <CardContent className="flex items-center gap-4 p-6">

              <div className="rounded-xl bg-primary/10 p-3">

                <Sprout className="h-6 w-6 text-primary" />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  {text.activeCrops}
                </p>

                <p className="text-2xl font-bold">
                  {activeCrops}
                </p>

              </div>

            </CardContent>

          </Card>

          {/* SEASON SPEND */}

          <Card>

            <CardContent className="flex items-center gap-4 p-6">

              <div className="rounded-xl bg-primary/10 p-3">

                <IndianRupee className="h-6 w-6 text-primary" />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  {text.seasonSpend}
                </p>

                <p className="text-2xl font-bold">
                  ₹86,400
                </p>

              </div>

            </CardContent>

          </Card>

          {/* NEXT HARVEST */}

          <Card>

            <CardContent className="flex items-center gap-4 p-6">

              <div className="rounded-xl bg-primary/10 p-3">

                <CalendarDays className="h-6 w-6 text-primary" />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  {text.nextHarvest}
                </p>

                <p className="text-2xl font-bold">
                  {nextHarvestMonth}
                </p>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* =================================================
            TABS
        ================================================= */}

        <div className="mt-8">

          <Tabs
            defaultValue="plots"
            className="w-full"
          >

            <TabsList className="grid w-full max-w-md grid-cols-3">

              <TabsTrigger value="plots">
                {text.plots}
              </TabsTrigger>

              <TabsTrigger value="tasks">
                {text.tasks}
              </TabsTrigger>

              <TabsTrigger value="expenses">
                {text.expenses}
              </TabsTrigger>

            </TabsList>

            {/* =================================================
                PLOTS TAB
            ================================================= */}

            <TabsContent
              value="plots"
              className="mt-6"
            >

              {farms.length === 0 ? (

                <Card>

                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">

                    <Sprout className="mb-4 h-12 w-12 text-primary" />

                    <h3 className="text-lg font-semibold">
                      {text.noPlots}
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      {text.noPlotsDescription}
                    </p>

                    <Button
                      className="mt-5"
                      onClick={() =>
                        setShowAddPlot(
                          true,
                        )
                      }
                    >

                      <Plus className="mr-2 h-4 w-4" />

                      {text.addPlot}

                    </Button>

                  </CardContent>

                </Card>

              ) : (

                <div className="grid gap-5 lg:grid-cols-3">

                  {farms.map(
                    (farm) => (
                      <Card
                        key={farm.id}
                        className="overflow-hidden"
                      >

                        <CardHeader>

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <CardTitle className="text-xl">
                                {getFarmName(
                                  farm,
                                )}
                              </CardTitle>

                              <p className="mt-1 text-sm text-muted-foreground">
                                {farm.area}{" "}
                                {text.acres}{" "}
                                ·{" "}
                                {getFarmSoil(
                                  farm,
                                )}
                              </p>

                            </div>

                            <div className="flex shrink-0 items-center gap-2">

                              <div className="rounded-xl bg-primary/10 p-2">

                                <Sprout className="h-5 w-5 text-primary" />

                              </div>

                              {farm.id >
                                3 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    deletePlot(
                                      farm.id,
                                    )
                                  }
                                  aria-label={
                                    text.deletePlot
                                  }
                                >

                                  <Trash2 className="h-4 w-4 text-destructive" />

                                </Button>
                              )}

                            </div>

                          </div>

                        </CardHeader>

                        <CardContent className="space-y-5">

                          {/* CROP */}

                          <div>

                            <p className="text-sm text-muted-foreground">
                              {text.crop}
                            </p>

                            <div className="mt-1 flex items-center gap-2">

                              <Wheat className="h-5 w-5 text-primary" />

                              <span className="font-semibold">
                                {getFarmCrop(
                                  farm,
                                )}
                              </span>

                            </div>

                          </div>

                          {/* PROGRESS */}

                          <div>

                            <div className="flex items-center justify-between text-sm">

                              <span className="text-muted-foreground">
                                {text.seasonProgress}
                              </span>

                              <span className="font-semibold">
                                {farm.progress}%
                              </span>

                            </div>

                            <Progress
                              value={
                                farm.progress
                              }
                              className="mt-2"
                            />

                          </div>

                          {/* SOWING + STATUS */}

                          <div className="flex items-center justify-between border-t pt-4">

                            <div>

                              <p className="text-xs text-muted-foreground">
                                {text.sown}
                              </p>

                              <p className="text-sm font-medium">
                                {getFarmSowingDate(
                                  farm,
                                )}
                              </p>

                            </div>

                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                              {getStatusText(
                                farm.status,
                              )}
                            </span>

                          </div>

                        </CardContent>

                      </Card>
                    ),
                  )}

                </div>
              )}

            </TabsContent>

            {/* =================================================
                TASKS TAB
            ================================================= */}

            <TabsContent
              value="tasks"
              className="mt-6"
            >

              <div className="grid gap-4">

                {tasks.map(
                  (task) => {
                    const Icon =
                      task.icon;

                    return (
                      <Card
                        key={task.id}
                      >

                        <CardContent className="flex items-center gap-4 p-5">

                          <div className="rounded-xl bg-primary/10 p-3">

                            <Icon className="h-5 w-5 text-primary" />

                          </div>

                          <div className="flex-1">

                            <p className="font-semibold">
                              {task.title}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {task.plot}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-sm font-medium">
                              {task.date}
                            </p>

                          </div>

                        </CardContent>

                      </Card>
                    );
                  },
                )}

              </div>

            </TabsContent>

            {/* =================================================
                EXPENSES TAB
            ================================================= */}

            <TabsContent
              value="expenses"
              className="mt-6"
            >

              <Card>

                <CardHeader>

                  <CardTitle>
                    {text.expensesTitle}
                  </CardTitle>

                </CardHeader>

                <CardContent>

                  <div className="space-y-4">

                    {expenses.map(
                      (expense) => (
                        <div
                          key={
                            expense.id
                          }
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >

                          <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-muted p-2">

                              <IndianRupee className="h-4 w-4" />

                            </div>

                            <span className="font-medium">
                              {expense.title}
                            </span>

                          </div>

                          <span className="font-semibold">
                            {expense.amount}
                          </span>

                        </div>
                      ),
                    )}

                    <div className="flex items-center justify-between border-t pt-5">

                      <span className="font-bold">
                        {text.totalSeason}
                      </span>

                      <span className="text-xl font-bold text-primary">
                        ₹86,400
                      </span>

                    </div>

                  </div>

                </CardContent>

              </Card>

            </TabsContent>

          </Tabs>

        </div>

        {/* =================================================
            AI ADVICE
        ================================================= */}

        <Card className="mt-8">

          <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center">

            <div className="rounded-2xl bg-primary/10 p-4">

              <Tractor className="h-8 w-8 text-primary" />

            </div>

            <div className="flex-1">

              <h2 className="text-xl font-bold">
                {text.farmingAdvice}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {text.farmingAdviceDescription}
              </p>

            </div>

            <Button
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/assistant",
                })
              }
            >
              {text.askAi}
            </Button>

          </CardContent>

        </Card>

      </main>

    </div>
  );
}