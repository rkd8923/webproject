import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import AnswerModal from '../components/solve/AnswerModal';
import firebaseDb from '../firebase.db';
import '../styles/Solve.css';
import Canvas from '../components/draw/Canvas';
import DrawingSubject from '../components/draw/DrawingSubject';
import SubmitDrawing from '../components/draw/SubmitDrawing';


function Solve(props) {
  let loadableCanvas;
  const [problem, setProblem] = useState(); // problem은 랜덤으로 선택된 이번에 출제될 문제의 오브젝트
  const [answer, setAnswer] = useState('');
  const [myAnswer, setMyAnswer] = useState('');
  const [dbId, setDbId] = useState('');
  const [myData, setMyData] = useState(); // myData는 { id, name, score, solved }를 저장
  const [clear, setClear] = useState(false);
  const [time, setTime] = useState(0);
  const [loadPaint] = useState('');
  const [myScore, setMyScore] = useState(0);

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
    const images = Object.values(response);
    const rand = getRandomInt(0, images.length);
    setProblem(images[rand]);
    console.log(images[rand]);
  }, [problem]);

  const submit = () => {
    // const mySolved = (myData.solved) ? myData.solved.push(solve)
    const myS = myData.score + (1000 - time);
    setMyScore(myS);
    firebaseDb.pushClearData({
      userId: dbId,
      userData: {
        id: myData.id,
        name: myData.name,
        score: myS,
      },
    });
  };

  const checkClear = () => {
    if (answer === myAnswer) {
      setClear(true);
      submit();
    } else {
      setClear(false);
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
    selectProblem();
  }, []);
  useEffect(() => {
    if (problem) {
      loadableCanvas.loadSaveData(problem.image);
      setAnswer(problem.answer);
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
                canvasWidth="80%"
                canvasHeight="800px"
                hideGrid
                ref={(canvasDraw) => { (loadableCanvas = canvasDraw); }}
                saveData={loadPaint}
              />
            )
            : (
              <div>loading...</div>
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
