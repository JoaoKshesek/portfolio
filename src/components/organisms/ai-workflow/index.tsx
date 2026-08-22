import { Codicon } from "@/components/atoms/codicon";
import { aiDocById, workflowPhases } from "@/lib/ai-workflow";

interface AiWorkflowProps {
  docId: string;
}

export function AiWorkflow({ docId }: AiWorkflowProps) {
  const doc = aiDocById(docId);

  if (!doc) {
    return (
      <section className="min-h-0 flex-1 px-6 py-4 text-[13px] text-ide-muted">
        Documento não encontrado.
      </section>
    );
  }

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-[13px] text-ide-muted">
            <Codicon
              name="sparkle"
              size={14}
              className="text-ide-indicator"
            />
            desenvolvimento assistido por IA
          </p>

          <h1 className="text-2xl leading-tight font-semibold text-white">
            {doc.title}
          </h1>

          <p className="text-[15px] text-white">{doc.summary}</p>
        </header>

        <div className="h-px bg-ide-border" />

        {doc.showPhases && (
          <section className="flex flex-col gap-2">
            <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
              O ciclo
            </h2>

            <ol className="flex flex-col">
              {workflowPhases.map((phase, index) => {
                const isLast = index === workflowPhases.length - 1;

                return (
                  <li key={phase.id} className="flex gap-3">
                    <div className="flex w-4 shrink-0 flex-col items-center pt-1.5">
                      <span className="size-2 shrink-0 rounded-full bg-ide-indicator" />
                      {!isLast && (
                        <span className="w-px flex-1 bg-ide-border" aria-hidden />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1 pb-5">
                      <h3 className="text-[13px] font-medium text-white">
                        {phase.title}
                      </h3>
                      <p className="text-[13px] text-ide-fg">
                        {phase.description}
                      </p>

                      {phase.agents && (
                        <ul className="mt-1 flex flex-wrap gap-1.5">
                          {phase.agents.map((agent) => (
                            <li
                              key={agent.id}
                              className="rounded-full border border-ide-border px-2 py-0.5 text-xs text-ide-muted"
                            >
                              {agent.name}
                              <span className="opacity-60">
                                {" · "}
                                {agent.role}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {doc.sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
              {section.title}
            </h2>

            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-[13px] text-ide-fg">
                {paragraph}
              </p>
            ))}

            {section.items && (
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-ide-fg">
                    <Codicon
                      name="circle-small-filled"
                      size={16}
                      className="mt-px shrink-0 text-ide-muted"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
