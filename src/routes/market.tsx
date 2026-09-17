import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  RefreshCw,
  MapPin,
  TrendingUp,
  CalendarDays,
  IndianRupee,
  Store,
} from "lucide-react";

import {
  useI18n,
  type LanguageCode,
} from "@/lib/i18n";

import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

/* =========================================================
   ROUTE
   ========================================================= */

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      {
        title: "Market Prices — GramSahay AI",
      },
      {
        name: "description",
        content:
          "Check crop mandi prices by crop, state, district and market.",
      },
    ],
  }),
  component: MarketPage,
});

/* =========================================================
   TYPES
   ========================================================= */

type PriceData = {
  min: number;
  max: number;
  modal: number;
  date: string;
};

type MarketData = {
  [crop: string]: {
    [state: string]: {
      [district: string]: {
        [market: string]: PriceData;
      };
    };
  };
};

/* =========================================================
   MARKET DATA
   ========================================================= */

const marketData: MarketData = {
  Tomato: {
    Maharashtra: {
      Nashik: {
        Lasalgaon: {
          min: 1800,
          max: 2600,
          modal: 2200,
          date: "2026-08-25",
        },
        Yeola: {
          min: 1700,
          max: 2500,
          modal: 2100,
          date: "2026-08-25",
        },
        Sinnar: {
          min: 1600,
          max: 2400,
          modal: 2000,
          date: "2026-08-25",
        },
      },
      Pune: {
        Pune: {
          min: 1900,
          max: 2800,
          modal: 2350,
          date: "2026-08-25",
        },
        Baramati: {
          min: 1800,
          max: 2700,
          modal: 2250,
          date: "2026-08-25",
        },
      },
      Nagpur: {
        Nagpur: {
          min: 1700,
          max: 2500,
          modal: 2150,
          date: "2026-08-25",
        },
      },
      Ahmednagar: {
        Ahmednagar: {
          min: 1650,
          max: 2450,
          modal: 2050,
          date: "2026-08-25",
        },
      },
    },

    "Tamil Nadu": {
      Madurai: {
        Madurai: {
          min: 2000,
          max: 2800,
          modal: 2400,
          date: "2026-08-25",
        },
      },
      Coimbatore: {
        Coimbatore: {
          min: 2100,
          max: 2900,
          modal: 2500,
          date: "2026-08-25",
        },
      },
      Virudhunagar: {
        Virudhunagar: {
          min: 1900,
          max: 2700,
          modal: 2300,
          date: "2026-08-25",
        },
      },
      Tirunelveli: {
        Tirunelveli: {
          min: 1950,
          max: 2750,
          modal: 2350,
          date: "2026-08-25",
        },
      },
    },

    Telangana: {
      Hyderabad: {
        Bowenpally: {
          min: 1900,
          max: 2700,
          modal: 2300,
          date: "2026-08-25",
        },
      },
      Warangal: {
        Warangal: {
          min: 1800,
          max: 2600,
          modal: 2200,
          date: "2026-08-25",
        },
      },
      Nizamabad: {
        Nizamabad: {
          min: 1850,
          max: 2650,
          modal: 2250,
          date: "2026-08-25",
        },
      },
    },

    "Andhra Pradesh": {
      Guntur: {
        Guntur: {
          min: 1800,
          max: 2600,
          modal: 2200,
          date: "2026-08-25",
        },
      },
      Kurnool: {
        Kurnool: {
          min: 1750,
          max: 2550,
          modal: 2150,
          date: "2026-08-25",
        },
      },
      Vijayawada: {
        Vijayawada: {
          min: 1900,
          max: 2700,
          modal: 2300,
          date: "2026-08-25",
        },
      },
    },

    Karnataka: {
      Bengaluru: {
        Bengaluru: {
          min: 2000,
          max: 2900,
          modal: 2450,
          date: "2026-08-25",
        },
      },
      Mysuru: {
        Mysuru: {
          min: 1900,
          max: 2750,
          modal: 2300,
          date: "2026-08-25",
        },
      },
      Hubballi: {
        Hubballi: {
          min: 1800,
          max: 2600,
          modal: 2200,
          date: "2026-08-25",
        },
      },
    },
  },

  Wheat: {
    Maharashtra: {
      Nashik: {
        Nashik: {
          min: 2300,
          max: 2900,
          modal: 2600,
          date: "2026-08-25",
        },
      },
      Pune: {
        Pune: {
          min: 2400,
          max: 3000,
          modal: 2700,
          date: "2026-08-25",
        },
      },
      Nagpur: {
        Nagpur: {
          min: 2200,
          max: 2850,
          modal: 2500,
          date: "2026-08-25",
        },
      },
    },

    Punjab: {
      Ludhiana: {
        Ludhiana: {
          min: 2400,
          max: 3000,
          modal: 2700,
          date: "2026-08-25",
        },
      },
      Amritsar: {
        Amritsar: {
          min: 2350,
          max: 2950,
          modal: 2650,
          date: "2026-08-25",
        },
      },
    },

    Haryana: {
      Karnal: {
        Karnal: {
          min: 2350,
          max: 2950,
          modal: 2650,
          date: "2026-08-25",
        },
      },
      Hisar: {
        Hisar: {
          min: 2300,
          max: 2900,
          modal: 2600,
          date: "2026-08-25",
        },
      },
    },
  },

  Rice: {
    "Tamil Nadu": {
      Thanjavur: {
        Thanjavur: {
          min: 2800,
          max: 3600,
          modal: 3200,
          date: "2026-08-25",
        },
      },
      Madurai: {
        Madurai: {
          min: 2700,
          max: 3500,
          modal: 3100,
          date: "2026-08-25",
        },
      },
      Tirunelveli: {
        Tirunelveli: {
          min: 2750,
          max: 3550,
          modal: 3150,
          date: "2026-08-25",
        },
      },
    },

    Telangana: {
      Nizamabad: {
        Nizamabad: {
          min: 2700,
          max: 3500,
          modal: 3100,
          date: "2026-08-25",
        },
      },
      Warangal: {
        Warangal: {
          min: 2650,
          max: 3450,
          modal: 3050,
          date: "2026-08-25",
        },
      },
    },

    "Andhra Pradesh": {
      Guntur: {
        Guntur: {
          min: 2800,
          max: 3600,
          modal: 3200,
          date: "2026-08-25",
        },
      },
      Kurnool: {
        Kurnool: {
          min: 2700,
          max: 3500,
          modal: 3100,
          date: "2026-08-25",
        },
      },
    },
  },

  Onion: {
    Maharashtra: {
      Nashik: {
        Lasalgaon: {
          min: 1200,
          max: 1900,
          modal: 1550,
          date: "2026-08-25",
        },
        Yeola: {
          min: 1150,
          max: 1850,
          modal: 1500,
          date: "2026-08-25",
        },
        Sinnar: {
          min: 1100,
          max: 1800,
          modal: 1450,
          date: "2026-08-25",
        },
      },

      Pune: {
        Pune: {
          min: 1250,
          max: 1950,
          modal: 1600,
          date: "2026-08-25",
        },
      },

      Ahmednagar: {
        Ahmednagar: {
          min: 1150,
          max: 1850,
          modal: 1500,
          date: "2026-08-25",
        },
      },
    },

    Karnataka: {
      Bengaluru: {
        Yeshwanthpur: {
          min: 1400,
          max: 2100,
          modal: 1750,
          date: "2026-08-25",
        },
      },

      Mysuru: {
        Mysuru: {
          min: 1300,
          max: 2000,
          modal: 1650,
          date: "2026-08-25",
        },
      },
    },

    "Tamil Nadu": {
      Madurai: {
        Madurai: {
          min: 1350,
          max: 2050,
          modal: 1700,
          date: "2026-08-25",
        },
      },
    },
  },

  Potato: {
    "Uttar Pradesh": {
      Agra: {
        Agra: {
          min: 1000,
          max: 1600,
          modal: 1300,
          date: "2026-08-25",
        },
      },

      Kanpur: {
        Kanpur: {
          min: 1050,
          max: 1650,
          modal: 1350,
          date: "2026-08-25",
        },
      },
    },

    Punjab: {
      Ludhiana: {
        Ludhiana: {
          min: 1100,
          max: 1700,
          modal: 1400,
          date: "2026-08-25",
        },
      },
    },

    "West Bengal": {
      Hooghly: {
        Hooghly: {
          min: 1000,
          max: 1650,
          modal: 1325,
          date: "2026-08-25",
        },
      },
    },
  },

  Cotton: {
    Maharashtra: {
      Nagpur: {
        Nagpur: {
          min: 6500,
          max: 7800,
          modal: 7100,
          date: "2026-08-25",
        },
      },

      Akola: {
        Akola: {
          min: 6400,
          max: 7700,
          modal: 7000,
          date: "2026-08-25",
        },
      },

      Amravati: {
        Amravati: {
          min: 6300,
          max: 7600,
          modal: 6950,
          date: "2026-08-25",
        },
      },
    },

    Telangana: {
      Warangal: {
        Warangal: {
          min: 6200,
          max: 7500,
          modal: 6800,
          date: "2026-08-25",
        },
      },

      Adilabad: {
        Adilabad: {
          min: 6100,
          max: 7400,
          modal: 6700,
          date: "2026-08-25",
        },
      },
    },
  },
};

