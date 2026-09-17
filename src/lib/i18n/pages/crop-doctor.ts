import type { LanguageCode } from "../languages";

export const cropDoctorEn = {
  "cropDoctor.title": "Crop Doctor",

  "cropDoctor.uploadTitle": "Upload a crop photo",
  "cropDoctor.uploadDescription":
    "JPG or PNG, up to 10 MB. This demo uses local sample logic.",
  "cropDoctor.dragPhoto": "Drag a photo here or use your camera",
  "cropDoctor.supportedCrops":
    "Demo analysis works best with tomato, wheat, paddy, cotton or groundnut photos",
  "cropDoctor.selectPhoto": "Select photo",
  "cropDoctor.uploadPhoto": "Upload crop photo",
  "cropDoctor.uploadedPreview": "Uploaded preview",
  "cropDoctor.clearUploadedPhoto": "Clear uploaded photo",

  "cropDoctor.cropType": "Crop type",
  "cropDoctor.autoDetect": "Auto-detect from filename",
  "cropDoctor.chooseCrop":
    "Choose a crop or leave Auto-detect to match the filename.",

  "cropDoctor.tomato": "Tomato",
  "cropDoctor.wheat": "Wheat",
  "cropDoctor.paddy": "Rice / Paddy",
  "cropDoctor.cotton": "Cotton",
  "cropDoctor.groundnut": "Groundnut",

  "cropDoctor.analyzing": "Analyzing...",
  "cropDoctor.analyzeCrop": "Analyze Crop",
  "cropDoctor.clearReset": "Clear / Reset",
  "cropDoctor.anotherImage": "Analyze Another Image",

  "cropDoctor.analysisProgress": "AI-assisted analysis in progress",
  "cropDoctor.analysisDescription":
    "Checking symptoms, confidence and treatment guidance...",

  "cropDoctor.scanDaylight": "Scan in daylight",
  "cropDoctor.scanDaylightText":
    "Natural light gives the model 20% better accuracy.",
  "cropDoctor.showBothSides": "Show both sides",
  "cropDoctor.showBothSidesText":
    "Many pests hide on the underside of leaves.",
  "cropDoctor.captureWholePlant": "Capture the whole plant",
  "cropDoctor.captureWholePlantText":
    "Add a wide shot to reveal spread patterns.",

  "cropDoctor.diagnosisResult": "Diagnosis result",
  "cropDoctor.sampleDiagnosis": "Sample diagnosis",
  "cropDoctor.demoResult": "Demo AI-assisted result",
  "cropDoctor.sampleUploaded": "Tomato · uploaded 2 days ago",
  "cropDoctor.modelConfidence": "Model confidence",
  "cropDoctor.symptoms": "Symptoms",
  "cropDoctor.recommendedTreatment": "Recommended treatment",
  "cropDoctor.preventionTips": "Prevention tips",

  "cropDoctor.demoMode": "Demo mode",
  "cropDoctor.demoModeText":
    'Upload a crop photo and click "Analyze Crop" to see a local demo result for tomato, wheat, paddy, cotton or groundnut.',

  "cropDoctor.demoWarning":
    "Demo / AI-assisted result — not a trained diagnosis",
  "cropDoctor.demoWarningText":
    "This result is generated locally for demonstration only. Please consult a local agriculture officer or certified plant pathologist before buying or applying any chemical.",

  "cropDoctor.recentScans": "Recent scans",
  "cropDoctor.recentScansDescription":
    "Diagnoses saved to your farm record.",
  "cropDoctor.match": "match",

  "cropDoctor.treated": "Treated",
  "cropDoctor.monitoring": "Monitoring",
  "cropDoctor.open": "Open",

  "cropDoctor.earlyBlight": "Early Blight (Alternaria solani)",
  "cropDoctor.yellowRust": "Yellow rust",
  "cropDoctor.pinkBollworm": "Pink bollworm",
  "cropDoctor.bacterialLeafBlight": "Bacterial leaf blight",
  "cropDoctor.nutrientDeficiency": "Nutrient deficiency (Mg)",

  "cropDoctor.earlyBlightSymptom1":
    "Dark spots appear on older leaves",
  "cropDoctor.earlyBlightSymptom2":
    "Yellowing around infected areas",
  "cropDoctor.earlyBlightSymptom3":
    "Leaves may dry and fall",
  "cropDoctor.earlyBlightTreatment":
    "Remove infected leaves and use an appropriate fungicide according to local agricultural guidance.",
  "cropDoctor.earlyBlightPrevention1":
    "Avoid excess watering on leaves",
  "cropDoctor.earlyBlightPrevention2":
    "Maintain proper spacing between plants",
  "cropDoctor.earlyBlightPrevention3":
    "Remove infected plant material",

  "cropDoctor.yellowRustSymptom1":
    "Yellow or orange powder-like stripes appear on leaves",
  "cropDoctor.yellowRustSymptom2":
    "Small yellow pustules appear on leaves",
  "cropDoctor.yellowRustSymptom3":
    "Leaves may lose their green colour",
  "cropDoctor.yellowRustTreatment":
    "Monitor the crop closely and follow locally recommended fungicide treatment if the disease spreads.",
  "cropDoctor.yellowRustPrevention1":
    "Use healthy seed",
  "cropDoctor.yellowRustPrevention2":
    "Maintain proper field drainage",
  "cropDoctor.yellowRustPrevention3":
    "Monitor the crop regularly",

  "cropDoctor.bacterialLeafBlightSymptom1":
    "Water-soaked lesions appear on leaves",
  "cropDoctor.bacterialLeafBlightSymptom2":
    "Leaf edges become yellow or brown",
  "cropDoctor.bacterialLeafBlightSymptom3":
    "Infected leaves may dry gradually",
  "cropDoctor.bacterialLeafBlightTreatment":
    "Remove severely affected plants where practical and follow local agricultural recommendations.",
  "cropDoctor.bacterialLeafBlightPrevention1":
    "Avoid excessive nitrogen application",
  "cropDoctor.bacterialLeafBlightPrevention2":
    "Maintain good field drainage",
  "cropDoctor.bacterialLeafBlightPrevention3":
    "Use healthy planting material",

  "cropDoctor.pinkBollwormSymptom1":
    "Damage appears inside cotton bolls",
  "cropDoctor.pinkBollwormSymptom2":
    "Bolls may open poorly",
  "cropDoctor.pinkBollwormSymptom3":
    "Larvae can damage developing cotton seeds",
  "cropDoctor.pinkBollwormTreatment":
    "Monitor boll development and follow locally approved pest-management recommendations.",
  "cropDoctor.pinkBollwormPrevention1":
    "Monitor the crop regularly",
  "cropDoctor.pinkBollwormPrevention2":
    "Remove heavily affected bolls",
  "cropDoctor.pinkBollwormPrevention3":
    "Follow recommended pest-management practices",

  "cropDoctor.nutrientDeficiencySymptom1":
    "Leaves may become pale or yellow",
  "cropDoctor.nutrientDeficiencySymptom2":
    "Plant growth may become weak",
  "cropDoctor.nutrientDeficiencySymptom3":
    "Older leaves can show deficiency symptoms",
  "cropDoctor.nutrientDeficiencyTreatment":
    "Test the soil where possible and apply nutrients according to soil-test and local agricultural recommendations.",
  "cropDoctor.nutrientDeficiencyPrevention1":
    "Maintain balanced soil nutrition",
  "cropDoctor.nutrientDeficiencyPrevention2":
    "Use recommended fertilizer doses",
  "cropDoctor.nutrientDeficiencyPrevention3":
    "Monitor plant growth regularly",

  "cropDoctor.invalidFile":
    "Please upload a JPG or PNG image.",
  "cropDoctor.fileTooLarge":
    "Please upload an image smaller than 10 MB.",
  "cropDoctor.uploadFirst":
    "Please upload a crop photo first.",
} as const;

