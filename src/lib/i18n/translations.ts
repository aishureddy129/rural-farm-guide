export const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export type TranslationKey = keyof typeof en;

const en = {
  "brand.name": "GramSahay AI",
  "brand.tagline": "Smart Rural Assistance",
  "brand.blurb":
    "One trusted platform for farmers and rural communities — AI guidance, government schemes, mandi prices and civic issue resolution, in every local language.",
  "footer.note": "Demo data shown for prototype purposes",

  "common.language": "Language",
  "common.askAi": "Ask AI",
  "common.menu": "Toggle navigation",
  "common.search": "Search",
  "common.send": "Send",
  "common.clear": "Clear",
  "common.reset": "Reset",
  "common.submit": "Submit",
  "common.viewDetails": "View details",
  "common.close": "Close",
  "common.loading": "Please wait…",
  "common.demoNotice":
    "Demo information — verify details through official government sources.",
  "common.addPlot": "Add a plot",

  "nav.home": "Home",
  "nav.assistant": "AI Rural Assistant",
  "nav.cropDoctor": "AI Crop Doctor",
  "nav.schemes": "Government Scheme Finder",
  "nav.weather": "Weather & Farming Advisory",
  "nav.market": "Agricultural Market Prices",
  "nav.report": "Rural Issue Reporting",
  "nav.myFarm": "My Farm",
  "nav.issueMap": "Issue Map",
  "nav.knowledge": "Knowledge Hub",
  "nav.services": "Essential Services",
  "nav.admin": "Admin Dashboard",

  "navShort.home": "Home",
  "navShort.assistant": "Assistant",
  "navShort.cropDoctor": "Crop Doctor",
  "navShort.schemes": "Schemes",
  "navShort.weather": "Weather",
  "navShort.market": "Mandi Prices",
  "navShort.report": "Report Issue",
  "navShort.myFarm": "My Farm",
  "navShort.issueMap": "Issue Map",
  "navShort.knowledge": "Knowledge",
  "navShort.services": "Services",
  "navShort.admin": "Admin",

  "page.assistant.eyebrow": "Always available",
  "page.assistant.description":
    "Ask about farming, paperwork or schemes in your own language and get a simple, clear answer.",
  "page.cropDoctor.eyebrow": "Plant health",
  "page.cropDoctor.description":
    "Take a photo of an affected leaf and get a likely disease, treatment and prevention advice.",
  "page.schemes.eyebrow": "Entitlements",
  "page.schemes.description":
    "Tell us about your land, crop and income, and we will show which schemes fit you and how to apply.",
  "page.weather.eyebrow": "Hyperlocal forecast",
  "page.weather.description":
    "Forecasts for your chosen village — turned into what you should do on the field this week.",
  "page.market.eyebrow": "Mandi intelligence",
  "page.market.description":
    "Compare today's rates in nearby mandis, watch weekly trends and pick the right day to sell.",
  "page.report.eyebrow": "Civic voice",
  "page.report.description":
    "Raise a village problem in under a minute. Every report gets a tracking number and reaches the right department.",
  "page.myFarm.eyebrow": "Farm record",
  "page.myFarm.description":
    "Keep every plot, cost and crop stage in one place so advice and subsidies fit your real land.",
  "page.issueMap.eyebrow": "Transparency",
  "page.issueMap.description":
    "See which problems are open and which are fixed across your district.",
  "page.knowledge.eyebrow": "Learn",
  "page.knowledge.description":
    "Short, practical lessons written for real village conditions — no jargon, no costly inputs.",
  "page.services.eyebrow": "Directory",
  "page.services.description":
    "The numbers and places rural families really need — helplines, health, banking, transport, machinery and livestock support.",
  "page.admin.eyebrow": "Officials",
  "page.admin.description":
    "District-level view of reports, resolution speed and department performance.",
} as const;

type Dict = Record<TranslationKey, string>;

