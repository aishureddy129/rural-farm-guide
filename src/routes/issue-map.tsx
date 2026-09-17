import { createFileRoute } from "@tanstack/react-router";
import {
  Filter,
  Map as MapIcon,
  MapPin,
  RefreshCw,
} from "lucide-react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";

import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { Section } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/issue-map")({
  head: () => ({
    meta: [
      {
        title: "Issue Map — GramSahay AI",
      },
      {
        name: "description",
        content:
          "A live district map of reported rural issues.",
      },
      {
        property: "og:title",
        content: "Issue Map — GramSahay AI",
      },
      {
        property: "og:description",
        content:
          "See village issues geographically and track their status.",
      },
    ],
  }),
  component: IssueMapPage,
});

/* =========================================================
   TYPES
========================================================= */

type IssueStatus =
  | "open"
  | "inProgress"
  | "escalated"
  | "resolved";

type Report = {
  id: number;
  tracking_id: string;
  title: string;
  category: string | null;
  village: string | null;
  description: string | null;
  phone: string | null;
  status: string | null;
  priority: string | null;
  department: string | null;
  photo_url: string | null;
  latitude: number | string | null;
  longitude: number | string | null;
  language: string | null;
  created_at: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    eyebrow: "Transparency",
    title: "Issue Map",
    description:
      "See which problems are open and which are fixed across your district.",

    filters: "Filters",
    refresh: "Refresh",

    allCategories: "All categories",
    allStatuses: "All statuses",

    open: "Open",
    inProgress: "In progress",
    escalated: "Escalated",
    resolved: "Resolved",

    districtView: "District view",
    districtDescription:
      "Reported rural issues from GramSahay AI.",

    reports: "reports",
    reportedIssues: "Reported issues",

    trackingId: "Tracking ID",
    category: "Category",
    village: "Village",
    department: "Department",
    reportedOn: "Reported on",
    location: "Location",
    viewOnMap: "View on map",

    noReports: "No reports found.",
    noLocation: "No location available",

    loading: "Loading reports...",
    loadError: "Unable to load reports.",
    tryAgain: "Try again",

    all: "All",
  },

  te: {
    eyebrow: "పారదర్శకత",
    title: "సమస్యల మ్యాప్",
    description:
      "మీ జిల్లాలో ఏ సమస్యలు తెరిచి ఉన్నాయో, ఏవి పరిష్కరించబడ్డాయో చూడండి.",

    filters: "ఫిల్టర్లు",
    refresh: "రిఫ్రెష్",

    allCategories: "అన్ని వర్గాలు",
    allStatuses: "అన్ని స్థితులు",

    open: "తెరిచి ఉంది",
    inProgress: "పురోగతిలో ఉంది",
    escalated: "అధికారులకు పంపబడింది",
    resolved: "పరిష్కరించబడింది",

    districtView: "జిల్లా వీక్షణ",
    districtDescription:
      "GramSahay AI ద్వారా నివేదించబడిన గ్రామీణ సమస్యలు.",

    reports: "నివేదికలు",
    reportedIssues: "నివేదించబడిన సమస్యలు",

    trackingId: "ట్రాకింగ్ ID",
    category: "వర్గం",
    village: "గ్రామం",
    department: "శాఖ",
    reportedOn: "నివేదించిన తేదీ",
    location: "స్థానం",
    viewOnMap: "మ్యాప్‌లో చూడండి",

    noReports: "నివేదికలు కనుగొనబడలేదు.",
    noLocation: "స్థానం అందుబాటులో లేదు",

    loading: "నివేదికలు లోడ్ అవుతున్నాయి...",
    loadError: "నివేదికలను లోడ్ చేయలేకపోయాము.",
    tryAgain: "మళ్లీ ప్రయత్నించండి",

    all: "అన్నీ",
  },

  hi: {
    eyebrow: "पारदर्शिता",
    title: "समस्या मानचित्र",
    description:
      "अपने जिले में देखें कि कौन सी समस्याएं खुली हैं और कौन सी हल हो गई हैं।",

    filters: "फ़िल्टर",
    refresh: "रिफ्रेश",

    allCategories: "सभी श्रेणियां",
    allStatuses: "सभी स्थितियां",

    open: "खुली",
    inProgress: "प्रगति में",
    escalated: "अधिकारियों को भेजी गई",
    resolved: "हल हो गई",

    districtView: "जिला दृश्य",
    districtDescription:
      "GramSahay AI द्वारा दर्ज ग्रामीण समस्याएं।",

    reports: "रिपोर्ट",
    reportedIssues: "दर्ज समस्याएं",

    trackingId: "ट्रैकिंग ID",
    category: "श्रेणी",
    village: "गांव",
    department: "विभाग",
    reportedOn: "रिपोर्ट की तारीख",
    location: "स्थान",
    viewOnMap: "मानचित्र पर देखें",

    noReports: "कोई रिपोर्ट नहीं मिली।",
    noLocation: "स्थान उपलब्ध नहीं है",

    loading: "रिपोर्ट लोड हो रही हैं...",
    loadError: "रिपोर्ट लोड नहीं हो सकीं।",
    tryAgain: "फिर कोशिश करें",

    all: "सभी",
  },

  mr: {
    eyebrow: "पारदर्शकता",
    title: "समस्या नकाशा",
    description:
      "तुमच्या जिल्ह्यात कोणत्या समस्या खुल्या आहेत आणि कोणत्या सोडवण्यात आल्या आहेत ते पहा.",

    viewOnMap: "नकाशावर पहा",

    filters: "फिल्टर",
    refresh: "रिफ्रेश",

    allCategories: "सर्व श्रेणी",
    allStatuses: "सर्व स्थिती",

    open: "उघडी",
    inProgress: "प्रगतीपथावर",
    escalated: "अधिकाऱ्यांकडे पाठवले",
    resolved: "निराकरण झाले",

    districtView: "जिल्हा दृश्य",
    districtDescription:
      "GramSahay AI द्वारे नोंदवलेल्या ग्रामीण समस्या.",

    reports: "अहवाल",
    reportedIssues: "नोंदवलेल्या समस्या",

    trackingId: "ट्रॅकिंग ID",
    category: "श्रेणी",
    village: "गाव",
    department: "विभाग",
    reportedOn: "नोंद तारीख",
    location: "स्थान",

    noReports: "कोणतेही अहवाल सापडले नाहीत.",
    noLocation: "स्थान उपलब्ध नाही",

    loading: "अहवाल लोड होत आहेत...",
    loadError: "अहवाल लोड करता आले नाहीत.",
    tryAgain: "पुन्हा प्रयत्न करा",

    all: "सर्व",
  },

  ta: {
    eyebrow: "வெளிப்படைத்தன்மை",
    title: "சிக்கல் வரைபடம்",
    description:
      "உங்கள் மாவட்டத்தில் எந்த பிரச்சினைகள் திறந்த நிலையில் உள்ளன மற்றும் எவை தீர்க்கப்பட்டுள்ளன என்பதைப் பாருங்கள்.",

    filters: "வடிகட்டிகள்",
    refresh: "புதுப்பிக்கவும்",

    allCategories: "அனைத்து வகைகளும்",
    allStatuses: "அனைத்து நிலைகளும்",

    open: "திறந்துள்ளது",
    inProgress: "முன்னேற்றத்தில்",
    escalated: "அதிகாரிகளுக்கு அனுப்பப்பட்டது",
    resolved: "தீர்க்கப்பட்டது",

    districtView: "மாவட்ட பார்வை",
    districtDescription:
      "GramSahay AI மூலம் பதிவு செய்யப்பட்ட கிராமப்புற பிரச்சினைகள்.",

    reports: "அறிக்கைகள்",
    reportedIssues: "பதிவு செய்யப்பட்ட பிரச்சினைகள்",

    trackingId: "டிராக்கிங் ID",
    category: "வகை",
    village: "கிராமம்",
    department: "துறை",
    reportedOn: "பதிவு தேதி",
    location: "இடம்",
    viewOnMap: "வரைபடத்தில் பார்க்கவும்",

    noReports: "அறிக்கைகள் எதுவும் கிடைக்கவில்லை.",
    noLocation: "இடம் கிடைக்கவில்லை",

    loading: "அறிக்கைகள் ஏற்றப்படுகின்றன...",
    loadError: "அறிக்கைகளை ஏற்ற முடியவில்லை.",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",

    all: "அனைத்தும்",
  },

  kn: {
    eyebrow: "ಪಾರದರ್ಶಕತೆ",
    title: "ಸಮಸ್ಯೆಗಳ ನಕ್ಷೆ",
    description:
      "ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಯಾವ ಸಮಸ್ಯೆಗಳು ತೆರೆದಿವೆ ಮತ್ತು ಯಾವವು ಪರಿಹಾರಗೊಂಡಿವೆ ಎಂಬುದನ್ನು ನೋಡಿ.",

    filters: "ಫಿಲ್ಟರ್‌ಗಳು",
    refresh: "ರಿಫ್ರೆಶ್",

    allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    allStatuses: "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು",

    open: "ತೆರೆದಿದೆ",
    inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    escalated: "ಅಧಿಕಾರಿಗಳಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ",
    resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",

    districtView: "ಜಿಲ್ಲಾ ವೀಕ್ಷಣೆ",
    districtDescription:
      "GramSahay AI ಮೂಲಕ ವರದಿಯಾದ ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಗಳು.",

    reports: "ವರದಿಗಳು",
    reportedIssues: "ವರದಿಯಾದ ಸಮಸ್ಯೆಗಳು",

    trackingId: "ಟ್ರ್ಯಾಕಿಂಗ್ ID",
    category: "ವರ್ಗ",
    village: "ಗ್ರಾಮ",
    department: "ಇಲಾಖೆ",
    reportedOn: "ವರದಿ ದಿನಾಂಕ",
    location: "ಸ್ಥಳ",
    viewOnMap: "ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ",

    noReports: "ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    noLocation: "ಸ್ಥಳ ಲಭ್ಯವಿಲ್ಲ",

    loading: "ವರದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    loadError: "ವರದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",

    all: "ಎಲ್ಲಾ",
  },

  bn: {
    eyebrow: "স্বচ্ছতা",
    title: "সমস্যার মানচিত্র",
    description:
      "আপনার জেলায় কোন সমস্যাগুলি খোলা এবং কোনগুলি সমাধান হয়েছে তা দেখুন।",

    filters: "ফিল্টার",
    refresh: "রিফ্রেশ",

    allCategories: "সব বিভাগ",
    allStatuses: "সব অবস্থা",

    open: "খোলা",
    inProgress: "চলমান",
    escalated: "কর্তৃপক্ষের কাছে পাঠানো হয়েছে",
    resolved: "সমাধান হয়েছে",

    districtView: "জেলা দৃশ্য",
    districtDescription:
      "GramSahay AI দ্বারা রিপোর্ট করা গ্রামীণ সমস্যাগুলি।",

    reports: "রিপোর্ট",
    reportedIssues: "রিপোর্ট করা সমস্যা",

    trackingId: "ট্র্যাকিং ID",
    category: "বিভাগ",
    village: "গ্রাম",
    department: "দপ্তর",
    reportedOn: "রিপোর্টের তারিখ",
    location: "অবস্থান",
    viewOnMap: "মানচিত্রে দেখুন",

    noReports: "কোনও রিপোর্ট পাওয়া যায়নি।",
    noLocation: "অবস্থান পাওয়া যায়নি",

    loading: "রিপোর্ট লোড হচ্ছে...",
    loadError: "রিপোর্ট লোড করা যায়নি।",
    tryAgain: "আবার চেষ্টা করুন",

    all: "সব",
  },
} as const;

