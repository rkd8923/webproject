import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';


// class DrawingSettings {
//   this.bru
// }
const canvasWidth = '80%';
const canvasHeight = '800px';
const lazyRadius = 10;
const brushRadius = 3;


function Canvas() {
  const [brushColor, setBrushColor] = useState('#000000');
  function DrawingTools() {
    return (
      <div>
        <input
          id="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
        <input
          id="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
        <input
          id="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
        <input
          id="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
        <input
          id="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
      </div>
    );
  }
  return (
    <div>
      <DrawingTools />
      <CanvasDraw
        brushColor={brushColor}
        brushRadius={brushRadius}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        lazyRadius={lazyRadius}
        DrawingTools={DrawingTools}
      />
    </div>
  );
}


export default Canvas;