const te: Dict = {
  "brand.name": "గ్రామసహాయ్ AI",
  "brand.tagline": "గ్రామీణ సహాయ వేదిక",
  "brand.blurb":
    "రైతులకు, గ్రామీణ ప్రజలకు ఒకే నమ్మకమైన వేదిక — AI సలహా, ప్రభుత్వ పథకాలు, మార్కెట్ ధరలు, సమస్యల పరిష్కారం — మీ భాషలోనే.",
  "footer.note": "నమూనా (డెమో) సమాచారం మాత్రమే",

  "common.language": "భాష",
  "common.askAi": "AIని అడగండి",
  "common.menu": "మెనూ",
  "common.search": "వెతకండి",
  "common.send": "పంపండి",
  "common.clear": "తొలగించండి",
  "common.reset": "మళ్లీ మొదలు",
  "common.submit": "సమర్పించండి",
  "common.viewDetails": "వివరాలు చూడండి",
  "common.close": "మూసివేయండి",
  "common.loading": "కాసేపు ఆగండి…",
  "common.demoNotice":
    "ఇది నమూనా సమాచారం — అధికారిక ప్రభుత్వ వనరుల్లో ఒకసారి సరిచూసుకోండి.",
  "common.addPlot": "పొలం జోడించండి",

  "nav.home": "హోమ్",
  "nav.assistant": "AI గ్రామీణ సహాయకుడు",
  "nav.cropDoctor": "AI పంట వైద్యుడు",
  "nav.schemes": "ప్రభుత్వ పథకాల అన్వేషణ",
  "nav.weather": "వాతావరణం & వ్యవసాయ సలహా",
  "nav.market": "మార్కెట్ ధరలు",
  "nav.report": "గ్రామ సమస్య నివేదన",
  "nav.myFarm": "నా పొలం",
  "nav.issueMap": "సమస్యల మ్యాప్",
  "nav.knowledge": "విజ్ఞాన కేంద్రం",
  "nav.services": "అవసరమైన సేవలు",
  "nav.admin": "అధికారుల డాష్‌బోర్డ్",

  "navShort.home": "హోమ్",
  "navShort.assistant": "సహాయకుడు",
  "navShort.cropDoctor": "పంట వైద్యుడు",
  "navShort.schemes": "పథకాలు",
  "navShort.weather": "వాతావరణం",
  "navShort.market": "మార్కెట్ ధరలు",
  "navShort.report": "సమస్య తెలపండి",
  "navShort.myFarm": "నా పొలం",
  "navShort.issueMap": "సమస్యల మ్యాప్",
  "navShort.knowledge": "విజ్ఞానం",
  "navShort.services": "సేవలు",
  "navShort.admin": "అడ్మిన్",

  "page.assistant.eyebrow": "ఎప్పుడైనా అందుబాటులో",
  "page.assistant.description":
    "వ్యవసాయం, కాగితపు పనులు, పథకాల గురించి మీ భాషలోనే అడగండి — సులభమైన సమాధానం వస్తుంది.",
  "page.cropDoctor.eyebrow": "పంట ఆరోగ్యం",
  "page.cropDoctor.description":
    "పాడైన ఆకు ఫోటో తీసి పెట్టండి — తెగులు ఏమిటో, మందు ఏమి వాడాలో, ముందు జాగ్రత్తలు తెలుస్తాయి.",
  "page.schemes.eyebrow": "మీ హక్కులు",
  "page.schemes.description":
    "మీ భూమి, పంట, ఆదాయ వివరాలు చెబితే మీకు సరిపోయే పథకాలు, దరఖాస్తు విధానం చూపిస్తాం.",
  "page.weather.eyebrow": "మీ ఊరి వాతావరణం",
  "page.weather.description":
    "మీ గ్రామానికి వాతావరణ సూచన — ఈ వారం పొలంలో ఏం చేయాలో కూడా చెబుతుంది.",
  "page.market.eyebrow": "మార్కెట్ సమాచారం",
  "page.market.description":
    "దగ్గరి మార్కెట్లలో ఈరోజు ధరలు చూడండి, వారం ధరల తీరు గమనించి అమ్మే రోజు నిర్ణయించండి.",
  "page.report.eyebrow": "గ్రామ గొంతుక",
  "page.report.description":
    "ఒక నిమిషంలో సమస్య నమోదు చేయండి. ప్రతి నివేదనకు ట్రాకింగ్ నంబర్ వస్తుంది, సంబంధిత శాఖకు చేరుతుంది.",
  "page.myFarm.eyebrow": "పొలం రికార్డు",
  "page.myFarm.description":
    "మీ పొలాలు, ఖర్చులు, పంట దశలు ఒకే చోట ఉంచండి — సలహాలు, రాయితీలు మీ భూమికి తగినట్టు వస్తాయి.",
  "page.issueMap.eyebrow": "పారదర్శకత",
  "page.issueMap.description":
    "జిల్లాలో ఏ సమస్యలు పరిష్కారం అయ్యాయో, ఏవి మిగిలాయో చూడండి.",
  "page.knowledge.eyebrow": "నేర్చుకోండి",
  "page.knowledge.description":
    "గ్రామ పరిస్థితులకు తగిన చిన్న, ఉపయోగకరమైన పాఠాలు — కష్టమైన పదాలు, ఖరీదైన పెట్టుబడి అవసరం లేదు.",
  "page.services.eyebrow": "డైరెక్టరీ",
  "page.services.description":
    "గ్రామీణ కుటుంబాలకు నిజంగా అవసరమైన నంబర్లు, కేంద్రాలు — ఆరోగ్యం, బ్యాంకు, రవాణా, యంత్రాలు, పశు సేవలు.",
  "page.admin.eyebrow": "అధికారులు",
  "page.admin.description":
    "జిల్లా స్థాయిలో నివేదనలు, పరిష్కార వేగం, శాఖల పనితీరు.",
};