/* =========================================================
   TRANSLATIONS
   ========================================================= */

type Translation = {
  info: string;
  title: string;
  description: string;

  crop: string;
  state: string;
  district: string;
  market: string;

  selectCrop: string;
  selectState: string;
  selectDistrict: string;
  selectMarket: string;

  latestPrice: string;
  minPrice: string;
  maxPrice: string;
  modalPrice: string;

  priceDate: string;
  refresh: string;
  marketLocation: string;
  priceUnit: string;

  updated: string;
  noData: string;
  refreshing: string;
};

const translations: Record<LanguageCode, Translation> = {
  en: {
    info: "Market Information",
    title: "Market Prices",
    description:
      "Check today's prices in nearby markets, understand weekly trends and choose the right day to sell.",

    crop: "Crop",
    state: "State",
    district: "District",
    market: "Market",

    selectCrop: "Select crop",
    selectState: "Select state",
    selectDistrict: "Select district",
    selectMarket: "Select market",

    latestPrice: "Latest Market Price",
    minPrice: "Minimum Price",
    maxPrice: "Maximum Price",
    modalPrice: "Modal Price",

    priceDate: "Price Date",
    refresh: "Refresh Prices",
    marketLocation: "Market Location",
    priceUnit: "₹ / Quintal",

    updated: "Latest available price",
    noData: "No market price available for this selection.",
    refreshing: "Refreshing...",
  },

  hi: {
    info: "मंडी जानकारी",
    title: "मंडी भाव",
    description:
      "आस-पास की मंडियों के आज के भाव देखें, हफ़्ते का रुझान समझें और बेचने का सही दिन चुनें।",

    crop: "फसल",
    state: "राज्य",
    district: "जिला",
    market: "मंडी",

    selectCrop: "फसल चुनें",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
    selectMarket: "मंडी चुनें",

    latestPrice: "नवीनतम मंडी भाव",
    minPrice: "न्यूनतम भाव",
    maxPrice: "अधिकतम भाव",
    modalPrice: "मॉडल भाव",

    priceDate: "भाव की तारीख",
    refresh: "भाव अपडेट करें",
    marketLocation: "मंडी स्थान",
    priceUnit: "₹ / क्विंटल",

    updated: "नवीनतम उपलब्ध भाव",
    noData: "इस चयन के लिए मंडी भाव उपलब्ध नहीं है।",
    refreshing: "अपडेट हो रहा है...",
  },

  ta: {
    info: "சந்தை தகவல்",
    title: "சந்தை விலைகள்",
    description:
      "அருகிலுள்ள சந்தைகளின் இன்றைய விலைகளைப் பார்த்து, வாராந்திர போக்கை புரிந்துகொண்டு, விற்பனைக்கு சரியான நாளைத் தேர்வு செய்யுங்கள்.",

    crop: "பயிர்",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    market: "சந்தை",

    selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    selectMarket: "சந்தையைத் தேர்ந்தெடுக்கவும்",

    latestPrice: "சமீபத்திய சந்தை விலை",
    minPrice: "குறைந்தபட்ச விலை",
    maxPrice: "அதிகபட்ச விலை",
    modalPrice: "மாடல் விலை",

    priceDate: "விலை தேதி",
    refresh: "விலைகளைப் புதுப்பிக்கவும்",
    marketLocation: "சந்தை இடம்",
    priceUnit: "₹ / குவிண்டால்",

    updated: "சமீபத்திய கிடைக்கக்கூடிய விலை",
    noData: "இந்த தேர்வுக்கு சந்தை விலை கிடைக்கவில்லை.",
    refreshing: "புதுப்பிக்கப்படுகிறது...",
  },

  te: {
    info: "మార్కెట్ సమాచారం",
    title: "మార్కెట్ ధరలు",
    description:
      "సమీప మార్కెట్లలో ఈరోజు ధరలను చూడండి, వారపు ధరల మార్పును అర్థం చేసుకుని, అమ్మకానికి సరైన రోజును ఎంచుకోండి.",

    crop: "పంట",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    market: "మార్కెట్",

    selectCrop: "పంటను ఎంచుకోండి",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "జిల్లాను ఎంచుకోండి",
    selectMarket: "మార్కెట్‌ను ఎంచుకోండి",

    latestPrice: "తాజా మార్కెట్ ధర",
    minPrice: "కనిష్ట ధర",
    maxPrice: "గరిష్ట ధర",
    modalPrice: "మోడల్ ధర",

    priceDate: "ధర తేదీ",
    refresh: "ధరలను నవీకరించండి",
    marketLocation: "మార్కెట్ ప్రాంతం",
    priceUnit: "₹ / క్వింటాల్",

    updated: "తాజాగా అందుబాటులో ఉన్న ధర",
    noData: "ఈ ఎంపికకు మార్కెట్ ధర అందుబాటులో లేదు.",
    refreshing: "నవీకరిస్తోంది...",
  },

  kn: {
    info: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    title: "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
    description:
      "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ಇಂದಿನ ದರಗಳನ್ನು ನೋಡಿ, ವಾರದ ಪ್ರವೃತ್ತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು ಮಾರಾಟಕ್ಕೆ ಸರಿಯಾದ ದಿನವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

    crop: "ಬೆಳೆ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    market: "ಮಾರುಕಟ್ಟೆ",

    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    selectMarket: "ಮಾರುಕಟ್ಟೆ ಆಯ್ಕೆಮಾಡಿ",

    latestPrice: "ಇತ್ತೀಚಿನ ಮಾರುಕಟ್ಟೆ ದರ",
    minPrice: "ಕನಿಷ್ಠ ದರ",
    maxPrice: "ಗರಿಷ್ಠ ದರ",
    modalPrice: "ಮಾದರಿ ದರ",

    priceDate: "ದರದ ದಿನಾಂಕ",
    refresh: "ದರಗಳನ್ನು ನವೀಕರಿಸಿ",
    marketLocation: "ಮಾರುಕಟ್ಟೆ ಸ್ಥಳ",
    priceUnit: "₹ / ಕ್ವಿಂಟಲ್",

    updated: "ಇತ್ತೀಚಿನ ಲಭ್ಯವಿರುವ ದರ",
    noData: "ಈ ಆಯ್ಕೆಗೆ ಮಾರುಕಟ್ಟೆ ದರ ಲಭ್ಯವಿಲ್ಲ.",
    refreshing: "ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
  },

  mr: {
    info: "बाजार माहिती",
    title: "बाजारभाव",
    description:
      "जवळच्या बाजारातील आजचे भाव पाहा, आठवड्याचा कल समजून घ्या आणि विक्रीसाठी योग्य दिवस निवडा.",

    crop: "पीक",
    state: "राज्य",
    district: "जिल्हा",
    market: "बाजार",

    selectCrop: "पीक निवडा",
    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
    selectMarket: "बाजार निवडा",

    latestPrice: "नवीनतम बाजारभाव",
    minPrice: "किमान भाव",
    maxPrice: "कमाल भाव",
    modalPrice: "मॉडेल भाव",

    priceDate: "भावाची तारीख",
    refresh: "भाव अपडेट करा",
    marketLocation: "बाजाराचे ठिकाण",
    priceUnit: "₹ / क्विंटल",

    updated: "नवीनतम उपलब्ध भाव",
    noData: "या निवडीसाठी बाजारभाव उपलब्ध नाही.",
    refreshing: "अपडेट होत आहे...",
  },

  bn: {
    info: "বাজার তথ্য",
    title: "বাজারদর",
    description:
      "কাছাকাছি বাজারের আজকের দর দেখুন, সাপ্তাহিক প্রবণতা বুঝুন এবং বিক্রির সঠিক দিন বেছে নিন।",

    crop: "ফসল",
    state: "রাজ্য",
    district: "জেলা",
    market: "বাজার",

    selectCrop: "ফসল নির্বাচন করুন",
    selectState: "রাজ্য নির্বাচন করুন",
    selectDistrict: "জেলা নির্বাচন করুন",
    selectMarket: "বাজার নির্বাচন করুন",

    latestPrice: "সর্বশেষ বাজারদর",
    minPrice: "সর্বনিম্ন দর",
    maxPrice: "সর্বোচ্চ দর",
    modalPrice: "মডেল দর",

    priceDate: "দরের তারিখ",
    refresh: "দর আপডেট করুন",
    marketLocation: "বাজারের অবস্থান",
    priceUnit: "₹ / কুইন্টাল",

    updated: "সর্বশেষ উপলব্ধ দর",
    noData: "এই নির্বাচনের জন্য বাজারদর পাওয়া যায়নি।",
    refreshing: "আপডেট হচ্ছে...",
  },
};

