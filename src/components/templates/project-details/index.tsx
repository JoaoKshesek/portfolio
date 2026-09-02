import { Codicon } from "@/components/atoms/codicon";
import { PhonePreview } from "@/components/molecules/phone-preview";
import { projectPreviewFile } from "@/lib/explorer-tree";
import { projectBanner } from "@/lib/project-assets";
import { projectTypeLabels } from "@/lib/projects";
import { useProjectDetails } from "./use.index";

interface ProjectDetailsProps {
  projectId: string;
}

const sidebarTitle = "mb-2 text-[11px] tracking-wider text-ide-muted uppercase";

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const { isLoading, error, project, stack, openFile, renderMarkdown } =
    useProjectDetails(projectId);

  if (isLoading) {
    return (
      <section className="min-h-0 flex-1 overflow-auto flex items-center justify-center text-[13px] text-ide-muted">
        <div className="flex flex-col items-center gap-2">
          <Codicon name="loading" size={32} />
          <p>Carregando...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-0 flex-1 overflow-auto px-6 py-4 text-[13px] text-ide-muted">
        <div className="text-red-500">{error || "Projeto não encontrado"}</div>
      </section>
    );
  }

  const isApp = project.types.includes("app");
  const banner = projectBanner(project.id);

  return (
    <div className="@container/pane flex min-h-0 flex-1 overflow-hidden">
      {/* Coluna de conteúdo: único elemento que rola */}
      <div className="@container min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {/* Banner/Header */}
          <header
            className="relative h-48 bg-cover bg-center rounded-lg overflow-hidden flex items-end"
            style={{
              backgroundImage: banner ? `url(${banner})` : undefined,
            }}
          >
            {/* Overlay gradient para melhor legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {!banner && (
              <div className="absolute inset-0 bg-gradient-to-br from-ide-editor to-ide-hover" />
            )}

            <div className="relative z-10 w-full px-6 pb-6 flex items-end gap-6">
              {/* Título e Tags */}
              <div className="flex-1 flex flex-col gap-3 pb-2">
                <p className="text-[13px] text-gray-300">Projeto</p>
                <h1 className="text-4xl leading-tight font-bold text-white">
                  {project.name}
                </h1>

                {/* Tags de tipo de projeto */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.types.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-400/40 bg-black/30 backdrop-blur px-3 py-1 text-xs text-gray-100"
                    >
                      <Codicon
                        name={
                          type === "site"
                            ? "globe"
                            : type === "app"
                              ? "device-desktop"
                              : type === "crm"
                                ? "database"
                                : "layers"
                        }
                        size={12}
                      />
                      {projectTypeLabels[type]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="h-px bg-ide-border mx-6" />

          {/* Conteúdo e Sidebar */}
          <div className="flex flex-col gap-8 @3xl:flex-row px-6 pb-6">
            <section className="flex min-w-0 flex-1 flex-col gap-4">
              {renderMarkdown()}
            </section>

            {/* Sidebar com Stack */}
            <aside className="flex w-full shrink-0 flex-col gap-6 @3xl:w-64">
              {stack.length > 0 && (
                <section>
                  <h2 className={sidebarTitle}>Stack</h2>
                  <ul className="flex flex-wrap gap-1.5">
                    {stack.map((technology) => (
                      <li key={technology.id}>
                        <button
                          type="button"
                          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-ide-border px-2 py-1 text-xs text-ide-fg hover:border-ide-resize hover:text-white transition-colors"
                        >
                          <img
                            src={technology.icon}
                            alt=""
                            aria-hidden
                            className="size-3.5 object-contain"
                          />
                          {technology.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {isApp ? (
                /* fallback: só aparece quando não há espaço para o simulador ao lado */
                <section className="@5xl/pane:hidden">
                  <h2 className={sidebarTitle}>Preview do app</h2>
                  <div className="mx-auto w-full max-w-60">
                    <PhonePreview className="w-full" />
                  </div>
                </section>
              ) : project.url ? (
                <section>
                  <h2 className={sidebarTitle}>Visitar projeto</h2>
                  <button
                    type="button"
                    onClick={() => {
                      const preview = projectPreviewFile(project);
                      if (preview) openFile(preview);
                    }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ide-fg hover:bg-ide-hover hover:text-white transition-colors"
                  >
                    <Codicon
                      name="link-external"
                      size={16}
                      className="shrink-0 text-ide-muted"
                    />
                    Abrir website
                  </button>
                </section>
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      {/* Simulador do app: coluna fixa, fora da área de rolagem */}
      {isApp && (
        <aside className="hidden w-[21rem] shrink-0 flex-col items-center px-6 py-6 @5xl/pane:flex">
          <h2 className={`${sidebarTitle} self-stretch`}>Preview do app</h2>
          {/* altura manda no tamanho: garante que o aparelho nunca é cortado */}
          <PhonePreview className="w-auto min-h-0 max-h-[36rem] flex-1" />
        </aside>
      )}
    </div>
  );
}
