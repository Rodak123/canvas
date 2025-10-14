import type React from "react";
import type { Canvas } from "../models/canvas";
import { useEffect, useRef } from "react";

export interface PaintCanvasProps {
  canvas: Canvas;
  scale: number;
  paintCell: (x: number, y: number) => void;
}

export const PaintCanvas: React.FC<PaintCanvasProps> = ({ canvas, scale, paintCell }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  scale = Math.max(scale, 1);

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;

    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const x = Math.floor(mouseX / scale);
      const y = Math.floor(mouseY / scale);

      paintCell(x, y);
    };

    return () => {
      canvas.onclick = () => { };
    };
  }, [canvasRef, scale, paintCell]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d') ?? null;
    if (ctx === null) return;

    for (let i = 0; i < canvas.cells.length; i++) {
      const cell = canvas.cells[i];

      ctx.fillStyle = cell.color;
      ctx.fillRect(cell.x * scale, cell.y * scale, scale, scale);
      // ctx.strokeStyle = '#000000';
      // ctx.strokeRect(cell.x * scale, cell.y * scale, scale, scale);
    }
  }, [canvasRef, canvas, scale]);

  return (
    <div>
      <p>width: {canvas.width}, height: {canvas.width}</p>
      <canvas ref={canvasRef} width={canvas.width * scale} height={canvas.height * scale} />
    </div>
  );
};