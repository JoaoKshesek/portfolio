import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActivityView } from "@/lib/activity-view";
import { useEditor } from "@/lib/editor";
import {
  countResults,
  search,
  searchSuggestions,
  type SearchGroup,
  type SearchResult,
} from "@/lib/search";

export interface UseSearchProps {
  query: string;
  setQuery: (query: string) => void;
  groups: SearchGroup[];
  total: number;
  suggestions: string[];
  isCollapsed: (groupId: string) => boolean;
  toggleGroup: (groupId: string) => void;
  open: (result: SearchResult) => void;
}

export const useSearch = (): UseSearchProps => {
  const { openTechnology, openProject, openFile, openAiDoc } = useEditor();
  const { setView } = useActivityView();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const { i18n } = useTranslation();
  const language = i18n.language;

  // o índice e as sugestões vêm do i18n global, por isso os memos dependem do idioma
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const groups = useMemo(() => search(query), [query, language]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const suggestions = useMemo(() => searchSuggestions(), [language]);

  const open = (result: SearchResult) => {
    const { target } = result;

    switch (target.kind) {
      case "technology":
        openTechnology(target.technology);
        break;
      case "project":
        openProject(target.project);
        break;
      case "file":
        openFile(target.file);
        break;
      case "ai":
        openAiDoc(target.doc);
        break;
      case "commit":
        // commits não viram aba: o lugar deles é o grafo
        setView("scm");
        break;
    }
  };

  return {
    query,
    setQuery,
    groups,
    total: countResults(groups),
    suggestions,
    isCollapsed: (groupId: string) => collapsed.includes(groupId),
    toggleGroup: (groupId: string) =>
      setCollapsed((prev) =>
        prev.includes(groupId)
          ? prev.filter((id) => id !== groupId)
          : [...prev, groupId],
      ),
    open,
  };
};
