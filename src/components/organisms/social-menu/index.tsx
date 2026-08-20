import { Menu } from "@base-ui/react/menu";
import { Codicon } from "@/components/atoms/codicon";
import { useSocialMenu } from "./use.index";

export function SocialMenu() {
  const { socialLinks, itemClass, labelClass } = useSocialMenu();

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Redes Sociais"
        className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg outline-none hover:text-white data-popup-open:text-white"
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
            <div className={labelClass}>Redes Sociais</div>

            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
              >
                <Codicon name={link.icon} size={14} />
                <span className="flex-1">{link.label}</span>
              </a>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
