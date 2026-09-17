import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Megaphone, Camera, MapPin } from "lucide-react";

import { useI18n, useT } from "@/lib/i18n";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      {
        title: "Rural Issue Reporting — GramSahay AI",
      },
      {
        name: "description",
        content:
          "Report broken roads, water shortages, power cuts and health gaps.",
      },
    ],
  }),
  component: ReportPage,
});

const categories = [
  "Road & bridge",
  "Drinking water",
  "Electricity",
  "Health & sanitation",
  "School & anganwadi",
  "Irrigation canal",
  "Ration & PDS",
  "Other",
];

const categoryLabels = {
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
    "Ration & PDS": "राशन और पीडीएस",
    Other: "अन्य",
  },
  mr: {
    "Road & bridge": "रस्ता आणि पूल",
    "Drinking water": "पिण्याचे पाणी",
    Electricity: "वीज",
    "Health & sanitation": "आरोग्य आणि स्वच्छता",
    "School & anganwadi": "शाळा आणि अंगणवाडी",
    "Irrigation canal": "सिंचन कालवा",
    "Ration & PDS": "रेशन आणि पीडीएस",
    Other: "इतर",
  },
  ta: {
    "Road & bridge": "சாலை மற்றும் பாலம்",
    "Drinking water": "குடிநீர்",
    Electricity: "மின்சாரம்",
    "Health & sanitation": "சுகாதாரம் மற்றும் தூய்மை",
    "School & anganwadi": "பள்ளி மற்றும் அங்கன்வாடி",
    "Irrigation canal": "பாசன கால்வாய்",
    "Ration & PDS": "ரேஷன் மற்றும் பி.டி.எஸ்",
    Other: "மற்றவை",
  },
  kn: {
    "Road & bridge": "ರಸ್ತೆ ಮತ್ತು ಸೇತುವೆ",
    "Drinking water": "ಕುಡಿಯುವ ನೀರು",
    Electricity: "ವಿದ್ಯುತ್",
    "Health & sanitation": "ಆರೋಗ್ಯ ಮತ್ತು ನೈರ್ಮಲ್ಯ",
    "School & anganwadi": "ಶಾಲೆ ಮತ್ತು ಅಂಗನವಾಡಿ",
    "Irrigation canal": "ನೀರಾವರಿ ಕಾಲುವೆ",
    "Ration & PDS": "ಪಡಿತರ ಮತ್ತು ಪಿಡಿಎಸ್",
    Other: "ಇತರೆ",
  },
  bn: {
    "Road & bridge": "রাস্তা ও সেতু",
    "Drinking water": "পানীয় জল",
    Electricity: "বিদ্যুৎ",
    "Health & sanitation": "স্বাস্থ্য ও পরিচ্ছন্নতা",
    "School & anganwadi": "স্কুল ও অঙ্গনওয়াড়ি",
    "Irrigation canal": "সেচ খাল",
    "Ration & PDS": "রেশন ও পিডিএস",
    Other: "অন্যান্য",
  },
} as const;

