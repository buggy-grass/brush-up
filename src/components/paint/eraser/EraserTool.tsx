import { Stack } from "@fluentui/react";
import { makeStyles, Slider } from "@fluentui/react-components";
import { BlurRegular, SquareEraserRegular } from "@fluentui/react-icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/reactBindings";
import { setEraserWidth } from "../../../store/actions/drawingTools";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50px",
    height: "300px",
    background: "#242424",
    left: "10px",
    zIndex: 998
  },
  slider: {},
});

function EraserTool() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const eraserWidth = useAppSelector((s) => s.brush?.eraserWidth ?? 16);

  const changedSlider = (_e: any, data: any) => {
    const value = Number(data.value);
    dispatch(setEraserWidth(value));
  };

  return (
    <Stack className={styles.container}>
      <Stack.Item
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          paddingTop: "10px",
          paddingBottom: "3px",
          borderRadius: "5px",
          boxShadow: "1px 1px 1px #252525",
        }}
      >
        <SquareEraserRegular style={{ width: "20px", height: "20px", gap: 10 }} />
        <Slider
          value={eraserWidth}
          min={1}
          max={100}
          vertical
          style={{ height: "100%", gap: 10 }}
          onChange={changedSlider}
        />
      </Stack.Item>
    </Stack>
  );
}

export default EraserTool;
