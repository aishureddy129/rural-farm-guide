import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  Clock,
  Building2,
} from "lucide-react";

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

import {
  useI18n,
  type LanguageCode,
} from "@/lib/i18n";

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/tracking")({
  component: TrackPage,
});

/* =========================================================
   REPORT TYPE
========================================================= */

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

/* =========================================================
   TRANSLATION TYPE
========================================================= */

type TrackText = {
  eyebrow: string;
  title: string;
  description: string;

  enterTrackingId: string;
  example: string;
  placeholder: string;
  trackReport: string;
  searching: string;

  pleaseEnter: string;
  unableToFind: string;
  noReport: string;
  somethingWrong: string;

  category: string;
  villageWard: string;
  department: string;
  notAssigned: string;
  priority: string;

  problemDescription: string;

  reportProgress: string;
  reported: string;
  reportReceived: string;
  currentStatus: string;
  departmentStatus: string;
  pending: string;

  uploadedPhoto: string;
  reportedIssue: string;

  location: string;
  latitude: string;
  longitude: string;

  contactNumber: string;

  statusOpen: string;
  statusInProgress: string;
  statusResolved: string;

  categoryRoad: string;
  categoryElectricity: string;
  categoryHealth: string;
  categorySchool: string;
  categoryIrrigation: string;
  categoryRation: string;
  categoryWater: string;
  categorySanitation: string;
  categoryOther: string;

  priorityLow: string;
  priorityMedium: string;
  priorityHigh: string;
};

/* =========================================================
   TRANSLATIONS
========================================================= */

