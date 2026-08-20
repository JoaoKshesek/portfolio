import { useMemo, useState } from "react";

import type { Technology, TechnologyCategory } from "@/lib/technologies";

export interface UseTechnologyListProps {
  filtered: Technology[];
  search: string;
  setSearch: (search: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  selectedCategories: TechnologyCategory[];
  toggleCategory: (category: TechnologyCategory) => void;
  categories: { id: TechnologyCategory; label: string }[];
  filteredByCategory: Technology[];
}

export const useTechnologyList = (
  data: Technology[],
): UseTechnologyListProps => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<TechnologyCategory[]>([]);

  const categories: { id: TechnologyCategory; label: string }[] = [
    { id: "ferramentas", label: "Ferramentas" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "infraestrutura", label: "Infraestrutura" },
  ];

  const toggleCategory = (category: TechnologyCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase()) ||
        tech.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const filteredByCategory = useMemo(() => {
    if (selectedCategories.length === 0) return filtered;
    return filtered.filter((tech) =>
      selectedCategories.includes(tech.category)
    );
  }, [filtered, selectedCategories]);

  return {
    filtered: filteredByCategory,
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    selectedCategories,
    toggleCategory,
    categories,
    filteredByCategory,
  };
};
