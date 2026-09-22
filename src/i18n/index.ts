import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languages, readStoredLanguage, type Language } from "@/lib/preferences";

import enEducation from "@/locales/en/education.json";
import enExperience from "@/locales/en/experience.json";
import enProfile from "@/locales/en/profile.json";
import enProjects from "@/locales/en/projects.json";
import enTechnologies from "@/locales/en/technologies.json";
import enTimeline from "@/locales/en/timeline.json";
import enUi from "@/locales/en/ui.json";
import esEducation from "@/locales/es/education.json";
import esExperience from "@/locales/es/experience.json";
import esProfile from "@/locales/es/profile.json";
import esProjects from "@/locales/es/projects.json";
import esTechnologies from "@/locales/es/technologies.json";
import esTimeline from "@/locales/es/timeline.json";
import esUi from "@/locales/es/ui.json";
import ptEducation from "@/locales/pt/education.json";
import ptExperience from "@/locales/pt/experience.json";
import ptProfile from "@/locales/pt/profile.json";
import ptProjects from "@/locales/pt/projects.json";
import ptTechnologies from "@/locales/pt/technologies.json";
import ptTimeline from "@/locales/pt/timeline.json";
import ptUi from "@/locales/pt/ui.json";

export const namespaces = [
  "ui",
  "profile",
  "experience",
  "education",
  "projects",
  "technologies",
  "timeline",
] as const;

export type Namespace = (typeof namespaces)[number];

const resources: Record<Language, Record<Namespace, object>> = {
  pt: {
    ui: ptUi,
    profile: ptProfile,
    experience: ptExperience,
    education: ptEducation,
    projects: ptProjects,
    technologies: ptTechnologies,
    timeline: ptTimeline,
  },
  en: {
    ui: enUi,
    profile: enProfile,
    experience: enExperience,
    education: enEducation,
    projects: enProjects,
    technologies: enTechnologies,
    timeline: enTimeline,
  },
  es: {
    ui: esUi,
    profile: esProfile,
    experience: esExperience,
    education: esEducation,
    projects: esProjects,
    technologies: esTechnologies,
    timeline: esTimeline,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: readStoredLanguage(),
  fallbackLng: "pt",
  supportedLngs: [...languages],
  ns: [...namespaces],
  defaultNS: "ui",
  interpolation: { escapeValue: false },
  returnObjects: true,
  // recursos já vêm no bundle: inicializa de forma síncrona, sem piscar chaves no primeiro render
  initAsync: false,
});

export default i18n;
