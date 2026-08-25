import { profile } from "@/lib/profile";

import {
  LinkedinLogoIcon,
  MapPinIcon,
  BuildingIcon,
} from "@phosphor-icons/react";

export function ReadmeProfile() {
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
              <BuildingIcon size={16} weight="regular" className="shrink-0" />
              <span className="truncate">{profile.organization}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon size={16} weight="regular" className="shrink-0" />
              <span className="truncate">{profile.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <LinkedinLogoIcon size={16} weight="fill" className="shrink-0" />
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

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-white">
              {profile.headline}
            </h2>

            <p className="text-[13px] text-ide-fg leading-relaxed">
              {profile.description}
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-white">
                Principais habilidades:
              </h3>
              <ul className="ml-5 flex list-disc flex-col gap-1 text-[13px] text-ide-fg marker:text-ide-muted">
                {profile.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-md border border-ide-border/50 bg-ide-editor/30 p-4 mt-4">
            <p className="text-[13px] italic text-ide-muted">
              "{profile.quote}"
            </p>
            <p className="text-[11px] text-ide-muted">
              #integridade #ética #compromisso
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
