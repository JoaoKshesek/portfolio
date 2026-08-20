import { Codicon } from "@/components/atoms/codicon";

export function ClaudePanel() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
      <Codicon name="sparkle" size={24} className="text-ide-muted" />
      <p className="text-[13px] text-ide-muted">
        Em breve: um chat sobre este portfólio.
      </p>
    </div>
  );
}
