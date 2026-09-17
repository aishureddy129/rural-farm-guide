import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  languages,
  useI18n,
  type LanguageCode,
} from "@/lib/i18n";

import heroImage from "@/assets/hero-fields.jpg";

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/")({
  component: RoleSelectionPage,
});

/* =========================================================
   ROLE TEXT TYPE
========================================================= */

type RoleText = {
  welcome: string;
  choose: string;

  citizen: string;
  citizenDescription: string;
  citizenButton: string;

  admin: string;
  adminDescription: string;
  adminButton: string;
};

/* =========================================================
   ROLE TRANSLATIONS
========================================================= */

const roleTexts: Record<LanguageCode, RoleText> = {
  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {
    welcome: "Welcome to GramSahay AI",

    choose:
      "Please select how you want to continue",

    citizen: "Citizen",

    citizenDescription:
      "Access rural assistance services, farming information, government schemes, weather, market prices and more.",

    citizenButton:
      "Continue as Citizen",

    admin: "Admin / Official",

    adminDescription:
      "Authorized officials can monitor rural issues, manage reports, assign departments and update resolution status.",

    adminButton:
      "Continue as Admin",
  },

  /* =======================================================
     TELUGU
  ======================================================= */

  te: {
    welcome:
      "గ్రామసహాయ్ AIకి స్వాగతం",

    choose:
      "మీరు ఎలా కొనసాగాలనుకుంటున్నారో ఎంచుకోండి",

    citizen:
      "పౌరుడు",

    citizenDescription:
      "గ్రామీణ సహాయ సేవలు, వ్యవసాయ సమాచారం, ప్రభుత్వ పథకాలు, వాతావరణం, మార్కెట్ ధరలు మరియు మరిన్నింటిని పొందండి.",

    citizenButton:
      "పౌరుడిగా కొనసాగండి",

    admin:
      "అడ్మిన్ / అధికారి",

    adminDescription:
      "అధికారులు గ్రామీణ సమస్యలను పర్యవేక్షించి, నివేదికలను నిర్వహించి, శాఖలను కేటాయించి, పరిష్కార స్థితిని నవీకరించవచ్చు.",

    adminButton:
      "అడ్మిన్‌గా కొనసాగండి",
  },

  /* =======================================================
     HINDI
  ======================================================= */

  hi: {
    welcome:
      "ग्रामसहाय AI में आपका स्वागत है",

    choose:
      "कृपया चुनें कि आप कैसे आगे बढ़ना चाहते हैं",

    citizen:
      "नागरिक",

    citizenDescription:
      "ग्रामीण सहायता सेवाएँ, खेती की जानकारी, सरकारी योजनाएँ, मौसम, मंडी भाव और बहुत कुछ प्राप्त करें।",

    citizenButton:
      "नागरिक के रूप में जारी रखें",

    admin:
      "एडमिन / अधिकारी",

    adminDescription:
      "अधिकृत अधिकारी ग्रामीण समस्याओं की निगरानी, रिपोर्ट प्रबंधन, विभाग आवंटन और समाधान की स्थिति अपडेट कर सकते हैं।",

    adminButton:
      "एडमिन के रूप में जारी रखें",
  },

  /* =======================================================
     MARATHI
  ======================================================= */

  mr: {
    welcome:
      "ग्रामसहाय AI मध्ये आपले स्वागत आहे",

    choose:
      "कृपया तुम्हाला कसे पुढे जायचे आहे ते निवडा",

    citizen:
      "नागरिक",

    citizenDescription:
      "ग्रामीण मदत सेवा, शेतीची माहिती, शासकीय योजना, हवामान, बाजारभाव आणि बरेच काही मिळवा.",

    citizenButton:
      "नागरिक म्हणून पुढे जा",

    admin:
      "अ‍ॅडमिन / अधिकारी",

    adminDescription:
      "अधिकृत अधिकारी ग्रामीण समस्या पाहू शकतात, अहवाल व्यवस्थापित करू शकतात, विभाग नियुक्त करू शकतात आणि निराकरणाची स्थिती अपडेट करू शकतात.",

    adminButton:
      "अ‍ॅडमिन म्हणून पुढे जा",
  },

  /* =======================================================
     TAMIL
  ======================================================= */

  ta: {
    welcome:
      "கிராமசகாய் AI-க்கு வரவேற்கிறோம்",

    choose:
      "நீங்கள் எவ்வாறு தொடர விரும்புகிறீர்கள் என்பதைத் தேர்ந்தெடுக்கவும்",

    citizen:
      "குடிமகன்",

    citizenDescription:
      "கிராம உதவி சேவைகள், விவசாயத் தகவல்கள், அரசு திட்டங்கள், வானிலை, சந்தை விலைகள் மற்றும் பலவற்றைப் பெறுங்கள்.",

    citizenButton:
      "குடிமகனாக தொடரவும்",

    admin:
      "நிர்வாகி / அதிகாரி",

    adminDescription:
      "அங்கீகரிக்கப்பட்ட அதிகாரிகள் கிராமப் பிரச்சினைகளை கண்காணித்து, புகார்களை நிர்வகித்து, துறைகளை ஒதுக்கி, தீர்வு நிலையைப் புதுப்பிக்கலாம்.",

    adminButton:
      "நிர்வாகியாக தொடரவும்",
  },

  /* =======================================================
     KANNADA
  ======================================================= */

  kn: {
    welcome:
      "ಗ್ರಾಮಸಹಾಯ್ AI ಗೆ ಸ್ವಾಗತ",

    choose:
      "ನೀವು ಹೇಗೆ ಮುಂದುವರಿಯಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",

    citizen:
      "ನಾಗರಿಕ",

    citizenDescription:
      "ಗ್ರಾಮೀಣ ನೆರವು ಸೇವೆಗಳು, ಕೃಷಿ ಮಾಹಿತಿ, ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ಹವಾಮಾನ, ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಇನ್ನಷ್ಟು ಪಡೆಯಿರಿ.",

    citizenButton:
      "ನಾಗರಿಕರಾಗಿ ಮುಂದುವರಿಯಿರಿ",

    admin:
      "ಅಡ್ಮಿನ್ / ಅಧಿಕಾರಿ",

    adminDescription:
      "ಅಧಿಕೃತ ಅಧಿಕಾರಿಗಳು ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ, ವರದಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ಇಲಾಖೆಯನ್ನು ನಿಯೋಜಿಸಿ ಮತ್ತು ಪರಿಹಾರದ ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಬಹುದು.",

    adminButton:
      "ಅಡ್ಮಿನ್ ಆಗಿ ಮುಂದುವರಿಯಿರಿ",
  },

  /* =======================================================
     BENGALI
  ======================================================= */

  bn: {
    welcome:
      "গ্রামসহায় AI-তে স্বাগতম",

    choose:
      "আপনি কীভাবে এগিয়ে যেতে চান তা নির্বাচন করুন",

    citizen:
      "নাগরিক",

    citizenDescription:
      "গ্রামীণ সহায়তা পরিষেবা, কৃষি তথ্য, সরকারি প্রকল্প, আবহাওয়া, বাজারদর এবং আরও অনেক কিছু পান।",

    citizenButton:
      "নাগরিক হিসেবে চালিয়ে যান",

    admin:
      "অ্যাডমিন / আধিকারিক",

    adminDescription:
      "অনুমোদিত আধিকারিকরা গ্রামীণ সমস্যাগুলি পর্যবেক্ষণ, রিপোর্ট পরিচালনা, বিভাগ নির্ধারণ এবং সমাধানের অবস্থা আপডেট করতে পারেন।",

    adminButton:
      "অ্যাডমিন হিসেবে চালিয়ে যান",
  },
};

