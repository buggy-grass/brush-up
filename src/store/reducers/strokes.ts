import { Stroke } from "../types";
import { StrokesAction } from "../actions/strokes";

const initial: Stroke[] = [];
const initialUndone: Stroke[] = [];

export function strokesReducer(state: Stroke[] = initial, action: StrokesAction): Stroke[] {
  switch (action.type) {
    case "START_STROKE": {
      const { point, color, width, mode } = action;
      const stroke: Stroke = { points: [point], color: mode === "eraser" ? 0xffffff : color, width };
      return [...state, stroke];
    }
    case "APPEND_POINT": {
      if (state.length === 0) return state;
      const next = state.slice();
      const last = { ...next[next.length - 1] };
      last.points = [...last.points, action.point];
      next[next.length - 1] = last;
      return next;
    }
    case "END_STROKE":
      return state;
    default:
      return state;
  }
}

export function undoneReducer(state: Stroke[] = initialUndone, action: StrokesAction, strokesState?: Stroke[]): Stroke[] {
  switch (action.type) {
    case "START_STROKE":
      return [];
    case "UNDO": {
      if (!strokesState || strokesState.length === 0) return state;
      const popped = strokesState[strokesState.length - 1];
      return [...state, popped];
    }
    case "REDO": {
      if (state.length === 0) return state;
      const next = state.slice();
      next.pop();
      return next;
    }
    default:
      return state;
  }
}


