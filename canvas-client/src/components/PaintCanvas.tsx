import type React from "react";
import type { Canvas } from "../types/canvas";
import { useEffect, useRef } from "react";

export interface PaintCanvasProps {
  canvas: Canvas;
  scale: number;
}

export const PaintCanvas: React.FC<PaintCanvasProps> = ({ canvas, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx == null) return;

    for (let i = 0; i < canvas.cells.length; i++) {
      const cell = canvas.cells[i];

      ctx.fillStyle = cell.color;
      ctx.fillRect(cell.x * scale, cell.y * scale, scale, scale);
    }
  }, [canvasRef, canvas, scale]);

  return (
    <>
      <p>width: {canvas.width}, height: {canvas.width}</p>
      <canvas ref={canvasRef} width={canvas.width * scale} height={canvas.height * scale} />
    </>
  );
};