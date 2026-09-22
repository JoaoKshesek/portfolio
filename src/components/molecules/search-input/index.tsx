import { Codicon } from "@/components/atoms/codicon";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  showIcon?: boolean;
  icon?: string;
  rightSlot?: React.ReactNode;
}

export function SearchInput({
  placeholder = "Buscar",
  value,
  onChange,
  showIcon = true,
  icon = "search",
  rightSlot,
}: SearchInputProps) {
  return (
    <div className="flex items-center pr-1 gap-2 rounded-xs bg-ide-activitybar border border-ide-border h-fit transition-colors focus-within:border-ide-resize">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-2 py-2 bg-ide-activitybar text-xs text-ide-heading placeholder:text-xs placeholder:text-ide-muted outline-none h-5 leading-none"
      />

      {rightSlot || (
        showIcon && (
          <Codicon
            name={icon}
            size={16}
            className="text-ide-muted shrink-0 mr-1"
          />
        )
      )}
    </div>
  );
}
