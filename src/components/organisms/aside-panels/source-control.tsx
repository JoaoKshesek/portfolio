import { Codicon } from "@/components/atoms/codicon";

const changes = [
  { id: "aside", file: "aside/index.tsx", status: "M" },
  { id: "navigation", file: "navigation/use.index.ts", status: "M" },
  { id: "activity-view", file: "lib/activity-view.ts", status: "U" },
];

export function SourceControlPanel() {
  return (
    <ul className="text-[13px] text-ide-fg">
      {changes.map((change) => (
        <li
          key={change.id}
          className="flex cursor-pointer items-center gap-2 px-4 py-0.5 hover:bg-ide-hover"
        >
          <Codicon name="file" size={14} className="shrink-0 text-ide-muted" />
          <span className="flex-1 truncate">{change.file}</span>
          <span className="text-ide-muted">{change.status}</span>
        </li>
      ))}
    </ul>
  );
}
