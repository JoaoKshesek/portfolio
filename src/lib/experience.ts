import i18n from "i18next";

/** dados fixos do cargo; os textos vêm de src/locales/<lang>/experience.json */
interface RoleData {
  id: string;
  /** ids de @/lib/technologies */
  stack: string[];
}

interface CompanyData {
  id: string;
  name: string;
  roles: RoleData[];
}

export interface Role extends RoleData {
  title: string;
  period: string;
  duration: string;
  model: string;
  /** a frase que se lê em três segundos, antes dos bullets */
  summary: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Company extends Omit<CompanyData, "roles"> {
  description: string;
  location: string;
  period: string;
  duration: string;
  roles: Role[];
}

const companyData: CompanyData[] = [
  {
    id: "humu",
    name: "Humu",
    roles: [
      {
        id: "tech-lead",
        stack: ["typescript", "react", "nextjs", "react-native", "jest", "git", "php", "laravel", "cypress", "aws", "grafana", "docker"],
      },
      {
        id: "desenvolvedor-senior",
        stack: ["typescript", "react", "react-native", "node", "jest", "php", "laravel", "cypress", "aws", "grafana", "docker"],
      },
    ],
  },
  {
    id: "signo",
    name: "Signo Tech",
    roles: [
      {
        id: "desenvolvedor-front-end",
        stack: ["typescript", "javascript", "react", "nextjs", "node", "jest", "cypress", "docker", "azure", "php", "laravel", "mysql", "mongodb"],
      },
    ],
  },
];

/** estrutura (ids e stacks) sem os textos, para árvore do explorer e afins */
export const companies: CompanyData[] = companyData;

function text(key: string): string {
  return i18n.t(`experience:${key}`, { defaultValue: "" });
}

function list(key: string): string[] {
  const value = i18n.t(`experience:${key}`, { returnObjects: true, defaultValue: [] });
  return Array.isArray(value) ? (value as string[]) : [];
}

function translateRole(companyId: string, role: RoleData): Role {
  const key = `${companyId}.roles.${role.id}`;

  return {
    ...role,
    title: text(`${key}.title`),
    period: text(`${key}.period`),
    duration: text(`${key}.duration`),
    model: text(`${key}.model`),
    summary: text(`${key}.summary`),
    responsibilities: list(`${key}.responsibilities`),
    achievements: list(`${key}.achievements`),
  };
}

function translateCompany(company: CompanyData): Company {
  return {
    id: company.id,
    name: company.name,
    description: text(`${company.id}.description`),
    location: text(`${company.id}.location`),
    period: text(`${company.id}.period`),
    duration: text(`${company.id}.duration`),
    roles: company.roles.map((role) => translateRole(company.id, role)),
  };
}

/** empresas e cargos com os textos no idioma atual */
export function getCompanies(): Company[] {
  return companyData.map(translateCompany);
}

export interface RoleLocation {
  company: Company;
  role: Role;
}

export function findRole(
  companyId: string,
  roleId: string,
): RoleLocation | undefined {
  const company = getCompanies().find((item) => item.id === companyId);
  const role = company?.roles.find((item) => item.id === roleId);

  return company && role ? { company, role } : undefined;
}
