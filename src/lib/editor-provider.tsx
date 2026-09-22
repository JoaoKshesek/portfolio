import i18n from "i18next";
import { useMemo, useState, type ReactNode } from "react";

import { useActivityView } from "./activity-view";
import type { AiDoc } from "./ai-workflow";
import { EditorContext, type EditorTab } from "./editor";
import {
  nodeIcon,
  projectDescriptionFile,
  projectPreviewFile,
  readmeFile,
  type TreeFile,
} from "./explorer-tree";
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
    path: [i18n.t("ui:editor.extensionsPath"), technology.name],
    content: { kind: "technology", technology },
  };
}

function aiDocTab(doc: AiDoc): EditorTab {
  return {
    id: `ia:${doc.id}`,
    name: doc.name,
    icon: { type: "codicon", name: "sparkle", className: "text-ide-indicator" },
    path: ["ia", doc.name],
    content: { kind: "ai", docId: doc.id },
  };
}

function projectTab(project: Project): EditorTab {
  return fileTab(projectPreviewFile(project) ?? projectDescriptionFile(project));
}

export function EditorProvider({ children }: EditorProviderProps) {
  // o portfólio abre no README, como um projeto que já vem com um arquivo aberto
  const [tabs, setTabs] = useState<EditorTab[]>(() => [fileTab(readmeFile)]);
  const [activeId, setActiveId] = useState<string | null>(readmeFile.id);
  const { setAsideOpen } = useActivityView();

  const value = useMemo(() => {
    const open = (tab: EditorTab) => {
      if (!tabs.some((current) => current.id === tab.id)) {
        setTabs([...tabs, tab]);
      }

      setActiveId(tab.id);
      // no mobile o painel é uma gaveta: abrir um arquivo fecha a gaveta para liberar a leitura
      setAsideOpen(false);
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
      openAiDoc: (doc: AiDoc) => open(aiDocTab(doc)),
      activateTab: setActiveId,
      closeTab,
    };
  }, [tabs, activeId, setAsideOpen]);

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
