import { createFileRoute } from "@tanstack/react-router";
import {
  LifeBuoy,
  Phone,
  HeartPulse,
  Landmark,
  Bus,
  GraduationCap,
  Tractor,
  Shield,
  Flame,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Essential Services — GramSahay AI" },
      {
        name: "description",
        content:
          "Helplines, health centres, banks, transport, veterinary and emergency contacts for your village and block.",
      },
      {
        property: "og:title",
        content: "Essential Services — GramSahay AI",
      },
      {
        property: "og:description",
        content:
          "Every important rural contact and facility in one directory.",
      },
    ],
  }),
  component: ServicesPage,
});

/* =========================================================
   TYPES
========================================================= */

type LanguageCode = "en" | "te" | "hi" | "mr" | "ta" | "kn" | "bn";

type LocalizedHelpline = {
  icon: typeof Phone;
  name: string;
  number: string;
  note: string;
};

type LocalizedFacility = {
  icon: typeof HeartPulse;
  title: string;
  detail: string;
  tag: string;
};

/* =========================================================
   PAGE TRANSLATIONS
========================================================= */

const servicesText: Record<
  LanguageCode,
  {
    emergency: string;
    nearby: string;
    location: string;
    helplines: LocalizedHelpline[];
    facilities: LocalizedFacility[];
  }
