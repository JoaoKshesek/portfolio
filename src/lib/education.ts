export type StudyKind = "formacao" | "certificado";

export interface Credential {
  id: string;
  /** TODO: colar o link público do certificado */
  url?: string;
}

export interface Study {
  id: string;
  kind: StudyKind;
  title: string;
  field?: string;
  period: string;
  status: string;
  /** a frase que resume o curso em uma linha */
  summary: string;
  highlights: string[];
  /** ids de @/lib/technologies */
  stack: string[];
  credential?: Credential;
}

export interface Institution {
  id: string;
  name: string;
  studies: Study[];
}

export const institutions: Institution[] = [
  {
    id: "rocketseat",
    name: "Rocketseat",
    studies: [
      {
        id: "pos-tech-developer-360",
        kind: "formacao",
        title: "Pós-graduação Lato Sensu — Tech Developer 360",
        field: "Tecnologia e Sistemas de Computação",
        period: "Nov 2025 — Nov 2026",
        status: "Em andamento",
        summary:
          "Pós full stack com foco em arquitetura, cloud e qualidade — do banco à interface.",
        highlights: [
          "Fundamentos avançados de engenharia de software e arquitetura de sistemas",
          "Back-end e front-end modernos, com integração via APIs",
          "Cloud computing, DevOps e estratégias de escalabilidade",
          "Testes, segurança e práticas de qualidade de código",
        ],
        stack: ["react", "node", "typescript", "docker", "aws"],
      },
      {
        id: "explorer",
        kind: "certificado",
        title: "Explorer",
        period: "Ago 2023",
        status: "Concluído",
        summary:
          "Trilha de fundamentos de desenvolvimento web, da base do HTML ao consumo de APIs.",
        highlights: [
          "HTML, CSS e JavaScript do zero ao DOM",
          "Node.js e APIs REST",
          "Git, versionamento e boas práticas de projeto",
        ],
        stack: ["html", "css", "javascript", "react", "node", "git"],
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
        title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        field: "Análise e Desenvolvimento de Sistemas",
        period: "Jan 2023 — Dez 2025",
        status: "Concluído",
        summary:
          "Graduação tecnológica em ADS, com ênfase em desenvolvimento web e mobile.",
        highlights: [
          "Programação e engenharia de software",
          "Banco de dados e modelagem",
          "Arquitetura de sistemas e metodologias ágeis",
          "Desenvolvimento web e mobile",
        ],
        stack: ["javascript", "mysql", "git"],
      },
    ],
  },
];

export interface StudyLocation {
  institution: Institution;
  study: Study;
}

export function findStudy(
  institutionId: string,
  studyId: string,
): StudyLocation | undefined {
  const institution = institutions.find((item) => item.id === institutionId);
  const study = institution?.studies.find((item) => item.id === studyId);

  return institution && study ? { institution, study } : undefined;
}
