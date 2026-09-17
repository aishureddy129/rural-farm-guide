import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useT } from "../lib/i18n";

export const Route = createFileRoute("/crop-doctor")({
  component: CropDoctor,
});

type CropType = "tomato" | "wheat" | "paddy" | "cotton" | "groundnut";

type Language =
  | "en"
  | "te"
  | "hi"
  | "mr"
  | "ta"
  | "kn"
  | "bn";

const cropKeys: CropType[] = [
  "tomato",
  "wheat",
  "paddy",
  "cotton",
  "groundnut",
];

const translations: Record<
  Language,
  {
    symptoms: Record<CropType, string[]>;
    treatment: Record<CropType, string>;
    prevention: Record<CropType, string[]>;
  }
> = {
  en: {
    symptoms: {
      tomato: [
        "Dark spots appear on older leaves",
        "Yellowing around infected areas",
        "Leaves may dry and fall",
      ],
      wheat: [
        "Yellow or orange powder-like stripes",
        "Small yellow pustules appear on leaves",
        "Leaves may lose their green colour",
      ],
      paddy: [
        "Water-soaked lesions appear on leaves",
        "Leaf edges become yellow or brown",
        "Infected leaves may dry gradually",
      ],
      cotton: [
        "Damage appears inside cotton bolls",
        "Bolls may open poorly",
        "Larvae can damage developing cotton seeds",
      ],
      groundnut: [
        "Leaves may become pale or yellow",
        "Plant growth may become weak",
        "Older leaves can show deficiency symptoms",
      ],
    },

    treatment: {
      tomato:
        "Remove infected leaves and use an appropriate fungicide according to local agricultural guidance.",
      wheat:
        "Monitor the crop closely and follow locally recommended fungicide treatment if the disease spreads.",
      paddy:
        "Remove severely affected plants where practical and follow local agricultural recommendations.",
      cotton:
        "Monitor boll development and follow locally approved pest-management recommendations.",
      groundnut:
        "Test the soil where possible and apply nutrients according to soil-test and local agricultural recommendations.",
    },

    prevention: {
      tomato: [
        "Avoid excess watering on leaves",
        "Maintain proper spacing between plants",
        "Remove infected plant material",
      ],
      wheat: [
        "Use healthy seed",
        "Maintain proper field drainage",
        "Monitor the crop regularly",
      ],
      paddy: [
        "Avoid excessive nitrogen application",
        "Maintain good field drainage",
        "Use healthy planting material",
      ],
      cotton: [
        "Monitor the crop regularly",
        "Remove heavily affected bolls",
        "Follow recommended pest-management practices",
      ],
      groundnut: [
        "Maintain balanced soil nutrition",
        "Use recommended fertilizer doses",
        "Monitor plant growth regularly",
      ],
    },
  },

  te: {
    symptoms: {
      tomato: [
        "పాత ఆకులపై ముదురు మచ్చలు కనిపిస్తాయి",
        "వ్యాధి సోకిన ప్రాంతాల చుట్టూ పసుపు రంగు కనిపిస్తుంది",
        "ఆకులు ఎండిపోయి రాలిపోవచ్చు",
      ],
      wheat: [
        "పసుపు లేదా నారింజ రంగు పొడి వంటి చారలు కనిపిస్తాయి",
        "ఆకులపై చిన్న పసుపు రంగు మచ్చలు కనిపిస్తాయి",
        "ఆకులు తమ ఆకుపచ్చ రంగును కోల్పోవచ్చు",
      ],
      paddy: [
        "ఆకులపై నీటితో తడిసినట్లుగా మచ్చలు కనిపిస్తాయి",
        "ఆకుల అంచులు పసుపు లేదా గోధుమ రంగులోకి మారుతాయి",
        "వ్యాధి సోకిన ఆకులు క్రమంగా ఎండిపోవచ్చు",
      ],
      cotton: [
        "పత్తి కాయల లోపల నష్టం కనిపిస్తుంది",
        "పత్తి కాయలు సరిగ్గా తెరుచుకోకపోవచ్చు",
        "లార్వాలు అభివృద్ధి చెందుతున్న పత్తి విత్తనాలను దెబ్బతీయవచ్చు",
      ],
      groundnut: [
        "ఆకులు పాలిపోయిన లేదా పసుపు రంగులోకి మారవచ్చు",
        "మొక్క పెరుగుదల బలహీనంగా మారవచ్చు",
        "పాత ఆకులపై పోషక లోపం లక్షణాలు కనిపించవచ్చు",
      ],
    },

    treatment: {
      tomato:
        "వ్యాధి సోకిన ఆకులను తొలగించి, స్థానిక వ్యవసాయ అధికారుల సూచనల ప్రకారం తగిన శిలీంద్రనాశకాన్ని ఉపయోగించండి.",
      wheat:
        "పంటను జాగ్రత్తగా పరిశీలించండి. వ్యాధి వ్యాప్తి చెందితే స్థానికంగా సిఫార్సు చేసిన శిలీంద్రనాశక చికిత్సను అనుసరించండి.",
      paddy:
        "తీవ్రంగా ప్రభావితమైన మొక్కలను సాధ్యమైనంత వరకు తొలగించి, స్థానిక వ్యవసాయ సిఫార్సులను పాటించండి.",
      cotton:
        "పత్తి కాయల అభివృద్ధిని పరిశీలించి, స్థానికంగా అనుమతించబడిన పురుగు నియంత్రణ పద్ధతులను అనుసరించండి.",
      groundnut:
        "సాధ్యమైనప్పుడు మట్టిని పరీక్షించి, మట్టి పరీక్ష మరియు స్థానిక వ్యవసాయ సిఫార్సుల ప్రకారం పోషకాలను అందించండి.",
    },

    prevention: {
      tomato: [
        "ఆకులపై ఎక్కువగా నీరు పోయవద్దు",
        "మొక్కల మధ్య సరైన దూరం ఉంచండి",
        "వ్యాధి సోకిన మొక్కల భాగాలను తొలగించండి",
      ],
      wheat: [
        "ఆరోగ్యకరమైన విత్తనాలను ఉపయోగించండి",
        "పొలంలో సరైన నీటి పారుదల ఉండేలా చూడండి",
        "పంటను క్రమం తప్పకుండా పరిశీలించండి",
      ],
      paddy: [
        "అధిక నత్రజని ఎరువుల వాడకాన్ని నివారించండి",
        "పొలంలో మంచి నీటి పారుదల ఉండేలా చూడండి",
        "ఆరోగ్యకరమైన నాట్ల పదార్థాన్ని ఉపయోగించండి",
      ],
      cotton: [
        "పంటను క్రమం తప్పకుండా పరిశీలించండి",
        "తీవ్రంగా ప్రభావితమైన పత్తి కాయలను తొలగించండి",
        "సిఫార్సు చేసిన పురుగు నియంత్రణ పద్ధతులను పాటించండి",
      ],
      groundnut: [
        "మట్టిలో సమతుల్య పోషకాలను నిర్వహించండి",
        "సిఫార్సు చేసిన ఎరువుల మోతాదులను ఉపయోగించండి",
        "మొక్కల పెరుగుదలను క్రమం తప్పకుండా పరిశీలించండి",
      ],
    },
  },

  hi: {
    symptoms: {
      tomato: [
        "पुरानी पत्तियों पर गहरे धब्बे दिखाई देते हैं",
        "संक्रमित क्षेत्रों के आसपास पीलापन दिखाई देता है",
        "पत्तियां सूखकर गिर सकती हैं",
      ],
      wheat: [
        "पीली या नारंगी पाउडर जैसी धारियां दिखाई देती हैं",
        "पत्तियों पर छोटे पीले धब्बे दिखाई देते हैं",
        "पत्तियां अपना हरा रंग खो सकती हैं",
      ],
      paddy: [
        "पत्तियों पर पानी से भीगे हुए जैसे धब्बे दिखाई देते हैं",
        "पत्तियों के किनारे पीले या भूरे हो जाते हैं",
        "संक्रमित पत्तियां धीरे-धीरे सूख सकती हैं",
      ],
      cotton: [
        "कपास की फलियों के अंदर नुकसान दिखाई देता है",
        "फलियां ठीक से नहीं खुल सकती हैं",
        "लार्वा विकसित हो रहे कपास के बीजों को नुकसान पहुंचा सकते हैं",
      ],
      groundnut: [
        "पत्तियां हल्की या पीली हो सकती हैं",
        "पौधे की वृद्धि कमजोर हो सकती है",
        "पुरानी पत्तियों पर पोषक तत्वों की कमी के लक्षण दिखाई दे सकते हैं",
      ],
    },

    treatment: {
      tomato:
        "संक्रमित पत्तियों को हटाएं और स्थानीय कृषि सलाह के अनुसार उचित फफूंदनाशक का उपयोग करें।",
      wheat:
        "फसल की नियमित निगरानी करें और रोग फैलने पर स्थानीय रूप से अनुशंसित फफूंदनाशक उपचार अपनाएं।",
      paddy:
        "गंभीर रूप से प्रभावित पौधों को जहां संभव हो हटाएं और स्थानीय कृषि सलाह का पालन करें।",
      cotton:
        "कपास की फलियों की निगरानी करें और स्थानीय रूप से अनुमोदित कीट प्रबंधन उपायों का पालन करें।",
      groundnut:
        "जहां संभव हो मिट्टी की जांच करें और मिट्टी की जांच तथा स्थानीय कृषि सलाह के अनुसार पोषक तत्व दें।",
    },

    prevention: {
      tomato: [
        "पत्तियों पर अधिक पानी देने से बचें",
        "पौधों के बीच उचित दूरी रखें",
        "संक्रमित पौधों के हिस्सों को हटाएं",
      ],
      wheat: [
        "स्वस्थ बीज का उपयोग करें",
        "खेत में उचित जल निकासी रखें",
        "फसल की नियमित निगरानी करें",
      ],
      paddy: [
        "अत्यधिक नाइट्रोजन का प्रयोग न करें",
        "खेत में अच्छी जल निकासी रखें",
        "स्वस्थ रोपण सामग्री का उपयोग करें",
      ],
      cotton: [
        "फसल की नियमित निगरानी करें",
        "अधिक प्रभावित कपास की फलियों को हटाएं",
        "अनुशंसित कीट प्रबंधन उपायों का पालन करें",
      ],
      groundnut: [
        "मिट्टी में संतुलित पोषण बनाए रखें",
        "अनुशंसित उर्वरक मात्रा का उपयोग करें",
        "पौधों की वृद्धि की नियमित निगरानी करें",
      ],
    },
  },

  mr: {
    symptoms: {
      tomato: [
        "जुन्या पानांवर काळे डाग दिसतात",
        "संसर्ग झालेल्या भागाभोवती पिवळेपणा दिसतो",
        "पाने सुकून गळू शकतात",
      ],
      wheat: [
        "पिवळ्या किंवा नारिंगी रंगाच्या पावडरसारख्या रेषा दिसतात",
        "पानांवर लहान पिवळे डाग दिसतात",
        "पानांचा हिरवा रंग कमी होऊ शकतो",
      ],
      paddy: [
        "पानांवर पाण्याने भिजल्यासारखे डाग दिसतात",
        "पानांच्या कडा पिवळ्या किंवा तपकिरी होतात",
        "संसर्ग झालेली पाने हळूहळू सुकू शकतात",
      ],
      cotton: [
        "कापसाच्या बोंडांच्या आत नुकसान दिसते",
        "बोंडे व्यवस्थित उघडू शकत नाहीत",
        "अळ्या विकसित होणाऱ्या कापसाच्या बियांना नुकसान करू शकतात",
      ],
      groundnut: [
        "पाने फिकट किंवा पिवळी होऊ शकतात",
        "झाडाची वाढ कमकुवत होऊ शकते",
        "जुन्या पानांवर पोषक तत्त्वांच्या कमतरतेची लक्षणे दिसू शकतात",
      ],
    },

    treatment: {
      tomato:
        "संसर्ग झालेली पाने काढून टाका आणि स्थानिक कृषी मार्गदर्शनानुसार योग्य बुरशीनाशक वापरा.",
      wheat:
        "पिकाचे नियमित निरीक्षण करा आणि रोग वाढल्यास स्थानिक शिफारसीनुसार बुरशीनाशक उपचार करा.",
      paddy:
        "जास्त प्रभावित झाडे शक्य असल्यास काढून टाका आणि स्थानिक कृषी सल्ल्याचे पालन करा.",
      cotton:
        "कापसाच्या बोंडांची नियमित पाहणी करा आणि स्थानिक मान्यताप्राप्त कीड व्यवस्थापन पद्धती वापरा.",
      groundnut:
        "शक्य असल्यास मातीची तपासणी करा आणि माती परीक्षण व स्थानिक कृषी सल्ल्यानुसार पोषक तत्त्वे द्या.",
    },

    prevention: {
      tomato: [
        "पानांवर जास्त पाणी देणे टाळा",
        "झाडांमध्ये योग्य अंतर ठेवा",
        "संसर्ग झालेला वनस्पती भाग काढून टाका",
      ],
      wheat: [
        "निरोगी बियाणे वापरा",
        "शेतात योग्य निचरा ठेवा",
        "पिकाची नियमित पाहणी करा",
      ],
      paddy: [
        "अति नायट्रोजन वापरणे टाळा",
        "शेतात योग्य निचरा ठेवा",
        "निरोगी लागवड साहित्य वापरा",
      ],
      cotton: [
        "पिकाची नियमित पाहणी करा",
        "जास्त प्रभावित बोंडे काढून टाका",
        "शिफारस केलेल्या कीड व्यवस्थापन पद्धती वापरा",
      ],
      groundnut: [
        "मातीतील पोषण संतुलित ठेवा",
        "शिफारस केलेल्या खतांच्या मात्रा वापरा",
        "झाडांच्या वाढीचे नियमित निरीक्षण करा",
      ],
    },
  },

  ta: {
    symptoms: {
      tomato: [
        "பழைய இலைகளில் கரும்புள்ளிகள் தோன்றும்",
        "பாதிக்கப்பட்ட பகுதிகளைச் சுற்றி மஞ்சள் நிறம் தோன்றும்",
        "இலைகள் உலர்ந்து விழலாம்",
      ],
      wheat: [
        "மஞ்சள் அல்லது ஆரஞ்சு நிற தூள் போன்ற கோடுகள் தோன்றும்",
        "இலைகளில் சிறிய மஞ்சள் புள்ளிகள் தோன்றும்",
        "இலைகள் பச்சை நிறத்தை இழக்கலாம்",
      ],
      paddy: [
        "இலைகளில் நீரில் நனைந்தது போன்ற புள்ளிகள் தோன்றும்",
        "இலைகளின் விளிம்புகள் மஞ்சள் அல்லது பழுப்பு நிறமாக மாறும்",
        "பாதிக்கப்பட்ட இலைகள் மெதுவாக உலரலாம்",
      ],
      cotton: [
        "பருத்தி காய்களுக்குள் சேதம் காணப்படும்",
        "காய்கள் சரியாக திறக்காமல் இருக்கலாம்",
        "புழுக்கள் வளரும் பருத்தி விதைகளை சேதப்படுத்தலாம்",
      ],
      groundnut: [
        "இலைகள் வெளிர் அல்லது மஞ்சள் நிறமாக மாறலாம்",
        "செடியின் வளர்ச்சி பலவீனமாகலாம்",
        "பழைய இலைகளில் ஊட்டச்சத்து குறைபாடு அறிகுறிகள் தோன்றலாம்",
      ],
    },

    treatment: {
      tomato:
        "பாதிக்கப்பட்ட இலைகளை அகற்றி, உள்ளூர் வேளாண் ஆலோசனையின்படி பொருத்தமான பூஞ்சைக் கொல்லியைப் பயன்படுத்தவும்.",
      wheat:
        "பயிரை தொடர்ந்து கண்காணித்து, நோய் பரவினால் உள்ளூர் பரிந்துரைக்கப்பட்ட பூஞ்சைக் கொல்லி சிகிச்சையைப் பின்பற்றவும்.",
      paddy:
        "கடுமையாக பாதிக்கப்பட்ட செடிகளை முடிந்தால் அகற்றி, உள்ளூர் வேளாண் பரிந்துரைகளைப் பின்பற்றவும்.",
      cotton:
        "பருத்தி காய்களின் வளர்ச்சியை கண்காணித்து, உள்ளூர் அங்கீகரிக்கப்பட்ட பூச்சி மேலாண்மை முறைகளைப் பின்பற்றவும்.",
      groundnut:
        "முடிந்தால் மண் பரிசோதனை செய்து, மண் பரிசோதனை மற்றும் உள்ளூர் வேளாண் பரிந்துரைகளின்படி ஊட்டச்சத்துகளை வழங்கவும்.",
    },

    prevention: {
      tomato: [
        "இலைகளில் அதிகமாக நீர் ஊற்றுவதைத் தவிர்க்கவும்",
        "செடிகளுக்கு இடையில் சரியான இடைவெளி விடவும்",
        "பாதிக்கப்பட்ட தாவரப் பகுதிகளை அகற்றவும்",
      ],
      wheat: [
        "ஆரோக்கியமான விதைகளைப் பயன்படுத்தவும்",
        "வயலில் நல்ல வடிகால் வசதி வைத்திருக்கவும்",
        "பயிரை தொடர்ந்து கண்காணிக்கவும்",
      ],
      paddy: [
        "அதிக நைட்ரஜன் உரத்தைப் பயன்படுத்துவதைத் தவிர்க்கவும்",
        "வயலில் நல்ல வடிகால் வசதி வைத்திருக்கவும்",
        "ஆரோக்கியமான நடவு பொருட்களைப் பயன்படுத்தவும்",
      ],
      cotton: [
        "பயிரை தொடர்ந்து கண்காணிக்கவும்",
        "கடுமையாக பாதிக்கப்பட்ட காய்களை அகற்றவும்",
        "பரிந்துரைக்கப்பட்ட பூச்சி மேலாண்மை முறைகளைப் பின்பற்றவும்",
      ],
      groundnut: [
        "மண்ணில் சமநிலையான ஊட்டச்சத்தை பராமரிக்கவும்",
        "பரிந்துரைக்கப்பட்ட உர அளவுகளைப் பயன்படுத்தவும்",
        "செடியின் வளர்ச்சியை தொடர்ந்து கண்காணிக்கவும்",
      ],
    },
  },

  kn: {
    symptoms: {
      tomato: [
        "ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ",
        "ಸೋಂಕಿತ ಭಾಗಗಳ ಸುತ್ತ ಹಳದಿ ಬಣ್ಣ ಕಾಣಿಸುತ್ತದೆ",
        "ಎಲೆಗಳು ಒಣಗಿ ಬೀಳಬಹುದು",
      ],
      wheat: [
        "ಹಳದಿ ಅಥವಾ ಕಿತ್ತಳೆ ಬಣ್ಣದ ಪುಡಿಯಂತಹ ಪಟ್ಟೆಗಳು ಕಾಣಿಸುತ್ತವೆ",
        "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಹಳದಿ ಕಲೆಗಳು ಕಾಣಿಸುತ್ತವೆ",
        "ಎಲೆಗಳು ಹಸಿರು ಬಣ್ಣವನ್ನು ಕಳೆದುಕೊಳ್ಳಬಹುದು",
      ],
      paddy: [
        "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಿಂದ ತೇವವಾದಂತಹ ಕಲೆಗಳು ಕಾಣಿಸುತ್ತವೆ",
        "ಎಲೆಗಳ ಅಂಚುಗಳು ಹಳದಿ ಅಥವಾ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ",
        "ಸೋಂಕಿತ ಎಲೆಗಳು ನಿಧಾನವಾಗಿ ಒಣಗಬಹುದು",
      ],
      cotton: [
        "ಹತ್ತಿ ಕಾಯಿಗಳ ಒಳಗೆ ಹಾನಿ ಕಾಣಿಸುತ್ತದೆ",
        "ಕಾಯಿಗಳು ಸರಿಯಾಗಿ ತೆರೆಯದಿರಬಹುದು",
        "ಹುಳುಗಳು ಬೆಳೆಯುತ್ತಿರುವ ಹತ್ತಿ ಬೀಜಗಳಿಗೆ ಹಾನಿ ಮಾಡಬಹುದು",
      ],
      groundnut: [
        "ಎಲೆಗಳು ಮಸುಕಾದ ಅಥವಾ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಬಹುದು",
        "ಸಸ್ಯದ ಬೆಳವಣಿಗೆ ದುರ್ಬಲವಾಗಬಹುದು",
        "ಹಳೆಯ ಎಲೆಗಳಲ್ಲಿ ಪೋಷಕಾಂಶ ಕೊರತೆಯ ಲಕ್ಷಣಗಳು ಕಾಣಬಹುದು",
      ],
    },

    treatment: {
      tomato:
        "ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಮಾರ್ಗದರ್ಶನದ ಪ್ರಕಾರ ಸೂಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸಿ.",
      wheat:
        "ಬೆಳೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ ಮತ್ತು ರೋಗ ಹರಡಿದರೆ ಸ್ಥಳೀಯವಾಗಿ ಶಿಫಾರಸು ಮಾಡಿದ ಶಿಲೀಂಧ್ರನಾಶಕ ಚಿಕಿತ್ಸೆಯನ್ನು ಅನುಸರಿಸಿ.",
      paddy:
        "ತೀವ್ರವಾಗಿ ಹಾನಿಗೊಳಗಾದ ಸಸ್ಯಗಳನ್ನು ಸಾಧ್ಯವಾದರೆ ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸ್ಥಳೀಯ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
      cotton:
        "ಹತ್ತಿ ಕಾಯಿಗಳ ಬೆಳವಣಿಗೆಯನ್ನು ಗಮನಿಸಿ ಮತ್ತು ಸ್ಥಳೀಯವಾಗಿ ಅನುಮೋದಿಸಲಾದ ಕೀಟ ನಿರ್ವಹಣಾ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ.",
      groundnut:
        "ಸಾಧ್ಯವಾದರೆ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮಾಡಿ ಮತ್ತು ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಹಾಗೂ ಸ್ಥಳೀಯ ಕೃಷಿ ಸಲಹೆಯ ಪ್ರಕಾರ ಪೋಷಕಾಂಶಗಳನ್ನು ನೀಡಿ.",
    },

    prevention: {
      tomato: [
        "ಎಲೆಗಳ ಮೇಲೆ ಹೆಚ್ಚು ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ",
        "ಸಸ್ಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರವನ್ನು ಇಡಿ",
        "ಸೋಂಕಿತ ಸಸ್ಯ ಭಾಗಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
      ],
      wheat: [
        "ಆರೋಗ್ಯಕರ ಬೀಜಗಳನ್ನು ಬಳಸಿ",
        "ಹೊಲದಲ್ಲಿ ಸರಿಯಾದ ನೀರು ಹರಿಯುವ ವ್ಯವಸ್ಥೆ ಇರಲಿ",
        "ಬೆಳೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ",
      ],
      paddy: [
        "ಅತಿಯಾದ ಸಾರಜನಕ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ",
        "ಹೊಲದಲ್ಲಿ ಉತ್ತಮ ನೀರು ಹರಿಯುವ ವ್ಯವಸ್ಥೆ ಇರಲಿ",
        "ಆರೋಗ್ಯಕರ ನಾಟಿ ವಸ್ತುಗಳನ್ನು ಬಳಸಿ",
      ],
      cotton: [
        "ಬೆಳೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ",
        "ತೀವ್ರವಾಗಿ ಹಾನಿಗೊಳಗಾದ ಕಾಯಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ",
        "ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟ ನಿರ್ವಹಣಾ ಕ್ರಮಗಳನ್ನು ಅನುಸರಿಸಿ",
      ],
      groundnut: [
        "ಮಣ್ಣಿನಲ್ಲಿ ಸಮತೋಲನದ ಪೋಷಕಾಂಶಗಳನ್ನು ಕಾಪಾಡಿ",
        "ಶಿಫಾರಸು ಮಾಡಿದ ಗೊಬ್ಬರ ಪ್ರಮಾಣವನ್ನು ಬಳಸಿ",
        "ಸಸ್ಯದ ಬೆಳವಣಿಗೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ",
      ],
    },
  },

  bn: {
    symptoms: {
      tomato: [
        "পুরনো পাতায় কালো দাগ দেখা যায়",
        "আক্রান্ত অংশের চারপাশে হলুদভাব দেখা যায়",
        "পাতা শুকিয়ে ঝরে পড়তে পারে",
      ],
      wheat: [
        "হলুদ বা কমলা রঙের গুঁড়োর মতো দাগ দেখা যায়",
        "পাতায় ছোট হলুদ দাগ দেখা যায়",
        "পাতা সবুজ রং হারাতে পারে",
      ],
      paddy: [
        "পাতায় জলভেজা দাগ দেখা যায়",
        "পাতার কিনারা হলুদ বা বাদামী হয়ে যায়",
        "আক্রান্ত পাতা ধীরে ধীরে শুকিয়ে যেতে পারে",
      ],
      cotton: [
        "তুলার বোলের ভিতরে ক্ষতি দেখা যায়",
        "বোল ঠিকভাবে খুলতে নাও পারে",
        "লার্ভা বাড়তে থাকা তুলার বীজের ক্ষতি করতে পারে",
      ],
      groundnut: [
        "পাতা ফ্যাকাশে বা হলুদ হয়ে যেতে পারে",
        "গাছের বৃদ্ধি দুর্বল হতে পারে",
        "পুরনো পাতায় পুষ্টির ঘাটতির লক্ষণ দেখা যেতে পারে",
      ],
    },

    treatment: {
      tomato:
        "আক্রান্ত পাতা সরিয়ে ফেলুন এবং স্থানীয় কৃষি পরামর্শ অনুযায়ী উপযুক্ত ছত্রাকনাশক ব্যবহার করুন।",
      wheat:
        "ফসল নিয়মিত পর্যবেক্ষণ করুন এবং রোগ ছড়ালে স্থানীয়ভাবে সুপারিশ করা ছত্রাকনাশক চিকিৎসা অনুসরণ করুন।",
      paddy:
        "সম্ভব হলে গুরুতরভাবে আক্রান্ত গাছ সরিয়ে ফেলুন এবং স্থানীয় কৃষি পরামর্শ অনুসরণ করুন।",
      cotton:
        "তুলার বোলের বৃদ্ধি পর্যবেক্ষণ করুন এবং স্থানীয়ভাবে অনুমোদিত কীটপতঙ্গ ব্যবস্থাপনা পদ্ধতি অনুসরণ করুন।",
      groundnut:
        "সম্ভব হলে মাটি পরীক্ষা করুন এবং মাটি পরীক্ষা ও স্থানীয় কৃষি পরামর্শ অনুযায়ী পুষ্টি প্রয়োগ করুন।",
    },

    prevention: {
      tomato: [
        "পাতায় অতিরিক্ত জল দেওয়া এড়িয়ে চলুন",
        "গাছের মধ্যে সঠিক দূরত্ব রাখুন",
        "আক্রান্ত গাছের অংশ সরিয়ে ফেলুন",
      ],
      wheat: [
        "স্বাস্থ্যকর বীজ ব্যবহার করুন",
        "জমিতে ভালো জল নিষ্কাশনের ব্যবস্থা রাখুন",
        "ফসল নিয়মিত পর্যবেক্ষণ করুন",
      ],
      paddy: [
        "অতিরিক্ত নাইট্রোজেন ব্যবহার এড়িয়ে চলুন",
        "জমিতে ভালো জল নিষ্কাশনের ব্যবস্থা রাখুন",
        "স্বাস্থ্যকর চারা ব্যবহার করুন",
      ],
      cotton: [
        "ফসল নিয়মিত পর্যবেক্ষণ করুন",
        "গুরুতরভাবে আক্রান্ত বোল সরিয়ে ফেলুন",
        "সুপারিশ করা কীটপতঙ্গ ব্যবস্থাপনা পদ্ধতি অনুসরণ করুন",
      ],
      groundnut: [
        "মাটিতে সুষম পুষ্টি বজায় রাখুন",
        "সুপারিশ করা সার প্রয়োগের মাত্রা ব্যবহার করুন",
        "গাছের বৃদ্ধি নিয়মিত পর্যবেক্ষণ করুন",
      ],
    },
  },
};

