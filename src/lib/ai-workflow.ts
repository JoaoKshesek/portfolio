export interface WorkflowAgent {
  id: string;
  name: string;
  role: string;
}

export interface WorkflowPhase {
  id: string;
  title: string;
  description: string;
  /** fase em que os agentes entram de fato */
  agents?: WorkflowAgent[];
}

export interface DocSection {
  title: string;
  body: string[];
  items?: string[];
}

export interface AiDoc {
  id: string;
  /** nome do arquivo na lista lateral */
  name: string;
  title: string;
  summary: string;
  sections: DocSection[];
  showPhases?: boolean;
  showAgents?: boolean;
}

export const workflowAgents: WorkflowAgent[] = [
  { id: "claude-code", name: "Claude Code", role: "implementação" },
  { id: "codex", name: "Codex", role: "implementação" },
  { id: "gemini", name: "Gemini", role: "segunda opinião" },
  { id: "cursor", name: "Cursor", role: "edição pontual" },
];

export const workflowPhases: WorkflowPhase[] = [
  {
    id: "spec",
    title: "Spec",
    description:
      "Escrevo o problema, o formato dos dados e o critério de pronto. É onde está o julgamento — e é a parte que não delego.",
  },
  {
    id: "planning",
    title: "Planning",
    description:
      "O Traycer transforma a spec em tickets: quais arquivos são tocados, em que ordem, o que cada passo entrega.",
  },
  {
    id: "execution",
    title: "Execution",
    description:
      "Os agentes executam ticket a ticket, em paralelo quando são independentes, compartilhando o mesmo contexto.",
    agents: workflowAgents,
  },
  {
    id: "review",
    title: "Review",
    description:
      "Leio o diff como leria o de um colega. Agente erra com confiança, então revisão é fase do processo, não boa vontade.",
  },
  {
    id: "commit",
    title: "Commit",
    description:
      "Commits semânticos, um por unidade de mudança — o histórico precisa contar o que aconteceu.",
  },
];

export const aiDocs: AiDoc[] = [
  {
    id: "spec-driven",
    name: "spec-driven.md",
    title: "Desenvolvimento guiado por spec",
    summary:
      "Escrever a spec antes do código deixou de ser burocracia no dia em que o código passou a ser escrito por um agente.",
    showPhases: true,
    sections: [
      {
        title: "Por que a spec vem primeiro",
        body: [
          "Um agente não trava quando o requisito está ambíguo — ele escolhe sozinho, com confiança, e você só descobre na revisão. A spec é onde essa escolha volta pra mim.",
          "Ela também é o que torna o trabalho paralelizável: com o critério de pronto escrito, dá pra rodar várias frentes ao mesmo tempo sem que uma desfaça a outra.",
        ],
      },
      {
        title: "O que a spec precisa ter",
        body: [],
        items: [
          "O problema, não a solução — a solução é o que estou delegando",
          "O formato dos dados: tipos, origem, o que é derivado",
          "O critério de pronto: o que precisa ser verdade pra fechar",
          "O que está fora de escopo, que é o que mais evita retrabalho",
        ],
      },
    ],
  },
  {
    id: "orquestracao",
    name: "orquestracao.md",
    title: "Orquestração de agentes",
    summary:
      "Um agente é um estagiário rápido. Vários agentes sem orquestração são vários estagiários rápidos se atropelando.",
    showAgents: true,
    sections: [
      {
        title: "O Traycer como camada",
        body: [
          "O Traycer é um workspace spec-first que roda vários agentes lado a lado — Claude Code, Codex, Gemini, Cursor — sobre o mesmo contexto compartilhado.",
          "Ele organiza o trabalho nas fases Planning, Execution e Review, com specs e tickets como artefatos rastreáveis. Para mudanças grandes existe o Epic Mode, que quebra a entrega em frentes e as acompanha até o fim.",
        ],
      },
      {
        title: "Por que mais de um modelo",
        body: [
          "Modelos diferentes erram de formas diferentes. Usar um para propor e outro para revisar pega o tipo de erro que passaria batido se fosse o mesmo modelo se auto-avaliando.",
          "O custo disso é coordenação: contexto duplicado, decisões conflitantes, retrabalho. É exatamente esse custo que a camada de orquestração existe para pagar.",
        ],
      },
      {
        title: "O que continua sendo meu",
        body: [],
        items: [
          "Decidir o que é o problema",
          "Escolher entre alternativas de arquitetura",
          "Revisar o diff antes do commit",
          "Assumir o que foi para produção",
        ],
      },
    ],
  },
];

export function aiDocById(id: string): AiDoc | undefined {
  return aiDocs.find((doc) => doc.id === id);
}
