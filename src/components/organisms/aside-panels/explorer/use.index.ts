import { useState } from "react";

import { useEditor } from "@/lib/editor";
import {
  explorerRoot,
  folderIds,
  type ExplorerRoot,
  type TreeFile,
} from "@/lib/explorer-tree";

const defaultExpanded = folderIds(explorerRoot.children, true);

export interface UseExplorerProps {
  root: ExplorerRoot;
  isRootOpen: boolean;
  toggleRoot: () => void;
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
  collapseAll: () => void;
  refresh: () => void;
  selectedId: string | null;
  select: (file: TreeFile) => void;
}

export const useExplorer = (): UseExplorerProps => {
  const { activeId, openFile } = useEditor();
  const [isRootOpen, setIsRootOpen] = useState(true);
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggle = (id: string) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );

  const collapseAll = () => setExpanded([]);

  const refresh = () => setExpanded(defaultExpanded);

  return {
    root: explorerRoot,
    isRootOpen,
    toggleRoot: () => setIsRootOpen((prev) => !prev),
    isExpanded: (id: string) => expanded.includes(id),
    toggle,
    collapseAll,
    refresh,
    selectedId: activeId,
    select: openFile,
  };
};
