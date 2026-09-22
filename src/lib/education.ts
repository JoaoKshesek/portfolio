import i18n from "i18next";

export type StudyKind = "formacao" | "certificado";

export interface Credential {
  id: string;
  /** TODO: colar o link público do certificado */
  url?: string;
}

/** dados fixos do curso; os textos vêm de src/locales/<lang>/education.json */
interface StudyData {
  id: string;
  kind: StudyKind;
  /** ids de @/lib/technologies */
  stack: string[];
  credential?: Credential;
}

interface InstitutionData {
  id: string;
  name: string;
  studies: StudyData[];
}

export interface Study extends StudyData {
  title: string;
  field?: string;
  period: string;
  status: string;
  /** a frase que resume o curso em uma linha */
  summary: string;
  highlights: string[];
}

export interface Institution extends Omit<InstitutionData, "studies"> {
  studies: Study[];
}

const institutionData: InstitutionData[] = [
  {
    id: "rocketseat",
    name: "Rocketseat",
    studies: [
      {
        id: "pos-tech-developer-360",
        kind: "formacao",
        stack: ["react", "node", "typescript", "express", "fastify", "graphql", "docker", "aws", "grafana", "ai"],
      },
      {
        id: "explorer",
        kind: "certificado",
        stack: ["html", "css", "javascript", "react", "node", "express", "fastify", "git"],
        credential: { id: "ceed2620-ab68-43b7-8874-abab5be5d7cd" },
      },
    ],
  },
  {
    id: "descomplica",
    name: "Descomplica Faculdade Digital",
    studies: [
      {
        id: "analise-e-desenvolvimento-de-sistemas",
        kind: "formacao",
        stack: ["javascript", "typescript", "php", "kotlin", "swift", "react", "react-native", "node", "laravel", "postgresql", "mysql", "aws", "docker", "git"],
      },
    ],
  },
];

/** estrutura (ids, tipos e stacks) sem os textos, para árvore do explorer e afins */
export const institutions: InstitutionData[] = institutionData;

function text(key: string): string {
  return i18n.t(`education:${key}`, { defaultValue: "" });
}

function list(key: string): string[] {
  const value = i18n.t(`education:${key}`, { returnObjects: true, defaultValue: [] });
  return Array.isArray(value) ? (value as string[]) : [];
}

function translateStudy(institutionId: string, study: StudyData): Study {
  const key = `${institutionId}.studies.${study.id}`;
  const field = text(`${key}.field`);

  return {
    ...study,
    title: text(`${key}.title`),
    field: field || undefined,
    period: text(`${key}.period`),
    status: text(`${key}.status`),
    summary: text(`${key}.summary`),
    highlights: list(`${key}.highlights`),
  };
}

/** instituições e cursos com os textos no idioma atual */
export function getInstitutions(): Institution[] {
  return institutionData.map((institution) => ({
    id: institution.id,
    name: institution.name,
    studies: institution.studies.map((study) =>
      translateStudy(institution.id, study),
    ),
  }));
}

export interface StudyLocation {
  institution: Institution;
  study: Study;
}

export function findStudy(
  institutionId: string,
  studyId: string,
): StudyLocation | undefined {
  const institution = getInstitutions().find((item) => item.id === institutionId);
  const study = institution?.studies.find((item) => item.id === studyId);

  return institution && study ? { institution, study } : undefined;
}
