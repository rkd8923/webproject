import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import Canvas from './Canvas'

function DrawingPage() {
  return (
    <div>
      <div>
      Drawing Canvas
      </div>
      <DrawingSubject />
      <DrawingTools />
      <Canvas />
      <SubmitDrawing />
      
    </div>
  );
}

export default DrawingPage;
