import { useState } from "react";

interface NavigationItem {
  id: string;
  icon: string;
  label: string;
  badge?: number;
}

export interface useNavigationProps {
  items: NavigationItem[];
  bottomItems: NavigationItem[];
  active: string;
  setActive: (id: string) => void;
}

export const useNavigation = (): useNavigationProps => {
  const [active, setActive] = useState("files");

  const items = [
    { id: "files", icon: "files", label: "Explorer" },
    { id: "search", icon: "search", label: "Buscar" },
    { id: "scm", icon: "source-control", label: "Source Control", badge: 9 },
    { id: "extensions", icon: "extensions", label: "Extensões" },
    { id: "claude", icon: "sparkle", label: "Claude Code" },
  ];

  const bottomItems = [{ id: "account", icon: "account", label: "Conta" }];

  return { items, bottomItems, active, setActive };
};