const hi: Dict = {
  "brand.name": "ग्रामसहाय AI",
  "brand.tagline": "ग्रामीण सहायता मंच",
  "brand.blurb":
    "किसानों और गाँव के लोगों के लिए एक भरोसेमंद मंच — AI सलाह, सरकारी योजनाएँ, मंडी भाव और शिकायत समाधान, आपकी अपनी भाषा में।",
  "footer.note": "नमूना (डेमो) जानकारी",

  "common.language": "भाषा",
  "common.askAi": "AI से पूछें",
  "common.menu": "मेन्यू",
  "common.search": "खोजें",
  "common.send": "भेजें",
  "common.clear": "साफ़ करें",
  "common.reset": "फिर से शुरू",
  "common.submit": "जमा करें",
  "common.viewDetails": "पूरी जानकारी",
  "common.close": "बंद करें",
  "common.loading": "थोड़ा रुकिए…",
  "common.demoNotice":
    "यह नमूना जानकारी है — सरकारी स्रोत से एक बार जाँच अवश्य कर लें।",
  "common.addPlot": "खेत जोड़ें",

  "nav.home": "होम",
  "nav.assistant": "AI ग्रामीण सहायक",
  "nav.cropDoctor": "AI फसल डॉक्टर",
  "nav.schemes": "सरकारी योजना खोज",
  "nav.weather": "मौसम और खेती सलाह",
  "nav.market": "मंडी भाव",
  "nav.report": "गाँव की समस्या दर्ज करें",
  "nav.myFarm": "मेरा खेत",
  "nav.issueMap": "समस्या मानचित्र",
  "nav.knowledge": "जानकारी केंद्र",
  "nav.services": "ज़रूरी सेवाएँ",
  "nav.admin": "अधिकारी डैशबोर्ड",

  "navShort.home": "होम",
  "navShort.assistant": "सहायक",
  "navShort.cropDoctor": "फसल डॉक्टर",
  "navShort.schemes": "योजनाएँ",
  "navShort.weather": "मौसम",
  "navShort.market": "मंडी भाव",
  "navShort.report": "शिकायत",
  "navShort.myFarm": "मेरा खेत",
  "navShort.issueMap": "मानचित्र",
  "navShort.knowledge": "जानकारी",
  "navShort.services": "सेवाएँ",
  "navShort.admin": "एडमिन",

  "page.assistant.eyebrow": "हर समय उपलब्ध",
  "page.assistant.description":
    "खेती, कागज़ी काम या योजनाओं के बारे में अपनी भाषा में पूछिए — सीधा और आसान जवाब मिलेगा।",
  "page.cropDoctor.eyebrow": "फसल स्वास्थ्य",
  "page.cropDoctor.description":
    "खराब पत्ते की फोटो डालिए — संभावित रोग, उपचार और बचाव की सलाह मिलेगी।",
  "page.schemes.eyebrow": "आपके हक़",
  "page.schemes.description":
    "अपनी ज़मीन, फसल और आमदनी बताइए — आपके लिए उपयुक्त योजनाएँ और आवेदन का तरीका दिखेगा।",
  "page.weather.eyebrow": "आपके गाँव का मौसम",
  "page.weather.description":
    "आपके गाँव का पूर्वानुमान — साथ में इस हफ़्ते खेत में क्या करना है, यह भी।",
  "page.market.eyebrow": "मंडी जानकारी",
  "page.market.description":
    "आस-पास की मंडियों के आज के भाव देखिए, हफ़्ते का रुझान समझिए और बेचने का सही दिन चुनिए।",
  "page.report.eyebrow": "गाँव की आवाज़",
  "page.report.description":
    "एक मिनट में समस्या दर्ज कीजिए। हर शिकायत को ट्रैकिंग नंबर मिलता है और वह सही विभाग तक पहुँचती है।",
  "page.myFarm.eyebrow": "खेत का रिकॉर्ड",
  "page.myFarm.description":
    "हर खेत, खर्च और फसल की अवस्था एक जगह रखिए, ताकि सलाह और सब्सिडी आपकी असली ज़मीन के हिसाब से मिले।",
  "page.issueMap.eyebrow": "पारदर्शिता",
  "page.issueMap.description":
    "ज़िले में कौन-सी समस्याएँ हल हुईं और कौन-सी बाकी हैं, देखिए।",
  "page.knowledge.eyebrow": "सीखिए",
  "page.knowledge.description":
    "गाँव की असली परिस्थितियों के लिए छोटे, काम के पाठ — न कठिन शब्द, न महँगा खर्च।",
  "page.services.eyebrow": "डायरेक्टरी",
  "page.services.description":
    "गाँव के परिवारों के लिए ज़रूरी नंबर और जगहें — स्वास्थ्य, बैंक, परिवहन, मशीन और पशु सेवा।",
  "page.admin.eyebrow": "अधिकारी",
  "page.admin.description":
    "ज़िला स्तर पर शिकायतें, समाधान की गति और विभागों का प्रदर्शन।",
};

