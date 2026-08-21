export interface Role {
  id: string;
  title: string;
  period: string;
  duration: string;
  model: string;
  /** a frase que se lê em três segundos, antes dos bullets */
  summary: string;
  responsibilities: string[];
  achievements: string[];
  /** ids de @/lib/technologies */
  stack: string[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  period: string;
  duration: string;
  roles: Role[];
}

export const companies: Company[] = [
  {
    id: "humu",
    name: "Humu",
    description:
      "Instituição de pagamento focada em soluções financeiras digitais — transferências, pagamentos e gestão financeira para empresas e consumidores.",
    location: "Curitiba, PR",
    period: "Jul 2025 — atual",
    duration: "1 ano e 2 meses",
    roles: [
      {
        id: "tech-lead",
        title: "Tech Lead",
        period: "Mar 2026 — atual",
        duration: "6 meses",
        model: "Híbrido",
        summary:
          "Lidero o frontend de uma instituição de pagamento — web e mobile, sob LGPD e PCI DSS.",
        responsibilities: [
          "Lidero o time de frontend: arquitetura, qualidade de código e decisões que precisam durar.",
          "Defino o roadmap técnico de web e mobile equilibrando entrega, escala e conformidade regulatória.",
          "Cuido do planejamento de releases, dos pipelines de CI/CD e do que roda em produção.",
          "Mantenho a observabilidade em Grafana e Kibana: dashboards, alertas e pipelines de log.",
        ],
        achievements: [
          "Migrei a arquitetura mobile para uma estrutura modular e escalável, com cobertura de testes maior.",
          "Padronizei as práticas de frontend entre web e mobile, reduzindo bugs e retrabalho.",
          "Virei o ponto de contato técnico de conformidade, garantindo aderência a LGPD e PCI DSS.",
          "Melhorei a observabilidade a ponto de detectar degradação de performance antes do usuário sentir.",
        ],
        stack: ["typescript", "react", "nextjs", "react-native", "jest", "git"],
      },
      {
        id: "desenvolvedor-senior",
        title: "Desenvolvedor Front-end Sênior",
        period: "Jul 2025 — Mar 2026",
        duration: "9 meses",
        model: "Presencial",
        summary:
          "Construí interfaces financeiras, web e mobile, num ambiente onde errar com dado é caro.",
        responsibilities: [
          "Desenvolvi interfaces seguras e responsivas em React para fluxos financeiros.",
          "Modelei componentes reutilizáveis, com acessibilidade e consistência visual.",
          "Trabalhei junto de backend e segurança pela integridade dos dados e pelas normas (LGPD, PCI DSS).",
          "Ajudei a definir a arquitetura mobile, buscando desacoplamento e testabilidade.",
        ],
        achievements: [
          "Entreguei as features de emissão e conciliação de boletos bancários.",
          "Participei da reestruturação da arquitetura mobile que virou base do time.",
        ],
        stack: ["typescript", "react", "react-native", "node", "jest"],
      },
    ],
  },
  {
    id: "signo",
    name: "Signo Tech",
    description:
      "Software house de soluções sob medida, entregando produtos escaláveis para clientes de setores bem diferentes.",
    location: "Curitiba, PR",
    period: "Out 2022 — Jun 2025",
    duration: "2 anos e 9 meses",
    roles: [
      {
        id: "desenvolvedor-front-end",
        title: "Desenvolvedor Front-end",
        period: "Out 2022 — Jun 2025",
        duration: "2 anos e 9 meses",
        model: "Presencial",
        summary:
          "Um cliente novo a cada ciclo: do e-commerce ao app, sempre com o produto no ar no fim.",
        responsibilities: [
          "Desenvolvi e otimizei interfaces em React e Next.js.",
          "Modelei a arquitetura dos projetos pensando em escala e reuso de componentes.",
          "Integrei APIs externas de forma segura e sustentável.",
          "Liderei times técnicos em aplicações web e mobile, com code review e mentoria.",
        ],
        achievements: [
          "Implantei práticas de segurança no frontend, prevenindo vulnerabilidades em sistemas críticos.",
          "Reduzi o tempo de carregamento das aplicações com cache e lazy loading.",
          "Subi a cobertura de testes unitários e de integração, derrubando a incidência de bugs.",
          "Introduzi pipelines de CI/CD, automatizando deploys e tirando o erro humano da produção.",
        ],
        stack: [
          "typescript",
          "javascript",
          "react",
          "nextjs",
          "node",
          "express",
          "jest",
          "cypress",
          "docker",
        ],
      },
    ],
  },
];

export interface RoleLocation {
  company: Company;
  role: Role;
}

export function findRole(
  companyId: string,
  roleId: string,
): RoleLocation | undefined {
  const company = companies.find((item) => item.id === companyId);
  const role = company?.roles.find((item) => item.id === roleId);

  return company && role ? { company, role } : undefined;
}