> = {
  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    emergency: "Emergency helplines",
    nearby: "Nearby facilities",
    location: "Rampur village, Sinnar block, Nashik district.",

    helplines: [
      {
        icon: Phone,
        name: "Kisan Call Centre",
        number: "1800-180-1551",
        note: "Agri advice, 6am–10pm",
      },
      {
        icon: HeartPulse,
        name: "Ambulance",
        number: "108",
        note: "24×7 emergency",
      },
      {
        icon: Shield,
        name: "Police",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "Fire & rescue",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "Primary Health Centre, Rampur",
        detail: "OPD 9am–2pm · Doctor Mon–Sat · 4.2 km",
        tag: "Health",
      },
      {
        icon: Landmark,
        title: "Bank of Maharashtra, Sinnar branch",
        detail: "KCC, PM-Kisan enrolment · 9.6 km",
        tag: "Banking",
      },
      {
        icon: Tractor,
        title: "Custom Hiring Centre",
        detail: "Tractor ₹700/hr, rotavator ₹450/hr · 3.1 km",
        tag: "Machinery",
      },
      {
        icon: Bus,
        title: "ST Bus Stand, Sinnar",
        detail: "Nashik every 30 min from 5:30am · 9.2 km",
        tag: "Transport",
      },
      {
        icon: GraduationCap,
        title: "Zilla Parishad School",
        detail: "Class 1–8 · Mid-day meal · 1.4 km",
        tag: "Education",
      },
      {
        icon: HeartPulse,
        title: "Veterinary Dispensary",
        detail: "Cattle care Tue & Fri camps · 5.8 km",
        tag: "Livestock",
      },
    ],
  },

  /* =======================================================
     TELUGU
  ======================================================= */

  te: {
    emergency: "అత్యవసర సహాయ నంబర్లు",
    nearby: "సమీపంలోని సేవా కేంద్రాలు",
    location: "రాంపూర్ గ్రామం, సిన్నార్ బ్లాక్, నాసిక్ జిల్లా.",

    helplines: [
      {
        icon: Phone,
        name: "కిసాన్ కాల్ సెంటర్",
        number: "1800-180-1551",
        note: "వ్యవసాయ సలహా, ఉదయం 6–రాత్రి 10",
      },
      {
        icon: HeartPulse,
        name: "అంబులెన్స్",
        number: "108",
        note: "24×7 అత్యవసర సేవ",
      },
      {
        icon: Shield,
        name: "పోలీసు",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "అగ్నిమాపక & రక్షణ",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "ప్రాథమిక ఆరోగ్య కేంద్రం, రాంపూర్",
        detail: "OPD ఉదయం 9–మధ్యాహ్నం 2 · వైద్యుడు సోమ–శని · 4.2 కి.మీ",
        tag: "ఆరోగ్యం",
      },
      {
        icon: Landmark,
        title: "బ్యాంక్ ఆఫ్ మహారాష్ట్ర, సిన్నార్ శాఖ",
        detail: "KCC, PM-Kisan నమోదు · 9.6 కి.మీ",
        tag: "బ్యాంకింగ్",
      },
      {
        icon: Tractor,
        title: "కస్టమ్ హైరింగ్ సెంటర్",
        detail: "ట్రాక్టర్ ₹700/గంట, రోటావేటర్ ₹450/గంట · 3.1 కి.మీ",
        tag: "యంత్రాలు",
      },
      {
        icon: Bus,
        title: "ST బస్ స్టాండ్, సిన్నార్",
        detail: "నాసిక్‌కు ప్రతి 30 నిమిషాలకు బస్సు, ఉదయం 5:30 నుంచి · 9.2 కి.మీ",
        tag: "రవాణా",
      },
      {
        icon: GraduationCap,
        title: "జిల్లా పరిషత్ పాఠశాల",
        detail: "1–8 తరగతులు · మధ్యాహ్న భోజనం · 1.4 కి.మీ",
        tag: "విద్య",
      },
      {
        icon: HeartPulse,
        title: "పశువైద్యశాల",
        detail: "పశువుల సంరక్షణ మంగళ, శుక్రవారాల్లో శిబిరాలు · 5.8 కి.మీ",
        tag: "పశుసంరక్షణ",
      },
    ],
  },

  /* =======================================================
     HINDI
  ======================================================= */

  hi: {
    emergency: "आपातकालीन हेल्पलाइन",
    nearby: "नजदीकी सुविधाएं",
    location: "रामपुर गांव, सिन्नर ब्लॉक, नासिक जिला।",

    helplines: [
      {
        icon: Phone,
        name: "किसान कॉल सेंटर",
        number: "1800-180-1551",
        note: "कृषि सलाह, सुबह 6–रात 10 बजे",
      },
      {
        icon: HeartPulse,
        name: "एम्बुलेंस",
        number: "108",
        note: "24×7 आपातकालीन सेवा",
      },
      {
        icon: Shield,
        name: "पुलिस",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "अग्निशमन एवं बचाव",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "प्राथमिक स्वास्थ्य केंद्र, रामपुर",
        detail: "OPD सुबह 9–दोपहर 2 · डॉक्टर सोम–शनि · 4.2 किमी",
        tag: "स्वास्थ्य",
      },
      {
        icon: Landmark,
        title: "बैंक ऑफ महाराष्ट्र, सिन्नर शाखा",
        detail: "KCC, PM-Kisan नामांकन · 9.6 किमी",
        tag: "बैंकिंग",
      },
      {
        icon: Tractor,
        title: "कस्टम हायरिंग सेंटर",
        detail: "ट्रैक्टर ₹700/घंटा, रोटावेटर ₹450/घंटा · 3.1 किमी",
        tag: "मशीनरी",
      },
      {
        icon: Bus,
        title: "ST बस स्टैंड, सिन्नर",
        detail: "नासिक के लिए हर 30 मिनट में बस, सुबह 5:30 बजे से · 9.2 किमी",
        tag: "परिवहन",
      },
      {
        icon: GraduationCap,
        title: "जिला परिषद स्कूल",
        detail: "कक्षा 1–8 · मध्याह्न भोजन · 1.4 किमी",
        tag: "शिक्षा",
      },
      {
        icon: HeartPulse,
        title: "पशु चिकित्सा औषधालय",
        detail: "पशु देखभाल मंगलवार और शुक्रवार शिविर · 5.8 किमी",
        tag: "पशुधन",
      },
    ],
  },

  /* =======================================================
     MARATHI
  ======================================================= */

  mr: {
    emergency: "आपत्कालीन हेल्पलाइन",
    nearby: "जवळील सुविधा",
    location: "रामपूर गाव, सिन्नर ब्लॉक, नाशिक जिल्हा.",

    helplines: [
      {
        icon: Phone,
        name: "किसान कॉल सेंटर",
        number: "1800-180-1551",
        note: "कृषी सल्ला, सकाळी 6–रात्री 10",
      },
      {
        icon: HeartPulse,
        name: "रुग्णवाहिका",
        number: "108",
        note: "24×7 आपत्कालीन सेवा",
      },
      {
        icon: Shield,
        name: "पोलीस",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "अग्निशमन व बचाव",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "प्राथमिक आरोग्य केंद्र, रामपूर",
        detail: "OPD सकाळी 9–दुपारी 2 · डॉक्टर सोम–शनि · 4.2 किमी",
        tag: "आरोग्य",
      },
      {
        icon: Landmark,
        title: "बँक ऑफ महाराष्ट्र, सिन्नर शाखा",
        detail: "KCC, PM-Kisan नोंदणी · 9.6 किमी",
        tag: "बँकिंग",
      },
      {
        icon: Tractor,
        title: "कस्टम हायरिंग सेंटर",
        detail: "ट्रॅक्टर ₹700/तास, रोटाव्हेटर ₹450/तास · 3.1 किमी",
        tag: "यंत्रसामग्री",
      },
      {
        icon: Bus,
        title: "ST बस स्थानक, सिन्नर",
        detail: "नाशिकसाठी दर 30 मिनिटांनी बस, सकाळी 5:30 पासून · 9.2 किमी",
        tag: "वाहतूक",
      },
      {
        icon: GraduationCap,
        title: "जिल्हा परिषद शाळा",
        detail: "इयत्ता 1–8 · मध्यान्ह भोजन · 1.4 किमी",
        tag: "शिक्षण",
      },
      {
        icon: HeartPulse,
        title: "पशुवैद्यकीय दवाखाना",
        detail: "गुरांची देखभाल मंगळवार व शुक्रवार शिबिरे · 5.8 किमी",
        tag: "पशुधन",
      },
    ],
  },

  /* =======================================================
     TAMIL
  ======================================================= */

  ta: {
    emergency: "அவசர உதவி எண்கள்",
    nearby: "அருகிலுள்ள வசதிகள்",
    location: "ராம்பூர் கிராமம், சின்னார் வட்டாரம், நாசிக் மாவட்டம்.",

    helplines: [
      {
        icon: Phone,
        name: "கிசான் அழைப்பு மையம்",
        number: "1800-180-1551",
        note: "விவசாய ஆலோசனை, காலை 6–இரவு 10",
      },
      {
        icon: HeartPulse,
        name: "ஆம்புலன்ஸ்",
        number: "108",
        note: "24×7 அவசர சேவை",
      },
      {
        icon: Shield,
        name: "காவல்துறை",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "தீயணைப்பு மற்றும் மீட்பு",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "முதன்மை சுகாதார மையம், ராம்பூர்",
        detail: "OPD காலை 9–மதியம் 2 · மருத்துவர் திங்கள்–சனி · 4.2 கி.மீ",
        tag: "சுகாதாரம்",
      },
      {
        icon: Landmark,
        title: "பாங்க் ஆஃப் மகாராஷ்டிரா, சின்னார் கிளை",
        detail: "KCC, PM-Kisan பதிவு · 9.6 கி.மீ",
        tag: "வங்கி",
      },
      {
        icon: Tractor,
        title: "கஸ்டம் ஹையரிங் மையம்",
        detail: "டிராக்டர் ₹700/மணி, ரோட்டாவேட்டர் ₹450/மணி · 3.1 கி.மீ",
        tag: "இயந்திரங்கள்",
      },
      {
        icon: Bus,
        title: "ST பேருந்து நிலையம், சின்னார்",
        detail: "நாசிக்கிற்கு 30 நிமிடத்திற்கு ஒரு பேருந்து, காலை 5:30 முதல் · 9.2 கி.மீ",
        tag: "போக்குவரத்து",
      },
      {
        icon: GraduationCap,
        title: "ஜில்லா பரிஷத் பள்ளி",
        detail: "1–8 வகுப்புகள் · மதிய உணவு · 1.4 கி.மீ",
        tag: "கல்வி",
      },
      {
        icon: HeartPulse,
        title: "கால்நடை மருந்தகம்",
        detail: "கால்நடை பராமரிப்பு செவ்வாய் மற்றும் வெள்ளி முகாம்கள் · 5.8 கி.மீ",
        tag: "கால்நடை",
      },
    ],
  },

  /* =======================================================
     KANNADA
  ======================================================= */

  kn: {
    emergency: "ತುರ್ತು ಸಹಾಯವಾಣಿ",
    nearby: "ಹತ್ತಿರದ ಸೌಲಭ್ಯಗಳು",
    location: "ರಾಮಪುರ ಗ್ರಾಮ, ಸಿನ್ನಾರ್ ಬ್ಲಾಕ್, ನಾಸಿಕ್ ಜಿಲ್ಲೆ.",

    helplines: [
      {
        icon: Phone,
        name: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್",
        number: "1800-180-1551",
        note: "ಕೃಷಿ ಸಲಹೆ, ಬೆಳಿಗ್ಗೆ 6–ರಾತ್ರಿ 10",
      },
      {
        icon: HeartPulse,
        name: "ಆಂಬ್ಯುಲೆನ್ಸ್",
        number: "108",
        note: "24×7 ತುರ್ತು ಸೇವೆ",
      },
      {
        icon: Shield,
        name: "ಪೊಲೀಸ್",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "ಅಗ್ನಿಶಾಮಕ ಮತ್ತು ರಕ್ಷಣಾ ಸೇವೆ",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ, ರಾಮಪುರ",
        detail: "OPD ಬೆಳಿಗ್ಗೆ 9–ಮಧ್ಯಾಹ್ನ 2 · ವೈದ್ಯರು ಸೋಮ–ಶನಿ · 4.2 ಕಿ.ಮೀ",
        tag: "ಆರೋಗ್ಯ",
      },
      {
        icon: Landmark,
        title: "ಬ್ಯಾಂಕ್ ಆಫ್ ಮಹಾರಾಷ್ಟ್ರ, ಸಿನ್ನಾರ್ ಶಾಖೆ",
        detail: "KCC, PM-Kisan ನೋಂದಣಿ · 9.6 ಕಿ.ಮೀ",
        tag: "ಬ್ಯಾಂಕಿಂಗ್",
      },
      {
        icon: Tractor,
        title: "ಕಸ್ಟಮ್ ಹೈರಿಂಗ್ ಕೇಂದ್ರ",
        detail: "ಟ್ರಾಕ್ಟರ್ ₹700/ಗಂಟೆ, ರೋಟಾವೇಟರ್ ₹450/ಗಂಟೆ · 3.1 ಕಿ.ಮೀ",
        tag: "ಯಂತ್ರೋಪಕರಣ",
      },
      {
        icon: Bus,
        title: "ST ಬಸ್ ನಿಲ್ದಾಣ, ಸಿನ್ನಾರ್",
        detail: "ನಾಸಿಕ್‌ಗೆ ಪ್ರತಿ 30 ನಿಮಿಷಕ್ಕೊಮ್ಮೆ ಬಸ್, ಬೆಳಿಗ್ಗೆ 5:30ರಿಂದ · 9.2 ಕಿ.ಮೀ",
        tag: "ಸಾರಿಗೆ",
      },
      {
        icon: GraduationCap,
        title: "ಜಿಲ್ಲಾ ಪರಿಷತ್ ಶಾಲೆ",
        detail: "1–8ನೇ ತರಗತಿಗಳು · ಮಧ್ಯಾಹ್ನದ ಊಟ · 1.4 ಕಿ.ಮೀ",
        tag: "ಶಿಕ್ಷಣ",
      },
      {
        icon: HeartPulse,
        title: "ಪಶುವೈದ್ಯಕೀಯ ಔಷಧಾಲಯ",
        detail: "ಜಾನುವಾರು ಆರೈಕೆ ಮಂಗಳವಾರ ಮತ್ತು ಶುಕ್ರವಾರ ಶಿಬಿರಗಳು · 5.8 ಕಿ.ಮೀ",
        tag: "ಜಾನುವಾರು",
      },
    ],
  },

  /* =======================================================
     BENGALI
  ======================================================= */

  bn: {
    emergency: "জরুরি হেল্পলাইন",
    nearby: "কাছাকাছি সুবিধা",
    location: "রামপুর গ্রাম, সিন্নার ব্লক, নাসিক জেলা।",

    helplines: [
      {
        icon: Phone,
        name: "কিষান কল সেন্টার",
        number: "1800-180-1551",
        note: "কৃষি পরামর্শ, সকাল 6টা–রাত 10টা",
      },
      {
        icon: HeartPulse,
        name: "অ্যাম্বুলেন্স",
        number: "108",
        note: "24×7 জরুরি পরিষেবা",
      },
      {
        icon: Shield,
        name: "পুলিশ",
        number: "100",
        note: "24×7",
      },
      {
        icon: Flame,
        name: "দমকল ও উদ্ধার",
        number: "101",
        note: "24×7",
      },
    ],

    facilities: [
      {
        icon: HeartPulse,
        title: "প্রাথমিক স্বাস্থ্য কেন্দ্র, রামপুর",
        detail: "OPD সকাল 9টা–দুপুর 2টা · ডাক্তার সোম–শনি · 4.2 কিমি",
        tag: "স্বাস্থ্য",
      },
      {
        icon: Landmark,
        title: "ব্যাঙ্ক অফ মহারাষ্ট্র, সিন্নার শাখা",
        detail: "KCC, PM-Kisan নথিভুক্তি · 9.6 কিমি",
        tag: "ব্যাঙ্কিং",
      },
      {
        icon: Tractor,
        title: "কাস্টম হায়ারিং সেন্টার",
        detail: "ট্রাক্টর ₹700/ঘণ্টা, রোটাভেটর ₹450/ঘণ্টা · 3.1 কিমি",
        tag: "যন্ত্রপাতি",
      },
      {
        icon: Bus,
        title: "ST বাস স্ট্যান্ড, সিন্নার",
        detail: "নাসিকের জন্য প্রতি 30 মিনিটে বাস, সকাল 5:30 থেকে · 9.2 কিমি",
        tag: "পরিবহন",
      },
      {
        icon: GraduationCap,
        title: "জিলা পরিষদ স্কুল",
        detail: "প্রথম–অষ্টম শ্রেণি · মধ্যাহ্নভোজ · 1.4 কিমি",
        tag: "শিক্ষা",
      },
      {
        icon: HeartPulse,
        title: "পশু চিকিৎসালয়",
        detail: "গবাদি পশুর যত্ন মঙ্গলবার ও শুক্রবার শিবির · 5.8 কিমি",
        tag: "পশুপালন",
      },
    ],
  },
};

