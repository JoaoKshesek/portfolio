import { createContext, useContext } from "react";

export const activityViews = [
  "files",
  "search",
  "scm",
  "extensions",
  "claude",
] as const;

export type ActivityView = (typeof activityViews)[number];

export interface ActivityViewContextValue {
  view: ActivityView;
  setView: (view: ActivityView) => void;
  /**
   * no mobile o painel lateral é uma gaveta: aberto pelo ícone da barra de
   * atividades e fechado ao escolher um arquivo. No desktop fica sempre visível.
   */
  isAsideOpen: boolean;
  setAsideOpen: (open: boolean) => void;
  /** clique na barra de atividades: troca a view, ou fecha a gaveta se já era a view ativa */
  toggleView: (view: ActivityView) => void;
}

export const ActivityViewContext =
  createContext<ActivityViewContextValue | null>(null);

export function useActivityView(): ActivityViewContextValue {
  const context = useContext(ActivityViewContext);

  if (!context) {
    throw new Error(
      "useActivityView precisa estar dentro de <ActivityViewProvider>",
    );
  }

  return context;
}
