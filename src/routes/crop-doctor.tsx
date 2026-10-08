import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/crop-doctor")({
  component: CropDoctor,
});

type CropType = "tomato" | "wheat" | "paddy" | "cotton" | "groundnut";

const crops: CropType[] = [
  "tomato",
  "wheat",
  "paddy",
  "cotton",
  "groundnut",
];

const text = {
  en: {
    title: "Crop Doctor",
    subtitle: "Upload a crop photo",
    description: "Choose a clear crop image for a preliminary image check.",
    select: "Select photo",
    crop: "Crop type",
    analyze: "Check image",
    analyzing: "Checking image...",
    reset: "Clear / Reset",
    symptoms: "Sample symptoms",
    treatment: "Suggested guidance",
    prevention: "Prevention tips",
    warning: "Demonstration only. This is not a trained disease diagnosis.",
    invalid: "This image may not be a crop photo. Please upload a clear crop image.",
    error: "Could not check this image. Please try again.",
    tomato: "Tomato",
    wheat: "Wheat",
    paddy: "Rice / Paddy",
    cotton: "Cotton",
    groundnut: "Groundnut",
    advice: "Consult a local agriculture officer before applying chemicals.",
  },
  te: {
    title: "పంట వైద్యుడు",
    subtitle: "పంట ఫోటోను అప్‌లోడ్ చేయండి",
    description: "ప్రాథమిక చిత్ర తనిఖీ కోసం స్పష్టమైన పంట చిత్రాన్ని ఎంచుకోండి.",
    select: "ఫోటో ఎంచుకోండి",
    crop: "పంట రకం",
    analyze: "చిత్రాన్ని తనిఖీ చేయండి",
    analyzing: "చిత్రాన్ని తనిఖీ చేస్తోంది...",
    reset: "రీసెట్ చేయండి",
    symptoms: "నమూనా లక్షణాలు",
    treatment: "సూచించిన సలహా",
    prevention: "నివారణ సూచనలు",
    warning: "ఇది డెమో మాత్రమే. శిక్షణ పొందిన వ్యాధి నిర్ధారణ కాదు.",
    invalid: "ఇది పంట ఫోటో కాకపోవచ్చు. స్పష్టమైన పంట చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    error: "చిత్రాన్ని తనిఖీ చేయలేకపోయాం. మళ్లీ ప్రయత్నించండి.",
    tomato: "టమాటా",
    wheat: "గోధుమ",
    paddy: "వరి",
    cotton: "పత్తి",
    groundnut: "వేరుశెనగ",
    advice: "రసాయనాలు వాడే ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.",
  },
  hi: {
    title: "फसल डॉक्टर",
    subtitle: "फसल की फोटो अपलोड करें",
    description: "प्रारंभिक जांच के लिए फसल की स्पष्ट तस्वीर चुनें।",
    select: "फोटो चुनें",
    crop: "फसल का प्रकार",
    analyze: "तस्वीर जांचें",
    analyzing: "तस्वीर जांच रहे हैं...",
    reset: "रीसेट करें",
    symptoms: "नमूना लक्षण",
    treatment: "सुझाव",
    prevention: "बचाव के उपाय",
    warning: "यह केवल डेमो है, प्रशिक्षित रोग निदान नहीं।",
    invalid: "यह फसल की तस्वीर नहीं लगती। कृपया स्पष्ट फसल की तस्वीर डालें।",
    error: "तस्वीर की जांच नहीं हो सकी। फिर प्रयास करें।",
    tomato: "टमाटर",
    wheat: "गेहूं",
    paddy: "धान",
    cotton: "कपास",
    groundnut: "मूंगफली",
    advice: "रसायन लगाने से पहले स्थानीय कृषि अधिकारी से सलाह लें।",
  },
  mr: {
    title: "पीक डॉक्टर",
    subtitle: "पिकाचा फोटो अपलोड करा",
    description: "प्राथमिक तपासणीसाठी पिकाचा स्पष्ट फोटो निवडा.",
    select: "फोटो निवडा",
    crop: "पिकाचा प्रकार",
    analyze: "फोटो तपासा",
    analyzing: "फोटो तपासत आहे...",
    reset: "रीसेट करा",
    symptoms: "नमुना लक्षणे",
    treatment: "सुचवलेला सल्ला",
    prevention: "प्रतिबंधक उपाय",
    warning: "हे फक्त डेमो आहे; प्रशिक्षित रोग निदान नाही.",
    invalid: "हा पिकाचा फोटो नसू शकतो. कृपया स्पष्ट फोटो अपलोड करा.",
    error: "फोटो तपासता आला नाही. पुन्हा प्रयत्न करा.",
    tomato: "टोमॅटो",
    wheat: "गहू",
    paddy: "भात",
    cotton: "कापूस",
    groundnut: "भुईमूग",
    advice: "रसायने वापरण्यापूर्वी स्थानिक कृषी अधिकाऱ्यांचा सल्ला घ्या.",
  },
  ta: {
    title: "பயிர் மருத்துவர்",
    subtitle: "பயிர் புகைப்படத்தை பதிவேற்றவும்",
    description: "ஆரம்பச் சரிபார்ப்புக்கு தெளிவான பயிர் படத்தைத் தேர்ந்தெடுக்கவும்.",
    select: "புகைப்படத்தைத் தேர்ந்தெடுக்கவும்",
    crop: "பயிர் வகை",
    analyze: "படத்தைச் சரிபார்க்கவும்",
    analyzing: "படத்தைச் சரிபார்க்கிறது...",
    reset: "மீட்டமை",
    symptoms: "மாதிரி அறிகுறிகள்",
    treatment: "பரிந்துரைக்கப்படும் ஆலோசனை",
    prevention: "தடுப்பு குறிப்புகள்",
    warning: "இது ஒரு மாதிரி மட்டுமே; பயிற்சி பெற்ற நோய் கண்டறிதல் அல்ல.",
    invalid: "இது பயிர் படமாக இல்லாமல் இருக்கலாம். தெளிவான படத்தை பதிவேற்றவும்.",
    error: "படத்தைச் சரிபார்க்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
    tomato: "தக்காளி",
    wheat: "கோதுமை",
    paddy: "நெல்",
    cotton: "பருத்தி",
    groundnut: "நிலக்கடலை",
    advice: "ரசாயனங்களைப் பயன்படுத்தும் முன் உள்ளூர் வேளாண் அதிகாரியை அணுகவும்.",
  },
  kn: {
    title: "ಬೆಳೆ ವೈದ್ಯರು",
    subtitle: "ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    description: "ಪ್ರಾಥಮಿಕ ಪರಿಶೀಲನೆಗಾಗಿ ಸ್ಪಷ್ಟವಾದ ಬೆಳೆ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    select: "ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    crop: "ಬೆಳೆಯ ವಿಧ",
    analyze: "ಚಿತ್ರ ಪರಿಶೀಲಿಸಿ",
    analyzing: "ಚಿತ್ರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    reset: "ಮರುಹೊಂದಿಸಿ",
    symptoms: "ಮಾದರಿ ಲಕ್ಷಣಗಳು",
    treatment: "ಸಲಹೆ",
    prevention: "ತಡೆಗಟ್ಟುವ ಸಲಹೆಗಳು",
    warning: "ಇದು ಡೆಮೊ ಮಾತ್ರ; ತರಬೇತಿ ಪಡೆದ ರೋಗ ನಿರ್ಣಯವಲ್ಲ.",
    invalid: "ಇದು ಬೆಳೆ ಚಿತ್ರವಾಗಿರದಿರಬಹುದು. ಸ್ಪಷ್ಟವಾದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    error: "ಚಿತ್ರವನ್ನು ಪರಿಶೀಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    tomato: "ಟೊಮೇಟೊ",
    wheat: "ಗೋಧಿ",
    paddy: "ಭತ್ತ",
    cotton: "ಹತ್ತಿ",
    groundnut: "ಕಡಲೆಕಾಯಿ",
    advice: "ರಾಸಾಯನಿಕ ಬಳಸುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
  },
  bn: {
    title: "ফসল ডাক্তার",
    subtitle: "ফসলের ছবি আপলোড করুন",
    description: "প্রাথমিক পরীক্ষার জন্য ফসলের একটি পরিষ্কার ছবি বেছে নিন।",
    select: "ছবি নির্বাচন করুন",
    crop: "ফসলের ধরন",
    analyze: "ছবি পরীক্ষা করুন",
    analyzing: "ছবি পরীক্ষা করা হচ্ছে...",
    reset: "রিসেট করুন",
    symptoms: "নমুনা লক্ষণ",
    treatment: "পরামর্শ",
    prevention: "প্রতিরোধের উপায়",
    warning: "এটি শুধু ডেমো; প্রশিক্ষিত রোগ নির্ণয় নয়।",
    invalid: "এটি ফসলের ছবি নাও হতে পারে। পরিষ্কার ফসলের ছবি আপলোড করুন।",
    error: "ছবি পরীক্ষা করা যায়নি। আবার চেষ্টা করুন।",
    tomato: "টমেটো",
    wheat: "গম",
    paddy: "ধান",
    cotton: "তুলা",
    groundnut: "চিনাবাদাম",
    advice: "রাসায়নিক ব্যবহারের আগে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নিন।",
  },
} as const;

