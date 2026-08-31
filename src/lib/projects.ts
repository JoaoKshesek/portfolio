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
    id: "busca-global",
    name: "Busca Global",
    types: ["crm", "site"],
    url: "https://busca.global/",
    company: "signo",
    role: "criacao",
    stack: ["typescript", "react", "nextjs", "node", "mongodb", "docker"],
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
    description: "Aplicativo mobile construído do zero em React Native e publicado nas lojas. Participei da definição da arquitetura modular que virou referência para o time, com foco em desacoplamento, testabilidade e cobertura de testes em Jest.",
  },
  {
    id: "ionboarding",
    name: "iOnboarding",
    types: ["crm"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
    description: "CRM de onboarding de clientes da instituição: abertura de contas, envio e validação de documentos e acompanhamento das etapas de aprovação. Atuei na manutenção e em novas features dos fluxos de cadastro, sempre sob as exigências de LGPD.",
  },
  {
    id: "ibass",
    name: "iBaaS",
    types: ["crm"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
    description: "Painel de gestão da operação de Banking as a Service: contas, clientes e transações dos parceiros que operam sobre a infraestrutura da instituição. Atuei na manutenção e em novas features, com atenção à integridade dos dados financeiros exibidos.",
  },
  {
    id: "icredit",
    name: "iCredit",
    types: ["sistema"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "react", "nextjs", "node"],
    description: "Sistema de gestão de operações de crédito: propostas, análise, contratos e acompanhamento das parcelas. Atuei na manutenção e em novas features das telas de operação, integrando com as APIs internas da instituição.",
  },
  {
    id: "humu-lp",
    name: "Humu LP",
    types: ["site"],
    url: null,
    company: "humu",
    role: "manutencao",
    stack: ["typescript", "nextjs", "css"],
    description: "Landing page institucional da Humu. Atuei na manutenção e evolução do site: novas seções, ajustes de conteúdo e melhorias de performance e responsividade em Next.js.",
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
  return `src/projetos/${project.id}`;
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
