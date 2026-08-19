import { Codicon } from "@/components/atoms/codicon";

interface FooterProps {
  branch?: string;
  dirty?: boolean;
  errors?: number;
  warnings?: number;
}

export function Footer({
  branch = "main",
  dirty = true,
  errors = 0,
  warnings = 0,
}: FooterProps) {
  return (
    <footer className="flex h-6 shrink-0 items-center justify-between rounded-b-[13px] border-t border-ide-border bg-ide-titlebar px-2 text-[12px] text-ide-statusbar-fg select-none">
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-ide-hover"
        >
          <Codicon name="source-control" size={14} />
          <span>
            {branch}
            {dirty && "*"}
          </span>
        </button>

        <button
          type="button"
          aria-label={`${errors} erros, ${warnings} avisos`}
          className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-ide-hover"
        >
          <Codicon name="error" size={14} />
          <span>{errors}</span>
          <Codicon name="warning" size={14} className="ml-1" />
          <span>{warnings}</span>
        </button>
      </div>

      <span className="px-2">&copy; 2024 My Portfolio</span>
    </footer>
  );
}
