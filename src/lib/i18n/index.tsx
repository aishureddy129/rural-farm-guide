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

const I18nContext = createContext<I18nValue | undefined>(undefined);

function isLanguage(value: string | null): value is LanguageCode {
  return (
    value !== null &&
    languages.some((language) => language.code === value)
  );
}

export function I18nProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (isLanguage(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      return dictionaries[lang]?.[key] ?? dictionaries.en?.[key] ?? key;
    },
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang, setLang, t],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}

export function useT(): I18nValue["t"] {
  return useI18n().t;
}