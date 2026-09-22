import i18n from "i18next";

import avatar from "@/assets/hero.jpeg";

export interface ProfileContact {
  label: string;
  href: string;
  icon: string;
  className: string;
}

export const profileData = {
  avatar,
  name: "João Valter Kshesek",
  handle: "JoaoKshesek",
  organization: "@HUMU",
  linkedin: {
    label: "in/joao-valter-kshesek",
    href: "https://www.linkedin.com/in/joao-valter-kshesek/",
  },
  github: {
    label: "github.com/JoaoKshesek",
    href: "https://github.com/JoaoKshesek",
  },
  instagram: {
    label: "@ksk_joao",
    href: "https://www.instagram.com/ksk_joao/",
  },
  phone: "+55 41 99553-1007",
  email: "kshesek.joaovalter@gmail.com",
  techs: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "react-native",
    "node",
    "express",
    "nestjs",
    "php",
    "laravel",
    "tailwindcss",
    "mui",
    "shadcn",
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "graphql",
    "docker",
    "aws",
    "firebase",
  ],
  tools: ["git", "github", "vscode", "insomnia", "postman", "jest", "cypress", "storybook", "webpack", "vite"],
  contacts: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joao-valter-kshesek/",
      icon: "person",
      className: "bg-[#0a66c2] text-white",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ksk_joao/",
      icon: "device-camera",
      className: "bg-[#d6336c] text-white",
    },
    {
      label: "GitHub",
      href: "https://github.com/JoaoKshesek",
      icon: "github-inverted",
      className: "bg-[#1c1c1c] text-white",
    },
  ] satisfies ProfileContact[],
};

export interface Profile extends Omit<typeof profileData, never> {
  role: string;
  location: string;
  quote: string;
  headline: string;
  description: string;
  bullets: string[];
}

export function getProfile(): Profile {
  const bullets = i18n.t("profile:bullets", { returnObjects: true, defaultValue: [] });

  return {
    ...profileData,
    role: i18n.t("profile:role"),
    location: i18n.t("profile:location"),
    quote: i18n.t("profile:quote"),
    headline: i18n.t("profile:headline"),
    description: i18n.t("profile:description"),
    bullets: Array.isArray(bullets) ? (bullets as string[]) : [],
  };
}
