import i18n from "i18next";
import { useEffect, useState } from "react";

export const themes = ["dark", "light"] as const;
export const languages = ["pt", "en", "es"] as const;

export type Theme = (typeof themes)[number];
export type Language = (typeof languages)[number];

const THEME_KEY = "portfolio:theme";
const LANGUAGE_KEY = "portfolio:language";

const htmlLang: Record<Language, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

function readStored<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  const stored = localStorage.getItem(key);
  return allowed.includes(stored as T) ? (stored as T) : fallback;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    readStored(THEME_KEY, themes, "dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export function readStoredLanguage(): Language {
  return readStored(LANGUAGE_KEY, languages, "pt");
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = htmlLang[language];
    localStorage.setItem(LANGUAGE_KEY, language);

    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
    document.title = i18n.t("ui:header.title");
  }, [language]);

  return [language, setLanguage] as const;
}
