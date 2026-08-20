import type { Dispatch, SetStateAction } from "react";

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

const themeOptions: ThemeOption[] = [
  { value: "dark", label: "Default Dark" },
  { value: "light", label: "Light" },
];

const itemClass =
  "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none data-highlighted:bg-ide-hover data-highlighted:text-white";

const labelClass =
  "px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase";

export const useSettingsMenus = (): UseSettingsMenusProps => {
  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLanguage();

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
