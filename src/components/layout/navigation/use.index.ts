import { useTranslation } from "react-i18next";

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

const items: Omit<NavigationItem, "label">[] = [
  { id: "files", icon: "files" },
  { id: "search", icon: "search" },
  { id: "scm", icon: "source-control", badge: 9 },
  { id: "extensions", icon: "extensions" },
  // TODO: reativar quando a seção de IA estiver pronta
  // { id: "claude", icon: "sparkle" },
];

const bottomItems: Omit<BottomNavigationItem, "label">[] = [
  { id: "account", icon: "account" },
];

export const useNavigation = (): useNavigationProps => {
  const { view, toggleView } = useActivityView();
  const { t } = useTranslation();

  return {
    items: items.map((item) => ({ ...item, label: t(`navigation.${item.id}`) })),
    bottomItems: bottomItems.map((item) => ({
      ...item,
      label: t(`navigation.${item.id}`),
    })),
    active: view,
    setActive: toggleView,
  };
};
