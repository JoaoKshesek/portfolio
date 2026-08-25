import { Codicon } from "@/components/atoms/codicon";
import { useEditor } from "@/lib/editor";
import { findRole } from "@/lib/experience";
import { experienceFile } from "@/lib/explorer-tree";
import {
  projectRoleLabels,
  projectTypeLabels,
  projectsByCompany,
} from "@/lib/projects";
import { technologiesByIds } from "@/lib/technologies";

interface ExperienceDetailsProps {
  companyId: string;
  roleId: string;
}

const sidebarTitle = "mb-2 text-[11px] tracking-wider text-ide-muted uppercase";
const rowClass =
  "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[13px] text-ide-fg hover:bg-ide-hover hover:text-white";

export function ExperienceDetails({
  companyId,
  roleId,
}: ExperienceDetailsProps) {
  const { openTechnology, openProject, openFile } = useEditor();
  const found = findRole(companyId, roleId);

  if (!found) {
    return (
      <section className="min-h-0 flex-1 px-6 py-4 text-[13px] text-ide-muted">
        Cargo não encontrado.
      </section>
    );
  }

  const { company, role } = found;
  const stack = technologiesByIds(role.stack);
  const projects = projectsByCompany(company.id);
  const otherRoles = company.roles.filter((item) => item.id !== role.id);

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-6">
        <header className="flex flex-col gap-3">
          <p className="text-[13px] text-ide-muted">{company.name}</p>

          <h1 className="text-2xl leading-tight font-semibold text-white">
            {role.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ide-muted">
            <span className="flex items-center gap-1">
              <Codicon name="calendar" size={14} />
              {role.period}
            </span>
            <span className="flex items-center gap-1">
              <Codicon name="clock" size={14} />
              {role.duration}
            </span>
            <span className="flex items-center gap-1">
              <Codicon name="organization" size={14} />
              {role.model}
            </span>
            <span className="flex items-center gap-1">
              <Codicon name="location" size={14} />
              {company.location}
            </span>
          </div>

          <p className="border-l-2 border-ide-border pl-3 text-xs text-ide-muted">
            {company.description}
          </p>

          <p className="text-[15px] text-white">{role.summary}</p>
        </header>

        <div className="h-px bg-ide-border" />

        <div className="flex flex-col gap-8 @3xl:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <section className="flex flex-col gap-2">
              <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
                O que eu fazia
              </h2>
              <ul className="flex flex-col gap-2">
                {role.responsibilities.map((item) => (
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

            <section className="flex flex-col gap-2">
              <h2 className="text-[11px] tracking-wider text-ide-muted uppercase">
                Resultados
              </h2>
              <ul className="flex flex-col gap-2">
                {role.achievements.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] text-ide-fg">
                    <Codicon
                      name="check"
                      size={16}
                      className="mt-px shrink-0 text-ide-indicator"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-6 @3xl:w-64">
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

            {projects.length > 0 && (
              <section>
                <h2 className={sidebarTitle}>Projetos na {company.name}</h2>
                <ul className="flex flex-col">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className={rowClass}
                      >
                        <Codicon
                          name={project.url ? "globe" : "file"}
                          size={16}
                          className="shrink-0 text-ide-muted"
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate">{project.name}</span>
                          <span className="truncate text-[11px] text-ide-muted">
                            {project.types
                              .map((type) => projectTypeLabels[type])
                              .join(" · ")}
                            {` · ${projectRoleLabels[project.role]}`}
                            {project.client && ` · ${project.client}`}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {otherRoles.length > 0 && (
              <section>
                <h2 className={sidebarTitle}>Outros cargos</h2>
                <ul className="flex flex-col">
                  {otherRoles.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          openFile(experienceFile(company.id, item.id))
                        }
                        className={rowClass}
                      >
                        <Codicon
                          name="markdown"
                          size={16}
                          className="shrink-0 text-sky-400"
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
