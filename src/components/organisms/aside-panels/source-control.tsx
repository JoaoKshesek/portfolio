import { useTranslation } from "react-i18next";

import { GitGraph } from "@/components/organisms/git-graph";

export function SourceControlPanel() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col pb-3">
      <p className="px-3 pb-2 text-[11px] tracking-wider text-ide-muted uppercase">
        {t("sourceControl.title")}
      </p>

      <GitGraph />
    </div>
  );
}
