import type { LanguageCode } from "../languages";

export const assistantEn = {} as const;

export type AssistantKey = keyof typeof assistantEn;

type Dict = Record<AssistantKey, string>;

export const assistant: Record<LanguageCode, Dict> = {
  en: assistantEn,
  te: {},
  hi: {},
  mr: {},
  ta: {},
  kn: {},
  bn: {},
};
