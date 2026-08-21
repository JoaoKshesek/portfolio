import { TechnologyList } from "@/components/organisms/technology-list";
import { useEditor } from "@/lib/editor";
import { technologies } from "@/lib/technologies";

export function ExtensionsPanel() {
  const { openTechnology } = useEditor();

  return (
    <div className="h-full pb-3">
      <TechnologyList data={technologies} onSelect={openTechnology} />
    </div>
  );
}
