import { Codicon } from "@/components/atoms/codicon";
import { useEditor } from "@/lib/editor";
import { projectsUsing } from "@/lib/projects";
import { categoryLabels, type Technology } from "@/lib/technologies";

interface TechnologyDetailsProps {
  technology: Technology;
}

export function TechnologyDetails({ technology }: TechnologyDetailsProps) {
  const { openProject } = useEditor();
  const projects = projectsUsing(technology.id);

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-6">
        <header className="flex gap-5">
          <img
            src={technology.icon}
            alt=""
            aria-hidden
            className="size-20 shrink-0 rounded-md object-contain"
          />

          <div className="flex min-w-0 flex-col gap-2">
            <h1 className="text-2xl leading-tight font-semibold text-white">
              {technology.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ide-muted">
              <span className="flex items-center gap-1">
                <Codicon name="tag" size={14} />
                {categoryLabels[technology.category]}
              </span>
              <span className="flex items-center gap-1">
                <Codicon name="clock" size={14} />
                {technology.time} de uso
              </span>
              <span className="flex items-center gap-1">
                <Codicon name="briefcase" size={14} />
                {projects.length}{" "}
                {projects.length === 1 ? "projeto" : "projetos"}
              </span>
            </div>

            <p className="text-[13px] text-ide-fg">{technology.description}</p>
          </div>
        </header>

        <div className="h-px bg-ide-border" />

        <div className="flex flex-col gap-6 @3xl:flex-row">
          <section className="flex min-w-0 flex-1 flex-col gap-2">
            <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
              Projetos
            </h2>

            {projects.length > 0 ? (
              <ul className="flex flex-col">
                {projects.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      className="group flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-left text-[13px] text-ide-fg hover:bg-ide-hover hover:text-white"
                    >
                      <Codicon
                        name={project.url ? "globe" : "file"}
                        size={16}
                        className="shrink-0 text-ide-muted"
                      />
                      <span className="flex-1 truncate">{project.name}</span>
                      <Codicon
                        name="chevron-right"
                        size={14}
                        className="shrink-0 text-ide-muted opacity-0 group-hover:opacity-100"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-2 text-[13px] text-ide-muted">
                Nenhum projeto listado com essa tecnologia ainda.
              </p>
            )}
          </section>

          <aside className="w-full shrink-0 @3xl:w-64">
            <h2 className="mb-2 text-[11px] tracking-wider text-ide-muted uppercase">
              Detalhes
            </h2>

            <dl className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between gap-3 border-b border-ide-border pb-2">
                <dt className="text-ide-muted">Identificador</dt>
                <dd className="truncate font-mono text-xs text-ide-fg">
                  {technology.id}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-ide-border pb-2">
                <dt className="text-ide-muted">Categoria</dt>
                <dd className="text-ide-fg">
                  {categoryLabels[technology.category]}
                </dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-ide-border pb-2">
                <dt className="text-ide-muted">Tempo de uso</dt>
                <dd className="text-ide-fg">{technology.time}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ide-muted">Projetos</dt>
                <dd className="text-ide-fg">{projects.length}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
