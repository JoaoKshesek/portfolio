import { aiDocs, type AiDoc } from "./ai-workflow";
import { institutions } from "./education";
import { companies } from "./experience";
import {
  educationFile,
  experienceFile,
  nodeIcon,
  readmeFile,
  treeFiles,
  type TreeFile,
} from "./explorer-tree";
import type { IconSpec } from "./icons";
import { profile } from "./profile";
import {
  projectRoleLabels,
  projectTypeLabels,
  projects,
  type Project,
} from "./projects";
import { categoryLabels, technologies, type Technology } from "./technologies";
import { branchById, timelineCommits, type TimelineCommit } from "./timeline";

export type SearchTarget =
  | { kind: "technology"; technology: Technology }
  | { kind: "project"; project: Project }
  | { kind: "file"; file: TreeFile }
  | { kind: "commit"; commit: TimelineCommit }
  | { kind: "ai"; doc: AiDoc };

export type SearchIcon = IconSpec | { type: "dot"; color: string };

export interface SearchResult {
  id: string;
  title: string;
  detail: string;
  icon: SearchIcon;
  target: SearchTarget;
}

export interface SearchGroup {
  id: string;
  label: string;
  results: SearchResult[];
}

interface IndexEntry extends Omit<SearchResult, "detail"> {
  group: string;
  /** o primeiro campo que casar vira o detalhe do resultado */
  fields: string[];
  fallbackDetail: string;
}

const groupLabels: Record<string, string> = {
  ia: "ia",
  experiencia: "experiência",
  educacao: "educação",
  tecnologias: "tecnologias",
  projetos: "projetos",
  trajetoria: "trajetória",
  perfil: "perfil",
  arquivos: "arquivos",
};

/** minúsculas e sem acento, para "trajetoria" achar "trajetória" */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

const experienceEntries: IndexEntry[] = companies.flatMap((company) =>
  company.roles.map((role) => ({
    id: `cargo:${company.id}:${role.id}`,
    group: "experiencia",
    title: `${role.title} · ${company.name}`,
    fields: [
      role.summary,
      role.period,
      company.name,
      company.description,
      ...role.responsibilities,
      ...role.achievements,
      ...role.stack,
    ],
    fallbackDetail: role.summary,
    icon: { type: "codicon" as const, name: "markdown", className: "text-sky-400" },
    target: { kind: "file" as const, file: experienceFile(company.id, role.id) },
  })),
);

const aiEntries: IndexEntry[] = aiDocs.map((doc) => ({
  id: `ia:${doc.id}`,
  group: "ia",
  title: doc.title,
  fields: [
    doc.summary,
    doc.name,
    ...doc.sections.flatMap((section) => [
      section.title,
      ...section.body,
      ...(section.items ?? []),
    ]),
  ],
  fallbackDetail: doc.summary,
  icon: {
    type: "codicon" as const,
    name: "sparkle",
    className: "text-ide-indicator",
  },
  target: { kind: "ai" as const, doc },
}));

const educationEntries: IndexEntry[] = institutions.flatMap((institution) =>
  institution.studies.map((study) => ({
    id: `estudo:${institution.id}:${study.id}`,
    group: "educacao",
    title: `${study.title} · ${institution.name}`,
    fields: [
      study.summary,
      study.period,
      study.status,
      study.field ?? "",
      institution.name,
      ...study.highlights,
      ...study.stack,
    ],
    fallbackDetail: study.summary,
    icon: {
      type: "codicon" as const,
      name: study.kind === "certificado" ? "verified-filled" : "mortar-board",
      className: "text-ide-muted",
    },
    target: {
      kind: "file" as const,
      file: educationFile(institution.id, study.id),
    },
  })),
);

const technologyEntries: IndexEntry[] = technologies.map((technology) => ({
  id: `tecnologia:${technology.id}`,
  group: "tecnologias",
  title: technology.name,
  fields: [
    technology.description,
    categoryLabels[technology.category],
    technology.id,
    `${technology.time} de uso`,
  ],
  fallbackDetail: technology.description,
  icon: { type: "image", src: technology.icon },
  target: { kind: "technology", technology },
}));

const projectEntries: IndexEntry[] = projects.map((project) => ({
  id: `projeto:${project.id}`,
  group: "projetos",
  title: project.name,
  fields: [
    project.types.map((type) => projectTypeLabels[type]).join(" · "),
    projectRoleLabels[project.role],
    project.stack.join(", "),
    project.client ?? "",
    project.url ?? "",
    project.id,
  ],
  fallbackDetail: `${project.types
    .map((type) => projectTypeLabels[type])
    .join(" · ")} · ${projectRoleLabels[project.role]}`,
  icon: { type: "codicon", name: project.url ? "globe" : "file" },
  target: { kind: "project", project },
}));

const commitEntries: IndexEntry[] = timelineCommits.map((commit) => ({
  id: `commit:${commit.id}`,
  group: "trajetoria",
  title: commit.message,
  fields: [commit.year, branchById(commit.branch).name],
  fallbackDetail: `${commit.year} · ${branchById(commit.branch).name}`,
  icon: { type: "dot", color: branchById(commit.branch).color },
  target: { kind: "commit", commit },
}));

const profileEntries: IndexEntry[] = [
  {
    id: "perfil:bio",
    group: "perfil",
    title: profile.name,
    fields: [
      profile.handle,
      profile.role,
      profile.organization,
      profile.location,
      profile.headline,
    ],
    fallbackDetail: profile.headline,
    icon: { type: "image", src: profile.avatar },
    target: { kind: "file", file: readmeFile },
  },
  ...profile.bullets.map((bullet, index) => ({
    id: `perfil:bullet-${index}`,
    group: "perfil",
    title: bullet,
    fields: [bullet],
    fallbackDetail: "README.md",
    icon: { type: "codicon" as const, name: "quote" },
    target: { kind: "file" as const, file: readmeFile },
  })),
];

const fileEntries: IndexEntry[] = treeFiles().map((file) => ({
  id: `arquivo:${file.id}`,
  group: "arquivos",
  title: file.name,
  fields: [file.id],
  fallbackDetail: file.id,
  icon: nodeIcon(file, false),
  target: { kind: "file", file },
}));

const index: IndexEntry[] = [
  ...experienceEntries,
  ...educationEntries,
  ...aiEntries,
  ...technologyEntries,
  ...projectEntries,
  ...commitEntries,
  ...profileEntries,
  ...fileEntries,
];

export const searchSuggestions = ["react", "node", "2022", "signo", "piano"];

export function search(query: string): SearchGroup[] {
  const term = normalize(query.trim());
  if (term.length === 0) return [];

  const groups = new Map<string, SearchResult[]>();

  for (const entry of index) {
    const matchedField = entry.fields.find((field) =>
      normalize(field).includes(term),
    );
    const matchesTitle = normalize(entry.title).includes(term);

    if (!matchesTitle && !matchedField) continue;

    const results = groups.get(entry.group) ?? [];
    results.push({
      id: entry.id,
      title: entry.title,
      detail: matchedField ?? entry.fallbackDetail,
      icon: entry.icon,
      target: entry.target,
    });
    groups.set(entry.group, results);
  }

  return [...groups.entries()].map(([id, results]) => ({
    id,
    label: groupLabels[id] ?? id,
    results,
  }));
}

export function countResults(groups: SearchGroup[]): number {
  return groups.reduce((total, group) => total + group.results.length, 0);
}
