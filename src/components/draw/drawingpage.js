import React from 'react';
import Canvas from './Canvas';
import DrawingSubject from './DrawingSubject';
import DrawingTools from './DrawingTools';
import SubmitDrawing from './SubmitDrawing';


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
