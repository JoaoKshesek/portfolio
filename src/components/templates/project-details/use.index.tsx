import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useEditor } from "@/lib/editor";
import { projectById, type Project } from "@/lib/projects";
import { technologiesByIds, type Technology } from "@/lib/technologies";

export interface UseProjectDetailsProps {
  content: string;
  isLoading: boolean;
  error: string | null;
  project: Project | undefined;
  stack: Technology[];
  openFile: ReturnType<typeof useEditor>["openFile"];
  renderMarkdown: () => React.ReactNode[];
}

/** markdown dos projetos, empacotado pelo Vite e carregado sob demanda (funciona no build, sem depender de fetch em /src) */
const markdownFiles = import.meta.glob("/src/projetos/*/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export const useProjectDetails = (
  projectId: string,
): UseProjectDetailsProps => {
  const { openFile } = useEditor();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
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

        // um arquivo por idioma em src/projetos/<lang>/; sem tradução, cai no português
        const load =
          markdownFiles[`/src/projetos/${language}/${projectId}.md`] ??
          markdownFiles[`/src/projetos/pt/${projectId}.md`];

        if (load) {
          setContent(await load());
        } else {
          setError(t("project.loadError"));
        }
      } catch (err) {
        setError(t("project.fetchError"));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
    // t muda junto com language; listar só language evita recarregar à toa
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, language]);

  const renderMarkdown = () => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        i++;
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={i}
            className="text-lg font-bold text-ide-heading"
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
                {item}
              </li>
            ))}
          </ul>
        );
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

  return {
    content,
    isLoading,
    error,
    project,
    stack,
    openFile,
    renderMarkdown,
  };
};
