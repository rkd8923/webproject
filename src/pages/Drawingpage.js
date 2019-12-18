import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CanvasDraw from 'react-canvas-draw';
import firebaseDb from '../firebase.db';


function DrawingPage(props) {
  const canvasWidth = '1200px';
  const canvasHeight = '800px';
  const lazyRadius = 10;
  const brushRadius = 3;
  let currentDrawing;
  let loadableCanvas;
  let image;
  let userEmail = '';
  const [brushColor, setBrushColor] = useState('#000000');
  const [answer, setAnswer] = useState('');
  if (props.user) {
    userEmail = props.user.email;
  } else {
    
  }
  // useEffect(() => {
  //   if (props.user) {
  //     userEmail = props.user.email;
  //     console.log('yoyo', userEmail);
  //   }
  // }, [props.user]);
  console.log(localStorage.getItem('savedDrawing'));

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
      </div>
    );
  }

  const onSend = () => {
    image = currentDrawing.getSaveData();
    console.log(userEmail, answer, image);
    firebaseDb.pushImageData(userEmail, answer, image);
    setAnswer('');
  };


  return (
    <div>
      <div>
      Drawing Canvas
      </div>
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
        // saveData={localStorage.getItem('savedDrawing')}
      />
      <form
        id="drawing-submission"
        onSubmit={(e) => {
          e.preventDefault();
          setAnswer(e.target.value);
          onSend();
          // localStorage.setItem('savedDrawing', image);
        }}
      >
        <input type="text" id="answer-input" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <input
          type="submit"
          value="save"
        />
      </form>

      {/* <CanvasDraw
        disabled
        hideGrid
        ref={canvasDraw => (loadableCanvas = canvasDraw)}
        saveData={localStorage.getItem("savedDrawing")}
      /> */}


      {/* <Canvas userEmail={userEmail} /> */}
    </div>
  );
}


export default DrawingPage;
