import { Codicon } from "@/components/atoms/codicon";
import { useEditor } from "@/lib/editor";
import { profile } from "@/lib/profile";
import { technologiesByIds, type Technology } from "@/lib/technologies";

function IconRow({
  items,
  onSelect,
}: {
  items: Technology[];
  onSelect: (technology: Technology) => void;
}) {
  return (
    <ul className="flex flex-wrap items-center gap-4">
      {items.map((technology) => (
        <li key={technology.id}>
          <button
            type="button"
            onClick={() => onSelect(technology)}
            title={technology.name}
            aria-label={technology.name}
            className="flex cursor-pointer items-center justify-center rounded-md p-1 transition-opacity hover:opacity-70"
          >
            <img
              src={technology.icon}
              alt=""
              aria-hidden
              className="size-10 object-contain"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b border-ide-border pb-2 text-lg font-semibold text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ReadmeProfile() {
  const { openTechnology } = useEditor();
  const techs = technologiesByIds(profile.techs);
  const tools = technologiesByIds(profile.tools);

  return (
    <div className="@container min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-6 @3xl:flex-row @3xl:gap-8">
        <aside className="flex w-full shrink-0 flex-col gap-4 @3xl:w-64">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="aspect-square w-40 rounded-full border border-ide-border object-cover @3xl:w-full"
          />

          <div>
            <h1 className="text-2xl leading-tight font-semibold text-white">
              {profile.name}
            </h1>
            <p className="text-xl text-ide-muted">{profile.handle}</p>
          </div>

          <p className="text-[13px] text-ide-fg">{profile.role}</p>

          <ul className="flex flex-col gap-2 border-t border-ide-border pt-4 text-[13px] text-ide-muted">
            <li className="flex items-center gap-2">
              <Codicon name="organization" size={16} className="shrink-0" />
              <span className="truncate">{profile.organization}</span>
            </li>
            <li className="flex items-center gap-2">
              <Codicon name="location" size={16} className="shrink-0" />
              <span className="truncate">{profile.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <Codicon name="link" size={16} className="shrink-0" />
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="truncate hover:text-ide-resize hover:underline"
              >
                {profile.website}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Codicon name="person" size={16} className="shrink-0" />
              <a
                href={profile.linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="truncate hover:text-ide-resize hover:underline"
              >
                {profile.linkedin.label}
              </a>
            </li>
          </ul>
        </aside>

        <article className="flex min-w-0 flex-1 flex-col gap-6 rounded-lg border border-ide-border p-6">
          <p className="text-[13px] text-ide-muted">
            {profile.handle} / <span className="font-mono">README.md</span>
          </p>

          <h1 className="border-b border-ide-border pb-3 text-3xl font-semibold text-white">
            👾 Hi, there!
          </h1>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-white">
              {profile.headline}
            </h2>

            <ul className="ml-5 flex list-disc flex-col gap-1 text-[13px] text-ide-fg marker:text-ide-muted">
              {profile.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <Section title="⚡ Techs that I work with">
            <IconRow items={techs} onSelect={openTechnology} />
          </Section>

          <Section title="🛠️ Tools that I use">
            <IconRow items={tools} onSelect={openTechnology} />
          </Section>

          <Section title="💬 Get in touch">
            <ul className="flex flex-wrap gap-2">
              {profile.contacts.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold tracking-wider uppercase ${contact.className}`}
                  >
                    <Codicon name={contact.icon} size={14} />
                    {contact.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </div>
    </div>
  );
}
