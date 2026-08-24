import { useEffect, useState } from "react";
import { Codicon } from "@/components/atoms/codicon";
import { projectById, projectTypeLabels } from "@/lib/projects";
import { technologiesByIds } from "@/lib/technologies";
import { useEditor } from "@/lib/editor";

interface ProjectDetailsProps {
  projectId: string;
  path: string;
}

const sidebarTitle = "mb-2 text-[11px] tracking-wider text-ide-muted uppercase";

export function ProjectDetails({ projectId, path }: ProjectDetailsProps) {
  const { activateTab, openFile } = useEditor();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const project = projectById(projectId);
  const stack = project ? technologiesByIds(project.stack) : [];

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Carregar o arquivo markdown
        const filePath = `/src/projetos/signo/${projectId}/descricao.md`;
        const response = await fetch(filePath);

        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setError("Não foi possível carregar a descrição do projeto");
        }
      } catch (err) {
        setError("Erro ao carregar o arquivo de descrição");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, [projectId]);

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

  // Renderizar markdown de forma melhorada
  const renderMarkdown = () => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        // Skip main title - será exibido no header
        i++;
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-lg font-bold text-white mt-6 mb-3"
          >
            {line.replace(/^## /, "")}
          </h2>
        );
        i++;
      } else if (line.startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          listItems.push(
            lines[i]
              .replace(/^- /, "")
              .replace(/\*\*(.+?)\*\*/g, "$1")
              .replace(/\*(.+?)\*/g, "$1")
          );
          i++;
        }
        elements.push(
          <ul key={`list-${i}`} className="ml-6 flex flex-col gap-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex gap-2 text-[13px] text-ide-fg">
                <Codicon
                  name="circle-small-filled"
                  size={16}
                  className="mt-px shrink-0 text-ide-muted"
                />
                {item}
              </li>
            ))}
          </ul>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={`space-${i}`} className="h-2" />);
        i++;
      } else if (line.trim() !== "") {
        elements.push(
          <p key={i} className="text-ide-fg text-[13px]">
            {line}
          </p>
        );
        i++;
      } else {
        i++;
      }
    }

    return elements;
  };

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-6">
        {/* Banner/Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-[13px] text-ide-muted mb-2">Projeto</p>

              <h1 className="text-3xl leading-tight font-bold text-white mb-3">
                {project.name}
              </h1>

              {/* Tags de tipo de projeto */}
              <div className="flex flex-wrap gap-2">
                {project.types.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ide-border bg-ide-editor/50 px-3 py-1 text-xs text-ide-fg"
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

        <div className="h-px bg-ide-border" />

        {/* Conteúdo e Sidebar */}
        <div className="flex flex-col gap-8 @3xl:flex-row">
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

            {project.url && (
              <section>
                <h2 className={sidebarTitle}>Visitar projeto</h2>
                <button
                  type="button"
                  onClick={() =>
                    openFile({
                      type: "file",
                      id: `${project.id}-preview`,
                      name: "preview.png",
                      content: {
                        kind: "site",
                        url: project.url,
                        title: project.name,
                      },
                    })
                  }
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
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
