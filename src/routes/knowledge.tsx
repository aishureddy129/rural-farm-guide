import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  PlayCircle,
  Clock,
  Search,
} from "lucide-react";

import {
  useI18n,
  useT,
  type LanguageCode,
} from "@/lib/i18n";

import {
  PageHeader,
  Section,
} from "@/components/layout/PageHeader";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      {
        title: "Knowledge Hub — GramSahay AI",
      },
      {
        name: "description",
        content:
          "Practical farming and rural-living guides, short videos and FAQs in simple local language.",
      },
      {
        property: "og:title",
        content: "Knowledge Hub — GramSahay AI",
      },
      {
        property: "og:description",
        content:
          "Learn better practices for soil, water, livestock, finance and health.",
      },
    ],
  }),
  component: KnowledgePage,
});

/* =========================================================
   TYPES
========================================================= */

type Guide = {
  title: string;
  topic: string;
  mins: number;
  level: string;
};

type Video = {
  title: string;
  dur: string;
  youtubeIds: Record<LanguageCode, string>;
};

type FAQ = {
  q: string;
  a: string;
};

type KnowledgeText = {
  searchPlaceholder: string;
  watchLearn: string;
  watchDescription: string;
  frequentlyAsked: string;
  minRead: string;
  beginner: string;
  intermediate: string;
  topics: Record<string, string>;
  guides: Record<string, string>;
  videos: Record<string, string>;
  videoLanguages: Record<string, string>;
  faqs: Record<string, FAQ>;
};

/* =========================================================
   ORIGINAL CONTENT KEYS
========================================================= */

const languageLabel: Record<LanguageCode, string> = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  mr: "Marathi",
  bn: "Bengali",
};

const topics = [
  "Soil health",
  "Water saving",
  "Organic inputs",
  "Livestock",
  "Post-harvest",
  "Rural finance",
  "Women & SHG",
  "Health",
];

const guides = [
  {
    title: "Making quality vermicompost in 45 days",
    topic: "Organic inputs",
    mins: 6,
    level: "Beginner",
  },
  {
    title: "Drip irrigation layout for 1 acre onion",
    topic: "Water saving",
    mins: 9,
    level: "Intermediate",
  },
  {
    title: "Reading your Soil Health Card correctly",
    topic: "Soil health",
    mins: 5,
    level: "Beginner",
  },
  {
    title: "Preventing mastitis in dairy cattle",
    topic: "Livestock",
    mins: 7,
    level: "Intermediate",
  },
  {
    title: "Storing onion to cut 30% losses",
    topic: "Post-harvest",
    mins: 8,
    level: "Beginner",
  },
  {
    title: "How a self-help group gets a bank loan",
    topic: "Rural finance",
    mins: 10,
    level: "Beginner",
  },
];

const videos: Video[] = [
  {
    title: "Seed treatment before kharif sowing",
    dur: "YouTube",
    youtubeIds: {
      // Real language-specific agriculture videos.
      en: "vjlhqzvyMbg",
      hi: "9YnalQQr8wQ",
      ta: "_FNOKBZR-Ak",
      te: "G4ib67d7YH8",
      kn: "nUhNKs9VS3w",
      mr: "7lI6vxPXGJ4",
      bn: "H_RDvydNROs",
    },
  },
];

const faqs = [
  {
    q: "How often should I test my soil?",
    a:
      "Once every two to three years for the same plot, and always before switching to a new crop cycle. Free testing is available through the Soil Health Card scheme at your block office.",
  },
  {
    q: "Is organic farming profitable on small holdings?",
    a:
      "It can be, but plan a 2–3 year transition. Start with one plot, build compost capacity on-farm, and secure a buyer or FPO tie-up before converting all your land.",
  },
  {
    q: "What is the best way to reduce irrigation cost?",
    a:
      "Combine drip or sprinkler systems with mulching and early-morning watering. With the PMKSY subsidy, most small farmers recover the drip cost within two seasons.",
  },
  {
    q: "Can I sell directly without going through a trader?",
    a:
      "Yes. Through eNAM, FPOs and direct farmgate buyers. Track mandi rates first so you know your floor price before negotiating.",
  },
];

/* =========================================================
   ENGLISH
========================================================= */

const en: KnowledgeText = {
  searchPlaceholder: "Search guides, crops or topics",
  watchLearn: "Watch & learn",
  watchDescription:
    "Short videos in local languages, made for low bandwidth.",
  frequentlyAsked: "Frequently asked",
  minRead: "min read",
  beginner: "Beginner",
  intermediate: "Intermediate",

  topics: {
    "Soil health": "Soil health",
    "Water saving": "Water saving",
    "Organic inputs": "Organic inputs",
    Livestock: "Livestock",
    "Post-harvest": "Post-harvest",
    "Rural finance": "Rural finance",
    "Women & SHG": "Women & SHG",
    Health: "Health",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "Making quality vermicompost in 45 days",
    "Drip irrigation layout for 1 acre onion":
      "Drip irrigation layout for 1 acre onion",
    "Reading your Soil Health Card correctly":
      "Reading your Soil Health Card correctly",
    "Preventing mastitis in dairy cattle":
      "Preventing mastitis in dairy cattle",
    "Storing onion to cut 30% losses":
      "Storing onion to cut 30% losses",
    "How a self-help group gets a bank loan":
      "How a self-help group gets a bank loan",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "Seed treatment before kharif sowing",
    "Identifying fall armyworm early":
      "Identifying fall armyworm early",
    "Filling the PM-Fasal Bima form":
      "Filling the PM-Fasal Bima form",
  },

  videoLanguages: {
    Hindi: "Hindi",
    Marathi: "Marathi",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "How often should I test my soil?",
      a:
        "Once every two to three years for the same plot, and always before switching to a new crop cycle. Free testing is available through the Soil Health Card scheme at your block office.",
    },

    "Is organic farming profitable on small holdings?": {
      q: "Is organic farming profitable on small holdings?",
      a:
        "It can be, but plan a 2–3 year transition. Start with one plot, build compost capacity on-farm, and secure a buyer or FPO tie-up before converting all your land.",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "What is the best way to reduce irrigation cost?",
      a:
        "Combine drip or sprinkler systems with mulching and early-morning watering. With the PMKSY subsidy, most small farmers recover the drip cost within two seasons.",
    },

    "Can I sell directly without going through a trader?": {
      q: "Can I sell directly without going through a trader?",
      a:
        "Yes. Through eNAM, FPOs and direct farmgate buyers. Track mandi rates first so you know your floor price before negotiating.",
    },
  },
};

/* =========================================================
   TELUGU
========================================================= */

const te: KnowledgeText = {
  searchPlaceholder: "గైడ్‌లు, పంటలు లేదా అంశాలను వెతకండి",
  watchLearn: "చూడండి & నేర్చుకోండి",
  watchDescription:
    "తక్కువ ఇంటర్నెట్ డేటాతో చూడగలిగే స్థానిక భాషల చిన్న వీడియోలు.",
  frequentlyAsked: "తరచుగా అడిగే ప్రశ్నలు",
  minRead: "నిమిషాల చదువు",
  beginner: "ప్రారంభ స్థాయి",
  intermediate: "మధ్యస్థ స్థాయి",

  topics: {
    "Soil health": "నేల ఆరోగ్యం",
    "Water saving": "నీటి పొదుపు",
    "Organic inputs": "సేంద్రీయ ఎరువులు",
    Livestock: "పశుపోషణ",
    "Post-harvest": "కోత తర్వాత నిర్వహణ",
    "Rural finance": "గ్రామీణ ఆర్థికం",
    "Women & SHG": "మహిళలు & స్వయం సహాయక సంఘాలు",
    Health: "ఆరోగ్యం",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "45 రోజుల్లో నాణ్యమైన వర్మీకంపోస్ట్ తయారీ",
    "Drip irrigation layout for 1 acre onion":
      "1 ఎకరం ఉల్లిపాయకు డ్రిప్ నీటిపారుదల అమరిక",
    "Reading your Soil Health Card correctly":
      "మీ నేల ఆరోగ్య కార్డును సరిగ్గా చదవడం",
    "Preventing mastitis in dairy cattle":
      "పాడి పశువుల్లో మాస్టిటిస్ నివారణ",
    "Storing onion to cut 30% losses":
      "ఉల్లిపాయలను నిల్వ చేసి 30% నష్టాన్ని తగ్గించడం",
    "How a self-help group gets a bank loan":
      "స్వయం సహాయక సంఘం బ్యాంకు రుణం ఎలా పొందాలి",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "ఖరీఫ్ విత్తనానికి ముందు విత్తన శుద్ధి",
    "Identifying fall armyworm early":
      "ఫాల్ ఆర్మీవార్మ్‌ను ముందుగానే గుర్తించడం",
    "Filling the PM-Fasal Bima form":
      "PM-ఫసల్ బీమా ఫారమ్ నింపడం",
  },

  videoLanguages: {
    Hindi: "హిందీ",
    Marathi: "మరాఠీ",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "నేలను ఎంత తరచుగా పరీక్షించాలి?",
      a:
        "అదే పొలానికి ప్రతి రెండు నుంచి మూడు సంవత్సరాలకు ఒకసారి నేలను పరీక్షించండి. కొత్త పంట సాగు ప్రారంభించే ముందు కూడా పరీక్షించడం మంచిది.",
    },

    "Is organic farming profitable on small holdings?": {
      q: "చిన్న భూముల్లో సేంద్రీయ వ్యవసాయం లాభదాయకమా?",
      a:
        "లాభదాయకంగా ఉండవచ్చు. అయితే 2–3 సంవత్సరాల మార్పు కాలాన్ని ప్రణాళిక చేసుకోండి. ముందుగా ఒక పొలంలో ప్రారంభించి, కంపోస్ట్ తయారీ మరియు మార్కెట్‌ను ఏర్పాటు చేసుకోండి.",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "నీటిపారుదల ఖర్చును తగ్గించడానికి ఉత్తమ మార్గం ఏమిటి?",
      a:
        "డ్రిప్ లేదా స్ప్రింక్లర్‌తో పాటు మల్చింగ్ మరియు ఉదయం వేళ నీరు ఇవ్వడం ఉపయోగించండి. PMKSY వంటి పథకాల ద్వారా అందుబాటులో ఉన్న సబ్సిడీలను కూడా పరిశీలించండి.",
    },

    "Can I sell directly without going through a trader?": {
      q: "వ్యాపారి ద్వారా కాకుండా నేరుగా పంటను అమ్మవచ్చా?",
      a:
        "అవును. eNAM, FPOలు మరియు నేరుగా కొనుగోలు చేసే వ్యక్తుల ద్వారా అమ్మవచ్చు. ముందుగా మండి ధరలను పరిశీలించి మీ కనీస ధరను నిర్ణయించుకోండి.",
    },
  },
};

/* =========================================================
   HINDI
========================================================= */

