import { TechnologyList } from "@/components/organisms/technology-list";
import { technologies } from "@/lib/technologies";

export function ExtensionsPanel() {
  return (
    <div className="h-full px-3 pb-3">
      <TechnologyList data={technologies} />
    </div>
  );
}