const reportPageText = {
  en: {
    howItWorks: "How it works",
    report: "Report",
    reportDesc: "Add a short description of the problem.",
    route: "Route",
    routeDesc: "The issue is sent to the appropriate department.",
    track: "Track",
    trackDesc: "Follow the status of your submitted report.",
    resolve: "Resolve",
    resolveDesc: "The department works on resolving the issue.",
    reportStatus: "Report status",
    open: "Open",
    openDesc: "New reports will appear here after submission.",
    submitting: "Submitting...",
    required: "Please fill all required fields.",
    locationUnsupported: "Location is not supported by this browser.",
    locationFailed: "Unable to get your location.",
    photoFailed: "Failed to upload photo. Please try again.",
    submitFailed: "Failed to submit report. Please try again.",
    somethingWrong: "Something went wrong. Please try again.",
    submitted: "Report submitted successfully! Your tracking ID is",
    latitude: "Latitude",
    longitude: "Longitude",
  },
  te: {
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    report: "నివేదించండి",
    reportDesc: "సమస్యకు సంక్షిప్త వివరణను జోడించండి.",
    route: "పంపండి",
    routeDesc: "సమస్య సంబంధిత శాఖకు పంపబడుతుంది.",
    track: "ట్రాక్ చేయండి",
    trackDesc: "మీరు సమర్పించిన నివేదిక స్థితిని తెలుసుకోండి.",
    resolve: "పరిష్కారం",
    resolveDesc: "శాఖ సమస్యను పరిష్కరించడానికి చర్యలు తీసుకుంటుంది.",
    reportStatus: "నివేదిక స్థితి",
    open: "తెరిచి ఉంది",
    openDesc: "సమర్పించిన కొత్త నివేదికలు ఇక్కడ కనిపిస్తాయి.",
    submitting: "సమర్పిస్తోంది...",
    required: "దయచేసి అవసరమైన అన్ని వివరాలను పూరించండి.",
    locationUnsupported: "ఈ బ్రౌజర్‌లో లొకేషన్‌కు మద్దతు లేదు.",
    locationFailed: "మీ లొకేషన్‌ను పొందలేకపోయాము.",
    photoFailed: "ఫోటోను అప్‌లోడ్ చేయడం విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    submitFailed: "నివేదికను సమర్పించడం విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    somethingWrong: "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    submitted: "నివేదిక విజయవంతంగా సమర్పించబడింది! మీ ట్రాకింగ్ నంబర్",
    latitude: "అక్షాంశం",
    longitude: "రేఖాంశం",
  },
  hi: {
    howItWorks: "यह कैसे काम करता है",
    report: "रिपोर्ट करें",
    reportDesc: "समस्या का संक्षिप्त विवरण जोड़ें।",
    route: "भेजें",
    routeDesc: "समस्या संबंधित विभाग को भेजी जाती है।",
    track: "ट्रैक करें",
    trackDesc: "अपनी जमा की गई रिपोर्ट की स्थिति देखें।",
    resolve: "समाधान",
    resolveDesc: "विभाग समस्या को हल करने के लिए काम करता है।",
    reportStatus: "रिपोर्ट की स्थिति",
    open: "खुली",
    openDesc: "जमा की गई नई रिपोर्ट यहाँ दिखाई देंगी।",
    submitting: "जमा हो रही है...",
    required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    locationUnsupported: "इस ब्राउज़र में लोकेशन समर्थित नहीं है।",
    locationFailed: "आपकी लोकेशन प्राप्त नहीं हो सकी।",
    photoFailed: "फ़ोटो अपलोड नहीं हो सकी। कृपया फिर से प्रयास करें।",
    submitFailed: "रिपोर्ट जमा नहीं हो सकी। कृपया फिर से प्रयास करें।",
    somethingWrong: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
    submitted: "रिपोर्ट सफलतापूर्वक जमा हो गई! आपका ट्रैकिंग नंबर",
    latitude: "अक्षांश",
    longitude: "देशांतर",
  },
  mr: {
    howItWorks: "हे कसे कार्य करते",
    report: "तक्रार नोंदवा",
    reportDesc: "समस्येचे थोडक्यात वर्णन जोडा.",
    route: "पाठवा",
    routeDesc: "समस्या संबंधित विभागाकडे पाठवली जाते.",
    track: "ट्रॅक करा",
    trackDesc: "तुमच्या सादर केलेल्या तक्रारीची स्थिती पाहा.",
    resolve: "निराकरण",
    resolveDesc: "विभाग समस्या सोडवण्यासाठी काम करतो.",
    reportStatus: "तक्रारीची स्थिती",
    open: "उघडी",
    openDesc: "सादर केलेल्या नवीन तक्रारी येथे दिसतील.",
    submitting: "सादर करत आहे...",
    required: "कृपया सर्व आवश्यक माहिती भरा.",
    locationUnsupported: "या ब्राउझरमध्ये लोकेशन समर्थित नाही.",
    locationFailed: "तुमचे लोकेशन मिळवता आले नाही.",
    photoFailed: "फोटो अपलोड करता आला नाही. कृपया पुन्हा प्रयत्न करा.",
    submitFailed: "तक्रार सादर करता आली नाही. कृपया पुन्हा प्रयत्न करा.",
    somethingWrong: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
    submitted: "तक्रार यशस्वीरित्या सादर झाली! तुमचा ट्रॅकिंग नंबर",
    latitude: "अक्षांश",
    longitude: "रेखांश",
  },
  ta: {
    howItWorks: "இது எப்படி செயல்படுகிறது",
    report: "புகாரளிக்கவும்",
    reportDesc: "பிரச்சினையின் சுருக்கமான விளக்கத்தைச் சேர்க்கவும்.",
    route: "அனுப்பவும்",
    routeDesc: "பிரச்சினை தொடர்புடைய துறைக்கு அனுப்பப்படுகிறது.",
    track: "கண்காணிக்கவும்",
    trackDesc: "நீங்கள் சமர்ப்பித்த புகாரின் நிலையைப் பார்க்கவும்.",
    resolve: "தீர்வு",
    resolveDesc: "துறையினர் பிரச்சினையைத் தீர்க்க நடவடிக்கை எடுப்பார்கள்.",
    reportStatus: "புகார் நிலை",
    open: "திறந்துள்ளது",
    openDesc: "சமர்ப்பிக்கப்பட்ட புதிய புகார்கள் இங்கே தோன்றும்.",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    required: "தேவையான அனைத்து புலங்களையும் நிரப்பவும்.",
    locationUnsupported: "இந்த உலாவியில் இருப்பிட வசதி ஆதரிக்கப்படவில்லை.",
    locationFailed: "உங்கள் இருப்பிடத்தைப் பெற முடியவில்லை.",
    photoFailed: "புகைப்படத்தைப் பதிவேற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    submitFailed: "புகாரைச் சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    somethingWrong: "ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
    submitted: "புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! உங்கள் கண்காணிப்பு எண்",
    latitude: "அட்சரேகை",
    longitude: "தீர்க்கரேகை",
  },
  kn: {
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    report: "ವರದಿ ಮಾಡಿ",
    reportDesc: "ಸಮಸ್ಯೆಯ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆಯನ್ನು ಸೇರಿಸಿ.",
    route: "ರವಾನಿಸಿ",
    routeDesc: "ಸಮಸ್ಯೆಯನ್ನು ಸಂಬಂಧಿತ ಇಲಾಖೆಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
    track: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    trackDesc: "ನೀವು ಸಲ್ಲಿಸಿದ ವರದಿಯ ಸ್ಥಿತಿಯನ್ನು ನೋಡಿ.",
    resolve: "ಪರಿಹಾರ",
    resolveDesc: "ಇಲಾಖೆಯು ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ಕ್ರಮ ಕೈಗೊಳ್ಳುತ್ತದೆ.",
    reportStatus: "ವರದಿ ಸ್ಥಿತಿ",
    open: "ತೆರೆದಿದೆ",
    openDesc: "ಸಲ್ಲಿಸಿದ ಹೊಸ ವರದಿಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
    submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    required: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    locationUnsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳ ಸೌಲಭ್ಯ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
    locationFailed: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    photoFailed: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    submitFailed: "ವರದಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    somethingWrong: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    submitted: "ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ನಿಮ್ಮ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ",
    latitude: "ಅಕ್ಷಾಂಶ",
    longitude: "ರೇಖಾಂಶ",
  },
  bn: {
    howItWorks: "এটি কীভাবে কাজ করে",
    report: "রিপোর্ট করুন",
    reportDesc: "সমস্যার একটি সংক্ষিপ্ত বিবরণ যোগ করুন।",
    route: "পাঠান",
    routeDesc: "সমস্যাটি সংশ্লিষ্ট বিভাগে পাঠানো হয়।",
    track: "ট্র্যাক করুন",
    trackDesc: "আপনার জমা দেওয়া রিপোর্টের অবস্থা দেখুন।",
    resolve: "সমাধান",
    resolveDesc: "বিভাগটি সমস্যা সমাধানের জন্য কাজ করে।",
    reportStatus: "রিপোর্টের অবস্থা",
    open: "খোলা",
    openDesc: "জমা দেওয়া নতুন রিপোর্ট এখানে দেখা যাবে।",
    submitting: "জমা হচ্ছে...",
    required: "অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন।",
    locationUnsupported: "এই ব্রাউজারে লোকেশন সমর্থিত নয়।",
    locationFailed: "আপনার লোকেশন পাওয়া যায়নি।",
    photoFailed: "ছবি আপলোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    submitFailed: "রিপোর্ট জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    somethingWrong: "কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    submitted: "রিপোর্ট সফলভাবে জমা হয়েছে! আপনার ট্র্যাকিং নম্বর",
    latitude: "অক্ষাংশ",
    longitude: "দ্রাঘিমাংশ",
  },
} as const;

