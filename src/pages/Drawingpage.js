import React, { useEffect } from 'react';
import Canvas from '../components/draw/Canvas';
import DrawingSubject from '../components/draw/DrawingSubject';
import SubmitDrawing from '../components/draw/SubmitDrawing';

function DrawingPage(props) {
  useEffect(() => {
    console.log(props.user);
    if (props.user) {
      console.log(props.user.email);
    }
  }, [props.user])
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
