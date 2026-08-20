import { Codicon } from "@/components/atoms/codicon";
import { useTechnologyList } from "./use.index";
import { TechnologyCard } from "@/components/molecules/technology-card";
import type { Technology } from "@/lib/technologies";

interface TechnologyListProps {
  data: Technology[];
  placeholder?: string;
}

export function TechnologyList({
  data,
  placeholder = "Buscar tecnologias...",
}: TechnologyListProps) {
  const { filtered, search, setSearch } = useTechnologyList(data);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-ide-sidebar border border-ide-border">
        <Codicon
          name="search"
          size={16}
          className="text-ide-muted flex-shrink-0"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-ide-fg placeholder:text-ide-muted outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-ide-muted hover:text-ide-fg transition-colors flex-shrink-0"
          >
            <Codicon name="close" size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {filtered.length > 0 ? (
          filtered.map((tech) => (
            <TechnologyCard
              key={tech.id}
              icon={tech.icon}
              name={tech.name}
              description={tech.description}
              time={tech.time}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-ide-muted text-sm">
            Nenhuma tecnologia encontrada
          </div>
        )}
      </div>
    </div>
  );
}
