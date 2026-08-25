import { useEffect, useState } from "react";

import { useEditor } from "@/lib/editor";
import { projectById, type Project } from "@/lib/projects";
import { technologiesByIds, type Technology } from "@/lib/technologies";
import { Codicon } from "@/components/atoms/codicon";

export interface UseProjectDetailsProps {
  content: string;
  isLoading: boolean;
  error: string | null;
  project: Project | undefined;
  stack: Technology[];
  openFile: ReturnType<typeof useEditor>["openFile"];
  renderMarkdown: () => React.ReactNode[];
}

export const useProjectDetails = (
  projectId: string,
): UseProjectDetailsProps => {
  const { openFile } = useEditor();
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
