import { useMemo, useState, type ReactNode } from "react";

import { ActivityViewContext, type ActivityView } from "./activity-view";

interface ActivityViewProviderProps {
  children: ReactNode;
  defaultView?: ActivityView;
}

export function ActivityViewProvider({
  children,
  defaultView = "files",
}: ActivityViewProviderProps) {
  const [view, setViewState] = useState<ActivityView>(defaultView);
  const [isAsideOpen, setAsideOpen] = useState(false);

  const value = useMemo(
    () => ({
      view,
      isAsideOpen,
      setAsideOpen,
      // trocar de view por outro caminho (ex.: resultado da busca) também abre a gaveta
      setView: (next: ActivityView) => {
        setViewState(next);
        setAsideOpen(true);
      },
      toggleView: (next: ActivityView) => {
        if (next === view) {
          setAsideOpen((open) => !open);
          return;
        }
        setViewState(next);
        setAsideOpen(true);
      },
    }),
    [view, isAsideOpen],
  );

  return (
    <ActivityViewContext.Provider value={value}>
      {children}
    </ActivityViewContext.Provider>
  );
}
