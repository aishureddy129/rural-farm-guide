import type { LanguageCode } from "../languages";

export const schemes = {
  en: {
    "schemes.title": "Government Scheme Finder",
    "schemes.description":
      "Tell us about your land, crop and income, and we will show which schemes fit you and how to apply.",

    "schemes.farmerProfile": "Farmer Profile",
    "schemes.profileDescription":
      "Fill in the details below to find schemes that may be suitable for you.",

    "schemes.state": "State",
    "schemes.selectState": "Select State",
    "schemes.andhra": "Andhra Pradesh",
    "schemes.telangana": "Telangana",
    "schemes.tamilnadu": "Tamil Nadu",
    "schemes.karnataka": "Karnataka",
    "schemes.maharashtra": "Maharashtra",
    "schemes.westbengal": "West Bengal",
    "schemes.other": "Other",

    "schemes.age": "Age",
    "schemes.agePlaceholder": "e.g. 45",

    "schemes.category": "Farmer Category",
    "schemes.selectCategory": "Select Category",
    "schemes.small": "Small Farmer",
    "schemes.marginal": "Marginal Farmer",
    "schemes.medium": "Medium Farmer",
    "schemes.large": "Large Farmer",
    "schemes.government": "Government / Institutional",

    "schemes.land": "Land Holding (acres)",
    "schemes.landPlaceholder": "e.g. 2.5",

    "schemes.crop": "Crop Type",
    "schemes.selectCrop": "Select Crop",
    "schemes.paddy": "Paddy",
    "schemes.wheat": "Wheat",
    "schemes.cotton": "Cotton",
    "schemes.maize": "Maize",
    "schemes.vegetables": "Vegetables",
    "schemes.pulses": "Pulses",
    "schemes.noneCrop": "No Crop",

    "schemes.irrigation": "Irrigation Type",
    "schemes.selectIrrigation": "Select Irrigation",
    "schemes.borewell": "Borewell",
    "schemes.canal": "Canal",
    "schemes.drip": "Drip Irrigation",
    "schemes.rainfed": "Rainfed",
    "schemes.noneIrrigation": "No Irrigation",

    "schemes.income": "Annual Income Range",
    "schemes.selectIncome": "Select Income Range",
    "schemes.below1": "Below ₹1 lakh",
    "schemes.1to3": "₹1 lakh – ₹3 lakh",
    "schemes.3to5": "₹3 lakh – ₹5 lakh",
    "schemes.above5": "Above ₹5 lakh",

    "schemes.find": "Find Eligible Schemes",
    "schemes.reset": "Reset Profile",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "Pradhan Mantri Fasal Bima Yojana",
    "schemes.pmksy": "Pradhan Mantri Krishi Sinchayee Yojana",
    "schemes.soilHealth": "Soil Health Card",
    "schemes.kcc": "Kisan Credit Card",

    "schemes.pmkisanBenefit":
      "Eligible farmers can receive financial assistance under PM-KISAN as per the current government guidelines.",
    "schemes.pmfbyBenefit":
      "Provides crop insurance protection against eligible crop losses caused by specified natural risks.",
    "schemes.pmksyBenefit":
      "Supports improved irrigation and efficient water use for agriculture.",
    "schemes.soilHealthBenefit":
      "Provides soil testing and recommendations to help farmers manage soil nutrients.",
    "schemes.kccBenefit":
      "Provides farmers access to agricultural credit for farming and related activities.",

    "schemes.eligibility": "Eligibility",
    "schemes.eligible": "Eligible",
    "schemes.likelyEligible": "Likely Eligible",
    "schemes.notEligible": "Not Eligible",

    "schemes.viewDetails": "View Details",
    "schemes.hideDetails": "Hide Details",

    "schemes.eligibilityMatch": "Eligibility Results",
    "schemes.estimatedBenefit": "Estimated Benefit",
    "schemes.applicationGuidance": "Application Guidance",
    "schemes.application": "Application Guidance",

    "schemes.demoTitle": "Demo Information",
    "schemes.demoText":
      "The eligibility and benefit information shown here is for demonstration only. Please verify the latest details on the official government scheme portal or local agriculture office before applying.",

    "schemes.applyOfficial": "Apply on Official Portal →",

    "schemes.errorRequired":
      "Please fill all farmer profile fields to find matching schemes.",

    "schemes.noMatches": "No Matches Yet",
    "schemes.noMatchesDescription":
      "Complete the farmer profile and click Find Eligible Schemes to see suitable schemes.",

    "schemes.tryAnother": "Try Another Profile",

    "schemes.searchPlaceholder":
      "Search schemes, benefits or departments",

    "schemes.all": "All",
    "schemes.agriculture": "Agriculture",
    "schemes.insurance": "Insurance",
    "schemes.credit": "Credit",
    "schemes.subsidy": "Subsidy",
    "schemes.welfare": "Welfare",
    "schemes.women": "Women",
    "schemes.youth": "Youth",

    "schemes.showing": "Showing",
    "schemes.demoMatches": "demo scheme matches",
    "schemes.demoMatch": "demo scheme match",

    "schemes.checkEligibility": "Check Eligibility",

    "schemes.selectCropAuto":
      "Select a crop or leave Auto-detect to identify it from the file name.",
  },

  te: {
    "schemes.title": "ప్రభుత్వ పథకాల అన్వేషణ",
    "schemes.description":
      "మీ భూమి, పంట, ఆదాయ వివరాలు చెబితే మీకు సరిపోయే పథకాలు, దరఖాస్తు విధానం చూపిస్తాం.",

    "schemes.farmerProfile": "రైతు వివరాలు",
    "schemes.profileDescription":
      "మీకు సరిపోయే పథకాలను తెలుసుకోవడానికి క్రింది వివరాలను పూర్తి చేయండి.",

    "schemes.state": "రాష్ట్రం",
    "schemes.selectState": "రాష్ట్రాన్ని ఎంచుకోండి",
    "schemes.andhra": "ఆంధ్రప్రదేశ్",
    "schemes.telangana": "తెలంగాణ",
    "schemes.tamilnadu": "తమిళనాడు",
    "schemes.karnataka": "కర్ణాటక",
    "schemes.maharashtra": "మహారాష్ట్ర",
    "schemes.westbengal": "పశ్చిమ బెంగాల్",
    "schemes.other": "ఇతర",

    "schemes.age": "వయస్సు",
    "schemes.agePlaceholder": "ఉదా: 45",

    "schemes.category": "రైతు వర్గం",
    "schemes.selectCategory": "వర్గాన్ని ఎంచుకోండి",
    "schemes.small": "చిన్న రైతు",
    "schemes.marginal": "సన్నకారు రైతు",
    "schemes.medium": "మధ్య తరహా రైతు",
    "schemes.large": "పెద్ద రైతు",
    "schemes.government": "ప్రభుత్వ / సంస్థాగత",

    "schemes.land": "భూమి విస్తీర్ణం (ఎకరాలు)",
    "schemes.landPlaceholder": "ఉదా: 2.5",

    "schemes.crop": "పంట రకం",
    "schemes.selectCrop": "పంటను ఎంచుకోండి",
    "schemes.paddy": "వరి",
    "schemes.wheat": "గోధుమ",
    "schemes.cotton": "పత్తి",
    "schemes.maize": "మొక్కజొన్న",
    "schemes.vegetables": "కూరగాయలు",
    "schemes.pulses": "పప్పుధాన్యాలు",
    "schemes.noneCrop": "పంట లేదు",

    "schemes.irrigation": "నీటిపారుదల రకం",
    "schemes.selectIrrigation": "నీటిపారుదల రకాన్ని ఎంచుకోండి",
    "schemes.borewell": "బోర్‌వెల్",
    "schemes.canal": "కాలువ",
    "schemes.drip": "డ్రిప్ నీటిపారుదల",
    "schemes.rainfed": "వర్షాధార",
    "schemes.noneIrrigation": "నీటిపారుదల లేదు",

    "schemes.income": "వార్షిక ఆదాయ పరిధి",
    "schemes.selectIncome": "ఆదాయ పరిధిని ఎంచుకోండి",
    "schemes.below1": "₹1 లక్ష కంటే తక్కువ",
    "schemes.1to3": "₹1 లక్ష – ₹3 లక్షలు",
    "schemes.3to5": "₹3 లక్షలు – ₹5 లక్షలు",
    "schemes.above5": "₹5 లక్షలకు పైగా",

    "schemes.find": "అర్హత ఉన్న పథకాలను కనుగొనండి",
    "schemes.reset": "వివరాలను రీసెట్ చేయండి",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "ప్రధాన మంత్రి ఫసల్ బీమా యోజన",
    "schemes.pmksy": "ప్రధాన మంత్రి కృషి సించాయీ యోజన",
    "schemes.soilHealth": "నేల ఆరోగ్య కార్డు",
    "schemes.kcc": "కిసాన్ క్రెడిట్ కార్డు",

    "schemes.pmkisanBenefit":
      "ప్రస్తుత ప్రభుత్వ మార్గదర్శకాల ప్రకారం అర్హత ఉన్న రైతులకు PM-KISAN కింద ఆర్థిక సహాయం అందుతుంది.",
    "schemes.pmfbyBenefit":
      "నిర్దిష్ట సహజ ప్రమాదాల వల్ల పంట నష్టాలకు పంట బీమా రక్షణ అందిస్తుంది.",
    "schemes.pmksyBenefit":
      "వ్యవసాయంలో మెరుగైన నీటిపారుదల మరియు నీటి సమర్థ వినియోగానికి సహాయం చేస్తుంది.",
    "schemes.soilHealthBenefit":
      "నేల పరీక్షలు మరియు పోషక నిర్వహణకు రైతులకు సూచనలు అందిస్తుంది.",
    "schemes.kccBenefit":
      "వ్యవసాయం మరియు సంబంధిత కార్యకలాపాలకు రైతులకు రుణ సౌకర్యం అందిస్తుంది.",

    "schemes.eligibility": "అర్హత",
    "schemes.eligible": "అర్హత ఉంది",
    "schemes.likelyEligible": "అర్హత ఉండే అవకాశం ఉంది",
    "schemes.notEligible": "అర్హత లేదు",

    "schemes.viewDetails": "వివరాలు చూడండి",
    "schemes.hideDetails": "వివరాలు దాచండి",

    "schemes.eligibilityMatch": "అర్హత ఫలితాలు",
    "schemes.estimatedBenefit": "అంచనా ప్రయోజనం",
    "schemes.applicationGuidance": "దరఖాస్తు విధానం",
    "schemes.application": "దరఖాస్తు విధానం",

    "schemes.demoTitle": "నమూనా సమాచారం",
    "schemes.demoText":
      "ఇక్కడ చూపించిన అర్హత మరియు ప్రయోజన వివరాలు డెమో కోసం మాత్రమే. దరఖాస్తు చేసే ముందు అధికారిక ప్రభుత్వ పథక పోర్టల్ లేదా స్థానిక వ్యవసాయ కార్యాలయంలో వివరాలను నిర్ధారించుకోండి.",

    "schemes.applyOfficial": "అధికారిక పోర్టల్‌లో దరఖాస్తు చేయండి →",

    "schemes.errorRequired":
      "పథకాలను చూపించడానికి అన్ని రైతు వివరాలను పూర్తి చేయండి.",

    "schemes.noMatches": "ఇంకా ఫలితాలు లేవు",
    "schemes.noMatchesDescription":
      "రైతు వివరాలను పూర్తి చేసి అర్హత ఉన్న పథకాలను కనుగొనండి పై క్లిక్ చేయండి.",

    "schemes.tryAnother": "మరో రైతు వివరాలు ప్రయత్నించండి",

    "schemes.searchPlaceholder":
      "పథకాలు, ప్రయోజనాలు లేదా శాఖలను వెతకండి",

    "schemes.all": "అన్నీ",
    "schemes.agriculture": "వ్యవసాయం",
    "schemes.insurance": "బీమా",
    "schemes.credit": "రుణం",
    "schemes.subsidy": "రాయితీ",
    "schemes.welfare": "సంక్షేమం",
    "schemes.women": "మహిళలు",
    "schemes.youth": "యువత",

    "schemes.showing": "చూపిస్తున్నవి",
    "schemes.demoMatches": "నమూనా పథకాల సరిపోలికలు",
    "schemes.demoMatch": "నమూనా పథకం సరిపోలిక",

    "schemes.checkEligibility": "అర్హతను పరిశీలించండి",

    "schemes.selectCropAuto":
      "పంటను ఎంచుకోండి లేదా ఫైల్ పేరును బట్టి గుర్తించడానికి Auto-detect ఉంచండి.",
  },

  hi: {
    "schemes.title": "सरकारी योजना खोज",
    "schemes.description":
      "अपनी ज़मीन, फसल और आय की जानकारी दें। हम आपके लिए उपयुक्त योजनाएँ और आवेदन की जानकारी दिखाएँगे।",

    "schemes.farmerProfile": "किसान का विवरण",
    "schemes.profileDescription":
      "उपयुक्त योजनाएँ देखने के लिए नीचे दिए गए विवरण भरें।",

    "schemes.state": "राज्य",
    "schemes.selectState": "राज्य चुनें",
    "schemes.andhra": "आंध्र प्रदेश",
    "schemes.telangana": "तेलंगाना",
    "schemes.tamilnadu": "तमिलनाडु",
    "schemes.karnataka": "कर्नाटक",
    "schemes.maharashtra": "महाराष्ट्र",
    "schemes.westbengal": "पश्चिम बंगाल",
    "schemes.other": "अन्य",

    "schemes.age": "उम्र",
    "schemes.agePlaceholder": "जैसे: 45",

    "schemes.category": "किसान वर्ग",
    "schemes.selectCategory": "वर्ग चुनें",
    "schemes.small": "छोटे किसान",
    "schemes.marginal": "सीमांत किसान",
    "schemes.medium": "मध्यम किसान",
    "schemes.large": "बड़े किसान",
    "schemes.government": "सरकारी / संस्थागत",

    "schemes.land": "भूमि क्षेत्र (एकड़)",
    "schemes.landPlaceholder": "जैसे: 2.5",

    "schemes.crop": "फसल का प्रकार",
    "schemes.selectCrop": "फसल चुनें",
    "schemes.paddy": "धान",
    "schemes.wheat": "गेहूँ",
    "schemes.cotton": "कपास",
    "schemes.maize": "मक्का",
    "schemes.vegetables": "सब्जियाँ",
    "schemes.pulses": "दलहन",
    "schemes.noneCrop": "कोई फसल नहीं",

    "schemes.irrigation": "सिंचाई का प्रकार",
    "schemes.selectIrrigation": "सिंचाई चुनें",
    "schemes.borewell": "बोरवेल",
    "schemes.canal": "नहर",
    "schemes.drip": "ड्रिप सिंचाई",
    "schemes.rainfed": "वर्षा आधारित",
    "schemes.noneIrrigation": "सिंचाई नहीं",

    "schemes.income": "वार्षिक आय सीमा",
    "schemes.selectIncome": "आय सीमा चुनें",
    "schemes.below1": "₹1 लाख से कम",
    "schemes.1to3": "₹1 लाख – ₹3 लाख",
    "schemes.3to5": "₹3 लाख – ₹5 लाख",
    "schemes.above5": "₹5 लाख से अधिक",

    "schemes.find": "पात्र योजनाएँ खोजें",
    "schemes.reset": "विवरण रीसेट करें",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "प्रधानमंत्री फसल बीमा योजना",
    "schemes.pmksy": "प्रधानमंत्री कृषि सिंचाई योजना",
    "schemes.soilHealth": "मृदा स्वास्थ्य कार्ड",
    "schemes.kcc": "किसान क्रेडिट कार्ड",

    "schemes.pmkisanBenefit":
      "वर्तमान सरकारी दिशानिर्देशों के अनुसार पात्र किसानों को PM-KISAN के तहत आर्थिक सहायता मिलती है.",
    "schemes.pmfbyBenefit":
      "निर्धारित प्राकृतिक जोखिमों से होने वाले फसल नुकसान के लिए फसल बीमा सुरक्षा प्रदान करता है.",
    "schemes.pmksyBenefit":
      "कृषि में बेहतर सिंचाई और जल के कुशल उपयोग को बढ़ावा देता है.",
    "schemes.soilHealthBenefit":
      "मिट्टी की जाँच और पोषक तत्वों के प्रबंधन के लिए सुझाव देता है.",
    "schemes.kccBenefit":
      "कृषि और संबंधित गतिविधियों के लिए किसानों को ऋण सुविधा प्रदान करता है.",

    "schemes.eligibility": "पात्रता",
    "schemes.eligible": "पात्र",
    "schemes.likelyEligible": "पात्र होने की संभावना",
    "schemes.notEligible": "पात्र नहीं",

    "schemes.viewDetails": "विवरण देखें",
    "schemes.hideDetails": "विवरण छिपाएँ",

    "schemes.eligibilityMatch": "पात्रता परिणाम",
    "schemes.estimatedBenefit": "अनुमानित लाभ",
    "schemes.applicationGuidance": "आवेदन मार्गदर्शन",
    "schemes.application": "आवेदन मार्गदर्शन",

    "schemes.demoTitle": "नमूना जानकारी",
    "schemes.demoText":
      "यह जानकारी केवल डेमो के लिए है। आवेदन करने से पहले आधिकारिक सरकारी पोर्टल या स्थानीय कृषि कार्यालय से जानकारी की पुष्टि करें.",

    "schemes.applyOfficial": "आधिकारिक पोर्टल पर आवेदन करें →",

    "schemes.errorRequired":
      "योजनाएँ देखने के लिए किसान की सभी जानकारी भरें।",

    "schemes.noMatches": "अभी कोई परिणाम नहीं",
    "schemes.noMatchesDescription":
      "किसान का विवरण पूरा करें और पात्र योजनाएँ खोजें पर क्लिक करें।",

    "schemes.tryAnother": "दूसरा प्रोफ़ाइल आज़माएँ",

    "schemes.searchPlaceholder":
      "योजनाएँ, लाभ या विभाग खोजें",

    "schemes.all": "सभी",
    "schemes.agriculture": "कृषि",
    "schemes.insurance": "बीमा",
    "schemes.credit": "ऋण",
    "schemes.subsidy": "सब्सिडी",
    "schemes.welfare": "कल्याण",
    "schemes.women": "महिलाएँ",
    "schemes.youth": "युवा",

    "schemes.showing": "दिखाई जा रही हैं",
    "schemes.demoMatches": "नमूना योजना परिणाम",
    "schemes.demoMatch": "नमूना योजना परिणाम",

    "schemes.checkEligibility": "पात्रता जाँचें",

    "schemes.selectCropAuto":
      "फसल चुनें या फ़ाइल नाम से पहचानने के लिए Auto-detect रखें।",
  },

  mr: {
    "schemes.title": "शासकीय योजना शोध",
    "schemes.description":
      "तुमची जमीन, पीक आणि उत्पन्नाची माहिती द्या. तुमच्यासाठी योग्य योजना आणि अर्जाची माहिती पाहा.",

    "schemes.farmerProfile": "शेतकरी माहिती",
    "schemes.profileDescription":
      "योग्य योजना पाहण्यासाठी खालील माहिती भरा.",

    "schemes.state": "राज्य",
    "schemes.selectState": "राज्य निवडा",
    "schemes.andhra": "आंध्र प्रदेश",
    "schemes.telangana": "तेलंगणा",
    "schemes.tamilnadu": "तमिळनाडू",
    "schemes.karnataka": "कर्नाटक",
    "schemes.maharashtra": "महाराष्ट्र",
    "schemes.westbengal": "पश्चिम बंगाल",
    "schemes.other": "इतर",

    "schemes.age": "वय",
    "schemes.agePlaceholder": "उदा: 45",

    "schemes.category": "शेतकरी वर्ग",
    "schemes.selectCategory": "वर्ग निवडा",
    "schemes.small": "अल्पभूधारक शेतकरी",
    "schemes.marginal": "सीमांत शेतकरी",
    "schemes.medium": "मध्यम शेतकरी",
    "schemes.large": "मोठे शेतकरी",
    "schemes.government": "सरकारी / संस्थात्मक",

    "schemes.land": "जमीन क्षेत्र (एकर)",
    "schemes.landPlaceholder": "उदा: 2.5",

    "schemes.crop": "पिकाचा प्रकार",
    "schemes.selectCrop": "पीक निवडा",
    "schemes.paddy": "भात",
    "schemes.wheat": "गहू",
    "schemes.cotton": "कापूस",
    "schemes.maize": "मका",
    "schemes.vegetables": "भाज्या",
    "schemes.pulses": "डाळी",
    "schemes.noneCrop": "पीक नाही",

    "schemes.irrigation": "सिंचनाचा प्रकार",
    "schemes.selectIrrigation": "सिंचन निवडा",
    "schemes.borewell": "बोअरवेल",
    "schemes.canal": "कालवा",
    "schemes.drip": "ठिबक सिंचन",
    "schemes.rainfed": "पावसावर आधारित",
    "schemes.noneIrrigation": "सिंचन नाही",

    "schemes.income": "वार्षिक उत्पन्न श्रेणी",
    "schemes.selectIncome": "उत्पन्न श्रेणी निवडा",
    "schemes.below1": "₹1 लाखांपेक्षा कमी",
    "schemes.1to3": "₹1 लाख – ₹3 लाख",
    "schemes.3to5": "₹3 लाख – ₹5 लाख",
    "schemes.above5": "₹5 लाखांपेक्षा जास्त",

    "schemes.find": "पात्र योजना शोधा",
    "schemes.reset": "माहिती रीसेट करा",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "प्रधानमंत्री पीक विमा योजना",
    "schemes.pmksy": "प्रधानमंत्री कृषी सिंचन योजना",
    "schemes.soilHealth": "मृदा आरोग्य कार्ड",
    "schemes.kcc": "किसान क्रेडिट कार्ड",

    "schemes.pmkisanBenefit":
      "सध्याच्या सरकारी मार्गदर्शक तत्त्वांनुसार पात्र शेतकऱ्यांना PM-KISAN अंतर्गत आर्थिक मदत मिळते.",
    "schemes.pmfbyBenefit":
      "निश्चित नैसर्गिक जोखमींमुळे होणाऱ्या पिकांच्या नुकसानीसाठी पीक विमा संरक्षण देते.",
    "schemes.pmksyBenefit":
      "शेतीमध्ये सुधारित सिंचन आणि पाण्याच्या कार्यक्षम वापरास मदत करते.",
    "schemes.soilHealthBenefit":
      "मातीची तपासणी आणि पोषक व्यवस्थापनासाठी शेतकऱ्यांना सूचना देते.",
    "schemes.kccBenefit":
      "शेती आणि संबंधित कामांसाठी शेतकऱ्यांना कर्ज सुविधा देते.",

    "schemes.eligibility": "पात्रता",
    "schemes.eligible": "पात्र",
    "schemes.likelyEligible": "पात्र असण्याची शक्यता",
    "schemes.notEligible": "पात्र नाही",

    "schemes.viewDetails": "तपशील पाहा",
    "schemes.hideDetails": "तपशील लपवा",

    "schemes.eligibilityMatch": "पात्रता परिणाम",
    "schemes.estimatedBenefit": "अंदाजे लाभ",
    "schemes.applicationGuidance": "अर्ज मार्गदर्शन",
    "schemes.application": "अर्ज मार्गदर्शन",

    "schemes.demoTitle": "नमुना माहिती",
    "schemes.demoText":
      "ही माहिती फक्त डेमोसाठी आहे. अर्ज करण्यापूर्वी अधिकृत सरकारी पोर्टल किंवा स्थानिक कृषी कार्यालयात माहिती तपासा.",

    "schemes.applyOfficial": "अधिकृत पोर्टलवर अर्ज करा →",

    "schemes.errorRequired":
      "योजना पाहण्यासाठी शेतकऱ्याची सर्व माहिती भरा.",

    "schemes.noMatches": "अजून कोणतेही परिणाम नाहीत",
    "schemes.noMatchesDescription":
      "शेतकऱ्याची माहिती पूर्ण करा आणि पात्र योजना शोधा वर क्लिक करा.",

    "schemes.tryAnother": "दुसरी माहिती वापरा",

    "schemes.searchPlaceholder":
      "योजना, लाभ किंवा विभाग शोधा",

    "schemes.all": "सर्व",
    "schemes.agriculture": "शेती",
    "schemes.insurance": "विमा",
    "schemes.credit": "कर्ज",
    "schemes.subsidy": "अनुदान",
    "schemes.welfare": "कल्याण",
    "schemes.women": "महिला",
    "schemes.youth": "युवा",

    "schemes.showing": "दाखवत आहे",
    "schemes.demoMatches": "नमुना योजना जुळण्या",
    "schemes.demoMatch": "नमुना योजना जुळणी",

    "schemes.checkEligibility": "पात्रता तपासा",

    "schemes.selectCropAuto":
      "पीक निवडा किंवा फाइलच्या नावावरून ओळखण्यासाठी Auto-detect ठेवा.",
  },

  ta: {
    "schemes.title": "அரசு திட்ட தேடல்",
    "schemes.description":
      "உங்கள் நிலம், பயிர் மற்றும் வருமான விவரங்களைத் தெரிவியுங்கள். உங்களுக்கு பொருந்தும் திட்டங்களையும் விண்ணப்ப முறையையும் காட்டுகிறோம்.",

    "schemes.farmerProfile": "விவசாயி விவரங்கள்",
    "schemes.profileDescription":
      "உங்களுக்கு பொருந்தும் திட்டங்களைப் பார்க்க கீழே உள்ள விவரங்களை நிரப்புங்கள்.",

    "schemes.state": "மாநிலம்",
    "schemes.selectState": "மாநிலத்தைத் தேர்வு செய்யுங்கள்",
    "schemes.andhra": "ஆந்திரப் பிரதேசம்",
    "schemes.telangana": "தெலங்கானா",
    "schemes.tamilnadu": "தமிழ்நாடு",
    "schemes.karnataka": "கர்நாடகா",
    "schemes.maharashtra": "மகாராஷ்டிரா",
    "schemes.westbengal": "மேற்கு வங்காளம்",
    "schemes.other": "மற்றவை",

    "schemes.age": "வயது",
    "schemes.agePlaceholder": "உதா: 45",

    "schemes.category": "விவசாயி வகை",
    "schemes.selectCategory": "வகையைத் தேர்வு செய்யுங்கள்",
    "schemes.small": "சிறு விவசாயி",
    "schemes.marginal": "குறு விவசாயி",
    "schemes.medium": "நடுத்தர விவசாயி",
    "schemes.large": "பெரிய விவசாயி",
    "schemes.government": "அரசு / நிறுவன விவசாயி",

    "schemes.land": "நில அளவு (ஏக்கர்)",
    "schemes.landPlaceholder": "உதா: 2.5",

    "schemes.crop": "பயிர் வகை",
    "schemes.selectCrop": "பயிரைத் தேர்வு செய்யுங்கள்",
    "schemes.paddy": "நெல்",
    "schemes.wheat": "கோதுமை",
    "schemes.cotton": "பருத்தி",
    "schemes.maize": "மக்காச்சோளம்",
    "schemes.vegetables": "காய்கறிகள்",
    "schemes.pulses": "பருப்பு வகைகள்",
    "schemes.noneCrop": "பயிர் இல்லை",

    "schemes.irrigation": "நீர்ப்பாசன வகை",
    "schemes.selectIrrigation": "நீர்ப்பாசனத்தைத் தேர்வு செய்யுங்கள்",
    "schemes.borewell": "ஆழ்துளைக் கிணறு",
    "schemes.canal": "கால்வாய்",
    "schemes.drip": "சொட்டு நீர்ப்பாசனம்",
    "schemes.rainfed": "மழை சார்ந்த",
    "schemes.noneIrrigation": "நீர்ப்பாசனம் இல்லை",

    "schemes.income": "ஆண்டு வருமான வரம்பு",
    "schemes.selectIncome": "வருமான வரம்பைத் தேர்வு செய்யுங்கள்",
    "schemes.below1": "₹1 லட்சத்திற்குக் கீழ்",
    "schemes.1to3": "₹1 லட்சம் – ₹3 லட்சம்",
    "schemes.3to5": "₹3 லட்சம் – ₹5 லட்சம்",
    "schemes.above5": "₹5 லட்சத்திற்கு மேல்",

    "schemes.find": "தகுதியான திட்டங்களைக் கண்டறியுங்கள்",
    "schemes.reset": "விவரங்களை மீட்டமைக்கவும்",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "பிரதான் மந்திரி பயிர் காப்பீட்டு திட்டம்",
    "schemes.pmksy": "பிரதான் மந்திரி கிருஷி சிஞ்சாய் யோஜனா",
    "schemes.soilHealth": "மண் சுகாதார அட்டை",
    "schemes.kcc": "கிசான் கிரெடிட் கார்டு",

    "schemes.pmkisanBenefit":
      "தற்போதைய அரசு வழிகாட்டுதலின்படி தகுதியுள்ள விவசாயிகளுக்கு PM-KISAN திட்டத்தின் கீழ் நிதியுதவி வழங்கப்படுகிறது.",
    "schemes.pmfbyBenefit":
      "குறிப்பிட்ட இயற்கை அபாயங்களால் ஏற்படும் பயிர் இழப்புகளுக்கு பயிர் காப்பீட்டு பாதுகாப்பை வழங்குகிறது.",
    "schemes.pmksyBenefit":
      "விவசாயத்தில் மேம்பட்ட நீர்ப்பாசனம் மற்றும் நீரை திறம்பட பயன்படுத்த உதவுகிறது.",
    "schemes.soilHealthBenefit":
      "மண் பரிசோதனை மற்றும் ஊட்டச்சத்து மேலாண்மைக்கான பரிந்துரைகளை வழங்குகிறது.",
    "schemes.kccBenefit":
      "விவசாயம் மற்றும் தொடர்புடைய செயல்பாடுகளுக்கு விவசாயிகளுக்கு கடன் வசதியை வழங்குகிறது.",

    "schemes.eligibility": "தகுதி",
    "schemes.eligible": "தகுதியானவர்",
    "schemes.likelyEligible": "தகுதி இருக்கலாம்",
    "schemes.notEligible": "தகுதி இல்லை",

    "schemes.viewDetails": "விவரங்களைப் பார்க்கவும்",
    "schemes.hideDetails": "விவரங்களை மறைக்கவும்",

    "schemes.eligibilityMatch": "தகுதி முடிவுகள்",
    "schemes.estimatedBenefit": "மதிப்பிடப்பட்ட நன்மை",
    "schemes.applicationGuidance": "விண்ணப்ப வழிகாட்டி",
    "schemes.application": "விண்ணப்ப வழிகாட்டி",

    "schemes.demoTitle": "மாதிரி தகவல்",
    "schemes.demoText":
      "இது டெமோ தகவல் மட்டுமே. விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ அரசு இணையதளம் அல்லது உள்ளூர் வேளாண்மை அலுவலகத்தில் சரிபார்க்கவும்.",

    "schemes.applyOfficial": "அதிகாரப்பூர்வ இணையதளத்தில் விண்ணப்பிக்கவும் →",

    "schemes.errorRequired":
      "திட்டங்களைப் பார்க்க அனைத்து விவசாயி விவரங்களையும் நிரப்புங்கள்.",

    "schemes.noMatches": "இன்னும் முடிவுகள் இல்லை",
    "schemes.noMatchesDescription":
      "விவசாயி விவரங்களை நிரப்பி தகுதியான திட்டங்களைக் கண்டறியுங்கள் என்பதைத் தேர்வு செய்யுங்கள்.",

    "schemes.tryAnother": "மற்றொரு விவரத்தை முயற்சிக்கவும்",

    "schemes.searchPlaceholder":
      "திட்டங்கள், நன்மைகள் அல்லது துறைகளைத் தேடுங்கள்",

    "schemes.all": "அனைத்தும்",
    "schemes.agriculture": "விவசாயம்",
    "schemes.insurance": "காப்பீடு",
    "schemes.credit": "கடன்",
    "schemes.subsidy": "மானியம்",
    "schemes.welfare": "நலத்திட்டம்",
    "schemes.women": "பெண்கள்",
    "schemes.youth": "இளைஞர்கள்",

    "schemes.showing": "காட்டப்படுவது",
    "schemes.demoMatches": "மாதிரி திட்ட பொருத்தங்கள்",
    "schemes.demoMatch": "மாதிரி திட்ட பொருத்தம்",

    "schemes.checkEligibility": "தகுதியைச் சரிபார்க்கவும்",

    "schemes.selectCropAuto":
      "பயிரைத் தேர்வு செய்யுங்கள் அல்லது கோப்பு பெயரிலிருந்து கண்டறிய Auto-detect பயன்படுத்துங்கள்.",
  },

  kn: {
    "schemes.title": "ಸರ್ಕಾರಿ ಯೋಜನೆ ಹುಡುಕಾಟ",
    "schemes.description":
      "ನಿಮ್ಮ ಜಮೀನು, ಬೆಳೆ ಮತ್ತು ಆದಾಯದ ವಿವರಗಳನ್ನು ನೀಡಿ. ನಿಮಗೆ ಸೂಕ್ತವಾದ ಯೋಜನೆಗಳು ಮತ್ತು ಅರ್ಜಿ ವಿಧಾನವನ್ನು ತೋರಿಸುತ್ತೇವೆ.",

    "schemes.farmerProfile": "ರೈತರ ವಿವರಗಳು",
    "schemes.profileDescription":
      "ನಿಮಗೆ ಸೂಕ್ತವಾದ ಯೋಜನೆಗಳನ್ನು ನೋಡಲು ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",

    "schemes.state": "ರಾಜ್ಯ",
    "schemes.selectState": "ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ",
    "schemes.andhra": "ಆಂಧ್ರ ಪ್ರದೇಶ",
    "schemes.telangana": "ತೆಲಂಗಾಣ",
    "schemes.tamilnadu": "ತಮಿಳುನಾಡು",
    "schemes.karnataka": "ಕರ್ನಾಟಕ",
    "schemes.maharashtra": "ಮಹಾರಾಷ್ಟ್ರ",
    "schemes.westbengal": "ಪಶ್ಚಿಮ ಬಂಗಾಳ",
    "schemes.other": "ಇತರೆ",

    "schemes.age": "ವಯಸ್ಸು",
    "schemes.agePlaceholder": "ಉದಾ: 45",

    "schemes.category": "ರೈತರ ವರ್ಗ",
    "schemes.selectCategory": "ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ",
    "schemes.small": "ಸಣ್ಣ ರೈತ",
    "schemes.marginal": "ಅತಿಸಣ್ಣ ರೈತ",
    "schemes.medium": "ಮಧ್ಯಮ ರೈತ",
    "schemes.large": "ದೊಡ್ಡ ರೈತ",
    "schemes.government": "ಸರ್ಕಾರಿ / ಸಂಸ್ಥೆಯ",

    "schemes.land": "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)",
    "schemes.landPlaceholder": "ಉದಾ: 2.5",

    "schemes.crop": "ಬೆಳೆ ಪ್ರಕಾರ",
    "schemes.selectCrop": "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    "schemes.paddy": "ಭತ್ತ",
    "schemes.wheat": "ಗೋಧಿ",
    "schemes.cotton": "ಹತ್ತಿ",
    "schemes.maize": "ಮೆಕ್ಕೆಜೋಳ",
    "schemes.vegetables": "ತರಕಾರಿಗಳು",
    "schemes.pulses": "ಬೇಳೆಕಾಳುಗಳು",
    "schemes.noneCrop": "ಬೆಳೆ ಇಲ್ಲ",

    "schemes.irrigation": "ನೀರಾವರಿ ಪ್ರಕಾರ",
    "schemes.selectIrrigation": "ನೀರಾವರಿ ಆಯ್ಕೆಮಾಡಿ",
    "schemes.borewell": "ಬೋರ್‌ವೆಲ್",
    "schemes.canal": "ಕಾಲುವೆ",
    "schemes.drip": "ಹನಿ ನೀರಾವರಿ",
    "schemes.rainfed": "ಮಳೆ ಆಧಾರಿತ",
    "schemes.noneIrrigation": "ನೀರಾವರಿ ಇಲ್ಲ",

    "schemes.income": "ವಾರ್ಷಿಕ ಆದಾಯ ಮಿತಿ",
    "schemes.selectIncome": "ಆದಾಯ ಮಿತಿ ಆಯ್ಕೆಮಾಡಿ",
    "schemes.below1": "₹1 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ",
    "schemes.1to3": "₹1 ಲಕ್ಷ – ₹3 ಲಕ್ಷ",
    "schemes.3to5": "₹3 ಲಕ್ಷ – ₹5 ಲಕ್ಷ",
    "schemes.above5": "₹5 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು",

    "schemes.find": "ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    "schemes.reset": "ವಿವರಗಳನ್ನು ಮರುಹೊಂದಿಸಿ",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
    "schemes.pmksy": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ",
    "schemes.soilHealth": "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್",
    "schemes.kcc": "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",

    "schemes.pmkisanBenefit":
      "ಪ್ರಸ್ತುತ ಸರ್ಕಾರಿ ಮಾರ್ಗಸೂಚಿಗಳ ಪ್ರಕಾರ ಅರ್ಹ ರೈತರಿಗೆ PM-KISAN ಅಡಿಯಲ್ಲಿ ಆರ್ಥಿಕ ಸಹಾಯ ದೊರೆಯುತ್ತದೆ.",
    "schemes.pmfbyBenefit":
      "ನಿರ್ದಿಷ್ಟ ನೈಸರ್ಗಿಕ ಅಪಾಯಗಳಿಂದ ಉಂಟಾಗುವ ಬೆಳೆ ನಷ್ಟಕ್ಕೆ ಬೆಳೆ ವಿಮಾ ರಕ್ಷಣೆಯನ್ನು ನೀಡುತ್ತದೆ.",
    "schemes.pmksyBenefit":
      "ಕೃಷಿಯಲ್ಲಿ ಉತ್ತಮ ನೀರಾವರಿ ಮತ್ತು ನೀರಿನ ಪರಿಣಾಮಕಾರಿ ಬಳಕೆಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    "schemes.soilHealthBenefit":
      "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆಗೆ ಶಿಫಾರಸುಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    "schemes.kccBenefit":
      "ಕೃಷಿ ಮತ್ತು ಸಂಬಂಧಿತ ಚಟುವಟಿಕೆಗಳಿಗೆ ರೈತರಿಗೆ ಸಾಲ ಸೌಲಭ್ಯ ನೀಡುತ್ತದೆ.",

    "schemes.eligibility": "ಅರ್ಹತೆ",
    "schemes.eligible": "ಅರ್ಹ",
    "schemes.likelyEligible": "ಅರ್ಹರಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ",
    "schemes.notEligible": "ಅರ್ಹರಲ್ಲ",

    "schemes.viewDetails": "ವಿವರಗಳನ್ನು ನೋಡಿ",
    "schemes.hideDetails": "ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ",

    "schemes.eligibilityMatch": "ಅರ್ಹತೆ ಫಲಿತಾಂಶಗಳು",
    "schemes.estimatedBenefit": "ಅಂದಾಜು ಪ್ರಯೋಜನ",
    "schemes.applicationGuidance": "ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶನ",
    "schemes.application": "ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶನ",

    "schemes.demoTitle": "ಮಾದರಿ ಮಾಹಿತಿ",
    "schemes.demoText":
      "ಇದು ಡೆಮೋ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಅಥವಾ ಸ್ಥಳೀಯ ಕೃಷಿ ಕಚೇರಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",

    "schemes.applyOfficial": "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →",

    "schemes.errorRequired":
      "ಯೋಜನೆಗಳನ್ನು ನೋಡಲು ಎಲ್ಲಾ ರೈತರ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.",

    "schemes.noMatches": "ಇನ್ನೂ ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ",
    "schemes.noMatchesDescription":
      "ರೈತರ ವಿವರಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ ಕ್ಲಿಕ್ ಮಾಡಿ.",

    "schemes.tryAnother": "ಮತ್ತೊಂದು ಪ್ರೊಫೈಲ್ ಪ್ರಯತ್ನಿಸಿ",

    "schemes.searchPlaceholder":
      "ಯೋಜನೆಗಳು, ಪ್ರಯೋಜನಗಳು ಅಥವಾ ಇಲಾಖೆಗಳನ್ನು ಹುಡುಕಿ",

    "schemes.all": "ಎಲ್ಲಾ",
    "schemes.agriculture": "ಕೃಷಿ",
    "schemes.insurance": "ವಿಮೆ",
    "schemes.credit": "ಸಾಲ",
    "schemes.subsidy": "ಸಬ್ಸಿಡಿ",
    "schemes.welfare": "ಕಲ್ಯಾಣ",
    "schemes.women": "ಮಹಿಳೆಯರು",
    "schemes.youth": "ಯುವಕರು",

    "schemes.showing": "ತೋರಿಸಲಾಗುತ್ತಿದೆ",
    "schemes.demoMatches": "ಮಾದರಿ ಯೋಜನೆ ಹೊಂದಾಣಿಕೆಗಳು",
    "schemes.demoMatch": "ಮಾದರಿ ಯೋಜನೆ ಹೊಂದಾಣಿಕೆ",

    "schemes.checkEligibility": "ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",

    "schemes.selectCropAuto":
      "ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಫೈಲ್ ಹೆಸರಿನಿಂದ ಗುರುತಿಸಲು Auto-detect ಬಳಸಿ.",
  },

  bn: {
    "schemes.title": "সরকারি প্রকল্প খোঁজ",
    "schemes.description":
      "আপনার জমি, ফসল এবং আয়ের তথ্য দিন। আপনার জন্য উপযুক্ত প্রকল্প এবং আবেদনের পদ্ধতি দেখানো হবে।",

    "schemes.farmerProfile": "কৃষকের তথ্য",
    "schemes.profileDescription":
      "আপনার জন্য উপযুক্ত প্রকল্প দেখতে নিচের তথ্য পূরণ করুন।",

    "schemes.state": "রাজ্য",
    "schemes.selectState": "রাজ্য নির্বাচন করুন",
    "schemes.andhra": "অন্ধ্র প্রদেশ",
    "schemes.telangana": "তেলেঙ্গানা",
    "schemes.tamilnadu": "তামিলনাড়ু",
    "schemes.karnataka": "কর্ণাটক",
    "schemes.maharashtra": "মহারাষ্ট্র",
    "schemes.westbengal": "পশ্চিমবঙ্গ",
    "schemes.other": "অন্যান্য",

    "schemes.age": "বয়স",
    "schemes.agePlaceholder": "যেমন: 45",

    "schemes.category": "কৃষকের শ্রেণি",
    "schemes.selectCategory": "শ্রেণি নির্বাচন করুন",
    "schemes.small": "ক্ষুদ্র কৃষক",
    "schemes.marginal": "প্রান্তিক কৃষক",
    "schemes.medium": "মাঝারি কৃষক",
    "schemes.large": "বড় কৃষক",
    "schemes.government": "সরকারি / প্রাতিষ্ঠানিক",

    "schemes.land": "জমির পরিমাণ (একর)",
    "schemes.landPlaceholder": "যেমন: 2.5",

    "schemes.crop": "ফসলের ধরন",
    "schemes.selectCrop": "ফসল নির্বাচন করুন",
    "schemes.paddy": "ধান",
    "schemes.wheat": "গম",
    "schemes.cotton": "তুলা",
    "schemes.maize": "ভুট্টা",
    "schemes.vegetables": "সবজি",
    "schemes.pulses": "ডাল",
    "schemes.noneCrop": "কোনো ফসল নেই",

    "schemes.irrigation": "সেচের ধরন",
    "schemes.selectIrrigation": "সেচ নির্বাচন করুন",
    "schemes.borewell": "বোরওয়েল",
    "schemes.canal": "খাল",
    "schemes.drip": "ড্রিপ সেচ",
    "schemes.rainfed": "বৃষ্টিনির্ভর",
    "schemes.noneIrrigation": "সেচ নেই",

    "schemes.income": "বার্ষিক আয়ের সীমা",
    "schemes.selectIncome": "আয়ের সীমা নির্বাচন করুন",
    "schemes.below1": "₹1 লক্ষের কম",
    "schemes.1to3": "₹1 লক্ষ – ₹3 লক্ষ",
    "schemes.3to5": "₹3 লক্ষ – ₹5 লক্ষ",
    "schemes.above5": "₹5 লক্ষের বেশি",

    "schemes.find": "যোগ্য প্রকল্প খুঁজুন",
    "schemes.reset": "তথ্য রিসেট করুন",

    "schemes.pmkisan": "PM-KISAN",
    "schemes.pmfby": "প্রধানমন্ত্রী ফসল বীমা যোজনা",
    "schemes.pmksy": "প্রধানমন্ত্রী কৃষি সিঞ্চাই যোজনা",
    "schemes.soilHealth": "মাটি স্বাস্থ্য কার্ড",
    "schemes.kcc": "কিষান ক্রেডিট কার্ড",

    "schemes.pmkisanBenefit":
      "বর্তমান সরকারি নির্দেশিকা অনুযায়ী যোগ্য কৃষকরা PM-KISAN-এর অধীনে আর্থিক সহায়তা পেতে পারেন.",
    "schemes.pmfbyBenefit":
      "নির্দিষ্ট প্রাকৃতিক ঝুঁকির কারণে ফসলের ক্ষতির জন্য ফসল বীমা সুরক্ষা প্রদান করে.",
    "schemes.pmksyBenefit":
      "কৃষিতে উন্নত সেচ এবং জল ব্যবহারের দক্ষতা বাড়াতে সহায়তা করে.",
    "schemes.soilHealthBenefit":
      "মাটি পরীক্ষা এবং পুষ্টি ব্যবস্থাপনার জন্য সুপারিশ প্রদান করে.",
    "schemes.kccBenefit":
      "কৃষি ও সংশ্লিষ্ট কাজের জন্য কৃষকদের ঋণ সুবিধা প্রদান করে.",

    "schemes.eligibility": "যোগ্যতা",
    "schemes.eligible": "যোগ্য",
    "schemes.likelyEligible": "যোগ্য হওয়ার সম্ভাবনা",
    "schemes.notEligible": "যোগ্য নয়",

    "schemes.viewDetails": "বিস্তারিত দেখুন",
    "schemes.hideDetails": "বিস্তারিত লুকান",

    "schemes.eligibilityMatch": "যোগ্যতার ফলাফল",
    "schemes.estimatedBenefit": "আনুমানিক সুবিধা",
    "schemes.applicationGuidance": "আবেদনের নির্দেশিকা",
    "schemes.application": "আবেদনের নির্দেশিকা",

    "schemes.demoTitle": "নমুনা তথ্য",
    "schemes.demoText":
      "এটি শুধুমাত্র ডেমো তথ্য। আবেদন করার আগে সরকারি পোর্টাল বা স্থানীয় কৃষি অফিস থেকে তথ্য যাচাই করুন।",

    "schemes.applyOfficial": "সরকারি পোর্টালে আবেদন করুন →",

    "schemes.errorRequired":
      "প্রকল্প দেখতে কৃষকের সব তথ্য পূরণ করুন।",

    "schemes.noMatches": "এখনও কোনো ফলাফল নেই",
    "schemes.noMatchesDescription":
      "কৃষকের তথ্য পূরণ করুন এবং যোগ্য প্রকল্প খুঁজুন ক্লিক করুন।",

    "schemes.tryAnother": "অন্য প্রোফাইল চেষ্টা করুন",

    "schemes.searchPlaceholder":
      "প্রকল্প, সুবিধা বা বিভাগ খুঁজুন",

    "schemes.all": "সব",
    "schemes.agriculture": "কৃষি",
    "schemes.insurance": "বীমা",
    "schemes.credit": "ঋণ",
    "schemes.subsidy": "ভর্তুকি",
    "schemes.welfare": "কল্যাণ",
    "schemes.women": "মহিলা",
    "schemes.youth": "যুব",

    "schemes.showing": "দেখানো হচ্ছে",
    "schemes.demoMatches": "নমুনা প্রকল্পের মিল",
    "schemes.demoMatch": "নমুনা প্রকল্পের মিল",

    "schemes.checkEligibility": "যোগ্যতা পরীক্ষা করুন",

    "schemes.selectCropAuto":
      "ফসল নির্বাচন করুন অথবা ফাইলের নাম থেকে শনাক্ত করতে Auto-detect ব্যবহার করুন।",
  },
} satisfies Record<LanguageCode, Record<string, string>>;

export type SchemesKey = keyof typeof schemes.en;