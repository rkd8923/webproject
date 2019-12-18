import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import { withStyles,makeStyles  } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import firebaseDb from '../firebase.db';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

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


  const classes = useStyles();

  const handleChange = (event) => {
    setBrushColor(event.target.value);
  };

  if (props.user) { // 로그인체크
    userEmail = props.user.email;
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
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Brush Color</FormLabel>
          <RadioGroup aria-label="gender" name="colors" value={brushColor} onChange={handleChange}>
            <FormControlLabel value="#e62b12" control={<Radio />} label="Red" />
            <FormControlLabel value="#32a628" control={<Radio />} label="Green" />
            <FormControlLabel value="#0022ff" control={<Radio />} label="Blue" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="(Disabled option)"
            />
          </RadioGroup>
        </FormControl>
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
