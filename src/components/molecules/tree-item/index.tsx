import { Codicon } from "@/components/atoms/codicon";
import { Icon } from "@/components/atoms/icon";
import { nodeIcon, type TreeFile, type TreeNode } from "@/lib/explorer-tree";
import { cn } from "@/lib/utils";

interface TreeItemProps {
  node: TreeNode;
  depth: number;
  isExpanded: (id: string) => boolean;
  onToggle: (id: string) => void;
  selectedId: string | null;
  onSelect: (file: TreeFile) => void;
}

export function TreeItem({
  node,
  depth,
  isExpanded,
  onToggle,
  selectedId,
  onSelect,
}: TreeItemProps) {
  const isFolder = node.type === "folder";
  const isOpen = isFolder && isExpanded(node.id);
  const isSelected = selectedId === node.id;
  const icon = nodeIcon(node, isOpen);

  return (
    <li role="none">
      <button
        type="button"
        role="treeitem"
        aria-expanded={isFolder ? isOpen : undefined}
        aria-selected={isSelected}
        onClick={() => (isFolder ? onToggle(node.id) : onSelect(node))}
        className={cn(
          "flex h-[22px] w-full cursor-pointer items-center pr-2 pl-2 text-left text-[13px] outline-none",
          isSelected
            ? "bg-ide-hover text-white"
            : "text-ide-fg hover:bg-ide-hover",
        )}
      >
        {Array.from({ length: depth }, (_, level) => (
          <span
            key={level}
            aria-hidden
            className={cn(
              "h-[22px] w-3 shrink-0",
              level > 0 && "border-l border-ide-border",
            )}
          />
        ))}

        {isFolder ? (
          <Codicon
            name={isOpen ? "chevron-down" : "chevron-right"}
            size={16}
            className="shrink-0 text-ide-muted"
          />
        ) : (
          <span aria-hidden className="w-4 shrink-0" />
        )}

        <Icon icon={icon} size={16} className="mr-1.5 ml-0.5" />

        <span className={cn("truncate", isFolder && "font-medium")}>
          {node.name}
        </span>
      </button>

      {isFolder && isOpen && (
        <ul role="group">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              isExpanded={isExpanded}
              onToggle={onToggle}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
