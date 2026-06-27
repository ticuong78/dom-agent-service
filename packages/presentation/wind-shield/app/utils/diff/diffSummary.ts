import type { StandardDiffType } from "@ticuong78/dom-agent";

export type DiffSummary = {
  total: number;

  added: number;
  removed: number;
  modified: number;
  moved: number;
  resized: number;
  neutral: number;

  byType: Partial<Record<StandardDiffType, number>>;
};
