import { useTranslation } from "react-i18next";

import { Codicon } from "@/components/atoms/codicon";
import { Icon } from "@/components/atoms/icon";
import { SearchInput } from "@/components/molecules/search-input";
import type { SearchIcon } from "@/lib/search";

import { useSearch } from "./use.index";

function ResultIcon({ icon }: { icon: SearchIcon }) {
  if (icon.type === "dot") {
    return (
      <span
        aria-hidden
        style={{ backgroundColor: icon.color }}
        className="size-2 shrink-0 rounded-full"
      />
    );
  }

  return <Icon icon={icon} size={16} />;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim();
  if (!term) return text;

  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="bg-ide-resize/30 text-ide-heading">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function SearchPanel() {
  const {
    query,
    setQuery,
    groups,
    total,
    suggestions,
    isCollapsed,
    toggleGroup,
    open,
  } = useSearch();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="px-3">
        <SearchInput
          placeholder={t("search.placeholder")}
          value={query}
          onChange={setQuery}
        />
      </div>

      {query.trim().length === 0 ? (
        <div className="flex flex-col gap-2 px-3">
          <p className="text-[11px] tracking-wider text-ide-muted uppercase">
            {t("search.tryFor")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="cursor-pointer rounded-full border border-ide-border px-2 py-0.5 text-xs text-ide-muted hover:border-ide-resize hover:text-ide-heading"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : total === 0 ? (
        <p className="px-3 text-[13px] text-ide-muted">
          {t("search.noResults", { query })}
        </p>
      ) : (
        <>
          <p className="px-3 text-xs text-ide-muted">
            {t("search.summary", {
              results: t("search.results", { count: total }),
              groups: t("search.groups", { count: groups.length }),
            })}
          </p>

          <div className="flex flex-col">
            {groups.map((group) => {
              const collapsed = isCollapsed(group.id);

              return (
                <section key={group.id}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={!collapsed}
                    className="flex h-[22px] w-full cursor-pointer items-center gap-1 px-2 text-left text-[11px] tracking-wider text-ide-muted uppercase hover:bg-ide-hover"
                  >
                    <Codicon
                      name={collapsed ? "chevron-right" : "chevron-down"}
                      size={14}
                      className="shrink-0"
                    />
                    <span className="flex-1 truncate">{group.label}</span>
                    <span className="shrink-0">{group.results.length}</span>
                  </button>

                  {!collapsed && (
                    <ul>
                      {group.results.map((result) => (
                        <li key={result.id}>
                          <button
                            type="button"
                            onClick={() => open(result)}
                            title={`${result.title} — ${result.detail}`}
                            className="flex w-full cursor-pointer items-start gap-2 py-1 pr-3 pl-6 text-left hover:bg-ide-hover"
                          >
                            <span className="mt-0.5 flex h-4 items-center">
                              <ResultIcon icon={result.icon} />
                            </span>

                            <span className="flex min-w-0 flex-1 flex-col">
                              <span className="truncate text-[13px] text-ide-fg">
                                <Highlight text={result.title} query={query} />
                              </span>
                              <span className="truncate text-[11px] text-ide-muted">
                                <Highlight text={result.detail} query={query} />
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
