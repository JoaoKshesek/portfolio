import { useTranslation } from "react-i18next";

import { Codicon } from "@/components/atoms/codicon";
import { TreeItem } from "@/components/molecules/tree-item";

import { useExplorer } from "./use.index";

const actionClass =
  "flex size-6 items-center justify-center rounded-sm text-ide-muted hover:bg-ide-hover hover:text-ide-heading disabled:pointer-events-none disabled:opacity-40";

export function ExplorerPanel() {
  const {
    root,
    isRootOpen,
    toggleRoot,
    isExpanded,
    toggle,
    collapseAll,
    refresh,
    selectedId,
    select,
  } = useExplorer();
  const { t } = useTranslation();

  return (
    <div className="pb-3 text-[13px]">
      <div className="group flex h-7 items-center pr-1 pl-2 hover:bg-ide-hover">
        <button
          type="button"
          onClick={toggleRoot}
          aria-expanded={isRootOpen}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1 text-left outline-none"
        >
          <Codicon
            name={isRootOpen ? "chevron-down" : "chevron-right"}
            size={16}
            className="shrink-0 text-ide-muted"
          />
          <span className="truncate font-semibold text-ide-heading">{root.name}</span>
        </button>

        <div className="flex shrink-0 items-center opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            disabled
            aria-label={t("explorer.newFile")}
            title={t("explorer.readOnly")}
            className={actionClass}
          >
            <Codicon name="new-file" size={16} />
          </button>
          <button
            type="button"
            disabled
            aria-label={t("explorer.newFolder")}
            title={t("explorer.readOnly")}
            className={actionClass}
          >
            <Codicon name="new-folder" size={16} />
          </button>
          <button
            type="button"
            onClick={refresh}
            aria-label={t("explorer.refresh")}
            className={`${actionClass} cursor-pointer`}
          >
            <Codicon name="refresh" size={16} />
          </button>
          <button
            type="button"
            onClick={collapseAll}
            aria-label={t("explorer.collapseAll")}
            className={`${actionClass} cursor-pointer`}
          >
            <Codicon name="collapse-all" size={16} />
          </button>
        </div>
      </div>

      {isRootOpen && (
        <ul role="tree" aria-label={root.name}>
          {root.children.map((node) => (
            <TreeItem
              key={node.id}
              node={node}
              depth={1}
              isExpanded={isExpanded}
              onToggle={toggle}
              selectedId={selectedId}
              onSelect={select}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