/* =========================================================
   CROP + LOCATION TRANSLATIONS
   ========================================================= */

const names: Record<
  string,
  Partial<Record<LanguageCode, string>>
> = {
  Tomato: {
    en: "Tomato",
    hi: "टमाटर",
    ta: "தக்காளி",
    te: "టమాటా",
    kn: "ಟೊಮೇಟೊ",
    mr: "टोमॅटो",
    bn: "টমেটো",
  },

  Wheat: {
    en: "Wheat",
    hi: "गेहूँ",
    ta: "கோதுமை",
    te: "గోధుమ",
    kn: "ಗೋಧಿ",
    mr: "गहू",
    bn: "গম",
  },

  Rice: {
    en: "Rice",
    hi: "चावल",
    ta: "அரிசி",
    te: "బియ్యం",
    kn: "ಅಕ್ಕಿ",
    mr: "तांदूळ",
    bn: "চাল",
  },

  Onion: {
    en: "Onion",
    hi: "प्याज़",
    ta: "வெங்காயம்",
    te: "ఉల్లిపాయ",
    kn: "ಈರುಳ್ಳಿ",
    mr: "कांदा",
    bn: "পেঁয়াজ",
  },

  Potato: {
    en: "Potato",
    hi: "आलू",
    ta: "உருளைக்கிழங்கு",
    te: "బంగాళాదుంప",
    kn: "ಆಲೂಗಡ್ಡೆ",
    mr: "बटाटा",
    bn: "আলু",
  },

  Cotton: {
    en: "Cotton",
    hi: "कपास",
    ta: "பருத்தி",
    te: "పత్తి",
    kn: "ಹತ್ತಿ",
    mr: "कापूस",
    bn: "তুলা",
  },

  Maharashtra: {
    en: "Maharashtra",
    hi: "महाराष्ट्र",
    ta: "மகாராஷ்டிரா",
    te: "మహారాష్ట్ర",
    kn: "ಮಹಾರಾಷ್ಟ್ರ",
    mr: "महाराष्ट्र",
    bn: "মহারাষ্ট্র",
  },

  "Tamil Nadu": {
    en: "Tamil Nadu",
    hi: "तमिलनाडु",
    ta: "தமிழ்நாடு",
    te: "తమిళనాడు",
    kn: "ತಮಿಳುನಾಡು",
    mr: "तमिळनाडू",
    bn: "তামিলনাড়ু",
  },

  Telangana: {
    en: "Telangana",
    hi: "तेलंगाना",
    ta: "தெலங்கானா",
    te: "తెలంగాణ",
    kn: "ತೆಲಂಗಾಣ",
    mr: "तेलंगणा",
    bn: "তেলেঙ্গানা",
  },

  "Andhra Pradesh": {
    en: "Andhra Pradesh",
    hi: "आंध्र प्रदेश",
    ta: "ஆந்திரப் பிரதேசம்",
    te: "ఆంధ్రప్రదేశ్",
    kn: "ಆಂಧ್ರ ಪ್ರದೇಶ",
    mr: "आंध्र प्रदेश",
    bn: "অন্ধ্রপ্রদেশ",
  },

  Karnataka: {
    en: "Karnataka",
    hi: "कर्नाटक",
    ta: "கர்நாடகா",
    te: "కర్ణాటక",
    kn: "ಕರ್ನಾಟಕ",
    mr: "कर्नाटक",
    bn: "কর্ণাটক",
  },

  Punjab: {
    en: "Punjab",
    hi: "पंजाब",
    ta: "பஞ்சாப்",
    te: "పంజాబ్",
    kn: "ಪಂಜಾಬ್",
    mr: "पंजाब",
    bn: "পাঞ্জাব",
  },

  Haryana: {
    en: "Haryana",
    hi: "हरियाणा",
    ta: "ஹரியானா",
    te: "హర్యానా",
    kn: "ಹರಿಯಾಣ",
    mr: "हरियाणा",
    bn: "হরিয়ানা",
  },

  "Uttar Pradesh": {
    en: "Uttar Pradesh",
    hi: "उत्तर प्रदेश",
    ta: "உத்தரப் பிரதேசம்",
    te: "ఉత్తరప్రదేశ్",
    kn: "ಉತ್ತರ ಪ್ರದೇಶ",
    mr: "उत्तर प्रदेश",
    bn: "উত্তরপ্রদেশ",
  },

  "West Bengal": {
    en: "West Bengal",
    hi: "पश्चिम बंगाल",
    ta: "மேற்கு வங்காளம்",
    te: "పశ్చిమ బెంగాల్",
    kn: "ಪಶ್ಚಿಮ ಬಂಗಾಳ",
    mr: "पश्चिम बंगाल",
    bn: "পশ্চিমবঙ্গ",
  },

  Nashik: {
    en: "Nashik",
    hi: "नासिक",
    ta: "நாசிக்",
    te: "నాసిక్",
    kn: "ನಾಸಿಕ್",
    mr: "नाशिक",
    bn: "নাসিক",
  },

  Pune: {
    en: "Pune",
    hi: "पुणे",
    ta: "புனே",
    te: "పుణే",
    kn: "ಪುಣೆ",
    mr: "पुणे",
    bn: "পুনে",
  },

  Nagpur: {
    en: "Nagpur",
    hi: "नागपुर",
    ta: "நாக்பூர்",
    te: "నాగ్‌పూర్",
    kn: "ನಾಗಪುರ",
    mr: "नागपूर",
    bn: "নাগপুর",
  },

  Ahmednagar: {
    en: "Ahmednagar",
    hi: "अहमदनगर",
    ta: "அகமதுநகர்",
    te: "అహ్మద్‌నగర్",
    kn: "ಅಹಮದ್‌ನಗರ",
    mr: "अहमदनगर",
    bn: "আহমেদনগর",
  },

  Madurai: {
    en: "Madurai",
    hi: "मदुरै",
    ta: "மதுரை",
    te: "మదురై",
    kn: "ಮದುರೈ",
    mr: "मदुराई",
    bn: "মাদুরাই",
  },

  Coimbatore: {
    en: "Coimbatore",
    hi: "कोयंबटूर",
    ta: "கோயம்புத்தூர்",
    te: "కోయంబత్తూర్",
    kn: "ಕೊಯಮತ್ತೂರು",
    mr: "कोयंबतूर",
    bn: "কোয়েম্বাটোর",
  },

  Virudhunagar: {
    en: "Virudhunagar",
    hi: "विरुधुनगर",
    ta: "விருதுநகர்",
    te: "విరుదునగర్",
    kn: "ವಿರುದುನಗರ",
    mr: "विरुधुनगर",
    bn: "বিরুধুনগর",
  },

  Tirunelveli: {
    en: "Tirunelveli",
    hi: "तिरुनेलवेली",
    ta: "திருநெல்வேலி",
    te: "తిరునెల్వేలి",
    kn: "ತಿರುನೆಲ್ವೇಲಿ",
    mr: "तिरुनेलवेली",
    bn: "তিরুনেলভেলি",
  },

  Hyderabad: {
    en: "Hyderabad",
    hi: "हैदराबाद",
    ta: "ஹைதராபாத்",
    te: "హైదరాబాద్",
    kn: "ಹೈದರಾಬಾದ್",
    mr: "हैदराबाद",
    bn: "হায়দ্রাবাদ",
  },

  Warangal: {
    en: "Warangal",
    hi: "वारंगल",
    ta: "வாரங்கல்",
    te: "వరంగల్",
    kn: "ವಾರಂಗಲ್",
    mr: "वारंगल",
    bn: "ওয়ারাঙ্গল",
  },

  Nizamabad: {
    en: "Nizamabad",
    hi: "निज़ामाबाद",
    ta: "நிஜாமாபாத்",
    te: "నిజామాబాద్",
    kn: "ನಿಜಾಮಾಬಾದ್",
    mr: "निजामाबाद",
    bn: "নিজামাবাদ",
  },

  Guntur: {
    en: "Guntur",
    hi: "गुंटूर",
    ta: "குண்டூர்",
    te: "గుంటూరు",
    kn: "ಗುಂಟೂರು",
    mr: "गुंटूर",
    bn: "গুন্টুর",
  },

  Kurnool: {
    en: "Kurnool",
    hi: "कुरनूल",
    ta: "கர்னூல்",
    te: "కర్నూలు",
    kn: "ಕುರ್ನೂಲ್",
    mr: "कुरनूल",
    bn: "কুর্নুল",
  },

  Vijayawada: {
    en: "Vijayawada",
    hi: "विजयवाड़ा",
    ta: "விஜயவாடா",
    te: "విజయవాడ",
    kn: "ವಿಜಯವಾಡ",
    mr: "विजयवाडा",
    bn: "বিজয়ওয়াড়া",
  },

  Bengaluru: {
    en: "Bengaluru",
    hi: "बेंगलुरु",
    ta: "பெங்களூரு",
    te: "బెంగళూరు",
    kn: "ಬೆಂಗಳೂರು",
    mr: "बेंगळुरू",
    bn: "বেঙ্গালুরু",
  },

  Mysuru: {
    en: "Mysuru",
    hi: "मैसूरु",
    ta: "மைசூரு",
    te: "మైసూరు",
    kn: "ಮೈಸೂರು",
    mr: "म्हैसूर",
    bn: "মাইসুরু",
  },

  Hubballi: {
    en: "Hubballi",
    hi: "हुबली",
    ta: "ஹுப்பள்ளி",
    te: "హుబ్బళ్లి",
    kn: "ಹುಬ್ಬಳ್ಳಿ",
    mr: "हुबळी",
    bn: "হুব্বল্লি",
  },

  Thanjavur: {
    en: "Thanjavur",
    hi: "तंजावुर",
    ta: "தஞ்சாவூர்",
    te: "తంజావూరు",
    kn: "ತಂಜಾವೂರು",
    mr: "तंजावूर",
    bn: "তাঞ্জাভুর",
  },

  Ludhiana: {
    en: "Ludhiana",
    hi: "लुधियाना",
    ta: "லூதியானா",
    te: "లూధియానా",
    kn: "ಲೂಧಿಯಾನಾ",
    mr: "लुधियाना",
    bn: "লুধিয়ানা",
  },

  Amritsar: {
    en: "Amritsar",
    hi: "अमृतसर",
    ta: "அமிர்தசரஸ்",
    te: "అమృత్‌సర్",
    kn: "ಅಮೃತಸರ",
    mr: "अमृतसर",
    bn: "অমৃতসর",
  },

  Karnal: {
    en: "Karnal",
    hi: "करनाल",
    ta: "கர்னால்",
    te: "కర్నాల్",
    kn: "ಕರ್ನಾಲ್",
    mr: "करनाल",
    bn: "করনাল",
  },

  Hisar: {
    en: "Hisar",
    hi: "हिसार",
    ta: "ஹிசார்",
    te: "హిసార్",
    kn: "ಹಿಸಾರ್",
    mr: "हिसार",
    bn: "হিসার",
  },

  Agra: {
    en: "Agra",
    hi: "आगरा",
    ta: "ஆக்ரா",
    te: "ఆగ్రా",
    kn: "ಆಗ್ರಾ",
    mr: "आग्रा",
    bn: "আগ্রা",
  },

  Kanpur: {
    en: "Kanpur",
    hi: "कानपुर",
    ta: "கான்பூர்",
    te: "కాన్పూర్",
    kn: "ಕಾನ್ಪುರ",
    mr: "कानपूर",
    bn: "কানপুর",
  },

  Hooghly: {
    en: "Hooghly",
    hi: "हुगली",
    ta: "ஹூக்ளி",
    te: "హుగ్లీ",
    kn: "ಹೂಗ್ಲಿ",
    mr: "हुगळी",
    bn: "হুগলি",
  },

  Lasalgaon: {
    en: "Lasalgaon",
    hi: "लासलगांव",
    ta: "லாசல்காவ்",
    te: "లాసల్గావ్",
    kn: "ಲಾಸಲಗಾಂವ್",
    mr: "लासलगाव",
    bn: "লাসালগাঁও",
  },

  Yeola: {
    en: "Yeola",
    hi: "येवला",
    ta: "யேவ்லா",
    te: "యేవ్లా",
    kn: "ಯೆವ್ಲಾ",
    mr: "येवला",
    bn: "ইওলা",
  },

  Sinnar: {
    en: "Sinnar",
    hi: "सिन्नर",
    ta: "சின்னர்",
    te: "సిన్నర్",
    kn: "ಸಿನ್ನರ್",
    mr: "सिन्नर",
    bn: "সিন্নার",
  },

  Baramati: {
    en: "Baramati",
    hi: "बारामती",
    ta: "பாராமதி",
    te: "బారామతి",
    kn: "ಬಾರಾಮತಿ",
    mr: "बारामती",
    bn: "বারামতি",
  },

  Bowenpally: {
    en: "Bowenpally",
    hi: "बोवेनपल्ली",
    ta: "போவன்பள்ளி",
    te: "బోయినపల్లి",
    kn: "ಬೋವೆನಪಲ್ಲಿ",
    mr: "बोवेनपल्ली",
    bn: "বোভেনপল্লি",
  },

  Yeshwanthpur: {
    en: "Yeshwanthpur",
    hi: "यशवंतपुर",
    ta: "யஷ்வந்த்பூர்",
    te: "యశ్వంత్‌పూర్",
    kn: "ಯಶವಂತಪುರ",
    mr: "यशवंतपूर",
    bn: "যশবন্তপুর",
  },

  Akola: {
    en: "Akola",
    hi: "अकोला",
    ta: "அகோலா",
    te: "అకోలా",
    kn: "ಅಕೋಲಾ",
    mr: "अकोला",
    bn: "আকোলা",
  },

  Amravati: {
    en: "Amravati",
    hi: "अमरावती",
    ta: "அமராவதி",
    te: "అమరావతి",
    kn: "ಅಮರಾವತಿ",
    mr: "अमरावती",
    bn: "অমরাবতী",
  },

  Adilabad: {
    en: "Adilabad",
    hi: "आदिलाबाद",
    ta: "ஆதிலாபாத்",
    te: "ఆదిలాబాద్",
    kn: "ಆದಿಲಾಬಾದ್",
    mr: "आदिलाबाद",
    bn: "আদিলাবাদ",
  },
};