const hi: KnowledgeText = {
  searchPlaceholder: "गाइड, फसल या विषय खोजें",
  watchLearn: "देखें और सीखें",
  watchDescription:
    "कम इंटरनेट डेटा के लिए स्थानीय भाषाओं में छोटे वीडियो।",
  frequentlyAsked: "अक्सर पूछे जाने वाले सवाल",
  minRead: "मिनट पढ़ना",
  beginner: "शुरुआती",
  intermediate: "मध्यम",

  topics: {
    "Soil health": "मिट्टी का स्वास्थ्य",
    "Water saving": "पानी की बचत",
    "Organic inputs": "जैविक खाद",
    Livestock: "पशुपालन",
    "Post-harvest": "कटाई के बाद",
    "Rural finance": "ग्रामीण वित्त",
    "Women & SHG": "महिलाएं और स्वयं सहायता समूह",
    Health: "स्वास्थ्य",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "45 दिनों में अच्छी वर्मी कम्पोस्ट बनाना",
    "Drip irrigation layout for 1 acre onion":
      "1 एकड़ प्याज के लिए ड्रिप सिंचाई व्यवस्था",
    "Reading your Soil Health Card correctly":
      "मृदा स्वास्थ्य कार्ड को सही तरीके से पढ़ना",
    "Preventing mastitis in dairy cattle":
      "दुधारू पशुओं में मास्टाइटिस से बचाव",
    "Storing onion to cut 30% losses":
      "प्याज को स्टोर करके 30% नुकसान कम करना",
    "How a self-help group gets a bank loan":
      "स्वयं सहायता समूह बैंक ऋण कैसे प्राप्त करे",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "खरीफ बुवाई से पहले बीज उपचार",
    "Identifying fall armyworm early":
      "फॉल आर्मीवर्म की जल्दी पहचान",
    "Filling the PM-Fasal Bima form":
      "PM-फसल बीमा फॉर्म भरना",
  },

  videoLanguages: {
    Hindi: "हिन्दी",
    Marathi: "मराठी",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "मुझे अपनी मिट्टी की जांच कितनी बार करनी चाहिए?",
      a:
        "एक ही खेत की मिट्टी की जांच हर दो से तीन साल में एक बार करें और नई फसल शुरू करने से पहले भी जांच करें।",
    },

    "Is organic farming profitable on small holdings?": {
      q: "क्या छोटी जमीन पर जैविक खेती लाभदायक है?",
      a:
        "हां, यह लाभदायक हो सकती है। लेकिन 2–3 साल के बदलाव की योजना बनाएं और पहले एक खेत से शुरुआत करें।",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "सिंचाई की लागत कम करने का सबसे अच्छा तरीका क्या है?",
      a:
        "ड्रिप या स्प्रिंकलर के साथ मल्चिंग और सुबह जल्दी सिंचाई करें। उपलब्ध सरकारी सब्सिडी का भी लाभ लें।",
    },

    "Can I sell directly without going through a trader?": {
      q: "क्या मैं व्यापारी के बिना सीधे अपनी फसल बेच सकता हूं?",
      a:
        "हां। eNAM, FPO और सीधे खरीददारों के माध्यम से बेच सकते हैं। बिक्री से पहले मंडी भाव जरूर देखें।",
    },
  },
};

/* =========================================================
   MARATHI
========================================================= */

const mr: KnowledgeText = {
  searchPlaceholder: "मार्गदर्शक, पिके किंवा विषय शोधा",
  watchLearn: "पहा आणि शिका",
  watchDescription:
    "कमी इंटरनेट डेटासाठी स्थानिक भाषांमधील छोटे व्हिडिओ.",
  frequentlyAsked: "वारंवार विचारले जाणारे प्रश्न",
  minRead: "मिनिटांचे वाचन",
  beginner: "सुरुवातीची पातळी",
  intermediate: "मध्यम पातळी",

  topics: {
    "Soil health": "मातीचे आरोग्य",
    "Water saving": "पाणी बचत",
    "Organic inputs": "सेंद्रिय निविष्ठा",
    Livestock: "पशुपालन",
    "Post-harvest": "काढणीनंतर व्यवस्थापन",
    "Rural finance": "ग्रामीण वित्त",
    "Women & SHG": "महिला आणि बचत गट",
    Health: "आरोग्य",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "45 दिवसांत चांगले गांडूळ खत तयार करणे",
    "Drip irrigation layout for 1 acre onion":
      "1 एकर कांद्यासाठी ठिबक सिंचन व्यवस्था",
    "Reading your Soil Health Card correctly":
      "मृदा आरोग्य कार्ड योग्य प्रकारे वाचणे",
    "Preventing mastitis in dairy cattle":
      "दुभत्या जनावरांमध्ये मॅस्टायटिस प्रतिबंध",
    "Storing onion to cut 30% losses":
      "कांदा साठवून 30% नुकसान कमी करणे",
    "How a self-help group gets a bank loan":
      "बचत गटाला बँक कर्ज कसे मिळते",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "खरीप पेरणीपूर्वी बियाणे प्रक्रिया",
    "Identifying fall armyworm early":
      "फॉल आर्मीवर्म लवकर ओळखणे",
    "Filling the PM-Fasal Bima form":
      "PM-पीक विमा फॉर्म भरणे",
  },

  videoLanguages: {
    Hindi: "हिंदी",
    Marathi: "मराठी",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "मातीची तपासणी किती वेळा करावी?",
      a:
        "त्याच शेताची माती दर दोन ते तीन वर्षांनी तपासा. नवीन पीक घेण्यापूर्वी तपासणी करणेही उपयुक्त आहे.",
    },

    "Is organic farming profitable on small holdings?": {
      q: "लहान शेतात सेंद्रिय शेती फायदेशीर आहे का?",
      a:
        "होय, फायदेशीर होऊ शकते. मात्र 2–3 वर्षांच्या संक्रमण कालावधीची योजना करा आणि सुरुवात एका शेतापासून करा.",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "सिंचन खर्च कमी करण्याचा सर्वोत्तम मार्ग कोणता?",
      a:
        "ठिबक किंवा तुषार सिंचनासोबत आच्छादनाचा वापर करा आणि सकाळी लवकर पाणी द्या. उपलब्ध सरकारी अनुदानाचा लाभ घ्या.",
    },

    "Can I sell directly without going through a trader?": {
      q: "व्यापाऱ्याशिवाय थेट पीक विकता येते का?",
      a:
        "होय. eNAM, FPO आणि थेट खरेदीदारांमार्फत विक्री करता येते. विक्रीपूर्वी बाजारभाव तपासा.",
    },
  },
};

/* =========================================================
   TAMIL
========================================================= */

const ta: KnowledgeText = {
  searchPlaceholder: "வழிகாட்டிகள், பயிர்கள் அல்லது தலைப்புகளைத் தேடுங்கள்",
  watchLearn: "பார்த்து கற்றுக்கொள்ளுங்கள்",
  watchDescription:
    "குறைந்த இணைய தரவுக்காக உள்ளூர் மொழிகளில் சிறிய வீடியோக்கள்.",
  frequentlyAsked: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
  minRead: "நிமிட வாசிப்பு",
  beginner: "தொடக்க நிலை",
  intermediate: "இடைநிலை",

  topics: {
    "Soil health": "மண் ஆரோக்கியம்",
    "Water saving": "நீர் சேமிப்பு",
    "Organic inputs": "இயற்கை இடுபொருட்கள்",
    Livestock: "கால்நடை",
    "Post-harvest": "அறுவடைக்குப் பிந்தைய மேலாண்மை",
    "Rural finance": "கிராமப்புற நிதி",
    "Women & SHG": "பெண்கள் மற்றும் சுய உதவிக் குழுக்கள்",
    Health: "ஆரோக்கியம்",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "45 நாட்களில் தரமான மண்புழு உரம் தயாரித்தல்",
    "Drip irrigation layout for 1 acre onion":
      "1 ஏக்கர் வெங்காயத்திற்கு சொட்டு நீர்ப்பாசன அமைப்பு",
    "Reading your Soil Health Card correctly":
      "மண் ஆரோக்கிய அட்டையை சரியாகப் படித்தல்",
    "Preventing mastitis in dairy cattle":
      "பால் மாடுகளில் மாஸ்டிடிஸ் தடுப்பு",
    "Storing onion to cut 30% losses":
      "வெங்காயத்தை சேமித்து 30% இழப்பைக் குறைத்தல்",
    "How a self-help group gets a bank loan":
      "சுய உதவிக் குழு வங்கிக் கடன் பெறுவது எப்படி",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "காரிப் விதைப்புக்கு முன் விதை நேர்த்தி",
    "Identifying fall armyworm early":
      "படைப்புழுவை முன்கூட்டியே கண்டறிதல்",
    "Filling the PM-Fasal Bima form":
      "PM-பசல் பீமா படிவத்தை நிரப்புதல்",
  },

  videoLanguages: {
    Hindi: "இந்தி",
    Marathi: "மராத்தி",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "மண்ணை எவ்வளவு அடிக்கடி பரிசோதிக்க வேண்டும்?",
      a:
        "ஒரே நிலத்தில் இரண்டு முதல் மூன்று ஆண்டுகளுக்கு ஒருமுறை மண் பரிசோதனை செய்யுங்கள். புதிய பயிர் சுழற்சிக்கு முன்பும் பரிசோதிக்கவும்.",
    },

    "Is organic farming profitable on small holdings?": {
      q: "சிறிய நிலங்களில் இயற்கை விவசாயம் லாபகரமானதா?",
      a:
        "லாபகரமாக இருக்கலாம். ஆனால் 2–3 ஆண்டுகளுக்கான மாற்றுத் திட்டத்தை அமைத்து முதலில் ஒரு நிலத்தில் தொடங்குங்கள்.",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "நீர்ப்பாசன செலவைக் குறைக்க சிறந்த வழி என்ன?",
      a:
        "சொட்டு அல்லது தெளிப்பு நீர்ப்பாசனத்துடன் மூடாக்கு பயன்படுத்தி அதிகாலை நேரத்தில் நீர் பாய்ச்சுங்கள்.",
    },

    "Can I sell directly without going through a trader?": {
      q: "வியாபாரி இல்லாமல் நேரடியாக பயிர்களை விற்க முடியுமா?",
      a:
        "ஆம். eNAM, FPO மற்றும் நேரடி வாங்குபவர்கள் மூலம் விற்கலாம். முதலில் சந்தை விலைகளைப் பார்த்து விலையை நிர்ணயிக்கவும்.",
    },
  },
};

/* =========================================================
   KANNADA
========================================================= */

