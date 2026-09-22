import { Codicon } from "@/components/atoms/codicon";
import { projectLogo } from "@/lib/project-assets";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectIconProps {
  project: Pick<Project, "id" | "url">;
  /** tamanho da caixa em px */
  size?: number;
  className?: string;
}

/** logo do projeto (src/assets/projects/<id>/logo.*) ou, sem logo, o codicon de globo/arquivo */
export function ProjectIcon({ project, size = 28, className }: ProjectIconProps) {
  const logo = projectLogo(project.id);
  const style = { width: size, height: size };

  if (logo) {
    return (
      <img
        src={logo}
        alt=""
        aria-hidden
        style={style}
        className={cn("shrink-0 rounded-md object-cover", className)}
      />
    );
  }

  return (
    <span
      style={style}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md border border-ide-border text-ide-muted",
        className,
      )}
    >
      <Codicon name={project.url ? "globe" : "file"} size={Math.round(size * 0.57)} />
    </span>
  );
}
