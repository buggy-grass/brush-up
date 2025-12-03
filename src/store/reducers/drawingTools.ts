import { BrushState } from "../types";
import { DrawingToolsAction } from "../actions/drawingTools";

const initial: BrushState = {
  width: 4,
  color: 0xff0000,
  mode: "brush",
  smoothing: false,
  smoothingLevel: 3,
  eraserWidth: 16,
};

export function drawingToolsReducer(state: BrushState = initial, action: DrawingToolsAction): BrushState {
  switch (action.type) {
    case "SET_BRUSH_WIDTH":
      return { ...state, width: action.width };
    case "SET_BRUSH_COLOR":
      return { ...state, color: action.color };
    case "SET_BRUSH_MODE":
      return { ...state, mode: action.mode };
    case "SET_SMOOTHING":
      return { ...state, smoothing: action.smoothing };
    case "SET_SMOOTHING_LEVEL":
      return { ...state, smoothingLevel: action.level };
    case "SET_ERASER_WIDTH":
      return { ...state, eraserWidth: action.width };
    default:
      return state;
  }
}


