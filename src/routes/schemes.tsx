import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useT } from "../lib/i18n";

export const Route = createFileRoute("/schemes")({
  component: SchemesPage,
});

type FarmerProfile = {
  state: string;
  age: string;
  category: string;
  land: string;
  crop: string;
  irrigation: string;
  income: string;
};

type SchemeResult = {
  key: string;
  fallback: string;
  status: "eligible" | "likely" | "notEligible";
  benefit: string;
  officialUrl: string;
};

type LanguageCode =
  | "en"
  | "te"
  | "ta"
  | "hi"
  | "kn"
  | "mr"
  | "bn";

function SchemesPage() {
  const t = useT();

  /*
   * Safe translation function.
   * This avoids TypeScript errors when a translation key
   * is not included in TranslationKey.
   */
  const translate = (key: string, fallback: string): string => {
    try {
      const translator = t as unknown as (
        key: string
      ) => string;

      const value = translator(key);

      if (!value || value === key) {
        return fallback;
      }

      return value;
    } catch {
      return fallback;
    }
  };

  /*
   * Detect the current language from an already translated
   * text on this page.
   *
   * This works even if your current i18n system does not
   * expose the language directly.
   */
  const getCurrentLanguage = (): LanguageCode => {
    const categoryText = translate(
      "schemes.category",
      "Farmer Category"
    );

    if (
      categoryText.includes("రైతు") ||
      categoryText.includes("వర్గం")
    ) {
      return "te";
    }

    if (
      categoryText.includes("விவசாயி") ||
      categoryText.includes("வகை")
    ) {
      return "ta";
    }

    if (
      categoryText.includes("किसान") ||
      categoryText.includes("श्रेणी")
    ) {
      return "hi";
    }

    if (
      categoryText.includes("ರೈತ") ||
      categoryText.includes("ವರ್ಗ")
    ) {
      return "kn";
    }

    if (
      categoryText.includes("शेतकरी") ||
      categoryText.includes("वर्ग")
    ) {
      return "mr";
    }

    if (
      categoryText.includes("কৃষক") ||
      categoryText.includes("শ্রেণী") ||
      categoryText.includes("শ্রেণি")
    ) {
      return "bn";
    }

    return "en";
  };

  const language = getCurrentLanguage();

  /*
   * Farmer Category translations.
   *
   * These are intentionally kept inside this page so the
   * category options work even when the corresponding
   * schemes.* translation keys are missing.
   */
  const farmerCategoryTranslations: Record<
    LanguageCode,
    {
      select: string;
      small: string;
      marginal: string;
      medium: string;
      large: string;
      government: string;
    }
  > = {
    en: {
      select: "Select Farmer Category",
      small: "Small Farmer",
      marginal: "Marginal Farmer",
      medium: "Medium Farmer",
      large: "Large Farmer",
      government: "Government / Institutional",
    },

    te: {
      select: "రైతు వర్గాన్ని ఎంచుకోండి",
      small: "సన్నకారు రైతు",
      marginal: "చిన్న రైతు",
      medium: "మధ్య తరహా రైతు",
      large: "పెద్ద రైతు",
      government: "ప్రభుత్వ / సంస్థాగత రైతు",
    },

    ta: {
      select: "விவசாயி வகையைத் தேர்ந்தெடுக்கவும்",
      small: "சிறு விவசாயி",
      marginal: "குறு விவசாயி",
      medium: "நடுத்தர விவசாயி",
      large: "பெரிய விவசாயி",
      government: "அரசு / நிறுவன விவசாயி",
    },

    hi: {
      select: "किसान श्रेणी चुनें",
      small: "छोटे किसान",
      marginal: "सीमांत किसान",
      medium: "मध्यम किसान",
      large: "बड़े किसान",
      government: "सरकारी / संस्थागत किसान",
    },

    kn: {
      select: "ರೈತ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      small: "ಸಣ್ಣ ರೈತ",
      marginal: "ಅತಿ ಸಣ್ಣ ರೈತ",
      medium: "ಮಧ್ಯಮ ರೈತ",
      large: "ದೊಡ್ಡ ರೈತ",
      government: "ಸರ್ಕಾರಿ / ಸಂಸ್ಥೆಯ ರೈತ",
    },

    mr: {
      select: "शेतकरी वर्ग निवडा",
      small: "लहान शेतकरी",
      marginal: "अल्पभूधारक शेतकरी",
      medium: "मध्यम शेतकरी",
      large: "मोठे शेतकरी",
      government: "सरकारी / संस्थात्मक शेतकरी",
    },

    bn: {
      select: "কৃষকের শ্রেণী নির্বাচন করুন",
      small: "ক্ষুদ্র কৃষক",
      marginal: "প্রান্তিক কৃষক",
      medium: "মাঝারি কৃষক",
      large: "বড় কৃষক",
      government: "সরকারি / প্রাতিষ্ঠানিক কৃষক",
    },
  };

  const farmerCategory =
    farmerCategoryTranslations[language];

  const [profile, setProfile] =
    useState<FarmerProfile>({
      state: "",
      age: "",
      category: "",
      land: "",
      crop: "",
      irrigation: "",
      income: "",
    });

  const [results, setResults] =
    useState<SchemeResult[]>([]);

  const [selectedScheme, setSelectedScheme] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const updateProfile = (
    field: keyof FarmerProfile,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const resetProfile = () => {
    setProfile({
      state: "",
      age: "",
      category: "",
      land: "",
      crop: "",
      irrigation: "",
      income: "",
    });

    setResults([]);
    setSelectedScheme(null);
    setSubmitted(false);
  };

  const findEligibleSchemes = () => {
    if (
      !profile.state ||
      !profile.age ||
      !profile.category ||
      !profile.land ||
      !profile.crop ||
      !profile.irrigation ||
      !profile.income
    ) {
      alert(
        translate(
          "schemes.errorRequired",
          "Please fill in all required details."
        )
      );
      return;
    }

    const age = Number(profile.age);
    const land = Number(profile.land);

    const schemeResults: SchemeResult[] = [];

    /*
     * PM-KISAN
     */
    schemeResults.push({
      key: "schemes.pmkisan",
      fallback: "PM-KISAN",
      status:
        age >= 18 &&
        land > 0 &&
        profile.category !== "government"
          ? "eligible"
          : "notEligible",
      benefit: "schemes.pmkisanBenefit",
      officialUrl: "https://pmkisan.gov.in/",
    });

    /*
     * PMFBY
     */
    schemeResults.push({
      key: "schemes.pmfby",
      fallback:
        "Pradhan Mantri Fasal Bima Yojana",
      status:
        profile.crop !== "none"
          ? "likely"
          : "notEligible",
      benefit: "schemes.pmfbyBenefit",
      officialUrl: "https://pmfby.gov.in/",
    });

    /*
     * PMKSY
     */
    schemeResults.push({
      key: "schemes.pmksy",
      fallback:
        "Pradhan Mantri Krishi Sinchayee Yojana",
      status:
        profile.irrigation === "none" ||
        profile.irrigation === "rainfed"
          ? "eligible"
          : "likely",
      benefit: "schemes.pmksyBenefit",
      officialUrl: "https://pmksy.gov.in/",
    });

    /*
     * Soil Health Card
     */
    schemeResults.push({
      key: "schemes.soilHealth",
      fallback: "Soil Health Card",
      status:
        land > 0
          ? "eligible"
          : "notEligible",
      benefit: "schemes.soilHealthBenefit",
      officialUrl:
        "https://soilhealth.dac.gov.in/",
    });

    /*
     * Kisan Credit Card
     */
    schemeResults.push({
      key: "schemes.kcc",
      fallback: "Kisan Credit Card",
      status:
        age >= 18 &&
        land > 0 &&
        profile.category !== "government"
          ? "likely"
          : "notEligible",
      benefit: "schemes.kccBenefit",
      officialUrl:
        "https://www.myscheme.gov.in/schemes/kcc",
    });

    setResults(schemeResults);
    setSubmitted(true);
    setSelectedScheme(null);
  };

  const getStatusText = (
    status: SchemeResult["status"]
  ) => {
    if (status === "eligible") {
      return translate(
        "schemes.eligible",
        "Eligible"
      );
    }

    if (status === "likely") {
      return translate(
        "schemes.likelyEligible",
        "Likely Eligible"
      );
    }

    return translate(
      "schemes.notEligible",
      "Not Eligible"
    );
  };

  const getStatusClass = (
    status: SchemeResult["status"]
  ) => {
    if (status === "eligible") {
      return "bg-green-100 text-green-700";
    }

    if (status === "likely") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* HEADER */}
        <div className="mb-8">

          <p className="mb-2 text-sm font-medium text-primary">
            {translate(
              "schemes.eligibility",
              "Eligibility"
            )}
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            {translate(
              "schemes.title",
              "Government Scheme Finder"
            )}
          </h1>

          <p className="mt-3 max-w-3xl text-muted-foreground">
            {translate(
              "schemes.description",
              "Tell us about your land, crop and income to find suitable government schemes."
            )}
          </p>

        </div>

        {/* FARMER DETAILS */}
        <div className="mb-8 rounded-xl border bg-card p-6 shadow-sm">

          <h2 className="mb-2 text-xl font-semibold">
            {translate(
              "schemes.farmerProfile",
              "Farmer Details"
            )}
          </h2>

          <p className="mb-6 text-muted-foreground">
            {translate(
              "schemes.profileDescription",
              "Complete the following details to find schemes suitable for you."
            )}
          </p>

          <div className="grid gap-5 md:grid-cols-2">

            {/* STATE */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.state",
                  "State"
                )}
              </label>

              <select
                value={profile.state}
                onChange={(e) =>
                  updateProfile(
                    "state",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >

                <option value="">
                  {translate(
                    "schemes.selectState",
                    "Select State"
                  )}
                </option>

                <option value="andhra">
                  {translate(
                    "schemes.andhra",
                    "Andhra Pradesh"
                  )}
                </option>

                <option value="telangana">
                  {translate(
                    "schemes.telangana",
                    "Telangana"
                  )}
                </option>

                <option value="tamilnadu">
                  {translate(
                    "schemes.tamilnadu",
                    "Tamil Nadu"
                  )}
                </option>

                <option value="karnataka">
                  {translate(
                    "schemes.karnataka",
                    "Karnataka"
                  )}
                </option>

                <option value="maharashtra">
                  {translate(
                    "schemes.maharashtra",
                    "Maharashtra"
                  )}
                </option>

                <option value="westbengal">
                  {translate(
                    "schemes.westbengal",
                    "West Bengal"
                  )}
                </option>

                <option value="other">
                  {translate(
                    "schemes.other",
                    "Other"
                  )}
                </option>

              </select>

            </div>

            {/* AGE */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.age",
                  "Age"
                )}
              </label>

              <input
                type="number"
                min="18"
                value={profile.age}
                onChange={(e) =>
                  updateProfile(
                    "age",
                    e.target.value
                  )
                }
                placeholder={translate(
                  "schemes.agePlaceholder",
                  "Enter age"
                )}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />

            </div>

            {/* FARMER CATEGORY */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.category",
                  "Farmer Category"
                )}
              </label>

              <select
                value={profile.category}
                onChange={(e) =>
                  updateProfile(
                    "category",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >

                <option value="">
                  {farmerCategory.select}
                </option>

                <option value="small">
                  {farmerCategory.small}
                </option>

                <option value="marginal">
                  {farmerCategory.marginal}
                </option>

                <option value="medium">
                  {farmerCategory.medium}
                </option>

                <option value="large">
                  {farmerCategory.large}
                </option>

                <option value="government">
                  {farmerCategory.government}
                </option>

              </select>

            </div>

            {/* LAND */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.land",
                  "Land Area (acres)"
                )}
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={profile.land}
                onChange={(e) =>
                  updateProfile(
                    "land",
                    e.target.value
                  )
                }
                placeholder={translate(
                  "schemes.landPlaceholder",
                  "Enter land area"
                )}
                className="w-full rounded-lg border bg-background px-3 py-2"
              />

            </div>

            {/* CROP */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.crop",
                  "Crop Type"
                )}
              </label>

              <select
                value={profile.crop}
                onChange={(e) =>
                  updateProfile(
                    "crop",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >

                <option value="">
                  {translate(
                    "schemes.selectCrop",
                    "Select Crop"
                  )}
                </option>

                <option value="paddy">
                  {translate(
                    "schemes.paddy",
                    "Paddy"
                  )}
                </option>

                <option value="wheat">
                  {translate(
                    "schemes.wheat",
                    "Wheat"
                  )}
                </option>

                <option value="cotton">
                  {translate(
                    "schemes.cotton",
                    "Cotton"
                  )}
                </option>

                <option value="maize">
                  {translate(
                    "schemes.maize",
                    "Maize"
                  )}
                </option>

                <option value="vegetables">
                  {translate(
                    "schemes.vegetables",
                    "Vegetables"
                  )}
                </option>

                <option value="pulses">
                  {translate(
                    "schemes.pulses",
                    "Pulses"
                  )}
                </option>

                <option value="none">
                  {translate(
                    "schemes.noCrop",
                    "No Crop"
                  )}
                </option>

              </select>

            </div>

            {/* IRRIGATION */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.irrigation",
                  "Irrigation Type"
                )}
              </label>

              <select
                value={profile.irrigation}
                onChange={(e) =>
                  updateProfile(
                    "irrigation",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >

                <option value="">
                  {translate(
                    "schemes.selectIrrigation",
                    "Select Irrigation Type"
                  )}
                </option>

                <option value="borewell">
                  {translate(
                    "schemes.borewell",
                    "Borewell"
                  )}
                </option>

                <option value="canal">
                  {translate(
                    "schemes.canal",
                    "Canal"
                  )}
                </option>

                <option value="drip">
                  {translate(
                    "schemes.drip",
                    "Drip Irrigation"
                  )}
                </option>

                <option value="rainfed">
                  {translate(
                    "schemes.rainfed",
                    "Rainfed"
                  )}
                </option>

                <option value="none">
                  {translate(
                    "schemes.noIrrigation",
                    "No Irrigation"
                  )}
                </option>

              </select>

            </div>

            {/* INCOME */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                {translate(
                  "schemes.income",
                  "Annual Income Range"
                )}
              </label>

              <select
                value={profile.income}
                onChange={(e) =>
                  updateProfile(
                    "income",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border bg-background px-3 py-2"
              >

                <option value="">
                  {translate(
                    "schemes.selectIncome",
                    "Select Income Range"
                  )}
                </option>

                <option value="below1">
                  {translate(
                    "schemes.below1",
                    "Below ₹1 lakh"
                  )}
                </option>

                <option value="1to3">
                  {translate(
                    "schemes.1to3",
                    "₹1 lakh – ₹3 lakh"
                  )}
                </option>

                <option value="3to5">
                  {translate(
                    "schemes.3to5",
                    "₹3 lakh – ₹5 lakh"
                  )}
                </option>

                <option value="above5">
                  {translate(
                    "schemes.above5",
                    "Above ₹5 lakh"
                  )}
                </option>

              </select>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={findEligibleSchemes}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              {translate(
                "schemes.find",
                "Find Eligible Schemes"
              )}
            </button>

            <button
              type="button"
              onClick={resetProfile}
              className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted"
            >
              {translate(
                "schemes.reset",
                "Reset Details"
              )}
            </button>

          </div>

        </div>

        {/* RESULTS */}
        {submitted && (
          <div className="mb-8">

            <h2 className="mb-5 text-2xl font-bold">
              {translate(
                "schemes.eligibilityMatch",
                "Eligibility Results"
              )}
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {results.map((scheme) => (

                <div
                  key={scheme.key}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >

                  <h3 className="mb-4 text-lg font-semibold">
                    {translate(
                      scheme.key,
                      scheme.fallback
                    )}
                  </h3>

                  <div
                    className={`mb-5 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                      scheme.status
                    )}`}
                  >
                    {getStatusText(
                      scheme.status
                    )}
                  </div>

                  <div>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedScheme(
                          selectedScheme === scheme.key
                            ? null
                            : scheme.key
                        )
                      }
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      {selectedScheme === scheme.key
                        ? translate(
                            "schemes.hideDetails",
                            "Hide Details"
                          )
                        : translate(
                            "schemes.viewDetails",
                            "View Details"
                          )}
                    </button>

                  </div>

                  {selectedScheme === scheme.key && (

                    <div className="mt-5 rounded-lg border bg-muted/40 p-4">

                      <p className="mb-2 text-sm font-semibold">
                        {translate(
                          "schemes.estimatedBenefit",
                          "Estimated Benefit"
                        )}
                      </p>

                      <p className="text-sm leading-6 text-muted-foreground">
                        {translate(
                          scheme.benefit,
                          "Benefits depend on official government guidelines and eligibility."
                        )}
                      </p>

                      <p className="mt-4 text-sm font-semibold">
                        {translate(
                          "schemes.applicationGuidance",
                          "Application Method"
                        )}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {translate(
                          "schemes.demoText",
                          "The information shown here is for demonstration only. Please verify the details on the official government portal or local agriculture office before applying."
                        )}
                      </p>

                      <a
                        href={scheme.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                      >
                        {translate(
                          "schemes.applyOfficial",
                          "Apply on Official Portal →"
                        )}
                      </a>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>
        )}

        {/* APPLICATION */}
        <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">

          <h2 className="mb-3 text-xl font-semibold">
            {translate(
              "schemes.application",
              "Application Method"
            )}
          </h2>

          <p className="text-muted-foreground">
            {translate(
              "schemes.demoText",
              "The information shown here is for demonstration only. Please verify the details on the official government portal or local agriculture office before applying."
            )}
          </p>

        </div>

      </div>
    </div>
  );
}