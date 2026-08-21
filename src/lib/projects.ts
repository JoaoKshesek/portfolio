export interface Project {
  id: string;
  name: string;
  url: string | null;
  /** ids de @/lib/technologies usados no projeto */
  stack: string[];
  /** id da empresa em @/lib/experience */
  company: string;
}

export const projects: Project[] = [
  {
    id: "cinemark",
    name: "Cinemark - Plataforma",
    url: "https://www.cinemark.com.br/",
    company: "signo",
    stack: ["typescript", "react", "nextjs", "mui", "node", "aws", "datadog"],
  },
  {
    id: "blocos-dinamicos",
    name: "Blocos Dinâmicos - Ecommerce",
    url: "https://blocosdinamicos.com.br/",
    company: "signo",
    stack: ["typescript", "react", "nextjs", "css", "node", "mongodb", "docker"],
  },
  {
    id: "lide-parana",
    name: "Lide Paraná - Aplicativo",
    url: "https://apps.apple.com/us/app/lide-paran%C3%A1/id6451423565?l=pt-BR",
    company: "signo",
    stack: ["typescript", "react-native", "node", "mongodb", "jest"],
  },
  {
    id: "lide-global",
    name: "Lide Global - Gerenciador",
    url: null,
    company: "signo",
    stack: ["typescript", "react", "mui", "node", "mysql"],
  },
  {
    id: "manakai",
    name: "Manakai - Plataforma [Em andamento]",
    url: "https://manakai.signo.dev.br/",
    company: "signo",
    stack: ["typescript", "react", "nextjs", "css", "express", "mongodb", "docker"],
  },
  {
    id: "busca-global",
    name: "Busca Global - Plataforma",
    url: "https://busca.global/",
    company: "signo",
    stack: ["javascript", "react", "node", "express", "mysql", "docker", "aws"],
  },
  {
    id: "medguias",
    name: "MedGuias - Plataforma",
    url: "https://www.medguias.com.br/",
    company: "signo",
    stack: ["php", "laravel", "mysql", "javascript", "css", "docker"],
  },
  {
    id: "sebrae",
    name: "Sebrae - Plataforma",
    url: "https://hub.sebraeingresse.com.br/",
    company: "signo",
    stack: ["typescript", "react", "nextjs", "express", "mysql", "azure", "cypress"],
  },
];

export function projectsUsing(technologyId: string): Project[] {
  return projects.filter((project) => project.stack.includes(technologyId));
}

export function projectsByCompany(companyId: string): Project[] {
  return projects.filter((project) => project.company === companyId);
}