export type CropDoctorKey = keyof typeof cropDoctorEn;

type Dict = Record<CropDoctorKey, string>;

export const cropDoctor: Record<LanguageCode, Dict> = {
  en: cropDoctorEn,

  te: {
    ...cropDoctorEn,

    "cropDoctor.title": "పంట వైద్యుడు",

    "cropDoctor.uploadTitle": "పంట ఫోటోను అప్‌లోడ్ చేయండి",
    "cropDoctor.uploadDescription":
      "JPG లేదా PNG, గరిష్ఠంగా 10 MB. ఈ డెమో స్థానిక నమూనా లాజిక్‌ను ఉపయోగిస్తుంది.",
    "cropDoctor.dragPhoto":
      "ఫోటోను ఇక్కడికి లాగండి లేదా కెమెరాను ఉపయోగించండి",
    "cropDoctor.supportedCrops":
      "టమాటా, గోధుమ, వరి, పత్తి లేదా వేరుశెనగ ఫోటోలతో డెమో విశ్లేషణ ఉత్తమంగా పనిచేస్తుంది",
    "cropDoctor.selectPhoto": "ఫోటో ఎంచుకోండి",
    "cropDoctor.uploadPhoto": "పంట ఫోటో అప్‌లోడ్ చేయండి",
    "cropDoctor.uploadedPreview": "అప్‌లోడ్ చేసిన ప్రివ్యూ",
    "cropDoctor.clearUploadedPhoto": "అప్‌లోడ్ చేసిన ఫోటోను తొలగించండి",

    "cropDoctor.cropType": "పంట రకం",
    "cropDoctor.autoDetect": "ఫైల్ పేరుతో స్వయంచాలకంగా గుర్తించండి",
    "cropDoctor.chooseCrop":
      "పంటను ఎంచుకోండి లేదా ఫైల్ పేరును బట్టి గుర్తించడానికి Auto-detect ఉంచండి.",

    "cropDoctor.tomato": "టమాటా",
    "cropDoctor.wheat": "గోధుమ",
    "cropDoctor.paddy": "వరి",
    "cropDoctor.cotton": "పత్తి",
    "cropDoctor.groundnut": "వేరుశెనగ",

    "cropDoctor.analyzing": "విశ్లేషిస్తోంది...",
    "cropDoctor.analyzeCrop": "పంటను విశ్లేషించండి",
    "cropDoctor.clearReset": "తొలగించి రీసెట్ చేయండి",
    "cropDoctor.anotherImage": "మరో చిత్రాన్ని విశ్లేషించండి",

    "cropDoctor.analysisProgress":
      "AI సహాయంతో విశ్లేషణ జరుగుతోంది",
    "cropDoctor.analysisDescription":
      "లక్షణాలు, నమ్మక స్థాయి మరియు చికిత్స సూచనలను పరిశీలిస్తోంది...",

    "cropDoctor.scanDaylight":
      "పగటి వెలుతురులో స్కాన్ చేయండి",
    "cropDoctor.scanDaylightText":
      "సహజ వెలుతురు మోడల్‌కు 20% మెరుగైన ఖచ్చితత్వాన్ని ఇస్తుంది.",
    "cropDoctor.showBothSides": "రెండు వైపులా చూపించండి",
    "cropDoctor.showBothSidesText":
      "చాలా పురుగులు ఆకుల కింది భాగంలో దాక్కుంటాయి.",
    "cropDoctor.captureWholePlant":
      "మొత్తం మొక్కను చూపించండి",
    "cropDoctor.captureWholePlantText":
      "వ్యాధి వ్యాప్తిని తెలుసుకోవడానికి దూరం నుంచి ఒక ఫోటో కూడా జోడించండి.",

    "cropDoctor.diagnosisResult": "వ్యాధి నిర్ధారణ ఫలితం",
    "cropDoctor.sampleDiagnosis": "నమూనా నిర్ధారణ",
    "cropDoctor.demoResult":
      "డెమో AI సహాయంతో వచ్చిన ఫలితం",
    "cropDoctor.sampleUploaded":
      "టమాటా · 2 రోజుల క్రితం అప్‌లోడ్ చేయబడింది",
    "cropDoctor.modelConfidence": "మోడల్ నమ్మక స్థాయి",
    "cropDoctor.symptoms": "లక్షణాలు",
    "cropDoctor.recommendedTreatment":
      "సిఫార్సు చేసిన చికిత్స",
    "cropDoctor.preventionTips": "నివారణ సూచనలు",

    "cropDoctor.demoMode": "డెమో మోడ్",
    "cropDoctor.demoModeText":
      'పంట ఫోటోను అప్‌లోడ్ చేసి "పంటను విశ్లేషించండి" క్లిక్ చేయండి. టమాటా, గోధుమ, వరి, పత్తి లేదా వేరుశెనగకు స్థానిక డెమో ఫలితం కనిపిస్తుంది.',

    "cropDoctor.demoWarning":
      "డెమో / AI సహాయంతో వచ్చిన ఫలితం — శిక్షణ పొందిన నిర్ధారణ కాదు",
    "cropDoctor.demoWarningText":
      "ఈ ఫలితం డెమో కోసం స్థానికంగా రూపొందించబడింది. ఏదైనా రసాయనం కొనుగోలు చేయడానికి లేదా ఉపయోగించడానికి ముందు స్థానిక వ్యవసాయ అధికారిని లేదా ధృవీకరించబడిన మొక్కల వ్యాధి నిపుణుడిని సంప్రదించండి.",

    "cropDoctor.earlyBlight":
      "ఎర్లీ బ్లైట్ (Alternaria solani)",
    "cropDoctor.yellowRust": "పసుపు తుప్పు",
    "cropDoctor.pinkBollworm": "పింక్ బోల్‌వార్మ్",
    "cropDoctor.bacterialLeafBlight":
      "బ్యాక్టీరియల్ లీఫ్ బ్లైట్",
    "cropDoctor.nutrientDeficiency":
      "పోషక లోపం (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "పాత ఆకులపై నల్లటి మచ్చలు కనిపిస్తాయి",
    "cropDoctor.earlyBlightSymptom2":
      "వ్యాధి సోకిన ప్రాంతాల చుట్టూ ఆకులు పసుపు రంగులోకి మారుతాయి",
    "cropDoctor.earlyBlightSymptom3":
      "ఆకులు ఎండిపోయి రాలిపోవచ్చు",
    "cropDoctor.earlyBlightTreatment":
      "వ్యాధి సోకిన ఆకులను తొలగించి, స్థానిక వ్యవసాయ నిపుణుల సూచనల ప్రకారం తగిన శిలీంద్రనాశినిని ఉపయోగించండి.",
    "cropDoctor.earlyBlightPrevention1":
      "ఆకులపై అధికంగా నీరు పోయకుండా ఉండండి",
    "cropDoctor.earlyBlightPrevention2":
      "మొక్కల మధ్య సరైన దూరం ఉంచండి",
    "cropDoctor.earlyBlightPrevention3":
      "వ్యాధి సోకిన మొక్క భాగాలను తొలగించండి",

    "cropDoctor.yellowRustSymptom1":
      "ఆకులపై పసుపు లేదా నారింజ రంగు పొడి లాంటి గీతలు కనిపిస్తాయి",
    "cropDoctor.yellowRustSymptom2":
      "ఆకులపై చిన్న పసుపు మచ్చలు కనిపిస్తాయి",
    "cropDoctor.yellowRustSymptom3":
      "ఆకులు పచ్చదనాన్ని కోల్పోవచ్చు",
    "cropDoctor.yellowRustTreatment":
      "పంటను జాగ్రత్తగా పర్యవేక్షించి, వ్యాధి వ్యాప్తి చెందితే స్థానికంగా సూచించిన శిలీంద్రనాశిని చికిత్సను అనుసరించండి.",
    "cropDoctor.yellowRustPrevention1":
      "ఆరోగ్యకరమైన విత్తనాలను ఉపయోగించండి",
    "cropDoctor.yellowRustPrevention2":
      "పొలంలో సరైన నీటి పారుదల ఉండేలా చూడండి",
    "cropDoctor.yellowRustPrevention3":
      "పంటను క్రమం తప్పకుండా పర్యవేక్షించండి",

    "cropDoctor.bacterialLeafBlightSymptom1":
      "ఆకులపై నీటితో తడిసినట్లుగా మచ్చలు కనిపిస్తాయి",
    "cropDoctor.bacterialLeafBlightSymptom2":
      "ఆకుల అంచులు పసుపు లేదా గోధుమ రంగులోకి మారుతాయి",
    "cropDoctor.bacterialLeafBlightSymptom3":
      "వ్యాధి సోకిన ఆకులు క్రమంగా ఎండిపోవచ్చు",
    "cropDoctor.bacterialLeafBlightTreatment":
      "తీవ్రంగా ప్రభావితమైన మొక్కలను సాధ్యమైనంత వరకు తొలగించి, స్థానిక వ్యవసాయ సూచనలను పాటించండి.",
    "cropDoctor.bacterialLeafBlightPrevention1":
      "అధిక నత్రజని ఎరువులు వేయకుండా ఉండండి",
    "cropDoctor.bacterialLeafBlightPrevention2":
      "పొలంలో మంచి నీటి పారుదల ఉండేలా చూడండి",
    "cropDoctor.bacterialLeafBlightPrevention3":
      "ఆరోగ్యకరమైన నాటే పదార్థాన్ని ఉపయోగించండి",

    "cropDoctor.pinkBollwormSymptom1":
      "పత్తి కాయల లోపల నష్టం కనిపిస్తుంది",
    "cropDoctor.pinkBollwormSymptom2":
      "పత్తి కాయలు సరిగా తెరుచుకోకపోవచ్చు",
    "cropDoctor.pinkBollwormSymptom3":
      "లార్వా అభివృద్ధి చెందుతున్న పత్తి విత్తనాలను దెబ్బతీయవచ్చు",
    "cropDoctor.pinkBollwormTreatment":
      "పత్తి కాయల అభివృద్ధిని పర్యవేక్షించి, స్థానికంగా ఆమోదించబడిన పురుగు నియంత్రణ సూచనలను పాటించండి.",
    "cropDoctor.pinkBollwormPrevention1":
      "పంటను క్రమం తప్పకుండా పర్యవేక్షించండి",
    "cropDoctor.pinkBollwormPrevention2":
      "తీవ్రంగా ప్రభావితమైన పత్తి కాయలను తొలగించండి",
    "cropDoctor.pinkBollwormPrevention3":
      "సిఫార్సు చేసిన పురుగు నియంత్రణ పద్ధతులను పాటించండి",

    "cropDoctor.nutrientDeficiencySymptom1":
      "ఆకులు లేతగా లేదా పసుపు రంగులోకి మారవచ్చు",
    "cropDoctor.nutrientDeficiencySymptom2":
      "మొక్క పెరుగుదల బలహీనంగా మారవచ్చు",
    "cropDoctor.nutrientDeficiencySymptom3":
      "పాత ఆకులపై పోషక లోపం లక్షణాలు కనిపించవచ్చు",
    "cropDoctor.nutrientDeficiencyTreatment":
      "సాధ్యమైన చోట మట్టిని పరీక్షించి, మట్టి పరీక్ష మరియు స్థానిక వ్యవసాయ సూచనల ప్రకారం పోషకాలను అందించండి.",
    "cropDoctor.nutrientDeficiencyPrevention1":
      "మట్టిలో సమతుల్య పోషకాలను నిర్వహించండి",
    "cropDoctor.nutrientDeficiencyPrevention2":
      "సిఫార్సు చేసిన ఎరువుల మోతాదులను ఉపయోగించండి",
    "cropDoctor.nutrientDeficiencyPrevention3":
      "మొక్కల పెరుగుదలను క్రమం తప్పకుండా పర్యవేక్షించండి",

    "cropDoctor.invalidFile":
      "దయచేసి JPG లేదా PNG చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    "cropDoctor.fileTooLarge":
      "దయచేసి 10 MB కంటే చిన్న చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    "cropDoctor.uploadFirst":
      "ముందుగా పంట ఫోటోను అప్‌లోడ్ చేయండి.",
  },

  hi: {
    ...cropDoctorEn,

    "cropDoctor.title": "फसल डॉक्टर",
    "cropDoctor.uploadTitle": "फसल की फोटो अपलोड करें",
    "cropDoctor.uploadDescription":
      "JPG या PNG, अधिकतम 10 MB। यह डेमो स्थानीय नमूना लॉजिक का उपयोग करता है।",
    "cropDoctor.dragPhoto":
      "फोटो यहाँ खींचें या कैमरा इस्तेमाल करें",
    "cropDoctor.supportedCrops":
      "टमाटर, गेहूँ, धान, कपास या मूंगफली की फोटो के साथ डेमो विश्लेषण बेहतर काम करता है",
    "cropDoctor.selectPhoto": "फोटो चुनें",
    "cropDoctor.uploadPhoto": "फसल की फोटो अपलोड करें",
    "cropDoctor.uploadedPreview": "अपलोड की गई फोटो",
    "cropDoctor.clearUploadedPhoto":
      "अपलोड की गई फोटो हटाएँ",

    "cropDoctor.cropType": "फसल का प्रकार",
    "cropDoctor.autoDetect":
      "फाइल नाम से अपने आप पहचानें",
    "cropDoctor.chooseCrop":
      "फसल चुनें या फाइल नाम के आधार पर पहचानने के लिए Auto-detect रहने दें।",

    "cropDoctor.tomato": "टमाटर",
    "cropDoctor.wheat": "गेहूँ",
    "cropDoctor.paddy": "धान",
    "cropDoctor.cotton": "कपास",
    "cropDoctor.groundnut": "मूंगफली",

    "cropDoctor.analyzing": "विश्लेषण हो रहा है...",
    "cropDoctor.analyzeCrop": "फसल का विश्लेषण करें",
    "cropDoctor.clearReset": "साफ़ / रीसेट करें",
    "cropDoctor.anotherImage":
      "दूसरी फोटो का विश्लेषण करें",

    "cropDoctor.analysisProgress":
      "AI सहायता से विश्लेषण जारी है",
    "cropDoctor.analysisDescription":
      "लक्षण, भरोसे का स्तर और उपचार की जानकारी जाँची जा रही है...",

    "cropDoctor.scanDaylight":
      "दिन के उजाले में स्कैन करें",
    "cropDoctor.scanDaylightText":
      "प्राकृतिक रोशनी मॉडल को 20% बेहतर सटीकता देती है।",
    "cropDoctor.showBothSides": "दोनों तरफ दिखाएँ",
    "cropDoctor.showBothSidesText":
      "कई कीट पत्तियों की निचली सतह पर छिपते हैं।",
    "cropDoctor.captureWholePlant":
      "पूरा पौधा दिखाएँ",
    "cropDoctor.captureWholePlantText":
      "रोग के फैलाव को समझने के लिए एक दूर की फोटो भी लें।",

    "cropDoctor.diagnosisResult": "निदान परिणाम",
    "cropDoctor.sampleDiagnosis": "नमूना निदान",
    "cropDoctor.demoResult":
      "डेमो AI सहायता परिणाम",
    "cropDoctor.sampleUploaded":
      "टमाटर · 2 दिन पहले अपलोड किया गया",
    "cropDoctor.modelConfidence":
      "मॉडल का भरोसा",
    "cropDoctor.symptoms": "लक्षण",
    "cropDoctor.recommendedTreatment":
      "सुझाया गया उपचार",
    "cropDoctor.preventionTips":
      "बचाव के सुझाव",

    "cropDoctor.demoMode": "डेमो मोड",
    "cropDoctor.demoModeText":
      'फसल की फोटो अपलोड करें और "फसल का विश्लेषण करें" पर क्लिक करें। टमाटर, गेहूँ, धान, कपास या मूंगफली के लिए स्थानीय डेमो परिणाम दिखाई देगा।',

    "cropDoctor.demoWarning":
      "डेमो / AI सहायता परिणाम — प्रशिक्षित निदान नहीं",
    "cropDoctor.demoWarningText":
      "यह परिणाम केवल प्रदर्शन के लिए स्थानीय रूप से बनाया गया है। कोई भी रसायन खरीदने या इस्तेमाल करने से पहले स्थानीय कृषि अधिकारी या प्रमाणित पौधा रोग विशेषज्ञ से सलाह लें।",

    "cropDoctor.earlyBlight":
      "अर्ली ब्लाइट (Alternaria solani)",
    "cropDoctor.yellowRust": "पीला रतुआ",
    "cropDoctor.pinkBollworm":
      "पिंक बॉलवर्म",
    "cropDoctor.bacterialLeafBlight":
      "बैक्टीरियल लीफ ब्लाइट",
    "cropDoctor.nutrientDeficiency":
      "पोषक तत्वों की कमी (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "पुरानी पत्तियों पर काले धब्बे दिखाई देते हैं",
    "cropDoctor.earlyBlightSymptom2":
      "संक्रमित क्षेत्रों के आसपास पत्तियाँ पीली हो जाती हैं",
    "cropDoctor.earlyBlightSymptom3":
      "पत्तियाँ सूखकर गिर सकती हैं",
    "cropDoctor.earlyBlightTreatment":
      "संक्रमित पत्तियों को हटाएँ और स्थानीय कृषि सलाह के अनुसार उचित फफूंदनाशक का उपयोग करें।",
    "cropDoctor.earlyBlightPrevention1":
      "पत्तियों पर अधिक पानी देने से बचें",
    "cropDoctor.earlyBlightPrevention2":
      "पौधों के बीच उचित दूरी रखें",
    "cropDoctor.earlyBlightPrevention3":
      "संक्रमित पौधों के हिस्सों को हटा दें",

    "cropDoctor.yellowRustSymptom1":
      "पत्तियों पर पीली या नारंगी पाउडर जैसी धारियाँ दिखाई देती हैं",
    "cropDoctor.yellowRustSymptom2":
      "पत्तियों पर छोटे पीले दाने दिखाई देते हैं",
    "cropDoctor.yellowRustSymptom3":
      "पत्तियाँ अपना हरा रंग खो सकती हैं",
    "cropDoctor.yellowRustTreatment":
      "फसल की निगरानी करें और रोग फैलने पर स्थानीय रूप से सुझाए गए फफूंदनाशक उपचार का पालन करें।",
    "cropDoctor.yellowRustPrevention1":
      "स्वस्थ बीज का उपयोग करें",
    "cropDoctor.yellowRustPrevention2":
      "खेत में उचित जल निकासी रखें",
    "cropDoctor.yellowRustPrevention3":
      "फसल की नियमित निगरानी करें",

    "cropDoctor.bacterialLeafBlightSymptom1":
      "पत्तियों पर पानी से भीगे हुए घाव दिखाई देते हैं",
    "cropDoctor.bacterialLeafBlightSymptom2":
      "पत्तियों के किनारे पीले या भूरे हो जाते हैं",
    "cropDoctor.bacterialLeafBlightSymptom3":
      "संक्रमित पत्तियाँ धीरे-धीरे सूख सकती हैं",
    "cropDoctor.bacterialLeafBlightTreatment":
      "जहाँ संभव हो गंभीर रूप से प्रभावित पौधों को हटाएँ और स्थानीय कृषि सलाह का पालन करें।",
    "cropDoctor.bacterialLeafBlightPrevention1":
      "अधिक नाइट्रोजन देने से बचें",
    "cropDoctor.bacterialLeafBlightPrevention2":
      "खेत में अच्छी जल निकासी रखें",
    "cropDoctor.bacterialLeafBlightPrevention3":
      "स्वस्थ रोपण सामग्री का उपयोग करें",

    "cropDoctor.pinkBollwormSymptom1":
      "कपास की गांठों के अंदर नुकसान दिखाई देता है",
    "cropDoctor.pinkBollwormSymptom2":
      "कपास की गांठें ठीक से नहीं खुल सकती हैं",
    "cropDoctor.pinkBollwormSymptom3":
      "लार्वा विकसित हो रहे कपास के बीजों को नुकसान पहुँचा सकते हैं",
    "cropDoctor.pinkBollwormTreatment":
      "कपास की गांठों के विकास की निगरानी करें और स्थानीय रूप से स्वीकृत कीट प्रबंधन सुझावों का पालन करें।",
    "cropDoctor.pinkBollwormPrevention1":
      "फसल की नियमित निगरानी करें",
    "cropDoctor.pinkBollwormPrevention2":
      "बहुत अधिक प्रभावित गांठों को हटा दें",
    "cropDoctor.pinkBollwormPrevention3":
      "अनुशंसित कीट प्रबंधन तरीकों का पालन करें",

    "cropDoctor.nutrientDeficiencySymptom1":
      "पत्तियाँ हल्की या पीली हो सकती हैं",
    "cropDoctor.nutrientDeficiencySymptom2":
      "पौधे की वृद्धि कमजोर हो सकती है",
    "cropDoctor.nutrientDeficiencySymptom3":
      "पुरानी पत्तियों पर पोषक तत्वों की कमी के लक्षण दिखाई दे सकते हैं",
    "cropDoctor.nutrientDeficiencyTreatment":
      "जहाँ संभव हो मिट्टी की जाँच करें और मिट्टी परीक्षण तथा स्थानीय कृषि सलाह के अनुसार पोषक तत्व दें।",
    "cropDoctor.nutrientDeficiencyPrevention1":
      "मिट्टी में संतुलित पोषण बनाए रखें",
    "cropDoctor.nutrientDeficiencyPrevention2":
      "अनुशंसित उर्वरक मात्रा का उपयोग करें",
    "cropDoctor.nutrientDeficiencyPrevention3":
      "पौधों की वृद्धि की नियमित निगरानी करें",

    "cropDoctor.invalidFile":
      "कृपया JPG या PNG फोटो अपलोड करें।",
    "cropDoctor.fileTooLarge":
      "कृपया 10 MB से छोटी फोटो अपलोड करें।",
    "cropDoctor.uploadFirst":
      "कृपया पहले फसल की फोटो अपलोड करें।",
  },

  mr: {
    ...cropDoctorEn,

    "cropDoctor.title": "पीक डॉक्टर",
    "cropDoctor.uploadTitle": "पिकाचा फोटो अपलोड करा",
    "cropDoctor.uploadDescription":
      "JPG किंवा PNG, कमाल 10 MB. हा डेमो स्थानिक नमुना लॉजिक वापरतो.",
    "cropDoctor.dragPhoto":
      "फोटो येथे ड्रॅग करा किंवा कॅमेरा वापरा",
    "cropDoctor.supportedCrops":
      "टोमॅटो, गहू, भात, कापूस किंवा भुईमूगाच्या फोटोंसह डेमो विश्लेषण चांगले काम करते",
    "cropDoctor.selectPhoto": "फोटो निवडा",
    "cropDoctor.uploadPhoto":
      "पिकाचा फोटो अपलोड करा",
    "cropDoctor.uploadedPreview":
      "अपलोड केलेला फोटो",
    "cropDoctor.clearUploadedPhoto":
      "अपलोड केलेला फोटो काढा",

    "cropDoctor.cropType": "पिकाचा प्रकार",
    "cropDoctor.autoDetect":
      "फाइल नावावरून आपोआप ओळखा",
    "cropDoctor.chooseCrop":
      "पीक निवडा किंवा फाइल नावावरून ओळखण्यासाठी Auto-detect ठेवा.",

    "cropDoctor.tomato": "टोमॅटो",
    "cropDoctor.wheat": "गहू",
    "cropDoctor.paddy": "भात",
    "cropDoctor.cotton": "कापूस",
    "cropDoctor.groundnut": "भुईमूग",

    "cropDoctor.analyzing":
      "विश्लेषण सुरू आहे...",
    "cropDoctor.analyzeCrop":
      "पिकाचे विश्लेषण करा",
    "cropDoctor.clearReset":
      "साफ / रीसेट करा",
    "cropDoctor.anotherImage":
      "दुसऱ्या फोटोचे विश्लेषण करा",

    "cropDoctor.analysisProgress":
      "AI सहाय्याने विश्लेषण सुरू आहे",
    "cropDoctor.analysisDescription":
      "लक्षणे, विश्वास पातळी आणि उपचाराची माहिती तपासत आहे...",

    "cropDoctor.scanDaylight":
      "दिवसा उजेडात स्कॅन करा",
    "cropDoctor.scanDaylightText":
      "नैसर्गिक प्रकाशामुळे मॉडेलची अचूकता 20% ने वाढते.",
    "cropDoctor.showBothSides":
      "दोन्ही बाजू दाखवा",
    "cropDoctor.showBothSidesText":
      "अनेक किडे पानांच्या खालच्या बाजूला लपतात.",
    "cropDoctor.captureWholePlant":
      "संपूर्ण रोप दाखवा",
    "cropDoctor.captureWholePlantText":
      "रोगाचा प्रसार समजण्यासाठी एक दूरचा फोटोही जोडा.",

    "cropDoctor.sampleDiagnosis":
      "नमुना निदान",
    "cropDoctor.demoResult":
      "डेमो AI सहाय्यित निकाल",
    "cropDoctor.modelConfidence":
      "मॉडेलचा विश्वास",
    "cropDoctor.symptoms": "लक्षणे",
    "cropDoctor.recommendedTreatment":
      "शिफारस केलेला उपचार",
    "cropDoctor.preventionTips":
      "प्रतिबंधाच्या सूचना",

    "cropDoctor.demoMode": "डेमो मोड",
    "cropDoctor.demoModeText":
      'पिकाचा फोटो अपलोड करून "पिकाचे विश्लेषण करा" क्लिक करा. टोमॅटो, गहू, भात, कापूस किंवा भुईमूगासाठी स्थानिक डेमो निकाल दिसेल.',

    "cropDoctor.demoWarning":
      "डेमो / AI सहाय्यित निकाल — प्रशिक्षित निदान नाही",
    "cropDoctor.demoWarningText":
      "हा निकाल केवळ प्रात्यक्षिकासाठी स्थानिक पातळीवर तयार केला आहे. कोणतेही रसायन खरेदी किंवा वापरण्यापूर्वी स्थानिक कृषी अधिकारी किंवा प्रमाणित वनस्पती रोगतज्ज्ञांचा सल्ला घ्या.",

    "cropDoctor.earlyBlight":
      "अर्ली ब्लाइट (Alternaria solani)",
    "cropDoctor.yellowRust": "पिवळा तांबेरा",
    "cropDoctor.pinkBollworm":
      "पिंक बॉलवर्म",
    "cropDoctor.bacterialLeafBlight":
      "बॅक्टेरियल लीफ ब्लाइट",
    "cropDoctor.nutrientDeficiency":
      "पोषक तत्त्वांची कमतरता (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "जुन्या पानांवर काळे डाग दिसतात",
    "cropDoctor.earlyBlightSymptom2":
      "संसर्ग झालेल्या भागाभोवती पाने पिवळी होतात",
    "cropDoctor.earlyBlightSymptom3":
      "पाने सुकून गळू शकतात",
    "cropDoctor.earlyBlightTreatment":
      "संसर्ग झालेली पाने काढून टाका आणि स्थानिक कृषी मार्गदर्शनानुसार योग्य बुरशीनाशक वापरा.",
    "cropDoctor.earlyBlightPrevention1":
      "पानांवर जास्त पाणी देणे टाळा",
    "cropDoctor.earlyBlightPrevention2":
      "रोपांमध्ये योग्य अंतर ठेवा",
    "cropDoctor.earlyBlightPrevention3":
      "संसर्ग झालेल्या वनस्पतींचे भाग काढून टाका",

    "cropDoctor.invalidFile":
      "कृपया JPG किंवा PNG फोटो अपलोड करा.",
    "cropDoctor.fileTooLarge":
      "कृपया 10 MB पेक्षा लहान फोटो अपलोड करा.",
    "cropDoctor.uploadFirst":
      "कृपया आधी पिकाचा फोटो अपलोड करा.",
  },

  ta: {
    ...cropDoctorEn,

    "cropDoctor.title": "பயிர் மருத்துவர்",
    "cropDoctor.uploadTitle":
      "பயிர் புகைப்படத்தை பதிவேற்றவும்",
    "cropDoctor.uploadDescription":
      "JPG அல்லது PNG, அதிகபட்சம் 10 MB. இந்த டெமோ உள்ளூர் மாதிரி தர்க்கத்தைப் பயன்படுத்துகிறது.",
    "cropDoctor.dragPhoto":
      "புகைப்படத்தை இங்கே இழுக்கவும் அல்லது கேமராவைப் பயன்படுத்தவும்",
    "cropDoctor.supportedCrops":
      "தக்காளி, கோதுமை, நெல், பருத்தி அல்லது நிலக்கடலை புகைப்படங்களுடன் டெமோ பகுப்பாய்வு சிறப்பாக செயல்படும்",
    "cropDoctor.selectPhoto":
      "புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    "cropDoctor.uploadPhoto":
      "பயிர் புகைப்படத்தை பதிவேற்றவும்",
    "cropDoctor.uploadedPreview":
      "பதிவேற்றிய புகைப்படம்",
    "cropDoctor.clearUploadedPhoto":
      "பதிவேற்றிய புகைப்படத்தை அழிக்கவும்",

    "cropDoctor.cropType": "பயிர் வகை",
    "cropDoctor.autoDetect":
      "கோப்பு பெயரிலிருந்து தானாக கண்டறியவும்",
    "cropDoctor.chooseCrop":
      "பயிரைத் தேர்ந்தெடுக்கவும் அல்லது கோப்பு பெயரின் அடிப்படையில் கண்டறிய Auto-detect ஐ விடவும்.",

    "cropDoctor.tomato": "தக்காளி",
    "cropDoctor.wheat": "கோதுமை",
    "cropDoctor.paddy": "நெல்",
    "cropDoctor.cotton": "பருத்தி",
    "cropDoctor.groundnut": "நிலக்கடலை",

    "cropDoctor.analyzing":
      "பகுப்பாய்வு நடைபெறுகிறது...",
    "cropDoctor.analyzeCrop":
      "பயிரை பகுப்பாய்வு செய்யவும்",
    "cropDoctor.clearReset":
      "அழி / மீட்டமை",
    "cropDoctor.anotherImage":
      "மற்றொரு படத்தை பகுப்பாய்வு செய்யவும்",

    "cropDoctor.analysisProgress":
      "AI உதவியுடன் பகுப்பாய்வு நடைபெறுகிறது",
    "cropDoctor.analysisDescription":
      "அறிகுறிகள், நம்பகத்தன்மை மற்றும் சிகிச்சை வழிகாட்டுதலைச் சரிபார்க்கிறது...",

    "cropDoctor.scanDaylight":
      "பகல் வெளிச்சத்தில் ஸ்கேன் செய்யவும்",
    "cropDoctor.scanDaylightText":
      "இயற்கை வெளிச்சம் மாடலின் துல்லியத்தை 20% மேம்படுத்துகிறது.",
    "cropDoctor.showBothSides":
      "இரு பக்கங்களையும் காட்டவும்",
    "cropDoctor.showBothSidesText":
      "பல பூச்சிகள் இலைகளின் கீழ்புறத்தில் மறைந்திருக்கும்.",
    "cropDoctor.captureWholePlant":
      "முழு செடியையும் காட்டவும்",
    "cropDoctor.captureWholePlantText":
      "நோய் பரவலைக் காண ஒரு தொலைவிலான புகைப்படத்தையும் சேர்க்கவும்.",

    "cropDoctor.sampleDiagnosis":
      "மாதிரி நோய் கண்டறிதல்",
    "cropDoctor.demoResult":
      "டெமோ AI உதவி முடிவு",
    "cropDoctor.modelConfidence":
      "மாடல் நம்பகத்தன்மை",
    "cropDoctor.symptoms": "அறிகுறிகள்",
    "cropDoctor.recommendedTreatment":
      "பரிந்துரைக்கப்பட்ட சிகிச்சை",
    "cropDoctor.preventionTips":
      "தடுப்பு குறிப்புகள்",

    "cropDoctor.demoMode": "டெமோ முறை",
    "cropDoctor.demoModeText":
      'பயிர் புகைப்படத்தை பதிவேற்றி "பயிரை பகுப்பாய்வு செய்யவும்" என்பதைக் கிளிக் செய்யவும். தக்காளி, கோதுமை, நெல், பருத்தி அல்லது நிலக்கடலைக்கான உள்ளூர் டெமோ முடிவு காட்டப்படும்.',

    "cropDoctor.demoWarning":
      "டெமோ / AI உதவி முடிவு — பயிற்சி பெற்ற நோய் கண்டறிதல் அல்ல",
    "cropDoctor.demoWarningText":
      "இந்த முடிவு டெமோவுக்காக மட்டுமே உள்ளூரில் உருவாக்கப்பட்டது. எந்தவொரு ரசாயனத்தையும் வாங்குவதற்கு அல்லது பயன்படுத்துவதற்கு முன் உள்ளூர் வேளாண் அதிகாரி அல்லது சான்றளிக்கப்பட்ட தாவர நோய் நிபுணரை அணுகவும்.",

    "cropDoctor.earlyBlight":
      "ஆரம்ப இலைக்கருகல் (Alternaria solani)",
    "cropDoctor.yellowRust":
      "மஞ்சள் துரு நோய்",
    "cropDoctor.pinkBollworm":
      "பிங்க் பால்வோர்ம்",
    "cropDoctor.bacterialLeafBlight":
      "பாக்டீரியா இலைக்கருகல்",
    "cropDoctor.nutrientDeficiency":
      "ஊட்டச்சத்து குறைபாடு (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "பழைய இலைகளில் கரும்புள்ளிகள் தோன்றும்",
    "cropDoctor.earlyBlightSymptom2":
      "பாதிக்கப்பட்ட பகுதிகளைச் சுற்றி இலைகள் மஞ்சளாக மாறும்",
    "cropDoctor.earlyBlightSymptom3":
      "இலைகள் காய்ந்து உதிரலாம்",
    "cropDoctor.earlyBlightTreatment":
      "பாதிக்கப்பட்ட இலைகளை அகற்றி, உள்ளூர் வேளாண் வழிகாட்டுதலின்படி பொருத்தமான பூஞ்சைக்கொல்லியைப் பயன்படுத்தவும்.",
    "cropDoctor.earlyBlightPrevention1":
      "இலைகளில் அதிகமாக தண்ணீர் தெளிப்பதைத் தவிர்க்கவும்",
    "cropDoctor.earlyBlightPrevention2":
      "செடிகளுக்கு இடையில் சரியான இடைவெளியைப் பராமரிக்கவும்",
    "cropDoctor.earlyBlightPrevention3":
      "பாதிக்கப்பட்ட தாவரப் பகுதிகளை அகற்றவும்",

    "cropDoctor.invalidFile":
      "JPG அல்லது PNG படத்தைப் பதிவேற்றவும்.",
    "cropDoctor.fileTooLarge":
      "10 MB-க்கு குறைவான படத்தைப் பதிவேற்றவும்.",
    "cropDoctor.uploadFirst":
      "முதலில் பயிர் புகைப்படத்தைப் பதிவேற்றவும்.",
  },

  kn: {
    ...cropDoctorEn,

    "cropDoctor.title": "ಬೆಳೆ ವೈದ್ಯ",
    "cropDoctor.uploadTitle":
      "ಬೆಳೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "cropDoctor.uploadDescription":
      "JPG ಅಥವಾ PNG, ಗರಿಷ್ಠ 10 MB. ಈ ಡೆಮೋ ಸ್ಥಳೀಯ ಮಾದರಿ ಲಾಜಿಕ್ ಅನ್ನು ಬಳಸುತ್ತದೆ.",
    "cropDoctor.dragPhoto":
      "ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಯಾಮೆರಾ ಬಳಸಿ",
    "cropDoctor.supportedCrops":
      "ಟೊಮ್ಯಾಟೊ, ಗೋಧಿ, ಭತ್ತ, ಹತ್ತಿ ಅಥವಾ ಕಡಲೆಕಾಯಿ ಫೋಟೋಗಳೊಂದಿಗೆ ಡೆಮೋ ವಿಶ್ಲೇಷಣೆ ಉತ್ತಮವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    "cropDoctor.selectPhoto": "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    "cropDoctor.uploadPhoto":
      "ಬೆಳೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "cropDoctor.uploadedPreview":
      "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋ",
    "cropDoctor.clearUploadedPhoto":
      "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋ ತೆಗೆದುಹಾಕಿ",

    "cropDoctor.cropType": "ಬೆಳೆಯ ಪ್ರಕಾರ",
    "cropDoctor.autoDetect":
      "ಫೈಲ್ ಹೆಸರಿನಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಹಚ್ಚಿ",
    "cropDoctor.chooseCrop":
      "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಫೈಲ್ ಹೆಸರಿನಿಂದ ಪತ್ತೆಹಚ್ಚಲು Auto-detect ಅನ್ನು ಬಿಡಿ.",

    "cropDoctor.tomato": "ಟೊಮ್ಯಾಟೊ",
    "cropDoctor.wheat": "ಗೋಧಿ",
    "cropDoctor.paddy": "ಭತ್ತ",
    "cropDoctor.cotton": "ಹತ್ತಿ",
    "cropDoctor.groundnut": "ಕಡಲೆಕಾಯಿ",

    "cropDoctor.analyzing":
      "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    "cropDoctor.analyzeCrop":
      "ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    "cropDoctor.clearReset":
      "ಅಳಿಸಿ / ಮರುಹೊಂದಿಸಿ",
    "cropDoctor.anotherImage":
      "ಮತ್ತೊಂದು ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",

    "cropDoctor.analysisProgress":
      "AI ಸಹಾಯದಿಂದ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ",
    "cropDoctor.analysisDescription":
      "ಲಕ್ಷಣಗಳು, ವಿಶ್ವಾಸ ಮಟ್ಟ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",

    "cropDoctor.scanDaylight":
      "ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    "cropDoctor.scanDaylightText":
      "ನೈಸರ್ಗಿಕ ಬೆಳಕು ಮಾದರಿಯ ನಿಖರತೆಯನ್ನು 20% ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    "cropDoctor.showBothSides":
      "ಎರಡೂ ಬದಿಗಳನ್ನು ತೋರಿಸಿ",
    "cropDoctor.showBothSidesText":
      "ಅನೇಕ ಕೀಟಗಳು ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಅಡಗಿರುತ್ತವೆ.",
    "cropDoctor.captureWholePlant":
      "ಸಂಪೂರ್ಣ ಸಸ್ಯವನ್ನು ತೋರಿಸಿ",
    "cropDoctor.captureWholePlantText":
      "ರೋಗದ ಹರಡುವಿಕೆಯನ್ನು ತಿಳಿಯಲು ದೂರದಿಂದ ತೆಗೆದ ಚಿತ್ರವನ್ನೂ ಸೇರಿಸಿ.",

    "cropDoctor.sampleDiagnosis":
      "ಮಾದರಿ ರೋಗ ನಿರ್ಣಯ",
    "cropDoctor.demoResult":
      "ಡೆಮೋ AI ಸಹಾಯಿತ ಫಲಿತಾಂಶ",
    "cropDoctor.modelConfidence":
      "ಮಾದರಿಯ ವಿಶ್ವಾಸ ಮಟ್ಟ",
    "cropDoctor.symptoms": "ಲಕ್ಷಣಗಳು",
    "cropDoctor.recommendedTreatment":
      "ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ",
    "cropDoctor.preventionTips":
      "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು",

    "cropDoctor.demoMode": "ಡೆಮೋ ಮೋಡ್",
    "cropDoctor.demoModeText":
      'ಬೆಳೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು "ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ" ಕ್ಲಿಕ್ ಮಾಡಿ. ಟೊಮ್ಯಾಟೊ, ಗೋಧಿ, ಭತ್ತ, ಹತ್ತಿ ಅಥವಾ ಕಡಲೆಕಾಯಿಗೆ ಸ್ಥಳೀಯ ಡೆಮೋ ಫಲಿತಾಂಶ ಕಾಣಿಸುತ್ತದೆ.',

    "cropDoctor.demoWarning":
      "ಡೆಮೋ / AI ಸಹಾಯಿತ ಫಲಿತಾಂಶ — ತರಬೇತಿ ಪಡೆದ ರೋಗ ನಿರ್ಣಯವಲ್ಲ",
    "cropDoctor.demoWarningText":
      "ಈ ಫಲಿತಾಂಶವನ್ನು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ ಸ್ಥಳೀಯವಾಗಿ ರಚಿಸಲಾಗಿದೆ. ಯಾವುದೇ ರಾಸಾಯನಿಕವನ್ನು ಖರೀದಿಸುವ ಅಥವಾ ಬಳಸುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಅಥವಾ ಪ್ರಮಾಣೀಕೃತ ಸಸ್ಯ ರೋಗ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",

    "cropDoctor.earlyBlight":
      "ಆರಂಭಿಕ ಬ್ಲೈಟ್ (Alternaria solani)",
    "cropDoctor.yellowRust":
      "ಹಳದಿ ತುಕ್ಕು",
    "cropDoctor.pinkBollworm":
      "ಪಿಂಕ್ ಬೋಲ್‌ವರ್ಮ್",
    "cropDoctor.bacterialLeafBlight":
      "ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಲೀಫ್ ಬ್ಲೈಟ್",
    "cropDoctor.nutrientDeficiency":
      "ಪೋಷಕಾಂಶದ ಕೊರತೆ (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
    "cropDoctor.earlyBlightSymptom2":
      "ಸೋಂಕಿತ ಪ್ರದೇಶಗಳ ಸುತ್ತಲಿನ ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ",
    "cropDoctor.earlyBlightSymptom3":
      "ಎಲೆಗಳು ಒಣಗಿ ಉದುರಬಹುದು",
    "cropDoctor.earlyBlightTreatment":
      "ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನದಂತೆ ಸೂಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸಿ.",
    "cropDoctor.earlyBlightPrevention1":
      "ಎಲೆಗಳ ಮೇಲೆ ಹೆಚ್ಚು ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ",
    "cropDoctor.earlyBlightPrevention2":
      "ಸಸ್ಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರವನ್ನು ಕಾಪಾಡಿ",
    "cropDoctor.earlyBlightPrevention3":
      "ಸೋಂಕಿತ ಸಸ್ಯದ ಭಾಗಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",

    "cropDoctor.invalidFile":
      "ದಯವಿಟ್ಟು JPG ಅಥವಾ PNG ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "cropDoctor.fileTooLarge":
      "ದಯವಿಟ್ಟು 10 MB ಗಿಂತ ಚಿಕ್ಕ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    "cropDoctor.uploadFirst":
      "ದಯವಿಟ್ಟು ಮೊದಲು ಬೆಳೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
  },

  bn: {
    ...cropDoctorEn,

    "cropDoctor.title": "ফসল ডাক্তার",
    "cropDoctor.uploadTitle":
      "ফসলের ছবি আপলোড করুন",
    "cropDoctor.uploadDescription":
      "JPG বা PNG, সর্বোচ্চ 10 MB। এই ডেমো স্থানীয় নমুনা লজিক ব্যবহার করে।",
    "cropDoctor.dragPhoto":
      "ছবি এখানে টেনে আনুন অথবা ক্যামেরা ব্যবহার করুন",
    "cropDoctor.supportedCrops":
      "টমেটো, গম, ধান, তুলা বা চিনাবাদামের ছবি দিয়ে ডেমো বিশ্লেষণ ভালো কাজ করে",
    "cropDoctor.selectPhoto":
      "ছবি নির্বাচন করুন",
    "cropDoctor.uploadPhoto":
      "ফসলের ছবি আপলোড করুন",
    "cropDoctor.uploadedPreview":
      "আপলোড করা ছবির প্রিভিউ",
    "cropDoctor.clearUploadedPhoto":
      "আপলোড করা ছবি মুছুন",

    "cropDoctor.cropType": "ফসলের ধরন",
    "cropDoctor.autoDetect":
      "ফাইলের নাম থেকে স্বয়ংক্রিয়ভাবে শনাক্ত করুন",
    "cropDoctor.chooseCrop":
      "ফসল নির্বাচন করুন অথবা ফাইলের নাম থেকে শনাক্ত করতে Auto-detect রাখুন।",

    "cropDoctor.tomato": "টমেটো",
    "cropDoctor.wheat": "গম",
    "cropDoctor.paddy": "ধান",
    "cropDoctor.cotton": "তুলা",
    "cropDoctor.groundnut": "চিনাবাদাম",

    "cropDoctor.analyzing":
      "বিশ্লেষণ চলছে...",
    "cropDoctor.analyzeCrop":
      "ফসল বিশ্লেষণ করুন",
    "cropDoctor.clearReset":
      "পরিষ্কার / রিসেট করুন",
    "cropDoctor.anotherImage":
      "অন্য ছবি বিশ্লেষণ করুন",

    "cropDoctor.analysisProgress":
      "AI সহায়তায় বিশ্লেষণ চলছে",
    "cropDoctor.analysisDescription":
      "লক্ষণ, নির্ভরযোগ্যতার মাত্রা এবং চিকিৎসার পরামর্শ পরীক্ষা করা হচ্ছে...",

    "cropDoctor.scanDaylight":
      "দিনের আলোতে স্ক্যান করুন",
    "cropDoctor.scanDaylightText":
      "প্রাকৃতিক আলো মডেলের নির্ভুলতা 20% বাড়ায়।",
    "cropDoctor.showBothSides":
      "দুই দিকই দেখান",
    "cropDoctor.showBothSidesText":
      "অনেক পোকা পাতার নিচের দিকে লুকিয়ে থাকে।",
    "cropDoctor.captureWholePlant":
      "পুরো গাছটি দেখান",
    "cropDoctor.captureWholePlantText":
      "রোগ ছড়ানোর ধরন বোঝার জন্য দূর থেকে একটি ছবিও দিন।",

    "cropDoctor.sampleDiagnosis":
      "নমুনা রোগ নির্ণয়",
    "cropDoctor.demoResult":
      "ডেমো AI সহায়তায় ফলাফল",
    "cropDoctor.modelConfidence":
      "মডেলের নির্ভরযোগ্যতা",
    "cropDoctor.symptoms": "লক্ষণ",
    "cropDoctor.recommendedTreatment":
      "প্রস্তাবিত চিকিৎসা",
    "cropDoctor.preventionTips":
      "প্রতিরোধের পরামর্শ",

    "cropDoctor.demoMode": "ডেমো মোড",
    "cropDoctor.demoModeText":
      'ফসলের ছবি আপলোড করে "ফসল বিশ্লেষণ করুন" ক্লিক করুন। টমেটো, গম, ধান, তুলা বা চিনাবাদামের জন্য স্থানীয় ডেমো ফলাফল দেখা যাবে।',

    "cropDoctor.demoWarning":
      "ডেমো / AI সহায়তায় ফলাফল — প্রশিক্ষিত রোগ নির্ণয় নয়",
    "cropDoctor.demoWarningText":
      "এই ফলাফল শুধুমাত্র প্রদর্শনের জন্য স্থানীয়ভাবে তৈরি করা হয়েছে। কোনো রাসায়নিক কেনা বা ব্যবহার করার আগে স্থানীয় কৃষি আধিকারিক বা প্রত্যয়িত উদ্ভিদ রোগ বিশেষজ্ঞের পরামর্শ নিন।",

    "cropDoctor.earlyBlight":
      "আর্লি ব্লাইট (Alternaria solani)",
    "cropDoctor.yellowRust":
      "হলুদ মরিচা",
    "cropDoctor.pinkBollworm":
      "পিঙ্ক বোলওয়ার্ম",
    "cropDoctor.bacterialLeafBlight":
      "ব্যাকটেরিয়াল লিফ ব্লাইট",
    "cropDoctor.nutrientDeficiency":
      "পুষ্টির ঘাটতি (Mg)",

    "cropDoctor.earlyBlightSymptom1":
      "পুরনো পাতায় কালো দাগ দেখা যায়",
    "cropDoctor.earlyBlightSymptom2":
      "আক্রান্ত এলাকার চারপাশের পাতা হলুদ হয়ে যায়",
    "cropDoctor.earlyBlightSymptom3":
      "পাতা শুকিয়ে ঝরে পড়তে পারে",
    "cropDoctor.earlyBlightTreatment":
      "আক্রান্ত পাতা সরিয়ে ফেলুন এবং স্থানীয় কৃষি পরামর্শ অনুযায়ী উপযুক্ত ছত্রাকনাশক ব্যবহার করুন।",
    "cropDoctor.earlyBlightPrevention1":
      "পাতায় অতিরিক্ত পানি দেওয়া এড়িয়ে চলুন",
    "cropDoctor.earlyBlightPrevention2":
      "গাছগুলোর মধ্যে সঠিক দূরত্ব বজায় রাখুন",
    "cropDoctor.earlyBlightPrevention3":
      "আক্রান্ত গাছের অংশ সরিয়ে ফেলুন",

    "cropDoctor.invalidFile":
      "দয়া করে JPG বা PNG ছবি আপলোড করুন।",
    "cropDoctor.fileTooLarge":
      "দয়া করে 10 MB-এর ছোট ছবি আপলোড করুন।",
    "cropDoctor.uploadFirst":
      "দয়া করে প্রথমে ফসলের ছবি আপলোড করুন।",
  },
};