import { Stack } from "@fluentui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/reactBindings";
import { setZoom, zoomIn, zoomOut } from "../../store/actions/ui";
import { Button, Slider, Image } from "@fluentui/react-components";
import { PaintBrushColor, EditColor, Pentagon32Regular } from "@fluentui/react-icons";
import EraserIcon from "../../assets/tool-icons/eraser.png";

function StatusBar() {
  const dispatch = useAppDispatch();
  const zoom = useAppSelector((s) => s.ui?.zoom ?? 1);
  const tool = useAppSelector((s) => s.ui?.activeTool ?? "pen");
  const pct = Math.round(zoom * 100);

  const iconEl =
    tool === "brush" ? (
      <PaintBrushColor style={{ transform: "rotate(-45deg)" }} />
    ) : tool === "eraser" ? (
      <Image src={EraserIcon} style={{width: "20x", height: "20px"}}/>
    ) : tool === "shape" ? (
      <Pentagon32Regular />
    ) : (
      <EditColor />
    );

  return (
    <Stack
      style={{
        height: "40px",
        borderTop: "1px solid #383838",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{iconEl}</div>
        <span style={{ fontSize: 13 }}>{tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 44, textAlign: "right" }}>{pct}%</span>
        <Button onClick={() => dispatch(zoomOut())}>-</Button>
        <Slider size="small" min={25} max={400} value={pct} onChange={(e) => dispatch(setZoom(Number(e.target.value) / 100))} />
        <Button onClick={() => dispatch(zoomIn())}>+</Button>
      </div>
    </Stack>
  );
}

export default StatusBar;
