import { Codicon } from "@/components/atoms/codicon";
import type { IconSpec } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: IconSpec;
  size?: number;
  className?: string;
}

export function Icon({ icon, size = 16, className }: IconProps) {
  if (icon.type === "image") {
    return (
      <img
        src={icon.src}
        alt=""
        aria-hidden
        style={{ width: size, height: size }}
        className={cn("shrink-0 object-contain", className)}
      />
    );
  }

  return (
    <Codicon
      name={icon.name}
      size={size}
      className={cn("shrink-0", icon.className, className)}
    />
  );
}
