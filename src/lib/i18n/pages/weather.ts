import type { LanguageCode } from "../languages";

export const weatherEn = {
  eyebrow: "Your village weather",
  title: "Weather & Farming Advisory",
  description:
    "Village-level weather forecast with practical advice for your farm.",

  state: "State",
  districtVillage: "District / Village",
  crop: "Crop",

  selectState: "Select state",
  selectCrop: "Select crop",
  districtPlaceholder: "e.g. Rampur, Nashik",

  refreshForecast: "Refresh Forecast",

  demoTitle: "Demo forecast — connect to a live weather service in the future.",
  demoDescription:
    "The data shown here is simulated for demonstration. Do not use it for real-time farming decisions without checking IMD or a trusted local source.",

  humidity: "Humidity",
  wind: "Wind",
  rainChance: "Rain chance",
  low: "Low",

  activeAlerts: "Active alerts",

  heavyRainExpected: "Heavy Rain Expected",
  avoidSprayingBeforeRain: "Avoid Spraying Before Rain",
  highTemperature: "High Temperature",
  suitableForIrrigation: "Suitable for Irrigation",
  normalWeather: "Normal Weather",

  heavyRainMessage:
    "More than 80% rain chance in the coming week. Secure stored crops and clear drains.",

  avoidSprayingMessage:
    "Rain is expected within the next 7 days. Delay pesticide and foliar sprays until after the rain passes.",

  highTemperatureMessage:
    "Several days are above 38°C. Avoid heavy field work at midday and irrigate sensitive crops.",

  irrigationMessage:
    "Several dry, warm days ahead. Good window for irrigation and fertilizer application.",

  normalWeatherMessage:
    "No strong weather extremes expected. Follow routine crop care and scout the field every 2-3 days.",

  today: "Today",

  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",

  sunny: "Sunny",
  partlyCloudy: "Partly cloudy",
  cloudy: "Cloudy",
  showers: "Showers",
  thunderstorm: "Thunderstorm",
  clear: "Clear",

  todaysFarmingAdvice: "Today's farming advice",
  generatedFor: "Generated for",

  cropSpecificAdvisory: "Crop-specific advisory",
  cropAdvisoryDescription:
    "Sowing, irrigation, pest and spraying guidance for",

  sowingAdvice: "Sowing advice",
  irrigationAdvice: "Irrigation advice",
  fertilizerAdvice: "Fertilizer advice",
  pestDiseasePrecaution: "Pest / disease precaution",
  sprayingRecommendation: "Spraying recommendation",
  rainWarning: "Rain warning",

  wheat: "Wheat",
  rice: "Rice / Paddy",
  tomato: "Tomato",
  cotton: "Cotton",
  groundnut: "Groundnut",

  andhraPradesh: "Andhra Pradesh",
  bihar: "Bihar",
  gujarat: "Gujarat",
  haryana: "Haryana",
  karnataka: "Karnataka",
  kerala: "Kerala",
  madhyaPradesh: "Madhya Pradesh",
  maharashtra: "Maharashtra",
  odisha: "Odisha",
  punjab: "Punjab",
  rajasthan: "Rajasthan",
  tamilNadu: "Tamil Nadu",
  telangana: "Telangana",
  uttarPradesh: "Uttar Pradesh",
  westBengal: "West Bengal",

  wheatSowing:
    "Sow wheat when soil temperature is 15-22°C and the field is well-prepared after rice harvest.",
  wheatIrrigation:
    "Irrigate at crown-root stage and again at flowering. Avoid waterlogging after rain.",
  wheatFertilizer:
    "Apply first split of 60 kg urea per acre at tillering stage if the forecast is dry.",
  wheatPest:
    "Watch for yellow rust in cool humid spells; yellow-orange streaks on leaves need urgent attention.",
  wheatSpraying:
    "Foliar fungicide works best on dry, calm mornings with wind below 12 km/h.",
  wheatRain:
    "Heavy rain after sowing can delay emergence and promote root rot; ensure field drainage.",

  riceSowing:
    "Transplant 20-25 day-old seedlings after monsoon rain fills the field.",
  riceIrrigation:
    "Maintain 2-5 cm standing water during tillering and booting; drain before harvest.",
  riceFertilizer:
    "Avoid top-dressing nitrogen if heavy rain is expected in the next 48 hours.",
  ricePest:
    "Bacterial leaf blight spreads in warm humid weather; watch for water-soaked leaf tips.",
  riceSpraying:
    "Do not spray within 6 hours of expected rain; use a sticker-spreader in drizzles.",
  riceRain:
    "Strong winds during rain can lodge the crop; keep fields at moderate water depth.",

  tomatoSowing:
    "Sow nursery seeds in warm soil; transplant after danger of frost and heavy rain passes.",
  tomatoIrrigation:
    "Drip irrigation at 6-8 mm daily gives the best yield and reduces fruit cracking.",
  tomatoFertilizer:
    "Top-dress with NPK 19:19:19 after fruit-set; pause before forecast rain.",
  tomatoPest:
    "Early blight and leaf curl thrive in humid weather; scout lower leaves twice a week.",
  tomatoSpraying:
    "Apply fungicide early morning; avoid spraying when wind is above 15 km/h.",
  tomatoRain:
    "Sudden heavy rain causes fruit splitting and blossom-end rot; mulch beds to reduce splash.",

  cottonSowing:
    "Sow cotton when soil temperature stays above 20°C and monsoon is active but not flooding.",
  cottonIrrigation:
    "Irrigate during flowering and boll formation; reduce water after first flush.",
  cottonFertilizer:
    "Apply 40 kg urea per acre at squaring stage; skip if heavy rain is expected.",
  cottonPest:
    "Pink bollworm and whitefly peak in warm dry spells; monitor bolls for entry holes.",
  cottonSpraying:
    "Bollworm spray is effective on calm, rain-free days; spray before 9 AM.",
  cottonRain:
    "Prolonged rain increases boll rot; ensure drainage and pick mature bolls quickly.",

  groundnutSowing:
    "Sow groundnut when soil moisture is adequate and 3-4 days of rain are not expected.",
  groundnutIrrigation:
    "Critical irrigations at pegging and pod-filling; avoid during harvest.",
  groundnutFertilizer:
    "Apply gypsum at flowering and a light dose of DAP at 25 days after sowing.",
  groundnutPest:
    "Leaf miner and red hairy caterpillar appear in dry spells; inspect under the canopy.",
  groundnutSpraying:
    "Foliar calcium and fungicide sprays should be done on dry, cloudy mornings.",
  groundnutRain:
    "Waterlogging during pod-filling causes root rot; build raised ridges and open drains.",
} as const;

