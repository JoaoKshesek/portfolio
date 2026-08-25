export type ProjectType = "site" | "app" | "crm" | "sistema";

/** construído do zero, ou recebido pronto para manter e ganhar features novas */
export type ProjectRole = "criacao" | "manutencao";

export interface Project {
  id: string;
  name: string;
  types: ProjectType[];
  /** TODO: preencher as URLs que faltam (ou deixar null quando for interno) */
  url: string | null;
  /** id da empresa em @/lib/experience */
  company: string;
  /** quando o trabalho foi feito alocado para outra empresa */
  client?: string;
  role: ProjectRole;
  /** ids de @/lib/technologies */
  stack: string[];
  /** descrição breve do projeto */
  description?: string;
  /** URL da imagem de banner do projeto */
  banner?: string;
  /** URL da logo/thumbnail do projeto */
  logo?: string;
}

export const projectRoleLabels: Record<ProjectRole, string> = {
  criacao: "Criação",
  manutencao: "Manutenção e features",
};

export const projectTypeLabels: Record<ProjectType, string> = {
  site: "Site",
  app: "App",
  crm: "CRM",
  sistema: "Sistema web",
};

export const projects: Project[] = [
  {
    id: "loterica-nova",
    name: "Lotérica Nova",
    types: ["site"],
    url: "https://lotericanova.com/",
    company: "signo",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "css", "nestjs", "mongodb"],
    description: "Plataforma de intermediação de apostas em loterias. Atuei no desenvolvimento do novo design, manutenção das funcionalidades administrativas e na criação do sistema de impressão de tickets validados pela máquina.",
    banner: "/src/assets/projects/banner-loterica.png",
  },
  {
    id: "medguias",
    name: "MedGuias",
    types: ["site"],
    url: "https://www.medguias.com.br/",
    company: "signo",
    role: "manutencao",
    stack: ["php", "laravel", "mysql", "javascript", "css"],
  },
  {
    id: "lide-global",
    name: "Lide Global",
    types: ["crm", "app"],
    url: null,
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "mui", "react-native", "node", "mysql"],
  },
  {
    id: "blocos-dinamicos",
    name: "Blocos Dinâmicos",
    types: ["crm", "site"],
    url: "https://blocosdinamicos.com.br/",
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "nextjs", "node", "mongodb", "docker"],
    banner: "/src/assets/projects/banner-blocosdinamicos.png",
  },
  {
    id: "blumenau-fc",
    name: "Blumenau FC",
    types: ["site"],
    url: null,
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "nextjs", "css"],
  },
  {
    id: "sebrae",
    name: "Sebrae",
    types: ["sistema"],
    url: "https://hub.sebraeingresse.com.br/",
    company: "signo",
    client: "Weef",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "express", "mysql", "azure"],
  },
  {
    id: "i3pics",
    name: "i3Pics",
    types: ["app"],
    url: null,
    company: "humu",
    role: "criacao",
    stack: ["typescript", "react-native", "node", "jest"],
  },
  {
    id: "humu-ibk",
    name: "Humu IBK",
    types: ["sistema"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node", "jest"],
  },
  {
    id: "ionboarding",
    name: "iOnboarding",
    types: ["crm"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
  },
  {
    id: "ibass",
    name: "iBass",
    types: ["crm"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
  },
  {
    id: "humu-lp",
    name: "Humu LP",
    types: ["site"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "nextjs", "css"],
  },
  {
    id: "humu-backoffice",
    name: "Humu Backoffice",
    types: ["sistema"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
  },
  {
    id: "lugpay",
    name: "LugPay",
    types: ["app"],
    url: null,
    company: "jmn",
    role: "criacao",
    stack: ["typescript", "react-native", "node"],
  },
];

/** caminho do projeto na árvore do explorer */
export function projectPath(project: Project): string {
  return `src/projetos/${project.company}/${project.id}`;
}

export function projectCompanies(): string[] {
  return [...new Set(projects.map((project) => project.company))];
}

export function projectsByCompany(companyId: string): Project[] {
  return projects.filter((project) => project.company === companyId);
}

export function projectsUsing(technologyId: string): Project[] {
  return projects.filter((project) => project.stack.includes(technologyId));
}

export function projectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
