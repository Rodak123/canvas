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
    console.log('paiting', x, y, color);

    sendAction(CLIENT_ACTIONS.PAINT_CELL, {
      x, y, color
    });
  };

  useEffect(() => {
    if (apiMessage == null) return;

    if (apiMessage.action === SERVER_ACTIONS.UPDATED_CANVAS) {
      setCanvas(apiMessage.data as Canvas);
    }
  }, [apiMessage]);

  if (readyState != ReadyState.OPEN) {
    return (
      <Loader text="Connecting" />
    );
  }

  if (canvas == null) {
    return (
      <Loader />
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center">
        <PaintCanvas canvas={canvas} scale={12} paintCell={paintCell} />
        <div className="mx-2" />
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </div>
  );
}