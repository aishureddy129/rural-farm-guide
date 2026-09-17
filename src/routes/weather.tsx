import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useI18n, type LanguageCode } from "@/lib/i18n";

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
});

/* =========================================================
   PAGE TRANSLATIONS
========================================================= */

type PageText = {
  title: string;
  subtitle: string;
  location: string;
  state: string;
  district: string;
  village: string;
  selectState: string;
  selectDistrict: string;
  selectVillage: string;
  getWeather: string;
  loading: string;
  temperature: string;
  humidity: string;
  wind: string;
  rain: string;
  sunny: string;
  cloudy: string;
  rainy: string;
  thunderstorm: string;
  bestCrop: string;
  whyCrop: string;
  advice: string;
  irrigation: string;
  fertilizer: string;
  pest: string;
  spraying: string;
  live: string;
  selectedLocation: string;
  highRain: string;
  normalIrrigation: string;
  fertilizerAdvice: string;
  pestAdvice: string;
  highWindSpraying: string;
  normalSpraying: string;
  paddy: string;
  wheat: string;
  groundnut: string;
  tomato: string;
  paddyReason: string;
  wheatReason: string;
  groundnutReason: string;
  tomatoReason: string;
  weatherError: string;
};

const pageText: Record<LanguageCode, PageText> = {
  en: {
    title: "Weather & Farming Advisory",
    subtitle: "Check real weather and find the best crop for your location",
    location: "Village Weather Forecast",
    state: "State",
    district: "District",
    village: "Village",
    selectState: "Select State",
    selectDistrict: "Select District",
    selectVillage: "Select Village",
    getWeather: "Get Live Weather & Crop Recommendation",
    loading: "Getting live weather...",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain Chance",
    sunny: "Sunny",
    cloudy: "Partly Cloudy",
    rainy: "Showers",
    thunderstorm: "Thunderstorm",
    bestCrop: "Best Crop for This Weather",
    whyCrop: "Why this crop?",
    advice: "Today's Farming Advice",
    irrigation: "Irrigation",
    fertilizer: "Fertilizer",
    pest: "Pest / Disease",
    spraying: "Spraying",
    live: "Live weather data",
    selectedLocation: "Selected Location",
    highRain: "Reduce irrigation because rainfall probability is high.",
    normalIrrigation:
      "Use regular irrigation and avoid excess water.",
    fertilizerAdvice:
      "Apply fertilizer when heavy rain is not expected.",
    pestAdvice:
      "Check leaves regularly for pests and diseases.",
    highWindSpraying:
      "Avoid spraying because wind speed is high.",
    normalSpraying:
      "Avoid spraying during rain or strong wind.",
    paddy: "Paddy",
    wheat: "Wheat",
    groundnut: "Groundnut",
    tomato: "Tomato",
    paddyReason:
      "High rainfall probability and humidity can be suitable for paddy cultivation.",
    wheatReason:
      "Cooler temperatures and moderate rainfall can be suitable for wheat.",
    groundnutReason:
      "Warm and comparatively dry weather can be suitable for groundnut.",
    tomatoReason:
      "Warm weather with moderate rainfall can be suitable for tomato cultivation.",
    weatherError:
      "Unable to get live weather. Please check your internet connection and try again.",
  },

  te: {
    title: "వాతావరణం మరియు వ్యవసాయ సలహా",
    subtitle:
      "మీ ప్రాంతంలోని నిజమైన వాతావరణాన్ని చూసి ఉత్తమ పంటను కనుగొనండి",
    location: "గ్రామ వాతావరణ సూచన",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    village: "గ్రామం",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectDistrict: "జిల్లాను ఎంచుకోండి",
    selectVillage: "గ్రామాన్ని ఎంచుకోండి",
    getWeather: "ప్రత్యక్ష వాతావరణం మరియు పంట సిఫార్సు పొందండి",
    loading: "ప్రత్యక్ష వాతావరణాన్ని పొందుతోంది...",
    temperature: "ఉష్ణోగ్రత",
    humidity: "తేమ",
    wind: "గాలి",
    rain: "వర్షం అవకాశం",
    sunny: "ఎండగా ఉంది",
    cloudy: "పాక్షికంగా మేఘావృతం",
    rainy: "జల్లులు",
    thunderstorm: "ఉరుములతో కూడిన వర్షం",
    bestCrop: "ఈ వాతావరణానికి ఉత్తమ పంట",
    whyCrop: "ఈ పంట ఎందుకు?",
    advice: "ఈరోజు వ్యవసాయ సలహా",
    irrigation: "నీటిపారుదల",
    fertilizer: "ఎరువులు",
    pest: "పురుగు / వ్యాధి",
    spraying: "పిచికారీ",
    live: "ప్రత్యక్ష వాతావరణ సమాచారం",
    selectedLocation: "ఎంచుకున్న ప్రాంతం",
    highRain:
      "వర్షం అవకాశం ఎక్కువగా ఉన్నందున నీటిపారుదలను తగ్గించండి.",
    normalIrrigation:
      "క్రమం తప్పకుండా నీటిపారుదల చేయండి మరియు అధిక నీటిని నివారించండి.",
    fertilizerAdvice:
      "భారీ వర్షం లేని సమయంలో ఎరువులు వేయండి.",
    pestAdvice:
      "పురుగులు మరియు వ్యాధుల కోసం ఆకులను క్రమం తప్పకుండా పరిశీలించండి.",
    highWindSpraying:
      "గాలి వేగం ఎక్కువగా ఉన్నందున పిచికారీ చేయవద్దు.",
    normalSpraying:
      "వర్షం లేదా బలమైన గాలి సమయంలో పిచికారీ చేయవద్దు.",
    paddy: "వరి",
    wheat: "గోధుమ",
    groundnut: "వేరుశెనగ",
    tomato: "టమాటా",
    paddyReason:
      "ఎక్కువ వర్షం అవకాశం మరియు తేమ వరి సాగుకు అనుకూలంగా ఉండవచ్చు.",
    wheatReason:
      "చల్లని ఉష్ణోగ్రతలు మరియు మితమైన వర్షం గోధుమకు అనుకూలంగా ఉండవచ్చు.",
    groundnutReason:
      "వెచ్చని మరియు తక్కువ వర్షపాతం ఉన్న వాతావరణం వేరుశెనగకు అనుకూలంగా ఉండవచ్చు.",
    tomatoReason:
      "వెచ్చని వాతావరణం మరియు మితమైన వర్షం టమాటాకు అనుకూలంగా ఉండవచ్చు.",
    weatherError:
      "ప్రత్యక్ష వాతావరణాన్ని పొందలేకపోయాము. ఇంటర్నెట్ కనెక్షన్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
  },

  hi: {
    title: "मौसम और कृषि सलाह",
    subtitle:
      "अपने क्षेत्र का वास्तविक मौसम देखें और सबसे अच्छी फसल खोजें",
    location: "गांव का मौसम पूर्वानुमान",
    state: "राज्य",
    district: "जिला",
    village: "गांव",
    selectState: "राज्य चुनें",
    selectDistrict: "जिला चुनें",
    selectVillage: "गांव चुनें",
    getWeather: "लाइव मौसम और फसल की सिफारिश देखें",
    loading: "लाइव मौसम प्राप्त किया जा रहा है...",
    temperature: "तापमान",
    humidity: "नमी",
    wind: "हवा",
    rain: "बारिश की संभावना",
    sunny: "धूप",
    cloudy: "आंशिक बादल",
    rainy: "बारिश",
    thunderstorm: "आंधी और बारिश",
    bestCrop: "इस मौसम के लिए सबसे अच्छी फसल",
    whyCrop: "यह फसल क्यों?",
    advice: "आज की कृषि सलाह",
    irrigation: "सिंचाई",
    fertilizer: "उर्वरक",
    pest: "कीट / रोग",
    spraying: "छिड़काव",
    live: "लाइव मौसम की जानकारी",
    selectedLocation: "चयनित स्थान",
    highRain: "अधिक बारिश की संभावना के कारण सिंचाई कम करें।",
    normalIrrigation:
      "नियमित सिंचाई करें और अधिक पानी से बचें।",
    fertilizerAdvice:
      "भारी बारिश की संभावना न होने पर उर्वरक डालें।",
    pestAdvice:
      "कीट और रोगों के लिए पत्तियों की नियमित जांच करें।",
    highWindSpraying:
      "हवा की गति अधिक होने के कारण छिड़काव न करें।",
    normalSpraying:
      "बारिश या तेज हवा के दौरान छिड़काव न करें।",
    paddy: "धान",
    wheat: "गेहूं",
    groundnut: "मूंगफली",
    tomato: "टमाटर",
    paddyReason:
      "अधिक बारिश की संभावना और नमी धान की खेती के लिए उपयुक्त हो सकती है।",
    wheatReason:
      "ठंडा तापमान और मध्यम वर्षा गेहूं के लिए उपयुक्त हो सकती है।",
    groundnutReason:
      "गर्म और अपेक्षाकृत शुष्क मौसम मूंगफली के लिए उपयुक्त हो सकता है।",
    tomatoReason:
      "गर्म मौसम और मध्यम वर्षा टमाटर के लिए उपयुक्त हो सकती है।",
    weatherError:
      "लाइव मौसम प्राप्त नहीं हो सका। इंटरनेट कनेक्शन जांचें और फिर प्रयास करें।",
  },

  ta: {
    title: "வானிலை மற்றும் விவசாய ஆலோசனை",
    subtitle:
      "உங்கள் பகுதியின் உண்மையான வானிலையை பார்த்து சிறந்த பயிரை தேர்வு செய்யுங்கள்",
    location: "கிராம வானிலை முன்னறிவிப்பு",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    village: "கிராமம்",
    selectState: "மாநிலத்தை தேர்வு செய்யவும்",
    selectDistrict: "மாவட்டத்தை தேர்வு செய்யவும்",
    selectVillage: "கிராமத்தை தேர்வு செய்யவும்",
    getWeather: "நேரடி வானிலை மற்றும் பயிர் பரிந்துரையை பெறவும்",
    loading: "நேரடி வானிலை தகவலை பெறுகிறது...",
    temperature: "வெப்பநிலை",
    humidity: "ஈரப்பதம்",
    wind: "காற்று",
    rain: "மழை வாய்ப்பு",
    sunny: "வெயில்",
    cloudy: "பகுதி மேகமூட்டம்",
    rainy: "மழை",
    thunderstorm: "இடியுடன் கூடிய மழை",
    bestCrop: "இந்த வானிலைக்கு சிறந்த பயிர்",
    whyCrop: "இந்த பயிர் ஏன்?",
    advice: "இன்றைய விவசாய ஆலோசனை",
    irrigation: "நீர்ப்பாசனம்",
    fertilizer: "உரம்",
    pest: "பூச்சி / நோய்",
    spraying: "தெளித்தல்",
    live: "நேரடி வானிலை தகவல்",
    selectedLocation: "தேர்ந்தெடுக்கப்பட்ட இடம்",
    highRain:
      "மழை வாய்ப்பு அதிகமாக இருப்பதால் நீர்ப்பாசனத்தை குறைக்கவும்.",
    normalIrrigation:
      "வழக்கமான நீர்ப்பாசனம் செய்யவும் மற்றும் அதிக நீரை தவிர்க்கவும்.",
    fertilizerAdvice:
      "கனமழை எதிர்பார்க்கப்படாத போது உரம் இடவும்.",
    pestAdvice:
      "பூச்சிகள் மற்றும் நோய்களுக்காக இலைகளை தொடர்ந்து சரிபார்க்கவும்.",
    highWindSpraying:
      "காற்றின் வேகம் அதிகமாக இருப்பதால் தெளிக்க வேண்டாம்.",
    normalSpraying:
      "மழை அல்லது பலத்த காற்றின் போது தெளிக்க வேண்டாம்.",
    paddy: "நெல்",
    wheat: "கோதுமை",
    groundnut: "நிலக்கடலை",
    tomato: "தக்காளி",
    paddyReason:
      "அதிக மழை வாய்ப்பு மற்றும் ஈரப்பதம் நெல் சாகுபடிக்கு ஏற்றதாக இருக்கலாம்.",
    wheatReason:
      "குளிர்ந்த வெப்பநிலை மற்றும் மிதமான மழை கோதுமைக்கு ஏற்றதாக இருக்கலாம்.",
    groundnutReason:
      "வெப்பமான மற்றும் ஒப்பீட்டளவில் வறண்ட வானிலை நிலக்கடலைக்கு ஏற்றதாக இருக்கலாம்.",
    tomatoReason:
      "வெப்பமான வானிலை மற்றும் மிதமான மழை தக்காளிக்கு ஏற்றதாக இருக்கலாம்.",
    weatherError:
      "நேரடி வானிலை தகவலை பெற முடியவில்லை. இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
  },

  kn: {
    title: "ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಸಲಹೆ",
    subtitle:
      "ನಿಮ್ಮ ಪ್ರದೇಶದ ನೈಜ ಹವಾಮಾನವನ್ನು ನೋಡಿ ಉತ್ತಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    location: "ಗ್ರಾಮ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    village: "ಗ್ರಾಮ",
    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ",
    selectVillage: "ಗ್ರಾಮ ಆಯ್ಕೆಮಾಡಿ",
    getWeather: "ಲೈವ್ ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
    loading: "ಲೈವ್ ಹವಾಮಾನ ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    temperature: "ತಾಪಮಾನ",
    humidity: "ಆರ್ದ್ರತೆ",
    wind: "ಗಾಳಿ",
    rain: "ಮಳೆಯ ಸಾಧ್ಯತೆ",
    sunny: "ಬಿಸಿಲು",
    cloudy: "ಭಾಗಶಃ ಮೋಡ",
    rainy: "ಮಳೆ",
    thunderstorm: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
    bestCrop: "ಈ ಹವಾಮಾನಕ್ಕೆ ಉತ್ತಮ ಬೆಳೆ",
    whyCrop: "ಈ ಬೆಳೆ ಏಕೆ?",
    advice: "ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ",
    irrigation: "ನೀರಾವರಿ",
    fertilizer: "ರಸಗೊಬ್ಬರ",
    pest: "ಕೀಟ / ರೋಗ",
    spraying: "ಸಿಂಪಡಿಸುವಿಕೆ",
    live: "ಲೈವ್ ಹವಾಮಾನ ಮಾಹಿತಿ",
    selectedLocation: "ಆಯ್ಕೆ ಮಾಡಿದ ಸ್ಥಳ",
    highRain: "ಹೆಚ್ಚಿನ ಮಳೆಯ ಸಾಧ್ಯತೆಯಿಂದ ನೀರಾವರಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ.",
    normalIrrigation:
      "ನಿಯಮಿತ ನೀರಾವರಿ ಮಾಡಿ ಮತ್ತು ಹೆಚ್ಚಿನ ನೀರನ್ನು ತಪ್ಪಿಸಿ.",
    fertilizerAdvice:
      "ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷಿಸದ ಸಮಯದಲ್ಲಿ ರಸಗೊಬ್ಬರ ಹಾಕಿ.",
    pestAdvice:
      "ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    highWindSpraying:
      "ಗಾಳಿಯ ವೇಗ ಹೆಚ್ಚಿರುವುದರಿಂದ ಸಿಂಪಡಿಸಬೇಡಿ.",
    normalSpraying:
      "ಮಳೆ ಅಥವಾ ಬಲವಾದ ಗಾಳಿಯ ಸಮಯದಲ್ಲಿ ಸಿಂಪಡಿಸಬೇಡಿ.",
    paddy: "ಭತ್ತ",
    wheat: "ಗೋಧಿ",
    groundnut: "ಕಡಲೆಕಾಯಿ",
    tomato: "ಟೊಮ್ಯಾಟೊ",
    paddyReason:
      "ಹೆಚ್ಚಿನ ಮಳೆಯ ಸಾಧ್ಯತೆ ಮತ್ತು ತೇವಾಂಶ ಭತ್ತದ ಬೆಳೆಗೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    wheatReason:
      "ತಂಪಾದ ತಾಪಮಾನ ಮತ್ತು ಮಧ್ಯಮ ಮಳೆ ಗೋಧಿಗೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    groundnutReason:
      "ಬೆಚ್ಚಗಿನ ಮತ್ತು ತುಲನಾತ್ಮಕವಾಗಿ ಒಣ ಹವಾಮಾನ ಕಡಲೆಕಾಯಿಗೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    tomatoReason:
      "ಬೆಚ್ಚಗಿನ ಹವಾಮಾನ ಮತ್ತು ಮಧ್ಯಮ ಮಳೆ ಟೊಮ್ಯಾಟೊ ಬೆಳೆಗೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    weatherError:
      "ಲೈವ್ ಹವಾಮಾನ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  },

  mr: {
    title: "हवामान आणि शेती सल्ला",
    subtitle:
      "तुमच्या भागातील वास्तविक हवामान पाहून सर्वोत्तम पीक निवडा",
    location: "गावाचा हवामान अंदाज",
    state: "राज्य",
    district: "जिल्हा",
    village: "गाव",
    selectState: "राज्य निवडा",
    selectDistrict: "जिल्हा निवडा",
    selectVillage: "गाव निवडा",
    getWeather: "लाइव्ह हवामान आणि पीक शिफारस मिळवा",
    loading: "लाइव्ह हवामान मिळवत आहे...",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    wind: "वारा",
    rain: "पावसाची शक्यता",
    sunny: "सनी",
    cloudy: "अंशतः ढगाळ",
    rainy: "पाऊस",
    thunderstorm: "वादळी पाऊस",
    bestCrop: "या हवामानासाठी सर्वोत्तम पीक",
    whyCrop: "हे पीक का?",
    advice: "आजचा शेती सल्ला",
    irrigation: "सिंचन",
    fertilizer: "खत",
    pest: "कीड / रोग",
    spraying: "फवारणी",
    live: "लाइव्ह हवामान माहिती",
    selectedLocation: "निवडलेले ठिकाण",
    highRain: "जास्त पावसाच्या शक्यतेमुळे सिंचन कमी करा.",
    normalIrrigation:
      "नियमित सिंचन करा आणि जास्त पाणी टाळा.",
    fertilizerAdvice:
      "जोरदार पाऊस अपेक्षित नसताना खत द्या.",
    pestAdvice:
      "कीड आणि रोगांसाठी पानांची नियमित तपासणी करा.",
    highWindSpraying:
      "वाऱ्याचा वेग जास्त असल्याने फवारणी करू नका.",
    normalSpraying:
      "पाऊस किंवा जोरदार वाऱ्याच्या वेळी फवारणी करू नका.",
    paddy: "भात",
    wheat: "गहू",
    groundnut: "भुईमूग",
    tomato: "टोमॅटो",
    paddyReason:
      "जास्त पावसाची शक्यता आणि आर्द्रता भातासाठी योग्य असू शकते.",
    wheatReason:
      "थंड तापमान आणि मध्यम पाऊस गव्हासाठी योग्य असू शकतो.",
    groundnutReason:
      "उबदार आणि तुलनेने कोरडे हवामान भुईमुगासाठी योग्य असू शकते.",
    tomatoReason:
      "उबदार हवामान आणि मध्यम पाऊस टोमॅटोसाठी योग्य असू शकतो.",
    weatherError:
      "लाइव्ह हवामान मिळवता आले नाही. इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
  },

  bn: {
    title: "আবহাওয়া ও কৃষি পরামর্শ",
    subtitle:
      "আপনার এলাকার বাস্তব আবহাওয়া দেখে সেরা ফসল নির্বাচন করুন",
    location: "গ্রামের আবহাওয়ার পূর্বাভাস",
    state: "রাজ্য",
    district: "জেলা",
    village: "গ্রাম",
    selectState: "রাজ্য নির্বাচন করুন",
    selectDistrict: "জেলা নির্বাচন করুন",
    selectVillage: "গ্রাম নির্বাচন করুন",
    getWeather: "লাইভ আবহাওয়া ও ফসলের সুপারিশ দেখুন",
    loading: "লাইভ আবহাওয়া পাওয়া যাচ্ছে...",
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    rain: "বৃষ্টির সম্ভাবনা",
    sunny: "রৌদ্রোজ্জ্বল",
    cloudy: "আংশিক মেঘলা",
    rainy: "বৃষ্টি",
    thunderstorm: "বজ্রসহ বৃষ্টি",
    bestCrop: "এই আবহাওয়ার জন্য সেরা ফসল",
    whyCrop: "এই ফসল কেন?",
    advice: "আজকের কৃষি পরামর্শ",
    irrigation: "সেচ",
    fertilizer: "সার",
    pest: "পোকা / রোগ",
    spraying: "স্প্রে",
    live: "লাইভ আবহাওয়ার তথ্য",
    selectedLocation: "নির্বাচিত স্থান",
    highRain: "অতিরিক্ত বৃষ্টির সম্ভাবনার কারণে সেচ কমিয়ে দিন।",
    normalIrrigation:
      "নিয়মিত সেচ দিন এবং অতিরিক্ত জল এড়িয়ে চলুন।",
    fertilizerAdvice:
      "ভারী বৃষ্টির সম্ভাবনা না থাকলে সার প্রয়োগ করুন।",
    pestAdvice:
      "পোকামাকড় ও রোগের জন্য নিয়মিত পাতা পরীক্ষা করুন।",
    highWindSpraying:
      "বাতাসের গতি বেশি হওয়ায় স্প্রে করবেন না।",
    normalSpraying:
      "বৃষ্টি বা প্রবল বাতাসের সময় স্প্রে করবেন না।",
    paddy: "ধান",
    wheat: "গম",
    groundnut: "চিনাবাদাম",
    tomato: "টমেটো",
    paddyReason:
      "উচ্চ বৃষ্টির সম্ভাবনা ও আর্দ্রতা ধান চাষের জন্য উপযুক্ত হতে পারে।",
    wheatReason:
      "ঠান্ডা তাপমাত্রা ও মাঝারি বৃষ্টিপাত গমের জন্য উপযুক্ত হতে পারে।",
    groundnutReason:
      "উষ্ণ ও তুলনামূলক শুষ্ক আবহাওয়া চিনাবাদামের জন্য উপযুক্ত হতে পারে।",
    tomatoReason:
      "উষ্ণ আবহাওয়া ও মাঝারি বৃষ্টিপাত টমেটোর জন্য উপযুক্ত হতে পারে।",
    weatherError:
      "লাইভ আবহাওয়া পাওয়া যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।",
  },
};

/* =========================================================
   LOCATION DATA
========================================================= */

type LocalizedName = Record<LanguageCode, string>;

type VillageItem = {
  name: LocalizedName;
  searchName: string;
};

type DistrictItem = {
  name: LocalizedName;
  searchName: string;
  villages: VillageItem[];
};

type LocationItem = {
  name: LocalizedName;
  searchName: string;
  districts: DistrictItem[];
};

const n = (
  en: string,
  te: string,
  hi: string,
  ta: string,
  kn: string,
  mr: string,
  bn: string,
): LocalizedName => ({
  en,
  te,
  hi,
  ta,
  kn,
  mr,
  bn,
});

const village = (
  en: string,
  te: string,
  hi: string,
  ta: string,
  kn: string,
  mr: string,
  bn: string,
): VillageItem => ({
  name: n(en, te, hi, ta, kn, mr, bn),
  searchName: en,
});

const district = (
  en: string,
  te: string,
  hi: string,
  ta: string,
  kn: string,
  mr: string,
  bn: string,
  villages: VillageItem[],
): DistrictItem => ({
  name: n(en, te, hi, ta, kn, mr, bn),
  searchName: en,
  villages,
});

const locations: LocationItem[] = [
  {
    name: n(
      "Tamil Nadu",
      "తమిళనాడు",
      "तमिलनाडु",
      "தமிழ்நாடு",
      "ತಮಿಳುನಾಡು",
      "तमिळनाडू",
      "তামিলনাড়ু",
    ),
    searchName: "Tamil Nadu",
    districts: [
      district(
        "Madurai",
        "మదురై",
        "मदुरै",
        "மதுரை",
        "ಮದುರೈ",
        "मदुराई",
        "মাদুরাই",
        [
          village(
            "Melur",
            "మెలూర్",
            "मेलूर",
            "மேலூர்",
            "ಮೇಲೂರು",
            "मेलूर",
            "মেলুর",
          ),
          village(
            "Usilampatti",
            "ఉసిలంపట్టి",
            "उसिलमपट्टी",
            "உசிலம்பட்டி",
            "ಉಸಿಲಂಪಟ್ಟಿ",
            "उसिलमपट्टी",
            "উসিলামপট্টি",
          ),
          village(
            "Thirumangalam",
            "తిరుమంగళం",
            "तिरुमंगलम",
            "திருமங்கலம்",
            "ತಿರುಮಂಗಲಂ",
            "तिरुमंगलम",
            "তিরুমঙ্গলম",
          ),
        ],
      ),
      district(
        "Virudhunagar",
        "విరుదునగర్",
        "विरुधुनगर",
        "விருதுநகர்",
        "ವಿರುದುನಗರ",
        "विरुधुनगर",
        "বিরুধুনগর",
        [
          village(
            "Srivilliputtur",
            "శ్రీవిల్లిపుత్తూరు",
            "श्रीविल्लिपुत्तूर",
            "ஸ்ரீவில்லிபுத்தூர்",
            "ಶ್ರೀವಿಲ್ಲಿಪುತ್ತೂರು",
            "श्रीविल्लिपुत्तूर",
            "শ্রীভিল্লিপুত্তুর",
          ),
          village(
            "Rajapalayam",
            "రాజపాళయం",
            "राजपालायम",
            "ராஜபாளையம்",
            "ರಾಜಪಾಳಯಂ",
            "राजपालायम",
            "রাজাপালায়ম",
          ),
          village(
            "Sivakasi",
            "శివకాశి",
            "शिवकाशी",
            "சிவகாசி",
            "ಶಿವಕಾಶಿ",
            "शिवकाशी",
            "শিবকাশী",
          ),
        ],
      ),
      district(
        "Coimbatore",
        "కోయంబత్తూరు",
        "कोयंबटूर",
        "கோயம்புத்தூர்",
        "ಕೊಯಮತ್ತೂರು",
        "कोयंबतूर",
        "কোয়েম্বাটুর",
        [
          village(
            "Pollachi",
            "పొల్లాచి",
            "पोल्लाची",
            "பொள்ளாச்சி",
            "ಪೊಲ್ಲಾಚಿ",
            "पोल्लाची",
            "পোল্লাচি",
          ),
          village(
            "Mettupalayam",
            "మెట్టుపాళయం",
            "मेट्टुपालयम",
            "மேட்டுப்பாளையம்",
            "ಮೆಟ್ಟுப்பಾಳಯಂ",
            "मेट्टुपालयम",
            "মেট্টুপালায়ম",
          ),
          village(
            "Sulur",
            "సూలూర్",
            "सुलूर",
            "சூலூர்",
            "ಸೂಲೂರು",
            "सुलूर",
            "সুলুর",
          ),
        ],
      ),
    ],
  },

  {
    name: n(
      "Maharashtra",
      "మహారాష్ట్ర",
      "महाराष्ट्र",
      "மகாராஷ்டிரா",
      "ಮಹಾರಾಷ್ಟ್ರ",
      "महाराष्ट्र",
      "মহারাষ্ট্র",
    ),
    searchName: "Maharashtra",
    districts: [
      district(
        "Nashik",
        "నాసిక్",
        "नासिक",
        "நாசிக்",
        "ನಾಸಿಕ್",
        "नाशिक",
        "নাসিক",
        [
          village(
            "Nashik",
            "నాసిక్",
            "नासिक",
            "நாசிக்",
            "ನಾಸಿಕ್",
            "नाशिक",
            "নাসিক",
          ),
          village(
            "Sinnar",
            "సిన్నార్",
            "सिन्नर",
            "சின்னர்",
            "ಸಿನ್ನರ್",
            "सिन्नर",
            "সিন্নার",
          ),
          village(
            "Yeola",
            "యేవ్లా",
            "येवला",
            "யேவ்லா",
            "ಯೇವ್ಲಾ",
            "येवला",
            "ইয়েওলা",
          ),
        ],
      ),
      district(
        "Pune",
        "పూణే",
        "पुणे",
        "புனே",
        "ಪುಣೆ",
        "पुणे",
        "পুনে",
        [
          village(
            "Baramati",
            "బారామతి",
            "बारामती",
            "பாராமதி",
            "ಬಾರಾಮತಿ",
            "बारामती",
            "বারামতি",
          ),
          village(
            "Haveli",
            "హవేలీ",
            "हवेली",
            "ஹவேலி",
            "ಹವೇಲಿ",
            "हवेली",
            "হাভেলি",
          ),
          village(
            "Mulshi",
            "ముల్షీ",
            "मुळशी",
            "முல்ஷி",
            "ಮುಳ್ಶಿ",
            "मुळशी",
            "মুলশি",
          ),
        ],
      ),
      district(
        "Nagpur",
        "నాగ్‌పూర్",
        "नागपुर",
        "நாக்பூர்",
        "ನಾಗ್ಪುರ",
        "नागपूर",
        "নাগপুর",
        [
          village(
            "Katol",
            "కటోల్",
            "कटोल",
            "கடோல்",
            "ಕಟೋಲ್",
            "काटोल",
            "কাটোল",
          ),
          village(
            "Kamptee",
            "కాంప్టీ",
            "कामठी",
            "காம்ப்டீ",
            "ಕಾಂಪ್ಟೀ",
            "कामठी",
            "কামটি",
          ),
          village(
            "Hingna",
            "హింగ్నా",
            "हिंगना",
            "ஹிங்னா",
            "ಹಿಂಗ್ನಾ",
            "हिंगणा",
            "হিংনা",
          ),
        ],
      ),
    ],
  },

  {
    name: n(
      "Telangana",
      "తెలంగాణ",
      "तेलंगाना",
      "தெலங்கானா",
      "ತೆಲಂಗಾಣ",
      "तेलंगणा",
      "তেলেঙ্গানা",
    ),
    searchName: "Telangana",
    districts: [
      district(
        "Hyderabad",
        "హైదరాబాద్",
        "हैदराबाद",
        "ஹைதராபாத்",
        "ಹೈದರಾಬಾದ್",
        "हैदराबाद",
        "হায়দ্রাবাদ",
        [
          village(
            "Hyderabad",
            "హైదరాబాద్",
            "हैदराबाद",
            "ஹைதராபாத்",
            "ಹೈದರಾಬಾದ್",
            "हैदराबाद",
            "হায়দ্রাবাদ",
          ),
          village(
            "Shamshabad",
            "శంషాబాద్",
            "शमशाबाद",
            "ஷம்ஷாபாத்",
            "ಶಂಶಾಬಾದ್",
            "शमशाबाद",
            "শামশাবাদ",
          ),
          village(
            "Medchal",
            "మెద్చల్",
            "मेडचल",
            "மேட்சல்",
            "ಮೆಡ್ಚಲ್",
            "मेडचल",
            "মেডচাল",
          ),
        ],
      ),
      district(
        "Warangal",
        "వరంగల్",
        "वारंगल",
        "வாரங்கல்",
        "ವಾರಂಗಲ್",
        "वारंगल",
        "ওয়ারাঙ্গল",
        [
          village(
            "Warangal",
            "వరంగల్",
            "वारंगल",
            "வாரங்கல்",
            "ವಾರಂಗಲ್",
            "वारंगल",
            "ওয়ারাঙ্গল",
          ),
          village(
            "Parkal",
            "పరకాల",
            "पारकल",
            "பர்கல்",
            "ಪಾರ್ಕಲ್",
            "पारकल",
            "পারকাল",
          ),
          village(
            "Narsampet",
            "నర్సంపేట్",
            "नरसंपेट",
            "நரசம்பேட்",
            "ನರಸಂಪೇಟೆ",
            "नरसंपेट",
            "নরসামপেট",
          ),
        ],
      ),
      district(
        "Nalgonda",
        "నల్గొండ",
        "नलगोंडा",
        "நல்கொண்டா",
        "ನಲ್ಗೊಂಡ",
        "नलगोंडा",
        "নালগোন্ডা",
        [
          village(
            "Nalgonda",
            "నల్గొండ",
            "नलगोंडा",
            "நல்கொண்டா",
            "ನಲ್ಗೊಂಡ",
            "नलगोंडा",
            "নালগোন্ডা",
          ),
          village(
            "Miryalaguda",
            "మిర్యాలగూడ",
            "मिर्यालगुडा",
            "மிரியாலகுடா",
            "ಮಿರಿಯಾಲಗುಡ",
            "मिर्यालगुडा",
            "মিরিয়ালগুডা",
          ),
          village(
            "Devarakonda",
            "దేవరకొండ",
            "देवरकोंडा",
            "தேவரகொண்டா",
            "ದೇವರಕೊಂಡ",
            "देवरकोंडा",
            "দেবরাকোন্ডা",
          ),
        ],
      ),
    ],
  },

  {
    name: n(
      "Andhra Pradesh",
      "ఆంధ్రప్రదేశ్",
      "आंध्र प्रदेश",
      "ஆந்திரப் பிரதேசம்",
      "ಆಂಧ್ರ ಪ್ರದೇಶ",
      "आंध्र प्रदेश",
      "অন্ধ্রপ্রদেশ",
    ),
    searchName: "Andhra Pradesh",
    districts: [
      district(
        "Guntur",
        "గుంటూరు",
        "गुंटूर",
        "குண்டூர்",
        "ಗುಂಟೂರು",
        "गुंटूर",
        "গুন্টুর",
        [
          village(
            "Guntur",
            "గుంటూరు",
            "गुंटूर",
            "குண்டூர்",
            "ಗುಂಟೂರು",
            "गुंटूर",
            "গুন্টুর",
          ),
          village(
            "Tenali",
            "తెనాలి",
            "तेनाली",
            "தெனாலி",
            "ತೆನಾಲಿ",
            "तेनाली",
            "তেনালি",
          ),
          village(
            "Mangalagiri",
            "మంగళగిరి",
            "मंगलगिरि",
            "மங்களகிரி",
            "ಮಂಗಳಗಿರಿ",
            "मंगलगिरी",
            "মঙ্গলগিরি",
          ),
        ],
      ),
      district(
        "Vijayawada",
        "విజయవాడ",
        "विजयवाड़ा",
        "விஜயவாடா",
        "ವಿಜಯವಾಡ",
        "विजयवाडा",
        "বিজয়ওয়াড়া",
        [
          village(
            "Vijayawada",
            "విజయవాడ",
            "विजयवाड़ा",
            "விஜயவாடா",
            "ವಿಜಯವಾಡ",
            "विजयवाडा",
            "বিজয়ওয়াড়া",
          ),
          village(
            "Nandigama",
            "నందిగామ",
            "नंदीगामा",
            "நந்திகாமா",
            "ನಂದಿಗಾಮ",
            "नंदीगामा",
            "নন্দিগামা",
          ),
          village(
            "Ibrahimpatnam",
            "ఇబ్రహీంపట్నం",
            "इब्राहिमपट्टनम",
            "இப்ராஹிம்பட்டணம்",
            "ಇಬ್ರಾಹಿಂಪಟ್ಟಣಂ",
            "इब्राहिमपट्टणम",
            "ইব্রাহিমপাটনাম",
          ),
        ],
      ),
      district(
        "Tirupati",
        "తిరుపతి",
        "तिरुपति",
        "திருப்பதி",
        "ತಿರುಪತಿ",
        "तिरुपती",
        "তিরুপতি",
        [
          village(
            "Tirupati",
            "తిరుపతి",
            "तिरुपति",
            "திருப்பதி",
            "ತಿರುಪತಿ",
            "तिरुपती",
            "তিরুপতি",
          ),
          village(
            "Renigunta",
            "రేణిగుంట",
            "रेणिगुंटा",
            "ரேணிகுண்டா",
            "ರೇಣಿಗುಂಟ",
            "रेणिगुंटा",
            "রেনিগুন্টা",
          ),
          village(
            "Chandragiri",
            "చంద్రగిరి",
            "चंद्रगिरि",
            "சந்திரகிரி",
            "ಚಂದ್ರಗಿರಿ",
            "चंद्रगिरी",
            "চন্দ্রগিরি",
          ),
        ],
      ),
    ],
  },

  {
    name: n(
      "Karnataka",
      "కర్ణాటక",
      "कर्नाटक",
      "கர்நாடகா",
      "ಕರ್ನಾಟಕ",
      "कर्नाटक",
      "কর্ণাটক",
    ),
    searchName: "Karnataka",
    districts: [
      district(
        "Bengaluru",
        "బెంగళూరు",
        "बेंगलुरु",
        "பெங்களூரு",
        "ಬೆಂಗಳೂರು",
        "बेंगळुरू",
        "বেঙ্গালুরু",
        [
          village(
            "Bengaluru",
            "బెంగళూరు",
            "बेंगलुरु",
            "பெங்களூரு",
            "ಬೆಂಗಳೂರು",
            "बेंगळुरू",
            "বেঙ্গালুরু",
          ),
          village(
            "Anekal",
            "ఆనేకల్",
            "अनेकल",
            "ஆனேக்கல்",
            "ಆನೇಕಲ್",
            "अनेकल",
            "আনেকাল",
          ),
          village(
            "Devanahalli",
            "దేవనహళ్లి",
            "देवनहल्ली",
            "தேவனஹள்ளி",
            "ದೇವನಹಳ್ಳಿ",
            "देवनहळ्ळी",
            "দেবনাহাল্লি",
          ),
        ],
      ),
      district(
        "Mysuru",
        "మైసూరు",
        "मैसूर",
        "மைசூர்",
        "ಮೈಸೂರು",
        "म्हैसूर",
        "মাইসুরু",
        [
          village(
            "Mysuru",
            "మైసూరు",
            "मैसूर",
            "மைசூர்",
            "ಮೈಸೂರು",
            "म्हैसूर",
            "মাইসুরু",
          ),
          village(
            "Nanjangud",
            "నంజనగూడు",
            "नंजनगुड",
            "நஞ்சன்கூடு",
            "ನಂಜನಗೂಡು",
            "नंजनगुड",
            "নানজানগুড",
          ),
          village(
            "Hunsur",
            "హున్సూర్",
            "हुनसूर",
            "ஹுன்சூர்",
            "ಹುಣಸೂರು",
            "हुनसूर",
            "হুনসুর",
          ),
        ],
      ),
      district(
        "Belagavi",
        "బెలగావి",
        "बेळगावी",
        "பெலகாவி",
        "ಬೆಳಗಾವಿ",
        "बेळगाव",
        "বেলাগাভি",
        [
          village(
            "Belagavi",
            "బెలగావి",
            "बेळगावी",
            "பெலகாவி",
            "ಬೆಳಗಾವಿ",
            "बेळगाव",
            "বেলাগাভি",
          ),
          village(
            "Gokak",
            "గోకాక్",
            "गोकाक",
            "கோகாக்",
            "ಗೋಕಾಕ್",
            "गोकाक",
            "গোকাক",
          ),
          village(
            "Athani",
            "అథణి",
            "अथणी",
            "அதணி",
            "ಅಥಣಿ",
            "अथणी",
            "আথানি",
          ),
        ],
      ),
    ],
  },
];

/* =========================================================
   WEATHER TYPES
========================================================= */

type WeatherData = {
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
  weatherCode: number;
};

/* =========================================================
   OPEN-METEO GEOCODING
========================================================= */

type GeocodingResponse = {
  results?: Array<{
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
    admin1?: string;
    admin2?: string;
  }>;
};

async function getCoordinates(
  villageName: string,
  districtName: string,
  stateName: string,
): Promise<{
  latitude: number;
  longitude: number;
}> {
  // First try the village name with India filter.
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(villageName)}` +
    `&count=10` +
    `&language=en` +
    `&format=json` +
    `&countryCode=IN`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Geocoding request failed");
  }

  const data: GeocodingResponse =
    await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(
      `Location not found: ${villageName}`,
    );
  }

  /*
   * Prefer a result matching the selected
   * district and state.
   */
  const matchingResult = data.results.find(
    (result) => {
      const admin1 =
        result.admin1?.toLowerCase() ?? "";

      const admin2 =
        result.admin2?.toLowerCase() ?? "";

      return (
        admin1.includes(
          stateName.toLowerCase(),
        ) ||
        admin2.includes(
          districtName.toLowerCase(),
        )
      );
    },
  );

  /*
   * If a matching district/state result exists,
   * use it. Otherwise use the first Indian result.
   */
  const firstResult = data.results[0];

  if (!firstResult) {
    throw new Error("Location not found");
  }

  const indianResult =
    matchingResult ?? firstResult;

  return {
    latitude: indianResult.latitude,
    longitude: indianResult.longitude,
  };
}
/* =========================================================
   OPEN-METEO WEATHER
========================================================= */

type OpenMeteoResponse = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    precipitation_probability: number[];
  };
};

async function getRealWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&hourly=precipitation_probability` +
    `&forecast_days=1` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather API request failed");
  }

  const data: OpenMeteoResponse =
    await response.json();

  /*
   * The first hourly precipitation probability
   * is used as the current/nearest forecast probability.
   */
  const rain =
    data.hourly?.precipitation_probability?.[0] ?? 0;

  return {
    temperature: Math.round(
      data.current.temperature_2m,
    ),
    humidity: Math.round(
      data.current.relative_humidity_2m,
    ),
    wind: Math.round(
      data.current.wind_speed_10m,
    ),
    rain: Math.round(rain),
    weatherCode: data.current.weather_code,
  };
}

