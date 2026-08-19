import { useState } from "react";
import { Codicon } from "@/components/ui/codicon";
import { SettingsMenu } from "./SettingsMenu";
import { cn } from "@/lib/utils";

const items = [
  { id: "files", icon: "files", label: "Explorer" },
  { id: "search", icon: "search", label: "Buscar" },
  { id: "scm", icon: "source-control", label: "Source Control", badge: 9 },
  { id: "extensions", icon: "extensions", label: "Extensões" },
  { id: "claude", icon: "sparkle", label: "Claude Code" },
];

const bottomItems = [{ id: "account", icon: "account", label: "Conta" }];

export function Navigation() {
  const [active, setActive] = useState("files");

  return (
    <nav className="flex w-12 shrink-0 flex-col border-r border-ide-border bg-ide-activitybar">
      {items.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-current={isActive}
            onClick={() => setActive(item.id)}
            className={cn(
              "group relative flex h-12 w-full cursor-pointer items-center justify-center",
              isActive ? "text-white" : "text-ide-muted hover:text-white",
            )}
          >
            {isActive && (
              <span className="absolute inset-y-0 -left-px w-0.5 bg-ide-indicator group-hover:bg-ide-indicator-active" />
            )}
            <Codicon name={item.icon} size={24} />
            {item.badge ? (
              <span className="absolute right-1.5 bottom-2 flex size-4 items-center justify-center rounded-full bg-ide-badge text-[9px] font-semibold text-white">
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}

      <div className="mt-auto flex flex-col">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg hover:text-white"
          >
            <Codicon name={item.icon} size={24} />
          </button>
        ))}

        <SettingsMenu />
      </div>
    </nav>
  );
}