const mr: Dict = {
  "brand.name": "ग्रामसहाय AI",
  "brand.tagline": "ग्रामीण मदत व्यासपीठ",
  "brand.blurb":
    "शेतकरी आणि गावकऱ्यांसाठी एकच विश्वासाचे व्यासपीठ — AI सल्ला, शासकीय योजना, बाजारभाव आणि तक्रार निवारण, तुमच्याच भाषेत.",
  "footer.note": "नमुना (डेमो) माहिती",

  "common.language": "भाषा",
  "common.askAi": "AI ला विचारा",
  "common.menu": "मेनू",
  "common.search": "शोधा",
  "common.send": "पाठवा",
  "common.clear": "पुसा",
  "common.reset": "पुन्हा सुरू",
  "common.submit": "सादर करा",
  "common.viewDetails": "सविस्तर पाहा",
  "common.close": "बंद करा",
  "common.loading": "थोडं थांबा…",
  "common.demoNotice":
    "ही नमुना माहिती आहे — अधिकृत शासकीय स्रोतांवर एकदा तपासून घ्या.",
  "common.addPlot": "शेत जोडा",

  "nav.home": "मुख्यपृष्ठ",
  "nav.assistant": "AI ग्रामीण सहाय्यक",
  "nav.cropDoctor": "AI पीक डॉक्टर",
  "nav.schemes": "शासकीय योजना शोध",
  "nav.weather": "हवामान व शेती सल्ला",
  "nav.market": "बाजारभाव",
  "nav.report": "गावातील तक्रार नोंदवा",
  "nav.myFarm": "माझं शेत",
  "nav.issueMap": "तक्रार नकाशा",
  "nav.knowledge": "माहिती केंद्र",
  "nav.services": "आवश्यक सेवा",
  "nav.admin": "अधिकारी डॅशबोर्ड",

  "navShort.home": "मुख्यपृष्ठ",
  "navShort.assistant": "सहाय्यक",
  "navShort.cropDoctor": "पीक डॉक्टर",
  "navShort.schemes": "योजना",
  "navShort.weather": "हवामान",
  "navShort.market": "बाजारभाव",
  "navShort.report": "तक्रार",
  "navShort.myFarm": "माझं शेत",
  "navShort.issueMap": "नकाशा",
  "navShort.knowledge": "माहिती",
  "navShort.services": "सेवा",
  "navShort.admin": "अ‍ॅडमिन",

  "page.assistant.eyebrow": "कधीही उपलब्ध",
  "page.assistant.description":
    "शेती, कागदपत्रं किंवा योजनांबद्दल तुमच्या भाषेत विचारा — सोपं आणि स्पष्ट उत्तर मिळेल.",
  "page.cropDoctor.eyebrow": "पिकाचं आरोग्य",
  "page.cropDoctor.description":
    "खराब पानाचा फोटो टाका — संभाव्य रोग, उपाय आणि प्रतिबंधाचा सल्ला मिळेल.",
  "page.schemes.eyebrow": "तुमचे हक्क",
  "page.schemes.description":
    "जमीन, पीक आणि उत्पन्न सांगा — तुम्हाला लागू होणाऱ्या योजना आणि अर्जाची पद्धत दिसेल.",
  "page.weather.eyebrow": "गावचं हवामान",
  "page.weather.description":
    "तुमच्या गावाचा अंदाज — आणि या आठवड्यात शेतात काय करायचं तेही.",
  "page.market.eyebrow": "बाजार माहिती",
  "page.market.description":
    "जवळच्या बाजार समित्यांतील आजचे भाव पाहा, आठवड्याचा कल समजून विकायचा दिवस ठरवा.",
  "page.report.eyebrow": "गावाचा आवाज",
  "page.report.description":
    "एका मिनिटात तक्रार नोंदवा. प्रत्येक तक्रारीला ट्रॅकिंग क्रमांक मिळतो आणि ती योग्य विभागाकडे जाते.",
  "page.myFarm.eyebrow": "शेतीची नोंद",
  "page.myFarm.description":
    "प्रत्येक शेत, खर्च आणि पिकाची अवस्था एकाच ठिकाणी ठेवा, म्हणजे सल्ला व अनुदान तुमच्या जमिनीनुसार मिळेल.",
  "page.issueMap.eyebrow": "पारदर्शकता",
  "page.issueMap.description":
    "जिल्ह्यात कोणत्या अडचणी सुटल्या आणि कोणत्या बाकी आहेत ते पाहा.",
  "page.knowledge.eyebrow": "शिका",
  "page.knowledge.description":
    "गावातील खऱ्या परिस्थितीसाठी छोटे, उपयोगी धडे — अवघड शब्द नाहीत, महागडा खर्च नाही.",
  "page.services.eyebrow": "निर्देशिका",
  "page.services.description":
    "ग्रामीण कुटुंबांना खरंच लागणारे क्रमांक आणि ठिकाणं — आरोग्य, बँक, वाहतूक, यंत्रं आणि पशुसेवा.",
  "page.admin.eyebrow": "अधिकारी",
  "page.admin.description":
    "जिल्हा पातळीवर तक्रारी, निवारणाचा वेग आणि विभागांची कामगिरी.",
};

