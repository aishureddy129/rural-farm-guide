import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Circle,
  RefreshCw,
  MapPin,
  Image as ImageIcon,
  LayoutDashboard,
} from "lucide-react";

import { useI18n } from "@/lib/i18n";
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

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* =========================================================
   TYPES
========================================================= */

type Status = "Open" | "In Progress" | "Resolved";

type LanguageCode =
  | "en"
  | "te"
  | "hi"
  | "mr"
  | "ta"
  | "kn"
  | "bn";

type Report = {
  id: number;
  tracking_id: string | null;
  title: string;
  category: string | null;
  village: string | null;
  description: string | null;
  phone: string | null;
  status: string | null;
  priority: string | null;
  department: string | null;
  photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string | null;
  language: string | null;
};

/* =========================================================
   STATUS NORMALIZER
========================================================= */

function normalizeStatus(
  value: string | null | undefined,
): Status {
  const normalized = (value ?? "").trim().toLowerCase();

  if (normalized === "resolved") {
    return "Resolved";
  }

  if (
    normalized === "in progress" ||
    normalized === "in_progress" ||
    normalized === "in-progress"
  ) {
    return "In Progress";
  }

  return "Open";
}

/* =========================================================
   ADMIN TRANSLATIONS
========================================================= */

const adminText: Record<
  LanguageCode,
  {
    eyebrow: string;
    title: string;
    description: string;
    refresh: string;

    totalReports: string;
    open: string;
    inProgress: string;
    resolved: string;

    allReports: string;
    all: string;

    searchPlaceholder: string;

    trackingId: string;
    category: string;
    village: string;
    department: string;

    notAssigned: string;

    viewPhoto: string;
    viewLocation: string;
    location: string;

    openButton: string;
    progressButton: string;
    resolveButton: string;

    updating: string;

    resolvedSuccess: string;
    updateSuccess: string;
    updateFailed: string;
    smsFailed: string;
    loadFailed: string;

    noReports: string;
    noMatchingReports: string;

    medium: string;
    high: string;
    low: string;

    reportDetails: string;
  }
