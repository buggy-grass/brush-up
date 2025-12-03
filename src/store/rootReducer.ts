import { combineReducers } from "redux";
import { drawingToolsReducer } from "./reducers/drawingTools";
import { strokesReducer, undoneReducer } from "./reducers/strokes";
import { uiReducer } from "./reducers/ui";

const combined = (state: any, action: any) => {
  const partial = {
    brush: drawingToolsReducer(state?.brush, action),
    strokes: strokesReducer(state?.strokes, action),
    ui: uiReducer(state?.ui, action),
  } as any;
  return {
    ...partial,
    undone: undoneReducer(state?.undone, action, partial.strokes),
  };
};

export const rootReducer = combined as unknown as ReturnType<typeof combineReducers>;


