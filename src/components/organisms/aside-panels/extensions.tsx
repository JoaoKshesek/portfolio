import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TechnologyList } from "@/components/organisms/technology-list";
import { useEditor } from "@/lib/editor";
import { getTechnologies } from "@/lib/technologies";

export function ExtensionsPanel() {
  const { openTechnology } = useEditor();
  const { i18n } = useTranslation();
  const language = i18n.language;
  // as descrições vêm do i18n global, por isso o memo depende do idioma
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const technologies = useMemo(() => getTechnologies(), [language]);

  return (
    <div className="h-full pb-3">
      <TechnologyList data={technologies} onSelect={openTechnology} />
    </div>
  );
}