/* =========================================================
   PAGE
========================================================= */

function ServicesPage() {
  const { lang, t } = useI18n();

  const language = (servicesText[lang as LanguageCode]
    ? lang
    : "en") as LanguageCode;

  const text = servicesText[language];

  return (
    <>
      <PageHeader
        icon={LifeBuoy}
        eyebrow={t("page.services.eyebrow")}
        title={t("nav.services")}
        description={t("page.services.description")}
      />

      {/* ===================================================
          EMERGENCY HELPLINES
      =================================================== */}

      <Section title={text.emergency}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {text.helplines.map((h) => (
            <a
              key={`${language}-${h.number}`}
              href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
              className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`${h.name}: ${h.number}`}
            >
              <Card className="card-hover shadow-soft cursor-pointer transition-transform hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <h.icon className="size-5" />
                  </span>

                  <CardTitle className="mt-3 text-base">
                    {h.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-xl font-semibold">
                    {h.number}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {h.note}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* ===================================================
          NEARBY FACILITIES
      =================================================== */}

      <Section
        title={text.nearby}
        description={text.location}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {text.facilities.map((f) => {
            const mapQuery = encodeURIComponent(
              `${f.title}, ${text.location}`,
            );

            return (
              <a
                key={`${language}-${f.title}`}
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`${f.title} — ${text.nearby}`}
              >
                <Card className="card-hover shadow-soft cursor-pointer transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                        <f.icon className="size-5" />
                      </span>

                      <Badge variant="secondary">
                        {f.tag}
                      </Badge>
                    </div>

                    <CardTitle className="mt-3 text-base leading-snug">
                      {f.title}
                    </CardTitle>

                    <CardDescription>
                      {f.detail}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}