/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
  red, green, blue, yellow, grey,
} from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import '../styles/Drawingpage.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Slider from '@material-ui/core/Slider';
import RoundedCornerTwoToneIcon from '@material-ui/icons/RoundedCornerTwoTone';
import firebaseDb from '../firebase.db';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  card: {
    width: 275,
    height: 500,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  root: {
    display: 'flex',
    padding: theme.spacing(3, 2),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

function DrawingPage(props) {
  const canvasWidth = '1200px';
  const canvasHeight = '800px';
  const lazyRadius = 10;
  let currentDrawing;
  let image;
  let userEmail = '';
  const [brushColor, setBrushColor] = useState('#000000');
  const [answer, setAnswer] = useState('');
  const [brushRadius, setBrushRadius] = useState(3);


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
        <ButtonGroup
          orientation="vertical"
          color="primary"
          className={classes.toolbar}
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

        <IconButton
          variant="contained"
          color="default"
          onClick={() => {
            setBrushColor('#FFFFFF');
          }}
        >
          <RoundedCornerTwoToneIcon />
        </IconButton>


        <IconButton
          aria-label="Clear All"
          onClick={() => {
            currentDrawing.clear();
          }}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          aria-label="Undo"
          onClick={() => {
            currentDrawing.undo();
          }}
        >
          <UndoIcon />
        </IconButton>

        <IconButton>
          <Brightness1Icon style={{ color: `${brushColor}` }} />
        </IconButton>

        <Slider
          value={brushRadius}
          style={{ color: '#000000' }}
          onChange={(event, newBrushRadius) => {
            setBrushRadius(newBrushRadius);
          }}
          aria-labelledby="Adjust Brush Radius"
          min={3}
          max={100}
        />


      </div>
    );
  }

  const onSend = () => {
    image = currentDrawing.getSaveData();
    // console.log(userEmail, answer, image);
    firebaseDb.pushImageData(userEmail, answer, image);
    setAnswer('');
    currentDrawing.clear();
    alert('제출이 완료되었습니다.');
  };


  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          xs={1}
          direction="column"
          justify="center"
          alignItems="baseline"
        >
          <Grid>
            <Typography variant="h5" component="h3" id="tool-title">
              Tools
            </Typography>
          </Grid>
          <Grid item xs spacing={3}>

            <Paper className={classes.paper}><DrawingTools /></Paper>
          </Grid>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <CanvasDraw
              hideGrid
              ref={(canvasDraw) => (currentDrawing = canvasDraw)}
              brushColor={brushColor}
              brushRadius={brushRadius}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              lazyRadius={lazyRadius}
              DrawingTools={DrawingTools}
              border
            />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography>
              안녕하세요, FetchMind에 오신 것을 환영합니다.
              <br />
              FetchMind는 여러분이 만드는 창의적 작화 유추 게임입니다.
              <br />
              이곳에서 여러분은 본인의 머릿속에 떠오르는 바로 그 대상을 그려 다른 사람들이 풀어볼 수 있도록 할 수 있습니다.
              <br />
              <br />
              본인의 창의력을 맘껏 펼쳐보세요!

            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div id="form-answer">
        <form
          id="drawing-submission"
          onSubmit={(e) => {
            e.preventDefault();
            setAnswer(e.target.value);
            onSend();
            // localStorage.setItem('savedDrawing', image);
          }}
        >
          <TextField
            label="그림의 정답을 입력하세요"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="5글자 이내가 좋습니다 :)"
            margin="normal"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            value="save"
            id="submit-answer"
            variant="contained"
          >
          제출하기
          </Button>
        </form>
      </div>
    </div>
  );
}


export default DrawingPage;