const kn: KnowledgeText = {
  searchPlaceholder: "ಮಾರ್ಗದರ್ಶಿಗಳು, ಬೆಳೆಗಳು ಅಥವಾ ವಿಷಯಗಳನ್ನು ಹುಡುಕಿ",
  watchLearn: "ನೋಡಿ ಮತ್ತು ಕಲಿಯಿರಿ",
  watchDescription:
    "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಡೇಟಾಕ್ಕಾಗಿ ಸ್ಥಳೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಸಣ್ಣ ವೀಡಿಯೊಗಳು.",
  frequentlyAsked: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
  minRead: "ನಿಮಿಷ ಓದು",
  beginner: "ಆರಂಭಿಕ",
  intermediate: "ಮಧ್ಯಮ",

  topics: {
    "Soil health": "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
    "Water saving": "ನೀರಿನ ಉಳಿತಾಯ",
    "Organic inputs": "ಸಾವಯವ ಒಳಾಂಶಗಳು",
    Livestock: "ಜಾನುವಾರು ಸಾಕಣೆ",
    "Post-harvest": "ಕೊಯ್ಲಿನ ನಂತರದ ನಿರ್ವಹಣೆ",
    "Rural finance": "ಗ್ರಾಮೀಣ ಹಣಕಾಸು",
    "Women & SHG": "ಮಹಿಳೆಯರು ಮತ್ತು ಸ್ವಸಹಾಯ ಸಂಘಗಳು",
    Health: "ಆರೋಗ್ಯ",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "45 ದಿನಗಳಲ್ಲಿ ಗುಣಮಟ್ಟದ ಎರೆಹುಳು ಗೊಬ್ಬರ ತಯಾರಿಸುವುದು",
    "Drip irrigation layout for 1 acre onion":
      "1 ಎಕರೆ ಈರುಳ್ಳಿಗೆ ಹನಿ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ",
    "Reading your Soil Health Card correctly":
      "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಅನ್ನು ಸರಿಯಾಗಿ ಓದುವುದು",
    "Preventing mastitis in dairy cattle":
      "ಹಾಲು ಕೊಡುವ ಜಾನುವಾರುಗಳಲ್ಲಿ ಮಾಸ್ಟೈಟಿಸ್ ತಡೆಗಟ್ಟುವುದು",
    "Storing onion to cut 30% losses":
      "ಈರುಳ್ಳಿ ಸಂಗ್ರಹಿಸಿ 30% ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡುವುದು",
    "How a self-help group gets a bank loan":
      "ಸ್ವಸಹಾಯ ಸಂಘವು ಬ್ಯಾಂಕ್ ಸಾಲ ಪಡೆಯುವುದು ಹೇಗೆ",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "ಖರೀಫ್ ಬಿತ್ತನೆಗೂ ಮೊದಲು ಬೀಜ ಸಂಸ್ಕರಣೆ",
    "Identifying fall armyworm early":
      "ಫಾಲ್ ಆರ್ಮಿವರ್ಮ್ ಅನ್ನು ಬೇಗ ಗುರುತಿಸುವುದು",
    "Filling the PM-Fasal Bima form":
      "PM-ಫಸಲ್ ಬಿಮಾ ಅರ್ಜಿ ಭರ್ತಿ ಮಾಡುವುದು",
  },

  videoLanguages: {
    Hindi: "ಹಿಂದಿ",
    Marathi: "ಮರಾಠಿ",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "ಮಣ್ಣನ್ನು ಎಷ್ಟು ಬಾರಿ ಪರೀಕ್ಷಿಸಬೇಕು?",
      a:
        "ಒಂದೇ ಜಮೀನಿನ ಮಣ್ಣನ್ನು ಪ್ರತಿ ಎರಡು ಅಥವಾ ಮೂರು ವರ್ಷಕ್ಕೊಮ್ಮೆ ಪರೀಕ್ಷಿಸಿ. ಹೊಸ ಬೆಳೆ ಆರಂಭಿಸುವ ಮೊದಲು ಕೂಡ ಪರೀಕ್ಷಿಸುವುದು ಉತ್ತಮ.",
    },

    "Is organic farming profitable on small holdings?": {
      q: "ಸಣ್ಣ ಜಮೀನಿನಲ್ಲಿ ಸಾವಯವ ಕೃಷಿ ಲಾಭದಾಯಕವೇ?",
      a:
        "ಲಾಭದಾಯಕವಾಗಬಹುದು. ಆದರೆ 2–3 ವರ್ಷಗಳ ಬದಲಾವಣೆಯ ಅವಧಿಯನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಮೊದಲು ಒಂದು ಜಮೀನಿನಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ.",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "ನೀರಾವರಿ ವೆಚ್ಚವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಉತ್ತಮ ಮಾರ್ಗ ಯಾವುದು?",
      a:
        "ಹನಿ ಅಥವಾ ತುಂತುರು ನೀರಾವರಿಯೊಂದಿಗೆ ಮಲ್ಚಿಂಗ್ ಬಳಸಿ ಮತ್ತು ಮುಂಜಾನೆ ನೀರು ನೀಡಿ. ಲಭ್ಯವಿರುವ ಸರ್ಕಾರಿ ಸಹಾಯಧನವನ್ನು ಬಳಸಿ.",
    },

    "Can I sell directly without going through a trader?": {
      q: "ವ್ಯಾಪಾರಿಯ ಮೂಲಕ ಹೋಗದೆ ನೇರವಾಗಿ ಬೆಳೆ ಮಾರಾಟ ಮಾಡಬಹುದೇ?",
      a:
        "ಹೌದು. eNAM, FPO ಮತ್ತು ನೇರ ಖರೀದಿದಾರರ ಮೂಲಕ ಮಾರಾಟ ಮಾಡಬಹುದು. ಮಾರಾಟಕ್ಕೂ ಮೊದಲು ಮಾರುಕಟ್ಟೆ ದರ ಪರಿಶೀಲಿಸಿ.",
    },
  },
};

/* =========================================================
   BENGALI
========================================================= */

const bn: KnowledgeText = {
  searchPlaceholder: "গাইড, ফসল বা বিষয় খুঁজুন",
  watchLearn: "দেখুন ও শিখুন",
  watchDescription:
    "কম ইন্টারনেট ডেটার জন্য স্থানীয় ভাষায় ছোট ভিডিও।",
  frequentlyAsked: "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
  minRead: "মিনিট পড়া",
  beginner: "শুরুর স্তর",
  intermediate: "মধ্যম স্তর",

  topics: {
    "Soil health": "মাটির স্বাস্থ্য",
    "Water saving": "জল সংরক্ষণ",
    "Organic inputs": "জৈব উপকরণ",
    Livestock: "পশুপালন",
    "Post-harvest": "ফসল কাটার পর ব্যবস্থাপনা",
    "Rural finance": "গ্রামীণ অর্থায়ন",
    "Women & SHG": "মহিলা ও স্বনির্ভর গোষ্ঠী",
    Health: "স্বাস্থ্য",
  },

  guides: {
    "Making quality vermicompost in 45 days":
      "৪৫ দিনে ভালো মানের ভার্মিকম্পোস্ট তৈরি",
    "Drip irrigation layout for 1 acre onion":
      "১ একর পেঁয়াজের জন্য ড্রিপ সেচ ব্যবস্থা",
    "Reading your Soil Health Card correctly":
      "মাটির স্বাস্থ্য কার্ড সঠিকভাবে পড়া",
    "Preventing mastitis in dairy cattle":
      "দুধেল গবাদি পশুর মাস্টাইটিস প্রতিরোধ",
    "Storing onion to cut 30% losses":
      "পেঁয়াজ সংরক্ষণ করে ৩০% ক্ষতি কমানো",
    "How a self-help group gets a bank loan":
      "স্বনির্ভর গোষ্ঠী কীভাবে ব্যাংক ঋণ পায়",
  },

  videos: {
    "Seed treatment before kharif sowing":
      "খরিফ বপনের আগে বীজ শোধন",
    "Identifying fall armyworm early":
      "ফল আর্মিওয়ার্ম দ্রুত শনাক্ত করা",
    "Filling the PM-Fasal Bima form":
      "PM-ফসল বিমা ফর্ম পূরণ করা",
  },

  videoLanguages: {
    Hindi: "হিন্দি",
    Marathi: "মারাঠি",
  },

  faqs: {
    "How often should I test my soil?": {
      q: "কত ঘন ঘন মাটি পরীক্ষা করা উচিত?",
      a:
        "একই জমির মাটি প্রতি দুই থেকে তিন বছরে একবার পরীক্ষা করুন। নতুন ফসল শুরু করার আগেও পরীক্ষা করা ভালো।",
    },

    "Is organic farming profitable on small holdings?": {
      q: "ছোট জমিতে জৈব কৃষি কি লাভজনক?",
      a:
        "লাভজনক হতে পারে। তবে ২–৩ বছরের পরিবর্তনকাল পরিকল্পনা করুন এবং প্রথমে একটি জমি দিয়ে শুরু করুন।",
    },

    "What is the best way to reduce irrigation cost?": {
      q: "সেচের খরচ কমানোর সেরা উপায় কী?",
      a:
        "ড্রিপ বা স্প্রিঙ্কলার সেচের সঙ্গে মালচিং ব্যবহার করুন এবং সকালে সেচ দিন। সরকারি ভর্তুকির সুবিধাও নিন।",
    },

    "Can I sell directly without going through a trader?": {
      q: "ব্যবসায়ীর মাধ্যমে না গিয়ে সরাসরি ফসল বিক্রি করতে পারি?",
      a:
        "হ্যাঁ। eNAM, FPO এবং সরাসরি ক্রেতার মাধ্যমে বিক্রি করতে পারেন। বিক্রির আগে বাজারদর দেখে নিন।",
    },
  },
};

/* =========================================================
   ALL LANGUAGE DATA
========================================================= */

const knowledgeText: Record<LanguageCode, KnowledgeText> = {
  en,
  te,
  hi,
  mr,
  ta,
  kn,
  bn,
};

/* =========================================================
   DETAILED GUIDE CONTENT
========================================================= */

type GuideDetail = {
  materials: string[];
  steps: { title: string; text: string }[];
  tips: string[];
};

type GuideDetailText = {
  materialsTitle: string;
  stepsTitle: string;
  tipsTitle: string;
  close: string;
  details: Record<string, GuideDetail>;
};

