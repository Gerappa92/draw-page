"use client";

import { useState } from "react";
import Canvas from "./Canvas";
import Image from "next/image";

export default function Draw() {
  const [generatedImage, setGeneratedImage] = useState(null);

  const canvasWidth = 640;
  const canvasHeight = 640;


  return (
    <div style={styles.container}>
      <Canvas 
        width={canvasWidth}
        height={canvasHeight}
        onGenerateImage={(img) => setGeneratedImage(img)} />

      {generatedImage && (
        <div style={styles.generatedContainer}>
          <h3 style={styles.heading}>Generated Image:</h3>
          <Image
            src={generatedImage}
            alt="Generated"
            style={styles.generatedImage}
            width={canvasWidth}
            height={canvasHeight}
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    justifyContent: "center",
    alignItems: "center",
  },
  generatedContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  generatedImage: {
    border: "2px solid #6A0DAD",
    marginTop: "10px",
    maxWidth: "90%",
  },
};
