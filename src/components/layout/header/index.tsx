import { useTranslation } from "react-i18next";

const trafficLights = [
  { id: "close", color: "#ff5f57", glyph: "✕" },
  { id: "minimize", color: "#febc2e", glyph: "–" },
  { id: "maximize", color: "#28c840", glyph: "⤢" },
] as const;

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex h-9 shrink-0 items-center gap-2 border-b border-ide-border md:rounded-t-[13px] bg-ide-titlebar px-3 select-none">
      <div className="group flex shrink-0 items-center gap-2">
        {trafficLights.map((light) => (
          <button
            key={light.id}
            type="button"
            aria-label={t(`header.${light.id}`)}
            style={{ backgroundColor: light.color }}
            className="flex size-3 items-center justify-center rounded-full text-[8px] leading-none text-black/60 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]"
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100">
              {light.glyph}
            </span>
          </button>
        ))}
      </div>

      <span className="flex-1 truncate text-center text-[13px] text-ide-muted">
        {title ?? t("header.title")}
      </span>

      <div aria-hidden className="w-13 shrink-0" />
    </header>
  );
}