function ReportPage() {
  const t = useT();

  // IMPORTANT:
  // This is the currently selected website language.
  // Example: en, te, hi, mr, ta, kn, bn
  const { lang } = useI18n();

  const textByLanguage =
    reportPageText[lang as keyof typeof reportPageText] ?? reportPageText.en;
  const labelsByLanguage =
    categoryLabels[lang as keyof typeof categoryLabels] ?? categoryLabels.en;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setMessage(textByLanguage.locationUnsupported);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setMessage(t("page.report.locationAdded"));
      },
      (error) => {
        console.error("LOCATION ERROR:", error);
        setMessage(textByLanguage.locationFailed);
      },
    );
  };

  const formatIndianPhone = (value: string): string | null => {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      return null;
    }

    if (digits.length === 10) {
      return `+91${digits}`;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
      return `+${digits}`;
    }

    if (value.trim().startsWith("+") && digits.length >= 10) {
      return `+${digits}`;
    }

    return null;
  };

  const submitReport = async () => {
    setMessage("");

    if (!title.trim() || !category || !village.trim() || !description.trim()) {
      setMessage(textByLanguage.required);
      return;
    }

    setLoading(true);

    const trackingId = `GS-${Date.now().toString().slice(-6)}`;

    let photoUrl: string | null = null;

    try {
      // -----------------------------------------
      // 1. Upload photo
      // -----------------------------------------
      if (photo) {
        const fileExt = photo.name.split(".").pop() || "jpg";
        const fileName = `${trackingId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("report-photos")
          .upload(fileName, photo);

        if (uploadError) {
          console.error("PHOTO UPLOAD ERROR:", uploadError);
          setMessage(textByLanguage.photoFailed);
          return;
        }

        const { data } = supabase.storage
          .from("report-photos")
          .getPublicUrl(fileName);

        photoUrl = data.publicUrl;
      }

      // -----------------------------------------
      // 2. Format phone
      // -----------------------------------------
      const formattedPhone = formatIndianPhone(phone);

      // -----------------------------------------
      // 3. Save report
      // -----------------------------------------
      //
      // IMPORTANT:
      // `language: lang` stores the language selected
      // by the citizen at the time of submission.
      //
      const { error } = await supabase.from("reports").insert([
        {
          tracking_id: trackingId,
          title: title.trim(),
          category,
          village: village.trim(),
          description: description.trim(),
          phone: formattedPhone,
          status: "Open",
          priority: "Medium",
          photo_url: photoUrl,

          // ⭐ THIS IS THE IMPORTANT PART
          language: lang,

          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
        },
      ]);

      if (error) {
        console.error("REPORT INSERT ERROR:", error);
        setMessage(textByLanguage.submitFailed);
        return;
      }

      // -----------------------------------------
      // 4. Send submission SMS
      // -----------------------------------------
      //
      // The SAME language is sent to the Edge Function.
      //
      // -----------------------------------------
      // 4. Send submission SMS
      // -----------------------------------------
      // A 10-digit Indian number is automatically converted
      // to +91XXXXXXXXXX by formatIndianPhone().
      if (formattedPhone) {
        console.log("SMS REQUEST:", {
          phone: formattedPhone,
          tracking_id: trackingId,
          language: lang,
        });

        try {
          const { data: smsData, error: smsError } =
            await supabase.functions.invoke("send-report-sms", {
              body: {
                phone: formattedPhone,
                tracking_id: trackingId,
                title: title.trim(),
                status: "Open",
                language: lang,
              },
            });

          if (smsError) {
            console.error("SMS FUNCTION ERROR:", smsError);
            setMessage(
              `⚠️ ${textByLanguage.submitted} ${trackingId}. SMS could not be sent.`,
            );
          } else {
            console.log("SMS SENT SUCCESSFULLY:", smsData);
          }
        } catch (smsException) {
          console.error("SMS INVOKE EXCEPTION:", smsException);
          setMessage(
            `⚠️ ${textByLanguage.submitted} ${trackingId}. SMS could not be sent.`,
          );
        }
      } else if (phone.trim()) {
        console.error("INVALID PHONE NUMBER:", phone);
        setMessage(
          `⚠️ ${textByLanguage.submitted} ${trackingId}. Invalid phone number; SMS was not sent.`,
        );
      }

      // -----------------------------------------
      // 5. Success
      // -----------------------------------------
      setMessage(`✅ ${textByLanguage.submitted} ${trackingId}`);

      setTitle("");
      setCategory("");
      setVillage("");
      setPhone("");
      setDescription("");
      setPhoto(null);
      setLocation(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("SUBMIT REPORT ERROR:", error);
      setMessage(textByLanguage.somethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        icon={Megaphone}
        eyebrow={t("page.report.eyebrow")}
        title={t("nav.report")}
        description={t("page.report.description")}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                {t("page.report.formTitle")}
              </CardTitle>

              <CardDescription>
                {t("page.report.formDescription")}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Issue title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {t("page.report.issueTitle")} *
                  </Label>

                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t(
                      "page.report.issueTitlePlaceholder",
                    )}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>
                    {t("page.report.category")} *
                  </Label>

                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "page.report.selectCategory",
                        )}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {labelsByLanguage[c as keyof typeof labelsByLanguage]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Village */}
                <div className="space-y-2">
                  <Label htmlFor="village">
                    {t("page.report.village")} *
                  </Label>

                  <Input
                    id="village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={t(
                      "page.report.villagePlaceholder",
                    )}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("page.report.phone")}
                  </Label>

                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="desc">
                  {t("page.report.descriptionLabel")} *
                </Label>

                <Textarea
                  id="desc"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t(
                    "page.report.descriptionPlaceholder",
                  )}
                />
              </div>

              {/* Message */}
              {message && (
                <div className="rounded-lg bg-secondary p-3 text-sm">
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setPhoto(e.target.files?.[0] || null)
                  }
                />

                <Button
                  variant="outline"
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  <Camera className="size-4" />

                  {photo
                    ? photo.name
                    : t("page.report.addPhoto")}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  onClick={getLocation}
                >
                  <MapPin className="size-4" />

                  {location
                    ? t("page.report.locationAdded")
                    : t("page.report.useLocation")}
                </Button>

                <Button
                  type="button"
                  className="sm:ml-auto"
                  onClick={submitReport}
                  disabled={loading}
                >
                  {loading
                    ? textByLanguage.submitting
                    : t("page.report.submit")}
                </Button>
              </div>

              {/* Location information */}
              {location && (
                <div className="rounded-lg bg-secondary p-3 text-sm">
                  <p className="font-medium">
                    {t("page.report.location")}
                  </p>

                  <p className="text-muted-foreground">
                    {textByLanguage.latitude}: {location.latitude}
                    <br />
                    {textByLanguage.longitude}: {location.longitude}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* How it works */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-base">
                {textByLanguage.howItWorks}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {[
                {
                  title: textByLanguage.report,
                  description: textByLanguage.reportDesc,
                },
                {
                  title: textByLanguage.route,
                  description: textByLanguage.routeDesc,
                },
                {
                  title: textByLanguage.track,
                  description: textByLanguage.trackDesc,
                },
                {
                  title: textByLanguage.resolve,
                  description: textByLanguage.resolveDesc,
                },
              ].map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                    {i + 1}
                  </span>

                  <div>
                    <p className="font-medium">
                      {step.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title={textByLanguage.reportStatus}>
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Badge>{textByLanguage.open}</Badge>

              <p className="text-sm text-muted-foreground">
                {textByLanguage.openDesc}
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}