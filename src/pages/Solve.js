/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { database } from 'firebase';
import AnswerPop from '../components/solve/answerPop';
import firebaseDb from '../firebase.db';
import '../styles/Solve.css';

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
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
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
    const myScore = myData.score + (1000 - time);
    firebaseDb.pushClearData({
      userId: dbId,
      userData: {
        id: myData.id,
        name: myData.name,
        score: myScore,
      }
    });
  }

  const checkClear = () => {
    if (answer === myAnswer) {
      setClear(true);
      submit();
    } else {
      setClear(false);
      alert('다시 시도!');
    }
  };

  const giveUp = () => {
    // 포기 시 다시 home
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
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
  }, [problem])
  // user에 저장된 email을 이용해 myData를 업데이트
  useEffect(() => {
    setMyDatas();
  }, [props.user]);
  useEffect(() => {
    // selectRandomImage();D
    console.log('my', myData);
  }, [myData]);

  return (
    <div id="solve">
      <div id="canvas-box">
        {
          (problem)
          ? (
              <CanvasDraw
                disabled
                canvasWidth="80%" //너비와 위치는 수정하세요.
                canvasHeight="800px"
                hideGrid
                ref={(canvasDraw) => (loadableCanvas = canvasDraw)}
                saveData={loadPaint}
              />
            )
          : (
              <div>loading...</div>
            )
        }
      </div>
      {
        (!clear)
        ? <AnswerPop />
        : <div></div>
      }
      <div id="solve-tools">
        <div className="timer">{`time: ${time}`}</div>
        <div className="answer-box">
          <input
            className="answer"
            type="text"
            value={myAnswer}
            onChange={handleAnswer}
          />
          <button onClick={checkClear}>제출</button>
        </div>
        <button className="give-up" onClick={giveUp}>
          포기
        </button>
      </div>
    </div>
  );
}


export default Solve;
