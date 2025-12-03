import { BrushMode } from "../types";
import type { Point } from "../../components/paint/types";

export const startStroke = (point: Point, color: number, width: number, mode: BrushMode) => ({
  type: "START_STROKE" as const,
  point,
  color,
  width,
  mode,
});

export const appendPoint = (point: Point) => ({ type: "APPEND_POINT" as const, point });
export const endStroke = () => ({ type: "END_STROKE" as const });
export const undo = () => ({ type: "UNDO" as const });
export const redo = () => ({ type: "REDO" as const });

export type StrokesAction =
  | ReturnType<typeof startStroke>
  | ReturnType<typeof appendPoint>
  | ReturnType<typeof endStroke>
  | ReturnType<typeof undo>
  | ReturnType<typeof redo>;


