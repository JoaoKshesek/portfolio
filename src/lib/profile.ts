import avatar from "@/assets/hero.jpeg";

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
  role: "Frontend Engineer & Software Developer",
  organization: "@HUMU",
  location: "Curitiba, Brazil",
  linkedin: {
    label: "in/joao-valter-kshesek",
    href: "https://www.linkedin.com/in/joao-valter-kshesek/",
  },
  phone: "+55 41 99553-1007",
  email: "kshesek.joaovalter@gmail.com",
  quote: "A inteligência é a capacidade de se adaptar à mudança.",
  headline: "Frontend Engineer especializado em React & Next.js, com mais de 5 anos construindo aplicações robustas, escaláveis e de alta performance",
  description: "Desenvolvedor Front-End com expertise em React.js, Next.js e React Native. Atuo na construção de aplicações modernas com foco em SSR, SSG, performance, acessibilidade e integração via APIs REST/GraphQL. Domino Clean Code, Design Patterns, Arquitetura de Microfrontend, TDD e CI/CD pipelines.",
  bullets: [
    "🏗️ Arquitetura & Design: Microfrontend, Clean Code, SOLID, Design Patterns",
    "⚛️ Frontend: React.js, Next.js, React Native, Tailwind CSS, Shadcn, MUI",
    "🔧 Backend: Node.js (Express, Nest.js), PHP (Laravel), APIs REST & GraphQL",
    "🎯 Performance & Qualidade: TDD, Jest, Cypress, SEO, WCAG, Acessibilidade",
    "☁️ Cloud & DevOps: AWS, Firebase, Docker, CI/CD pipelines, Git/GitFlow",
    "💻 Bancos de dados: PostgreSQL, MySQL, MongoDB",
    "🎹 Curioso por natureza: rock lover, pianista clássico e boxeador nas horas vagas",
  ],
  /** ids de @/lib/technologies */
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
