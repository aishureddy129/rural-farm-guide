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
    <Select value={lang} onValueChange={(v) => setLang(v as LanguageCode)}>
      <SelectTrigger
        aria-label={t("common.language")}
        className={className ?? "h-9 w-[130px] gap-2"}
      >
        <Languages className="size-4 text-primary" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            {l.native}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
