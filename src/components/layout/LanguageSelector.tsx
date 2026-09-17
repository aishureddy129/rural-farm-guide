import { Languages } from "lucide-react";
import { languages, useI18n, type LanguageCode } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <Select
      value={lang}
      onValueChange={(value: string) => {
        setLang(value as LanguageCode);
      }}
    >
      <SelectTrigger
        className={className ?? "h-9 w-[130px] gap-2"}
        aria-label={t("common.language")}
      >
        <Languages className="size-4 text-primary" />
        <SelectValue placeholder={t("common.language")} />
      </SelectTrigger>

      <SelectContent>
        {languages.map(
          (language: {
            code: LanguageCode;
            native: string;
          }) => (
            <SelectItem key={language.code} value={language.code}>
              {language.native}
            </SelectItem>
          ),
        )}
      </SelectContent>
    </Select>
  );
}