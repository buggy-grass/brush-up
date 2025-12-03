export const setZoom = (zoom: number) => ({ type: "SET_ZOOM" as const, zoom });
export const zoomIn = () => ({ type: "ZOOM_IN" as const });
export const zoomOut = () => ({ type: "ZOOM_OUT" as const });
export const setActiveTool = (tool: import("../types").ToolType) => ({ type: "SET_ACTIVE_TOOL" as const, tool });
export const setActiveShape = (shape: import("../types").ShapeType) => ({ type: "SET_ACTIVE_SHAPE" as const, shape });

export type UIAction =
  | ReturnType<typeof setZoom>
  | ReturnType<typeof zoomIn>
  | ReturnType<typeof zoomOut>
  | ReturnType<typeof setActiveTool>
  | ReturnType<typeof setActiveShape>;