/* =========================================================
   WEATHER CONDITION
========================================================= */

function getCondition(
  weatherCode: number,
  t: PageText,
) {
  if (
    weatherCode === 95 ||
    weatherCode === 96 ||
    weatherCode === 99
  ) {
    return {
      icon: "⛈️",
      text: t.thunderstorm,
    };
  }

  if (
    weatherCode >= 51 &&
    weatherCode <= 67
  ) {
    return {
      icon: "🌦️",
      text: t.rainy,
    };
  }

  if (
    weatherCode >= 80 &&
    weatherCode <= 82
  ) {
    return {
      icon: "🌧️",
      text: t.rainy,
    };
  }

  if (
    weatherCode === 1 ||
    weatherCode === 2 ||
    weatherCode === 3
  ) {
    return {
      icon: "⛅",
      text: t.cloudy,
    };
  }

  return {
    icon: "☀️",
    text: t.sunny,
  };
}

/* =========================================================
   CROP RECOMMENDATION
========================================================= */

type CropResult = {
  name: string;
  reason: string;
};

function getCrop(
  weather: WeatherData,
  t: PageText,
): CropResult {
  if (weather.rain >= 60 || weather.humidity >= 80) {
    return {
      name: `🌾 ${t.paddy}`,
      reason: t.paddyReason,
    };
  }

  if (weather.temperature <= 28) {
    return {
      name: `🌿 ${t.wheat}`,
      reason: t.wheatReason,
    };
  }

  if (
    weather.temperature >= 32 &&
    weather.rain < 40
  ) {
    return {
      name: `🥜 ${t.groundnut}`,
      reason: t.groundnutReason,
    };
  }

  return {
    name: `🍅 ${t.tomato}`,
    reason: t.tomatoReason,
  };
}

