import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";

import { Codicon } from "@/components/atoms/codicon";
import { ClaudePanel } from "@/components/organisms/aside-panels/claude";
import { ExplorerPanel } from "@/components/organisms/aside-panels/explorer";
import { ExtensionsPanel } from "@/components/organisms/aside-panels/extensions";
import { SearchPanel } from "@/components/organisms/aside-panels/search";
import { SourceControlPanel } from "@/components/organisms/aside-panels/source-control";
import type { ActivityView } from "@/lib/activity-view";

import { useAside } from "./use.index";

const panels: Record<ActivityView, ComponentType> = {
  files: ExplorerPanel,
  search: SearchPanel,
  scm: SourceControlPanel,
  extensions: ExtensionsPanel,
  claude: ClaudePanel,
};

export function Aside() {
  const { view, title } = useAside();
  const { t } = useTranslation();
  const Panel = panels[view];

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-ide-sidebar">
      <div className="flex h-9 shrink-0 items-center justify-between pr-1 pl-3">
        <h3 className="text-[11px] font-normal tracking-wider text-ide-heading uppercase">
          {title}
        </h3>

        <button
          type="button"
          aria-label={t("navigation.moreActions")}
          className="flex size-6 cursor-pointer items-center justify-center rounded-sm text-ide-muted hover:bg-ide-hover hover:text-ide-heading"
        >
          <Codicon name="ellipsis" size={16} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <Panel />
      </div>
    </aside>
  );
}
