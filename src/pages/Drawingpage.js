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
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import firebaseDb from '../firebase.db';
import '../styles/Drawingpage.css';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

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
  const brushRadius = 3;
  let currentDrawing;
  let loadableCanvas;
  let image;
  let userEmail = '';
  const [brushColor, setBrushColor] = useState('#000000');
  const [answer, setAnswer] = useState('');
  const [reset, setReset] = useState('');

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
  function DrawingTools() {
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <List>
            <ListItem button key="hello">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="hello" />
            </ListItem>
          </List>
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
        </Drawer>

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
    currentDrawing.clear();
  };


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}><DrawingTools /></Paper>
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
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <div>
        <DrawingTools />
      </div>
      <div>
        <Container>
          <Paper className={classes.root}>
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
        </Container>
      </div>
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
          >
          제출하기
          </Button>
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
