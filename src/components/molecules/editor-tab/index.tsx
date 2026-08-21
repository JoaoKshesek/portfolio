import { Codicon } from "@/components/atoms/codicon";
import { Icon } from "@/components/atoms/icon";
import type { EditorTab as Tab } from "@/lib/editor";
import { cn } from "@/lib/utils";

interface EditorTabProps {
  tab: Tab;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
}

export function EditorTab({
  tab,
  isActive,
  onActivate,
  onClose,
}: EditorTabProps) {
  return (
    <div
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate();
        }
      }}
      onAuxClick={(event) => {
        if (event.button === 1) onClose();
      }}
      className={cn(
        "group relative flex h-9 shrink-0 cursor-pointer items-center gap-2 border-r border-b border-ide-border pr-1 pl-3 text-[13px] outline-none select-none",
        isActive
          ? "border-b-transparent bg-ide-editor text-white"
          : "bg-ide-sidebar text-ide-muted hover:text-white",
      )}
    >
      {isActive && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-ide-indicator"
        />
      )}

      <Icon icon={tab.icon} size={16} />

      <span className="max-w-40 truncate">
        {tab.name}
      </span>

      <button
        type="button"
        aria-label={`Fechar ${tab.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className={cn(
          "flex size-5 cursor-pointer items-center justify-center rounded-sm hover:bg-ide-hover hover:text-white",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        <Codicon name="close" size={14} />
      </button>
    </div>
  );
}