const guideDetails: Record<LanguageCode, GuideDetailText> = {
  en: {
    materialsTitle: "Materials required",
    stepsTitle: "Step-by-step guide",
    tipsTitle: "Important tips",
    close: "Close guide",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "Earthworms",
          "Partly decomposed cow dung",
          "Dry leaves or crop residue",
          "Water",
          "Shaded bed or pit",
        ],
        steps: [
          {
            title: "Days 1–15",
            text: "Prepare a shaded bed with moist dry leaves and partly decomposed cow dung. Keep it moist but never waterlogged.",
          },
          {
            title: "Days 16–30",
            text: "Add earthworms after the material cools. Maintain moisture and protect the bed from direct sunlight and heavy rain.",
          },
          {
            title: "Days 31–45",
            text: "Check moisture regularly. When the compost is dark, loose and earthy-smelling, sieve it and prepare it for use.",
          },
        ],
        tips: [
          "Keep the bed shaded.",
          "Do not flood the bed.",
          "Do not add fresh hot manure directly over worms.",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "Drip laterals",
          "Main and sub-main pipes",
          "Filter",
          "Pressure regulator",
          "Fertilizer tank",
        ],
        steps: [
          {
            title: "Step 1",
            text: "Divide the one-acre field into manageable irrigation sections and place the main pipe along the field edge.",
          },
          {
            title: "Step 2",
            text: "Lay drip laterals along onion rows and check emitters for uniform flow and blockages.",
          },
          {
            title: "Step 3",
            text: "Irrigate in short regular cycles based on soil moisture, crop stage and rainfall.",
          },
        ],
        tips: [
          "Filter water before the drip system.",
          "Check leaks every week.",
          "Use mulch to reduce evaporation.",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "Soil Health Card",
          "Crop plan",
          "Fertilizer labels",
          "Soil-test record",
        ],
        steps: [
          {
            title: "Step 1",
            text: "Check pH and electrical conductivity to understand soil reaction and salinity.",
          },
          {
            title: "Step 2",
            text: "Read organic carbon and available nitrogen, phosphorus and potassium together.",
          },
          {
            title: "Step 3",
            text: "Follow the recommendation for the crop you plan to grow instead of copying another farm's fertilizer use.",
          },
        ],
        tips: [
          "Test soil regularly.",
          "Record fertilizer applications.",
          "Use crop-specific recommendations.",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "Clean water",
          "Clean udder cloth",
          "Clean milking equipment",
          "Dry bedding",
        ],
        steps: [
          {
            title: "Before milking",
            text: "Clean and dry the udder and teats. Wash hands and keep milking equipment clean.",
          },
          {
            title: "During milking",
            text: "Milk gently and prevent dirty hands or equipment from contaminating clean teats.",
          },
          {
            title: "After milking",
            text: "Keep cattle in a clean area and watch for swelling, heat, pain or abnormal milk.",
          },
        ],
        tips: [
          "Keep bedding dry.",
          "Separate suspected cases.",
          "Contact a veterinarian for abnormal milk or fever.",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "Mature dry onions",
          "Ventilated storage",
          "Clean racks or mesh",
          "Sorting area",
        ],
        steps: [
          {
            title: "Before storage",
            text: "Cure mature onions well and remove damaged, diseased or wet bulbs.",
          },
          {
            title: "During storage",
            text: "Keep onions cool, dry and well ventilated. Keep them away from wet floors.",
          },
          {
            title: "Regular checking",
            text: "Inspect the stock regularly and remove rotten bulbs immediately.",
          },
        ],
        tips: [
          "Never store wet onions.",
          "Avoid overcrowding.",
          "Sort the stock before selling.",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "SHG records",
          "Meeting register",
          "Savings records",
          "Bank account details",
          "Loan proposal",
        ],
        steps: [
          {
            title: "Step 1",
            text: "Maintain regular meetings, savings, attendance and transparent financial records.",
          },
          {
            title: "Step 2",
            text: "Keep the group bank account active and prepare the required documents and loan purpose.",
          },
          {
            title: "Step 3",
            text: "Submit the application to the bank and use the approved loan for the agreed activity.",
          },
        ],
        tips: [
          "Keep records updated.",
          "Pay installments on time.",
          "Ask the bank about applicable schemes and terms.",
        ],
      },
    },
  },

  te: {
    materialsTitle: "అవసరమైన పదార్థాలు",
    stepsTitle: "దశల వారీ గైడ్",
    tipsTitle: "ముఖ్యమైన సూచనలు",
    close: "గైడ్ మూసివేయండి",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "వానపాములు",
          "పాక్షికంగా కుళ్లిన ఆవు పేడ",
          "ఎండిన ఆకులు లేదా పంట అవశేషాలు",
          "నీరు",
          "నీడ ఉన్న బెడ్ లేదా గుంత",
        ],
        steps: [
          {
            title: "1–15 రోజులు",
            text: "నీడ ఉన్న ప్రదేశంలో తడిగా ఉన్న ఎండిన ఆకులు మరియు పాక్షికంగా కుళ్లిన ఆవు పేడతో బెడ్ సిద్ధం చేయండి. తేమగా ఉంచండి కానీ నీరు నిల్వ ఉండకుండా చూడండి.",
          },
          {
            title: "16–30 రోజులు",
            text: "పదార్థం చల్లబడిన తర్వాత వానపాములను వేయండి. తేమను కొనసాగిస్తూ బెడ్‌ను నేరుగా సూర్యకాంతి మరియు భారీ వర్షం నుంచి రక్షించండి.",
          },
          {
            title: "31–45 రోజులు",
            text: "తేమను క్రమం తప్పకుండా పరిశీలించండి. కంపోస్ట్ నల్లగా, మెత్తగా మరియు మట్టి వాసనతో ఉన్నప్పుడు జల్లెడ పట్టి ఉపయోగానికి సిద్ధం చేయండి.",
          },
        ],
        tips: [
          "బెడ్‌ను నీడలో ఉంచండి.",
          "బెడ్‌లో నీరు నిల్వ చేయవద్దు.",
          "తాజా వేడి పేడను వానపాములపై నేరుగా వేయవద్దు.",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "డ్రిప్ లేటరల్స్",
          "ప్రధాన మరియు ఉప-ప్రధాన పైపులు",
          "ఫిల్టర్",
          "పీడన నియంత్రకం",
          "ఎరువుల ట్యాంక్",
        ],
        steps: [
          {
            title: "దశ 1",
            text: "ఒక ఎకరం పొలాన్ని సులభంగా నీరు అందించగల విభాగాలుగా విభజించి, ప్రధాన పైపును పొలం అంచు వెంట ఏర్పాటు చేయండి.",
          },
          {
            title: "దశ 2",
            text: "ఉల్లిపాయ వరుసల వెంట డ్రిప్ లేటరల్స్ వేయండి. డ్రిప్ ఎమిటర్లలో నీటి ప్రవాహం సమంగా ఉందో, ఎక్కడైనా అడ్డంకులు ఉన్నాయో పరిశీలించండి.",
          },
          {
            title: "దశ 3",
            text: "నేల తేమ, పంట దశ మరియు వర్షపాతాన్ని బట్టి తక్కువ వ్యవధిలో క్రమం తప్పకుండా నీరు ఇవ్వండి.",
          },
        ],
        tips: [
          "డ్రిప్ వ్యవస్థకు ముందు నీటిని ఫిల్టర్ చేయండి.",
          "ప్రతి వారం పైపుల్లో లీకేజీలను పరిశీలించండి.",
          "ఆవిరీభవనాన్ని తగ్గించడానికి మల్చింగ్ ఉపయోగించండి.",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "నేల ఆరోగ్య కార్డు",
          "పంట ప్రణాళిక",
          "ఎరువుల లేబుళ్లు",
          "నేల పరీక్ష రికార్డు",
        ],
        steps: [
          {
            title: "దశ 1",
            text: "నేల స్వభావం మరియు లవణీయతను అర్థం చేసుకోవడానికి pH మరియు విద్యుత్ వాహకతను పరిశీలించండి.",
          },
          {
            title: "దశ 2",
            text: "సేంద్రీయ కార్బన్‌తో పాటు అందుబాటులో ఉన్న నైట్రోజన్, ఫాస్ఫరస్ మరియు పొటాషియంను కలిపి చదవండి.",
          },
          {
            title: "దశ 3",
            text: "ఇతర రైతు పొలంలో ఉపయోగించిన ఎరువులను అనుకరించకుండా, మీరు సాగు చేయబోయే పంటకు ఇచ్చిన సిఫారసులను అనుసరించండి.",
          },
        ],
        tips: [
          "నేలను క్రమం తప్పకుండా పరీక్షించండి.",
          "ఎరువుల వినియోగాన్ని రికార్డు చేయండి.",
          "పంటకు అనుగుణమైన సిఫారసులను ఉపయోగించండి.",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "శుభ్రమైన నీరు",
          "శుభ్రమైన పొదుగు తుడిచే వస్త్రం",
          "శుభ్రమైన పాలు పితికే పరికరాలు",
          "పొడి పరుపు",
        ],
        steps: [
          {
            title: "పాలు పితికే ముందు",
            text: "పొదుగు మరియు చనుమొనలను శుభ్రంగా కడిగి పొడిగా ఉంచండి. చేతులు కడుక్కొని, పాలు పితికే పరికరాలను శుభ్రంగా ఉంచండి.",
          },
          {
            title: "పాలు పితికే సమయంలో",
            text: "మృదువుగా పాలు పితకండి. మురికి చేతులు లేదా పరికరాలు శుభ్రమైన చనుమొనలకు తగలకుండా జాగ్రత్త పడండి.",
          },
          {
            title: "పాలు పితికిన తర్వాత",
            text: "పశువులను శుభ్రమైన ప్రదేశంలో ఉంచి వాపు, వేడి, నొప్పి లేదా అసాధారణమైన పాల లక్షణాలను గమనించండి.",
          },
        ],
        tips: [
          "పశువుల పరుపును పొడిగా ఉంచండి.",
          "అనుమానిత పశువులను వేరుగా ఉంచండి.",
          "అసాధారణమైన పాలు లేదా జ్వరం ఉంటే పశువైద్యుడిని సంప్రదించండి.",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "పూర్తిగా ఎండిన ఉల్లిపాయలు",
          "గాలి ప్రసరణ ఉన్న నిల్వ ప్రదేశం",
          "శుభ్రమైన ర్యాకులు లేదా మెష్",
          "వేరు చేసే ప్రదేశం",
        ],
        steps: [
          {
            title: "నిల్వకు ముందు",
            text: "పూర్తిగా పండిన ఉల్లిపాయలను బాగా ఎండబెట్టి, దెబ్బతిన్న, వ్యాధిగ్రస్త లేదా తడిగా ఉన్న ఉల్లిపాయలను తొలగించండి.",
          },
          {
            title: "నిల్వ సమయంలో",
            text: "ఉల్లిపాయలను చల్లగా, పొడిగా మరియు మంచి గాలి ప్రసరణ ఉన్న ప్రదేశంలో ఉంచండి. తడి నేలలకు దూరంగా ఉంచండి.",
          },
          {
            title: "క్రమం తప్పకుండా పరిశీలన",
            text: "నిల్వను క్రమం తప్పకుండా పరిశీలించి, కుళ్లిన ఉల్లిపాయలను వెంటనే తొలగించండి.",
          },
        ],
        tips: [
          "తడి ఉల్లిపాయలను ఎప్పుడూ నిల్వ చేయవద్దు.",
          "అధికంగా కుప్పగా నిల్వ చేయవద్దు.",
          "అమ్మకానికి ముందు ఉల్లిపాయలను వేరు చేసి పరిశీలించండి.",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "స్వయం సహాయక సంఘం రికార్డులు",
          "సమావేశాల రిజిస్టర్",
          "పొదుపు రికార్డులు",
          "బ్యాంకు ఖాతా వివరాలు",
          "రుణ ప్రతిపాదన",
        ],
        steps: [
          {
            title: "దశ 1",
            text: "క్రమం తప్పకుండా సమావేశాలు నిర్వహించి, పొదుపులు, హాజరు మరియు పారదర్శక ఆర్థిక రికార్డులను నిర్వహించండి.",
          },
          {
            title: "దశ 2",
            text: "సంఘం బ్యాంకు ఖాతాను సక్రియంగా ఉంచి, అవసరమైన పత్రాలు మరియు రుణం ఉపయోగించే ఉద్దేశ్యాన్ని సిద్ధం చేయండి.",
          },
          {
            title: "దశ 3",
            text: "బ్యాంకులో రుణ దరఖాస్తును సమర్పించి, ఆమోదించిన రుణాన్ని అంగీకరించిన కార్యకలాపానికే ఉపయోగించండి.",
          },
        ],
        tips: [
          "రికార్డులను ఎప్పటికప్పుడు నవీకరించండి.",
          "వాయిదాలను సమయానికి చెల్లించండి.",
          "వర్తించే పథకాలు మరియు నిబంధనల గురించి బ్యాంకును అడగండి.",
        ],
      },
    },
  },

  hi: {
    materialsTitle: "आवश्यक सामग्री",
    stepsTitle: "चरण-दर-चरण गाइड",
    tipsTitle: "महत्वपूर्ण सुझाव",
    close: "गाइड बंद करें",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "केंचुए",
          "आंशिक रूप से सड़ी हुई गोबर की खाद",
          "सूखे पत्ते या फसल अवशेष",
          "पानी",
          "छायादार बेड या गड्ढा",
        ],
        steps: [
          {
            title: "दिन 1–15",
            text: "छायादार जगह पर नम सूखे पत्तों और आंशिक रूप से सड़ी हुई गोबर की खाद से बेड तैयार करें। इसे नम रखें, लेकिन पानी जमा न होने दें।",
          },
          {
            title: "दिन 16–30",
            text: "सामग्री ठंडी होने के बाद केंचुए डालें। नमी बनाए रखें और बेड को सीधी धूप तथा तेज बारिश से बचाएं।",
          },
          {
            title: "दिन 31–45",
            text: "नमी की नियमित जांच करें। जब खाद गहरे रंग की, ढीली और मिट्टी जैसी गंध वाली हो जाए, तो उसे छानकर उपयोग के लिए तैयार करें।",
          },
        ],
        tips: [
          "बेड को छायादार रखें।",
          "बेड में पानी जमा न होने दें।",
          "ताजा गर्म गोबर सीधे केंचुओं के ऊपर न डालें।",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "ड्रिप लेटरल पाइप",
          "मुख्य और उप-मुख्य पाइप",
          "फिल्टर",
          "प्रेशर रेगुलेटर",
          "उर्वरक टैंक",
        ],
        steps: [
          {
            title: "चरण 1",
            text: "एक एकड़ खेत को आसानी से सिंचाई किए जा सकने वाले हिस्सों में बांटें और मुख्य पाइप खेत की सीमा के साथ लगाएं।",
          },
          {
            title: "चरण 2",
            text: "प्याज की कतारों के साथ ड्रिप लेटरल बिछाएं और उत्सर्जकों में समान पानी का प्रवाह तथा रुकावट की जांच करें।",
          },
          {
            title: "चरण 3",
            text: "मिट्टी की नमी, फसल की अवस्था और बारिश के अनुसार कम समय के नियमित सिंचाई चक्र चलाएं।",
          },
        ],
        tips: [
          "ड्रिप सिस्टम से पहले पानी को फिल्टर करें।",
          "हर सप्ताह रिसाव की जांच करें।",
          "वाष्पीकरण कम करने के लिए मल्च का उपयोग करें।",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "मृदा स्वास्थ्य कार्ड",
          "फसल योजना",
          "उर्वरक के लेबल",
          "मिट्टी जांच रिकॉर्ड",
        ],
        steps: [
          {
            title: "चरण 1",
            text: "मिट्टी की प्रतिक्रिया और लवणता समझने के लिए pH और विद्युत चालकता देखें।",
          },
          {
            title: "चरण 2",
            text: "जैविक कार्बन और उपलब्ध नाइट्रोजन, फास्फोरस तथा पोटैशियम को एक साथ पढ़ें।",
          },
          {
            title: "चरण 3",
            text: "किसी दूसरे खेत में इस्तेमाल किए गए उर्वरक की नकल करने के बजाय अपनी फसल के लिए दी गई सिफारिश का पालन करें।",
          },
        ],
        tips: [
          "मिट्टी की नियमित जांच करें।",
          "उर्वरक के उपयोग का रिकॉर्ड रखें।",
          "फसल के अनुसार दी गई सिफारिशों का उपयोग करें।",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "साफ पानी",
          "साफ थन पोंछने का कपड़ा",
          "साफ दुहने के उपकरण",
          "सूखा बिछावन",
        ],
        steps: [
          {
            title: "दुहने से पहले",
            text: "थन और स्तनों को साफ करके सुखाएं। हाथ धोएं और दुहने के उपकरण साफ रखें।",
          },
          {
            title: "दुहने के दौरान",
            text: "धीरे-धीरे दूध निकालें और गंदे हाथों या उपकरणों को साफ स्तनों को दूषित करने से रोकें।",
          },
          {
            title: "दुहने के बाद",
            text: "पशुओं को साफ जगह पर रखें और सूजन, गर्मी, दर्द या असामान्य दूध पर ध्यान दें।",
          },
        ],
        tips: [
          "बिछावन को सूखा रखें।",
          "संदिग्ध पशुओं को अलग रखें।",
          "असामान्य दूध या बुखार होने पर पशु चिकित्सक से संपर्क करें।",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "पूरी तरह सूखे प्याज",
          "हवादार भंडारण स्थान",
          "साफ रैक या जाली",
          "छंटाई की जगह",
        ],
        steps: [
          {
            title: "भंडारण से पहले",
            text: "पके हुए प्याज को अच्छी तरह सुखाएं और क्षतिग्रस्त, रोगग्रस्त या गीली गांठों को हटा दें।",
          },
          {
            title: "भंडारण के दौरान",
            text: "प्याज को ठंडे, सूखे और अच्छी हवा वाले स्थान पर रखें। उन्हें गीली जमीन से दूर रखें।",
          },
          {
            title: "नियमित जांच",
            text: "भंडार की नियमित जांच करें और सड़े हुए प्याज तुरंत हटा दें।",
          },
        ],
        tips: [
          "गीले प्याज को कभी स्टोर न करें।",
          "बहुत ज्यादा प्याज एक साथ न भरें।",
          "बेचने से पहले प्याज की छंटाई करें।",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "स्वयं सहायता समूह के रिकॉर्ड",
          "बैठक रजिस्टर",
          "बचत रिकॉर्ड",
          "बैंक खाते का विवरण",
          "ऋण प्रस्ताव",
        ],
        steps: [
          {
            title: "चरण 1",
            text: "नियमित बैठकें, बचत, उपस्थिति और पारदर्शी वित्तीय रिकॉर्ड बनाए रखें।",
          },
          {
            title: "चरण 2",
            text: "समूह का बैंक खाता सक्रिय रखें और आवश्यक दस्तावेज तथा ऋण के उद्देश्य को तैयार करें।",
          },
          {
            title: "चरण 3",
            text: "बैंक में आवेदन जमा करें और स्वीकृत ऋण का उपयोग तय की गई गतिविधि के लिए करें।",
          },
        ],
        tips: [
          "रिकॉर्ड हमेशा अपडेट रखें।",
          "किश्तें समय पर चुकाएं।",
          "लागू योजनाओं और शर्तों के बारे में बैंक से पूछें।",
        ],
      },
    },
  },

  mr: {
    materialsTitle: "आवश्यक साहित्य",
    stepsTitle: "टप्प्याटप्प्याने मार्गदर्शक",
    tipsTitle: "महत्त्वाच्या सूचना",
    close: "मार्गदर्शक बंद करा",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "गांडुळे",
          "अंशतः कुजलेले शेण",
          "सुकी पाने किंवा पिकांचे अवशेष",
          "पाणी",
          "सावलीतील बेड किंवा खड्डा",
        ],
        steps: [
          {
            title: "दिवस 1–15",
            text: "सावलीच्या ठिकाणी ओलसर सुकी पाने आणि अंशतः कुजलेल्या शेणापासून बेड तयार करा. तो ओलसर ठेवा, पण पाणी साचू देऊ नका.",
          },
          {
            title: "दिवस 16–30",
            text: "साहित्य थंड झाल्यावर गांडुळे सोडा. ओलावा टिकवून ठेवा आणि बेडला थेट सूर्यप्रकाश व मुसळधार पावसापासून वाचवा.",
          },
          {
            title: "दिवस 31–45",
            text: "ओलाव्याची नियमित तपासणी करा. कंपोस्ट गडद, सैल आणि मातीसारखा वास येणारा झाल्यावर ते चाळून वापरासाठी तयार करा.",
          },
        ],
        tips: [
          "बेड सावलीत ठेवा.",
          "बेडमध्ये पाणी साचू देऊ नका.",
          "ताजे गरम शेण गांडुळांवर थेट टाकू नका.",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "ठिबक लेटरल्स",
          "मुख्य आणि उप-मुख्य पाईप",
          "फिल्टर",
          "दाब नियंत्रक",
          "खत टाकी",
        ],
        steps: [
          {
            title: "पायरी 1",
            text: "एक एकर शेताचे सोयीस्कर सिंचन करता येईल अशा विभागांमध्ये विभाजन करा आणि मुख्य पाईप शेताच्या कडेने बसवा.",
          },
          {
            title: "पायरी 2",
            text: "कांद्याच्या ओळींच्या बाजूने ठिबक लेटरल्स अंथरा आणि एमिटरमधून पाण्याचा प्रवाह समान आहे का व अडथळे आहेत का ते तपासा.",
          },
          {
            title: "पायरी 3",
            text: "मातीतील ओलावा, पिकाची अवस्था आणि पावसाच्या प्रमाणानुसार कमी वेळेच्या नियमित सिंचन फेऱ्या द्या.",
          },
        ],
        tips: [
          "ठिबक प्रणालीपूर्वी पाणी फिल्टर करा.",
          "दर आठवड्याला गळती तपासा.",
          "बाष्पीभवन कमी करण्यासाठी आच्छादनाचा वापर करा.",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "मृदा आरोग्य कार्ड",
          "पीक नियोजन",
          "खतांची लेबले",
          "माती तपासणी नोंद",
        ],
        steps: [
          {
            title: "पायरी 1",
            text: "मातीची प्रतिक्रिया आणि क्षारता समजण्यासाठी pH आणि विद्युत चालकता तपासा.",
          },
          {
            title: "पायरी 2",
            text: "सेंद्रिय कर्ब आणि उपलब्ध नत्र, स्फुरद व पालाश हे घटक एकत्र वाचा.",
          },
          {
            title: "पायरी 3",
            text: "दुसऱ्या शेतातील खतांचा वापर तसाच न करता, तुम्ही घेणार असलेल्या पिकासाठी दिलेल्या शिफारशींचे पालन करा.",
          },
        ],
        tips: [
          "मातीची नियमित तपासणी करा.",
          "खत वापराची नोंद ठेवा.",
          "पिकानुसार शिफारशींचा वापर करा.",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "स्वच्छ पाणी",
          "स्वच्छ कास पुसण्याचे कापड",
          "स्वच्छ दूध काढण्याची साधने",
          "कोरडे अंथरूण",
        ],
        steps: [
          {
            title: "दूध काढण्यापूर्वी",
            text: "कास आणि स्तनाग्रे स्वच्छ करून कोरडी करा. हात धुवा आणि दूध काढण्याची साधने स्वच्छ ठेवा.",
          },
          {
            title: "दूध काढताना",
            text: "हळुवारपणे दूध काढा आणि घाणेरडे हात किंवा साधने स्वच्छ स्तनाग्रांना दूषित करू देऊ नका.",
          },
          {
            title: "दूध काढल्यानंतर",
            text: "जनावरांना स्वच्छ जागेत ठेवा आणि सूज, उष्णता, वेदना किंवा असामान्य दूध याकडे लक्ष द्या.",
          },
        ],
        tips: [
          "अंथरूण कोरडे ठेवा.",
          "संशयित जनावरांना वेगळे ठेवा.",
          "असामान्य दूध किंवा ताप असल्यास पशुवैद्यकाशी संपर्क साधा.",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "पूर्णपणे वाळलेला कांदा",
          "हवेशीर साठवण जागा",
          "स्वच्छ रॅक किंवा जाळी",
          "वर्गीकरणाची जागा",
        ],
        steps: [
          {
            title: "साठवणीपूर्वी",
            text: "पिकलेला कांदा चांगला वाळवा आणि खराब, रोगट किंवा ओले कांदे वेगळे करा.",
          },
          {
            title: "साठवणीदरम्यान",
            text: "कांदा थंड, कोरड्या आणि हवेशीर ठिकाणी ठेवा. ओल्या जमिनीपासून दूर ठेवा.",
          },
          {
            title: "नियमित तपासणी",
            text: "साठवण नियमित तपासा आणि कुजलेले कांदे लगेच काढून टाका.",
          },
        ],
        tips: [
          "ओला कांदा कधीही साठवू नका.",
          "कांदा खूप दाटीवाटीने ठेवू नका.",
          "विक्रीपूर्वी कांद्याचे वर्गीकरण करा.",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "बचत गटाचे रेकॉर्ड",
          "बैठक नोंदवही",
          "बचत नोंदी",
          "बँक खात्याचे तपशील",
          "कर्ज प्रस्ताव",
        ],
        steps: [
          {
            title: "पायरी 1",
            text: "नियमित बैठका, बचत, उपस्थिती आणि पारदर्शक आर्थिक नोंदी व्यवस्थित ठेवा.",
          },
          {
            title: "पायरी 2",
            text: "गटाचे बँक खाते सक्रिय ठेवा आणि आवश्यक कागदपत्रे व कर्जाचा उद्देश तयार ठेवा.",
          },
          {
            title: "पायरी 3",
            text: "बँकेत अर्ज सादर करा आणि मंजूर कर्जाचा वापर ठरलेल्या कामासाठी करा.",
          },
        ],
        tips: [
          "नोंदी नेहमी अद्ययावत ठेवा.",
          "हप्ते वेळेवर भरा.",
          "लागू योजना आणि अटींबद्दल बँकेकडे विचारा.",
        ],
      },
    },
  },

  ta: {
    materialsTitle: "தேவையான பொருட்கள்",
    stepsTitle: "படிப்படியான வழிகாட்டி",
    tipsTitle: "முக்கிய குறிப்புகள்",
    close: "வழிகாட்டியை மூடுக",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "மண்புழுக்கள்",
          "பகுதியாக மக்கிய மாட்டு சாணம்",
          "உலர்ந்த இலைகள் அல்லது பயிர் கழிவுகள்",
          "தண்ணீர்",
          "நிழலான படுக்கை அல்லது குழி",
        ],
        steps: [
          {
            title: "நாட்கள் 1–15",
            text: "நிழலான இடத்தில் ஈரமான உலர்ந்த இலைகள் மற்றும் பகுதியாக மக்கிய மாட்டு சாணத்தால் படுக்கையைத் தயார் செய்யுங்கள். ஈரப்பதமாக வைத்திருக்கவும், ஆனால் தண்ணீர் தேங்க விடாதீர்கள்.",
          },
          {
            title: "நாட்கள் 16–30",
            text: "பொருட்கள் குளிர்ந்த பிறகு மண்புழுக்களைச் சேர்க்கவும். ஈரப்பதத்தை பராமரித்து, நேரடி சூரிய ஒளி மற்றும் கனமழையிலிருந்து படுக்கையைப் பாதுகாக்கவும்.",
          },
          {
            title: "நாட்கள் 31–45",
            text: "ஈரப்பதத்தைத் தொடர்ந்து சரிபார்க்கவும். உரம் கருமையாகவும் தளர்வாகவும் மண் வாசனையுடனும் மாறியதும் சலித்து பயன்பாட்டிற்கு தயார் செய்யவும்.",
          },
        ],
        tips: [
          "படுக்கையை நிழலில் வைத்திருக்கவும்.",
          "படுக்கையில் தண்ணீர் தேங்க விடாதீர்கள்.",
          "புதிய சூடான சாணத்தை மண்புழுக்களின் மேல் நேரடியாக போடாதீர்கள்.",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "சொட்டு நீர்ப்பாசன லேட்டரல்கள்",
          "முதன்மை மற்றும் துணை முதன்மை குழாய்கள்",
          "வடிகட்டி",
          "அழுத்த கட்டுப்படுத்தி",
          "உரத் தொட்டி",
        ],
        steps: [
          {
            title: "படி 1",
            text: "ஒரு ஏக்கர் வயலை எளிதாக பாசனம் செய்யக்கூடிய பகுதிகளாகப் பிரித்து, வயலின் ஓரமாக முதன்மை குழாயை அமைக்கவும்.",
          },
          {
            title: "படி 2",
            text: "வெங்காய வரிசைகளுடன் சொட்டு நீர்ப்பாசன லேட்டரல்களை அமைத்து, எமிட்டர்களில் நீர் சீராக வருகிறதா மற்றும் அடைப்பு உள்ளதா எனச் சரிபார்க்கவும்.",
          },
          {
            title: "படி 3",
            text: "மண் ஈரப்பதம், பயிரின் வளர்ச்சி நிலை மற்றும் மழையைப் பொறுத்து குறுகிய நேர இடைவெளிகளில் முறையாக பாசனம் செய்யவும்.",
          },
        ],
        tips: [
          "சொட்டு நீர்ப்பாசனத்திற்கு முன் தண்ணீரை வடிகட்டவும்.",
          "ஒவ்வொரு வாரமும் கசிவுகளைச் சரிபார்க்கவும்.",
          "ஆவியாதலைக் குறைக்க மூடாக்கைப் பயன்படுத்தவும்.",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "மண் ஆரோக்கிய அட்டை",
          "பயிர் திட்டம்",
          "உர லேபிள்கள்",
          "மண் பரிசோதனை பதிவு",
        ],
        steps: [
          {
            title: "படி 1",
            text: "மண்ணின் தன்மை மற்றும் உப்புத்தன்மையைப் புரிந்துகொள்ள pH மற்றும் மின் கடத்துத்திறனைச் சரிபார்க்கவும்.",
          },
          {
            title: "படி 2",
            text: "கரிம கார்பன் மற்றும் கிடைக்கக்கூடிய நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம் ஆகியவற்றை ஒன்றாகப் படிக்கவும்.",
          },
          {
            title: "படி 3",
            text: "வேறு வயலில் பயன்படுத்திய உர அளவைப் பின்பற்றாமல், நீங்கள் வளர்க்கும் பயிருக்கான பரிந்துரையைப் பின்பற்றவும்.",
          },
        ],
        tips: [
          "மண்ணைத் தொடர்ந்து பரிசோதிக்கவும்.",
          "உரப் பயன்பாட்டை பதிவு செய்யவும்.",
          "பயிருக்கு ஏற்ற பரிந்துரைகளைப் பயன்படுத்தவும்.",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "சுத்தமான தண்ணீர்",
          "சுத்தமான மடி துடைக்கும் துணி",
          "சுத்தமான பால் கறக்கும் உபகரணங்கள்",
          "உலர்ந்த படுக்கை",
        ],
        steps: [
          {
            title: "பால் கறப்பதற்கு முன்",
            text: "மடியையும் காம்புகளையும் சுத்தம் செய்து உலர்த்தவும். கைகளை கழுவி, பால் கறக்கும் உபகரணங்களைச் சுத்தமாக வைத்திருக்கவும்.",
          },
          {
            title: "பால் கறக்கும் போது",
            text: "மெதுவாக பால் கறக்கவும். அழுக்கான கைகள் அல்லது உபகரணங்கள் சுத்தமான காம்புகளை மாசுபடுத்தாமல் பார்த்துக்கொள்ளவும்.",
          },
          {
            title: "பால் கறந்த பிறகு",
            text: "கால்நடைகளை சுத்தமான இடத்தில் வைத்து, வீக்கம், சூடு, வலி அல்லது அசாதாரண பால் போன்ற அறிகுறிகளை கவனிக்கவும்.",
          },
        ],
        tips: [
          "படுக்கையை உலர்ந்த நிலையில் வைத்திருக்கவும்.",
          "சந்தேகப்படும் கால்நடைகளைத் தனியாக வைத்திருக்கவும்.",
          "அசாதாரண பால் அல்லது காய்ச்சல் இருந்தால் கால்நடை மருத்துவரை அணுகவும்.",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "நன்றாக உலர்ந்த வெங்காயம்",
          "காற்றோட்டமான சேமிப்பு இடம்",
          "சுத்தமான ரேக்குகள் அல்லது வலை",
          "தரம்பிரிக்கும் பகுதி",
        ],
        steps: [
          {
            title: "சேமிப்பதற்கு முன்",
            text: "முழுமையாக வளர்ந்த வெங்காயத்தை நன்றாக உலர்த்தி, சேதமடைந்த, நோயுற்ற அல்லது ஈரமான வெங்காயங்களை அகற்றவும்.",
          },
          {
            title: "சேமிப்பின் போது",
            text: "வெங்காயத்தை குளிர்ச்சியான, உலர்ந்த மற்றும் நல்ல காற்றோட்டம் உள்ள இடத்தில் வைக்கவும். ஈரமான தரையிலிருந்து விலக்கி வைக்கவும்.",
          },
          {
            title: "தொடர்ந்து பரிசோதித்தல்",
            text: "சேமிப்பைத் தொடர்ந்து பரிசோதித்து, அழுகிய வெங்காயங்களை உடனடியாக அகற்றவும்.",
          },
        ],
        tips: [
          "ஈரமான வெங்காயத்தை ஒருபோதும் சேமிக்காதீர்கள்.",
          "அதிகமாக குவித்து வைக்காதீர்கள்.",
          "விற்பனைக்கு முன் வெங்காயத்தை தரம்பிரிக்கவும்.",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "சுய உதவிக் குழு பதிவுகள்",
          "கூட்டப் பதிவேடு",
          "சேமிப்பு பதிவுகள்",
          "வங்கி கணக்கு விவரங்கள்",
          "கடன் முன்மொழிவு",
        ],
        steps: [
          {
            title: "படி 1",
            text: "தொடர்ச்சியான கூட்டங்கள், சேமிப்பு, வருகைப் பதிவு மற்றும் வெளிப்படையான நிதிப் பதிவுகளைப் பராமரிக்கவும்.",
          },
          {
            title: "படி 2",
            text: "குழுவின் வங்கி கணக்கைச் செயல்பாட்டில் வைத்து, தேவையான ஆவணங்கள் மற்றும் கடனின் நோக்கத்தைத் தயாரிக்கவும்.",
          },
          {
            title: "படி 3",
            text: "வங்கியில் விண்ணப்பத்தைச் சமர்ப்பித்து, அங்கீகரிக்கப்பட்ட கடனை ஒப்புக்கொண்ட செயல்பாட்டிற்கே பயன்படுத்தவும்.",
          },
        ],
        tips: [
          "பதிவுகளை எப்போதும் புதுப்பித்த நிலையில் வைத்திருக்கவும்.",
          "தவணைகளை சரியான நேரத்தில் செலுத்தவும்.",
          "பொருந்தும் திட்டங்கள் மற்றும் விதிமுறைகள் குறித்து வங்கியிடம் கேட்கவும்.",
        ],
      },
    },
  },

  kn: {
    materialsTitle: "ಅಗತ್ಯವಿರುವ ವಸ್ತುಗಳು",
    stepsTitle: "ಹಂತ ಹಂತದ ಮಾರ್ಗದರ್ಶಿ",
    tipsTitle: "ಮುಖ್ಯ ಸಲಹೆಗಳು",
    close: "ಮಾರ್ಗದರ್ಶಿ ಮುಚ್ಚಿ",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "ಎರೆಹುಳುಗಳು",
          "ಭಾಗಶಃ ಕೊಳೆತ ಹಸುವಿನ ಸಗಣಿ",
          "ಒಣ ಎಲೆಗಳು ಅಥವಾ ಬೆಳೆ ಅವಶೇಷಗಳು",
          "ನೀರು",
          "ನೆರಳಿನ ಹಾಸಿಗೆ ಅಥವಾ ಗುಂಡಿ",
        ],
        steps: [
          {
            title: "ದಿನ 1–15",
            text: "ನೆರಳಿನ ಸ್ಥಳದಲ್ಲಿ ತೇವವಾದ ಒಣ ಎಲೆಗಳು ಮತ್ತು ಭಾಗಶಃ ಕೊಳೆತ ಹಸುವಿನ ಸಗಣಿಯಿಂದ ಹಾಸಿಗೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ. ತೇವವಾಗಿರಿಸಿ, ಆದರೆ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
          },
          {
            title: "ದಿನ 16–30",
            text: "ವಸ್ತು ತಣ್ಣಗಾದ ನಂತರ ಎರೆಹುಳುಗಳನ್ನು ಸೇರಿಸಿ. ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ ಮತ್ತು ಹಾಸಿಗೆಯನ್ನು ನೇರ ಸೂರ್ಯಪ್ರಕಾಶ ಹಾಗೂ ಭಾರಿ ಮಳೆಯಿಂದ ರಕ್ಷಿಸಿ.",
          },
          {
            title: "ದಿನ 31–45",
            text: "ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ. ಕಾಂಪೋಸ್ಟ್ ಕಪ್ಪಾಗಿ, ಸಡಿಲವಾಗಿ ಮತ್ತು ಮಣ್ಣಿನ ವಾಸನೆಯಾಗುವಾಗ ಅದನ್ನು ಜರಡಿ ಹಿಡಿದು ಬಳಕೆಗೆ ಸಿದ್ಧಪಡಿಸಿ.",
          },
        ],
        tips: [
          "ಹಾಸಿಗೆಯನ್ನು ನೆರಳಿನಲ್ಲಿ ಇರಿಸಿ.",
          "ಹಾಸಿಗೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
          "ಹೊಸ ಬಿಸಿ ಸಗಣಿಯನ್ನು ಎರೆಹುಳುಗಳ ಮೇಲೆ ನೇರವಾಗಿ ಹಾಕಬೇಡಿ.",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "ಹನಿ ನೀರಾವರಿ ಲ್ಯಾಟರಲ್‌ಗಳು",
          "ಮುಖ್ಯ ಮತ್ತು ಉಪ-ಮುಖ್ಯ ಪೈಪ್‌ಗಳು",
          "ಫಿಲ್ಟರ್",
          "ಒತ್ತಡ ನಿಯಂತ್ರಕ",
          "ರಸಗೊಬ್ಬರ ಟ್ಯಾಂಕ್",
        ],
        steps: [
          {
            title: "ಹಂತ 1",
            text: "ಒಂದು ಎಕರೆ ಹೊಲವನ್ನು ಸುಲಭವಾಗಿ ನೀರಾವರಿ ಮಾಡಬಹುದಾದ ವಿಭಾಗಗಳಾಗಿ ವಿಭಜಿಸಿ ಮತ್ತು ಮುಖ್ಯ ಪೈಪ್ ಅನ್ನು ಹೊಲದ ಅಂಚಿನಲ್ಲಿ ಅಳವಡಿಸಿ.",
          },
          {
            title: "ಹಂತ 2",
            text: "ಈರುಳ್ಳಿ ಸಾಲುಗಳ ಉದ್ದಕ್ಕೂ ಹನಿ ನೀರಾವರಿ ಲ್ಯಾಟರಲ್‌ಗಳನ್ನು ಹಾಕಿ ಮತ್ತು ಎಮಿಟರ್‌ಗಳಲ್ಲಿ ಸಮಾನ ನೀರಿನ ಹರಿವು ಹಾಗೂ ಅಡಚಣೆಗಳಿವೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
          },
          {
            title: "ಹಂತ 3",
            text: "ಮಣ್ಣಿನ ತೇವಾಂಶ, ಬೆಳೆ ಹಂತ ಮತ್ತು ಮಳೆಯ ಆಧಾರದ ಮೇಲೆ ಕಡಿಮೆ ಅವಧಿಯ ನಿಯಮಿತ ನೀರಾವರಿ ಚಕ್ರಗಳನ್ನು ನಡೆಸಿ.",
          },
        ],
        tips: [
          "ಹನಿ ನೀರಾವರಿ ವ್ಯವಸ್ಥೆಗೆ ಮೊದಲು ನೀರನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ.",
          "ಪ್ರತಿ ವಾರ ಸೋರಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
          "ಆವಿಯಾಗುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮಲ್ಚಿಂಗ್ ಬಳಸಿ.",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್",
          "ಬೆಳೆ ಯೋಜನೆ",
          "ರಸಗೊಬ್ಬರದ ಲೇಬಲ್‌ಗಳು",
          "ಮಣ್ಣು ಪರೀಕ್ಷೆಯ ದಾಖಲೆ",
        ],
        steps: [
          {
            title: "ಹಂತ 1",
            text: "ಮಣ್ಣಿನ ಸ್ವಭಾವ ಮತ್ತು ಲವಣಾಂಶವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು pH ಮತ್ತು ವಿದ್ಯುತ್ ವಾಹಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
          },
          {
            title: "ಹಂತ 2",
            text: "ಸಾವಯವ ಕಾರ್ಬನ್ ಮತ್ತು ಲಭ್ಯವಿರುವ ನೈಟ್ರೋಜನ್, ಫಾಸ್ಫರಸ್ ಹಾಗೂ ಪೊಟ್ಯಾಸಿಯಂ ಅನ್ನು ಒಟ್ಟಿಗೆ ಓದಿ.",
          },
          {
            title: "ಹಂತ 3",
            text: "ಬೇರೆ ಹೊಲದಲ್ಲಿ ಬಳಸಿದ ಗೊಬ್ಬರವನ್ನು ನಕಲಿಸುವ ಬದಲು, ನೀವು ಬೆಳೆಯುವ ಬೆಳೆಗಾಗಿ ನೀಡಿರುವ ಶಿಫಾರಸನ್ನು ಅನುಸರಿಸಿ.",
          },
        ],
        tips: [
          "ಮಣ್ಣನ್ನು ನಿಯಮಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿ.",
          "ರಸಗೊಬ್ಬರ ಬಳಕೆಯ ದಾಖಲೆಯನ್ನು ಇಡಿ.",
          "ಬೆಳೆಗೆ ಅನುಗುಣವಾದ ಶಿಫಾರಸುಗಳನ್ನು ಬಳಸಿ.",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "ಶುದ್ಧ ನೀರು",
          "ಶುದ್ಧ ಕೆಚ್ಚಲು ಒರೆಸುವ ಬಟ್ಟೆ",
          "ಶುದ್ಧ ಹಾಲು ಕರೆಯುವ ಉಪಕರಣಗಳು",
          "ಒಣ ಹಾಸಿಗೆ",
        ],
        steps: [
          {
            title: "ಹಾಲು ಕರೆಯುವ ಮೊದಲು",
            text: "ಕೆಚ್ಚಲು ಮತ್ತು ಮೊಲೆಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ ಒಣಗಿಸಿ. ಕೈಗಳನ್ನು ತೊಳೆದು ಹಾಲು ಕರೆಯುವ ಉಪಕರಣಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ.",
          },
          {
            title: "ಹಾಲು ಕರೆಯುವಾಗ",
            text: "ನಿಧಾನವಾಗಿ ಹಾಲು ಕರೆಯಿರಿ ಮತ್ತು ಕೊಳಕು ಕೈಗಳು ಅಥವಾ ಉಪಕರಣಗಳು ಸ್ವಚ್ಛ ಮೊಲೆಗಳನ್ನು ಕಲುಷಿತಗೊಳಿಸದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
          },
          {
            title: "ಹಾಲು ಕರೆಯುವ ನಂತರ",
            text: "ಜಾನುವಾರುಗಳನ್ನು ಸ್ವಚ್ಛ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ ಮತ್ತು ಊತ, ಬಿಸಿ, ನೋವು ಅಥವಾ ಅಸಹಜ ಹಾಲಿನ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ.",
          },
        ],
        tips: [
          "ಹಾಸಿಗೆಯನ್ನು ಒಣವಾಗಿಡಿ.",
          "ಸಂದೇಹಾಸ್ಪದ ಜಾನುವಾರುಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸಿ.",
          "ಅಸಹಜ ಹಾಲು ಅಥವಾ ಜ್ವರ ಇದ್ದರೆ ಪಶುವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "ಚೆನ್ನಾಗಿ ಒಣಗಿದ ಈರುಳ್ಳಿ",
          "ಗಾಳಿಯಾಡುವ ಸಂಗ್ರಹಣಾ ಸ್ಥಳ",
          "ಶುದ್ಧ ರ್ಯಾಕ್‌ಗಳು ಅಥವಾ ಜಾಲರಿ",
          "ವಿಂಗಡಿಸುವ ಸ್ಥಳ",
        ],
        steps: [
          {
            title: "ಸಂಗ್ರಹಿಸುವ ಮೊದಲು",
            text: "ಬೆಳೆದ ಈರುಳ್ಳಿಯನ್ನು ಚೆನ್ನಾಗಿ ಒಣಗಿಸಿ ಮತ್ತು ಹಾನಿಗೊಳಗಾದ, ರೋಗಪೀಡಿತ ಅಥವಾ ಒದ್ದೆಯಾದ ಈರುಳ್ಳಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.",
          },
          {
            title: "ಸಂಗ್ರಹಿಸುವಾಗ",
            text: "ಈರುಳ್ಳಿಯನ್ನು ತಂಪಾದ, ಒಣ ಮತ್ತು ಉತ್ತಮ ಗಾಳಿಯಾಡುವ ಸ್ಥಳದಲ್ಲಿ ಇರಿಸಿ. ಒದ್ದೆಯಾದ ನೆಲದಿಂದ ದೂರವಿಡಿ.",
          },
          {
            title: "ನಿಯಮಿತ ಪರಿಶೀಲನೆ",
            text: "ಸಂಗ್ರಹವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೊಳೆತ ಈರುಳ್ಳಿಯನ್ನು ತಕ್ಷಣ ತೆಗೆದುಹಾಕಿ.",
          },
        ],
        tips: [
          "ಒದ್ದೆಯಾದ ಈರುಳ್ಳಿಯನ್ನು ಎಂದಿಗೂ ಸಂಗ್ರಹಿಸಬೇಡಿ.",
          "ಅತಿಯಾಗಿ ಕಿಕ್ಕಿರಿದು ಸಂಗ್ರಹಿಸಬೇಡಿ.",
          "ಮಾರಾಟಕ್ಕೂ ಮೊದಲು ಈರುಳ್ಳಿಯನ್ನು ವಿಂಗಡಿಸಿ.",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "ಸ್ವಸಹಾಯ ಸಂಘದ ದಾಖಲೆಗಳು",
          "ಸಭಾ ನೋಂದಣಿ ಪುಸ್ತಕ",
          "ಉಳಿತಾಯ ದಾಖಲೆಗಳು",
          "ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು",
          "ಸಾಲದ ಪ್ರಸ್ತಾವನೆ",
        ],
        steps: [
          {
            title: "ಹಂತ 1",
            text: "ನಿಯಮಿತ ಸಭೆಗಳು, ಉಳಿತಾಯ, ಹಾಜರಾತಿ ಮತ್ತು ಪಾರದರ್ಶಕ ಹಣಕಾಸು ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
          },
          {
            title: "ಹಂತ 2",
            text: "ಸಂಘದ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಸಕ್ರಿಯವಾಗಿರಿಸಿ ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳು ಹಾಗೂ ಸಾಲದ ಉದ್ದೇಶವನ್ನು ಸಿದ್ಧಪಡಿಸಿ.",
          },
          {
            title: "ಹಂತ 3",
            text: "ಬ್ಯಾಂಕಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ಮಂಜೂರಾದ ಸಾಲವನ್ನು ಒಪ್ಪಿಕೊಂಡ ಚಟುವಟಿಕೆಗೆ ಮಾತ್ರ ಬಳಸಿ.",
          },
        ],
        tips: [
          "ದಾಖಲೆಗಳನ್ನು ಯಾವಾಗಲೂ ನವೀಕರಿಸಿ.",
          "ಕಂತುಗಳನ್ನು ಸಮಯಕ್ಕೆ ಪಾವತಿಸಿ.",
          "ಅನ್ವಯಿಸುವ ಯೋಜನೆಗಳು ಮತ್ತು ನಿಯಮಗಳ ಬಗ್ಗೆ ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ.",
        ],
      },
    },
  },

  bn: {
    materialsTitle: "প্রয়োজনীয় উপকরণ",
    stepsTitle: "ধাপে ধাপে গাইড",
    tipsTitle: "গুরুত্বপূর্ণ পরামর্শ",
    close: "গাইড বন্ধ করুন",
    details: {
      "Making quality vermicompost in 45 days": {
        materials: [
          "কেঁচো",
          "আংশিক পচা গোবর",
          "শুকনো পাতা বা ফসলের অবশিষ্টাংশ",
          "জল",
          "ছায়াযুক্ত বেড বা গর্ত",
        ],
        steps: [
          {
            title: "দিন 1–15",
            text: "ছায়াযুক্ত জায়গায় ভেজা শুকনো পাতা ও আংশিক পচা গোবর দিয়ে বেড তৈরি করুন। আর্দ্র রাখুন, কিন্তু জল জমতে দেবেন না।",
          },
          {
            title: "দিন 16–30",
            text: "উপকরণ ঠান্ডা হওয়ার পর কেঁচো যোগ করুন। আর্দ্রতা বজায় রাখুন এবং বেডকে সরাসরি রোদ ও ভারী বৃষ্টি থেকে রক্ষা করুন।",
          },
          {
            title: "দিন 31–45",
            text: "নিয়মিত আর্দ্রতা পরীক্ষা করুন। কম্পোস্ট গাঢ়, ঝুরঝুরে এবং মাটির মতো গন্ধযুক্ত হলে ছেঁকে ব্যবহার করার জন্য প্রস্তুত করুন।",
          },
        ],
        tips: [
          "বেডটি ছায়ায় রাখুন।",
          "বেডে জল জমতে দেবেন না।",
          "তাজা গরম গোবর কেঁচোর উপর সরাসরি দেবেন না।",
        ],
      },

      "Drip irrigation layout for 1 acre onion": {
        materials: [
          "ড্রিপ ল্যাটারাল",
          "প্রধান ও উপ-প্রধান পাইপ",
          "ফিল্টার",
          "চাপ নিয়ন্ত্রক",
          "সার ট্যাঙ্ক",
        ],
        steps: [
          {
            title: "ধাপ 1",
            text: "এক একর জমিকে সহজে সেচ দেওয়া যায় এমন ভাগে ভাগ করুন এবং জমির ধারে প্রধান পাইপ বসান।",
          },
          {
            title: "ধাপ 2",
            text: "পেঁয়াজের সারির পাশে ড্রিপ ল্যাটারাল বিছিয়ে দিন এবং এমিটারে সমান জলপ্রবাহ ও কোনো বাধা আছে কি না পরীক্ষা করুন।",
          },
          {
            title: "ধাপ 3",
            text: "মাটির আর্দ্রতা, ফসলের পর্যায় এবং বৃষ্টির উপর ভিত্তি করে অল্প সময়ের নিয়মিত সেচ দিন।",
          },
        ],
        tips: [
          "ড্রিপ ব্যবস্থার আগে জল ফিল্টার করুন।",
          "প্রতি সপ্তাহে লিক পরীক্ষা করুন।",
          "বাষ্পীভবন কমাতে মালচ ব্যবহার করুন।",
        ],
      },

      "Reading your Soil Health Card correctly": {
        materials: [
          "মাটির স্বাস্থ্য কার্ড",
          "ফসলের পরিকল্পনা",
          "সারের লেবেল",
          "মাটি পরীক্ষার রেকর্ড",
        ],
        steps: [
          {
            title: "ধাপ 1",
            text: "মাটির প্রকৃতি ও লবণাক্ততা বোঝার জন্য pH এবং বৈদ্যুতিক পরিবাহিতা পরীক্ষা করুন।",
          },
          {
            title: "ধাপ 2",
            text: "জৈব কার্বন এবং উপলব্ধ নাইট্রোজেন, ফসফরাস ও পটাশিয়াম একসঙ্গে পড়ুন।",
          },
          {
            title: "ধাপ 3",
            text: "অন্য জমিতে ব্যবহৃত সারের পরিমাণ অনুকরণ না করে আপনি যে ফসল চাষ করবেন তার জন্য দেওয়া সুপারিশ অনুসরণ করুন।",
          },
        ],
        tips: [
          "নিয়মিত মাটি পরীক্ষা করুন।",
          "সার ব্যবহারের রেকর্ড রাখুন।",
          "ফসল অনুযায়ী সুপারিশ ব্যবহার করুন।",
        ],
      },

      "Preventing mastitis in dairy cattle": {
        materials: [
          "পরিষ্কার জল",
          "পরিষ্কার ওলান মোছার কাপড়",
          "পরিষ্কার দুধ দোহনের সরঞ্জাম",
          "শুকনো বিছানা",
        ],
        steps: [
          {
            title: "দুধ দোহনের আগে",
            text: "ওলান ও বাট পরিষ্কার করে শুকিয়ে নিন। হাত ধুয়ে নিন এবং দুধ দোহনের সরঞ্জাম পরিষ্কার রাখুন।",
          },
          {
            title: "দুধ দোহনের সময়",
            text: "আলতোভাবে দুধ দোহন করুন এবং নোংরা হাত বা সরঞ্জাম দিয়ে পরিষ্কার বাট দূষিত হতে দেবেন না।",
          },
          {
            title: "দুধ দোহনের পরে",
            text: "গবাদি পশুকে পরিষ্কার জায়গায় রাখুন এবং ফোলা, গরম, ব্যথা বা অস্বাভাবিক দুধের লক্ষণ লক্ষ্য করুন।",
          },
        ],
        tips: [
          "বিছানা শুকনো রাখুন।",
          "সন্দেহজনক পশুকে আলাদা রাখুন।",
          "অস্বাভাবিক দুধ বা জ্বর হলে পশুচিকিৎসকের সঙ্গে যোগাযোগ করুন।",
        ],
      },

      "Storing onion to cut 30% losses": {
        materials: [
          "ভালোভাবে শুকনো পেঁয়াজ",
          "বাতাস চলাচল করে এমন সংরক্ষণ স্থান",
          "পরিষ্কার র্যাক বা জাল",
          "বাছাই করার স্থান",
        ],
        steps: [
          {
            title: "সংরক্ষণের আগে",
            text: "পরিপক্ব পেঁয়াজ ভালোভাবে শুকিয়ে নিন এবং ক্ষতিগ্রস্ত, রোগাক্রান্ত বা ভেজা পেঁয়াজ বাদ দিন।",
          },
          {
            title: "সংরক্ষণের সময়",
            text: "পেঁয়াজ ঠান্ডা, শুকনো ও ভালো বাতাস চলাচল করে এমন জায়গায় রাখুন। ভেজা মেঝে থেকে দূরে রাখুন।",
          },
          {
            title: "নিয়মিত পরীক্ষা",
            text: "সংরক্ষিত পেঁয়াজ নিয়মিত পরীক্ষা করুন এবং পচা পেঁয়াজ সঙ্গে সঙ্গে সরিয়ে ফেলুন।",
          },
        ],
        tips: [
          "ভেজা পেঁয়াজ কখনও সংরক্ষণ করবেন না।",
          "অতিরিক্ত গাদাগাদি করে রাখবেন না।",
          "বিক্রির আগে পেঁয়াজ বাছাই করুন।",
        ],
      },

      "How a self-help group gets a bank loan": {
        materials: [
          "স্বনির্ভর গোষ্ঠীর রেকর্ড",
          "সভা রেজিস্টার",
          "সঞ্চয়ের রেকর্ড",
          "ব্যাংক অ্যাকাউন্টের বিবরণ",
          "ঋণের প্রস্তাব",
        ],
        steps: [
          {
            title: "ধাপ 1",
            text: "নিয়মিত সভা, সঞ্চয়, উপস্থিতি এবং স্বচ্ছ আর্থিক রেকর্ড বজায় রাখুন।",
          },
          {
            title: "ধাপ 2",
            text: "গোষ্ঠীর ব্যাংক অ্যাকাউন্ট সক্রিয় রাখুন এবং প্রয়োজনীয় নথি ও ঋণের উদ্দেশ্য প্রস্তুত করুন।",
          },
          {
            title: "ধাপ 3",
            text: "ব্যাংকে আবেদন জমা দিন এবং অনুমোদিত ঋণ নির্ধারিত কাজের জন্য ব্যবহার করুন।",
          },
        ],
        tips: [
          "রেকর্ড সবসময় আপডেট রাখুন।",
          "কিস্তি সময়মতো পরিশোধ করুন।",
          "প্রযোজ্য প্রকল্প ও শর্ত সম্পর্কে ব্যাংকে জিজ্ঞাসা করুন।",
        ],
      },
    },
  },
};

