import { Handle, Point } from "./types";

export function distance(a: Point, b: Point) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function isInsideRect(p: Point, r: { x: number; y: number; width: number; height: number }) {
  return p.x >= r.x && p.x <= r.x + r.width && p.y >= r.y && p.y <= r.y + r.height;
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function getHandles(drawRect: { x: number; y: number; width: number; height: number }, handleSize: number, offset: number = 0) {
  const { x, y, width, height } = drawRect;
  const hs = handleSize;
  // Handle'ları canvas dışına taşı (offset kadar dışarı)
  // offset negatifse içeri, pozitifse dışarı taşır
  return {
    nw: { x: x - offset - hs, y: y - offset - hs, w: hs, h: hs },
    n: { x: x + width / 2 - hs / 2, y: y - offset - hs, w: hs, h: hs },
    ne: { x: x + width + offset, y: y - offset - hs, w: hs, h: hs },
    e: { x: x + width + offset, y: y + height / 2 - hs / 2, w: hs, h: hs },
    se: { x: x + width + offset, y: y + height + offset, w: hs, h: hs },
    s: { x: x + width / 2 - hs / 2, y: y + height + offset, w: hs, h: hs },
    sw: { x: x - offset - hs, y: y + height + offset, w: hs, h: hs },
    w: { x: x - offset - hs, y: y + height / 2 - hs / 2, w: hs, h: hs },
  } as Record<Exclude<Handle, null>, { x: number; y: number; w: number; h: number }>;
}

export function cursorForHandle(handle: Handle): string {
  switch (handle) {
    case "nw":
    case "se":
      return "nwse-resize";
    case "ne":
    case "sw":
      return "nesw-resize";
    case "n":
    case "s":
      return "ns-resize";
    case "e":
    case "w":
      return "ew-resize";
    default:
      return "crosshair";
  }
}
