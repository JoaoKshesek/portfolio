import { Codicon } from "@/components/atoms/codicon";
import { aiDocs } from "@/lib/ai-workflow";
import { useEditor } from "@/lib/editor";

export function ClaudePanel() {
  const { openAiDoc, activeId } = useEditor();

  return (
    <div className="flex flex-col gap-3 pb-3 text-[13px]">
      <section>
        <h3 className="px-3 py-1 text-[11px] tracking-wider text-ide-muted uppercase">
          Método
        </h3>

        <ul>
          {aiDocs.map((doc) => (
            <li key={doc.id}>
              <button
                type="button"
                onClick={() => openAiDoc(doc)}
                title={doc.title}
                className={`flex h-[22px] w-full cursor-pointer items-center gap-2 px-3 text-left ${
                  activeId === `ia:${doc.id}`
                    ? "bg-ide-hover text-ide-heading"
                    : "text-ide-fg hover:bg-ide-hover"
                }`}
              >
                <Codicon
                  name="sparkle"
                  size={16}
                  className="shrink-0 text-ide-indicator"
                />
                <span className="truncate">{doc.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="px-3 py-1 text-[11px] tracking-wider text-ide-muted uppercase">
          Specs
        </h3>
        <p className="px-3 text-[13px] text-ide-muted">
          Em breve: as specs dos dois projetos novos.
        </p>
      </section>
    </div>
  );
}