/* =========================================================
   PAGE
========================================================= */

function KnowledgePage() {
  const t = useT();
  const { lang } = useI18n();
  const text = knowledgeText[lang] ?? knowledgeText.en;

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredGuides = guides.filter((guide) => {
    const translatedTitle = text.guides[guide.title] ?? guide.title;
    const translatedTopic = text.topics[guide.topic] ?? guide.topic;
    const query = search.trim().toLowerCase();

    const matchesSearch =
      query === "" ||
      translatedTitle.toLowerCase().includes(query) ||
      translatedTopic.toLowerCase().includes(query) ||
      guide.title.toLowerCase().includes(query) ||
      guide.topic.toLowerCase().includes(query);

    const matchesTopic =
      selectedTopic === null || guide.topic === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  return (
    <>
      <PageHeader
        icon={BookOpen}
        eyebrow={t("page.knowledge.eyebrow")}
        title={t("nav.knowledge")}
        description={t("page.knowledge.description")}
      />

      {/* SEARCH + TOPICS */}
      <Section>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={text.searchPlaceholder}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => {
              const isSelected = selectedTopic === topic;

              return (
                <Badge
                  key={topic}
                  variant={isSelected ? "default" : "secondary"}
                  className="cursor-pointer transition hover:scale-105"
                  onClick={() =>
                    setSelectedTopic(
                      isSelected ? null : topic,
                    )
                  }
                >
                  {text.topics[topic] ?? topic}
                </Badge>
              );
            })}

            {selectedTopic !== null && (
              <Badge
                variant="outline"
                className="cursor-pointer transition hover:scale-105"
                onClick={() => setSelectedTopic(null)}
              >
                ×
              </Badge>
            )}
          </div>
        </div>

        {/* GUIDES */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <button
                key={guide.title}
                type="button"
                onClick={() => setSelectedGuide(guide)}
                className="text-left"
                aria-label={text.guides[guide.title] ?? guide.title}
              >
                <Card className="card-hover h-full cursor-pointer shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {text.topics[guide.topic] ?? guide.topic}
                    </Badge>

                    <CardTitle className="mt-3 text-base leading-snug">
                      {text.guides[guide.title] ?? guide.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {guide.mins} {text.minRead}
                    </span>

                    <span>
                      {guide.level === "Beginner"
                        ? text.beginner
                        : text.intermediate}
                    </span>
                  </CardContent>
                </Card>
              </button>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              {search || selectedTopic
                ? text.searchPlaceholder
                : "—"}
            </div>
          )}
        </div>
      </Section>

      {/* VIDEOS */}
      <Section
        title={text.watchLearn}
        description={text.watchDescription}
      >
        <div className="grid gap-5 max-w-md">
          {videos.map((video) => (
            <button
              key={video.title}
              type="button"
              onClick={() => setSelectedVideo(video)}
              className="text-left"
              aria-label={text.videos[video.title] ?? video.title}
            >
              <Card className="card-hover h-full cursor-pointer overflow-hidden shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
                <div className="gradient-canopy flex h-40 items-center justify-center text-primary-foreground">
                  <PlayCircle className="size-12 transition-transform hover:scale-110" />
                </div>

                <CardHeader>
                  <CardTitle className="text-base leading-snug">
                    {text.videos[video.title] ?? video.title}
                  </CardTitle>

                  <CardDescription>
                    {video.dur} · {languageLabel[lang]}
                  </CardDescription>
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title={text.frequentlyAsked}>
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <Accordion type="single" collapsible>
              {faqs.map((faq) => {
                const translated =
                  text.faqs[faq.q] ?? {
                    q: faq.q,
                    a: faq.a,
                  };

                return (
                  <AccordionItem key={faq.q} value={faq.q}>
                    <AccordionTrigger className="text-left">
                      {translated.q}
                    </AccordionTrigger>

                    <AccordionContent className="text-muted-foreground">
                      {translated.a}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      </Section>

      {/* GUIDE DETAILS */}
      {selectedGuide && (() => {
        const detailText = guideDetails[lang] ?? guideDetails.en;
        const guideText = detailText.details[selectedGuide.title];

        if (!guideText) {
          return null;
        }

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setSelectedGuide(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-background shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
            <div className="sticky top-0 z-10 border-b bg-background/95 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="secondary">
                    {text.topics[selectedGuide.topic] ?? selectedGuide.topic}
                  </Badge>
                  <h2 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
                    {text.guides[selectedGuide.title] ?? selectedGuide.title}
                  </h2>
                  <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {selectedGuide.mins} {text.minRead}
                    </span>
                    <span>
                      {selectedGuide.level === "Beginner" ? text.beginner : text.intermediate}
                    </span>
                  </div>
                </div>
                <button type="button" aria-label={detailText.close} onClick={() => setSelectedGuide(null)} className="shrink-0 rounded-full px-3 py-1 text-2xl leading-none hover:bg-muted">
                  ×
                </button>
              </div>
            </div>

            <div className="space-y-7 p-6">
                  <section>
                    <h3 className="text-lg font-semibold">{detailText.materialsTitle}</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {guideText.materials.map((item) => (
                        <div key={item} className="rounded-lg border bg-muted/30 p-3 text-sm">✓ {item}</div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold">{detailText.stepsTitle}</h3>
                    <div className="mt-3 space-y-3">
                      {guideText.steps.map((step) => (
                        <div key={step.title} className="rounded-xl border p-4">
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold">{detailText.tipsTitle}</h3>
                    <ul className="mt-3 space-y-2">
                      {guideText.tips.map((tip) => (
                        <li key={tip} className="rounded-lg bg-muted/40 p-3 text-sm">• {tip}</li>
                      ))}
                    </ul>
                  </section>

                  <button type="button" onClick={() => setSelectedGuide(null)} className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                    {detailText.close}
                  </button>
            </div>
          </div>
        </div>
        );
      })()}

      {/* VIDEO PLAYER */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b p-5">
              <div>
                <Badge variant="secondary">
                  {languageLabel[lang]}
                </Badge>
                <h2 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">
                  {text.videos[selectedVideo.title] ?? selectedVideo.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedVideo.dur}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close video"
                onClick={() => setSelectedVideo(null)}
                className="shrink-0 rounded-full px-3 py-1 text-2xl leading-none hover:bg-muted"
              >
                ×
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeIds[lang]}?rel=0&hl=${lang}`}
                title={text.videos[selectedVideo.title] ?? selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
