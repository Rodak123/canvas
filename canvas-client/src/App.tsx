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
    sendAction(CLIENT_ACTIONS.PAINT_CELL, {
      x, y, color
    });
  };

  useEffect(() => {
    if (apiMessage === null) return;

    if (apiMessage.action === SERVER_ACTIONS.UPDATED_CANVAS) {
      setCanvas(apiMessage.data as Canvas);
    }
  }, [apiMessage]);

  if (readyState !== ReadyState.OPEN) {
    return (
      <Loader text="Connecting" />
    );
  }

  if (canvas === null) {
    return (
      <Loader />
    );
  }

  if (window.innerWidth < 1000 || window.innerHeight < 1000) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <div>
          <p className="fs-1">Sorry,</p>
          <p className="fs-3">but this website has no mobile support</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-4" style={{ width: '100vw', height: '100vh', backgroundColor: color }}>
      <div className="d-flex justify-content-center">
        <PaintCanvas canvas={canvas} scale={12} paintCell={paintCell} />
        <div className="mx-2" />
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </div>
  );
}