/* =========================================================
   WEATHER PAGE
========================================================= */

function WeatherPage() {
  const { lang } = useI18n();

  const t: PageText =
    pageText[lang] ?? pageText.en;

  const [selectedState, setSelectedState] =
    useState("");

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [selectedVillage, setSelectedVillage] =
    useState("");

  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     SELECTED STATE
  ===================================================== */

  const currentState = useMemo(() => {
    return locations.find(
      (item) =>
        item.name.en === selectedState,
    );
  }, [selectedState]);

  /* =====================================================
     SELECTED DISTRICT
  ===================================================== */

  const currentDistrict = useMemo(() => {
    return currentState?.districts.find(
      (item) =>
        item.name.en === selectedDistrict,
    );
  }, [
    currentState,
    selectedDistrict,
  ]);

  /* =====================================================
     SELECTED VILLAGE
  ===================================================== */

  const currentVillage = useMemo(() => {
    return currentDistrict?.villages.find(
      (item) =>
        item.name.en === selectedVillage,
    );
  }, [
    currentDistrict,
    selectedVillage,
  ]);

  /* =====================================================
     STATE CHANGE
  ===================================================== */

  const handleStateChange = (
    value: string,
  ) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedVillage("");
    setWeather(null);
    setError("");
  };

  /* =====================================================
     DISTRICT CHANGE
  ===================================================== */

  const handleDistrictChange = (
    value: string,
  ) => {
    setSelectedDistrict(value);
    setSelectedVillage("");
    setWeather(null);
    setError("");
  };

  /* =====================================================
     VILLAGE CHANGE
  ===================================================== */

  const handleVillageChange = (
    value: string,
  ) => {
    setSelectedVillage(value);
    setWeather(null);
    setError("");
  };

  /* =====================================================
     GET REAL WEATHER
  ===================================================== */

  const handleGetWeather = async () => {
    if (
      !selectedState ||
      !selectedDistrict ||
      !selectedVillage ||
      !currentVillage ||
      !currentDistrict ||
      !currentState
    ) {
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      /*
       * STEP 1:
       * Find latitude and longitude of selected village.
       */
      const coordinates =
        await getCoordinates(
          currentVillage.searchName,
          currentDistrict.searchName,
          currentState.searchName,
        );

      /*
       * STEP 2:
       * Get live weather using coordinates.
       */
      const result =
        await getRealWeather(
          coordinates.latitude,
          coordinates.longitude,
        );

      setWeather(result);
    } catch (err) {
      console.error(
        "Weather error:",
        err,
      );

      setError(t.weatherError);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CROP
  ===================================================== */

  const crop =
    weather
      ? getCrop(weather, t)
      : null;

  /* =====================================================
     CONDITION
  ===================================================== */

  const condition =
    weather
      ? getCondition(
          weather.weatherCode,
          t,
        )
      : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4faf5",
        padding: "30px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              marginBottom: "10px",
              color: "#1b5e20",
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#555",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* =================================================
            LOCATION SELECTION
        ================================================= */}

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            📍 {t.location}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            {/* STATE */}

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {t.state}
              </label>

              <select
                value={selectedState}
                onChange={(e) =>
                  handleStateChange(
                    e.target.value,
                  )
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border:
                    "1px solid #ccc",
                  fontSize: "15px",
                  background: "white",
                }}
              >
                <option value="">
                  {t.selectState}
                </option>

                {locations.map(
                  (item) => (
                    <option
                      key={
                        item.name.en
                      }
                      value={
                        item.name.en
                      }
                    >
                      {
                        item.name[
                          lang
                        ]
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* DISTRICT */}

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {t.district}
              </label>

              <select
                value={
                  selectedDistrict
                }
                onChange={(e) =>
                  handleDistrictChange(
                    e.target.value,
                  )
                }
                disabled={
                  !selectedState
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border:
                    "1px solid #ccc",
                  fontSize: "15px",
                  background:
                    "white",
                }}
              >
                <option value="">
                  {t.selectDistrict}
                </option>

                {currentState?.districts.map(
                  (item) => (
                    <option
                      key={
                        item.name.en
                      }
                      value={
                        item.name.en
                      }
                    >
                      {
                        item.name[
                          lang
                        ]
                      }
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* VILLAGE */}

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                {t.village}
              </label>

              <select
                value={
                  selectedVillage
                }
                onChange={(e) =>
                  handleVillageChange(
                    e.target.value,
                  )
                }
                disabled={
                  !selectedDistrict
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border:
                    "1px solid #ccc",
                  fontSize: "15px",
                  background:
                    "white",
                }}
              >
                <option value="">
                  {t.selectVillage}
                </option>

                {currentDistrict?.villages.map(
                  (item) => (
                    <option
                      key={
                        item.name.en
                      }
                      value={
                        item.name.en
                      }
                    >
                      {
                        item.name[
                          lang
                        ]
                      }
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* BUTTON */}

          <button
            onClick={
              handleGetWeather
            }
            disabled={
              loading ||
              !selectedState ||
              !selectedDistrict ||
              !selectedVillage
            }
            style={{
              marginTop: "22px",
              padding:
                "14px 22px",
              border: "none",
              borderRadius:
                "10px",
              background:
                loading ||
                !selectedState ||
                !selectedDistrict ||
                !selectedVillage
                  ? "#aaa"
                  : "#2e7d32",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor:
                loading ||
                !selectedState ||
                !selectedDistrict ||
                !selectedVillage
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? `⏳ ${t.loading}`
              : `🌦️ ${t.getWeather}`}
          </button>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "18px",
              borderRadius: "12px",
              marginBottom: "25px",
              border:
                "1px solid #ffcdd2",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* =================================================
            WEATHER RESULT
        ================================================= */}

        {weather && (
          <>
            <div
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "18px",
                boxShadow:
                  "0 4px 18px rgba(0,0,0,0.08)",
                marginBottom: "25px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                }}
              >
                📍{" "}
                {currentVillage?.name[
                  lang
                ] ?? ""}
                {", "}
                {currentDistrict?.name[
                  lang
                ] ?? ""}
              </h2>

              <p
                style={{
                  color: "#666",
                  marginBottom:
                    "20px",
                }}
              >
                {currentState?.name[
                  lang
                ] ?? ""}
              </p>

              {/* LIVE BADGE */}

              <div
                style={{
                  display:
                    "inline-block",
                  background:
                    "#e8f5e9",
                  color:
                    "#2e7d32",
                  padding:
                    "7px 12px",
                  borderRadius:
                    "20px",
                  fontWeight:
                    "bold",
                  fontSize:
                    "14px",
                  marginBottom:
                    "20px",
                }}
              >
                🟢 {t.live}
              </div>

              {/* MAIN WEATHER */}

              <div
                style={{
                  textAlign:
                    "center",
                  padding:
                    "10px",
                  marginBottom:
                    "20px",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "48px",
                    fontWeight:
                      "bold",
                    color:
                      "#2e7d32",
                  }}
                >
                  {
                    weather.temperature
                  }
                  °C
                </div>

                <div
                  style={{
                    fontSize:
                      "22px",
                    marginTop:
                      "8px",
                  }}
                >
                  {
                    condition?.icon
                  }{" "}
                  {
                    condition?.text
                  }
                </div>
              </div>

              {/* WEATHER CARDS */}

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "15px",
                }}
              >
                <Info
                  icon="🌡️"
                  title={
                    t.temperature
                  }
                  value={`${weather.temperature}°C`}
                />

                <Info
                  icon="💧"
                  title={
                    t.humidity
                  }
                  value={`${weather.humidity}%`}
                />

                <Info
                  icon="💨"
                  title={
                    t.wind
                  }
                  value={`${weather.wind} km/h`}
                />

                <Info
                  icon="🌧️"
                  title={
                    t.rain
                  }
                  value={`${weather.rain}%`}
                />
              </div>
            </div>

            {/* =================================================
                CROP
            ================================================= */}

            {crop && (
              <div
                style={{
                  background:
                    "#e8f5e9",
                  padding:
                    "28px",
                  borderRadius:
                    "18px",
                  marginBottom:
                    "25px",
                  border:
                    "1px solid #c8e6c9",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                  }}
                >
                  🌱{" "}
                  {t.bestCrop}
                </h2>

                <h1
                  style={{
                    color:
                      "#2e7d32",
                    marginBottom:
                      "15px",
                  }}
                >
                  {crop.name}
                </h1>

                <h3>
                  {t.whyCrop}
                </h3>

                <p
                  style={{
                    fontSize:
                      "17px",
                    lineHeight:
                      "1.6",
                  }}
                >
                  {crop.reason}
                </p>
              </div>
            )}

            {/* =================================================
                FARMING ADVICE
            ================================================= */}

            <div
              style={{
                background:
                  "#ffffff",
                padding:
                  "28px",
                borderRadius:
                  "18px",
                boxShadow:
                  "0 4px 18px rgba(0,0,0,0.08)",
                marginBottom:
                  "25px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                }}
              >
                🌾{" "}
                {t.advice}
              </h2>

              <Advice
                icon="💧"
                title={
                  t.irrigation
                }
                text={
                  weather.rain >
                    60
                    ? t.highRain
                    : t.normalIrrigation
                }
              />

              <Advice
                icon="🌱"
                title={
                  t.fertilizer
                }
                text={
                  t.fertilizerAdvice
                }
              />

              <Advice
                icon="🐛"
                title={
                  t.pest
                }
                text={
                  t.pestAdvice
                }
              />

              <Advice
                icon="🚜"
                title={
                  t.spraying
                }
                text={
                  weather.wind >
                  15
                    ? t.highWindSpraying
                    : t.normalSpraying
                }
              />
            </div>

            {/* =================================================
                SELECTED LOCATION
            ================================================= */}

            <div
              style={{
                background:
                  "#fff8e1",
                padding:
                  "22px",
                borderRadius:
                  "16px",
                marginBottom:
                  "25px",
              }}
            >
              <strong>
                📍{" "}
                {
                  t.selectedLocation
                }
              </strong>

              <p>
                {t.state}:{" "}
                {
                  currentState?.name[
                    lang
                  ] ?? ""
                }
              </p>

              <p>
                {t.district}:{" "}
                {
                  currentDistrict?.name[
                    lang
                  ] ?? ""
                }
              </p>

              <p>
                {t.village}:{" "}
                {
                  currentVillage?.name[
                    lang
                  ] ?? ""
                }
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   WEATHER INFO CARD
========================================================= */

function Info({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background:
          "#f5f5f5",
        borderRadius:
          "14px",
        padding:
          "20px",
        textAlign:
          "center",
      }}
    >
      <div
        style={{
          fontSize:
            "28px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color:
            "#666",
          marginTop:
            "8px",
          marginBottom:
            "5px",
        }}
      >
        {title}
      </div>

      <strong
        style={{
          fontSize:
            "24px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   FARMING ADVICE CARD
========================================================= */

function Advice({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        gap:
          "15px",
        padding:
          "18px 0",
        borderBottom:
          "1px solid #eee",
      }}
    >
      <div
        style={{
          fontSize:
            "28px",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            margin:
              "0 0 6px",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color:
              "#555",
            lineHeight:
              "1.5",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}