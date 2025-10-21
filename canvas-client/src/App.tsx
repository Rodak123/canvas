import { useEffect, useState } from "react";
import { useApi } from "./services/ApiProvider";
import type { Canvas } from "./models/canvas.js";
import { ReadyState } from "react-use-websocket";
import { Loader } from "./components/Loader";
import { PaintCanvas } from "./components/PaintCanvas";
import { CLIENT_ACTIONS, SERVER_ACTIONS } from "../../shared/socketAction.js";
import { ColorPicker } from "./components/ColorPicker.js";

export const App = () => {
  const { readyState, apiMessage, sendAction } = useApi();
  const [color, setColor] = useState<string>('#ffffff');
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const paintCell = (x: number, y: number) => {
    sendAction(CLIENT_ACTIONS.PAINT_CELL, { x, y, color });
  };

  useEffect(() => {
    if (!apiMessage) return;
    if (apiMessage.action === SERVER_ACTIONS.UPDATED_CANVAS) {
      setCanvas(apiMessage.data as Canvas);
    }
  }, [apiMessage]);

  if (readyState !== ReadyState.OPEN) {
    return <Loader text="Connecting" />;
  }

  if (!canvas) {
    return <Loader />;
  }

  // Determine scale based on viewport width (smaller on mobile)
  const isMobile = window.innerWidth < 768;
  const scale = isMobile ? 6 : 12;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center p-2"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: color,
        overflow: "hidden",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3"
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <PaintCanvas canvas={canvas} scale={scale} paintCell={paintCell} />
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </div>
  );
};
