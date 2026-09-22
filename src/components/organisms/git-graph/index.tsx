import { ProjectIcon } from "@/components/atoms/project-icon";
import { projectById } from "@/lib/projects";
import { branchById } from "@/lib/timeline";
import { cn } from "@/lib/utils";
import { useGitGraph } from "./use.index";

const rowClass =
  "flex h-full w-full items-center gap-2 pr-3 text-left text-[12px] hover:bg-ide-hover";

export function GitGraph() {
  const { rows, paths, railWidth, height, openProject, ROW_HEIGHT, laneX, rowY, DOT_RADIUS } =
    useGitGraph();

  return (
    <div className="relative" style={{ height }}>
      <svg
        aria-hidden
        width={railWidth}
        height={height}
        className="pointer-events-none absolute top-0 left-0"
      >
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={1.5}
          />
        ))}

        {rows.map((row) => {
          const branch = branchById(row.branch);
          const isMerge = Boolean(row.merges);

          return (
            <circle
              key={row.id}
              cx={laneX(branch.lane)}
              cy={rowY(row.row)}
              r={isMerge ? DOT_RADIUS + 1 : DOT_RADIUS}
              fill={isMerge ? "var(--ide-sidebar)" : branch.color}
              stroke={branch.color}
              strokeWidth={isMerge ? 2 : 0}
            />
          );
        })}
      </svg>

      <ol className="relative">
        {rows.map((row) => {
          const branch = branchById(row.branch);
          const project = row.project ? projectById(row.project) : undefined;

          const content = (
            <>
              {project && <ProjectIcon project={project} size={16} />}
              <span className="min-w-0 flex-1 truncate text-ide-fg">
                {row.message}
              </span>

              {row.refs?.map((ref) => (
                <span
                  key={ref}
                  style={{ color: branch.color, borderColor: branch.color }}
                  className="shrink-0 rounded-full border px-1.5 text-[10px]"
                >
                  {ref}
                </span>
              ))}

              <span className="shrink-0 font-mono text-[11px] text-ide-muted">
                {row.year}
              </span>
            </>
          );

          return (
            <li
              key={row.id}
              title={`${row.year} · ${row.message}`}
              style={{ height: ROW_HEIGHT }}
            >
              {project ? (
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  style={{ paddingLeft: railWidth }}
                  className={cn(rowClass, "cursor-pointer")}
                >
                  {content}
                </button>
              ) : (
                <div style={{ paddingLeft: railWidth }} className={rowClass}>
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
