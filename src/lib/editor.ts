import { createContext, useContext } from "react";

import type { FileContent, ProjectDescriptionContent, TreeFile } from "@/lib/explorer-tree";
import type { AiDoc } from "@/lib/ai-workflow";
import type { Project } from "@/lib/projects";
import type { Technology } from "@/lib/technologies";

import type { IconSpec } from "@/lib/icons";

export type TabIcon = IconSpec;

export type TabContent =
  | FileContent
  | { kind: "file"; path: string }
  | { kind: "technology"; technology: Technology }
  | { kind: "ai"; docId: string }
  | { kind: "project-description"; projectId: string; path: string };

export interface EditorTab {
  id: string;
  name: string;
  icon: TabIcon;
  /** trilha exibida no breadcrumb */
  path: string[];
  content: TabContent;
}

export interface EditorContextValue {
  tabs: EditorTab[];
  activeId: string | null;
  activeTab: EditorTab | null;
  openFile: (file: TreeFile) => void;
  openTechnology: (technology: Technology) => void;
  openProject: (project: Project) => void;
  openAiDoc: (doc: AiDoc) => void;
  activateTab: (id: string) => void;
  closeTab: (id: string) => void;
}

export const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditor(): EditorContextValue {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor precisa estar dentro de <EditorProvider>");
  }

  return context;
}
