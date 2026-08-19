import { useMemo, useState } from "react";

export interface Technology {
  id: string;
  icon: string;
  name: string;
  description: string;
}

export interface UseTechnologyListProps {
  filtered: Technology[];
  search: string;
  setSearch: (search: string) => void;
}

export const useTechnologyList = (
  data: Technology[],
): UseTechnologyListProps => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(
      (tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase()) ||
        tech.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  return { filtered, search, setSearch };
};
