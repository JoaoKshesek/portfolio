import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface CodiconProps extends ComponentProps<"span"> {
  name: string;
  size?: number;
}

export function Codicon({
  name,
  size = 16,
  className,
  style,
  ...props
}: CodiconProps) {
  return (
    <span
      aria-hidden
      className={cn("codicon", `codicon-${name}`, className)}
      style={{ fontSize: size, ...style }}
      {...props}
    />
  );
}
