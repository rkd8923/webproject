import React from 'react';
import Canvas from '../components/draw/Canvas';
import DrawingSubject from '../components/draw/DrawingSubject';
import SubmitDrawing from '../components/draw/SubmitDrawing';


function DrawingPage() {
  return (
    <div>
      <div>
      Drawing Canvas
      </div>
      <DrawingSubject />
      <Canvas />
      <SubmitDrawing />
    </div>
  );
}

export default DrawingPage;
