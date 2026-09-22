import { useTranslation } from "react-i18next";

import { getProfile } from "@/lib/profile";

import {
  BuildingIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
} from "@phosphor-icons/react";

/** link de contato: no hover, ícone e texto assumem a cor da marca */
const contactLinkClass =
  "group flex min-w-0 items-center gap-2 transition-colors hover:text-(--brand)";

export function ReadmeProfile() {
  const { t } = useTranslation();
  const profile = getProfile();

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
            <h1 className="text-2xl leading-tight font-semibold text-ide-heading">
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
            <li>
              <a
                href={profile.linkedin.href}
                target="_blank"
                rel="noreferrer"
                style={{ "--brand": "#0a66c2" } as React.CSSProperties}
                className={contactLinkClass}
              >
                <LinkedinLogoIcon size={16} weight="fill" className="shrink-0" />
                <span className="truncate group-hover:underline">
                  {profile.linkedin.label}
                </span>
              </a>
            </li>
            <li>
              <a
                href={profile.github.href}
                target="_blank"
                rel="noreferrer"
                style={{ "--brand": "var(--ide-heading)" } as React.CSSProperties}
                className={contactLinkClass}
              >
                <GithubLogoIcon size={16} weight="fill" className="shrink-0" />
                <span className="truncate group-hover:underline">
                  {profile.github.label}
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <article className="flex min-w-0 flex-1 flex-col gap-6 rounded-lg border border-ide-border p-6">
          <p className="text-[13px] text-ide-muted">
            {profile.handle} / <span className="font-mono">README.md</span>
          </p>

          <h1 className="border-b border-ide-border pb-3 text-3xl font-semibold text-ide-heading">
            {t("profile.greeting")}
          </h1>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-ide-heading">
              {profile.headline}
            </h2>

            <p className="text-[13px] text-ide-fg leading-relaxed">
              {profile.description}
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-ide-heading">
                {t("profile.skills")}
              </h3>
              <ul className="ml-5 flex list-disc flex-col gap-1 text-[13px] text-ide-fg marker:text-ide-muted">
                {profile.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-md border border-ide-border/50 bg-ide-editor/30 p-4 mt-0">
            <p className="text-[13px] italic text-ide-muted">
              "{profile.quote}"
            </p>
            <p className="text-[11px] text-ide-muted">
              {t("profile.hashtags")}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
