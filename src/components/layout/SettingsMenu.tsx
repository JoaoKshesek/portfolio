import { Menu } from "@base-ui/react/menu";
import { Codicon } from "@/components/ui/codicon";
import {
  useLanguage,
  useTheme,
  type Language,
  type Theme,
} from "@/lib/preferences";

const languageOptions: { value: Language; label: string; hint: string }[] = [
  { value: "pt", label: "Português", hint: "pt-BR" },
  { value: "en", label: "English", hint: "en" },
  { value: "es", label: "Español", hint: "es" },
];

const themeOptions: { value: Theme; label: string }[] = [
  { value: "dark", label: "Default Dark" },
  { value: "light", label: "Light" },
];

const itemClass =
  "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 outline-none select-none data-highlighted:bg-ide-hover data-highlighted:text-white";

const labelClass = "px-2 py-1 text-[11px] tracking-wider text-ide-muted uppercase";

function CheckSlot() {
  return (
    <span className="flex w-4 shrink-0 justify-center">
      <Menu.RadioItemIndicator>
        <Codicon name="check" size={14} className="text-ide-indicator" />
      </Menu.RadioItemIndicator>
    </span>
  );
}

export function SettingsMenu() {
  const [theme, setTheme] = useTheme();
  const [language, setLanguage] = useLanguage();

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Configurações"
        className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg outline-none hover:text-white data-popup-open:text-white"
      >
        <Codicon name="settings-gear" size={24} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side="right" align="end" sideOffset={4} className="z-50">
          <Menu.Popup className="min-w-56 rounded-md border border-ide-border bg-ide-titlebar p-1 text-[13px] text-ide-fg shadow-2xl outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <Menu.RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <Menu.GroupLabel className={labelClass}>Idioma</Menu.GroupLabel>
              {languageOptions.map((option) => (
                <Menu.RadioItem
                  key={option.value}
                  value={option.value}
                  closeOnClick
                  className={itemClass}
                >
                  <CheckSlot />
                  <span className="flex-1">{option.label}</span>
                  <span className="text-ide-muted">{option.hint}</span>
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>

            <Menu.Separator className="my-1 h-px bg-ide-border" />

            <Menu.RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
            >
              <Menu.GroupLabel className={labelClass}>Tema</Menu.GroupLabel>
              {themeOptions.map((option) => (
                <Menu.RadioItem
                  key={option.value}
                  value={option.value}
                  closeOnClick
                  className={itemClass}
                >
                  <CheckSlot />
                  <span className="flex-1">{option.label}</span>
                  <Codicon name="color-mode" size={14} className="text-ide-muted" />
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
