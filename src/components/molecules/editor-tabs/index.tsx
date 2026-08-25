import { EditorTab } from "@/components/atoms/editor-tab";
import { useEditor } from "@/lib/editor";

export function EditorTabs() {
  const { tabs, activeId, activateTab, closeTab } = useEditor();

  if (tabs.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label="Arquivos abertos"
      className="no-scrollbar flex h-9 shrink-0 items-stretch overflow-x-auto bg-ide-sidebar"
    >
      {tabs.map((tab) => (
        <EditorTab
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeId}
          onActivate={() => activateTab(tab.id)}
          onClose={() => closeTab(tab.id)}
        />
      ))}

      <div aria-hidden className="flex-1 border-b border-ide-border" />
    </div>
  );
}
