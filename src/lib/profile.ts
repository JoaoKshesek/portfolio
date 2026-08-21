import avatar from "@/assets/hero.png";

export interface ProfileContact {
  label: string;
  href: string;
  icon: string;
  className: string;
}

export const profile = {
  avatar,
  name: "João Valter Kshesek",
  handle: "JoaoKshesek",
  role: "Frontend Engineer",
  organization: "@Inovanti-Bank",
  location: "Curitiba, Brazil",
  website: "https://joaokshesek.github.io/portfolio/",
  linkedin: {
    label: "in/joao-valter-kshesek",
    href: "https://www.linkedin.com/in/joao-valter-kshesek/",
  },
  headline: "I'm João Valter, a Software Engineer from Curitiba - Brazil",
  bullets: [
    "💻 I've worked across diverse industries — from financial systems to e-commerce and delivery services.",
    "🎹 I'm a rock lover at heart, but I actually play classical piano.",
    "🥊 Boxing is part of who I am — it taught me to never back down.",
    "🐱 My cat is called Mulan because he tricked me, just like in the movie.",
  ],
  /** ids de @/lib/technologies */
  techs: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "mui",
    "node",
    "mysql",
    "mongodb",
    "docker",
    "aws",
  ],
  tools: ["git", "github", "vscode", "insomnia", "postman", "jest", "cypress"],
  contacts: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joao-valter-kshesek/",
      icon: "person",
      className: "bg-[#0a66c2] text-white",
    },
    {
      // TODO: confirmar o perfil do Instagram
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: "device-camera",
      className: "bg-[#d6336c] text-white",
    },
    {
      label: "GitHub",
      href: "https://github.com/JoaoKshesek",
      icon: "github-inverted",
      className: "bg-ide-titlebar text-white",
    },
  ] satisfies ProfileContact[],
};
