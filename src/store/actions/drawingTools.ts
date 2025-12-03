import { BrushMode } from "../types";

export const setBrushWidth = (width: number) => ({ type: "SET_BRUSH_WIDTH" as const, width });
export const setBrushColor = (color: number) => ({ type: "SET_BRUSH_COLOR" as const, color });
export const setBrushMode = (mode: BrushMode) => ({ type: "SET_BRUSH_MODE" as const, mode });
export const setSmoothing = (smoothing: boolean) => ({ type: "SET_SMOOTHING" as const, smoothing });
export const setSmoothingLevel = (level: number) => ({ type: "SET_SMOOTHING_LEVEL" as const, level });
export const setEraserWidth = (width: number) => ({ type: "SET_ERASER_WIDTH" as const, width });

export type DrawingToolsAction =
  | ReturnType<typeof setBrushWidth>
  | ReturnType<typeof setBrushColor>
  | ReturnType<typeof setBrushMode>
  | ReturnType<typeof setSmoothing>
  | ReturnType<typeof setSmoothingLevel>
  | ReturnType<typeof setEraserWidth>;


