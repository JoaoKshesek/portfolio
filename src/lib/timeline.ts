export interface TimelineBranch {
  id: string;
  name: string;
  lane: number;
  color: string;
  /** branch de onde ela nasce */
  parent?: string;
}

export interface TimelineCommit {
  id: string;
  branch: string;
  year: string;
  message: string;
  /** id em @/lib/projects — torna o commit clicável */
  project?: string;
  /** branch que este commit encerra */
  merges?: string;
  refs?: string[];
}

export const timelineBranches: TimelineBranch[] = [
  { id: "main", name: "main", lane: 0, color: "#a371f7" },
  { id: "fisica", name: "fisica", lane: 1, color: "#3fb950", parent: "main" },
  { id: "signo", name: "signo", lane: 1, color: "#f0883e", parent: "main" },
  { id: "humu", name: "humu", lane: 2, color: "#58a6ff", parent: "main" },
  { id: "jmn", name: "jmn", lane: 1, color: "#f778ba", parent: "main" },
];

// Dados mocados: ajuste as mensagens e os anos à vontade.
export const timelineCommits: TimelineCommit[] = [
  {
    id: "init",
    branch: "main",
    year: "2017",
    message: "init: primeiro semestre de Física",
  },
  {
    id: "lab",
    branch: "fisica",
    year: "2017",
    message: "feat(lab): computação científica na graduação",
  },
  {
    id: "python",
    branch: "fisica",
    year: "2018",
    message: "feat(python): scripts para análise de dados",
  },
  {
    id: "descoberta",
    branch: "fisica",
    year: "2018",
    message: "chore: o código ficou mais divertido que o cálculo",
  },
  {
    id: "merge-fisica",
    branch: "main",
    year: "2019",
    message: "merge: mergulhei de cabeça no código",
    merges: "fisica",
  },
  {
    id: "freela",
    branch: "main",
    year: "2019",
    message: "feat: primeiros freelas de front-end",
  },
  {
    id: "react",
    branch: "main",
    year: "2020",
    message: "feat(react): componentes viram o dia a dia",
  },
  {
    id: "typescript",
    branch: "main",
    year: "2021",
    message: "refactor(ts): tipagem em tudo",
  },
  {
    id: "signo-in",
    branch: "signo",
    year: "2022",
    message: "feat: entrei na Signo",
  },
  {
    id: "loterica-nova",
    branch: "signo",
    year: "2022",
    message: "feat(loterica-nova): manutenção e novas features no site",
    project: "loterica-nova",
  },
  {
    id: "medguias",
    branch: "signo",
    year: "2023",
    message: "feat(medguias): manutenção e novas features no site",
    project: "medguias",
  },
  {
    id: "lide-global",
    branch: "signo",
    year: "2023",
    message: "feat(lide-global): CRM e app",
    project: "lide-global",
  },
  {
    id: "blocos-dinamicos",
    branch: "signo",
    year: "2024",
    message: "feat(blocos-dinamicos): CRM e site",
    project: "blocos-dinamicos",
  },
  {
    id: "blumenau-fc",
    branch: "signo",
    year: "2024",
    message: "feat(blumenau-fc): site no ar",
    project: "blumenau-fc",
  },
  {
    id: "sebrae",
    branch: "signo",
    year: "2025",
    message: "feat(sebrae): manutenção e novas features, alocado na Weef",
    project: "sebrae",
  },
  {
    id: "merge-signo",
    branch: "main",
    year: "2025",
    message: "merge: três anos de Signo",
    merges: "signo",
  },
  {
    id: "humu-in",
    branch: "humu",
    year: "2025",
    message: "feat: entrei na Humu",
  },
  {
    id: "i3pics",
    branch: "humu",
    year: "2025",
    message: "feat(i3pics): app publicado",
    project: "i3pics",
  },
  {
    id: "humu-ibk",
    branch: "humu",
    year: "2025",
    message: "feat(humu-ibk): manutenção e novas features no sistema web",
    project: "humu-ibk",
  },
  {
    id: "lugpay",
    branch: "jmn",
    year: "2025",
    message: "feat(lugpay): app da JMN",
    project: "lugpay",
  },
  {
    id: "ionboarding",
    branch: "humu",
    year: "2026",
    message: "feat(ionboarding): manutenção e novas features no CRM",
    project: "ionboarding",
  },
  {
    id: "ibass",
    branch: "humu",
    year: "2026",
    message: "feat(ibass): manutenção e novas features no CRM",
    project: "ibass",
  },
  {
    id: "humu-lp",
    branch: "humu",
    year: "2026",
    message: "feat(humu-lp): manutenção e novas features no site",
    project: "humu-lp",
  },
  {
    id: "humu-backoffice",
    branch: "humu",
    year: "2026",
    message: "feat(humu-backoffice): manutenção e novas features no backoffice",
    project: "humu-backoffice",
  },
  {
    id: "promocao",
    branch: "humu",
    year: "2026",
    message: "feat: promovido a Tech Lead",
  },
  {
    id: "hoje",
    branch: "humu",
    year: "2026",
    message: "wip: desenvolvimento assistido por IA e orquestração de agentes",
    refs: ["HEAD"],
  },
];

export function branchById(id: string): TimelineBranch {
  const branch = timelineBranches.find((item) => item.id === id);

  if (!branch) {
    throw new Error(`Branch "${id}" não existe em timelineBranches`);
  }

  return branch;
}
