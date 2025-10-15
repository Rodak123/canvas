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

    const tryPaint = (mouseX: number, mouseY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((mouseX - rect.left) / scale);
      const y = Math.floor((mouseY - rect.top) / scale);

      paintCell(x, y);
    };

    const handleMouseDown = (e: MouseEvent) => {
      tryPaint(e.clientX, e.clientY);
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
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
      <canvas ref={canvasRef} width={canvas.width * scale} height={canvas.height * scale} />
    </div>
  );
};
