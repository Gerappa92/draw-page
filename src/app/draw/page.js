'use client'

import { useEffect, useRef, useState } from "react";

export default function Draw() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = window.innerWidth * 0.65;
        canvas.height = window.innerHeight * 0.65;

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
      };

    return (
        <div style={styles.container}>
            <canvas
                ref={canvasRef}
                style={styles.canvas}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            ></canvas>
            <button style={styles.button} onClick={clearCanvas}>
                Clear Canvas
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column", // Stack items vertically
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Dark background
    },
    canvas: {
        border: "2px solid #6A0DAD", // Purple accent
        cursor: "crosshair", // Makes it clear the user can draw
        marginBottom: "20px", // Add spacing below the canvas
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
