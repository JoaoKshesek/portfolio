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
  const [view, setView] = useState<ActivityView>(defaultView);

  const value = useMemo(() => ({ view, setView }), [view]);

  return (
    <ActivityViewContext.Provider value={value}>
      {children}
    </ActivityViewContext.Provider>
  );
}