> = {
  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    eyebrow: "Officials",
    title: "Rural Issue Dashboard",
    description:
      "Monitor village issues, departments and resolution status.",
    refresh: "Refresh",

    totalReports: "Total Reports",
    open: "Open",
    inProgress: "In Progress",
    resolved: "Resolved",

    allReports: "All Reports",
    all: "All",

    searchPlaceholder:
      "Search by title, village or tracking ID...",

    trackingId: "Tracking ID",
    category: "Category",
    village: "Village",
    department: "Department",

    notAssigned: "Not assigned",

    viewPhoto: "View Photo",
    viewLocation: "View Location",
    location: "Location",

    openButton: "Open",
    progressButton: "In Progress",
    resolveButton: "Resolve",

    updating: "Updating...",

    resolvedSuccess:
      "Report resolved successfully. Resolved SMS sent to the citizen.",

    updateSuccess:
      "Report status updated successfully.",

    updateFailed:
      "Failed to update report status.",

    smsFailed:
      "Report was updated, but the resolved SMS could not be sent.",

    loadFailed:
      "Failed to load reports.",

    noReports:
      "No reports found.",

    noMatchingReports:
      "No reports match your search or selected filter.",

    medium: "Medium",
    high: "High",
    low: "Low",

    reportDetails: "Report Details",
  },

  /* =======================================================
     TELUGU
  ======================================================= */

  te: {
    eyebrow: "అధికారులు",

    title: "గ్రామ సమస్యల డాష్‌బోర్డ్",

    description:
      "గ్రామ సమస్యలు, సంబంధిత శాఖలు మరియు పరిష్కార స్థితిని పర్యవేక్షించండి.",

    refresh: "రిఫ్రెష్",

    totalReports: "మొత్తం నివేదికలు",

    open: "తెరిచి ఉంది",

    inProgress: "పరిష్కరిస్తున్నారు",

    resolved: "పరిష్కరించబడింది",

    allReports: "అన్ని నివేదికలు",

    all: "అన్ని",

    searchPlaceholder:
      "శీర్షిక, గ్రామం లేదా ట్రాకింగ్ ID ద్వారా వెతకండి...",

    trackingId: "ట్రాకింగ్ ID",

    category: "వర్గం",

    village: "గ్రామం",

    department: "శాఖ",

    notAssigned: "కేటాయించలేదు",

    viewPhoto: "ఫోటో చూడండి",

    viewLocation: "ప్రదేశం చూడండి",

    location: "ప్రదేశం",

    openButton: "తెరవండి",

    progressButton: "పరిష్కరిస్తున్నారు",

    resolveButton: "పరిష్కరించండి",

    updating: "నవీకరిస్తోంది...",

    resolvedSuccess:
      "నివేదిక విజయవంతంగా పరిష్కరించబడింది. పౌరుడికి పరిష్కార SMS పంపబడింది.",

    updateSuccess:
      "నివేదిక స్థితి విజయవంతంగా నవీకరించబడింది.",

    updateFailed:
      "నివేదిక స్థితిని నవీకరించలేకపోయాము.",

    smsFailed:
      "నివేదిక నవీకరించబడింది, కానీ పరిష్కార SMS పంపలేకపోయాము.",

    loadFailed:
      "నివేదికలను లోడ్ చేయలేకపోయాము.",

    noReports:
      "నివేదికలు ఏవీ లేవు.",

    noMatchingReports:
      "మీ శోధన లేదా ఎంపిక చేసిన ఫిల్టర్‌కు సరిపోయే నివేదికలు లేవు.",

    medium: "మధ్యస్థం",

    high: "అధికం",

    low: "తక్కువ",

    reportDetails: "నివేదిక వివరాలు",
  },

  /* =======================================================
     HINDI
  ======================================================= */

  hi: {
    eyebrow: "अधिकारी",

    title: "ग्रामीण समस्या डैशबोर्ड",

    description:
      "गांव की समस्याओं, विभागों और समाधान की स्थिति की निगरानी करें।",

    refresh: "रिफ्रेश",

    totalReports: "कुल रिपोर्ट",

    open: "खुली",

    inProgress: "प्रगति में",

    resolved: "हल की गई",

    allReports: "सभी रिपोर्ट",

    all: "सभी",

    searchPlaceholder:
      "शीर्षक, गांव या ट्रैकिंग ID से खोजें...",

    trackingId: "ट्रैकिंग ID",

    category: "श्रेणी",

    village: "गांव",

    department: "विभाग",

    notAssigned: "आवंटित नहीं",

    viewPhoto: "फोटो देखें",

    viewLocation: "स्थान देखें",

    location: "स्थान",

    openButton: "खोलें",

    progressButton: "प्रगति में",

    resolveButton: "हल करें",

    updating: "अपडेट हो रहा है...",

    resolvedSuccess:
      "रिपोर्ट सफलतापूर्वक हल हो गई। नागरिक को समाधान SMS भेज दिया गया।",

    updateSuccess:
      "रिपोर्ट की स्थिति सफलतापूर्वक अपडेट हुई।",

    updateFailed:
      "रिपोर्ट की स्थिति अपडेट नहीं हो सकी।",

    smsFailed:
      "रिपोर्ट अपडेट हो गई, लेकिन समाधान SMS नहीं भेजा जा सका।",

    loadFailed:
      "रिपोर्ट लोड नहीं हो सकीं।",

    noReports:
      "कोई रिपोर्ट नहीं मिली।",

    noMatchingReports:
      "आपकी खोज या चुने गए फ़िल्टर से कोई रिपोर्ट मेल नहीं खाती।",

    medium: "मध्यम",

    high: "उच्च",

    low: "कम",

    reportDetails: "रिपोर्ट विवरण",
  },

  /* =======================================================
     MARATHI
  ======================================================= */

  mr: {
    eyebrow: "अधिकारी",

    title: "ग्रामीण समस्या डॅशबोर्ड",

    description:
      "गावातील समस्या, विभाग आणि निराकरणाची स्थिती पाहा.",

    refresh: "रिफ्रेश",

    totalReports: "एकूण अहवाल",

    open: "उघडे",

    inProgress: "प्रगतीपथावर",

    resolved: "निराकरण झाले",

    allReports: "सर्व अहवाल",

    all: "सर्व",

    searchPlaceholder:
      "शीर्षक, गाव किंवा ट्रॅकिंग ID ने शोधा...",

    trackingId: "ट्रॅकिंग ID",

    category: "वर्ग",

    village: "गाव",

    department: "विभाग",

    notAssigned: "नियुक्त केलेले नाही",

    viewPhoto: "फोटो पहा",

    viewLocation: "स्थान पहा",

    location: "स्थान",

    openButton: "उघडा",

    progressButton: "प्रगतीपथावर",

    resolveButton: "निराकरण करा",

    updating: "अपडेट होत आहे...",

    resolvedSuccess:
      "अहवाल यशस्वीरित्या सोडवला. नागरिकाला निराकरणाचा SMS पाठवला.",

    updateSuccess:
      "अहवालाची स्थिती यशस्वीरित्या अपडेट झाली.",

    updateFailed:
      "अहवालाची स्थिती अपडेट करता आली नाही.",

    smsFailed:
      "अहवाल अपडेट झाला, पण निराकरणाचा SMS पाठवता आला नाही.",

    loadFailed:
      "अहवाल लोड करता आले नाहीत.",

    noReports:
      "अहवाल आढळले नाहीत.",

    noMatchingReports:
      "तुमच्या शोधाशी किंवा निवडलेल्या फिल्टरशी जुळणारे अहवाल नाहीत.",

    medium: "मध्यम",

    high: "उच्च",

    low: "कमी",

    reportDetails: "अहवाल तपशील",
  },

  /* =======================================================
     TAMIL
  ======================================================= */

  ta: {
    eyebrow: "அதிகாரிகள்",

    title: "கிராமப்புற பிரச்சினை டாஷ்போர்டு",

    description:
      "கிராமப் பிரச்சினைகள், துறைகள் மற்றும் தீர்வு நிலையை கண்காணிக்கவும்.",

    refresh: "புதுப்பிக்கவும்",

    totalReports: "மொத்த அறிக்கைகள்",

    open: "திறந்தது",

    inProgress: "நடைபெறுகிறது",

    resolved: "தீர்க்கப்பட்டது",

    allReports: "அனைத்து அறிக்கைகள்",

    all: "அனைத்தும்",

    searchPlaceholder:
      "தலைப்பு, கிராமம் அல்லது கண்காணிப்பு ID மூலம் தேடவும்...",

    trackingId: "கண்காணிப்பு ID",

    category: "வகை",

    village: "கிராமம்",

    department: "துறை",

    notAssigned: "ஒதுக்கப்படவில்லை",

    viewPhoto: "புகைப்படத்தைப் பார்க்கவும்",

    viewLocation: "இடத்தைப் பார்க்கவும்",

    location: "இடம்",

    openButton: "திறந்தது",

    progressButton: "நடைபெறுகிறது",

    resolveButton: "தீர்க்கவும்",

    updating: "புதுப்பிக்கப்படுகிறது...",

    resolvedSuccess:
      "அறிக்கை வெற்றிகரமாக தீர்க்கப்பட்டது. குடிமகனுக்கு தீர்வு SMS அனுப்பப்பட்டது.",

    updateSuccess:
      "அறிக்கையின் நிலை வெற்றிகரமாக புதுப்பிக்கப்பட்டது.",

    updateFailed:
      "அறிக்கையின் நிலையை புதுப்பிக்க முடியவில்லை.",

    smsFailed:
      "அறிக்கை புதுப்பிக்கப்பட்டது, ஆனால் தீர்வு SMS அனுப்ப முடியவில்லை.",

    loadFailed:
      "அறிக்கைகளை ஏற்ற முடியவில்லை.",

    noReports:
      "அறிக்கைகள் எதுவும் இல்லை.",

    noMatchingReports:
      "உங்கள் தேடல் அல்லது தேர்ந்தெடுத்த வடிகட்டியுடன் பொருந்தும் அறிக்கைகள் இல்லை.",

    medium: "நடுத்தரம்",

    high: "அதிகம்",

    low: "குறைவு",

    reportDetails: "அறிக்கை விவரங்கள்",
  },

  /* =======================================================
     KANNADA
  ======================================================= */

  kn: {
    eyebrow: "ಅಧಿಕಾರಿಗಳು",

    title: "ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಗಳ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

    description:
      "ಗ್ರಾಮದ ಸಮಸ್ಯೆಗಳು, ಇಲಾಖೆಗಳು ಮತ್ತು ಪರಿಹಾರದ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ.",

    refresh: "ರಿಫ್ರೆಶ್",

    totalReports: "ಒಟ್ಟು ವರದಿಗಳು",

    open: "ತೆರೆದಿದೆ",

    inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",

    resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",

    allReports: "ಎಲ್ಲಾ ವರದಿಗಳು",

    all: "ಎಲ್ಲಾ",

    searchPlaceholder:
      "ಶೀರ್ಷಿಕೆ, ಗ್ರಾಮ ಅಥವಾ ಟ್ರ್ಯಾಕಿಂಗ್ ID ಮೂಲಕ ಹುಡುಕಿ...",

    trackingId: "ಟ್ರ್ಯಾಕಿಂಗ್ ID",

    category: "ವರ್ಗ",

    village: "ಗ್ರಾಮ",

    department: "ಇಲಾಖೆ",

    notAssigned: "ನಿಯೋಜಿಸಲಾಗಿಲ್ಲ",

    viewPhoto: "ಫೋಟೋ ನೋಡಿ",

    viewLocation: "ಸ್ಥಳ ನೋಡಿ",

    location: "ಸ್ಥಳ",

    openButton: "ತೆರೆದಿದೆ",

    progressButton: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",

    resolveButton: "ಪರಿಹರಿಸಿ",

    updating: "ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ...",

    resolvedSuccess:
      "ವರದಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಹರಿಸಲಾಗಿದೆ. ನಾಗರಿಕರಿಗೆ ಪರಿಹಾರ SMS ಕಳುಹಿಸಲಾಗಿದೆ.",

    updateSuccess:
      "ವರದಿ ಸ್ಥಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ.",

    updateFailed:
      "ವರದಿ ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

    smsFailed:
      "ವರದಿ ನವೀಕರಿಸಲಾಗಿದೆ, ಆದರೆ ಪರಿಹಾರ SMS ಕಳುಹಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

    loadFailed:
      "ವರದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

    noReports:
      "ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",

    noMatchingReports:
      "ನಿಮ್ಮ ಹುಡುಕಾಟ ಅಥವಾ ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಹೊಂದುವ ವರದಿಗಳಿಲ್ಲ.",

    medium: "ಮಧ್ಯಮ",

    high: "ಹೆಚ್ಚು",

    low: "ಕಡಿಮೆ",

    reportDetails: "ವರದಿ ವಿವರಗಳು",
  },

  /* =======================================================
     BENGALI
  ======================================================= */

  bn: {
    eyebrow: "কর্মকর্তারা",

    title: "গ্রামীণ সমস্যা ড্যাশবোর্ড",

    description:
      "গ্রামের সমস্যা, বিভাগ এবং সমাধানের অবস্থা পর্যবেক্ষণ করুন।",

    refresh: "রিফ্রেশ",

    totalReports: "মোট রিপোর্ট",

    open: "খোলা",

    inProgress: "চলমান",

    resolved: "সমাধান হয়েছে",

    allReports: "সব রিপোর্ট",

    all: "সব",

    searchPlaceholder:
      "শিরোনাম, গ্রাম বা ট্র্যাকিং ID দিয়ে খুঁজুন...",

    trackingId: "ট্র্যাকিং ID",

    category: "বিভাগ",

    village: "গ্রাম",

    department: "দপ্তর",

    notAssigned: "বরাদ্দ করা হয়নি",

    viewPhoto: "ছবি দেখুন",

    viewLocation: "অবস্থান দেখুন",

    location: "অবস্থান",

    openButton: "খোলা",

    progressButton: "চলমান",

    resolveButton: "সমাধান করুন",

    updating: "আপডেট হচ্ছে...",

    resolvedSuccess:
      "রিপোর্ট সফলভাবে সমাধান হয়েছে। নাগরিককে সমাধানের SMS পাঠানো হয়েছে।",

    updateSuccess:
      "রিপোর্টের অবস্থা সফলভাবে আপডেট হয়েছে।",

    updateFailed:
      "রিপোর্টের অবস্থা আপডেট করা যায়নি।",

    smsFailed:
      "রিপোর্ট আপডেট হয়েছে, কিন্তু সমাধানের SMS পাঠানো যায়নি।",

    loadFailed:
      "রিপোর্ট লোড করা যায়নি।",

    noReports:
      "কোনো রিপোর্ট পাওয়া যায়নি।",

    noMatchingReports:
      "আপনার অনুসন্ধান বা নির্বাচিত ফিল্টারের সাথে কোনো রিপোর্ট মেলেনি।",

    medium: "মাঝারি",

    high: "উচ্চ",

    low: "কম",

    reportDetails: "রিপোর্টের বিবরণ",
  },
};

