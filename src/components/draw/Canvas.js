import React, { useState, useEffect } from 'react';
import CanvasDraw from 'react-canvas-draw';
import firebaseDb from '../../firebase.db';

// class DrawingSettings {
//   this.bru
// }
const canvasWidth = '80%';
const canvasHeight = '800px';
const lazyRadius = 10;
const brushRadius = 3;
let currentDrawing;
let image;

function Canvas() {
  const [brushColor, setBrushColor] = useState('#000000');
  const [answer, setAnswer] = useState('');

  function DrawingTools() {
    return (
      <div>
        <input
          id="red"
          value="red"
          type="button"
          onClick={() => {
            setBrushColor('#e62b12');
          }}
        />
        <input
          id="green"
          value="green"
          type="button"
          onClick={() => {
            setBrushColor('#32a628');
          }}
        />
        <input
          id="blue"
          value="blue"
          type="button"
          onClick={() => {
            setBrushColor('#0022ff');
          }}
        />
        <input
          id="yellow"
          value="yellow"
          type="button"
          onClick={() => {
            setBrushColor('#ffea00');
          }}
        />
        <input
          id="black"
          value="black"
          type="button"
          onClick={() => {
            setBrushColor('#000000');
          }}
        />
        <input
          id="eraser"
          value="eraser"
          type="button"
          onClick={() => {
            setBrushColor('#FFFFFF');
          }}
        />
        <input
          type="button"
          value="undo"
          onClick={() => {
            // e.preventdefault();
            currentDrawing.undo();
            console.log('undo');
          }}
        />
        <input
          type="button"
          value="save"
          onClick={() => {
            image = currentDrawing.getSaveData();
            console.log(image);
          }}
        />
      </div>
    );
  }

  const onSend = () => {
    image = currentDrawing.getSaveData();
    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail, answer, image);
    firebaseDb.pushImageData(userEmail, answer, image);
  };

  const SubmitDrawing = () => {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      >
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <input
          type="submit"
          value="save"
        />
      </form>
    );
  };

  return (
    <div>
      <DrawingTools />
      <CanvasDraw
        hideGrid
        ref={(canvasDraw) => (currentDrawing = canvasDraw)}
        brushColor={brushColor}
        brushRadius={brushRadius}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        lazyRadius={lazyRadius}
        DrawingTools={DrawingTools}
      />
      <SubmitDrawing />
    </div>
  );
}


export default Canvas;
