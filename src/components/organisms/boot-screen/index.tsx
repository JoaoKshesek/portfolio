import { useTranslation } from "react-i18next";

import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { cn } from "@/lib/utils";

import { useBootScreen, type BootLine } from "./use.index";

function Prompt({ cwd }: { cwd?: string }) {
  return (
    <>
      <span className="text-emerald-400">joao@portfolio</span>{" "}
      <span className="text-sky-400">{cwd}</span>{" "}
      <span className="text-zinc-500">$</span>{" "}
    </>
  );
}

function Line({ line }: { line: BootLine }) {
  if (line.kind === "prompt") {
    return (
      <p>
        <Prompt cwd={line.cwd} />
        <span className="text-zinc-100">{line.text}</span>
      </p>
    );
  }

  if (line.kind === "ready") {
    return (
      <p>
        <span className="font-bold text-violet-400">VITE</span>{" "}
        <span className="text-emerald-400">ready in 312 ms</span>
        <br />
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-zinc-100">{line.text}</span>
        <span className="boot-cursor ml-1" />
      </p>
    );
  }

  return <p className="text-zinc-400">{line.text}</p>;
}

export function BootScreen() {
  const { visible, fading, lines, typing, skip } = useBootScreen();
  const { t } = useTranslation();

  if (!visible) return null;

  const finished = lines.some((line) => line.kind === "ready");

  return (
    <div
      role="status"
      aria-label={t("boot.label")}
      onClick={skip}
      onKeyDown={skip}
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-[#0b1118] text-[13px] text-zinc-100 transition-opacity duration-300 select-none",
        fading && "pointer-events-none opacity-0",
      )}
    >
      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={16}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        color="#334155"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}
      />

      <div className="relative mx-6 w-full max-w-lg rounded-lg border border-white/10 bg-black/60 shadow-2xl backdrop-blur-md">
        <div className="flex h-8 items-center gap-2 border-b border-white/10 px-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-zinc-500">terminal</span>
        </div>

        <div className="flex min-h-40 flex-col gap-1.5 p-4 font-mono leading-relaxed">
          {lines.map((line, index) => (
            <Line key={index} line={line} />
          ))}

          {typing && (
            <p>
              <Prompt cwd={typing.cwd} />
              <span className="text-zinc-100">{typing.text}</span>
              <span className="boot-cursor" />
            </p>
          )}

          {!typing && !finished && (
            <p>
              <Prompt cwd={lines.length === 0 ? "~" : "~/portfolio"} />
              <span className="boot-cursor" />
            </p>
          )}
        </div>

        <p className="border-t border-white/10 px-4 py-2 text-[11px] text-zinc-500">
          {t("boot.skip")}
        </p>
      </div>
    </div>
  );
}
