import { useActivityView, type ActivityView } from "@/lib/activity-view";

export interface UseAsideProps {
  view: ActivityView;
  title: string;
}

const titles: Record<ActivityView, string> = {
  files: "Explorer",
  search: "Buscar",
  scm: "Source Control",
  extensions: "Extensões",
  claude: "Claude Code",
};

export const useAside = (): UseAsideProps => {
  const { view } = useActivityView();

  return { view, title: titles[view] };
};
