const DrawingTools = ({
    onColorChange,
    onBrushSizeChange,
    onClearCanvas,
  }: {
    onColorChange: (color: string) => void;
    onBrushSizeChange: (size: number) => void;
    onClearCanvas: () => void;
  }) => (
    <div className="tools">
      <label>
        Brush Color:
        <input type="color" onChange={(e) => onColorChange(e.target.value)} />
      </label>
      <label>
        Brush Size:
        <input
          type="range"
          min="1"
          max="20"
          onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
        />
      </label>
      <button onClick={onClearCanvas}>Clear Canvas</button>
    </div>
  );
  
  export default DrawingTools;
  