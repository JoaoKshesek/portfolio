import { Menu } from "@base-ui/react/menu";
import { useTranslation } from "react-i18next";
import { Codicon } from "@/components/atoms/codicon";
import type { Language, Theme } from "@/lib/preferences";
import { useSettingsMenus } from "./use.index";

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
  const {
    languageOptions,
    themeOptions,
    itemClass,
    labelClass,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useSettingsMenus();
  const { t } = useTranslation();

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={t("navigation.settings")}
        className="flex h-12 w-full cursor-pointer items-center justify-center text-ide-statusbar-fg outline-none hover:text-ide-heading data-popup-open:text-ide-heading"
      >
        <Codicon name="settings-gear" size={24} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          side="right"
          align="end"
          sideOffset={4}
          className="z-50"
        >
          <Menu.Popup className="min-w-56 rounded-md border border-ide-border bg-ide-titlebar/80 backdrop-blur-md p-1 text-[13px] text-ide-fg shadow-2xl outline-none transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0">
            <Menu.RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <Menu.GroupLabel className={labelClass}>{t("settings.language")}</Menu.GroupLabel>
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
              <Menu.GroupLabel className={labelClass}>{t("settings.theme")}</Menu.GroupLabel>
              {themeOptions.map((option) => (
                <Menu.RadioItem
                  key={option.value}
                  value={option.value}
                  closeOnClick
                  className={itemClass}
                >
                  <CheckSlot />
                  <span className="flex-1">{option.label}</span>
                  <Codicon
                    name="color-mode"
                    size={14}
                    className="text-ide-muted"
                  />
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
