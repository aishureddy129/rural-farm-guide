import type { LanguageCode } from "../languages";

export const weatherEn = {} as const;

export type WeatherKey = keyof typeof weatherEn;

type Dict = Record<WeatherKey, string>;

export const weather: Record<LanguageCode, Dict> = {
  en: weatherEn,
  te: {},
  hi: {},
  mr: {},
  ta: {},
  kn: {},
  bn: {},
};