/* =========================================================
   CATEGORY TRANSLATIONS
========================================================= */

const categoryLabels: Record<
  LanguageCode,
  Record<string, string>
> = {
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
    "Health & sanitation": "ఆరోగ్యం & పారిశుద్ధ్యం",
    "School & anganwadi": "పాఠశాల & అంగన్‌వాడీ",
    "Irrigation canal": "నీటిపారుదల కాలువ",
    "Ration & PDS": "రేషన్ & పీడీఎస్",
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
    "Road & bridge": "சாலை & பாலம்",
    "Drinking water": "குடிநீர்",
    Electricity: "மின்சாரம்",
    "Health & sanitation": "சுகாதாரம் & தூய்மை",
    "School & anganwadi": "பள்ளி & அங்கன்வாடி",
    "Irrigation canal": "பாசன கால்வாய்",
    "Ration & PDS": "ரேஷன் & PDS",
    Other: "மற்றவை",
  },

  kn: {
    "Road & bridge": "ರಸ್ತೆ ಮತ್ತು ಸೇತುವೆ",
    "Drinking water": "ಕುಡಿಯುವ ನೀರು",
    Electricity: "ವಿದ್ಯುತ್",
    "Health & sanitation": "ಆರೋಗ್ಯ ಮತ್ತು ಸ್ವಚ್ಛತೆ",
    "School & anganwadi": "ಶಾಲೆ ಮತ್ತು ಅಂಗನವಾಡಿ",
    "Irrigation canal": "ನೀರಾವರಿ ಕಾಲುವೆ",
    "Ration & PDS": "ರೇಷನ್ ಮತ್ತು PDS",
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
};

