import { UIState, ToolType, ShapeType } from "../types";
import { UIAction } from "../actions/ui";

const initial: UIState = { zoom: 1, activeTool: "pen", activeShape: null };

type ExtraActions = { type: "SET_ACTIVE_TOOL"; tool: ToolType } | { type: "SET_ACTIVE_SHAPE"; shape: ShapeType };

export function uiReducer(state: UIState = initial, action: UIAction | ExtraActions): UIState {
  switch (action.type) {
    case "SET_ZOOM": {
      const z = Math.min(4, Math.max(0.25, action.zoom));
      return { ...state, zoom: z };
    }
    case "ZOOM_IN": {
      const z = Math.min(4, state.zoom * 1.1);
      return { ...state, zoom: z };
    }
    case "ZOOM_OUT": {
      const z = Math.max(0.25, state.zoom / 1.1);
      return { ...state, zoom: z };
    }
    case "SET_ACTIVE_TOOL": {
      return { ...state, activeTool: action.tool };
    }
    case "SET_ACTIVE_SHAPE": {
      return { ...state, activeShape: action.shape };
    }
    default:
      return state;
  }
}


