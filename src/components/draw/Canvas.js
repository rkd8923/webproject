import React from 'react';
import CanvasDraw from 'react-canvas-draw';

// class DrawingSettings {
//   this.bru
// }


function Canvas() {
  const canvasWidth = '80%';
  const canvasHeight = '800px';
  const lazyRadius
  const brushRadius = 10;
  const brushColor = '#272727';
  return (
    <div>
      <CanvasDraw brushColor={brushColor} brushRadius={brushRadius} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />


    </div>
  );
}

export default Canvas;
