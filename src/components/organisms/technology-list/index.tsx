import { Menu } from "@base-ui/react/menu";
import { Codicon } from "@/components/atoms/codicon";
import { useTechnologyList } from "./use.index";
import { TechnologyCard } from "@/components/molecules/technology-card";
import { SearchInput } from "@/components/molecules/search-input";
import type { Technology } from "@/lib/technologies";

interface TechnologyListProps {
  data: Technology[];
  placeholder?: string;
}

export function TechnologyList({
  data,
  placeholder = "Buscar tecnologias...",
}: TechnologyListProps) {
  const {
    filtered,
    search,
    setSearch,
    isFilterOpen,
    setIsFilterOpen,
    selectedCategories,
    toggleCategory,
    categories,
  } = useTechnologyList(data);

  return (
    <div className="flex flex-col gap-3 h-full overflow-visible">
      <div className="relative mx-3 overflow-visible">
        <Menu.Root
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <SearchInput
            placeholder={placeholder}
            value={search}
            onChange={setSearch}
            showIcon={false}
            rightSlot={
              <Menu.Trigger className="flex items-center justify-center outline-none">
                <Codicon
                  name="filter"
                  className={`text-ide-muted cursor-pointer hover:text-ide-fg ${isFilterOpen ? "text-ide-fg" : ""}`}
                  size={16}
                />
              </Menu.Trigger>
            }
          />

          <Menu.Portal>
            <Menu.Positioner
              side="bottom"
              align="start"
              sideOffset={4}
              className="z-50"
            >
              <Menu.Popup className="min-w-48 rounded-md border border-ide-border bg-ide-titlebar/80 backdrop-blur-md p-1 text-[13px] text-ide-fg shadow-2xl outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0">
                <div className="px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase font-semibold">
                  Categorias
                </div>

                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none data-highlighted:bg-ide-hover data-highlighted:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-3 h-3 cursor-pointer"
                    />
                    <span className="flex-1">{category.label}</span>
                  </label>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
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
