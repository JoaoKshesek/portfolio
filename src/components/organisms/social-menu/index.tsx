import { Menu } from "@base-ui/react/menu";
import { useTranslation } from "react-i18next";

import { Codicon } from "@/components/atoms/codicon";
import { useSocialMenu } from "./use.index";

export function SocialMenu() {
  const { socialLinks, itemClass, labelClass } = useSocialMenu();
  const { t } = useTranslation();

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={t("navigation.social")}
        className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg outline-none hover:text-ide-heading data-popup-open:text-ide-heading"
      >
        <Codicon name="account" size={24} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          side="right"
          align="end"
          sideOffset={4}
          className="z-50"
        >
          <Menu.Popup className="min-w-56 rounded-md border border-ide-border bg-ide-titlebar/80 backdrop-blur-md p-1 text-[13px] text-ide-fg shadow-2xl outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <div className={labelClass}>{t("navigation.social")}</div>

            {socialLinks.map((link) => {
              const IconComponent = link.iconComponent;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--brand": link.color } as React.CSSProperties}
                  className={itemClass}
                >
                  {/* no hover o ícone assume a cor da marca */}
                  <span className="flex shrink-0 transition-colors group-hover:text-(--brand) group-focus-visible:text-(--brand)">
                    {IconComponent ? (
                      <IconComponent size={14} weight="fill" aria-hidden />
                    ) : (
                      <Codicon name={link.icon} size={14} />
                    )}
                  </span>
                  <span className="flex-1">{link.label}</span>
                </a>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
