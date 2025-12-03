import { extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";

// WebGPU'yu devre dışı bırak - Pixi.js'in WebGL kullanmasını zorla
if (typeof navigator !== 'undefined') {
  try {
    // WebGPU requestAdapter'ını devre dışı bırak
    const originalGPU = (navigator as any).gpu;
    if (originalGPU && originalGPU.requestAdapter) {
      (navigator as any).gpu = {
        ...originalGPU,
        requestAdapter: () => Promise.resolve(null), // WebGPU adapter döndürme
      };
    }
  } catch (e) {
    // Eğer override edilemezse sessizce geç
  }
}

extend({ Container, Graphics });
