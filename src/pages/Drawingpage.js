import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Canvas from '../components/draw/Canvas';
import SubmitDrawing from '../components/draw/SubmitDrawing';

function DrawingPage(props) {
  let userEmail = '';
  if (props.user) {
    userEmail = props.user.email;
    console.log('yoyo', userEmail);
  }
  // useEffect(() => {
  //   if (props.user) {
  //     userEmail = props.user.email;
  //     console.log('yoyo', userEmail);
  //   }
  // }, [props.user]);

  return (
    <div>
      <div>
      Drawing Canvas
      </div>
      <Canvas userEmail={userEmail} />
      <SubmitDrawing />
    </div>
  );
}


export default DrawingPage;
