import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type RequestBody = {
  phone?: string;
  tracking_id?: string;
  trackingId?: string;
  title?: string;
  status?: string;
  language?: string;
};

type LanguageCode =
  | "en"
  | "te"
  | "hi"
  | "mr"
  | "ta"
  | "kn"
  | "bn";

function formatIndianPhone(phone: string): string {
  const cleaned = phone.replace(/\s+/g, "").trim();

  if (cleaned.startsWith("+91")) {
    return cleaned;
  }

  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+${cleaned}`;
  }

  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }

  return cleaned;
}

function getLanguage(language?: string): LanguageCode {
  if (!language) return "en";

  const value = language.toLowerCase().trim();

  const supported: LanguageCode[] = [
    "en",
    "te",
    "hi",
    "mr",
    "ta",
    "kn",
    "bn",
  ];

  return supported.includes(value as LanguageCode)
    ? (value as LanguageCode)
    : "en";
}

/*
 * Convert database status into a standard status.
 */
function normalizeStatus(status: string): "open" | "in_progress" | "resolved" {
  const value = status.toLowerCase().trim();

  if (
    value === "resolved" ||
    value === "closed" ||
    value === "complete" ||
    value === "completed"
  ) {
    return "resolved";
  }

  if (
    value === "in progress" ||
    value === "in_progress" ||
    value === "inprogress" ||
    value === "processing"
  ) {
    return "in_progress";
  }

  return "open";
}

/*
 * Localized status text.
 */
function getLocalizedStatus(
  language: LanguageCode,
  status: string,
): string {
  const normalized = normalizeStatus(status);

  const statusTranslations: Record<
    LanguageCode,
    {
      open: string;
      in_progress: string;
      resolved: string;
    }
  > = {
    en: {
      open: "Open",
      in_progress: "In Progress",
      resolved: "Resolved",
    },

    te: {
      open: "తెరిచి ఉంది",
      in_progress: "పరిష్కరిస్తున్నారు",
      resolved: "పరిష్కరించబడింది",
    },

    hi: {
      open: "खुली हुई",
      in_progress: "प्रगति में",
      resolved: "समाधान हो गया",
    },

    mr: {
      open: "उघडी आहे",
      in_progress: "प्रगतीपथावर",
      resolved: "निराकरण झाले",
    },

    ta: {
      open: "திறந்த நிலையில்",
      in_progress: "முன்னேற்றத்தில்",
      resolved: "தீர்க்கப்பட்டது",
    },

    kn: {
      open: "ತೆರೆದಿದೆ",
      in_progress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
      resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
    },

    bn: {
      open: "খোলা আছে",
      in_progress: "প্রক্রিয়াধীন",
      resolved: "সমাধান হয়েছে",
    },
  };

  return statusTranslations[language][normalized];
}

/*
 * Create multilingual SMS.
 */
function createSmsMessage(
  language: LanguageCode,
  trackingId: string,
  title: string,
  status: string,
): string {
  const normalizedStatus = normalizeStatus(status);
  const isResolved = normalizedStatus === "resolved";

  const issue = title || "Rural issue";
  const localizedStatus = getLocalizedStatus(language, status);

  // =========================================================
  // ENGLISH
  // =========================================================

  if (language === "en") {
    if (isResolved) {
      return `GramSahay AI: Your reported issue has been resolved successfully.

Tracking ID: ${trackingId}

Issue: ${issue}

Status: ${localizedStatus}

Thank you for using GramSahay AI.`;
    }

    return `GramSahay AI: Your rural issue report has been submitted successfully.

Tracking ID: ${trackingId}

Issue: ${issue}

Status: ${localizedStatus}

Use this Tracking ID in GramSahay AI to check your report status.`;
  }

  // =========================================================
  // TELUGU
  // =========================================================

  if (language === "te") {
    if (isResolved) {
      return `గ్రామసహాయ్ AI: మీరు నివేదించిన సమస్య విజయవంతంగా పరిష్కరించబడింది.

ట్రాకింగ్ ID: ${trackingId}

సమస్య: ${issue}

స్థితి: ${localizedStatus}

గ్రామసహాయ్ AIని ఉపయోగించినందుకు ధన్యవాదాలు.`;
    }

    return `గ్రామసహాయ్ AI: మీ గ్రామ సమస్య నివేదిక విజయవంతంగా సమర్పించబడింది.

ట్రాకింగ్ ID: ${trackingId}

సమస్య: ${issue}

స్థితి: ${localizedStatus}

మీ నివేదిక స్థితిని తెలుసుకోవడానికి గ్రామసహాయ్ AIలో ఈ ట్రాకింగ్ IDని ఉపయోగించండి.`;
  }

  // =========================================================
  // HINDI
  // =========================================================

  if (language === "hi") {
    if (isResolved) {
      return `ग्रामसहाय AI: आपके द्वारा दर्ज की गई समस्या का सफलतापूर्वक समाधान कर दिया गया है।

ट्रैकिंग ID: ${trackingId}

समस्या: ${issue}

स्थिति: ${localizedStatus}

ग्रामसहाय AI का उपयोग करने के लिए धन्यवाद।`;
    }

    return `ग्रामसहाय AI: आपकी ग्रामीण समस्या की रिपोर्ट सफलतापूर्वक दर्ज हो गई है।

ट्रैकिंग ID: ${trackingId}

समस्या: ${issue}

स्थिति: ${localizedStatus}

अपनी रिपोर्ट की स्थिति देखने के लिए ग्रामसहाय AI में इस ट्रैकिंग ID का उपयोग करें।`;
  }

  // =========================================================
  // MARATHI
  // =========================================================

  if (language === "mr") {
    if (isResolved) {
      return `ग्रामसहाय AI: आपण नोंदवलेली समस्या यशस्वीरित्या सोडवण्यात आली आहे.

ट्रॅकिंग ID: ${trackingId}

समस्या: ${issue}

स्थिती: ${localizedStatus}

ग्रामसहाय AI वापरल्याबद्दल धन्यवाद.`;
    }

    return `ग्रामसहाय AI: आपल्या ग्रामीण समस्येचा अहवाल यशस्वीरित्या नोंदवला गेला आहे.

ट्रॅकिंग ID: ${trackingId}

समस्या: ${issue}

स्थिती: ${localizedStatus}

आपल्या अहवालाची स्थिती तपासण्यासाठी ग्रामसहाय AI मध्ये हा ट्रॅकिंग ID वापरा.`;
  }

  // =========================================================
  // TAMIL
  // =========================================================

  if (language === "ta") {
    if (isResolved) {
      return `கிராமசஹாய் AI: நீங்கள் தெரிவித்த பிரச்சினை வெற்றிகரமாக தீர்க்கப்பட்டுள்ளது.

கண்காணிப்பு ID: ${trackingId}

பிரச்சினை: ${issue}

நிலை: ${localizedStatus}

கிராமசஹாய் AI-ஐ பயன்படுத்தியதற்கு நன்றி.`;
    }

    return `கிராமசஹாய் AI: உங்கள் கிராமப்புற பிரச்சினை அறிக்கை வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது.

கண்காணிப்பு ID: ${trackingId}

பிரச்சினை: ${issue}

நிலை: ${localizedStatus}

உங்கள் அறிக்கையின் நிலையைப் பார்க்க கிராமசஹாய் AI-ல் இந்த கண்காணிப்பு ID-ஐ பயன்படுத்தவும்.`;
  }

  // =========================================================
  // KANNADA
  // =========================================================

  if (language === "kn") {
    if (isResolved) {
      return `ಗ್ರಾಮಸಹಾಯ್ AI: ನೀವು ವರದಿ ಮಾಡಿದ ಸಮಸ್ಯೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಹರಿಸಲಾಗಿದೆ.

ಟ್ರ್ಯಾಕಿಂಗ್ ID: ${trackingId}

ಸಮಸ್ಯೆ: ${issue}

ಸ್ಥಿತಿ: ${localizedStatus}

ಗ್ರಾಮಸಹಾಯ್ AI ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.`;
    }

    return `ಗ್ರಾಮಸಹಾಯ್ AI: ನಿಮ್ಮ ಗ್ರಾಮೀಣ ಸಮಸ್ಯೆಯ ವರದಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.

ಟ್ರ್ಯಾಕಿಂಗ್ ID: ${trackingId}

ಸಮಸ್ಯೆ: ${issue}

ಸ್ಥಿತಿ: ${localizedStatus}

ನಿಮ್ಮ ವರದಿಯ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ಗ್ರಾಮಸಹಾಯ್ AI ನಲ್ಲಿ ಈ ಟ್ರ್ಯಾಕಿಂಗ್ ID ಬಳಸಿ.`;
  }

  // =========================================================
  // BENGALI
  // =========================================================

  if (language === "bn") {
    if (isResolved) {
      return `গ্রামসহায় AI: আপনার রিপোর্ট করা সমস্যাটি সফলভাবে সমাধান করা হয়েছে।

ট্র্যাকিং ID: ${trackingId}

সমস্যা: ${issue}

অবস্থা: ${localizedStatus}

গ্রামসহায় AI ব্যবহার করার জন্য ধন্যবাদ।`;
    }

    return `গ্রামসহায় AI: আপনার গ্রামীণ সমস্যার রিপোর্ট সফলভাবে জমা হয়েছে।

ট্র্যাকিং ID: ${trackingId}

সমস্যা: ${issue}

অবস্থা: ${localizedStatus}

আপনার রিপোর্টের অবস্থা দেখতে গ্রামসহায় AI-তে এই ট্র্যাকিং ID ব্যবহার করুন।`;
  }

  // =========================================================
  // FALLBACK
  // =========================================================

  return `GramSahay AI: Your rural issue report has been submitted successfully.

Tracking ID: ${trackingId}

Issue: ${issue}

Status: ${localizedStatus}

Use this Tracking ID in GramSahay AI to check your report status.`;
}

serve(async (req: Request) => {
  // =========================================================
  // OPTIONS / CORS
  // =========================================================

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  // =========================================================
  // ONLY POST
  // =========================================================

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    // =======================================================
    // TEXTBEE SECRETS
    // =======================================================

    const apiKey = Deno.env.get("TEXTBEE_API_KEY");
    const deviceId = Deno.env.get("TEXTBEE_DEVICE_ID");

    if (!apiKey || !deviceId) {
      console.error("Missing TextBee secrets");

      return new Response(
        JSON.stringify({
          success: false,
          error: "TextBee configuration is missing",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // READ REQUEST BODY
    // =======================================================

    const rawBody = await req.text();

    let body: RequestBody;

    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      console.error("Invalid JSON:", error);

      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid JSON body",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // GET VALUES
    // =======================================================

    const phone = body.phone?.trim() || "";

    const trackingId =
      body.tracking_id?.trim() ||
      body.trackingId?.trim() ||
      "";

    const title = body.title?.trim() || "Rural issue";

    const status = body.status?.trim() || "Open";

    const language = getLanguage(body.language);

    console.log("================================");
    console.log("GRAMSAHAY SMS REQUEST");
    console.log("Language:", language);
    console.log("Tracking ID:", trackingId);
    console.log("Status:", status);
    console.log("Phone:", phone);
    console.log("================================");

    // =======================================================
    // VALIDATE PHONE
    // =======================================================

    if (!phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Phone number is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // VALIDATE TRACKING ID
    // =======================================================

    if (!trackingId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Tracking ID is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // FORMAT PHONE
    // =======================================================

    const formattedPhone = formatIndianPhone(phone);

    if (!/^\+\d{10,15}$/.test(formattedPhone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid phone number",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // CREATE MULTILINGUAL SMS
    // =======================================================

    const message = createSmsMessage(
      language,
      trackingId,
      title,
      status,
    );

    console.log("SMS MESSAGE:");
    console.log(message);

    // =======================================================
    // SEND TO TEXTBEE
    // =======================================================

    const textBeeResponse = await fetch(
      "https://api.textbee.dev/api/v1/gateway/send-sms",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },

        body: JSON.stringify({
          recipients: [formattedPhone],
          message,
          deviceId,
        }),
      },
    );

    // =======================================================
    // READ TEXTBEE RESPONSE
    // =======================================================

    const textBeeText = await textBeeResponse.text();

    let textBeeData: unknown = null;

    try {
      textBeeData = JSON.parse(textBeeText);
    } catch {
      textBeeData = textBeeText;
    }

    // =======================================================
    // TEXTBEE ERROR
    // =======================================================

    if (!textBeeResponse.ok) {
      console.error(
        "TextBee rejected SMS:",
        textBeeResponse.status,
        textBeeData,
      );

      return new Response(
        JSON.stringify({
          success: false,
          error: "TextBee rejected the SMS request",
          textbee: textBeeData,
        }),
        {
          status: 502,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =======================================================
    // SUCCESS
    // =======================================================

    console.log("SMS SENT SUCCESSFULLY");
    console.log("Language:", language);
    console.log("Tracking ID:", trackingId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "SMS request accepted by TextBee",
        phone: formattedPhone,
        tracking_id: trackingId,
        language,
        status: normalizeStatus(status),
        textbee: textBeeData,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("SEND REPORT SMS ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});