import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';


// class DrawingSettings {
//   this.bru
// }
const canvasWidth = '80%';
const canvasHeight = '800px';
const lazyRadius = 10;
const brushRadius = 3;
let saveableCanvas;

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
          id="green"
          type="button"
          onClick={() => {
            setBrushColor('#32a628');
          }}
        />
        <input
          id="blue"
          type="button"
          onClick={() => {
            setBrushColor('#0022ff');
          }}
        />
        <input
          id="yellow"
          type="button"
          onClick={() => {
            setBrushColor('#ffea00');
          }}
        />
        <input
          id="black"
          type="button"
          onClick={() => {
            setBrushColor('#000000');
          }}
        />
        <input
          type="button"
          onClick={() => {
            // e.preventdefault();
            saveableCanvas.undo();
            console.log("undo");
          }}
        />
        <input
          type="button"
          onClick={() => {
            // e.preventdefault();
            saveableCanvas.getSaveData();
            console.log(saveableCanvas);
          }}
        />
      </div>
    );
  }
  // function submitDrawing (e) {
  //   e.preventdefault();
  //   fetch{

  //   }
  // }
  return (
    <div>
      <DrawingTools />
      <CanvasDraw
        ref={canvasDraw => (saveableCanvas = canvasDraw)}
        brushColor={brushColor}
        brushRadius={brushRadius}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        lazyRadius={lazyRadius}
        DrawingTools={DrawingTools}
        catenaryColor= "#0a0302"
      />
      
    </div>
  );
}


export default Canvas;
