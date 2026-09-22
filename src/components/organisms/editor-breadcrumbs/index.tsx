import { useTranslation } from "react-i18next";

import { Codicon } from "@/components/atoms/codicon";
import { Icon } from "@/components/atoms/icon";
import type { EditorTab } from "@/lib/editor";
import { cn } from "@/lib/utils";

interface EditorBreadcrumbsProps {
  tab: EditorTab;
}

export function EditorBreadcrumbs({ tab }: EditorBreadcrumbsProps) {
  const segments = tab.path;
  const { t } = useTranslation();

  return (
    <nav
      aria-label={t("editor.breadcrumbs")}
      className="flex h-7 shrink-0 items-center gap-1 overflow-x-auto px-3 text-xs text-ide-muted"
    >
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <span key={segment} className="flex shrink-0 items-center gap-1">
            {index > 0 && (
              <Codicon name="chevron-right" size={12} className="opacity-70" />
            )}

            {isLast && <Icon icon={tab.icon} size={14} />}

            <span className={cn(isLast && "text-ide-fg")}>{segment}</span>
          </span>
        );
      })}
    </nav>
  );
}
