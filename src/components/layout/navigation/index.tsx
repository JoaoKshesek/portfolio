import { Codicon } from "@/components/atoms/codicon";

import { cn } from "@/lib/utils";
import { SettingsMenu } from "@/components/organisms/settings-menu";
import { SocialMenu } from "@/components/organisms/social-menu";
import { useNavigation } from "./use.index";

export function Navigation() {
  const { active, setActive, items, bottomItems } = useNavigation();

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
              isActive ? "text-ide-heading" : "text-ide-muted hover:text-ide-heading",
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
        {bottomItems.map((item) => {
          if (item.id === "account") {
            return <SocialMenu key={item.id} />;
          }

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg hover:text-ide-heading"
            >
              <Codicon name={item.icon} size={24} />
            </button>
          );
        })}

        <SettingsMenu />
      </div>
    </nav>
  );
}
