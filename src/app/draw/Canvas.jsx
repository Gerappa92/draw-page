import React, { useRef } from "react";

const Canvas = ({
  color,
  brushSize,
  onSave,
}: {
  color: string;
  brushSize: number;
  onSave: (dataUrl: string) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = () => { /* Drawing logic */ };
  const stopDrawing = () => { /* Drawing logic */ };

  const saveDrawing = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        width={500}
        height={500}
      ></canvas>
      <button onClick={saveDrawing}>Save Drawing</button>
    </div>
  );
};

export default Canvas;