const trackTranslations: Record<LanguageCode, TrackText> = {
  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    eyebrow: "REPORT TRACKING",
    title: "Track Your Report",
    description:
      "Enter your tracking ID to check the status of your village issue.",

    enterTrackingId: "Enter Tracking ID",
    example: "Example: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "Track report",
    searching: "Searching...",

    pleaseEnter: "Please enter your tracking ID.",
    unableToFind:
      "Unable to find the report. Please try again.",
    noReport:
      "No report found with this tracking ID.",
    somethingWrong:
      "Something went wrong. Please try again.",

    category: "Category",
    villageWard: "Village / Ward",
    department: "Department",
    notAssigned: "Not assigned",
    priority: "Priority",

    problemDescription: "Problem description",

    reportProgress: "Report progress",
    reported: "Reported",
    reportReceived: "Report received",
    currentStatus: "Current status",
    departmentStatus: "Department",
    pending: "Pending",

    uploadedPhoto: "Uploaded photo",
    reportedIssue: "Reported issue",

    location: "Location",
    latitude: "Latitude",
    longitude: "Longitude",

    contactNumber: "Contact number",

    statusOpen: "Open",
    statusInProgress: "In Progress",
    statusResolved: "Resolved",

    categoryRoad: "Road & bridge",
    categoryElectricity: "Electricity",
    categoryHealth: "Health",
    categorySchool: "School",
    categoryIrrigation: "Irrigation",
    categoryRation: "Ration",
    categoryWater: "Water",
    categorySanitation: "Sanitation",
    categoryOther: "Other",

    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
  },

  /* =======================================================
     TELUGU
  ======================================================= */

  te: {
    eyebrow: "నివేదిక ట్రాకింగ్",
    title: "మీ నివేదికను ట్రాక్ చేయండి",
    description:
      "మీ గ్రామ సమస్య స్థితిని తెలుసుకోవడానికి మీ ట్రాకింగ్ ID నమోదు చేయండి.",

    enterTrackingId: "ట్రాకింగ్ ID నమోదు చేయండి",
    example: "ఉదాహరణ: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "నివేదికను ట్రాక్ చేయండి",
    searching: "వెతుకుతోంది...",

    pleaseEnter:
      "దయచేసి మీ ట్రాకింగ్ ID నమోదు చేయండి.",
    unableToFind:
      "నివేదికను కనుగొనలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.",
    noReport:
      "ఈ ట్రాకింగ్ IDతో ఎటువంటి నివేదిక కనుగొనబడలేదు.",
    somethingWrong:
      "ఏదో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.",

    category: "వర్గం",
    villageWard: "గ్రామం / వార్డు",
    department: "శాఖ",
    notAssigned: "కేటాయించలేదు",
    priority: "ప్రాధాన్యత",

    problemDescription: "సమస్య వివరణ",

    reportProgress: "నివేదిక పురోగతి",
    reported: "నివేదించబడింది",
    reportReceived: "నివేదిక అందింది",
    currentStatus: "ప్రస్తుత స్థితి",
    departmentStatus: "శాఖ",
    pending: "పెండింగ్‌లో ఉంది",

    uploadedPhoto: "అప్‌లోడ్ చేసిన ఫోటో",
    reportedIssue: "నివేదించిన సమస్య",

    location: "స్థానం",
    latitude: "అక్షాంశం",
    longitude: "రేఖాంశం",

    contactNumber: "సంప్రదింపు నంబర్",

    statusOpen: "తెరిచి ఉంది",
    statusInProgress: "పురోగతిలో ఉంది",
    statusResolved: "పరిష్కరించబడింది",

    categoryRoad: "రోడ్లు & వంతెనలు",
    categoryElectricity: "విద్యుత్",
    categoryHealth: "ఆరోగ్యం",
    categorySchool: "పాఠశాల",
    categoryIrrigation: "నీటిపారుదల",
    categoryRation: "రేషన్",
    categoryWater: "నీరు",
    categorySanitation: "పారిశుధ్యం",
    categoryOther: "ఇతరాలు",

    priorityLow: "తక్కువ",
    priorityMedium: "మధ్యస్థం",
    priorityHigh: "అధికం",
  },

  /* =======================================================
     HINDI
  ======================================================= */

  hi: {
    eyebrow: "रिपोर्ट ट्रैकिंग",
    title: "अपनी रिपोर्ट ट्रैक करें",
    description:
      "अपने गाँव की समस्या की स्थिति जानने के लिए ट्रैकिंग ID दर्ज करें।",

    enterTrackingId: "ट्रैकिंग ID दर्ज करें",
    example: "उदाहरण: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "रिपोर्ट ट्रैक करें",
    searching: "खोज रहे हैं...",

    pleaseEnter:
      "कृपया अपनी ट्रैकिंग ID दर्ज करें।",
    unableToFind:
      "रिपोर्ट नहीं मिल सकी। कृपया फिर से प्रयास करें।",
    noReport:
      "इस ट्रैकिंग ID के साथ कोई रिपोर्ट नहीं मिली।",
    somethingWrong:
      "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",

    category: "श्रेणी",
    villageWard: "गाँव / वार्ड",
    department: "विभाग",
    notAssigned: "आवंटित नहीं",
    priority: "प्राथमिकता",

    problemDescription: "समस्या का विवरण",

    reportProgress: "रिपोर्ट की प्रगति",
    reported: "रिपोर्ट की गई",
    reportReceived: "रिपोर्ट प्राप्त हुई",
    currentStatus: "वर्तमान स्थिति",
    departmentStatus: "विभाग",
    pending: "लंबित",

    uploadedPhoto: "अपलोड की गई फोटो",
    reportedIssue: "रिपोर्ट की गई समस्या",

    location: "स्थान",
    latitude: "अक्षांश",
    longitude: "देशांतर",

    contactNumber: "संपर्क नंबर",

    statusOpen: "खुला",
    statusInProgress: "प्रगति में",
    statusResolved: "समाधान किया गया",

    categoryRoad: "सड़क और पुल",
    categoryElectricity: "बिजली",
    categoryHealth: "स्वास्थ्य",
    categorySchool: "स्कूल",
    categoryIrrigation: "सिंचाई",
    categoryRation: "राशन",
    categoryWater: "पानी",
    categorySanitation: "स्वच्छता",
    categoryOther: "अन्य",

    priorityLow: "कम",
    priorityMedium: "मध्यम",
    priorityHigh: "उच्च",
  },

  /* =======================================================
     MARATHI
  ======================================================= */

  mr: {
    eyebrow: "अहवाल ट्रॅकिंग",
    title: "तुमचा अहवाल ट्रॅक करा",
    description:
      "तुमच्या गावातील समस्येची स्थिती तपासण्यासाठी ट्रॅकिंग ID प्रविष्ट करा.",

    enterTrackingId: "ट्रॅकिंग ID प्रविष्ट करा",
    example: "उदाहरण: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "अहवाल ट्रॅक करा",
    searching: "शोधत आहे...",

    pleaseEnter:
      "कृपया तुमची ट्रॅकिंग ID प्रविष्ट करा.",
    unableToFind:
      "अहवाल सापडला नाही. कृपया पुन्हा प्रयत्न करा.",
    noReport:
      "या ट्रॅकिंग ID सह कोणताही अहवाल सापडला नाही.",
    somethingWrong:
      "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",

    category: "श्रेणी",
    villageWard: "गाव / प्रभाग",
    department: "विभाग",
    notAssigned: "नियुक्त केलेले नाही",
    priority: "प्राधान्य",

    problemDescription: "समस्येचे वर्णन",

    reportProgress: "अहवालाची प्रगती",
    reported: "नोंदवले",
    reportReceived: "अहवाल प्राप्त झाला",
    currentStatus: "सध्याची स्थिती",
    departmentStatus: "विभाग",
    pending: "प्रलंबित",

    uploadedPhoto: "अपलोड केलेला फोटो",
    reportedIssue: "नोंदवलेली समस्या",

    location: "स्थान",
    latitude: "अक्षांश",
    longitude: "रेखांश",

    contactNumber: "संपर्क क्रमांक",

    statusOpen: "उघडे",
    statusInProgress: "प्रगतीपथावर",
    statusResolved: "निराकरण झाले",

    categoryRoad: "रस्ते आणि पूल",
    categoryElectricity: "वीज",
    categoryHealth: "आरोग्य",
    categorySchool: "शाळा",
    categoryIrrigation: "सिंचन",
    categoryRation: "रेशन",
    categoryWater: "पाणी",
    categorySanitation: "स्वच्छता",
    categoryOther: "इतर",

    priorityLow: "कमी",
    priorityMedium: "मध्यम",
    priorityHigh: "उच्च",
  },

  /* =======================================================
     TAMIL
  ======================================================= */

  ta: {
    eyebrow: "அறிக்கை கண்காணிப்பு",
    title: "உங்கள் அறிக்கையை கண்காணிக்கவும்",
    description:
      "உங்கள் கிராமப் பிரச்சினையின் நிலையை அறிய கண்காணிப்பு ID-ஐ உள்ளிடவும்.",

    enterTrackingId: "கண்காணிப்பு ID-ஐ உள்ளிடவும்",
    example: "உதாரணம்: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "அறிக்கையை கண்காணிக்கவும்",
    searching: "தேடுகிறது...",

    pleaseEnter:
      "உங்கள் கண்காணிப்பு ID-ஐ உள்ளிடவும்.",
    unableToFind:
      "அறிக்கையை கண்டுபிடிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    noReport:
      "இந்த கண்காணிப்பு ID-க்கு எந்த அறிக்கையும் கிடைக்கவில்லை.",
    somethingWrong:
      "ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",

    category: "வகை",
    villageWard: "கிராமம் / வார்டு",
    department: "துறை",
    notAssigned: "ஒதுக்கப்படவில்லை",
    priority: "முன்னுரிமை",

    problemDescription: "பிரச்சினையின் விளக்கம்",

    reportProgress: "அறிக்கை முன்னேற்றம்",
    reported: "புகாரளிக்கப்பட்டது",
    reportReceived: "அறிக்கை பெறப்பட்டது",
    currentStatus: "தற்போதைய நிலை",
    departmentStatus: "துறை",
    pending: "நிலுவையில்",

    uploadedPhoto: "பதிவேற்றப்பட்ட புகைப்படம்",
    reportedIssue: "புகாரளிக்கப்பட்ட பிரச்சினை",

    location: "இடம்",
    latitude: "அட்சரேகை",
    longitude: "தீர்க்கரேகை",

    contactNumber: "தொடர்பு எண்",

    statusOpen: "திறந்துள்ளது",
    statusInProgress: "முன்னேற்றத்தில்",
    statusResolved: "தீர்க்கப்பட்டது",

    categoryRoad: "சாலை மற்றும் பாலம்",
    categoryElectricity: "மின்சாரம்",
    categoryHealth: "சுகாதாரம்",
    categorySchool: "பள்ளி",
    categoryIrrigation: "நீர்ப்பாசனம்",
    categoryRation: "ரேஷன்",
    categoryWater: "தண்ணீர்",
    categorySanitation: "சுகாதாரம்",
    categoryOther: "மற்றவை",

    priorityLow: "குறைவு",
    priorityMedium: "நடுத்தரம்",
    priorityHigh: "அதிகம்",
  },

  /* =======================================================
     KANNADA
  ======================================================= */

  kn: {
    eyebrow: "ವರದಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    title: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    description:
      "ನಿಮ್ಮ ಗ್ರಾಮದ ಸಮಸ್ಯೆಯ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿಯಲು ಟ್ರ್ಯಾಕಿಂಗ್ ID ನಮೂದಿಸಿ.",

    enterTrackingId: "ಟ್ರ್ಯಾಕಿಂಗ್ ID ನಮೂದಿಸಿ",
    example: "ಉದಾಹರಣೆ: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "ವರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    searching: "ಹುಡುಕಲಾಗುತ್ತಿದೆ...",

    pleaseEnter:
      "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟ್ರ್ಯಾಕಿಂಗ್ ID ನಮೂದಿಸಿ.",
    unableToFind:
      "ವರದಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    noReport:
      "ಈ ಟ್ರ್ಯಾಕಿಂಗ್ IDಯೊಂದಿಗೆ ಯಾವುದೇ ವರದಿ ಕಂಡುಬಂದಿಲ್ಲ.",
    somethingWrong:
      "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    category: "ವರ್ಗ",
    villageWard: "ಗ್ರಾಮ / ವಾರ್ಡ್",
    department: "ಇಲಾಖೆ",
    notAssigned: "ನಿಯೋಜಿಸಲಾಗಿಲ್ಲ",
    priority: "ಆದ್ಯತೆ",

    problemDescription: "ಸಮಸ್ಯೆಯ ವಿವರಣೆ",

    reportProgress: "ವರದಿ ಪ್ರಗತಿ",
    reported: "ವರದಿ ಮಾಡಲಾಗಿದೆ",
    reportReceived: "ವರದಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
    currentStatus: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
    departmentStatus: "ಇಲಾಖೆ",
    pending: "ಬಾಕಿಯಿದೆ",

    uploadedPhoto: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋ",
    reportedIssue: "ವರದಿ ಮಾಡಿದ ಸಮಸ್ಯೆ",

    location: "ಸ್ಥಳ",
    latitude: "ಅಕ್ಷಾಂಶ",
    longitude: "ರೇಖಾಂಶ",

    contactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",

    statusOpen: "ತೆರೆದಿದೆ",
    statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    statusResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",

    categoryRoad: "ರಸ್ತೆ ಮತ್ತು ಸೇತುವೆ",
    categoryElectricity: "ವಿದ್ಯುತ್",
    categoryHealth: "ಆರೋಗ್ಯ",
    categorySchool: "ಶಾಲೆ",
    categoryIrrigation: "ನೀರಾವರಿ",
    categoryRation: "ಪಡಿತರ",
    categoryWater: "ನೀರು",
    categorySanitation: "ನೈರ್ಮಲ್ಯ",
    categoryOther: "ಇತರೆ",

    priorityLow: "ಕಡಿಮೆ",
    priorityMedium: "ಮಧ್ಯಮ",
    priorityHigh: "ಹೆಚ್ಚು",
  },

  /* =======================================================
     BENGALI
  ======================================================= */

  bn: {
    eyebrow: "রিপোর্ট ট্র্যাকিং",
    title: "আপনার রিপোর্ট ট্র্যাক করুন",
    description:
      "আপনার গ্রামের সমস্যার অবস্থা জানতে ট্র্যাকিং ID লিখুন।",

    enterTrackingId: "ট্র্যাকিং ID লিখুন",
    example: "উদাহরণ: GS-127202",
    placeholder: "GS-XXXXXX",
    trackReport: "রিপোর্ট ট্র্যাক করুন",
    searching: "খোঁজা হচ্ছে...",

    pleaseEnter:
      "অনুগ্রহ করে আপনার ট্র্যাকিং ID লিখুন।",
    unableToFind:
      "রিপোর্ট খুঁজে পাওয়া যায়নি। আবার চেষ্টা করুন।",
    noReport:
      "এই ট্র্যাকিং ID-র কোনো রিপোর্ট পাওয়া যায়নি।",
    somethingWrong:
      "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",

    category: "বিভাগ",
    villageWard: "গ্রাম / ওয়ার্ড",
    department: "দপ্তর",
    notAssigned: "নির্ধারিত নয়",
    priority: "অগ্রাধিকার",

    problemDescription: "সমস্যার বিবরণ",

    reportProgress: "রিপোর্টের অগ্রগতি",
    reported: "রিপোর্ট করা হয়েছে",
    reportReceived: "রিপোর্ট পাওয়া গেছে",
    currentStatus: "বর্তমান অবস্থা",
    departmentStatus: "দপ্তর",
    pending: "অপেক্ষমাণ",

    uploadedPhoto: "আপলোড করা ছবি",
    reportedIssue: "রিপোর্ট করা সমস্যা",

    location: "অবস্থান",
    latitude: "অক্ষাংশ",
    longitude: "দ্রাঘিমাংশ",

    contactNumber: "যোগাযোগ নম্বর",

    statusOpen: "খোলা",
    statusInProgress: "চলমান",
    statusResolved: "সমাধান হয়েছে",

    categoryRoad: "রাস্তা ও সেতু",
    categoryElectricity: "বিদ্যুৎ",
    categoryHealth: "স্বাস্থ্য",
    categorySchool: "স্কুল",
    categoryIrrigation: "সেচ",
    categoryRation: "রেশন",
    categoryWater: "পানি",
    categorySanitation: "স্যানিটেশন",
    categoryOther: "অন্যান্য",

    priorityLow: "কম",
    priorityMedium: "মাঝারি",
    priorityHigh: "উচ্চ",
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getStatusText(
  status: string,
  text: TrackText,
): string {
  const normalized = status
    .trim()
    .toLowerCase()
    .replace(/_/g, " ");

  if (normalized === "resolved" || normalized === "closed") {
    return text.statusResolved;
  }

  if (
    normalized === "in progress" ||
    normalized === "inprogress"
  ) {
    return text.statusInProgress;
  }

  return text.statusOpen;
}

function getCategoryText(
  category: string,
  text: TrackText,
): string {
  const normalized = category.trim().toLowerCase();

  if (
    normalized.includes("road") ||
    normalized.includes("bridge")
  ) {
    return text.categoryRoad;
  }

  if (normalized.includes("electric")) {
    return text.categoryElectricity;
  }

  if (normalized.includes("health")) {
    return text.categoryHealth;
  }

  if (normalized.includes("school")) {
    return text.categorySchool;
  }

  if (normalized.includes("irrigation")) {
    return text.categoryIrrigation;
  }

  if (normalized.includes("ration")) {
    return text.categoryRation;
  }

  if (normalized.includes("water")) {
    return text.categoryWater;
  }

  if (normalized.includes("sanitation")) {
    return text.categorySanitation;
  }

  return text.categoryOther;
}

function getPriorityText(
  priority: string,
  text: TrackText,
): string {
  const normalized = priority.trim().toLowerCase();

  if (normalized === "high") {
    return text.priorityHigh;
  }

  if (normalized === "low") {
    return text.priorityLow;
  }

  return text.priorityMedium;
}

/* =========================================================
   PAGE
========================================================= */

function TrackPage() {
  const { lang } = useI18n();

  const text = trackTranslations[lang];

  const [trackingId, setTrackingId] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* =======================================================
     SEARCH REPORT
  ======================================================= */

  const searchReport = async (
    idFromUrl?: string,
  ) => {
    setMessage("");
    setReport(null);

    const id = (
      idFromUrl || trackingId
    )
      .trim()
      .toUpperCase();

    if (!id) {
      setMessage(text.pleaseEnter);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("reports")
        .select(`
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
          longitude
        `)
        .eq("tracking_id", id)
        .maybeSingle();

      if (error) {
        console.error(
          "TRACKING ERROR:",
          error,
        );

        setMessage(text.unableToFind);
        return;
      }

      if (!data) {
        setMessage(text.noReport);
        return;
      }

      setReport(data);
    } catch (error) {
      console.error(
        "TRACKING ERROR:",
        error,
      );

      setMessage(text.somethingWrong);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     URL TRACKING ID
  ======================================================= */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const urlTrackingId =
      params.get("trackingId");

    if (urlTrackingId) {
      const id = urlTrackingId
        .trim()
        .toUpperCase();

      setTrackingId(id);

      searchReport(id);
    }
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <PageHeader
        icon={Search}
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <Section>
        <div className="mx-auto max-w-3xl space-y-6">

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                {text.enterTrackingId}
              </CardTitle>

              <CardDescription>
                {text.example}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3 sm:flex-row">

                <Input
                  value={trackingId}
                  onChange={(event) =>
                    setTrackingId(
                      event.target.value,
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      searchReport();
                    }
                  }}
                  placeholder={text.placeholder}
                  className="sm:flex-1"
                />

                <Button
                  type="button"
                  onClick={() =>
                    searchReport()
                  }
                  disabled={loading}
                >
                  <Search className="size-4" />

                  {loading
                    ? text.searching
                    : text.trackReport}
                </Button>
              </div>

              {message && (
                <div className="mt-4 rounded-lg bg-secondary p-3 text-sm">
                  {message}
                </div>
              )}
            </CardContent>
          </Card>

          {/* =================================================
              REPORT
          ================================================= */}

          {report && (
            <Card className="shadow-soft">

              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div>
                    <CardTitle className="text-lg">
                      {report.title}
                    </CardTitle>

                    <CardDescription>
                      Tracking ID:{" "}
                      {report.tracking_id}
                    </CardDescription>
                  </div>

                  <Badge>
                    {getStatusText(
                      report.status,
                      text,
                    )}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* =================================================
                    BASIC DETAILS
                ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      {text.category}
                    </p>

                    <p className="mt-1 font-medium">
                      {getCategoryText(
                        report.category,
                        text,
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      {text.villageWard}
                    </p>

                    <p className="mt-1 font-medium">
                      {report.village}
                    </p>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      {text.department}
                    </p>

                    <div className="mt-1 flex items-center gap-2 font-medium">
                      <Building2 className="size-4" />

                      {report.department ||
                        text.notAssigned}
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      {text.priority}
                    </p>

                    <p className="mt-1 font-medium">
                      {getPriorityText(
                        report.priority,
                        text,
                      )}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div>
                  <p className="mb-2 text-sm font-medium">
                    {text.problemDescription}
                  </p>

                  <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                    {report.description}
                  </div>
                </div>

                {/* =================================================
                    PROGRESS
                ================================================= */}

                <div>
                  <p className="mb-3 text-sm font-medium">
                    {text.reportProgress}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">

                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <CheckCircle className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          {text.reported}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {text.reportReceived}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Clock className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          {getStatusText(
                            report.status,
                            text,
                          )}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {text.currentStatus}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <Building2 className="size-5" />

                      <div>
                        <p className="text-sm font-medium">
                          {text.departmentStatus}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {report.department ||
                            text.pending}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* =================================================
                    PHOTO
                ================================================= */}

                {report.photo_url && (
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      {text.uploadedPhoto}
                    </p>

                    <img
                      src={report.photo_url}
                      alt={text.reportedIssue}
                      className="max-h-80 w-full rounded-lg object-cover"
                    />
                  </div>
                )}

                {/* =================================================
                    LOCATION
                ================================================= */}

                {report.latitude !== null &&
                  report.longitude !== null && (
                    <div className="rounded-lg bg-secondary p-4">

                      <p className="text-sm font-medium">
                        {text.location}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {text.latitude}:{" "}
                        {report.latitude}

                        <br />

                        {text.longitude}:{" "}
                        {report.longitude}
                      </p>

                    </div>
                  )}

                {/* =================================================
                    PHONE
                ================================================= */}

                {report.phone && (
                  <div className="rounded-lg bg-secondary p-4">

                    <p className="text-sm font-medium">
                      {text.contactNumber}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {report.phone}
                    </p>

                  </div>
                )}

              </CardContent>
            </Card>
          )}
        </div>
        </Section>
      </main>

    </div>
  );
}