export type WeatherKey = keyof typeof weatherEn;

type Dict = Record<WeatherKey, string>;

export const weather: Record<LanguageCode, Dict> = {
  en: weatherEn,

  te: {
    ...weatherEn,

    eyebrow: "మీ ఊరి వాతావరణం",
    title: "వాతావరణం & వ్యవసాయ సలహా",
    description: "మీ గ్రామానికి వాతావరణ సూచన మరియు మీ పొలానికి ఉపయోగకరమైన సలహాలు.",

    state: "రాష్ట్రం",
    districtVillage: "జిల్లా / గ్రామం",
    crop: "పంట",

    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    selectCrop: "పంటను ఎంచుకోండి",
    districtPlaceholder: "ఉదా: రాంపూర్, నాసిక్",

    refreshForecast: "వాతావరణ సూచనను రిఫ్రెష్ చేయండి",

    demoTitle: "డెమో సూచన — భవిష్యత్తులో ప్రత్యక్ష వాతావరణ సేవకు అనుసంధానం చేయబడుతుంది.",
    demoDescription:
      "ఇక్కడ చూపిన సమాచారం డెమో కోసం మాత్రమే. నిజమైన వ్యవసాయ నిర్ణయాల కోసం IMD లేదా నమ్మకమైన స్థానిక వనరును తనిఖీ చేయండి.",

    humidity: "తేమ",
    wind: "గాలి",
    rainChance: "వర్షం అవకాశం",
    low: "కనిష్టం",

    activeAlerts: "క్రియాశీల హెచ్చరికలు",

    heavyRainExpected: "భారీ వర్షం వచ్చే అవకాశం",
    avoidSprayingBeforeRain: "వర్షానికి ముందు పిచికారీ చేయవద్దు",
    highTemperature: "అధిక ఉష్ణోగ్రత",
    suitableForIrrigation: "నీటిపారుదలకు అనుకూలం",
    normalWeather: "సాధారణ వాతావరణం",

    heavyRainMessage:
      "ఈ వారంలో 80% కంటే ఎక్కువ వర్షం అవకాశం ఉంది. నిల్వ చేసిన పంటలను రక్షించి కాలువలను శుభ్రం చేయండి.",

    avoidSprayingMessage:
      "తదుపరి 7 రోజుల్లో వర్షం వచ్చే అవకాశం ఉంది. వర్షం తగ్గిన తర్వాత పురుగుమందులు మరియు ఆకులపై పిచికారీ చేయండి.",

    highTemperatureMessage:
      "కొన్ని రోజుల్లో ఉష్ణోగ్రత 38°C కంటే ఎక్కువగా ఉంటుంది. మధ్యాహ్న సమయంలో ఎక్కువ శ్రమను నివారించండి.",

    irrigationMessage:
      "కొన్ని పొడి మరియు వేడి రోజులు ఉన్నాయి. నీటిపారుదల మరియు ఎరువుల కోసం మంచి సమయం.",

    normalWeatherMessage:
      "తీవ్రమైన వాతావరణ మార్పులు లేవు. సాధారణ పంట సంరక్షణను కొనసాగించండి.",

    today: "ఈరోజు",

    monday: "సోమ",
    tuesday: "మంగళ",
    wednesday: "బుధ",
    thursday: "గురు",
    friday: "శుక్ర",
    saturday: "శని",
    sunday: "ఆది",

    sunny: "ఎండగా ఉంది",
    partlyCloudy: "పాక్షికంగా మేఘావృతం",
    cloudy: "మేఘావృతం",
    showers: "జల్లులు",
    thunderstorm: "ఉరుములతో కూడిన వర్షం",
    clear: "ఆకాశం నిర్మలంగా ఉంది",

    todaysFarmingAdvice: "ఈరోజు వ్యవసాయ సలహా",
    generatedFor: "దీని కోసం రూపొందించబడింది",

    cropSpecificAdvisory: "పంటకు సంబంధించిన సలహా",
    cropAdvisoryDescription: "విత్తడం, నీటిపారుదల, తెగుళ్లు మరియు పిచికారీ సలహాలు",

    sowingAdvice: "విత్తనాల సలహా",
    irrigationAdvice: "నీటిపారుదల సలహా",
    fertilizerAdvice: "ఎరువుల సలహా",
    pestDiseasePrecaution: "తెగుళ్లు / వ్యాధి జాగ్రత్త",
    sprayingRecommendation: "పిచికారీ సిఫార్సు",
    rainWarning: "వర్ష హెచ్చరిక",

    wheat: "గోధుమ",
    rice: "వరి",
    tomato: "టమాటా",
    cotton: "పత్తి",
    groundnut: "వేరుశెనగ",

    andhraPradesh: "ఆంధ్రప్రదేశ్",
    bihar: "బీహార్",
    gujarat: "గుజరాత్",
    haryana: "హర్యానా",
    karnataka: "కర్ణాటక",
    kerala: "కేరళ",
    madhyaPradesh: "మధ్యప్రదేశ్",
    maharashtra: "మహారాష్ట్ర",
    odisha: "ఒడిశా",
    punjab: "పంజాబ్",
    rajasthan: "రాజస్థాన్",
    tamilNadu: "తమిళనాడు",
    telangana: "తెలంగాణ",
    uttarPradesh: "ఉత్తరప్రదేశ్",
    westBengal: "పశ్చిమ బెంగాల్",
  },

  hi: {
    ...weatherEn,

    eyebrow: "आपके गाँव का मौसम",
    title: "मौसम और खेती सलाह",
    description: "आपके गाँव के मौसम का पूर्वानुमान और खेत के लिए उपयोगी सलाह।",

    state: "राज्य",
    districtVillage: "जिला / गाँव",
    crop: "फसल",

    selectState: "राज्य चुनें",
    selectCrop: "फसल चुनें",
    districtPlaceholder: "उदा. रामपुर, नासिक",

    refreshForecast: "पूर्वानुमान रीफ्रेश करें",

    demoTitle: "डेमो पूर्वानुमान — भविष्य में लाइव मौसम सेवा से जोड़ा जाएगा।",
    demoDescription:
      "यह जानकारी केवल डेमो के लिए है। वास्तविक खेती के निर्णयों के लिए IMD या भरोसेमंद स्थानीय स्रोत की जानकारी देखें।",

    humidity: "नमी",
    wind: "हवा",
    rainChance: "बारिश की संभावना",
    low: "न्यूनतम",

    activeAlerts: "सक्रिय चेतावनियाँ",

    heavyRainExpected: "भारी बारिश की संभावना",
    avoidSprayingBeforeRain: "बारिश से पहले छिड़काव न करें",
    highTemperature: "अधिक तापमान",
    suitableForIrrigation: "सिंचाई के लिए अनुकूल",
    normalWeather: "सामान्य मौसम",

    heavyRainMessage:
      "आने वाले सप्ताह में 80% से अधिक बारिश की संभावना है। संग्रहित फसल को सुरक्षित रखें और नालियाँ साफ करें.",

    avoidSprayingMessage:
      "अगले 7 दिनों में बारिश की संभावना है। बारिश रुकने के बाद ही कीटनाशक और पत्तियों पर छिड़काव करें।",

    highTemperatureMessage:
      "कई दिनों में तापमान 38°C से अधिक रहेगा। दोपहर में भारी खेत का काम करने से बचें।",

    irrigationMessage:
      "आने वाले दिनों में कुछ सूखे और गर्म दिन हैं। सिंचाई और खाद डालने के लिए अच्छा समय है।",

    normalWeatherMessage:
      "कोई गंभीर मौसम बदलाव अपेक्षित नहीं है। सामान्य फसल देखभाल जारी रखें।",

    today: "आज",

    monday: "सोम",
    tuesday: "मंगल",
    wednesday: "बुध",
    thursday: "गुरु",
    friday: "शुक्र",
    saturday: "शनि",
    sunday: "रवि",

    sunny: "धूप",
    partlyCloudy: "आंशिक बादल",
    cloudy: "बादल",
    showers: "बौछारें",
    thunderstorm: "आंधी और बारिश",
    clear: "साफ मौसम",

    todaysFarmingAdvice: "आज की खेती सलाह",
    generatedFor: "इसके लिए तैयार किया गया",

    cropSpecificAdvisory: "फसल संबंधी सलाह",
    cropAdvisoryDescription: "बुवाई, सिंचाई, कीट और छिड़काव संबंधी सलाह",

    sowingAdvice: "बुवाई सलाह",
    irrigationAdvice: "सिंचाई सलाह",
    fertilizerAdvice: "उर्वरक सलाह",
    pestDiseasePrecaution: "कीट / रोग से बचाव",
    sprayingRecommendation: "छिड़काव की सलाह",
    rainWarning: "बारिश की चेतावनी",

    wheat: "गेहूँ",
    rice: "धान",
    tomato: "टमाटर",
    cotton: "कपास",
    groundnut: "मूंगफली",

    andhraPradesh: "आंध्र प्रदेश",
    bihar: "बिहार",
    gujarat: "गुजरात",
    haryana: "हरियाणा",
    karnataka: "कर्नाटक",
    kerala: "केरल",
    madhyaPradesh: "मध्य प्रदेश",
    maharashtra: "महाराष्ट्र",
    odisha: "ओडिशा",
    punjab: "पंजाब",
    rajasthan: "राजस्थान",
    tamilNadu: "तमिलनाडु",
    telangana: "तेलंगाना",
    uttarPradesh: "उत्तर प्रदेश",
    westBengal: "पश्चिम बंगाल",
  },

  mr: {
    ...weatherEn,

    eyebrow: "तुमच्या गावाचे हवामान",
    title: "हवामान आणि शेती सल्ला",
    description: "गावाच्या हवामानाचा अंदाज आणि शेतासाठी उपयुक्त सल्ला.",

    state: "राज्य",
    districtVillage: "जिल्हा / गाव",
    crop: "पीक",

    selectState: "राज्य निवडा",
    selectCrop: "पीक निवडा",
    districtPlaceholder: "उदा. रामपूर, नाशिक",

    refreshForecast: "अंदाज रीफ्रेश करा",

    humidity: "आर्द्रता",
    wind: "वारा",
    rainChance: "पावसाची शक्यता",
    low: "किमान",

    activeAlerts: "सक्रिय इशारे",

    heavyRainExpected: "मुसळधार पावसाची शक्यता",
    avoidSprayingBeforeRain: "पावसापूर्वी फवारणी टाळा",
    highTemperature: "उच्च तापमान",
    suitableForIrrigation: "सिंचनासाठी योग्य",
    normalWeather: "सामान्य हवामान",

    heavyRainMessage:
      "या आठवड्यात 80% पेक्षा जास्त पावसाची शक्यता आहे. साठवलेली पिके सुरक्षित ठेवा आणि नाले स्वच्छ करा.",

    avoidSprayingMessage:
      "पुढील 7 दिवसांत पावसाची शक्यता आहे. पाऊस थांबल्यानंतरच कीटकनाशक आणि पर्णीय फवारणी करा.",

    highTemperatureMessage:
      "अनेक दिवस तापमान 38°C पेक्षा जास्त असेल. दुपारी जड शेतकाम टाळा.",

    irrigationMessage:
      "पुढील काही दिवस कोरडे आणि उबदार असतील. सिंचन आणि खतासाठी योग्य वेळ आहे.",

    normalWeatherMessage:
      "कोणतेही तीव्र हवामान बदल अपेक्षित नाहीत. नियमित पीक काळजी सुरू ठेवा.",

    today: "आज",

    monday: "सोम",
    tuesday: "मंगळ",
    wednesday: "बुध",
    thursday: "गुरु",
    friday: "शुक्र",
    saturday: "शनि",
    sunday: "रवि",

    sunny: "सूर्यप्रकाश",
    partlyCloudy: "अंशतः ढगाळ",
    cloudy: "ढगाळ",
    showers: "पावसाच्या सरी",
    thunderstorm: "वादळी पाऊस",
    clear: "स्वच्छ हवामान",

    todaysFarmingAdvice: "आजचा शेती सल्ला",
    generatedFor: "यासाठी तयार केले",

    cropSpecificAdvisory: "पिकासाठी विशेष सल्ला",
    cropAdvisoryDescription: "पेरणी, सिंचन, कीड आणि फवारणी संबंधी सल्ला",

    sowingAdvice: "पेरणीचा सल्ला",
    irrigationAdvice: "सिंचनाचा सल्ला",
    fertilizerAdvice: "खताचा सल्ला",
    pestDiseasePrecaution: "कीड / रोग प्रतिबंध",
    sprayingRecommendation: "फवारणीची शिफारस",
    rainWarning: "पावसाचा इशारा",

    wheat: "गहू",
    rice: "भात",
    tomato: "टोमॅटो",
    cotton: "कापूस",
    groundnut: "भुईमूग",

    andhraPradesh: "आंध्र प्रदेश",
    bihar: "बिहार",
    gujarat: "गुजरात",
    haryana: "हरियाणा",
    karnataka: "कर्नाटक",
    kerala: "केरळ",
    madhyaPradesh: "मध्य प्रदेश",
    maharashtra: "महाराष्ट्र",
    odisha: "ओडिशा",
    punjab: "पंजाब",
    rajasthan: "राजस्थान",
    tamilNadu: "तमिळनाडू",
    telangana: "तेलंगणा",
    uttarPradesh: "उत्तर प्रदेश",
    westBengal: "पश्चिम बंगाल",
  },

  ta: {
    ...weatherEn,

    eyebrow: "உங்கள் கிராமத்தின் வானிலை",
    title: "வானிலை மற்றும் விவசாய ஆலோசனை",
    description:
      "கிராம வானிலை முன்னறிவிப்பு மற்றும் உங்கள் வயலுக்கான பயனுள்ள ஆலோசனைகள்.",

    state: "மாநிலம்",
    districtVillage: "மாவட்டம் / கிராமம்",
    crop: "பயிர்",

    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
    districtPlaceholder: "உதா: ராம்பூர், நாசிக்",

    refreshForecast: "முன்னறிவிப்பைப் புதுப்பிக்கவும்",

    demoTitle:
      "டெமோ முன்னறிவிப்பு — எதிர்காலத்தில் நேரடி வானிலை சேவையுடன் இணைக்கப்படும்.",
    demoDescription:
      "இது டெமோ தகவல் மட்டுமே. உண்மையான விவசாய முடிவுகளுக்கு IMD அல்லது நம்பகமான உள்ளூர் தகவலைப் பார்க்கவும்.",

    humidity: "ஈரப்பதம்",
    wind: "காற்று",
    rainChance: "மழை வாய்ப்பு",
    low: "குறைந்தபட்சம்",

    activeAlerts: "செயலில் உள்ள எச்சரிக்கைகள்",

    heavyRainExpected: "கனமழை எதிர்பார்க்கப்படுகிறது",
    avoidSprayingBeforeRain: "மழைக்கு முன் தெளிக்க வேண்டாம்",
    highTemperature: "அதிக வெப்பநிலை",
    suitableForIrrigation: "நீர்ப்பாசனத்திற்கு ஏற்றது",
    normalWeather: "சாதாரண வானிலை",

    heavyRainMessage:
      "இந்த வாரத்தில் 80% க்கும் அதிகமான மழை வாய்ப்பு உள்ளது. சேமித்து வைத்த பயிர்களை பாதுகாத்து கால்வாய்களை சுத்தம் செய்யவும்.",

    avoidSprayingMessage:
      "அடுத்த 7 நாட்களில் மழை பெய்ய வாய்ப்பு உள்ளது. மழை நின்ற பிறகு பூச்சிக்கொல்லி மற்றும் இலைத் தெளிப்பை செய்யவும்.",

    highTemperatureMessage:
      "பல நாட்களில் வெப்பநிலை 38°C க்கும் அதிகமாக இருக்கும். மதிய நேரத்தில் கடினமான வயல் வேலைகளைத் தவிர்க்கவும்.",

    irrigationMessage:
      "சில வறண்ட மற்றும் வெப்பமான நாட்கள் உள்ளன. நீர்ப்பாசனம் மற்றும் உரமிடுவதற்கு ஏற்ற நேரம்.",

    normalWeatherMessage:
      "கடுமையான வானிலை மாற்றங்கள் எதிர்பார்க்கப்படவில்லை. வழக்கமான பயிர் பராமரிப்பைத் தொடரவும்.",

    today: "இன்று",

    monday: "திங்கள்",
    tuesday: "செவ்வாய்",
    wednesday: "புதன்",
    thursday: "வியாழன்",
    friday: "வெள்ளி",
    saturday: "சனி",
    sunday: "ஞாயிறு",

    sunny: "வெயில்",
    partlyCloudy: "பகுதி மேகமூட்டம்",
    cloudy: "மேகமூட்டம்",
    showers: "சாரல் மழை",
    thunderstorm: "இடியுடன் மழை",
    clear: "தெளிவான வானிலை",

    todaysFarmingAdvice: "இன்றைய விவசாய ஆலோசனை",
    generatedFor: "இதற்காக உருவாக்கப்பட்டது",

    cropSpecificAdvisory: "பயிர் சார்ந்த ஆலோசனை",
    cropAdvisoryDescription:
      "விதைப்பு, நீர்ப்பாசனம், பூச்சி மற்றும் தெளிப்பு ஆலோசனைகள்",

    sowingAdvice: "விதைப்பு ஆலோசனை",
    irrigationAdvice: "நீர்ப்பாசன ஆலோசனை",
    fertilizerAdvice: "உர ஆலோசனை",
    pestDiseasePrecaution: "பூச்சி / நோய் முன்னெச்சரிக்கை",
    sprayingRecommendation: "தெளிப்பு பரிந்துரை",
    rainWarning: "மழை எச்சரிக்கை",

    wheat: "கோதுமை",
    rice: "நெல்",
    tomato: "தக்காளி",
    cotton: "பருத்தி",
    groundnut: "நிலக்கடலை",

    andhraPradesh: "ஆந்திரப் பிரதேசம்",
    bihar: "பீகார்",
    gujarat: "குஜராத்",
    haryana: "ஹரியானா",
    karnataka: "கர்நாடகா",
    kerala: "கேரளா",
    madhyaPradesh: "மத்தியப் பிரதேசம்",
    maharashtra: "மகாராஷ்டிரா",
    odisha: "ஒடிசா",
    punjab: "பஞ்சாப்",
    rajasthan: "ராஜஸ்தான்",
    tamilNadu: "தமிழ்நாடு",
    telangana: "தெலங்கானா",
    uttarPradesh: "உத்தரப் பிரதேசம்",
    westBengal: "மேற்கு வங்காளம்",
  },

  kn: {
    ...weatherEn,

    eyebrow: "ನಿಮ್ಮ ಗ್ರಾಮದ ಹವಾಮಾನ",
    title: "ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಸಲಹೆ",
    description:
      "ಗ್ರಾಮದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಉಪಯುಕ್ತ ಸಲಹೆಗಳು.",

    state: "ರಾಜ್ಯ",
    districtVillage: "ಜಿಲ್ಲೆ / ಗ್ರಾಮ",
    crop: "ಬೆಳೆ",

    selectState: "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    districtPlaceholder: "ಉದಾ: ರಾಮಪುರ, ನಾಸಿಕ್",

    refreshForecast: "ಮುನ್ಸೂಚನೆಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ",

    humidity: "ತೇವಾಂಶ",
    wind: "ಗಾಳಿ",
    rainChance: "ಮಳೆಯ ಸಾಧ್ಯತೆ",
    low: "ಕನಿಷ್ಠ",

    activeAlerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",

    heavyRainExpected: "ಭಾರಿ ಮಳೆಯ ನಿರೀಕ್ಷೆ",
    avoidSprayingBeforeRain: "ಮಳೆಯ ಮೊದಲು ಸಿಂಪಡಿಸಬೇಡಿ",
    highTemperature: "ಹೆಚ್ಚಿನ ತಾಪಮಾನ",
    suitableForIrrigation: "ನೀರಾವರಿಗೆ ಸೂಕ್ತ",
    normalWeather: "ಸಾಮಾನ್ಯ ಹವಾಮಾನ",

    heavyRainMessage:
      "ಈ ವಾರ 80% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದೆ. ಸಂಗ್ರಹಿಸಿದ ಬೆಳೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಿ ಮತ್ತು ಚರಂಡಿಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.",

    avoidSprayingMessage:
      "ಮುಂದಿನ 7 ದಿನಗಳಲ್ಲಿ ಮಳೆಯ ಸಾಧ್ಯತೆ ಇದೆ. ಮಳೆ ನಿಂತ ನಂತರ ಕೀಟನಾಶಕ ಮತ್ತು ಎಲೆ ಸಿಂಪಡಣೆ ಮಾಡಿ.",

    highTemperatureMessage:
      "ಹಲವು ದಿನಗಳಲ್ಲಿ ತಾಪಮಾನ 38°C ಕ್ಕಿಂತ ಹೆಚ್ಚಿರುತ್ತದೆ. ಮಧ್ಯಾಹ್ನದ ಸಮಯದಲ್ಲಿ ಭಾರಿ ಹೊಲದ ಕೆಲಸ ತಪ್ಪಿಸಿ.",

    irrigationMessage:
      "ಕೆಲವು ಒಣ ಮತ್ತು ಬೆಚ್ಚಗಿನ ದಿನಗಳು ಮುಂದೆ ಇವೆ. ನೀರಾವರಿ ಮತ್ತು ಗೊಬ್ಬರ ಹಾಕಲು ಉತ್ತಮ ಸಮಯ.",

    normalWeatherMessage:
      "ಯಾವುದೇ ತೀವ್ರ ಹವಾಮಾನ ಬದಲಾವಣೆ ನಿರೀಕ್ಷಿಸಲಾಗಿಲ್ಲ. ಸಾಮಾನ್ಯ ಬೆಳೆ ಆರೈಕೆಯನ್ನು ಮುಂದುವರಿಸಿ.",

    today: "ಇಂದು",

    monday: "ಸೋಮ",
    tuesday: "ಮಂಗಳ",
    wednesday: "ಬುಧ",
    thursday: "ಗುರು",
    friday: "ಶುಕ್ರ",
    saturday: "ಶನಿ",
    sunday: "ಭಾನು",

    sunny: "ಬಿಸಿಲು",
    partlyCloudy: "ಭಾಗಶಃ ಮೋಡ",
    cloudy: "ಮೋಡ ಕವಿದಿದೆ",
    showers: "ಮಳೆ",
    thunderstorm: "ಗುಡುಗು ಸಹಿತ ಮಳೆ",
    clear: "ಸ್ಪಷ್ಟ ಹವಾಮಾನ",

    todaysFarmingAdvice: "ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ",
    generatedFor: "ಇದಕ್ಕಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ",

    cropSpecificAdvisory: "ಬೆಳೆ ನಿರ್ದಿಷ್ಟ ಸಲಹೆ",
    cropAdvisoryDescription:
      "ಬಿತ್ತನೆ, ನೀರಾವರಿ, ಕೀಟ ಮತ್ತು ಸಿಂಪಡಣೆ ಸಲಹೆಗಳು",

    sowingAdvice: "ಬಿತ್ತನೆ ಸಲಹೆ",
    irrigationAdvice: "ನೀರಾವರಿ ಸಲಹೆ",
    fertilizerAdvice: "ರಸಗೊಬ್ಬರ ಸಲಹೆ",
    pestDiseasePrecaution: "ಕೀಟ / ರೋಗ ಮುನ್ನೆಚ್ಚರಿಕೆ",
    sprayingRecommendation: "ಸಿಂಪಡಣೆ ಶಿಫಾರಸು",
    rainWarning: "ಮಳೆ ಎಚ್ಚರಿಕೆ",

    wheat: "ಗೋಧಿ",
    rice: "ಭತ್ತ",
    tomato: "ಟೊಮ್ಯಾಟೊ",
    cotton: "ಹತ್ತಿ",
    groundnut: "ಕಡಲೆಕಾಯಿ",

    andhraPradesh: "ಆಂಧ್ರ ಪ್ರದೇಶ",
    bihar: "ಬಿಹಾರ",
    gujarat: "ಗುಜರಾತ್",
    haryana: "ಹರಿಯಾಣ",
    karnataka: "ಕರ್ನಾಟಕ",
    kerala: "ಕೇರಳ",
    madhyaPradesh: "ಮಧ್ಯ ಪ್ರದೇಶ",
    maharashtra: "ಮಹಾರಾಷ್ಟ್ರ",
    odisha: "ಒಡಿಶಾ",
    punjab: "ಪಂಜಾಬ್",
    rajasthan: "ರಾಜಸ್ಥಾನ",
    tamilNadu: "ತಮಿಳುನಾಡು",
    telangana: "ತೆಲಂಗಾಣ",
    uttarPradesh: "ಉತ್ತರ ಪ್ರದೇಶ",
    westBengal: "ಪಶ್ಚಿಮ ಬಂಗಾಳ",
  },

  bn: {
    ...weatherEn,

    eyebrow: "আপনার গ্রামের আবহাওয়া",
    title: "আবহাওয়া ও কৃষি পরামর্শ",
    description:
      "গ্রামের আবহাওয়ার পূর্বাভাস এবং আপনার খেতের জন্য ব্যবহারিক পরামর্শ।",

    state: "রাজ্য",
    districtVillage: "জেলা / গ্রাম",
    crop: "ফসল",

    selectState: "রাজ্য নির্বাচন করুন",
    selectCrop: "ফসল নির্বাচন করুন",
    districtPlaceholder: "উদাহরণ: রামপুর, নাসিক",

    refreshForecast: "পূর্বাভাস রিফ্রেশ করুন",

    humidity: "আর্দ্রতা",
    wind: "বাতাস",
    rainChance: "বৃষ্টির সম্ভাবনা",
    low: "সর্বনিম্ন",

    activeAlerts: "সক্রিয় সতর্কতা",

    heavyRainExpected: "ভারী বৃষ্টির সম্ভাবনা",
    avoidSprayingBeforeRain: "বৃষ্টির আগে স্প্রে করবেন না",
    highTemperature: "উচ্চ তাপমাত্রা",
    suitableForIrrigation: "সেচের জন্য উপযুক্ত",
    normalWeather: "স্বাভাবিক আবহাওয়া",

    heavyRainMessage:
      "এই সপ্তাহে 80% এর বেশি বৃষ্টির সম্ভাবনা রয়েছে। সংরক্ষিত ফসল নিরাপদ রাখুন এবং নালা পরিষ্কার করুন।",

    avoidSprayingMessage:
      "আগামী 7 দিনে বৃষ্টির সম্ভাবনা রয়েছে। বৃষ্টি থামার পরে কীটনাশক এবং পাতায় স্প্রে করুন।",

    highTemperatureMessage:
      "কয়েক দিন তাপমাত্রা 38°C এর বেশি থাকবে। দুপুরে ভারী মাঠের কাজ এড়িয়ে চলুন।",

    irrigationMessage:
      "কয়েকটি শুষ্ক এবং উষ্ণ দিন আসছে। সেচ ও সার প্রয়োগের জন্য ভালো সময়।",

    normalWeatherMessage:
      "কোনও গুরুতর আবহাওয়া পরিবর্তনের সম্ভাবনা নেই। নিয়মিত ফসলের যত্ন চালিয়ে যান।",

    today: "আজ",

    monday: "সোম",
    tuesday: "মঙ্গল",
    wednesday: "বুধ",
    thursday: "বৃহস্পতি",
    friday: "শুক্র",
    saturday: "শনি",
    sunday: "রবি",

    sunny: "রৌদ্রোজ্জ্বল",
    partlyCloudy: "আংশিক মেঘলা",
    cloudy: "মেঘলা",
    showers: "বৃষ্টির ঝরনা",
    thunderstorm: "বজ্রসহ বৃষ্টি",
    clear: "পরিষ্কার আবহাওয়া",

    todaysFarmingAdvice: "আজকের কৃষি পরামর্শ",
    generatedFor: "এর জন্য তৈরি",

    cropSpecificAdvisory: "ফসলভিত্তিক পরামর্শ",
    cropAdvisoryDescription:
      "বপন, সেচ, কীটপতঙ্গ এবং স্প্রে করার পরামর্শ",

    sowingAdvice: "বপন পরামর্শ",
    irrigationAdvice: "সেচ পরামর্শ",
    fertilizerAdvice: "সার পরামর্শ",
    pestDiseasePrecaution: "পোকা / রোগ সতর্কতা",
    sprayingRecommendation: "স্প্রে করার পরামর্শ",
    rainWarning: "বৃষ্টির সতর্কতা",

    wheat: "গম",
    rice: "ধান",
    tomato: "টমেটো",
    cotton: "তুলা",
    groundnut: "চিনাবাদাম",

    andhraPradesh: "অন্ধ্রপ্রদেশ",
    bihar: "বিহার",
    gujarat: "গুজরাট",
    haryana: "হরিয়ানা",
    karnataka: "কর্ণাটক",
    kerala: "কেরালা",
    madhyaPradesh: "মধ্যপ্রদেশ",
    maharashtra: "মহারাষ্ট্র",
    odisha: "ওড়িশা",
    punjab: "পাঞ্জাব",
    rajasthan: "রাজস্থান",
    tamilNadu: "তামিলনাড়ু",
    telangana: "তেলেঙ্গানা",
    uttarPradesh: "উত্তরপ্রদেশ",
    westBengal: "পশ্চিমবঙ্গ",
  },
};