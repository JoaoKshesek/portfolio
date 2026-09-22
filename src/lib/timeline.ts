import i18n from "i18next";

export interface TimelineBranch {
  id: string;
  name: string;
  lane: number;
  color: string;
  /** branch de onde ela nasce */
  parent?: string;
}

/** dados fixos do commit; a mensagem vem de src/locales/<lang>/timeline.json */
interface TimelineCommitData {
  id: string;
  branch: string;
  year: string;
  /** id em @/lib/projects — torna o commit clicável */
  project?: string;
  /** branch que este commit encerra */
  merges?: string;
  refs?: string[];
}

export interface TimelineCommit extends TimelineCommitData {
  message: string;
}

export const timelineBranches: TimelineBranch[] = [
  { id: "main", name: "main", lane: 0, color: "#a371f7" },
  { id: "fisica", name: "fisica", lane: 1, color: "#3fb950", parent: "main" },
  { id: "signo", name: "signo", lane: 1, color: "#f0883e", parent: "main" },
  { id: "humu", name: "humu", lane: 2, color: "#58a6ff", parent: "main" },
  { id: "jmn", name: "jmn", lane: 1, color: "#f778ba", parent: "main" },
];

// Dados mocados: ajuste os anos à vontade; as mensagens ficam em src/locales/<lang>/timeline.json.
const commitData: TimelineCommitData[] = [
  {
    id: "init",
    branch: "main",
    year: "2017",
  },
  {
    id: "lab",
    branch: "fisica",
    year: "2017",
  },
  {
    id: "python",
    branch: "fisica",
    year: "2018",
  },
  {
    id: "descoberta",
    branch: "fisica",
    year: "2018",
  },
  {
    id: "merge-fisica",
    branch: "main",
    year: "2019",
    merges: "fisica",
  },
  {
    id: "freela",
    branch: "main",
    year: "2019",
  },
  {
    id: "react",
    branch: "main",
    year: "2020",
  },
  {
    id: "typescript",
    branch: "main",
    year: "2021",
  },
  {
    id: "signo-in",
    branch: "signo",
    year: "2022",
  },
  {
    id: "loterica-nova",
    branch: "signo",
    year: "2022",
    project: "loterica-nova",
  },
  {
    id: "medguias",
    branch: "signo",
    year: "2023",
    project: "medguias",
  },
  {
    id: "lide-global",
    branch: "signo",
    year: "2023",
    project: "lide-global",
  },
  {
    id: "blocos-dinamicos",
    branch: "signo",
    year: "2024",
    project: "blocos-dinamicos",
  },
  {
    id: "sebrae",
    branch: "signo",
    year: "2025",
    project: "sebrae",
  },
  {
    id: "merge-signo",
    branch: "main",
    year: "2025",
    merges: "signo",
  },
  {
    id: "humu-in",
    branch: "humu",
    year: "2025",
  },
  {
    id: "i3pics",
    branch: "humu",
    year: "2025",
    project: "i3pics",
  },
  {
    id: "humu-ibk",
    branch: "humu",
    year: "2025",
    project: "humu",
  },
  {
    id: "lugpay",
    branch: "jmn",
    year: "2025",
    project: "lugpay",
  },
  {
    id: "humu-backoffice",
    branch: "humu",
    year: "2026",
    project: "humu-backoffice",
  },
  {
    id: "promocao",
    branch: "humu",
    year: "2026",
  },
  {
    id: "hoje",
    branch: "humu",
    year: "2026",
    refs: ["HEAD"],
  },
];

/** commits com a mensagem no idioma atual */
export function getTimelineCommits(): TimelineCommit[] {
  return commitData.map((commit) => ({
    ...commit,
    message: i18n.t(`timeline:${commit.id}`, { defaultValue: commit.id }),
  }));
}

export function branchById(id: string): TimelineBranch {
  const branch = timelineBranches.find((item) => item.id === id);

  if (!branch) {
    throw new Error(`Branch "${id}" não existe em timelineBranches`);
  }

  return branch;
}
