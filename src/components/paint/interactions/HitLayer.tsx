import React, { useCallback, useEffect, useRef, useState } from "react";
import "../pixi";
import { Handle, Point } from "../types";
import {
  clamp,
  cursorForHandle,
  distance,
  getHandles,
  isInsideRect,
} from "../utils";
import { Rectangle } from "pixi.js";
import { useAppDispatch, useAppSelector } from "../../../store/reactBindings";
import {
  appendPoint,
  endStroke,
  redo,
  startStroke,
  undo,
} from "../../../store/actions/strokes";
import penCursorImg from "../../../assets/tool-icons/pen.png";
import brushCursorImg from "../../../assets/tool-icons/brush.png";

export function HitLayer({
  hostRef,
  canvasSize,
  setCanvasSize,
  drawRect,
  handleSize = 12,
  onResizeStart,
  onResizeEnd,
}: {
  hostRef: React.RefObject<HTMLDivElement>;
  canvasSize: { width: number; height: number };
  setCanvasSize: (s: { width: number; height: number }) => void;
  drawRect: { x: number; y: number; width: number; height: number };
  handleSize?: number;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
}) {
  const hitRef = useRef<any>(null);
  const drawingRef = useRef<boolean>(false);
  const resizingRef = useRef<Handle>(null);
  const anchorRef = useRef<Point | null>(null);
  const dispatch = useAppDispatch();
  const brush = useAppSelector((s) => s.brush);
  const ui = useAppSelector((s) => s.ui);
  const zoom = ui?.zoom ?? 1;
  const activeTool = ui?.activeTool ?? "pen";
  const activeShape = ui?.activeShape ?? null;

  const [penCursor, setPenCursor] = useState<string>("crosshair");
  const [brushCursor, setBrushCursor] = useState<string>("crosshair");
  const [eraserCursor, setEraserCursor] = useState<string>("crosshair");

  // Pen cursor
  useEffect(() => {
    const img = new Image();
    img.src = penCursorImg as unknown as string;
    img.onload = () => {
      const targetSize = 24;
      const aspect = img.width / img.height;
      const w = targetSize;
      const h = Math.round(targetSize / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const hotX = 3;
      const hotY = h - 3;
      const url = canvas.toDataURL("image/png");
      setPenCursor(`url(${url}) ${hotX} ${hotY}, crosshair`);
    };
  }, []);

  // Brush cursor
  useEffect(() => {
    const img = new Image();
    img.src = brushCursorImg as unknown as string;
    img.style = "transform: rotate(180deg)";
    img.onload = () => {
      const targetSize = 24;
      const aspect = img.width / img.height;
      const w = targetSize;
      const h = Math.round(targetSize / aspect);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.translate(w / 2, h / 2); // merkez noktasını referans al
      ctx.rotate(Math.PI); // 180 derece = π radyan
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.resetTransform(); // isteğe bağlı, dönüşümü sıfırla
      const hotX = 3;
      const hotY = h - 3;
      const url = canvas.toDataURL("image/png");
      setBrushCursor(`url(${url}) ${hotX} ${hotY}, crosshair`);
    };
  }, []);

  // Eraser cursor (square - paint gibi)
  useEffect(() => {
    const targetSize = Math.max(8, brush.eraserWidth || 16); // Eraser width'e göre boyut, minimum 8px
    const canvas = document.createElement("canvas");
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Square cursor çiz - merkez nokta (paint gibi)
    ctx.fillStyle = "#ffffffff";
    ctx.fillRect(0, 0, targetSize, targetSize);
    ctx.strokeStyle = "#252525ff";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, targetSize, targetSize);
    const hotX = Math.floor(targetSize / 2);
    const hotY = Math.floor(targetSize / 2);
    const url = canvas.toDataURL("image/png");
    setEraserCursor(`url(${url}) ${hotX} ${hotY}, crosshair`);
  }, [brush.eraserWidth]);


  // Aktif araca göre cursor seç
  const getToolCursor = () => {
    switch (activeTool) {
      case "pen":
        return penCursor;
      case "brush":
        return brushCursor;
      case "eraser":
        return eraserCursor;
      default:
        return "crosshair";
    }
  };

  // Aktif araca göre stroke width seç
  const getStrokeWidth = useCallback(() => {
    if (activeTool === "pen") return 2;
    if (activeTool === "eraser") return brush.eraserWidth || 16;
    return brush.width;
  }, [activeTool, brush.eraserWidth, brush.width]);

  useEffect(() => {
    const g = hitRef.current;
    const host = hostRef.current;
    if (!g || !host) return;

    const updateArea = () => {
      // Canvas'ın gerçek boyutunu kullan
      // scrollWidth/scrollHeight canvas'ın gerçek içerik boyutunu verir
      // Bu sayede zoom ve canvas boyutu değişikliklerinde hit area doğru olur
      const w = Math.max(host.scrollWidth || 0, host.offsetWidth || 0, host.clientWidth || 0);
      const h = Math.max(host.scrollHeight || 0, host.offsetHeight || 0, host.clientHeight || 0);
      g.hitArea = new Rectangle(0, 0, w, h);
    };

    const ro = new (window as any).ResizeObserver(updateArea);
    ro.observe(host);
    updateArea();

    return () => {
      try {
        ro.disconnect();
      } catch {}
    };
  }, [hostRef, drawRect, zoom]);

  const getHandleUnderPoint = (p: Point): Handle => {
    // Handle'lar canvas dışında olmalı (drawRect kenarlarına göre)
    // Handle detection için drawRect kenarlarını kullan (canvas kenarı)
    const handleOffset = 4; // Handle'lar canvas'tan 4px dışarıda
    const handles = getHandles(drawRect, handleSize, handleOffset);
    const entries = Object.entries(handles) as [
      Exclude<Handle, null>,
      { x: number; y: number; w: number; h: number }
    ][];
    // Handle tolerance - handle'ın biraz daha geniş alanını kontrol et
    const tolerance = handleSize * 1.5;
    for (const [k, r] of entries) {
      // Handle'ın merkez noktasına olan mesafeyi kontrol et
      const centerX = r.x + r.w / 2;
      const centerY = r.y + r.h / 2;
      const distX = Math.abs(p.x - centerX);
      const distY = Math.abs(p.y - centerY);
      if (distX <= tolerance && distY <= tolerance) {
        return k;
      }
    }
    return null;
  };

  const toLogical = (global: Point): Point => ({
    x: global.x / zoom,
    y: global.y / zoom,
  });

  useEffect(() => {
    const g = hitRef.current;
    const host = hostRef.current;
    if (!g || !host) return;

    g.eventMode = "static";
    g.cursor = "default";

    const onDown = (e: any) => {
      const p = toLogical({ x: e.global.x, y: e.global.y });

        const h = getHandleUnderPoint(p);
        if (h) {
          resizingRef.current = h;
          onResizeStart?.();
          // Anchor noktası: başlangıç mouse pozisyonu ve mevcut canvas boyutu
          anchorRef.current = {
            x: p.x, // Başlangıç mouse pozisyonu
            y: p.y,
            canvasWidth: canvasSize.width, // Başlangıç canvas boyutu
            canvasHeight: canvasSize.height,
          };
          g.cursor = cursorForHandle(h);
          return;
        }

      if (isInsideRect(p, drawRect)) {
        g.cursor = getToolCursor();
        if (activeTool === "shape" && activeShape) {
          anchorRef.current = p; // store start
        } else {
          const mode = activeTool === "eraser" ? "eraser" : brush.mode;
          dispatch(
            startStroke(
              p,
              brush.color,
              getStrokeWidth(),
              mode
            )
          );
          drawingRef.current = true;
        }
      }
    };

    const onMove = (e: any) => {
      const p = toLogical({ x: e.global.x, y: e.global.y });

      if (resizingRef.current) {
        const anchor = anchorRef.current as any;
        if (!anchor) return;
        
        const handle = resizingRef.current;
        
        // Mouse'un başlangıç pozisyonundan ne kadar hareket ettiğini hesapla
        const deltaX = p.x - anchor.x;
        const deltaY = p.y - anchor.y;

        // Anchor'dan başlangıç canvas boyutunu al
        let nw = anchor.canvasWidth || canvasSize.width;
        let nh = anchor.canvasHeight || canvasSize.height;
        
        if (handle === "e") {
          // Sağ: genişlik artar
          nw = Math.max(100, anchor.canvasWidth + deltaX);
        } else if (handle === "w") {
          // Sol: genişlik azalır
          nw = Math.max(100, anchor.canvasWidth - deltaX);
        } else if (handle === "s") {
          // Alt: yükseklik artar
          nh = Math.max(100, anchor.canvasHeight + deltaY);
        } else if (handle === "n") {
          // Üst: yükseklik azalır
          nh = Math.max(100, anchor.canvasHeight - deltaY);
        } else if (handle === "se") {
          // Sağ alt: hem genişlik hem yükseklik artar
          nw = Math.max(100, anchor.canvasWidth + deltaX);
          nh = Math.max(100, anchor.canvasHeight + deltaY);
        } else if (handle === "sw") {
          // Sol alt: genişlik azalır, yükseklik artar
          nw = Math.max(100, anchor.canvasWidth - deltaX);
          nh = Math.max(100, anchor.canvasHeight + deltaY);
        } else if (handle === "ne") {
          // Sağ üst: genişlik artar, yükseklik azalır
          nw = Math.max(100, anchor.canvasWidth + deltaX);
          nh = Math.max(100, anchor.canvasHeight - deltaY);
        } else if (handle === "nw") {
          // Sol üst: hem genişlik hem yükseklik azalır
          nw = Math.max(100, anchor.canvasWidth - deltaX);
          nh = Math.max(100, anchor.canvasHeight - deltaY);
        }

        g.cursor = cursorForHandle(handle);
        // Maksimum limit kontrolü (8192)
        nw = Math.max(100, Math.min(8192, nw));
        nh = Math.max(100, Math.min(8192, nh));
        
        // Her zaman güncelle (React state batching nedeniyle)
        setCanvasSize({ width: nw, height: nh });
        return;
      }

      const h = getHandleUnderPoint(p);
      if (h) {
        g.cursor = cursorForHandle(h);
      } else if (isInsideRect(p, drawRect)) {
        g.cursor = getToolCursor();
      } else {
        g.cursor = "default";
      }

      if (activeTool === "shape" && activeShape) {
        return; // no freehand while shaping
      }
      if (!drawingRef.current) return;
      // Çizim sadece drawRect içinde yapılabilir (Windows Paint mantığı)
      if (!isInsideRect(p, drawRect)) {
        // Eğer drawRect dışına çıkıldıysa stroke'u bitir
        if (drawingRef.current) {
          drawingRef.current = false;
          dispatch(endStroke());
        }
        return;
      }
      dispatch(appendPoint(p));
    };

    const onUp = (e?: any) => {
      if (resizingRef.current) {
        resizingRef.current = null;
        anchorRef.current = null;
        g.cursor = "default";
        onResizeEnd?.();
        return;
      }
      if (activeTool === "shape" && activeShape && anchorRef.current) {
        const a = anchorRef.current;
        const gp = e ? toLogical({ x: e.global.x, y: e.global.y }) : a;
        const b = gp;
        if (activeShape === "rectangle") {
          const x1 = Math.min(a.x, b.x);
          const y1 = Math.min(a.y, b.y);
          const x2 = Math.max(a.x, b.x);
          const y2 = Math.max(a.y, b.y);
          const pts = [
            { x: x1, y: y1 },
            { x: x2, y: y1 },
            { x: x2, y: y2 },
            { x: x1, y: y2 },
            { x: x1, y: y1 },
          ];
          dispatch(
            startStroke(
              pts[0],
              brush.color,
              getStrokeWidth(),
              activeTool === "eraser" ? "eraser" : brush.mode
            )
          );
          for (let i = 1; i < pts.length; i++) dispatch(appendPoint(pts[i]));
          dispatch(endStroke());
        } else if (activeShape === "line") {
          const pts = [a, b];
          dispatch(
            startStroke(
              pts[0],
              brush.color,
              getStrokeWidth(),
              activeTool === "eraser" ? "eraser" : brush.mode
            )
          );
          dispatch(appendPoint(pts[1]));
          dispatch(endStroke());
        } else if (activeShape === "ellipse") {
          // approximate ellipse with polyline
          const cx = (a.x + b.x) / 2;
          const cy = (a.y + b.y) / 2;
          const rx = Math.abs(b.x - a.x) / 2;
          const ry = Math.abs(b.y - a.y) / 2;
          const segments = 36;
          const pts = Array.from({ length: segments + 1 }, (_, i) => {
            const t = (i / segments) * Math.PI * 2;
            return { x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) };
          });
          dispatch(
            startStroke(
              pts[0],
              brush.color,
              getStrokeWidth(),
              activeTool === "eraser" ? "eraser" : brush.mode
            )
          );
          for (let i = 1; i < pts.length; i++) dispatch(appendPoint(pts[i]));
          dispatch(endStroke());
        }
        anchorRef.current = null;
      }
      if (drawingRef.current) {
        drawingRef.current = false;
        dispatch(endStroke());
      }
    };

    g.on("pointerdown", onDown);
    g.on("pointermove", onMove);
    g.on("pointerup", onUp);
    g.on("pointerupoutside", onUp);

    return () => g.removeAllListeners();
  }, [
    dispatch,
    brush,
    canvasSize,
    setCanvasSize,
    drawRect,
    handleSize,
    penCursor,
    brushCursor,
    eraserCursor,
    activeTool,
    activeShape,
    zoom,
    getStrokeWidth,
  ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "z") {
        e.preventDefault();
        dispatch(undo());
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (key === "y" || (e.shiftKey && key === "z"))
      ) {
        e.preventDefault();
        dispatch(redo());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatch]);

  return <pixiGraphics ref={hitRef} draw={() => {}} />;
}