function getLanguage(): Language {
  try {
    const values = Object.values(localStorage);

    for (const value of values) {
      if (
        value === "en" ||
        value === "te" ||
        value === "hi" ||
        value === "mr" ||
        value === "ta" ||
        value === "kn" ||
        value === "bn"
      ) {
        return value as Language;
      }

      if (value.includes('"te"')) return "te";
      if (value.includes('"hi"')) return "hi";
      if (value.includes('"mr"')) return "mr";
      if (value.includes('"ta"')) return "ta";
      if (value.includes('"kn"')) return "kn";
      if (value.includes('"bn"')) return "bn";
    }
  } catch {
    return "en";
  }

  return "en";
}

function CropDoctor() {
  const t = useT();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [crop, setCrop] = useState<CropType>("tomato");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<CropType | null>(null);

  const language = getLanguage();
  const localText = translations[language];

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please upload an image smaller than 10 MB.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(url);
    setResult(null);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  };

  const analyzeCrop = () => {
    if (!selectedFile) {
      alert("Please upload a crop photo first.");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setResult(crop);
    }, 1200);
  };

  const resetCropDoctor = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");
    setResult(null);
    setCrop("tomato");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            🌱 Crop Doctor
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t("cropDoctor.uploadTitle")}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            {t("cropDoctor.uploadDescription")}
          </p>
        </div>

        <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
          <div
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50/60 p-6 text-center sm:p-10"
          >
            {!previewUrl ? (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  📷
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {t("cropDoctor.dragPhoto")}
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
                  {t("cropDoctor.supportedCrops")}
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  {t("cropDoctor.selectPhoto")}
                </button>
              </>
            ) : (
              <div className="mx-auto max-w-xl">
                <img
                  src={previewUrl}
                  alt={t("cropDoctor.uploadedPreview")}
                  className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
                />

                <p className="mt-4 text-sm font-medium text-gray-700">
                  {selectedFile?.name}
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 rounded-lg border border-green-600 px-5 py-2 font-medium text-green-700 hover:bg-green-50"
                >
                  {t("cropDoctor.selectPhoto")}
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="mt-7">
            <label
              htmlFor="crop-type"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              {t("cropDoctor.cropType")}
            </label>

            <select
              id="crop-type"
              value={crop}
              onChange={(event) =>
                setCrop(event.target.value as CropType)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800"
            >
              {cropKeys.map((cropKey) => (
                <option key={cropKey} value={cropKey}>
                  {t(`cropDoctor.${cropKey}` as any)}
                </option>
              ))}
            </select>

            <p className="mt-2 text-sm text-gray-500">
              {t("cropDoctor.chooseCrop")}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={analyzeCrop}
              disabled={analyzing}
              className="flex-1 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {analyzing
                ? t("cropDoctor.analyzing")
                : t("cropDoctor.analyzeCrop")}
            </button>

            <button
              type="button"
              onClick={resetCropDoctor}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t("cropDoctor.clearReset")}
            </button>
          </div>
        </section>

        {analyzing && (
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

              <div>
                <h2 className="font-semibold text-blue-900">
                  {t("cropDoctor.analysisProgress")}
                </h2>

                <p className="mt-1 text-sm text-blue-700">
                  {t("cropDoctor.analysisDescription")}
                </p>
              </div>
            </div>
          </section>
        )}

        {!result && !analyzing && (
          <section className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-3 text-2xl">☀️</div>

              <h3 className="font-semibold text-gray-900">
                {t("cropDoctor.scanDaylight")}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {t("cropDoctor.scanDaylightText")}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-3 text-2xl">🍃</div>

              <h3 className="font-semibold text-gray-900">
                {t("cropDoctor.showBothSides")}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {t("cropDoctor.showBothSidesText")}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-3 text-2xl">🌱</div>

              <h3 className="font-semibold text-gray-900">
                {t("cropDoctor.captureWholePlant")}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {t("cropDoctor.captureWholePlantText")}
              </p>
            </div>
          </section>
        )}

        {result && (
          <section className="mt-8">
            <div className="rounded-2xl border border-green-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 bg-green-50 px-5 py-5 sm:px-7">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-sm font-medium text-green-700">
                      {t("cropDoctor.sampleDiagnosis")}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      {t(
                        `cropDoctor.${
                          result === "tomato"
                            ? "earlyBlight"
                            : result === "wheat"
                              ? "yellowRust"
                              : result === "paddy"
                                ? "bacterialLeafBlight"
                                : result === "cotton"
                                  ? "pinkBollworm"
                                  : "nutrientDeficiency"
                        }` as any,
                      )}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      {t("cropDoctor.demoResult")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white px-5 py-4 text-center shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {t("cropDoctor.modelConfidence")}
                    </p>

                    <p className="mt-1 text-2xl font-bold text-green-600">
                      {result === "tomato"
                        ? "92%"
                        : result === "wheat"
                          ? "89%"
                          : result === "paddy"
                            ? "87%"
                            : result === "cotton"
                              ? "90%"
                              : "84%"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">

                <div className="rounded-xl bg-gray-50 p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("cropDoctor.symptoms")}
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {localText.symptoms[result].map(
                      (symptom, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-700"
                        >
                          <span className="mt-1 text-red-500">
                            ●
                          </span>

                          <span>{symptom}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="rounded-xl bg-green-50 p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("cropDoctor.recommendedTreatment")}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-gray-700">
                    {localText.treatment[result]}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-5 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("cropDoctor.preventionTips")}
                  </h3>

                  <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                    {localText.prevention[result].map(
                      (tip, index) => (
                        <li
                          key={index}
                          className="rounded-lg bg-white p-4 text-sm text-gray-700 shadow-sm"
                        >
                          <span className="mr-2 font-bold text-blue-600">
                            {index + 1}.
                          </span>

                          {tip}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="mx-5 mb-5 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:mx-7 sm:mb-7">
                <h3 className="font-semibold text-amber-900">
                  ⚠️ {t("cropDoctor.demoWarning")}
                </h3>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  {t("cropDoctor.demoWarningText")}
                </p>
              </div>

              <div className="border-t border-gray-100 p-5 sm:p-7">
                <button
                  type="button"
                  onClick={resetCropDoctor}
                  className="w-full rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white hover:bg-green-700"
                >
                  {t("cropDoctor.anotherImage")}
                </button>
              </div>
            </div>
          </section>
        )}

        {!result && !analyzing && (
          <section className="mt-8 rounded-2xl border border-purple-100 bg-purple-50 p-5 sm:p-6">
            <div className="flex items-start gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                🧪
              </div>

              <div>
                <h2 className="font-semibold text-purple-900">
                  {t("cropDoctor.demoMode")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-purple-800">
                  {t("cropDoctor.demoModeText")}
                </p>
              </div>

            </div>
          </section>
        )}

      </div>
    </main>
  );
}