import { GitGraph } from "@/components/organisms/git-graph";

export function SourceControlPanel() {
  return (
    <div className="flex flex-col pb-3">
      <p className="px-3 pb-2 text-[11px] tracking-wider text-ide-muted uppercase">
        Trajetória · 2017 → hoje
      </p>

      <GitGraph />
    </div>
  );
}