/* =========================================================
   ROLE SELECTION PAGE
========================================================= */

function RoleSelectionPage() {
  const navigate = useNavigate();

  const {
    lang,
    setLang,
    t,
  } = useI18n();

  const currentText =
    roleTexts[lang] ?? roleTexts.en;

  /* =======================================================
     CITIZEN LOGIN
  ======================================================= */

  function handleCitizen() {
    navigate({
      to: "/login",
    });
  }

  /* =======================================================
     ADMIN LOGIN
  ======================================================= */

  function handleAdmin() {
    navigate({
      to: "/admin-login",
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-black/55" />

      {/* =====================================================
          EXTRA GREEN / BLACK GRADIENT
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ===================================================
            TOP BAR
        =================================================== */}

        <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-lg">

              <span className="text-2xl font-bold">
                G
              </span>

            </div>

            <div>

              <div className="text-xl font-bold tracking-tight sm:text-2xl">
                GramSahay AI
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                Smart Rural Assistance
              </div>

            </div>

          </div>

          {/* =================================================
              LANGUAGE SELECTOR
          ================================================= */}

          <div className="rounded-2xl border border-white/30 bg-black/20 px-3 py-2 backdrop-blur-md shadow-lg">

            <div className="flex items-center gap-2">

              <span className="text-sm">
                🌐
              </span>

              <select
                value={lang}
                onChange={(event) =>
                  setLang(
                    event.target.value as LanguageCode,
                  )
                }
                aria-label={t(
                  "common.language",
                )}
                className="cursor-pointer bg-transparent text-sm font-medium text-white outline-none"
              >

                {languages.map(
                  (language) => (
                    <option
                      key={language.code}
                      value={language.code}
                      className="bg-white text-black"
                    >
                      {language.native}
                    </option>
                  ),
                )}

              </select>

            </div>

          </div>

        </header>

        {/* ===================================================
            CENTER CONTENT
        =================================================== */}

        <div className="flex flex-1 items-center justify-center px-4 pb-12 pt-4 sm:px-6 lg:px-10">

          <div className="w-full max-w-6xl">

            {/* =================================================
                BRAND INTRO
            ================================================= */}

            <div className="mx-auto max-w-4xl text-center">

              <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">

                GramSahay AI

              </h1>

              <p className="mt-3 text-xl font-medium text-white/90 sm:text-2xl">

                {t("brand.tagline")}

              </p>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">

                {t("brand.blurb")}

              </p>

            </div>

            {/* =================================================
                WELCOME
            ================================================= */}

            <div className="mt-10 text-center sm:mt-12">

              <h2 className="text-2xl font-bold drop-shadow-md sm:text-3xl md:text-4xl">

                {currentText.welcome}

              </h2>

              <p className="mt-2 text-sm text-white/80 sm:text-base">

                {currentText.choose}

              </p>

            </div>

            {/* =================================================
                ROLE CARDS
            ================================================= */}

            <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:mt-10 md:grid-cols-2 md:gap-6">

              {/* =================================================
                  CITIZEN CARD
              ================================================= */}

              <button
                type="button"
                onClick={handleCitizen}
                className="group rounded-3xl border border-white/25 bg-black/35 p-6 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-black/45 sm:p-8"
              >

                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">

                  👨‍🌾

                </div>

                {/* TITLE */}

                <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">

                  {currentText.citizen}

                </h3>

                {/* DESCRIPTION */}

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/80 sm:text-base">

                  {currentText.citizenDescription}

                </p>

                {/* BUTTON */}

                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all group-hover:bg-green-500 sm:text-base">

                  <span>
                    {currentText.citizenButton}
                  </span>

                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </button>

              {/* =================================================
                  ADMIN CARD
              ================================================= */}

              <button
                type="button"
                onClick={handleAdmin}
                className="group rounded-3xl border border-white/25 bg-black/35 p-6 text-left shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-black/45 sm:p-8"
              >

                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">

                  🏛️

                </div>

                {/* TITLE */}

                <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">

                  {currentText.admin}

                </h3>

                {/* DESCRIPTION */}

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/80 sm:text-base">

                  {currentText.adminDescription}

                </p>

                {/* BUTTON */}

                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition-all group-hover:bg-white group-hover:text-black sm:text-base">

                  <span>
                    {currentText.adminButton}
                  </span>

                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </button>

            </div>

            {/* =================================================
                TRUST LINE
            ================================================= */}

            <div className="mt-8 text-center">

              <p className="text-xs text-white/60 sm:text-sm">

                {t("brand.name")} • {t("footer.note")}

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}