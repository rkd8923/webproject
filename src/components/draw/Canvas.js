import React from 'react';
import CanvasDraw from 'react-canvas-draw';

function DrawingPage() {
  return (
    <div>
      <div>
      Drawing Canvas
      </div>
      <Settings />
      <Canvas />
      <SubmitDrawing />
    </div>
  );
}

export default DrawingPage;