import { useMemo } from "react";

import { useEditor } from "@/lib/editor";
import {
  branchById,
  timelineBranches,
  timelineCommits,
} from "@/lib/timeline";

const ROW_HEIGHT = 34;
const LANE_WIDTH = 14;
const RAIL_PADDING = 12;
const DOT_RADIUS = 4.5;

const laneX = (lane: number) => RAIL_PADDING + lane * LANE_WIDTH;
const rowY = (row: number) => row * ROW_HEIGHT + ROW_HEIGHT / 2;

function curve(x1: number, y1: number, x2: number, y2: number) {
  const middle = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${middle}, ${x2} ${middle}, ${x2} ${y2}`;
}

interface GitGraphRow {
  id: string;
  branch: string;
  message: string;
  year: string;
  project?: string;
  merges?: string;
  refs?: string[];
  row: number;
}

interface GitGraphPath {
  id: string;
  color: string;
  d: string;
}

export interface UseGitGraphProps {
  rows: GitGraphRow[];
  paths: GitGraphPath[];
  railWidth: number;
  height: number;
  openProject: ReturnType<typeof useEditor>["openProject"];
  ROW_HEIGHT: number;
  laneX: (lane: number) => number;
  rowY: (row: number) => number;
  DOT_RADIUS: number;
}

export const useGitGraph = (): UseGitGraphProps => {
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

  return {
    rows,
    paths,
    railWidth,
    height,
    openProject,
    ROW_HEIGHT,
    laneX,
    rowY,
    DOT_RADIUS,
  };
};