/* =========================================================
   CATEGORY TRANSLATIONS
========================================================= */

const categoryTranslations = {
  en: {
    "Road & bridge": "Road & bridge",
    "Drinking water": "Drinking water",
    Electricity: "Electricity",
    "Health & sanitation": "Health & sanitation",
    "School & anganwadi": "School & anganwadi",
    "Irrigation canal": "Irrigation canal",
    "Ration & PDS": "Ration & PDS",
    Other: "Other",
  },

  te: {
    "Road & bridge": "రోడ్డు & వంతెన",
    "Drinking water": "తాగునీరు",
    Electricity: "విద్యుత్",
    "Health & sanitation": "ఆరోగ్యం & పారిశుధ్యం",
    "School & anganwadi": "పాఠశాల & అంగన్‌వాడీ",
    "Irrigation canal": "సాగునీటి కాలువ",
    "Ration & PDS": "రేషన్ & PDS",
    Other: "ఇతర",
  },

  hi: {
    "Road & bridge": "सड़क और पुल",
    "Drinking water": "पेयजल",
    Electricity: "बिजली",
    "Health & sanitation": "स्वास्थ्य और स्वच्छता",
    "School & anganwadi": "स्कूल और आंगनवाड़ी",
    "Irrigation canal": "सिंचाई नहर",
    "Ration & PDS": "राशन और PDS",
    Other: "अन्य",
  },

  mr: {
    "Road & bridge": "रस्ता आणि पूल",
    "Drinking water": "पिण्याचे पाणी",
    Electricity: "वीज",
    "Health & sanitation": "आरोग्य आणि स्वच्छता",
    "School & anganwadi": "शाळा आणि अंगणवाडी",
    "Irrigation canal": "सिंचन कालवा",
    "Ration & PDS": "रेशन आणि PDS",
    Other: "इतर",
  },

  ta: {
    "Road & bridge": "சாலை மற்றும் பாலம்",
    "Drinking water": "குடிநீர்",
    Electricity: "மின்சாரம்",
    "Health & sanitation": "சுகாதாரம் மற்றும் தூய்மை",
    "School & anganwadi": "பள்ளி மற்றும் அங்கன்வாடி",
    "Irrigation canal": "பாசன கால்வாய்",
    "Ration & PDS": "ரேஷன் மற்றும் PDS",
    Other: "மற்றவை",
  },

  kn: {
    "Road & bridge": "ರಸ್ತೆ ಮತ್ತು ಸೇತುವೆ",
    "Drinking water": "ಕುಡಿಯುವ ನೀರು",
    Electricity: "ವಿದ್ಯುತ್",
    "Health & sanitation": "ಆರೋಗ್ಯ ಮತ್ತು ನೈರ್ಮಲ್ಯ",
    "School & anganwadi": "ಶಾಲೆ ಮತ್ತು ಅಂಗನವಾಡಿ",
    "Irrigation canal": "ನೀರಾವರಿ ಕಾಲುವೆ",
    "Ration & PDS": "ಪಡಿತರ ಮತ್ತು PDS",
    Other: "ಇತರೆ",
  },

  bn: {
    "Road & bridge": "রাস্তা ও সেতু",
    "Drinking water": "পানীয় জল",
    Electricity: "বিদ্যুৎ",
    "Health & sanitation": "স্বাস্থ্য ও স্যানিটেশন",
    "School & anganwadi": "স্কুল ও অঙ্গনওয়াড়ি",
    "Irrigation canal": "সেচ খাল",
    "Ration & PDS": "রেশন ও PDS",
    Other: "অন্যান্য",
  },
} as const;