/* =========================================================
   HELPER
   ========================================================= */

function getTranslatedName(
  value: string,
  lang: LanguageCode,
): string {
  return (
    names[value]?.[lang] ??
    names[value]?.["en"] ??
    value
  );
}

/* =========================================================
   MARKET PAGE
   ========================================================= */

function MarketPage() {
  const { t, lang } = useI18n();

  const [crop, setCrop] = useState("Tomato");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("Nashik");
  const [market, setMarket] = useState("Lasalgaon");

  const [refreshing, setRefreshing] = useState(false);

  const text = translations[lang];

  /* =======================================================
     CROP LIST
     ======================================================= */

  const crops = useMemo(() => {
    return Object.keys(marketData);
  }, []);

  /* =======================================================
     STATES
     ======================================================= */

  const states = useMemo(() => {
    return Object.keys(
      marketData[crop] || {},
    );
  }, [crop]);

  /* =======================================================
     DISTRICTS
     ======================================================= */

  const districts = useMemo(() => {
    return Object.keys(
      marketData[crop]?.[state] || {},
    );
  }, [crop, state]);

  /* =======================================================
     MARKETS
     ======================================================= */

  const markets = useMemo(() => {
    return Object.keys(
      marketData[crop]?.[state]?.[district] || {},
    );
  }, [crop, state, district]);

  /* =======================================================
     CURRENT PRICE
     ======================================================= */

  const price =
    marketData[crop]?.[state]?.[district]?.[market] ??
    null;

  /* =======================================================
     CROP CHANGE
     ======================================================= */

  const changeCrop = (value: string) => {
    setCrop(value);

    const nextStates = Object.keys(
      marketData[value] || {},
    );

    const nextState = nextStates[0] || "";

    setState(nextState);

    const nextDistricts = Object.keys(
      marketData[value]?.[nextState] || {},
    );

    const nextDistrict =
      nextDistricts[0] || "";

    setDistrict(nextDistrict);

    const nextMarkets = Object.keys(
      marketData[value]?.[nextState]?.[nextDistrict] || {},
    );

    setMarket(nextMarkets[0] || "");
  };

  /* =======================================================
     STATE CHANGE
     ======================================================= */

  const changeState = (value: string) => {
    setState(value);

    const nextDistricts = Object.keys(
      marketData[crop]?.[value] || {},
    );

    const nextDistrict =
      nextDistricts[0] || "";

    setDistrict(nextDistrict);

    const nextMarkets = Object.keys(
      marketData[crop]?.[value]?.[nextDistrict] || {},
    );

    setMarket(nextMarkets[0] || "");
  };

  /* =======================================================
     DISTRICT CHANGE
     ======================================================= */

  const changeDistrict = (value: string) => {
    setDistrict(value);

    const nextMarkets = Object.keys(
      marketData[crop]?.[state]?.[value] || {},
    );

    setMarket(nextMarkets[0] || "");
  };

  /* =======================================================
     MARKET CHANGE
     ======================================================= */

  const changeMarket = (value: string) => {
    setMarket(value);
  };

  /* =======================================================
     REFRESH
     ======================================================= */

  const refreshPrices = () => {
    setRefreshing(true);

    window.setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <>
      <PageHeader
        icon={TrendingUp}
        eyebrow={
          t("page.market.eyebrow" as never) ||
          text.info
        }
        title={
          t("nav.market" as never) ||
          text.title
        }
        description={
          t("page.market.description" as never) ||
          text.description
        }
      />

      <Section>
        <div className="space-y-6">

          {/* FILTER CARD */}

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                {text.latestPrice}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* CROP */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {text.crop}
                  </label>

                  <Select
                    value={crop}
                    onValueChange={changeCrop}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={text.selectCrop}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {crops.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                        >
                          {getTranslatedName(
                            item,
                            lang,
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* STATE */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {text.state}
                  </label>

                  <Select
                    value={state}
                    onValueChange={changeState}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={text.selectState}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {states.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                        >
                          {getTranslatedName(
                            item,
                            lang,
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* DISTRICT */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {text.district}
                  </label>

                  <Select
                    value={district}
                    onValueChange={changeDistrict}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={text.selectDistrict}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {districts.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                        >
                          {getTranslatedName(
                            item,
                            lang,
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* MARKET */}

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {text.market}
                  </label>

                  <Select
                    value={market}
                    onValueChange={changeMarket}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={text.selectMarket}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {markets.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                        >
                          {getTranslatedName(
                            item,
                            lang,
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* MARKET HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                {getTranslatedName(
                  crop,
                  lang,
                )}{" "}
                —{" "}
                {getTranslatedName(
                  market,
                  lang,
                )}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">

                <MapPin className="size-4" />

                <span>
                  {getTranslatedName(
                    district,
                    lang,
                  )}
                  ,{" "}
                  {getTranslatedName(
                    state,
                    lang,
                  )}
                </span>

                {price && (
                  <Badge variant="secondary">
                    {text.updated}
                  </Badge>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={refreshPrices}
              disabled={refreshing}
            >
              <RefreshCw
                className={`mr-2 size-4 ${
                  refreshing
                    ? "animate-spin"
                    : ""
                }`}
              />

              {refreshing
                ? text.refreshing
                : text.refresh}
            </Button>
          </div>

          {/* PRICE CARDS */}

          {price ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* MINIMUM */}

                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {text.minPrice}
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                          ₹
                          {price.min.toLocaleString(
                            "en-IN",
                          )}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {text.priceUnit}
                        </p>
                      </div>

                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                        <IndianRupee className="size-5 text-primary" />
                      </div>

                    </div>
                  </CardContent>
                </Card>

                {/* MAXIMUM */}

                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {text.maxPrice}
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                          ₹
                          {price.max.toLocaleString(
                            "en-IN",
                          )}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {text.priceUnit}
                        </p>
                      </div>

                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                        <TrendingUp className="size-5 text-primary" />
                      </div>

                    </div>
                  </CardContent>
                </Card>

                {/* MODAL */}

                <Card className="border-primary/30 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {text.modalPrice}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-primary">
                          ₹
                          {price.modal.toLocaleString(
                            "en-IN",
                          )}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {text.priceUnit}
                        </p>
                      </div>

                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                        <Store className="size-5 text-primary" />
                      </div>

                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* MARKET DETAILS */}

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">
                    {text.marketLocation}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">

                    {/* MARKET */}

                    <div className="flex items-center gap-3 rounded-xl bg-muted p-4">

                      <MapPin className="size-5 shrink-0 text-primary" />

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {text.market}
                        </p>

                        <p className="font-medium">
                          {getTranslatedName(
                            market,
                            lang,
                          )}
                        </p>
                      </div>

                    </div>

                    {/* DATE */}

                    <div className="flex items-center gap-3 rounded-xl bg-muted p-4">

                      <CalendarDays className="size-5 shrink-0 text-primary" />

                      <div>
                        <p className="text-sm text-muted-foreground">
                          {text.priceDate}
                        </p>

                        <p className="font-medium">
                          {price.date}
                        </p>
                      </div>

                    </div>

                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {text.noData}
                </p>
              </CardContent>
            </Card>
          )}

          {/* INFORMATION CARD */}

          <Card className="shadow-soft">
            <CardContent className="p-5">
              <div className="flex gap-3">

                <TrendingUp className="mt-0.5 size-5 shrink-0 text-primary" />

                <div>
                  <p className="font-medium">
                    {text.latestPrice}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {text.updated}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>

        </div>
      </Section>
    </>
  );
}