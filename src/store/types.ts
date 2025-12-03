import { Point } from "../components/paint/types";
export type { Point } from "../components/paint/types";

export type BrushMode = "brush" | "eraser";

export interface BrushState {
  width: number;
  color: number; // 0xRRGGBB
  mode: BrushMode;
  smoothing: boolean;
  smoothingLevel: number; // window size for moving average
  eraserWidth: number; // eraser tool boyutu
}

export interface Stroke {
  points: Point[];
  color: number;
  width: number;
}

export interface PaintState {
  strokes: Stroke[];
  undone: Stroke[];
  brush: BrushState;
}

export type ToolType = "pen" | "brush" | "eraser" | "shape";
export type ShapeType = "rectangle" | "ellipse" | "line" | null;

export interface UIState {
  zoom: number; // 1.0 = 100%
  activeTool: ToolType;
  activeShape: ShapeType;
}

export type Action =
  | { type: "START_STROKE"; point: Point }
  | { type: "APPEND_POINT"; point: Point }
  | { type: "END_STROKE" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET_BRUSH_WIDTH"; width: number }
  | { type: "SET_BRUSH_COLOR"; color: number }
  | { type: "SET_BRUSH_MODE"; mode: BrushMode }
  | { type: "SET_SMOOTHING"; smoothing: boolean }
  | { type: "SET_SMOOTHING_LEVEL"; level: number }
  | { type: "SET_ERASER_WIDTH"; width: number };

export const initialState: PaintState = {
  strokes: [],
  undone: [],
  brush: {
    width: 4,
    color: 0xff0000,
    mode: "brush",
    smoothing: false,
    smoothingLevel: 3,
    eraserWidth: 16,
  },
};