/* =========================================================
   DEPARTMENT TRANSLATIONS
========================================================= */

const departmentLabels: Record<
  LanguageCode,
  Record<string, string>
> = {
  en: {
    "Public Works Department": "Public Works Department",
    "Water Department": "Water Department",
    "Electricity Board": "Electricity Board",
    "Health Department": "Health Department",
    "Education Department": "Education Department",
    "Irrigation Department": "Irrigation Department",
    "Food & Civil Supplies Department":
      "Food & Civil Supplies Department",
    "General Administration": "General Administration",
  },

  te: {
    "Public Works Department": "ప్రజా పనుల శాఖ",
    "Water Department": "నీటి శాఖ",
    "Electricity Board": "విద్యుత్ బోర్డు",
    "Health Department": "ఆరోగ్య శాఖ",
    "Education Department": "విద్యా శాఖ",
    "Irrigation Department": "నీటిపారుదల శాఖ",
    "Food & Civil Supplies Department":
      "ఆహారం & పౌర సరఫరాల శాఖ",
    "General Administration": "సాధారణ పరిపాలన",
  },

  hi: {
    "Public Works Department": "लोक निर्माण विभाग",
    "Water Department": "जल विभाग",
    "Electricity Board": "विद्युत बोर्ड",
    "Health Department": "स्वास्थ्य विभाग",
    "Education Department": "शिक्षा विभाग",
    "Irrigation Department": "सिंचाई विभाग",
    "Food & Civil Supplies Department":
      "खाद्य एवं नागरिक आपूर्ति विभाग",
    "General Administration": "सामान्य प्रशासन",
  },

  mr: {
    "Public Works Department": "सार्वजनिक बांधकाम विभाग",
    "Water Department": "जल विभाग",
    "Electricity Board": "वीज मंडळ",
    "Health Department": "आरोग्य विभाग",
    "Education Department": "शिक्षण विभाग",
    "Irrigation Department": "सिंचन विभाग",
    "Food & Civil Supplies Department":
      "अन्न व नागरी पुरवठा विभाग",
    "General Administration": "सामान्य प्रशासन",
  },

  ta: {
    "Public Works Department": "பொதுப்பணித்துறை",
    "Water Department": "நீர்வளத்துறை",
    "Electricity Board": "மின்சார வாரியம்",
    "Health Department": "சுகாதாரத்துறை",
    "Education Department": "கல்வித்துறை",
    "Irrigation Department": "நீர்ப்பாசனத்துறை",
    "Food & Civil Supplies Department":
      "உணவு மற்றும் குடிமைப் பொருள் வழங்கல் துறை",
    "General Administration": "பொது நிர்வாகம்",
  },

  kn: {
    "Public Works Department": "ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳ ಇಲಾಖೆ",
    "Water Department": "ನೀರಿನ ಇಲಾಖೆ",
    "Electricity Board": "ವಿದ್ಯುತ್ ಮಂಡಳಿ",
    "Health Department": "ಆರೋಗ್ಯ ಇಲಾಖೆ",
    "Education Department": "ಶಿಕ್ಷಣ ಇಲಾಖೆ",
    "Irrigation Department": "ನೀರಾವರಿ ಇಲಾಖೆ",
    "Food & Civil Supplies Department":
      "ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ಇಲಾಖೆ",
    "General Administration": "ಸಾಮಾನ್ಯ ಆಡಳಿತ",
  },

  bn: {
    "Public Works Department": "জনপথ বিভাগ",
    "Water Department": "জল বিভাগ",
    "Electricity Board": "বিদ্যুৎ বোর্ড",
    "Health Department": "স্বাস্থ্য বিভাগ",
    "Education Department": "শিক্ষা বিভাগ",
    "Irrigation Department": "সেচ বিভাগ",
    "Food & Civil Supplies Department":
      "খাদ্য ও নাগরিক সরবরাহ বিভাগ",
    "General Administration": "সাধারণ প্রশাসন",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getCategoryLabel(
  category: string | null,
  lang: LanguageCode,
): string {
  if (!category) {
    return "-";
  }

  return (
    categoryLabels[lang]?.[category] ??
    categoryLabels.en[category] ??
    category
  );
}

function getDepartmentLabel(
  department: string | null,
  lang: LanguageCode,
  notAssigned: string,
): string {
  if (!department) {
    return notAssigned;
  }

  return (
    departmentLabels[lang]?.[department] ??
    departmentLabels.en[department] ??
    department
  );
}

function getPriorityLabel(
  priority: string | null,
  lang: LanguageCode,
): string {
  const value = (priority ?? "Medium").trim().toLowerCase();

  if (value === "high") {
    return adminText[lang].high;
  }

  if (value === "low") {
    return adminText[lang].low;
  }

  return adminText[lang].medium;
}

function getStatusLabel(
  status: Status,
  lang: LanguageCode,
): string {
  if (status === "Resolved") {
    return adminText[lang].resolved;
  }

  if (status === "In Progress") {
    return adminText[lang].inProgress;
  }

  return adminText[lang].open;
}

/* =========================================================
   ADMIN PAGE
========================================================= */

function AdminPage() {
  const { lang } = useI18n();

  const language: LanguageCode =
    lang === "en" ||
    lang === "te" ||
    lang === "hi" ||
    lang === "mr" ||
    lang === "ta" ||
    lang === "kn" ||
    lang === "bn"
      ? lang
      : "en";

  const text = adminText[language];

  const [reports, setReports] = useState<Report[]>([]);

  const [loading, setLoading] = useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "All" | "Open" | "In Progress" | "Resolved"
  >("All");

  const [message, setMessage] = useState("");

  /* =======================================================
     LOAD REPORTS
  ======================================================= */

  const loadReports = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (error) {
      console.error(
        "LOAD REPORTS ERROR:",
        error,
      );

      setMessage(text.loadFailed);
      setReports([]);
      setLoading(false);

      return;
    }

    setReports(
      (data ?? []) as Report[],
    );

    setLoading(false);
  };

  useEffect(() => {
    void loadReports();
  }, []);

  /* =======================================================
     FILTER REPORTS
  ======================================================= */

  const filteredReports = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return reports.filter((report) => {
      const status = normalizeStatus(
        report.status,
      );

      const matchesStatus =
        filter === "All" ||
        status === filter;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchable = [
        report.title,
        report.village,
        report.tracking_id,
        report.category,
        report.description,
        report.department,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [
    reports,
    search,
    filter,
  ]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const totalCount = reports.length;

  const openCount = reports.filter(
    (report) =>
      normalizeStatus(report.status) ===
      "Open",
  ).length;

  const progressCount = reports.filter(
    (report) =>
      normalizeStatus(report.status) ===
      "In Progress",
  ).length;

  const resolvedCount = reports.filter(
    (report) =>
      normalizeStatus(report.status) ===
      "Resolved",
  ).length;

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const updateStatus = async (
    report: Report,
    requestedStatus: Status,
  ) => {
    if (updatingId !== null) {
      return;
    }

    const currentStatus =
      normalizeStatus(report.status);

    if (
      currentStatus === requestedStatus
    ) {
      return;
    }

    setUpdatingId(report.id);
    setMessage("");

    try {
      console.log(
        "================================",
      );

      console.log(
        "ADMIN STATUS UPDATE",
      );

      console.log(
        "Report ID:",
        report.id,
      );

      console.log(
        "Tracking ID:",
        report.tracking_id,
      );

      console.log(
        "Old Status:",
        currentStatus,
      );

      console.log(
        "Requested Status:",
        requestedStatus,
      );

      console.log(
        "Phone:",
        report.phone,
      );

      console.log(
        "Language:",
        report.language,
      );

      console.log(
        "================================",
      );

      /* =================================================
         DATABASE UPDATE
      ================================================= */

      const {
        data,
        error,
      } = await supabase
        .from("reports")
        .update({
          status: requestedStatus,
        })
        .eq("id", report.id)
        .select("*")
        .single();

      if (error) {
        console.error(
          "DATABASE UPDATE ERROR:",
          error,
        );

        setMessage(
          text.updateFailed,
        );

        return;
      }

      console.log(
        "DATABASE RETURNED STATUS:",
        data?.status,
      );

      /* =================================================
         UPDATE LOCAL UI
      ================================================= */

      setReports((previous) =>
        previous.map((item) =>
          item.id === report.id
            ? {
                ...item,
                ...data,
                status:
                  requestedStatus,
              }
            : item,
        ),
      );

      /* =================================================
         RESOLVED SMS
      ================================================= */

      if (
        requestedStatus === "Resolved"
      ) {
        const reportLanguage: LanguageCode =
          report.language === "te" ||
          report.language === "hi" ||
          report.language === "mr" ||
          report.language === "ta" ||
          report.language === "kn" ||
          report.language === "bn" ||
          report.language === "en"
            ? report.language
            : "en";

        console.log(
          "================================",
        );

        console.log(
          "RESOLVED STATUS DETECTED",
        );

        console.log(
          "Sending Resolved SMS...",
        );

        console.log(
          "Tracking ID:",
          report.tracking_id,
        );

        console.log(
          "Phone:",
          report.phone,
        );

        console.log(
          "Title:",
          report.title,
        );

        console.log(
          "Language:",
          reportLanguage,
        );

        console.log(
          "================================",
        );

        if (
          report.phone &&
          report.tracking_id
        ) {
          const {
            data: smsData,
            error: smsError,
          } =
            await supabase.functions.invoke(
              "send-report-sms",
              {
                body: {
                  phone:
                    report.phone,

                  tracking_id:
                    report.tracking_id,

                  title:
                    report.title,

                  status:
                    "Resolved",

                  language:
                    reportLanguage,
                },
              },
            );

          console.log(
            "RESOLVED SMS RESPONSE:",
            smsData,
          );

          console.log(
            "RESOLVED SMS ERROR:",
            smsError,
          );

          /* =========================================
             SMS FAILED
          ========================================= */

          if (
            smsError ||
            !smsData ||
            smsData.success !== true
          ) {
            console.error(
              "RESOLVED SMS FAILED:",
              smsError ??
                smsData,
            );

            setMessage(
              text.smsFailed,
            );

            return;
          }

          /* =========================================
             SMS SUCCESS
          ========================================= */

          setMessage(
            text.resolvedSuccess,
          );

          return;
        }

        setMessage(
          text.updateSuccess,
        );

        return;
      }

      /* =================================================
         NORMAL STATUS UPDATE
      ================================================= */

      setMessage(
        text.updateSuccess,
      );
    } catch (error) {
      console.error(
        "STATUS UPDATE EXCEPTION:",
        error,
      );

      setMessage(
        text.updateFailed,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =======================================================
     STATUS BADGE
  ======================================================= */

  const renderStatusBadge = (
    status: Status,
  ) => {
    if (status === "Resolved") {
      return (
        <Badge className="gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />

          {getStatusLabel(
            status,
            language,
          )}
        </Badge>
      );
    }

    if (
      status === "In Progress"
    ) {
      return (
        <Badge
          variant="secondary"
          className="gap-1"
        >
          <Clock className="h-3.5 w-3.5" />

          {getStatusLabel(
            status,
            language,
          )}
        </Badge>
      );
    }

    return (
      <Badge
        variant="destructive"
        className="gap-1"
      >
        <Circle className="h-3.5 w-3.5" />

        {getStatusLabel(
          status,
          language,
        )}
      </Badge>
    );
  };

  /* =======================================================
     PRIORITY BADGE
  ======================================================= */

  const renderPriorityBadge = (
    priority: string | null,
  ) => {
    return (
      <Badge variant="outline">
        {getPriorityLabel(
          priority,
          language,
        )}
      </Badge>
    );
  };

  /* =======================================================
     PAGE UI
  ======================================================= */

  return (
    <>
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <PageHeader
        icon={LayoutDashboard}
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />

      <Section>
        <div className="space-y-6">

          {/* ===============================================
              TOP BAR
          =============================================== */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div />

            <Button
              variant="outline"
              onClick={() =>
                void loadReports()
              }
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading
                    ? "animate-spin"
                    : ""
                }`}
              />

              {text.refresh}
            </Button>
          </div>

          {/* ===============================================
              SUCCESS / ERROR MESSAGE
          =============================================== */}

          {message && (
            <div className="rounded-xl border bg-muted/40 px-4 py-3 text-sm">
              {message}
            </div>
          )}

          {/* ===============================================
              STAT CARDS
          =============================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* TOTAL */}

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  {text.totalReports}
                </CardDescription>

                <CardTitle className="text-3xl">
                  {totalCount}
                </CardTitle>
              </CardHeader>
            </Card>

            {/* OPEN */}

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  {text.open}
                </CardDescription>

                <CardTitle className="text-3xl">
                  {openCount}
                </CardTitle>
              </CardHeader>
            </Card>

            {/* IN PROGRESS */}

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  {text.inProgress}
                </CardDescription>

                <CardTitle className="text-3xl">
                  {progressCount}
                </CardTitle>
              </CardHeader>
            </Card>

            {/* RESOLVED */}

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>
                  {text.resolved}
                </CardDescription>

                <CardTitle className="text-3xl">
                  {resolvedCount}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* ===============================================
              REPORT CARD
          =============================================== */}

          <Card>
            <CardHeader>
              <CardTitle>
                {text.allReports}
              </CardTitle>

              <CardDescription>
                {text.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              {/* =========================================
                  SEARCH
              ========================================= */}

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder={
                    text.searchPlaceholder
                  }
                  className="pl-9"
                />
              </div>

              {/* =========================================
                  FILTER BUTTONS
              ========================================= */}

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "All",
                    "Open",
                    "In Progress",
                    "Resolved",
                  ] as const
                ).map(
                  (statusFilter) => {
                    const active =
                      filter ===
                      statusFilter;

                    let label =
                      text.all;

                    if (
                      statusFilter ===
                      "Open"
                    ) {
                      label =
                        text.open;
                    }

                    if (
                      statusFilter ===
                      "In Progress"
                    ) {
                      label =
                        text.inProgress;
                    }

                    if (
                      statusFilter ===
                      "Resolved"
                    ) {
                      label =
                        text.resolved;
                    }

                    return (
                      <Button
                        key={
                          statusFilter
                        }
                        variant={
                          active
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setFilter(
                            statusFilter,
                          )
                        }
                      >
                        {label}
                      </Button>
                    );
                  },
                )}
              </div>

              {/* =========================================
                  LOADING
              ========================================= */}

              {loading && (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  {text.refresh}...
                </div>
              )}

              {/* =========================================
                  NO REPORTS
              ========================================= */}

              {!loading &&
                filteredReports.length ===
                  0 && (
                  <div className="rounded-xl border border-dashed p-10 text-center">
                    <p className="font-medium">
                      {reports.length ===
                      0
                        ? text.noReports
                        : text.noMatchingReports}
                    </p>
                  </div>
                )}

              {/* =========================================
                  REPORT LIST
              ========================================= */}

              {!loading &&
                filteredReports.length >
                  0 && (
                  <div className="space-y-4">

                    {filteredReports.map(
                      (report) => {
                        const status =
                          normalizeStatus(
                            report.status,
                          );

                        const photoUrl =
                          report.photo_url;

                        const hasLocation =
                          typeof report.latitude ===
                            "number" &&
                          typeof report.longitude ===
                            "number";

                        return (
                          <Card
                            key={
                              report.id
                            }
                            className="overflow-hidden"
                          >
                            <CardContent className="p-5">

                              <div className="space-y-4">

                                {/* =================================
                                    TITLE + STATUS
                                ================================== */}

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                  <div className="space-y-2">

                                    <h3 className="text-lg font-semibold">
                                      {report.title ||
                                        "-"}
                                    </h3>

                                    <div className="flex flex-wrap gap-2">

                                      {renderStatusBadge(
                                        status,
                                      )}

                                      {renderPriorityBadge(
                                        report.priority,
                                      )}

                                    </div>
                                  </div>
                                </div>

                                {/* =================================
                                    REPORT DETAILS
                                ================================== */}

                                <div className="grid gap-3 text-sm sm:grid-cols-2">

                                  {/* TRACKING ID */}

                                  <div>
                                    <span className="font-medium">
                                      {
                                        text.trackingId
                                      }:
                                    </span>{" "}

                                    <span className="text-muted-foreground">
                                      {report.tracking_id ??
                                        "-"}
                                    </span>
                                  </div>

                                  {/* CATEGORY */}

                                  <div>
                                    <span className="font-medium">
                                      {
                                        text.category
                                      }:
                                    </span>{" "}

                                    <span className="text-muted-foreground">
                                      {getCategoryLabel(
                                        report.category,
                                        language,
                                      )}
                                    </span>
                                  </div>

                                  {/* VILLAGE */}

                                  <div>
                                    <span className="font-medium">
                                      {
                                        text.village
                                      }:
                                    </span>{" "}

                                    <span className="text-muted-foreground">
                                      {report.village ??
                                        "-"}
                                    </span>
                                  </div>

                                  {/* DEPARTMENT */}

                                  <div>
                                    <span className="font-medium">
                                      {
                                        text.department
                                      }:
                                    </span>{" "}

                                    <span className="text-muted-foreground">
                                      {getDepartmentLabel(
                                        report.department,
                                        language,
                                        text.notAssigned,
                                      )}
                                    </span>
                                  </div>

                                </div>

                                {/* =================================
                                    DESCRIPTION
                                ================================== */}

                                {report.description && (
                                  <p className="text-sm leading-6 text-muted-foreground">
                                    {
                                      report.description
                                    }
                                  </p>
                                )}

                                {/* =================================
                                    PHOTO + LOCATION
                                ================================== */}

                                <div className="flex flex-wrap gap-2">

                                  {/* PHOTO */}

                                  {photoUrl && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-2"
                                      onClick={() =>
                                        window.open(
                                          photoUrl,
                                          "_blank",
                                          "noopener,noreferrer",
                                        )
                                      }
                                    >
                                      <ImageIcon className="h-4 w-4" />

                                      {
                                        text.viewPhoto
                                      }
                                    </Button>
                                  )}

                                  {/* LOCATION */}

                                  {hasLocation && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-2"
                                      onClick={() =>
                                        window.open(
                                          `https://www.google.com/maps?q=${report.latitude},${report.longitude}`,
                                          "_blank",
                                          "noopener,noreferrer",
                                        )
                                      }
                                    >
                                      <MapPin className="h-4 w-4" />

                                      {
                                        text.viewLocation
                                      }
                                    </Button>
                                  )}

                                </div>

                                {/* =================================
                                    COORDINATES
                                ================================== */}

                                {hasLocation && (
                                  <p className="text-xs text-muted-foreground">
                                    {
                                      text.location
                                    }
                                    :{" "}
                                    {
                                      report.latitude
                                    }
                                    ,{" "}
                                    {
                                      report.longitude
                                    }
                                  </p>
                                )}

                                {/* =================================
                                    STATUS BUTTONS
                                ================================== */}

                                <div className="flex flex-wrap gap-2 border-t pt-4">

                                  {/* OPEN */}

                                  <Button
                                    size="sm"
                                    variant={
                                      status ===
                                      "Open"
                                        ? "default"
                                        : "outline"
                                    }
                                    disabled={
                                      updatingId !==
                                        null ||
                                      status ===
                                        "Open"
                                    }
                                    onClick={() =>
                                      void updateStatus(
                                        report,
                                        "Open",
                                      )
                                    }
                                  >
                                    {updatingId ===
                                      report.id &&
                                    status !==
                                      "Open"
                                      ? text.updating
                                      : text.openButton}
                                  </Button>

                                  {/* IN PROGRESS */}

                                  <Button
                                    size="sm"
                                    variant={
                                      status ===
                                      "In Progress"
                                        ? "default"
                                        : "outline"
                                    }
                                    disabled={
                                      updatingId !==
                                        null ||
                                      status ===
                                        "In Progress"
                                    }
                                    onClick={() =>
                                      void updateStatus(
                                        report,
                                        "In Progress",
                                      )
                                    }
                                  >
                                    {updatingId ===
                                      report.id &&
                                    status !==
                                      "In Progress"
                                      ? text.updating
                                      : text.progressButton}
                                  </Button>

                                  {/* RESOLVE */}

                                  <Button
                                    size="sm"
                                    variant={
                                      status ===
                                      "Resolved"
                                        ? "default"
                                        : "outline"
                                    }
                                    disabled={
                                      updatingId !==
                                        null ||
                                      status ===
                                        "Resolved"
                                    }
                                    onClick={() =>
                                      void updateStatus(
                                        report,
                                        "Resolved",
                                      )
                                    }
                                  >
                                    {updatingId ===
                                      report.id &&
                                    status !==
                                      "Resolved"
                                      ? text.updating
                                      : text.resolveButton}
                                  </Button>

                                </div>

                              </div>
                            </CardContent>
                          </Card>
                        );
                      },
                    )}

                  </div>
                )}

            </CardContent>
          </Card>

        </div>
      </Section>
    </>
  );
}