import { useMemo } from "react";

import { useEditor } from "@/lib/editor";
import { projectById } from "@/lib/projects";
import {
  branchById,
  timelineBranches,
  timelineCommits,
} from "@/lib/timeline";
import { cn } from "@/lib/utils";

const ROW_HEIGHT = 34;
const LANE_WIDTH = 14;
const RAIL_PADDING = 12;
const DOT_RADIUS = 4.5;

const laneX = (lane: number) => RAIL_PADDING + lane * LANE_WIDTH;
const rowY = (row: number) => row * ROW_HEIGHT + ROW_HEIGHT / 2;

const rowClass =
  "flex h-full w-full items-center gap-2 pr-3 text-left text-[12px] hover:bg-ide-hover";

/** curva em S ligando duas lanes, como o Git Graph desenha ramificação e merge */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const middle = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${middle}, ${x2} ${middle}, ${x2} ${y2}`;
}

export function GitGraph() {
  const { openProject } = useEditor();

  const { rows, paths, railWidth, height } = useMemo(() => {
    const rows = timelineCommits.map((commit, row) => ({ ...commit, row }));

    const paths = timelineBranches.flatMap((branch) => {
      const own = rows.filter((row) => row.branch === branch.id);
      if (own.length === 0) return [];

      const first = own[0].row;
      const last = own[own.length - 1].row;
      const x = laneX(branch.lane);

      const segments = [
        {
          id: `${branch.id}-line`,
          color: branch.color,
          d: `M ${x} ${rowY(first)} L ${x} ${rowY(last)}`,
        },
      ];

      if (branch.parent) {
        const parentX = laneX(branchById(branch.parent).lane);
        const parentRow = rows
          .filter((row) => row.branch === branch.parent && row.row < first)
          .at(-1);

        if (parentRow) {
          segments.push({
            id: `${branch.id}-from`,
            color: branch.color,
            d: curve(parentX, rowY(parentRow.row), x, rowY(first)),
          });
        }
      }

      const mergeRow = rows.find((row) => row.merges === branch.id);

      if (mergeRow) {
        const mergeX = laneX(branchById(mergeRow.branch).lane);
        segments.push({
          id: `${branch.id}-merge`,
          color: branch.color,
          d: curve(x, rowY(last), mergeX, rowY(mergeRow.row)),
        });
      }

      return segments;
    });

    const lanes = Math.max(...timelineBranches.map((branch) => branch.lane));

    return {
      rows,
      paths,
      railWidth: laneX(lanes) + RAIL_PADDING,
      height: rows.length * ROW_HEIGHT,
    };
  }, []);

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
