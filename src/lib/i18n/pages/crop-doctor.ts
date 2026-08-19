import type { LanguageCode } from "../languages";

export const cropDoctorEn = {} as const;

export type CropDoctorKey = keyof typeof cropDoctorEn;

type Dict = Record<CropDoctorKey, string>;

export const cropDoctor: Record<LanguageCode, Dict> = {
  en: cropDoctorEn,
  te: {},
  hi: {},
  mr: {},
  ta: {},
  kn: {},
  bn: {},
};
