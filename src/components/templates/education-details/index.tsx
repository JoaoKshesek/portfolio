import { Codicon } from "@/components/atoms/codicon";
import { useEditor } from "@/lib/editor";
import { findStudy } from "@/lib/education";
import { educationFile } from "@/lib/explorer-tree";
import { technologiesByIds } from "@/lib/technologies";

interface EducationDetailsProps {
  institutionId: string;
  studyId: string;
}

const sidebarTitle = "mb-2 text-[11px] tracking-wider text-ide-muted uppercase";
const rowClass =
  "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ide-fg hover:bg-ide-hover hover:text-white";

export function EducationDetails({
  institutionId,
  studyId,
}: EducationDetailsProps) {
  const { openTechnology, openFile } = useEditor();
  const found = findStudy(institutionId, studyId);

  if (!found) {
    return (
      <section className="min-h-0 flex-1 px-6 py-4 text-[13px] text-ide-muted">
        Formação não encontrada.
      </section>
    );
  }

  const { institution, study } = found;
  const stack = technologiesByIds(study.stack);
  const others = institution.studies.filter((item) => item.id !== study.id);
  const isCertificate = study.kind === "certificado";

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-3">
          <p className="text-[13px] text-ide-muted">{institution.name}</p>

          <h1 className="text-2xl leading-tight font-semibold text-white">
            {study.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ide-muted">
            <span className="flex items-center gap-1">
              <Codicon
                name={isCertificate ? "verified-filled" : "mortar-board"}
                size={14}
              />
              {isCertificate ? "Certificado" : "Formação"}
            </span>
            <span className="flex items-center gap-1">
              <Codicon name="calendar" size={14} />
              {study.period}
            </span>
            <span className="flex items-center gap-1">
              <Codicon name="clock" size={14} />
              {study.status}
            </span>
            {study.field && (
              <span className="flex items-center gap-1">
                <Codicon name="tag" size={14} />
                {study.field}
              </span>
            )}
          </div>

          <p className="text-[15px] text-white">{study.summary}</p>
        </header>

        <div className="h-px bg-ide-border" />

        <div className="flex flex-col gap-8 @3xl:flex-row">
          <section className="flex min-w-0 flex-1 flex-col gap-2">
            <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
              O que o curso cobre
            </h2>
            <ul className="flex flex-col gap-2">
              {study.highlights.map((item) => (
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
          </section>

          <aside className="flex w-full shrink-0 flex-col gap-6 @3xl:w-64">
            {stack.length > 0 && (
              <section>
                <h2 className={sidebarTitle}>Stack</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {stack.map((technology) => (
                    <li key={technology.id}>
                      <button
                        type="button"
                        onClick={() => openTechnology(technology)}
                        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-ide-border px-2 py-1 text-xs text-ide-fg hover:border-ide-resize hover:text-white"
                      >
                        <img
                          src={technology.icon}
                          alt=""
                          aria-hidden
                          className="size-3.5 object-contain"
                        />
                        {technology.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {study.credential && (
              <section>
                <h2 className={sidebarTitle}>Credencial</h2>
                <p className="px-2 font-mono text-[11px] break-all text-ide-muted">
                  {study.credential.id}
                </p>
                {study.credential.url && (
                  <a
                    href={study.credential.url}
                    target="_blank"
                    rel="noreferrer"
                    className={rowClass}
                  >
                    <Codicon
                      name="link-external"
                      size={16}
                      className="shrink-0 text-ide-muted"
                    />
                    Ver credencial
                  </a>
                )}
              </section>
            )}

            {others.length > 0 && (
              <section>
                <h2 className={sidebarTitle}>Na {institution.name}</h2>
                <ul className="flex flex-col">
                  {others.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          openFile(educationFile(institution.id, item.id))
                        }
                        className={rowClass}
                      >
                        <Codicon
                          name={
                            item.kind === "certificado"
                              ? "verified-filled"
                              : "mortar-board"
                          }
                          size={16}
                          className="shrink-0 text-ide-muted"
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate">{item.title}</span>
                          <span className="truncate text-[11px] text-ide-muted">
                            {item.period}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