function CropDoctor() {
  const { lang } = useI18n();
  const language = lang in text ? lang as keyof typeof text : "en";
  const words = text[language];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [crop, setCrop] = useState<CropType>("tomato");
  const [analyzing, setAnalyzing] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<CropType | null>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setMessage("Please upload a JPG or PNG image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Please upload an image smaller than 10 MB.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setMessage("");
  };

  const analyzeCrop = async () => {
    if (!selectedFile || !previewUrl) {
      setMessage("Please upload a crop photo first.");
      return;
    }

    setAnalyzing(true);
    setResult(null);
    setMessage("");

    try {
      const image = new Image();
      image.src = previewUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Could not load image."));
      });

      const model = await mobilenet.load();
      const predictions = await model.classify(image);

      const labels = predictions.map((prediction) =>
        prediction.className.toLowerCase()
      );

      const unrelatedWords = [
        "car", "truck", "bus", "road", "street", "asphalt",
        "pothole", "person", "dog", "cat", "keyboard",
        "laptop", "mobile phone", "television",
      ];

      const isUnrelated = labels.some((label) =>
        unrelatedWords.some((word) => label.includes(word))
      );

      if (isUnrelated) {
        setMessage(words.invalid);
        return;
      }

      setMessage(words.invalid);
setResult(null);
    } catch (error) {
      console.error("Image check failed:", error);
      setMessage(words.error);
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl("");
    setResult(null);
    setMessage("");
    setCrop("tomato");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sample = {
    tomato: {
      disease: "Early blight (demo)",
      symptoms: ["Dark spots may appear on older leaves.", "Yellowing may occur around affected areas."],
      treatment: "Remove affected leaves and consult a local agriculture officer about suitable treatment.",
      prevention: ["Avoid wetting leaves excessively.", "Maintain suitable spacing.", "Remove infected plant material."],
    },
    wheat: {
      disease: "Yellow rust (demo)",
      symptoms: ["Yellow or orange stripes may appear.", "Leaves may lose their green colour."],
      treatment: "Monitor the crop and seek local agricultural guidance if symptoms spread.",
      prevention: ["Use healthy seed.", "Maintain good drainage.", "Monitor the crop regularly."],
    },
    paddy: {
      disease: "Bacterial leaf blight (demo)",
      symptoms: ["Water-soaked marks may appear.", "Leaf edges may turn yellow or brown."],
      treatment: "Seek local agricultural guidance before selecting a treatment.",
      prevention: ["Avoid excessive nitrogen.", "Maintain drainage.", "Use healthy planting material."],
    },
    cotton: {
      disease: "Pink bollworm (demo)",
      symptoms: ["Cotton bolls may be damaged.", "Bolls may not open properly."],
      treatment: "Monitor affected bolls and follow locally approved pest-management advice.",
      prevention: ["Inspect crops regularly.", "Remove heavily affected bolls.", "Follow local pest-management guidance."],
    },
    groundnut: {
      disease: "Possible nutrient deficiency (demo)",
      symptoms: ["Leaves may become pale or yellow.", "Plant growth may weaken."],
      treatment: "Where possible, test the soil and follow local agricultural recommendations.",
      prevention: ["Maintain balanced nutrition.", "Use recommended fertilizer doses.", "Monitor plant growth."],
    },
  }[result ?? crop];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            🌱 {words.title}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {words.subtitle}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            {words.description}
          </p>
        </header>

        <section className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-7">
          <div
            onDrop={(event) => {
              event.preventDefault();
              handleFile(event.dataTransfer.files?.[0]);
            }}
            onDragOver={(event) => event.preventDefault()}
            className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50/60 p-6 text-center sm:p-10"
          >
            {previewUrl ? (
              <div className="mx-auto max-w-xl">
                <img
                  src={previewUrl}
                  alt="Uploaded image preview"
                  className="mx-auto max-h-80 rounded-xl object-contain shadow-sm"
                />
                <p className="mt-4 text-sm font-medium text-gray-700">
                  {selectedFile?.name}
                </p>
              </div>
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  📷
                </div>
                <p className="text-gray-700">
                  Upload a clear crop photo in JPG or PNG format.
                </p>
              </>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              {words.select}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={(event) => handleFile(event.target.files?.[0])}
              className="hidden"
            />
          </div>

          <div className="mt-7">
            <label htmlFor="crop-type" className="mb-2 block font-semibold text-gray-800">
              {words.crop}
            </label>
            <select
              id="crop-type"
              value={crop}
              onChange={(event) => setCrop(event.target.value as CropType)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800"
            >
              {crops.map((key) => (
                <option key={key} value={key}>
                  {words[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={analyzeCrop}
              disabled={analyzing}
              className="flex-1 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {analyzing ? words.analyzing : words.analyze}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
            >
              {words.reset}
            </button>
          </div>

          {message && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              {message}
            </div>
          )}
        </section>

        {analyzing && (
          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="font-semibold text-blue-900">{words.analyzing}</p>
            <p className="mt-1 text-sm text-blue-700">
              The first check may take longer while the image model loads.
            </p>
          </section>
        )}

        {result && !analyzing && (
          <section className="mt-8 rounded-2xl border border-green-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-green-50 px-5 py-5 sm:px-7">
              <p className="text-sm font-medium text-green-700">
                Demonstration result
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {sample.disease}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {words.warning}
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {words.symptoms}
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
                  {sample.symptoms.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <div className="rounded-xl bg-green-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  {words.treatment}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-700">
                  {sample.treatment}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-5 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {words.prevention}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {sample.prevention.map((item) => (
                    <li key={item} className="rounded-lg bg-white p-4 text-sm text-gray-700 shadow-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 lg:col-span-2">
                <h3 className="font-semibold text-amber-900">⚠️ {words.warning}</h3>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  {words.advice}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 p-5 sm:p-7">
              <button
                type="button"
                onClick={reset}
                className="w-full rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white hover:bg-green-700"
              >
                Analyze another image
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}