import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import {
  useLanguage,
  useTheme,
  type Language,
  type Theme,
} from "@/lib/preferences";

export interface LanguageOption {
  value: Language;
  label: string;
  hint: string;
}

export interface ThemeOption {
  value: Theme;
  label: string;
}

export interface UseSettingsMenusProps {
  languageOptions: LanguageOption[];
  themeOptions: ThemeOption[];
  itemClass: string;
  labelClass: string;
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

const languageOptions: LanguageOption[] = [
  { value: "pt", label: "Português", hint: "pt-BR" },
  { value: "en", label: "English", hint: "en" },
  { value: "es", label: "Español", hint: "es" },
];

const themeValues: Theme[] = ["dark", "light"];

const itemClass =
  "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none data-highlighted:bg-ide-hover data-highlighted:text-ide-heading";

const labelClass =
  "px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase";

export const useSettingsMenus = (): UseSettingsMenusProps => {
  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLanguage();
  const { t } = useTranslation();

  const themeOptions: ThemeOption[] = themeValues.map((value) => ({
    value,
    label: t(`settings.themes.${value}`),
  }));

  return {
    languageOptions,
    themeOptions,
    itemClass,
    labelClass,
    theme,
    setTheme,
    language,
    setLanguage,
  };
};
