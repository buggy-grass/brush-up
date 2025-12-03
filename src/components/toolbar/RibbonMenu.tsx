import { Stack } from "@fluentui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/reactBindings";
import {
  setBrushColor,
  setBrushMode,
  setBrushWidth,
  setSmoothing,
  setSmoothingLevel,
} from "../../store/actions/drawingTools";
import { redo, undo } from "../../store/actions/strokes";
import { setActiveShape, setActiveTool } from "../../store/actions/ui";
import {
  ToolbarButton,
  Tooltip,
  Text,
  Image,
  makeStyles,
  Divider,
} from "@fluentui/react-components";
import {
  PaintBrushColor,
  Pentagon32Regular,
  EditColor,
} from "@fluentui/react-icons";
import EraserIcon from "../../assets/tool-icons/eraser.png";
import ColorPicker from "../../assets/tool-icons/color-picker.png";
import ColorFill from "../../assets/tool-icons/color-fill.png";

interface IDrawingItem {
  order: number;
  content: string;
  icon: any;
  onClick: () => void;
}

type IDrawingTools = IDrawingItem[];

const useStyles = makeStyles({
  drawImage: {
    width: "24px",
    height: "24px",
  },
  ribbonTitle: {
    color: "#c5c5c5",
    textAlign: "center",
  },
});

function RibbonMenu() {
  const dispatch = useAppDispatch();
  const brush = useAppSelector((s) => s.brush);
  const ui = useAppSelector((s) => s.ui);
  const styles = useStyles();
  const tool = useAppSelector((s) => s.ui?.activeTool ?? "pen");

  const onColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.replace("#", "");
    const color = parseInt(hex, 16) >>> 0;
    dispatch(setBrushColor(color));
  };

  const selectTool = (
    type: "pen" | "eraser" | "brush" | "color-fill" | "color-picker"
  ) => {
    switch (type) {
      case "pen":
        dispatch(setActiveTool("pen"));
        dispatch(setBrushMode("brush"));
        dispatch(setBrushWidth(2));
        break;
      case "brush":
        dispatch(setActiveTool("brush"));
        dispatch(setBrushMode("brush"));
        dispatch(setBrushWidth(4));
        break;
      case "eraser":
        dispatch(setActiveTool("eraser"));
        dispatch(setBrushMode("eraser"));
        break;
      case "color-picker":

        break;
      case "color-fill":

        break;
    }
  };

  const drawingTools: IDrawingTools = [
    {
      order: 1,
      content: "Pen",
      icon: <EditColor className={styles.drawImage} />,
      onClick: () => selectTool("pen"),
    },
    {
      order: 1,
      content: "Eraser",
      icon: <Image src={EraserIcon} className={styles.drawImage} />,
      onClick: () => selectTool("eraser"),
    },
    {
      order: 1,
      content: "Brush",
      icon: (
        <PaintBrushColor
          style={{ transform: "rotate(-45deg)" }}
          className={styles.drawImage}
        />
      ),
      onClick: () => selectTool("brush"),
    },
    {
      order: 2,
      content: "Color Fill",
      icon: <Image src={ColorFill} className={styles.drawImage} />,
      onClick: () => selectTool("color-fill"),
    },
    {
      order: 2,
      content: "Color Picker",
      icon: <Image src={ColorPicker} className={styles.drawImage} />,
      onClick: () => selectTool("color-picker"),
    },
  ];

  const hexColor = "#" + brush.color.toString(16).padStart(6, "0");

  return (
    <Stack
      style={{
        height: "120px",
        borderBottom: "1px solid #383838",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 12px",
        gap: 16,
      }}
    >
      {/* <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button> */}
      <Stack style={{ gap: 10 }}>
        <Stack style={{ gap: 4 }}>
          <Stack horizontal verticalAlign="center" style={{ gap: 10 }}>
            {drawingTools.map(
              (drawingTool: IDrawingItem) =>
                drawingTool.order == 1 && (
                  <Tooltip
                    content={drawingTool.content}
                    relationship="description"
                    withArrow
                  >
                    <ToolbarButton
                      onClick={drawingTool.onClick}
                      aria-label="Increase Font Size"
                      icon={drawingTool.icon}
                    />
                  </Tooltip>
                )
            )}
          </Stack>
          <Stack horizontal verticalAlign="center" style={{ gap: 10 }}>
            {drawingTools.map(
              (drawingTool: IDrawingItem) =>
                drawingTool.order == 2 && (
                  <Tooltip
                    content={drawingTool.content}
                    relationship="description"
                    withArrow
                  >
                    <ToolbarButton
                      onClick={drawingTool.onClick}
                      aria-label="Increase Font Size"
                      icon={drawingTool.icon}
                    />
                  </Tooltip>
                )
            )}
          </Stack>
        </Stack>
        <Text size={200} className={styles.ribbonTitle}>
          {"Drawing Tools"}
        </Text>
      </Stack>

      <Divider vertical style={{minHeight: "80px"}}/>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => {
            dispatch(setActiveTool("shape"));
            dispatch(setActiveShape(null));
          }}
          disabled={ui?.activeTool === "shape"}
        >
          Shape
        </button>
      </div>

      {ui?.activeTool === "shape" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Shapes</span>
          <button
            onClick={() => dispatch(setActiveShape("rectangle"))}
            disabled={ui?.activeShape === "rectangle"}
          >
            Rectangle
          </button>
          <button
            onClick={() => dispatch(setActiveShape("ellipse"))}
            disabled={ui?.activeShape === "ellipse"}
          >
            Ellipse
          </button>
          <button
            onClick={() => dispatch(setActiveShape("line"))}
            disabled={ui?.activeShape === "line"}
          >
            Line
          </button>
        </div>
      )}

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Brush Width
        <input
          type="range"
          min={1}
          max={40}
          value={brush.width}
          onChange={(e) => dispatch(setBrushWidth(Number(e.target.value)))}
        />
        <span>{brush.width}px</span>
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Color
        <input type="color" value={hexColor} onChange={onColor} />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Eraser
        <input
          type="checkbox"
          checked={brush.mode === "eraser"}
          onChange={(e) =>
            dispatch(setBrushMode(e.target.checked ? "eraser" : "brush"))
          }
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Smoothing
        <input
          type="checkbox"
          checked={brush.smoothing}
          onChange={(e) => dispatch(setSmoothing(e.target.checked))}
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Level
        <input
          type="range"
          min={1}
          max={9}
          step={2}
          value={brush.smoothingLevel}
          onChange={(e) => dispatch(setSmoothingLevel(Number(e.target.value)))}
          disabled={!brush.smoothing}
        />
      </label>
    </Stack>
  );
}

export default RibbonMenu;
