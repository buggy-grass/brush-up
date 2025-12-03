import React, { useRef } from "react";
import { useTick } from "@pixi/react";
import "../pixi";
import { useAppSelector } from "../../../store/reactBindings";
import { Point } from "../types";
import { isInsideRect } from "../utils";

function smoothPoints(points: Point[], windowSize: number): Point[] {
  if (points.length <= 2 || windowSize <= 1) return points;
  const half = Math.floor(windowSize / 2);
  const smoothed: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    let sx = 0;
    let sy = 0;
    let count = 0;
    for (let j = i - half; j <= i + half; j++) {
      const idx = Math.max(0, Math.min(points.length - 1, j));
      sx += points[idx].x;
      sy += points[idx].y;
      count++;
    }
    smoothed.push({ x: sx / count, y: sy / count });
  }
  return smoothed;
}

export function DrawingLayer({ drawRect }: { drawRect: { x: number; y: number; width: number; height: number } }) {
  const graphicsRef = useRef<any>(null);
  const strokes = useAppSelector((s) => s.strokes);
  const brush = useAppSelector((s) => s.brush);

  useTick(() => {
    const g = graphicsRef.current;
    if (!g) return;

    g.clear();

    for (let s = 0; s < strokes.length; s++) {
      const stroke = strokes[s];
      const pts = brush.smoothing ? smoothPoints(stroke.points, brush.smoothingLevel) : stroke.points;
      if (!pts || pts.length === 0) continue;

      if (pts.length === 1) {
        const p = pts[0];
        if (isInsideRect(p, drawRect)) {
          g.circle(p.x, p.y, stroke.width / 2).fill(stroke.color);
        }
        continue;
      }

      let started = false;
      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        if (!isInsideRect(pt, drawRect)) continue;
        if (!started) {
          g.moveTo(pt.x, pt.y);
          started = true;
        } else {
          g.lineTo(pt.x, pt.y);
        }
      }
      if (started) {
        g.stroke({ width: stroke.width, color: stroke.color, alpha: 1, cap: "round", join: "round" });
      }
    }
  });

  return <pixiGraphics ref={graphicsRef} eventMode="none" draw={() => {}} />;
}
