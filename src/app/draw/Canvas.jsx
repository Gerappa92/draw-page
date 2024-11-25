import { useRef, useState, useEffect } from "react";

export default function Canvas({width, height, onGenerateImage}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Optional: Add some default styling for drawing
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set default drawing styles
    ctx.lineWidth = 5; // Default brush size
    ctx.lineCap = "round"; // Smooth line edges
    ctx.strokeStyle = "#FFFFFF"; // Default line color (white)
  }, []);

  // Utility function to get X and Y coordinates relative to the canvas
  const getX = (event) =>
    event.clientX - canvasRef.current.getBoundingClientRect().left;
  const getY = (event) =>
    event.clientY - canvasRef.current.getBoundingClientRect().top;

  // Start drawing when mouse is pressed
  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath(); // Start a new path
    ctx.moveTo(getX(event), getY(event)); // Move to mouse position
    setIsDrawing(true);
  };

  // Draw as the mouse moves
  const draw = (event) => {
    if (!isDrawing) return; // Stop if not drawing

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineTo(getX(event), getY(event)); // Draw a line to the new position
    ctx.stroke(); // Render the line
  };

  // Stop drawing when mouse is released
  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.closePath(); // Finish the drawing path
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset the generated image
    onGenerateImage(null);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;

    // Convert canvas content to a data URL (PNG format)
    const imageData = canvas.toDataURL("image/png");

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "sketch.png"; // Default filename
    link.click(); // Trigger the download
  };

  const generateImage = () => {
    const canvas = canvasRef.current;

    // Convert the canvas to a Data URL
    const imageData = canvas.toDataURL("image/png");

    // Simulate AI transformation (example: invert colors)
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      tempCanvas.width = img.width;
      tempCanvas.height = img.height;

      // Draw the original image on the temporary canvas
      tempCtx.drawImage(img, 0, 0);

      // Apply transformation (invert colors as an example)
      const imageData = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      const pixels = imageData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i]; // Red
        pixels[i + 1] = 255 - pixels[i + 1]; // Green
        pixels[i + 2] = 255 - pixels[i + 2]; // Blue
      }

      tempCtx.putImageData(imageData, 0, 0);

      // Pass the transformed image to parent
      onGenerateImage(tempCanvas.toDataURL("image/png"));
    };
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={styles.canvas}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={clearCanvas}>
          Clear Canvas
        </button>
        <button style={styles.button} onClick={saveCanvas}>
          Save Canvas
        </button>
        <button style={styles.button} onClick={generateImage}>
          Generate Image
        </button>
      </div>
    </div>
  );
}

const styles = {
  canvas: {
    border: "2px solid #6A0DAD", // Purple accent
    cursor: "crosshair", // Makes it clear the user can draw
    marginBottom: "20px", // Add spacing below the canvas
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#6A0DAD", // Purple color
    color: "#FFFFFF", // White text
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};