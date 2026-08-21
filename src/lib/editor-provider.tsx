import { useMemo, useState, type ReactNode } from "react";

import { EditorContext, type EditorTab } from "./editor";
import { nodeIcon, type TreeFile } from "./explorer-tree";
import type { Project } from "./projects";
import type { Technology } from "./technologies";

interface EditorProviderProps {
  children: ReactNode;
}

function fileTab(file: TreeFile): EditorTab {
  return {
    id: file.id,
    name: file.name,
    icon: nodeIcon(file, false),
    path: file.id.split("/"),
    content: file.content ?? { kind: "file", path: file.id },
  };
}

function technologyTab(technology: Technology): EditorTab {
  return {
    id: `extensao:${technology.id}`,
    name: technology.name,
    icon: { type: "image", src: technology.icon },
    path: ["extensões", technology.name],
    content: { kind: "technology", technology },
  };
}

function projectTab(project: Project): EditorTab {
  const base = `src/projetos/${project.id}`;

  if (!project.url) {
    return fileTab({
      type: "file",
      id: `${base}/descricao.md`,
      name: "descricao.md",
    });
  }

  return fileTab({
    type: "file",
    id: `${base}/preview.png`,
    name: "preview.png",
    content: { kind: "site", url: project.url, title: project.name },
  });
}

export function EditorProvider({ children }: EditorProviderProps) {
  const [tabs, setTabs] = useState<EditorTab[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const value = useMemo(() => {
    const open = (tab: EditorTab) => {
      if (!tabs.some((current) => current.id === tab.id)) {
        setTabs([...tabs, tab]);
      }

      setActiveId(tab.id);
    };

    const closeTab = (id: string) => {
      const index = tabs.findIndex((tab) => tab.id === id);
      if (index === -1) return;

      const remaining = tabs.filter((tab) => tab.id !== id);
      setTabs(remaining);

      if (activeId === id) {
        const neighbour = remaining[index] ?? remaining[index - 1] ?? null;
        setActiveId(neighbour?.id ?? null);
      }
    };

    return {
      tabs,
      activeId,
      activeTab: tabs.find((tab) => tab.id === activeId) ?? null,
      openFile: (file: TreeFile) => open(fileTab(file)),
      openTechnology: (technology: Technology) =>
        open(technologyTab(technology)),
      openProject: (project: Project) => open(projectTab(project)),
      activateTab: setActiveId,
      closeTab,
    };
  }, [tabs, activeId]);

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
