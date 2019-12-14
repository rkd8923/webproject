import React, { useEffect } from 'react';
import Canvas from '../components/draw/Canvas';
import DrawingSubject from '../components/draw/DrawingSubject';
import SubmitDrawing from '../components/draw/SubmitDrawing';
import firebase from '../firebase';



function DrawingPage() {
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser);
  }, [])
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
