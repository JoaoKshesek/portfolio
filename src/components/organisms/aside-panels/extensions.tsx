import { TechnologyList } from "@/components/organisms/technology-list";
import { technologies } from "@/lib/technologies";

export function ExtensionsPanel() {
  return (
    <div className="h-full pb-3">
      <TechnologyList data={technologies} />
    </div>
  );
}
