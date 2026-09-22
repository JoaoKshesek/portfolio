# Portfólio · João Kshesek

Portfólio pessoal com a cara de um editor de código. A navegação imita o VS Code: barra de atividades, explorer com pastas de experiência, projetos e educação, abas, breadcrumbs, busca global, grafo de commits com a trajetória profissional e um painel de "extensões" com as tecnologias. Cada projeto abre como um arquivo, com preview do site em iframe ou um simulador de iPhone para os apps.

Disponível em português, inglês e espanhol, com tema escuro e claro, e adaptado para mobile.

## Stack

- **React 19** e **TypeScript**, com **Vite** e **Tailwind CSS 4**
- **react-i18next** para os três idiomas
- **@base-ui/react** para menus acessíveis
- **react-resizable-panels** para o painel lateral redimensionável
- **Phosphor Icons**, **Codicons** e **Material Icon Theme** para os ícones
- **Motion** para animações e **cobe** para o globo

## Rodando localmente

Requer Node 20 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Outros comandos:

```bash
pnpm build     # typecheck + build de produção em dist/
pnpm preview   # serve o build localmente
pnpm lint      # eslint
```

## Estrutura

```
src/
├── assets/
│   ├── icons/          # ícones das tecnologias
│   └── projects/<id>/  # logo, banner, icon e splashes de cada projeto
├── components/
│   ├── atoms/ molecules/ organisms/ templates/   # do menor ao maior
│   ├── layout/         # header, navigation, aside, main, footer
│   └── ui/             # componentes base (shadcn, iphone, glyph-matrix)
├── lib/                # dados e estado: projetos, experiência, educação, tecnologias, busca, editor
├── locales/
│   ├── pt/ en/ es/     # um JSON por namespace: ui, profile, experience, education, projects, technologies, timeline
├── projetos/
│   └── pt/ en/ es/     # markdown de cada projeto, um arquivo por idioma
└── i18n/               # bootstrap do i18next
```

Os arquivos em `src/lib/` guardam só a estrutura: ids, stacks, links, períodos. Todo texto visível vem de `src/locales/`.

## Editando o conteúdo

### Novo projeto

1. Adicione a entrada em `src/lib/projects.ts` com id, nome, tipos, empresa, papel e stack.
2. Crie `src/assets/projects/<id>/` com `logo.*` (listas), `banner.*` (cabeçalho da página) e, se for app, `icon.*` e `splash_01.*`, `splash_02.*`… para o simulador. Apenas projetos com o tipo `app` aparecem no celular.
3. Escreva a descrição curta em `src/locales/<lang>/projects.json` e o markdown em `src/projetos/<lang>/<id>.md`. Sem tradução, o site cai no português.

### Experiência, educação e tecnologias

A estrutura fica em `src/lib/experience.ts`, `src/lib/education.ts` e `src/lib/technologies.ts`. Os textos ficam nos JSONs de mesmo nome em `src/locales/<lang>/`, chaveados pelos mesmos ids.

### Trajetória

O grafo de commits é definido em `src/lib/timeline.ts`. Cada commit pode apontar para um projeto pelo id, o que o torna clicável. As mensagens ficam em `src/locales/<lang>/timeline.json`.

### Novo idioma

Crie a pasta em `src/locales/`, copie os sete JSONs de `pt/`, traduza, registre o idioma em `src/lib/preferences.ts` e em `src/i18n/index.ts`, e adicione a opção no menu de configurações.

## Contato

- LinkedIn: [in/joao-valter-kshesek](https://www.linkedin.com/in/joao-valter-kshesek/)
- GitHub: [@JoaoKshesek](https://github.com/JoaoKshesek)
