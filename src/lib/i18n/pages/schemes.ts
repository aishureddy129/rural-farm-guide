import type { LanguageCode } from "../languages";

export const schemesEn = {} as const;

export type SchemesKey = keyof typeof schemesEn;

type Dict = Record<SchemesKey, string>;

export const schemes: Record<LanguageCode, Dict> = {
  en: schemesEn,
  te: {},
  hi: {},
  mr: {},
  ta: {},
  kn: {},
  bn: {},
};
