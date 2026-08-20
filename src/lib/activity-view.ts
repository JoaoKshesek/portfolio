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
