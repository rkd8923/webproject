import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import AnswerModal from '../components/solve/AnswerModal';
import firebaseDb from '../firebase.db';
import '../styles/Solve.css';

function Solve(props) {
  let loadableCanvas;
  const [problem, setProblem] = useState();
  const [answer, setAnswer] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  const [dbId, setDbId] = useState('');
  const [myData, setMyData] = useState();
  const [clear, setClear] = useState(false);
  const [time, setTime] = useState(0);
  const [loadPaint] = useState('');
  const [myScore, setMyScore] = useState(0);
  const [empty, setEmpty] = useState(false);
  const setMyDatas = async () => {
    if (props.user) {
      const my = await firebaseDb.getMyData(props.user.email);
      setDbId(my.dbId);
      setMyData(my.myData);
    }
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    setMyAnswer(e.target.value);
  };
  const getRandomInt = (m, M) => {
    const min = Math.ceil(m);
    const max = Math.floor(M);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const selectProblem = useCallback(async () => {
    const response = await firebaseDb.getImageData();
    if (!response) {
      setEmpty(true);
      return;
    }
    const images = Object.entries(response);
    console.log(images[0], images[1], images[2]);
    const solved = [];
    if (myData.solved) {
      for (let i = 0; i < images.length; i += 1) {
        if (myData.solved.includes(images[i][0])) {
          console.log(i, images[i][0]);
          solved.push(i);
        }
      }
    }
    const newImages = [];
    for (let j = 0; j < images.length; j += 1) {
      if (!solved.includes(j)) {
        newImages.push(images[j]);
      }
    }
    if (newImages.length === 0) {
      setEmpty(true);
    } else {
      const rand = getRandomInt(0, newImages.length);
      setProblem(newImages[rand]);
      console.log(newImages[rand]);
    }
  }, [myData]);

  const submit = () => {
    let mySolved = [];
    if (myData.solved) {
      mySolved = [...myData.solved, problem[0]];
    } else {
      mySolved = [problem[0]];
    }
    console.log('mySolved', mySolved);
    const myS = myData.score + (1000 - time);
    setMyScore(myS);
    firebaseDb.pushClearData({
      userId: dbId,
      userData: {
        id: myData.id,
        name: myData.name,
        score: myS,
        solved: mySolved,
      },
    });
  };

  const checkClear = () => {
    if (answer === myAnswer) {
      setClear(true);
      submit();
    } else {
      setClear(false);
      /* eslint-disable-next-line */
      alert('다시 시도!');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clear) {
        setTime(time + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);
  useEffect(() => {
    if (myData !== undefined) {
      selectProblem();
    }
  }, [myData]);
  useEffect(() => {
    if (problem) {
      loadableCanvas.loadSaveData(problem[1].image);
      setAnswer(problem[1].answer);
    }
  }, [problem]);
  useEffect(() => {
    setMyDatas();
  }, [props.user]);

  return (
    <div id="solve">
      <div id="canvas-box">
        {
          (problem)
            ? (
              <CanvasDraw
                disabled
                hideGrid
                lazyRadius="0"
                brushRadius="0"
                brushColor="#FFFFFF"
                catenaryColor="#FFFFFF"
                canvasWidth="1200px"
                canvasHeight="800px"
                ref={(canvasDraw) => { (loadableCanvas = canvasDraw); }}
                saveData={loadPaint}
              />
            )
            : (
              (empty)
                ? (<div>남은 문제가 없습니다.</div>)
                : (<div>loading...</div>)
            )
        }
      </div>
      <div id="solve-tools">
        <div className="timer">{`Time: ${time}`}</div>
        <div className="answer-box">
          <input
            className="answer"
            type="text"
            value={myAnswer}
            onChange={handleAnswer}
          />
          <button className="submitBtn" onClick={checkClear}>제출</button>
        </div>
        <Link className="give-up" to="/home">포기</Link>
      </div>
      { (clear) ? (<AnswerModal score={myScore - myData.score} />) : (<div />) }
    </div>
  );
}

export default Solve;
