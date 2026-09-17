import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Eraser,
  Mic,
  MicOff,
  Send,
  User,
  Leaf,
  Landmark,
  CloudSun,
  IndianRupee,
  Megaphone,
  Map,
  BookOpen,
  Phone,
  Search,
  LogOut,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { PageHeader, Section } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Rural Assistant — GramSahay AI" },
      {
        name: "description",
        content:
          "Ask farming, scheme and paperwork questions in your own language and get clear step-by-step answers.",
      },
      {
        property: "og:title",
        content: "AI Rural Assistant — GramSahay AI",
      },
      {
        property: "og:description",
        content:
          "A voice-first multilingual assistant for farmers and rural families.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

type LanguageCode =
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "kn"
  | "mr"
  | "bn";

type SpeechRecognitionResultEventLike = Event & {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEventLike = Event & {
  error: string;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

const greetings: Record<LanguageCode, string> = {
  en: "Namaste! I am your GramSahay assistant. Ask me about crops, weather, mandi prices or government schemes.",

  hi: "नमस्ते! मैं आपका ग्रामसहाय सहायक हूँ। फसल, मौसम, मंडी भाव या सरकारी योजनाओं के बारे में पूछें।",

  ta: "வணக்கம்! நான் உங்கள் கிராமசகாய் உதவியாளர். பயிர், வானிலை, சந்தை விலை அல்லது அரசு திட்டங்கள் பற்றி கேளுங்கள்.",

  te: "నమస్తే! నేను మీ గ్రామసహాయ్ సహాయకుడిని. పంటలు, వాతావరణం, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి అడగండి.",

  kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಗ್ರಾಮಸಹಾಯ್ ಸಹಾಯಕ. ಬೆಳೆ, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರ ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",

  mr: "नमस्कार! मी तुमचा ग्रामसहाय सहाय्यक आहे. पीक, हवामान, बाजारभाव किंवा सरकारी योजनांबद्दल विचारा.",

  bn: "নমস্কার! আমি আপনার গ্রামসহায় সহকারী। ফসল, আবহাওয়া, বাজারদর বা সরকারি প্রকল্প নিয়ে জিজ্ঞাসা করুন।",
};

const uiText: Record<
  LanguageCode,
  {
    chat: string;
    clear: string;
    placeholder: string;
    message: string;
    quickQuestions: string;
    voice: string;
    stopVoice: string;
    send: string;
    listening: string;
    voiceNotSupported: string;
  }
> = {
  en: {
    chat: "Chat",
    clear: "Clear",
    placeholder: "Ask about crops, weather, prices or schemes…",
    message: "Message",
    quickQuestions: "Quick questions",
    voice: "Voice input",
    stopVoice: "Stop voice input",
    send: "Send",
    listening: "Listening… Speak now",
    voiceNotSupported:
      "Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge.",
  },

  hi: {
    chat: "चैट",
    clear: "साफ़ करें",
    placeholder: "फसल, मौसम, भाव या योजनाओं के बारे में पूछें…",
    message: "संदेश",
    quickQuestions: "त्वरित प्रश्न",
    voice: "आवाज़ से पूछें",
    stopVoice: "आवाज़ बंद करें",
    send: "भेजें",
    listening: "सुन रहा हूँ… अब बोलें",
    voiceNotSupported:
      "इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। Google Chrome या Microsoft Edge का उपयोग करें।",
  },

  ta: {
    chat: "உரையாடல்",
    clear: "அழி",
    placeholder: "பயிர், வானிலை, விலை அல்லது திட்டங்கள் பற்றி கேளுங்கள்…",
    message: "செய்தி",
    quickQuestions: "விரைவான கேள்விகள்",
    voice: "குரல் உள்ளீடு",
    stopVoice: "குரலை நிறுத்து",
    send: "அனுப்பு",
    listening: "கேட்கிறேன்… இப்போது பேசுங்கள்",
    voiceNotSupported:
      "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. Google Chrome அல்லது Microsoft Edge பயன்படுத்தவும்.",
  },

  te: {
    chat: "చాట్",
    clear: "తొలగించండి",
    placeholder: "పంటలు, వాతావరణం, ధరలు లేదా పథకాల గురించి అడగండి…",
    message: "సందేశం",
    quickQuestions: "త్వరిత ప్రశ్నలు",
    voice: "వాయిస్ ఇన్‌పుట్",
    stopVoice: "వాయిస్ ఆపండి",
    send: "పంపండి",
    listening: "వింటున్నాను… ఇప్పుడు మాట్లాడండి",
    voiceNotSupported:
      "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. Google Chrome లేదా Microsoft Edge ఉపయోగించండి.",
  },

  kn: {
    chat: "ಚಾಟ್",
    clear: "ಅಳಿಸಿ",
    placeholder: "ಬೆಳೆ, ಹವಾಮಾನ, ಬೆಲೆ ಅಥವಾ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ…",
    message: "ಸಂದೇಶ",
    quickQuestions: "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು",
    voice: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    stopVoice: "ಧ್ವನಿಯನ್ನು ನಿಲ್ಲಿಸಿ",
    send: "ಕಳುಹಿಸಿ",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ… ಈಗ ಮಾತನಾಡಿ",
    voiceNotSupported:
      "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. Google Chrome ಅಥವಾ Microsoft Edge ಬಳಸಿ.",
  },

  mr: {
    chat: "चॅट",
    clear: "पुसा",
    placeholder: "पीक, हवामान, बाजारभाव किंवा योजनांबद्दल विचारा…",
    message: "संदेश",
    quickQuestions: "जलद प्रश्न",
    voice: "आवाज इनपुट",
    stopVoice: "आवाज थांबवा",
    send: "पाठवा",
    listening: "ऐकत आहे… आता बोला",
    voiceNotSupported:
      "या ब्राउझरमध्ये आवाज इनपुट समर्थित नाही. Google Chrome किंवा Microsoft Edge वापरा.",
  },

  bn: {
    chat: "চ্যাট",
    clear: "মুছুন",
    placeholder: "ফসল, আবহাওয়া, বাজারদর বা প্রকল্প সম্পর্কে জিজ্ঞাসা করুন…",
    message: "বার্তা",
    quickQuestions: "দ্রুত প্রশ্ন",
    voice: "ভয়েস ইনপুট",
    stopVoice: "ভয়েস বন্ধ করুন",
    send: "পাঠান",
    listening: "শুনছি… এখন বলুন",
    voiceNotSupported:
      "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়। Google Chrome বা Microsoft Edge ব্যবহার করুন।",
  },
};

const suggestions: Record<LanguageCode, string[]> = {
  en: [
    "When should I sow mustard this season?",
    "How do I apply for PM-Kisan?",
    "Best price for tomato near Nashik",
    "My wheat leaves are turning yellow",
    "Subsidy for drip irrigation",
    "Nearest veterinary camp this week",
  ],

  hi: [
    "इस मौसम में सरसों कब बोनी चाहिए?",
    "PM-Kisan के लिए आवेदन कैसे करें?",
    "नासिक के पास टमाटर का सबसे अच्छा भाव क्या है?",
    "मेरे गेहूं के पत्ते पीले हो रहे हैं",
    "ड्रिप सिंचाई के लिए सब्सिडी",
    "इस सप्ताह सबसे नज़दीकी पशु चिकित्सा शिविर कहाँ है?",
  ],

  ta: [
    "இந்த பருவத்தில் கடுகு எப்போது விதைக்க வேண்டும்?",
    "PM-Kisan திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?",
    "நாசிக் அருகே தக்காளியின் சிறந்த விலை என்ன?",
    "என் கோதுமை இலைகள் மஞ்சளாகின்றன",
    "சொட்டு நீர்ப்பாசனத்திற்கு மானியம் உள்ளதா?",
    "இந்த வாரம் அருகிலுள்ள கால்நடை முகாம் எங்கே?",
  ],

  te: [
    "ఈ సీజన్‌లో ఆవాలను ఎప్పుడు విత్తాలి?",
    "PM-Kisan కోసం ఎలా దరఖాస్తు చేయాలి?",
    "నాసిక్ దగ్గర టమాటాకు మంచి ధర ఎక్కడ ఉంది?",
    "నా గోధుమ ఆకులు పసుపు రంగులోకి మారుతున్నాయి",
    "డ్రిప్ ఇరిగేషన్‌కు సబ్సిడీ ఉందా?",
    "ఈ వారం దగ్గరలో పశువైద్య శిబిరం ఎక్కడ ఉంది?",
  ],

  kn: [
    "ಈ ಋತುವಿನಲ್ಲಿ ಸಾಸಿವೆ ಯಾವಾಗ ಬಿತ್ತಬೇಕು?",
    "PM-Kisan ಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು?",
    "ನಾಸಿಕ್ ಬಳಿ ಟೊಮೆಟೊಗೆ ಉತ್ತಮ ಬೆಲೆ ಎಲ್ಲಿ ಇದೆ?",
    "ನನ್ನ ಗೋಧಿ ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ",
    "ಡ್ರಿಪ್ ನೀರಾವರಿಗೆ ಸಬ್ಸಿಡಿ ಇದೆಯೇ?",
    "ಈ ವಾರ ಹತ್ತಿರದ ಪಶುವೈದ್ಯಕೀಯ ಶಿಬಿರ ಎಲ್ಲಿದೆ?",
  ],

  mr: [
    "या हंगामात मोहरी कधी पेरावी?",
    "PM-Kisan साठी अर्ज कसा करावा?",
    "नाशिकजवळ टोमॅटोचा चांगला बाजारभाव कुठे आहे?",
    "माझ्या गव्हाची पाने पिवळी होत आहेत",
    "ठिबक सिंचनासाठी अनुदान आहे का?",
    "या आठवड्यात जवळचे पशुवैद्यकीय शिबिर कुठे आहे?",
  ],

  bn: [
    "এই মরসুমে সর্ষে কখন বপন করা উচিত?",
    "PM-Kisan-এর জন্য কীভাবে আবেদন করব?",
    "নাসিকের কাছে টমেটোর ভালো দাম কোথায়?",
    "আমার গমের পাতা হলুদ হয়ে যাচ্ছে",
    "ড্রিপ সেচের জন্য কি ভর্তুকি আছে?",
    "এই সপ্তাহে কাছের পশু চিকিৎসা শিবির কোথায়?",
  ],
};

type Rule = {
  keys: string[];
  answers: Record<LanguageCode, string>;
};

const rules: Rule[] = [
  {
    keys: [
      "yellow",
      "पीले",
      "leaf",
      "पत्ते",
      "wheat",
      "गेहूं",
      "గోధుమ",
      "పసుపు",
      "ಹಳದಿ",
      "गहू",
      "गव्ह",
      "মেঘ",
    ],

    answers: {
      en: "Yellowing in wheat usually means nitrogen deficiency or waterlogging. Check field drainage first. If the problem continues, consult a local agriculture officer or use the Crop Doctor feature.",

      hi: "गेहूं की पत्तियों का पीला होना अक्सर नाइट्रोजन की कमी या खेत में पानी भरने के कारण होता है। पहले खेत की जल निकासी जाँचें। समस्या बनी रहे तो कृषि अधिकारी से सलाह लें या Crop Doctor का उपयोग करें।",

      ta: "கோதுமை இலைகள் மஞ்சளாகுவது பொதுவாக நைட்ரஜன் குறைபாடு அல்லது வயலில் நீர் தேங்குவதால் ஏற்படலாம். முதலில் நீர் வடிகால் வசதியைச் சரிபார்க்கவும். பிரச்சனை தொடர்ந்தால் வேளாண்மை அதிகாரியை அணுகவும் அல்லது Crop Doctor-ஐ பயன்படுத்தவும்.",

      te: "గోధుమ ఆకులు పసుపు రంగులోకి మారడం సాధారణంగా నైట్రోజన్ లోపం లేదా పొలంలో నీరు నిల్వ ఉండటం వల్ల కావచ్చు. ముందుగా పొలంలోని నీటి పారుదలను పరిశీలించండి. సమస్య కొనసాగితే వ్యవసాయ అధికారిని సంప్రదించండి లేదా Crop Doctor ఉపయోగించండి.",

      kn: "ಗೋಧಿ ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು ಸಾಮಾನ್ಯವಾಗಿ ನೈಟ್ರೋಜನ್ ಕೊರತೆ ಅಥವಾ ಹೊಲದಲ್ಲಿ ನೀರು ನಿಲ್ಲುವುದರಿಂದ ಆಗಬಹುದು. ಮೊದಲು ಹೊಲದ ನೀರು ಹರಿಯುವ ವ್ಯವಸ್ಥೆಯನ್ನು ಪರಿಶೀಲಿಸಿ. ಸಮಸ್ಯೆ ಮುಂದುವರಿದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ Crop Doctor ಬಳಸಿ.",

      mr: "गव्हाची पाने पिवळी होणे हे बहुतेक वेळा नायट्रोजनची कमतरता किंवा शेतात पाणी साचल्यामुळे होऊ शकते. प्रथम पाण्याचा निचरा तपासा. समस्या कायम राहिल्यास कृषी अधिकाऱ्यांचा सल्ला घ्या किंवा Crop Doctor वापरा.",

      bn: "গমের পাতা হলুদ হওয়া সাধারণত নাইট্রোজেনের ঘাটতি বা জমিতে জল জমে থাকার কারণে হতে পারে। প্রথমে জমির জল নিষ্কাশন পরীক্ষা করুন। সমস্যা থাকলে কৃষি আধিকারিকের পরামর্শ নিন বা Crop Doctor ব্যবহার করুন।",
    },
  },

  {
    keys: [
      "weather",
      "वातावरण",
      "मौसम",
      "வானிலை",
      "వాతావరణం",
      "ಹವಾಮಾನ",
      "हवामान",
      "বাতাস",
    ],

    answers: {
      en: "You can check the latest weather conditions and farming advisory on the Weather & Farming Advisory page. Weather information can help you plan irrigation, sowing and harvesting.",

      hi: "आप मौसम और कृषि सलाह पेज पर नवीनतम मौसम की जानकारी देख सकते हैं। मौसम की जानकारी सिंचाई, बुवाई और कटाई की योजना बनाने में मदद कर सकती है।",

      ta: "வானிலை மற்றும் வேளாண்மை ஆலோசனை பக்கத்தில் சமீபத்திய வானிலை தகவல்களைப் பார்க்கலாம். வானிலை தகவல்கள் நீர்ப்பாசனம், விதைப்பு மற்றும் அறுவடை திட்டமிட உதவும்.",

      te: "వాతావరణం మరియు వ్యవసాయ సలహా పేజీలో తాజా వాతావరణ వివరాలను చూడవచ్చు. వాతావరణ సమాచారం నీటిపారుదల, విత్తడం మరియు పంట కోతను ప్రణాళిక చేసుకోవడానికి సహాయపడుతుంది.",

      kn: "ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಸಲಹೆ ಪುಟದಲ್ಲಿ ಇತ್ತೀಚಿನ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ನೋಡಬಹುದು. ಹವಾಮಾನ ಮಾಹಿತಿ ನೀರಾವರಿ, ಬಿತ್ತನೆ ಮತ್ತು ಕೊಯ್ಲು ಯೋಜಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",

      mr: "हवामान आणि कृषी सल्ला पेजवर नवीनतम हवामान माहिती पाहू शकता. हवामानाची माहिती सिंचन, पेरणी आणि कापणीचे नियोजन करण्यास मदत करू शकते.",

      bn: "আবহাওয়া ও কৃষি পরামর্শ পেজে সর্বশেষ আবহাওয়ার তথ্য দেখতে পারেন। আবহাওয়ার তথ্য সেচ, বপন এবং ফসল কাটার পরিকল্পনা করতে সাহায্য করতে পারে।",
    },
  },

  {
    keys: [
      "pm-kisan",
      "pm kisan",
      "kisan samman",
      "पिएम किसान",
      "पीएम किसान",
      "పీఎం కిసాన్",
      "ಪಿಎಂ ಕಿಸಾನ್",
      "पीएम-किसान",
    ],

    answers: {
      en: "PM-Kisan provides eligible farmers with financial support. You can apply through the official PM-Kisan portal or a Common Service Centre. Keep your Aadhaar, land records and bank details ready.",

      hi: "PM-Kisan पात्र किसानों को आर्थिक सहायता देता है। आप आधिकारिक PM-Kisan पोर्टल या Common Service Centre के माध्यम से आवेदन कर सकते हैं। आधार, भूमि रिकॉर्ड और बैंक विवरण तैयार रखें।",

      ta: "PM-Kisan தகுதியுள்ள விவசாயிகளுக்கு நிதியுதவி வழங்குகிறது. அதிகாரப்பூர்வ PM-Kisan இணையதளம் அல்லது Common Service Centre மூலம் விண்ணப்பிக்கலாம். ஆதார், நில ஆவணங்கள் மற்றும் வங்கி விவரங்களைத் தயாராக வைத்திருங்கள்.",

      te: "PM-Kisan అర్హత ఉన్న రైతులకు ఆర్థిక సహాయం అందిస్తుంది. అధికారిక PM-Kisan పోర్టల్ లేదా Common Service Centre ద్వారా దరఖాస్తు చేయవచ్చు. ఆధార్, భూమి రికార్డులు మరియు బ్యాంకు వివరాలు సిద్ధంగా ఉంచండి.",

      kn: "PM-Kisan ಅರ್ಹ ರೈತರಿಗೆ ಆರ್ಥಿಕ ಸಹಾಯ ನೀಡುತ್ತದೆ. ಅಧಿಕೃತ PM-Kisan ಪೋರ್ಟಲ್ ಅಥವಾ Common Service Centre ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು. ಆಧಾರ್, ಜಮೀನು ದಾಖಲೆಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಸಿದ್ಧವಾಗಿಡಿ.",

      mr: "PM-Kisan पात्र शेतकऱ्यांना आर्थिक मदत देते. अधिकृत PM-Kisan पोर्टल किंवा Common Service Centre द्वारे अर्ज करू शकता. आधार, जमीन कागदपत्रे आणि बँक तपशील तयार ठेवा.",

      bn: "PM-Kisan যোগ্য কৃষকদের আর্থিক সহায়তা দেয়। সরকারি PM-Kisan পোর্টাল বা Common Service Centre-এর মাধ্যমে আবেদন করা যায়। আধার, জমির নথি এবং ব্যাঙ্কের তথ্য প্রস্তুত রাখুন।",
    },
  },

  {
    keys: [
      "drip",
      "irrigation",
      "सिंचाई",
      "pmksy",
      "డ్రిప్",
      "నీరావరి",
      "ನೀರಾವರಿ",
      "पाणी",
      "सिंचन",
    ],

    answers: {
      en: "Drip irrigation subsidies may be available through government agriculture or horticulture programs. Eligibility and subsidy rates depend on your state and farmer category. Check with your local agriculture or horticulture office.",

      hi: "ड्रिप सिंचाई के लिए सरकारी कृषि या बागवानी योजनाओं के तहत सब्सिडी मिल सकती है। पात्रता और सब्सिडी राज्य तथा किसान की श्रेणी पर निर्भर करती है। अपने स्थानीय कृषि या बागवानी कार्यालय से जाँच करें।",

      ta: "சொட்டு நீர்ப்பாசனத்திற்கு அரசு வேளாண்மை அல்லது தோட்டக்கலை திட்டங்களின் கீழ் மானியம் கிடைக்கலாம். தகுதி மற்றும் மானிய அளவு மாநிலம் மற்றும் விவசாயி பிரிவைப் பொறுத்தது. உள்ளூர் வேளாண்மை அலுவலகத்தில் சரிபார்க்கவும்.",

      te: "డ్రిప్ ఇరిగేషన్‌కు ప్రభుత్వ వ్యవసాయ లేదా ఉద్యానవన పథకాల ద్వారా సబ్సిడీ లభించవచ్చు. అర్హత మరియు సబ్సిడీ మొత్తం రాష్ట్రం, రైతు వర్గంపై ఆధారపడి ఉంటుంది. స్థానిక వ్యవసాయ లేదా ఉద్యానవన కార్యాలయంలో వివరాలు తెలుసుకోండి.",

      kn: "ಡ್ರಿಪ್ ನೀರಾವರಿಗೆ ಸರ್ಕಾರಿ ಕೃಷಿ ಅಥವಾ ತೋಟಗಾರಿಕೆ ಯೋಜನೆಗಳ ಮೂಲಕ ಸಬ್ಸಿಡಿ ದೊರೆಯಬಹುದು. ಅರ್ಹತೆ ಮತ್ತು ಸಬ್ಸಿಡಿ ಪ್ರಮಾಣವು ರಾಜ್ಯ ಮತ್ತು ರೈತರ ವರ್ಗದ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ಸ್ಥಳೀಯ ಕೃಷಿ ಅಥವಾ ತೋಟಗಾರಿಕೆ ಕಚೇರಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",

      mr: "ठिबक सिंचनासाठी सरकारी कृषी किंवा फलोत्पादन योजनांमधून अनुदान मिळू शकते. पात्रता आणि अनुदानाचे प्रमाण राज्य व शेतकरी वर्गावर अवलंबून असते. स्थानिक कृषी किंवा फलोत्पादन कार्यालयात तपासा.",

      bn: "ড্রিপ সেচের জন্য সরকারি কৃষি বা উদ্যানপালন প্রকল্পের মাধ্যমে ভর্তুকি পাওয়া যেতে পারে। যোগ্যতা ও ভর্তুকির পরিমাণ রাজ্য ও কৃষকের শ্রেণির উপর নির্ভর করে। স্থানীয় কৃষি বা উদ্যানপালন দপ্তরে যাচাই করুন।",
    },
  },

  {
    keys: [
      "mustard",
      "sow",
      "sowing",
      "बुवाई",
      "सरसों",
      "आवळे",
      "मोहरी",
      "ఆవాలు",
      "ಸಾಸಿವೆ",
      "সরিষা",
      "கடுகு",
    ],

    answers: {
      en: "Mustard is generally sown during the recommended season for your region. The exact sowing window depends on local climate and variety. Check your local agricultural advisory before sowing.",

      hi: "सरसों की बुवाई आपके क्षेत्र के अनुशंसित मौसम में करनी चाहिए। सही समय स्थानीय जलवायु और किस्म पर निर्भर करता है। बुवाई से पहले स्थानीय कृषि सलाह देखें।",

      ta: "கடுகு உங்கள் பகுதியின் பரிந்துரைக்கப்பட்ட பருவத்தில் விதைக்கப்பட வேண்டும். சரியான காலம் உள்ளூர் வானிலை மற்றும் ரகத்தைப் பொறுத்தது. விதைப்பதற்கு முன் உள்ளூர் வேளாண்மை ஆலோசனையைப் பார்க்கவும்.",

      te: "ఆవాలను మీ ప్రాంతానికి అనుకూలమైన సిఫారసు చేసిన సీజన్‌లో విత్తాలి. ఖచ్చితమైన సమయం స్థానిక వాతావరణం మరియు రకంపై ఆధారపడి ఉంటుంది. విత్తే ముందు స్థానిక వ్యవసాయ సలహాను చూడండి.",

      kn: "ಸಾಸಿವೆಯನ್ನು ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಿದ ಋತುವಿನಲ್ಲಿ ಬಿತ್ತಬೇಕು. ಸರಿಯಾದ ಸಮಯವು ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮತ್ತು ತಳಿಯ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುತ್ತದೆ. ಬಿತ್ತುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ಸಲಹೆ ಪರಿಶೀಲಿಸಿ.",

      mr: "मोहरीची पेरणी आपल्या भागासाठी शिफारस केलेल्या हंगामात करावी. योग्य वेळ स्थानिक हवामान आणि वाणावर अवलंबून असतो. पेरणीपूर्वी स्थानिक कृषी सल्ला तपासा.",

      bn: "সরিষা আপনার অঞ্চলের সুপারিশকৃত মরসুমে বপন করা উচিত। সঠিক সময় স্থানীয় আবহাওয়া ও জাতের উপর নির্ভর করে। বপনের আগে স্থানীয় কৃষি পরামর্শ দেখুন।",
    },
  },

  {
    keys: [
      "tomato",
      "price",
      "mandi",
      "भाव",
      "rate",
      "market",
      "टमाटर",
      "टोमॅटो",
      "టమాటా",
      "మార్కెట్",
      "ಟೊಮೆಟೊ",
      "बाजार",
      "বাজার",
    ],

    answers: {
      en: "Mandi prices change frequently based on arrivals, demand and location. Check the Agricultural Market Prices page for the latest available rates before deciding when to sell.",

      hi: "मंडी भाव आवक, मांग और स्थान के अनुसार लगातार बदलते रहते हैं। बेचने का निर्णय लेने से पहले Agricultural Market Prices पेज पर उपलब्ध नवीनतम भाव देखें।",

      ta: "சந்தை விலைகள் வரத்து, தேவை மற்றும் இடத்தைப் பொறுத்து அடிக்கடி மாறுகின்றன. விற்பனை முடிவு எடுப்பதற்கு முன் Agricultural Market Prices பக்கத்தில் கிடைக்கும் சமீபத்திய விலைகளைப் பார்க்கவும்.",

      te: "మార్కెట్ ధరలు సరఫరా, డిమాండ్ మరియు ప్రాంతాన్ని బట్టి తరచుగా మారుతాయి. అమ్మే ముందు Agricultural Market Prices పేజీలో అందుబాటులో ఉన్న తాజా ధరలను చూడండి.",

      kn: "ಮಾರುಕಟ್ಟೆ ದರಗಳು ಆಗಮನ, ಬೇಡಿಕೆ ಮತ್ತು ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ ಆಗಾಗ್ಗೆ ಬದಲಾಗುತ್ತವೆ. ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು Agricultural Market Prices ಪುಟದಲ್ಲಿ ಲಭ್ಯವಿರುವ ಇತ್ತೀಚಿನ ದರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",

      mr: "बाजारभाव आवक, मागणी आणि ठिकाणानुसार वारंवार बदलतात. विक्रीचा निर्णय घेण्यापूर्वी Agricultural Market Prices पेजवरील उपलब्ध ताजे भाव तपासा.",

      bn: "বাজারদর সরবরাহ, চাহিদা ও অবস্থানের উপর ভিত্তি করে ঘন ঘন পরিবর্তিত হয়। বিক্রির সিদ্ধান্ত নেওয়ার আগে Agricultural Market Prices পেজে সর্বশেষ পাওয়া দর দেখুন।",
    },
  },
];

const fallback: Record<LanguageCode, string> = {
  en: "I can help with crops, weather, mandi prices, government schemes, loans and village issue reporting. Please share your crop, village or scheme name.",

  hi: "मैं फसल, मौसम, मंडी भाव, सरकारी योजनाएँ, ऋण और गाँव की समस्या दर्ज करने में मदद कर सकता हूँ। अपनी फसल, गाँव या योजना का नाम बताइए।",

  ta: "பயிர்கள், வானிலை, சந்தை விலைகள், அரசு திட்டங்கள், கடன் மற்றும் கிராமப் பிரச்சினைகளைப் பதிவு செய்வதில் நான் உதவ முடியும். உங்கள் பயிர், கிராமம் அல்லது திட்டத்தின் பெயரைச் சொல்லுங்கள்.",

  te: "పంటలు, వాతావరణం, మార్కెట్ ధరలు, ప్రభుత్వ పథకాలు, రుణాలు మరియు గ్రామ సమస్యల నివేదనలో నేను సహాయం చేయగలను. మీ పంట, గ్రామం లేదా పథకం పేరు చెప్పండి.",

  kn: "ಬೆಳೆಗಳು, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರಗಳು, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಸಾಲಗಳು ಮತ್ತು ಗ್ರಾಮ ಸಮಸ್ಯೆಗಳನ್ನು ದಾಖಲಿಸುವಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು. ನಿಮ್ಮ ಬೆಳೆ, ಗ್ರಾಮ ಅಥವಾ ಯೋಜನೆಯ ಹೆಸರನ್ನು ತಿಳಿಸಿ.",

  mr: "मी पीक, हवामान, बाजारभाव, सरकारी योजना, कर्ज आणि गावातील समस्या नोंदविण्यात मदत करू शकतो. तुमच्या पिकाचे, गावाचे किंवा योजनेचे नाव सांगा.",

  bn: "আমি ফসল, আবহাওয়া, বাজারদর, সরকারি প্রকল্প, ঋণ এবং গ্রামের সমস্যা জানানোর ক্ষেত্রে সাহায্য করতে পারি। আপনার ফসল, গ্রামের নাম বা প্রকল্পের নাম বলুন।",
};

const dashboardText: Record<
  LanguageCode,
  {
    welcome: string;
    subtitle: string;
    crop: string;
    schemes: string;
    weather: string;
    market: string;
    report: string;
    map: string;
    knowledge: string;
    services: string;
    trackReport: string;
    logout: string;
  }
> = {
  en: {
    welcome: "Welcome",
    subtitle: "Everything you need for your village and farm, in one place.",
    crop: "Crop Doctor",
    schemes: "Government Schemes",
    weather: "Weather & Advisory",
    market: "Market Prices",
    report: "Report an Issue",
    map: "Issue Map",
    knowledge: "Knowledge Center",
    services: "Essential Services",
    trackReport: "Track Report",
    logout: "Logout",
  },

  te: {
    welcome: "స్వాగతం",
    subtitle: "మీ గ్రామం మరియు వ్యవసాయానికి అవసరమైన సేవలు ఒకే చోట.",
    crop: "పంట వైద్యుడు",
    schemes: "ప్రభుత్వ పథకాలు",
    weather: "వాతావరణం & సలహా",
    market: "మార్కెట్ ధరలు",
    report: "సమస్యను నివేదించండి",
    map: "సమస్యల మ్యాప్",
    knowledge: "జ్ఞాన కేంద్రం",
    services: "అత్యవసర సేవలు",
    trackReport: "రిపోర్ట్‌ను ట్రాక్ చేయండి",
    logout: "లాగ్ అవుట్",
  },

  hi: {
    welcome: "स्वागत है",
    subtitle: "आपके गाँव और खेती के लिए जरूरी सेवाएँ एक ही जगह।",
    crop: "फसल डॉक्टर",
    schemes: "सरकारी योजनाएँ",
    weather: "मौसम और सलाह",
    market: "मंडी भाव",
    report: "समस्या दर्ज करें",
    map: "समस्या मानचित्र",
    knowledge: "ज्ञान केंद्र",
    services: "आवश्यक सेवाएँ",
    trackReport: "रिपोर्ट ट्रैक करें",
    logout: "लॉग आउट",
  },

  mr: {
    welcome: "स्वागत आहे",
    subtitle: "तुमच्या गावासाठी आणि शेतीसाठी आवश्यक सेवा एकाच ठिकाणी.",
    crop: "पीक डॉक्टर",
    schemes: "शासकीय योजना",
    weather: "हवामान व सल्ला",
    market: "बाजारभाव",
    report: "समस्या नोंदवा",
    map: "समस्या नकाशा",
    knowledge: "ज्ञान केंद्र",
    services: "आवश्यक सेवा",
    trackReport: "तक्रार ट्रॅक करा",
    logout: "लॉग आउट",
  },

  ta: {
    welcome: "வரவேற்கிறோம்",
    subtitle:
      "உங்கள் கிராமம் மற்றும் விவசாயத்திற்குத் தேவையான அனைத்தும் ஒரே இடத்தில்.",
    crop: "பயிர் மருத்துவர்",
    schemes: "அரசு திட்டங்கள்",
    weather: "வானிலை மற்றும் ஆலோசனை",
    market: "சந்தை விலைகள்",
    report: "பிரச்சினையைப் புகாரளிக்கவும்",
    map: "பிரச்சினை வரைபடம்",
    knowledge: "அறிவு மையம்",
    services: "அத்தியாவசிய சேவைகள்",
    trackReport: "புகாரை கண்காணிக்கவும்",
    logout: "வெளியேறு",
  },

  kn: {
    welcome: "ಸ್ವಾಗತ",
    subtitle:
      "ನಿಮ್ಮ ಗ್ರಾಮ ಮತ್ತು ಕೃಷಿಗೆ ಅಗತ್ಯವಿರುವ ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
    crop: "ಬೆಳೆ ವೈದ್ಯ",
    schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    weather: "ಹವಾಮಾನ ಮತ್ತು ಸಲಹೆ",
    market: "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
    report: "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
    map: "ಸಮಸ್ಯೆ ನಕ್ಷೆ",
    knowledge: "ಜ್ಞಾನ ಕೇಂದ್ರ",
    services: "ಅಗತ್ಯ ಸೇವೆಗಳು",
    trackReport: "ವರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    logout: "ಲಾಗ್ ಔಟ್",
  },

  bn: {
    welcome: "স্বাগতম",
    subtitle: "আপনার গ্রাম ও কৃষির জন্য প্রয়োজনীয় সবকিছু এক জায়গায়।",
    crop: "ফসল ডাক্তার",
    schemes: "সরকারি প্রকল্প",
    weather: "আবহাওয়া ও পরামর্শ",
    market: "বাজারদর",
    report: "সমস্যা রিপোর্ট করুন",
    map: "সমস্যার মানচিত্র",
    knowledge: "জ্ঞান কেন্দ্র",
    services: "প্রয়োজনীয় পরিষেবা",
    trackReport: "রিপোর্ট ট্র্যাক করুন",
    logout: "লগ আউট",
  },
};

function getReply(question: string, lang: LanguageCode): string {
  const q = question.toLowerCase();

  const hit = rules.find((rule) =>
    rule.keys.some((key) => q.includes(key.toLowerCase())),
  );

  if (hit) {
    return hit.answers[lang] ?? hit.answers.en;
  }

  return fallback[lang] ?? fallback.en;
}

const speechLanguages: Record<LanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
  kn: "kn-IN",
  mr: "mr-IN",
  bn: "bn-IN",
};

let idCounter = 0;

const nextId = (): number => {
  idCounter += 1;
  return idCounter;
};

function AssistantPage() {
  const { lang: homeLang, t } = useI18n();

  const [userName, setUserName] = useState("Citizen");

  useEffect(() => {
    async function loadUserName() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const name =
        user?.user_metadata?.["full_name"] ||
        user?.email?.split("@")[0] ||
        "Citizen";

      setUserName(name);
    }

    void loadUserName();
  }, []);

  const lang: LanguageCode =
    homeLang === "hi" ||
    homeLang === "ta" ||
    homeLang === "te" ||
    homeLang === "kn" ||
    homeLang === "mr" ||
    homeLang === "bn"
      ? homeLang
      : "en";

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "bot",
      text: greetings[lang],
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const text = uiText[lang];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    setMessages((previous) => [
      ...previous,
      {
        id: nextId(),
        role: "bot",
        text: greetings[lang],
      },
    ]);
  }, [lang]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = (message: string) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.lang = speechLanguages[lang];

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const send = (value: string) => {
    const question = value.trim();

    if (!question || typing) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        id: nextId(),
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setTyping(true);

    timerRef.current = setTimeout(() => {
      const reply = getReply(question, lang);

      setMessages((previous) => [
        ...previous,
        {
          id: nextId(),
          role: "bot",
          text: reply,
        },
      ]);

      setTyping(false);

      speak(reply);
    }, 700);
  };

  const clearChat = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    window.speechSynthesis?.cancel();

    setListening(false);
    setTyping(false);
    setInput("");

    setMessages([
      {
        id: nextId(),
        role: "bot",
        text: greetings[lang],
      },
    ]);
  };

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const startVoiceInput = () => {
    const speechWindow = window as WindowWithSpeechRecognition;

    const SpeechRecognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert(text.voiceNotSupported);
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = speechLanguages[lang];
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();

      if (!transcript) {
        return;
      }

      setInput(transcript);

      send(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      setListening(false);
      recognitionRef.current = null;

      if (event.error === "not-allowed") {
        window.alert(
          "Microphone permission was denied. Please allow microphone access in your browser.",
        );
      }
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setListening(true);

    try {
      recognition.start();
    } catch (error) {
      console.error("Could not start speech recognition:", error);
      setListening(false);
      recognitionRef.current = null;
    }
  };

  return (
    <>
      <PageHeader
        icon={Bot}
        eyebrow={t("page.assistant.eyebrow")}
        title={t("nav.assistant")}
        description={t("page.assistant.description")}
      />

      <div className="px-4 pb-2 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-background to-secondary/30 p-6 shadow-soft sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  {dashboardText[lang].welcome}
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                  {userName} 👋
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {dashboardText[lang].subtitle}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="shrink-0"
              >
                <LogOut className="size-4" />
                {dashboardText[lang].logout}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* CROP DOCTOR */}
            <Link
              to="/crop-doctor"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Leaf className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].crop}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Diagnose crop problems
              </p>
            </Link>

            {/* GOVERNMENT SCHEMES */}
            <Link
              to="/schemes"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Landmark className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].schemes}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find schemes you may qualify for
              </p>
            </Link>

            {/* WEATHER */}
            <Link
              to="/weather"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <CloudSun className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].weather}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Plan farming using weather information
              </p>
            </Link>

            {/* MARKET */}
            <Link
              to="/market"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                <IndianRupee className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].market}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Check agricultural market prices
              </p>
            </Link>

            {/* REPORT ISSUE */}
            <Link
              to="/report"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-red-100 text-red-700">
                <Megaphone className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].report}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Report road and village problems
              </p>
            </Link>

            {/* ISSUE MAP */}
            <Link
              to="/issue-map"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Map className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].map}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                View reported rural issues
              </p>
            </Link>

            {/* KNOWLEDGE CENTER */}
            <Link
              to="/knowledge"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                <BookOpen className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].knowledge}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Learn farming and rural skills
              </p>
            </Link>

            {/* ESSENTIAL SERVICES */}
            <Link
              to="/services"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Phone className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].services}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Find essential nearby services
              </p>
            </Link>

            {/* TRACK REPORT — NEW 9TH CARD */}
            <Link
              to="/tracking"
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Search className="size-6" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                {dashboardText[lang].trackReport}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Track the status of your submitted report
              </p>
            </Link>

          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* CHAT */}
          <Card className="shadow-soft">
            <CardHeader className="flex-row items-center justify-between gap-3 border-b border-border">
              <CardTitle className="text-base">
                {text.chat}
              </CardTitle>

              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                disabled={typing}
              >
                <Eraser className="size-4" />
                {text.clear}
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              <div
                ref={scrollRef}
                className="max-h-[26rem] space-y-4 overflow-y-auto pr-1"
                aria-live="polite"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "user"
                        ? "justify-end"
                        : ""
                    }`}
                  >
                    {message.role === "bot" && (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Bot className="size-4" />
                      </span>
                    )}

                    <p
                      className={`max-w-lg whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {message.text}
                    </p>

                    {message.role === "user" && (
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
                      {[0, 1, 2].map((index) => (
                        <span
                          key={index}
                          className="size-2 animate-bounce rounded-full bg-muted-foreground/70"
                          style={{
                            animationDelay: `${index * 140}ms`,
                          }}
                        />
                      ))}
                    </span>
                  </div>
                )}
              </div>

              {/* VOICE LISTENING MESSAGE */}
              {listening && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-primary">
                  <span className="flex size-3 animate-pulse rounded-full bg-primary" />
                  <span>{text.listening}</span>
                </div>
              )}

              {/* INPUT */}
              <form
                className="flex items-center gap-2 border-t border-border pt-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
              >
                <Input
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder={text.placeholder}
                  aria-label={text.message}
                  disabled={listening}
                />

                {/* VOICE BUTTON */}
                <Button
                  type="button"
                  variant={listening ? "default" : "outline"}
                  size="icon"
                  aria-label={
                    listening
                      ? text.stopVoice
                      : text.voice
                  }
                  title={
                    listening
                      ? text.stopVoice
                      : text.voice
                  }
                  onClick={startVoiceInput}
                  disabled={typing}
                  className={
                    listening
                      ? "animate-pulse"
                      : ""
                  }
                >
                  {listening ? (
                    <MicOff className="size-4" />
                  ) : (
                    <Mic className="size-4" />
                  )}
                </Button>

                {/* SEND BUTTON */}
                <Button
                  type="submit"
                  size="icon"
                  aria-label={text.send}
                  disabled={
                    !input.trim() ||
                    typing ||
                    listening
                  }
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">
                  {text.quickQuestions}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                {(suggestions[lang] ?? suggestions.en).map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      disabled={
                        typing ||
                        listening
                      }
                      className="w-full rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-60"
                    >
                      {suggestion}
                    </button>
                  ),
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}