const ta: Dict = {
  "brand.name": "கிராமசகாய் AI",
  "brand.tagline": "கிராம உதவி தளம்",
  "brand.blurb":
    "விவசாயிகளுக்கும் கிராம மக்களுக்கும் ஒரே நம்பகமான தளம் — AI ஆலோசனை, அரசு திட்டங்கள், சந்தை விலைகள், புகார் தீர்வு — உங்கள் மொழியிலேயே.",
  "footer.note": "மாதிரி (டெமோ) தகவல்",

  "common.language": "மொழி",
  "common.askAi": "AI-யிடம் கேளுங்கள்",
  "common.menu": "மெனு",
  "common.search": "தேடு",
  "common.send": "அனுப்பு",
  "common.clear": "அழி",
  "common.reset": "மீண்டும் தொடங்கு",
  "common.submit": "சமர்ப்பி",
  "common.viewDetails": "விவரங்கள் பார்க்க",
  "common.close": "மூடு",
  "common.loading": "சற்று காத்திருங்கள்…",
  "common.demoNotice":
    "இது மாதிரி தகவல் — அரசு அதிகாரப்பூர்வ ஆதாரங்களில் ஒருமுறை சரிபார்க்கவும்.",
  "common.addPlot": "நிலத்தைச் சேர்க்க",

  "nav.home": "முகப்பு",
  "nav.assistant": "AI கிராம உதவியாளர்",
  "nav.cropDoctor": "AI பயிர் மருத்துவர்",
  "nav.schemes": "அரசு திட்ட தேடல்",
  "nav.weather": "வானிலை & விவசாய ஆலோசனை",
  "nav.market": "சந்தை விலைகள்",
  "nav.report": "கிராமப் புகார் பதிவு",
  "nav.myFarm": "என் நிலம்",
  "nav.issueMap": "புகார் வரைபடம்",
  "nav.knowledge": "அறிவு மையம்",
  "nav.services": "அத்தியாவசிய சேவைகள்",
  "nav.admin": "அதிகாரி டாஷ்போர்டு",

  "navShort.home": "முகப்பு",
  "navShort.assistant": "உதவியாளர்",
  "navShort.cropDoctor": "பயிர் மருத்துவர்",
  "navShort.schemes": "திட்டங்கள்",
  "navShort.weather": "வானிலை",
  "navShort.market": "சந்தை விலை",
  "navShort.report": "புகார்",
  "navShort.myFarm": "என் நிலம்",
  "navShort.issueMap": "வரைபடம்",
  "navShort.knowledge": "அறிவு",
  "navShort.services": "சேவைகள்",
  "navShort.admin": "நிர்வாகம்",

  "page.assistant.eyebrow": "எப்போதும் கிடைக்கும்",
  "page.assistant.description":
    "விவசாயம், ஆவணங்கள், திட்டங்கள் குறித்து உங்கள் மொழியில் கேளுங்கள் — எளிய பதில் கிடைக்கும்.",
  "page.cropDoctor.eyebrow": "பயிர் நலம்",
  "page.cropDoctor.description":
    "பாதிக்கப்பட்ட இலையின் புகைப்படத்தைப் பதிவேற்றுங்கள் — நோய், மருந்து, தடுப்பு ஆலோசனை கிடைக்கும்.",
  "page.schemes.eyebrow": "உங்கள் உரிமைகள்",
  "page.schemes.description":
    "உங்கள் நிலம், பயிர், வருமானம் சொல்லுங்கள் — பொருந்தும் திட்டங்களும் விண்ணப்பிக்கும் முறையும் காட்டுகிறோம்.",
  "page.weather.eyebrow": "உங்கள் ஊர் வானிலை",
  "page.weather.description":
    "உங்கள் கிராமத்திற்கான முன்னறிவிப்பு — இந்த வாரம் வயலில் என்ன செய்ய வேண்டும் என்பதுடன்.",
  "page.market.eyebrow": "சந்தைத் தகவல்",
  "page.market.description":
    "அருகிலுள்ள சந்தைகளின் இன்றைய விலைகளைப் பாருங்கள், வார போக்கை அறிந்து விற்கும் நாளைத் தேர்வு செய்யுங்கள்.",
  "page.report.eyebrow": "கிராமத்தின் குரல்",
  "page.report.description":
    "ஒரு நிமிடத்தில் புகார் பதிவு செய்யுங்கள். ஒவ்வொரு புகாருக்கும் கண்காணிப்பு எண் கிடைக்கும், சரியான துறைக்குச் செல்லும்.",
  "page.myFarm.eyebrow": "நில பதிவு",
  "page.myFarm.description":
    "ஒவ்வொரு நிலம், செலவு, பயிர் நிலை ஒரே இடத்தில் — ஆலோசனையும் மானியமும் உங்கள் நிலத்திற்கேற்ப கிடைக்கும்.",
  "page.issueMap.eyebrow": "வெளிப்படைத்தன்மை",
  "page.issueMap.description":
    "மாவட்டத்தில் எந்தப் பிரச்சினைகள் தீர்ந்தன, எவை நிலுவையில் உள்ளன என்பதைப் பாருங்கள்.",
  "page.knowledge.eyebrow": "கற்றுக்கொள்ளுங்கள்",
  "page.knowledge.description":
    "கிராம நிலைமைகளுக்கு ஏற்ற சிறிய, பயனுள்ள பாடங்கள் — கடின சொற்கள் இல்லை, அதிக செலவும் இல்லை.",
  "page.services.eyebrow": "விவரப்பட்டியல்",
  "page.services.description":
    "கிராம குடும்பங்களுக்குத் தேவையான எண்களும் இடங்களும் — சுகாதாரம், வங்கி, போக்குவரத்து, இயந்திரம், கால்நடை சேவை.",
  "page.admin.eyebrow": "அதிகாரிகள்",
  "page.admin.description":
    "மாவட்ட அளவில் புகார்கள், தீர்வு வேகம், துறைகளின் செயல்பாடு.",
};