/* =========================================================
   LEAFLET MARKER
========================================================= */

const markerColors: Record<IssueStatus, string> = {
  open: "#eab308",
  inProgress: "#0ea5e9",
  escalated: "#ef4444",
  resolved: "#22c55e",
};

function createIssueIcon(status: IssueStatus) {
  return L.divIcon({
    className: "gramsahay-map-marker",
    html: `
      <div
        style="
          width:34px;
          height:34px;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          background:${markerColors[status]};
          border:3px solid white;
          box-shadow:0 3px 10px rgba(0,0,0,.3);
          display:flex;
          align-items:center;
          justify-content:center;
        "
      >
        <div
          style="
            width:10px;
            height:10px;
            border-radius:50%;
            background:white;
          "
        ></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
}

/* =========================================================
   HELPERS
========================================================= */

function normalizeStatus(value: string | null): IssueStatus {
  const status = (value ?? "").trim().toLowerCase();

  if (
    status === "resolved" ||
    status === "closed" ||
    status === "fixed"
  ) {
    return "resolved";
  }

  if (
    status === "in progress" ||
    status === "in-progress" ||
    status === "inprogress" ||
    status === "progress"
  ) {
    return "inProgress";
  }

  if (
    status === "escalated" ||
    status === "escalate"
  ) {
    return "escalated";
  }

  return "open";
}

function getLatitude(report: Report): number | null {
  const value = Number(report.latitude);

  if (!Number.isFinite(value)) {
    return null;
  }

  if (value < -90 || value > 90) {
    return null;
  }

  return value;
}

function getLongitude(report: Report): number | null {
  const value = Number(report.longitude);

  if (!Number.isFinite(value)) {
    return null;
  }

  if (value < -180 || value > 180) {
    return null;
  }

  return value;
}

function formatDate(value: string, language: string) {
  try {
    return new Intl.DateTimeFormat(
      language === "te"
        ? "te-IN"
        : language === "hi"
          ? "hi-IN"
          : language === "mr"
            ? "mr-IN"
            : language === "ta"
              ? "ta-IN"
              : language === "kn"
                ? "kn-IN"
                : language === "bn"
                  ? "bn-IN"
                  : "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ).format(new Date(value));
  } catch {
    return value;
  }
}

/* =========================================================
   STATUS BADGE
========================================================= */

const statusBadgeClass: Record<IssueStatus, string> = {
  open:
    "bg-warning text-warning-foreground hover:bg-warning",

  inProgress:
    "bg-sky text-sky-foreground hover:bg-sky",

  escalated:
    "bg-destructive text-destructive-foreground hover:bg-destructive",

  resolved:
    "bg-success text-success-foreground hover:bg-success",
};

/* =========================================================
   MAP CONTROLLER
========================================================= */

function MapController({
  selectedReportId,
  mapReports,
}: {
  selectedReportId: number | null;
  mapReports: Array<{
    report: Report;
    latitude: number;
    longitude: number;
    status: IssueStatus;
  }>;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedReportId === null) return;

    const selected = mapReports.find(
      (item) => item.report.id === selectedReportId,
    );

    if (!selected) return;

    map.flyTo(
      [selected.latitude, selected.longitude],
      Math.max(map.getZoom(), 14),
      { duration: 0.8 },
    );
  }, [map, mapReports, selectedReportId]);

  return null;
}

/* =========================================================
   PAGE
========================================================= */

function IssueMapPage() {
  const { lang } = useI18n();

  const text =
    translations[lang as keyof typeof translations] ??
    translations.en;

  const categories =
    categoryTranslations[
      lang as keyof typeof categoryTranslations
    ] ?? categoryTranslations.en;

  const [reports, setReports] = useState<Report[]>([]);
  const [categoryFilter, setCategoryFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [selectedReportId, setSelectedReportId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =======================================================
     LOAD REPORTS
  ======================================================= */

  const loadReports = async () => {
    setLoading(true);
    setError(false);

    const { data, error: supabaseError } =
      await supabase
        .from("reports")
        .select(
          `
          id,
          tracking_id,
          title,
          category,
          village,
          description,
          phone,
          status,
          priority,
          department,
          photo_url,
          latitude,
          longitude,
          language,
          created_at
        `,
        )
        .order("id", {
          ascending: false,
        });

    if (supabaseError) {
      console.error(
        "ISSUE MAP LOAD ERROR:",
        supabaseError,
      );

      setError(true);
      setReports([]);
      setLoading(false);
      return;
    }

    setReports((data ?? []) as Report[]);
    setLoading(false);
  };

  useEffect(() => {
    void loadReports();
  }, []);

  /* =======================================================
     CATEGORY OPTIONS
  ======================================================= */

  const categoryOptions = useMemo(() => {
    const values = reports
      .map((report) => report.category?.trim())
      .filter(
        (category): category is string =>
          Boolean(category),
      );

    return Array.from(new Set(values));
  }, [reports]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const counts = useMemo(() => {
    return {
      open: reports.filter(
        (report) =>
          normalizeStatus(report.status) === "open",
      ).length,

      inProgress: reports.filter(
        (report) =>
          normalizeStatus(report.status) ===
          "inProgress",
      ).length,

      escalated: reports.filter(
        (report) =>
          normalizeStatus(report.status) ===
          "escalated",
      ).length,

      resolved: reports.filter(
        (report) =>
          normalizeStatus(report.status) ===
          "resolved",
      ).length,
    };
  }, [reports]);

  /* =======================================================
     FILTERED REPORTS
  ======================================================= */

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const categoryMatches =
        categoryFilter === "all" ||
        (report.category ?? "").trim() ===
          categoryFilter;

      const statusMatches =
        statusFilter === "all" ||
        normalizeStatus(report.status) ===
          statusFilter;

      return categoryMatches && statusMatches;
    });
  }, [
    reports,
    categoryFilter,
    statusFilter,
  ]);

  useEffect(() => {
    if (
      selectedReportId !== null &&
      !filteredReports.some((report) => report.id === selectedReportId)
    ) {
      setSelectedReportId(null);
    }
  }, [filteredReports, selectedReportId]);

  /* =======================================================
     MAP REPORTS
  ======================================================= */

  const mapReports = useMemo(() => {
    return filteredReports
      .map((report) => {
        const latitude = getLatitude(report);
        const longitude = getLongitude(report);

        if (
          latitude === null ||
          longitude === null
        ) {
          return null;
        }

        return {
          report,
          latitude,
          longitude,
          status: normalizeStatus(report.status),
        };
      })
      .filter(
        (
          item,
        ): item is {
          report: Report;
          latitude: number;
          longitude: number;
          status: IssueStatus;
        } => item !== null,
      );
  }, [filteredReports]);

  /* =======================================================
     MAP CENTER
  ======================================================= */

  const mapCenter = useMemo<[number, number]>(() => {
    if (mapReports.length === 0) {
      return [12.9716, 77.5946];
    }

    const latitude =
      mapReports.reduce(
        (sum, item) =>
          sum + item.latitude,
        0,
      ) / mapReports.length;

    const longitude =
      mapReports.reduce(
        (sum, item) =>
          sum + item.longitude,
        0,
      ) / mapReports.length;

    return [latitude, longitude];
  }, [mapReports]);

  /* =======================================================
     CATEGORY LABEL
  ======================================================= */

  const getCategoryLabel = (
    category: string | null,
  ) => {
    if (!category) {
      return "—";
    }

    const categoryRecord =
      categories as Record<string, string>;

    return (
      categoryRecord[category.trim()] ??
      category
    );
  };

  /* =======================================================
     STATUS LABEL
  ======================================================= */

  const getStatusLabel = (
    status: IssueStatus,
  ) => {
    if (status === "open") {
      return text.open;
    }

    if (status === "inProgress") {
      return text.inProgress;
    }

    if (status === "escalated") {
      return text.escalated;
    }

    return text.resolved;
  };

  return (
    <>
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="border-b border-border bg-background">
        <Section>
          <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapIcon className="size-4" />
                <span>{text.eyebrow}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {text.title}
              </h1>

              <p className="mt-2 max-w-2xl text-muted-foreground">
                {text.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  void loadReports();
                }}
                disabled={loading}
              >
                <RefreshCw
                  className={`size-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                {text.refresh}
              </Button>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        {/* =================================================
            FILTERS
        ================================================= */}

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2 font-medium">
                <Filter className="size-4" />
                {text.filters}
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(
                      event.target.value,
                    )
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">
                    {text.allCategories}
                  </option>

                  {categoryOptions.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {getCategoryLabel(
                          category,
                        )}
                      </option>
                    ),
                  )}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value,
                    )
                  }
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">
                    {text.allStatuses}
                  </option>

                  <option value="open">
                    {text.open}
                  </option>

                  <option value="inProgress">
                    {text.inProgress}
                  </option>

                  <option value="escalated">
                    {text.escalated}
                  </option>

                  <option value="resolved">
                    {text.resolved}
                  </option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">
                {counts.open}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {text.open}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">
                {counts.inProgress}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {text.inProgress}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">
                {counts.escalated}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {text.escalated}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-5">
              <p className="text-3xl font-bold">
                {counts.resolved}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {text.resolved}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* =================================================
            MAP
        ================================================= */}

        <div className="mt-6">
          <Card className="overflow-hidden shadow-soft">
            <CardHeader>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">
                    {text.districtView}
                  </CardTitle>

                  <CardDescription>
                    {text.districtDescription}
                  </CardDescription>
                </div>

                <Badge variant="secondary">
                  {mapReports.length} {text.reports}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {loading ? (
                <div className="flex h-[500px] items-center justify-center text-muted-foreground">
                  {text.loading}
                </div>
              ) : error ? (
                <div className="flex h-[500px] flex-col items-center justify-center gap-3 text-center">
                  <MapPin className="size-10 text-muted-foreground" />

                  <p className="text-sm text-muted-foreground">
                    {text.loadError}
                  </p>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      void loadReports();
                    }}
                  >
                    {text.tryAgain}
                  </Button>
                </div>
              ) : (
                <div className="h-[500px] w-full">
                  <MapContainer
                    center={mapCenter}
                    zoom={
                      mapReports.length > 0
                        ? 12
                        : 6
                    }
                    scrollWheelZoom
                    className="h-full w-full"
                  >
                    <MapController
                      selectedReportId={selectedReportId}
                      mapReports={mapReports}
                    />

                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {mapReports.map(
                      ({
                        report,
                        latitude,
                        longitude,
                        status,
                      }) => (
                        <Marker
                          key={report.id}
                          position={[
                            latitude,
                            longitude,
                          ]}
                          icon={createIssueIcon(
                            status,
                          )}
                        >
                          <Popup>
                            <div className="min-w-[240px] space-y-3">
                              <div>
                                <p className="font-semibold">
                                  {report.title}
                                </p>

                                <div className="mt-2">
                                  <Badge
                                    className={
                                      statusBadgeClass[
                                        status
                                      ]
                                    }
                                  >
                                    {getStatusLabel(
                                      status,
                                    )}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-1 text-sm">
                                <p>
                                  <strong>
                                    {text.trackingId}:
                                  </strong>{" "}
                                  {
                                    report.tracking_id
                                  }
                                </p>

                                <p>
                                  <strong>
                                    {text.category}:
                                  </strong>{" "}
                                  {getCategoryLabel(
                                    report.category,
                                  )}
                                </p>

                                <p>
                                  <strong>
                                    {text.village}:
                                  </strong>{" "}
                                  {report.village ??
                                    "—"}
                                </p>
                              </div>

                              {report.description && (
                                <p className="text-sm text-muted-foreground">
                                  {
                                    report.description
                                  }
                                </p>
                              )}

                              <p className="text-xs text-muted-foreground">
                                {text.reportedOn}:{" "}
                                {formatDate(
                                  report.created_at,
                                  lang,
                                )}
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ),
                    )}
                  </MapContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* =================================================
            REPORT LIST
        ================================================= */}

        <Card className="mt-6 shadow-soft">
          <CardHeader>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">
                  {text.reportedIssues}
                </CardTitle>

                <CardDescription>
                  {filteredReports.length}{" "}
                  {text.reports}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {filteredReports.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <MapPin className="mx-auto size-8 text-muted-foreground" />

                <p className="mt-3 text-sm text-muted-foreground">
                  {text.noReports}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReports.map(
                  (report) => {
                    const status =
                      normalizeStatus(
                        report.status,
                      );

                    const hasLocation =
                      getLatitude(report) !==
                        null &&
                      getLongitude(report) !==
                        null;

                    return (
                      <div
                        key={report.id}
                        className="rounded-xl border border-border p-4 transition hover:bg-muted/30"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold">
                                {report.title}
                              </h3>

                              <Badge
                                className={
                                  statusBadgeClass[
                                    status
                                  ]
                                }
                              >
                                {getStatusLabel(
                                  status,
                                )}
                              </Badge>
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground">
                              {
                                report.tracking_id
                              }
                            </p>

                            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                              <div>
                                <span className="text-muted-foreground">
                                  {text.category}
                                </span>

                                <p className="font-medium">
                                  {getCategoryLabel(
                                    report.category,
                                  )}
                                </p>
                              </div>

                              <div>
                                <span className="text-muted-foreground">
                                  {text.village}
                                </span>

                                <p className="font-medium">
                                  {report.village ??
                                    "—"}
                                </p>
                              </div>

                              <div>
                                <span className="text-muted-foreground">
                                  {text.department}
                                </span>

                                <p className="font-medium">
                                  {report.department ??
                                    "—"}
                                </p>
                              </div>

                              <div>
                                <span className="text-muted-foreground">
                                  {text.reportedOn}
                                </span>

                                <p className="font-medium">
                                  {formatDate(
                                    report.created_at,
                                    lang,
                                  )}
                                </p>
                              </div>
                            </div>

                            {report.description && (
                              <p className="mt-4 text-sm text-muted-foreground">
                                {
                                  report.description
                                }
                              </p>
                            )}
                          </div>

                          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
                            {hasLocation ? (
                              <>
                                <Badge variant="secondary">
                                  <MapPin className="mr-1 size-3" />
                                  {text.location}
                                </Badge>

                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    setSelectedReportId(report.id)
                                  }
                                >
                                  <MapPin className="mr-1 size-4" />
                                  {text.viewOnMap}
                                </Button>
                              </>
                            ) : (
                              <Badge variant="outline">
                                {text.noLocation}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </>
  );
}