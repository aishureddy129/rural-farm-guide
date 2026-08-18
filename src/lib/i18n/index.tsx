import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  languages,
  type LanguageCode,
  type TranslationKey,
} from "./translations";

export { languages };
export type { LanguageCode, TranslationKey };

const STORAGE_KEY = "gramsahay.lang";

type I18nValue = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLanguage(value: string | null): value is LanguageCode {
  return !!value && languages.some((l) => l.code === value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) setLangState(stored);
  }, []);

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => {},
      t: (key: TranslationKey) => dictionaries.en[key] ?? key,
    };
  }
  return ctx;
}

export function useT() {
  return useI18n().t;
}