const kn: Dict = {
  "brand.name": "ಗ್ರಾಮಸಹಾಯ್ AI",
  "brand.tagline": "ಗ್ರಾಮೀಣ ನೆರವು ವೇದಿಕೆ",
  "brand.blurb":
    "ರೈತರಿಗೆ ಮತ್ತು ಹಳ್ಳಿಯ ಜನರಿಗೆ ಒಂದೇ ನಂಬಿಕೆಯ ವೇದಿಕೆ — AI ಸಲಹೆ, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಮಾರುಕಟ್ಟೆ ದರ, ದೂರು ಪರಿಹಾರ — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.",
  "footer.note": "ಮಾದರಿ (ಡೆಮೋ) ಮಾಹಿತಿ",

  "common.language": "ಭಾಷೆ",
  "common.askAi": "AI ಗೆ ಕೇಳಿ",
  "common.menu": "ಮೆನು",
  "common.search": "ಹುಡುಕಿ",
  "common.send": "ಕಳುಹಿಸಿ",
  "common.clear": "ಅಳಿಸಿ",
  "common.reset": "ಮತ್ತೆ ಆರಂಭಿಸಿ",
  "common.submit": "ಸಲ್ಲಿಸಿ",
  "common.viewDetails": "ವಿವರ ನೋಡಿ",
  "common.close": "ಮುಚ್ಚಿ",
  "common.loading": "ಸ್ವಲ್ಪ ಕಾಯಿರಿ…",
  "common.demoNotice":
    "ಇದು ಮಾದರಿ ಮಾಹಿತಿ — ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಮೂಲಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
  "common.addPlot": "ಜಮೀನು ಸೇರಿಸಿ",

  "nav.home": "ಮುಖಪುಟ",
  "nav.assistant": "AI ಗ್ರಾಮೀಣ ಸಹಾಯಕ",
  "nav.cropDoctor": "AI ಬೆಳೆ ವೈದ್ಯ",
  "nav.schemes": "ಸರ್ಕಾರಿ ಯೋಜನೆ ಹುಡುಕಾಟ",
  "nav.weather": "ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಸಲಹೆ",
  "nav.market": "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
  "nav.report": "ಗ್ರಾಮ ಸಮಸ್ಯೆ ದಾಖಲಿಸಿ",
  "nav.myFarm": "ನನ್ನ ಜಮೀನು",
  "nav.issueMap": "ಸಮಸ್ಯೆ ನಕ್ಷೆ",
  "nav.knowledge": "ಜ್ಞಾನ ಕೇಂದ್ರ",
  "nav.services": "ಅಗತ್ಯ ಸೇವೆಗಳು",
  "nav.admin": "ಅಧಿಕಾರಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

  "navShort.home": "ಮುಖಪುಟ",
  "navShort.assistant": "ಸಹಾಯಕ",
  "navShort.cropDoctor": "ಬೆಳೆ ವೈದ್ಯ",
  "navShort.schemes": "ಯೋಜನೆಗಳು",
  "navShort.weather": "ಹವಾಮಾನ",
  "navShort.market": "ಮಾರುಕಟ್ಟೆ ದರ",
  "navShort.report": "ದೂರು",
  "navShort.myFarm": "ನನ್ನ ಜಮೀನು",
  "navShort.issueMap": "ನಕ್ಷೆ",
  "navShort.knowledge": "ಜ್ಞಾನ",
  "navShort.services": "ಸೇವೆಗಳು",
  "navShort.admin": "ಆಡಳಿತ",

  "page.assistant.eyebrow": "ಯಾವಾಗಲೂ ಲಭ್ಯ",
  "page.assistant.description":
    "ಕೃಷಿ, ದಾಖಲೆ ಅಥವಾ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ — ಸರಳ ಉತ್ತರ ಸಿಗುತ್ತದೆ.",
  "page.cropDoctor.eyebrow": "ಬೆಳೆ ಆರೋಗ್ಯ",
  "page.cropDoctor.description":
    "ಹಾಳಾದ ಎಲೆಯ ಫೋಟೋ ಹಾಕಿ — ಸಂಭವನೀಯ ರೋಗ, ಔಷಧಿ ಮತ್ತು ತಡೆ ಕ್ರಮ ತಿಳಿಯುತ್ತದೆ.",
  "page.schemes.eyebrow": "ನಿಮ್ಮ ಹಕ್ಕುಗಳು",
  "page.schemes.description":
    "ನಿಮ್ಮ ಜಮೀನು, ಬೆಳೆ, ಆದಾಯ ತಿಳಿಸಿ — ಸೂಕ್ತ ಯೋಜನೆಗಳು ಮತ್ತು ಅರ್ಜಿ ವಿಧಾನ ತೋರಿಸುತ್ತೇವೆ.",
  "page.weather.eyebrow": "ನಿಮ್ಮ ಊರಿನ ಹವಾಮಾನ",
  "page.weather.description":
    "ನಿಮ್ಮ ಗ್ರಾಮದ ಮುನ್ಸೂಚನೆ — ಈ ವಾರ ಹೊಲದಲ್ಲಿ ಏನು ಮಾಡಬೇಕೆಂಬ ಸಲಹೆಯೊಂದಿಗೆ.",
  "page.market.eyebrow": "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
  "page.market.description":
    "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳ ಇಂದಿನ ದರ ನೋಡಿ, ವಾರದ ಪ್ರವೃತ್ತಿ ಗಮನಿಸಿ ಮಾರುವ ದಿನ ಆಯ್ಕೆ ಮಾಡಿ.",
  "page.report.eyebrow": "ಗ್ರಾಮದ ಧ್ವನಿ",
  "page.report.description":
    "ಒಂದು ನಿಮಿಷದಲ್ಲಿ ಸಮಸ್ಯೆ ದಾಖಲಿಸಿ. ಪ್ರತಿ ದೂರಿಗೂ ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ ಸಿಗುತ್ತದೆ ಮತ್ತು ಸರಿಯಾದ ಇಲಾಖೆಗೆ ತಲುಪುತ್ತದೆ.",
  "page.myFarm.eyebrow": "ಜಮೀನು ದಾಖಲೆ",
  "page.myFarm.description":
    "ಪ್ರತಿ ಜಮೀನು, ಖರ್ಚು, ಬೆಳೆ ಹಂತ ಒಂದೇ ಕಡೆ ಇರಿಸಿ — ಸಲಹೆ ಮತ್ತು ಸಬ್ಸಿಡಿ ನಿಮ್ಮ ಜಮೀನಿಗೆ ತಕ್ಕಂತೆ ಸಿಗುತ್ತದೆ.",
  "page.issueMap.eyebrow": "ಪಾರದರ್ಶಕತೆ",
  "page.issueMap.description":
    "ಜಿಲ್ಲೆಯಲ್ಲಿ ಯಾವ ಸಮಸ್ಯೆಗಳು ಪರಿಹಾರವಾಗಿವೆ, ಯಾವವು ಬಾಕಿ ಇವೆ ಎಂದು ನೋಡಿ.",
  "page.knowledge.eyebrow": "ಕಲಿಯಿರಿ",
  "page.knowledge.description":
    "ಹಳ್ಳಿಯ ನಿಜ ಪರಿಸ್ಥಿತಿಗೆ ಸರಿಹೊಂದುವ ಚಿಕ್ಕ, ಉಪಯುಕ್ತ ಪಾಠಗಳು — ಕಠಿಣ ಪದಗಳಿಲ್ಲ, ದುಬಾರಿ ಖರ್ಚಿಲ್ಲ.",
  "page.services.eyebrow": "ಮಾಹಿತಿ ಪಟ್ಟಿ",
  "page.services.description":
    "ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳಿಗೆ ನಿಜವಾಗಿ ಬೇಕಾದ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಸ್ಥಳಗಳು — ಆರೋಗ್ಯ, ಬ್ಯಾಂಕ್, ಸಾರಿಗೆ, ಯಂತ್ರ, ಪಶು ಸೇವೆ.",
  "page.admin.eyebrow": "ಅಧಿಕಾರಿಗಳು",
  "page.admin.description":
    "ಜಿಲ್ಲಾ ಮಟ್ಟದ ದೂರುಗಳು, ಪರಿಹಾರದ ವೇಗ ಮತ್ತು ಇಲಾಖೆಗಳ ಕಾರ್ಯಕ್ಷಮತೆ.",
};

