import React, { useRef } from "react";
import { useTick } from "@pixi/react";
import "../pixi";
import { Handle } from "../types";
import { getHandles } from "../utils";

export function RectOverlay({ 
  drawRect, 
  canvasSize,
  handleSize = 12 
}: { 
  drawRect: { x: number; y: number; width: number; height: number }; 
  canvasSize: { width: number; height: number };
  handleSize?: number 
}) {
  const ref = useRef<any>(null);

  useTick(() => {
    const g = ref.current;
    if (!g) return;
    g.clear();

    // drawRect'i göster (canvas'ın içindeki çizim alanı)
    g.rect(drawRect.x, drawRect.y, drawRect.width, drawRect.height).fill(0xffffff);

    g.rect(drawRect.x, drawRect.y, drawRect.width, drawRect.height);
    g.stroke({ width: 1, color: 0x666666, alpha: 1 });

    // Handle'ları canvas dışında göster (drawRect kenarlarına göre)
    // Handle'lar canvas kenarından dışarıya offset kadar uzakta olmalı
    const handleOffset = 4; // Handle'lar canvas'tan 4px dışarıda
    const handles = getHandles(drawRect, handleSize, handleOffset);
    const keys: Handle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
    for (const k of keys) {
      const h = (handles as any)[k as any];
      g.rect(h.x, h.y, h.w, h.h).fill(0x0078d4);
    }
  });

  return <pixiGraphics ref={ref} eventMode="none" draw={() => {}} />;
}
