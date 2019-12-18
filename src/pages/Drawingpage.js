import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
  red, green, blue, yellow, grey,
} from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import firebaseDb from '../firebase.db';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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

  const ColorButtonRed = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);

  const ColorButtonGreen = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  const ColorButtonBlue = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  }))(Button);
  const ColorButtonYellow = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(yellow[500]),
      backgroundColor: yellow[500],
      '&:hover': {
        backgroundColor: yellow[700],
      },
    },
  }))(Button);
  const ColorButtonBlack = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: grey[500],
      '&:hover': {
        backgroundColor: grey[700],
      },
    },
  }))(Button);


  const classes = useStyles();


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
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <ColorButtonRed
              variant="contained"
              onClick={() => {
                setBrushColor('#e62b12');
              }}
            >
            Red
            </ColorButtonRed>
            <ColorButtonGreen
              variant="contained"
              onClick={() => {
                setBrushColor('#32a628');
              }}
            >
            Green
            </ColorButtonGreen>
            <ColorButtonBlue
              variant="contained"
              onClick={() => {
                setBrushColor('#0022ff');
              }}
            >
            Blue
            </ColorButtonBlue>
            <ColorButtonYellow
              variant="contained"
              onClick={() => {
                setBrushColor('#ffea00');
              }}
            >
            Yellow
            </ColorButtonYellow>
            <ColorButtonBlack
              variant="contained"
              onClick={() => {
                setBrushColor('#000000');
              }}
            >
            Black
            </ColorButtonBlack>
          </ButtonGroup>
        </Drawer>


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
      <div>
        <DrawingTools />
      </div>
      <Container fixed>
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
      </Container>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={value}
          onChange={handleChange}
          variant="outlined"
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
      </div>

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