const bn: Dict = {
  "brand.name": "গ্রামসহায় AI",
  "brand.tagline": "গ্রামীণ সহায়তা মঞ্চ",
  "brand.blurb":
    "কৃষক ও গ্রামের মানুষের জন্য একটি নির্ভরযোগ্য মঞ্চ — AI পরামর্শ, সরকারি প্রকল্প, বাজারদর ও সমস্যার সমাধান, আপনার নিজের ভাষায়।",
  "footer.note": "নমুনা (ডেমো) তথ্য",

  "common.language": "ভাষা",
  "common.askAi": "AI-কে জিজ্ঞাসা করুন",
  "common.menu": "মেনু",
  "common.search": "খুঁজুন",
  "common.send": "পাঠান",
  "common.clear": "মুছুন",
  "common.reset": "আবার শুরু",
  "common.submit": "জমা দিন",
  "common.viewDetails": "বিস্তারিত দেখুন",
  "common.close": "বন্ধ করুন",
  "common.loading": "একটু অপেক্ষা করুন…",
  "common.demoNotice":
    "এটি নমুনা তথ্য — সরকারি দপ্তরের তথ্য থেকে একবার মিলিয়ে নিন।",
  "common.addPlot": "জমি যোগ করুন",

  "nav.home": "হোম",
  "nav.assistant": "AI গ্রামীণ সহায়ক",
  "nav.cropDoctor": "AI ফসল ডাক্তার",
  "nav.schemes": "সরকারি প্রকল্প খোঁজ",
  "nav.weather": "আবহাওয়া ও চাষের পরামর্শ",
  "nav.market": "বাজারদর",
  "nav.report": "গ্রামের সমস্যা জানান",
  "nav.myFarm": "আমার জমি",
  "nav.issueMap": "সমস্যার মানচিত্র",
  "nav.knowledge": "জ্ঞান কেন্দ্র",
  "nav.services": "জরুরি পরিষেবা",
  "nav.admin": "প্রশাসন ড্যাশবোর্ড",

  "navShort.home": "হোম",
  "navShort.assistant": "সহায়ক",
  "navShort.cropDoctor": "ফসল ডাক্তার",
  "navShort.schemes": "প্রকল্প",
  "navShort.weather": "আবহাওয়া",
  "navShort.market": "বাজারদর",
  "navShort.report": "অভিযোগ",
  "navShort.myFarm": "আমার জমি",
  "navShort.issueMap": "মানচিত্র",
  "navShort.knowledge": "জ্ঞান",
  "navShort.services": "পরিষেবা",
  "navShort.admin": "অ্যাডমিন",

  "page.assistant.eyebrow": "সবসময় পাশে",
  "page.assistant.description":
    "চাষ, কাগজপত্র বা প্রকল্প নিয়ে নিজের ভাষায় জিজ্ঞাসা করুন — সহজ উত্তর পাবেন।",
  "page.cropDoctor.eyebrow": "ফসলের স্বাস্থ্য",
  "page.cropDoctor.description":
    "আক্রান্ত পাতার ছবি দিন — সম্ভাব্য রোগ, ওষুধ ও প্রতিরোধের পরামর্শ পাবেন।",
  "page.schemes.eyebrow": "আপনার অধিকার",
  "page.schemes.description":
    "জমি, ফসল ও আয়ের কথা জানান — উপযুক্ত প্রকল্প ও আবেদনের পদ্ধতি দেখাব।",
  "page.weather.eyebrow": "আপনার গ্রামের আবহাওয়া",
  "page.weather.description":
    "আপনার গ্রামের পূর্বাভাস — সঙ্গে এই সপ্তাহে জমিতে কী করবেন তার পরামর্শ।",
  "page.market.eyebrow": "বাজারের খবর",
  "page.market.description":
    "কাছের বাজারগুলোর আজকের দর দেখুন, সপ্তাহের গতি বুঝে বিক্রির সঠিক দিন বেছে নিন।",
  "page.report.eyebrow": "গ্রামের কণ্ঠ",
  "page.report.description":
    "এক মিনিটে সমস্যা জানান। প্রতিটি অভিযোগে ট্র্যাকিং নম্বর থাকে এবং তা সঠিক দপ্তরে পৌঁছায়।",
  "page.myFarm.eyebrow": "জমির হিসাব",
  "page.myFarm.description":
    "প্রতিটি জমি, খরচ ও ফসলের অবস্থা এক জায়গায় রাখুন — পরামর্শ ও ভর্তুকি আপনার জমি অনুযায়ী মিলবে।",
  "page.issueMap.eyebrow": "স্বচ্ছতা",
  "page.issueMap.description":
    "জেলায় কোন সমস্যাগুলো মিটেছে আর কোনগুলো বাকি, দেখে নিন।",
  "page.knowledge.eyebrow": "শিখুন",
  "page.knowledge.description":
    "গ্রামের বাস্তব অবস্থার জন্য ছোট, কাজের পাঠ — কঠিন শব্দ নেই, বেশি খরচও নেই।",
  "page.services.eyebrow": "তালিকা",
  "page.services.description":
    "গ্রামের পরিবারের সত্যিকারের দরকারি নম্বর ও জায়গা — স্বাস্থ্য, ব্যাঙ্ক, যাতায়াত, যন্ত্র ও পশুসেবা।",
  "page.admin.eyebrow": "আধিকারিক",
  "page.admin.description":
    "জেলা স্তরে অভিযোগ, সমাধানের গতি ও দপ্তরের কাজের হিসাব।",
};

export const dictionaries: Record<LanguageCode, Dict> = {
  en: en as unknown as Dict,
  te,
  hi,
  mr,
  ta,
  kn,
  bn,
};
