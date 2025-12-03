import { Stack } from "@fluentui/react";
import React, { useRef, useState, useEffect } from "react";
import { Application } from "@pixi/react";
import "./pixi"; // WebGPU'yu devre dışı bırakmak için
import { DrawingLayer } from "./drawing/DrawingLayer";
import { RectOverlay } from "./overlay/RectOverlay";
import { HitLayer } from "./interactions/HitLayer";
import { useAppSelector } from "../../store/reactBindings";
import EraserTool from "./eraser/EraserTool";

export default function PaintArea() {
  const viewRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostEl, setHostEl] = useState<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 200, height: 200 });
  const [drawRect, setDrawRect] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 200, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const handleSize = 12;
  // Canvas kenarlarında padding (Windows Paint mantığı - 3rem)
  const CANVAS_PADDING_REM = 3;
  // Maksimum canvas boyutu (buffer limitleri için)
  const MAX_CANVAS_SIZE = 8192;
  const zoom = useAppSelector((s) => s.ui?.zoom ?? 1);
  const prevZoomRef = useRef<number>(zoom);
  const pixiAppRef = useRef<any>(null);
  const tool = useAppSelector((s) => s.ui?.activeTool ?? "pen");

  useEffect(() => {
    setHostEl(hostRef.current);
  }, []);

  // 3rem padding'i piksel cinsine çevir
  const getPaddingPx = () => {
    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
    return CANVAS_PADDING_REM * rootSize;
  };

  // İlk yüklemede workspace'i başlat (200x200 px)
  // Canvas CSS transform ile zaten ortada olacak, scroll'a gerek yok

  // Canvas boyutu değiştiğinde drawRect'i otomatik güncelle (canvas'ın tamamını kaplasın)
  useEffect(() => {
    const padding = getPaddingPx();
    // drawRect canvas'ın tamamını kaplasın (padding ile)
    setDrawRect({
      x: padding,
      y: padding,
      width: Math.max(0, canvasSize.width - padding * 2),
      height: Math.max(0, canvasSize.height - padding * 2),
    });
  }, [canvasSize]);

  // Canvas boyutu değiştiğinde Pixi.js Application'ı resize et
  useEffect(() => {
    // Host div'inin boyutunu güncelle
    if (hostRef.current) {
      hostRef.current.style.width = `${canvasSize.width}px`;
      hostRef.current.style.height = `${canvasSize.height}px`;
    }
    
    // Pixi.js Application'ı resize et
    if (pixiAppRef.current && pixiAppRef.current.renderer) {
      const app = pixiAppRef.current;
      
      // Renderer'ı resize et
      app.renderer.resize(canvasSize.width, canvasSize.height);
      
      // Canvas view'ın CSS boyutunu güncelle
      if (app.view) {
        app.view.style.width = `${canvasSize.width}px`;
        app.view.style.height = `${canvasSize.height}px`;
      }
      
      // Viewport'u da güncelle (eğer varsa)
      if (app.stage) {
        // Stage'i yeniden render et
        app.render();
      }
    }
  }, [canvasSize.width, canvasSize.height]);

  // Canvas CSS transform ile her zaman ortada kalacak, resize sonrası ortalamaya gerek yok

  // Zoom için scroll gerekmiyor, canvas zaten ortada

  return (
    <Stack id="paint-area" style={{ width: "100%", height: "calc(100% - 160px)", background: "#323232", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {tool == "eraser" && (
        <EraserTool/>
      )}
      <div 
        ref={hostRef} 
        id="canvas" 
        style={{ 
          width: `${canvasSize.width}px`, 
          height: `${canvasSize.height}px`,
          position: "relative"
        }}
      >
        {hostEl && (
          <Application 
            background={"#323232"} 
            preference="webgl"
            width={canvasSize.width}
            height={canvasSize.height}
            onApp={(app) => {
              pixiAppRef.current = app;
              // İlk mount'ta resize et
              setTimeout(() => {
                if (app && app.renderer) {
                  app.renderer.resize(canvasSize.width, canvasSize.height);
                  if (app.view) {
                    app.view.style.width = `${canvasSize.width}px`;
                    app.view.style.height = `${canvasSize.height}px`;
                  }
                }
              }, 0);
            }}
            options={{
              preference: 'webgl',
              antialias: true,
              autoDensity: true,
              resolution: window.devicePixelRatio || 1,
            }}
          >
            <pixiContainer scale={{ x: zoom, y: zoom }}>
              <RectOverlay drawRect={drawRect} canvasSize={canvasSize} />
              <DrawingLayer drawRect={drawRect} />
            </pixiContainer>
            <HitLayer 
              hostRef={hostRef} 
              canvasSize={canvasSize}
              setCanvasSize={setCanvasSize}
              drawRect={drawRect} 
              onResizeStart={() => setIsResizing(true)}
              onResizeEnd={() => setIsResizing(false)}
            />
          </Application>
        )}
      </div>
    </Stack>
  );
}
