import i18n from "i18next";

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
}

export function projectRoleLabel(role: ProjectRole): string {
  return i18n.t(`ui:project.roles.${role}`);
}

export function projectTypeLabel(type: ProjectType): string {
  return i18n.t(`ui:project.types.${type}`);
}

/** descrição breve do projeto, no idioma atual (src/locales/<lang>/projects.json) */
export function projectDescription(projectId: string): string {
  return i18n.t(`projects:${projectId}.description`, { defaultValue: "" });
}

export const projects: Project[] = [
  {
    id: "loterica-nova",
    name: "Lotérica Nova",
    types: ["site"],
    url: "https://lotericanova.com/",
    company: "signo",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "css", "nestjs", "mongodb", "git"],
  },
  {
    id: "medguias",
    name: "MedGuias",
    types: ["site", "sistema"],
    url: "https://medguias.com.br/",
    company: "signo",
    role: "manutencao",
    stack: ["php", "laravel", "mysql", "javascript", "css", "git"],
  },
  {
    id: "lide-global",
    name: "Lide Global",
    types: ["crm", "app"],
    url: null,
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "mui", "react-native", "mysql", "php", "laravel", "git"],
  },
  {
    id: "blocos-dinamicos",
    name: "Blocos Dinâmicos",
    types: ["crm", "site"],
    url: "https://blocosdinamicos.com.br/",
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "nextjs", "node", "docker", "mysql", "php", "laravel", "git"],
  },
    {
    id: "busca-global",
    name: "Busca Global",
    types: ["crm", "site"],
    url: "https://busca.global/",
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "nextjs", "node", "docker", "mysql", "php", "laravel", "git"],
  },
  {
    id: "sebrae",
    name: "Sebrae Ingresse",
    types: ["sistema"],
    url: "https://hub.sebraeingresse.com.br/",
    company: "signo",
    client: "Weef",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "express", "mysql", "azure", "cypress", "php", "laravel", "jest", "git"],
  },
  {
    id: "clipify",
    name: "Clipify",
    types: ["crm", "sistema"],
    url: "https://www.clipify.com/",
    company: "signo",
    role: "criacao",
    stack: ["react", "mui", "php", "laravel", "git"],
  },
  {
    id: "i3pics",
    name: "i3Pics",
    types: ["app"],
    url: null,
    company: "humu",
    role: "criacao",
    stack: ["typescript", "react-native", "git"],
  },
  {
    id: "humu",
    name: "Humu",
    types: ["sistema", "app"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["react", "react-native", "git"],
  },
  {
    id: "lugpay",
    name: "Lugpay",
    types: ["sistema", "app"],
    url: "https://lugpay.com.br/",
    company: "jmn",
    role: "criacao",
    stack: ["typescript", "react", "react-native", "node", "express", "git"],
  },
  {
    id: "adenpay",
    name: "AdenPay",
    types: ["sistema", "app"],
    url: "https://www.adenbank.com.br/",
    company: "humu", // TODO: confirmar empresa
    client: "Aden Bank",
    role: "criacao",
    stack: ["react", "react-native", "git"],
  },
  {
    id: "helpmeup",
    name: "Help Me Up",
    types: ["app"],
    url: "https://www.helpmeupapp.com/?page_id=133&lang=pt",
    company: "signo", // TODO: confirmar empresa
    role: "criacao",
    stack: ["typescript", "react-native", "node", "php", "laravel", "mysql", "git"],
  },
  {
    id: "porti",
    name: "Portí",
    types: ["sistema", "app"],
    url: "https://porti.digital/",
    company: "humu", // TODO: confirmar empresa
    client: "Portí",
    role: "criacao",
    stack: ["react", "react-native", "git"],
  },
  {
    id: "orbit",
    name: "Orbit Ativos",
    types: ["sistema", "app"],
    url: "https://www.orbitativos.com.br/",
    company: "humu", // TODO: confirmar empresa
    client: "Orbit Ativos",
    role: "criacao",
    stack: ["react", "react-native", "git"],
  },
  {
    id: "way",
    name: "Way Odontologia",
    types: ["app", "sistema"],
    url: "https://wayodontologia.com.br/",
    company: "signo", // TODO: confirmar empresa
    role: "criacao",
    stack: ["react", "react-native", "php", "laravel", "git"],
  },
];

/** caminho do arquivo do projeto na árvore do explorer */
export function projectPath(project: Project): string {
  return `src/projetos/${project.id}.md`;
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
