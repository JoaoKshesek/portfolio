import type { ComponentType } from "react";

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
  const Panel = panels[view];

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-ide-sidebar">
      <h3 className="px-3 py-2 text-[11px] font-normal tracking-wider text-white uppercase">
        {title}
      </h3>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <Panel />
      </div>
    </aside>
  );
}
