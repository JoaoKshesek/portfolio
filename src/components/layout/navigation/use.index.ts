import { useActivityView, type ActivityView } from "@/lib/activity-view";

interface NavigationItem {
  id: ActivityView;
  icon: string;
  label: string;
  badge?: number;
}

interface BottomNavigationItem {
  id: string;
  icon: string;
  label: string;
}

export interface useNavigationProps {
  items: NavigationItem[];
  bottomItems: BottomNavigationItem[];
  active: ActivityView;
  setActive: (id: ActivityView) => void;
}

const items: NavigationItem[] = [
  { id: "files", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Buscar" },
  { id: "scm", icon: "source-control", label: "Source Control", badge: 9 },
  { id: "extensions", icon: "extensions", label: "Extensões" },
  { id: "claude", icon: "sparkle", label: "Claude Code" },
];

const bottomItems: BottomNavigationItem[] = [
  { id: "account", icon: "account", label: "Conta" },
];

export const useNavigation = (): useNavigationProps => {
  const { view, setView } = useActivityView();

  return { items, bottomItems, active: view, setActive: setView };
};
