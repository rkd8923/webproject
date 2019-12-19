/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import firebaseDb from '../firebase.db.js';
import CanvasDraw from 'react-canvas-draw';
import { database } from 'firebase';
import AnswerPop from '../components/solve/answerPop';
import '../styles/Solve.css';
import Canvas from '../components/draw/Canvas';
import DrawingSubject from '../components/draw/DrawingSubject';
import SubmitDrawing from '../components/draw/SubmitDrawing';


// timer는 useEffect 이용해서 구현해야함.
function Solve(props) {
  const [time, setTime] = useState(0);
  // let saveData ='';
  let loadableCanvas;
  const [problem, setProblem] = useState(); // problem은 랜덤으로 선택된 이번에 출제될 문제의 오브젝트
  const [paints, setPaints] = useState([]);
  const [answer, setAnswer] = useState('');
  const [myData, setMyData] = useState(); // myData는 { id, name, score, solved }를 저장
  const [loadPaint, setLoadPaint] = useState('');
  // solved는 내가 해결한 문제의 id들의 list
  const setMyDatas = async () => {
    if (props.user) {
      const my = await firebaseDb.getMyData(props.user.email);
      console.log(my);
      setMyData(Object.values(my));
      console.log(myData);
    }
  };
  const handleAnswer = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };

  const getImageData = useCallback(async () => {
    const response = await firebaseDb.getImageData();
    setPaints(Object.values(response));
  }, [paints]);

  const selectRandomImage = () => {
    const prob = Object(paints[Math.round((paints.length - 1) * Math.random())]);
    // paints에 있는 이미지오브젝트들 중에서
    // myData.solved 에는 없는 이미지 중, random으로 하나 선택해서
    // setProblem 하기
    console.log(prob);
    setProblem(prob);
    console.log(problem);
  

    // 풀 문제의 이미지를 정하면 아래의 image위치에 넣으세요.
    localStorage.setItem('savedDrawing', problem.image);
    setLoadPaint(localStorage.getItem('savedDrawing')); // 이부분은 앞서 결정한 랜덤한 문제를, 현재 캔버스의 값에 덮어 씌우는 줄입니다.
    console.log('구현예정');
  };

    // imageObject의 정답과 확인 후 정답 여부 알려주기
    // 만약 정답일 경우, user의 데이터(score, solved) 해결해서 push

    // 포기 시 다시 home
  const onAnswer = (e) => {
    e.preventDefault();
    if (1) {
      const winResult = window.confirm('축하합니다 <확인: 평가> <취소: 메인메뉴>');
      if (winResult) {
        window.open('./Evaluation', '_self');
      } else {
        window.open('./home', '_self');
      }
    }
  }

  const onGiveup = (e) => {
    e.preventDefault();
    const giveupResult = window.confirm('포기하셨습니다 <확인: 평가> <취소: 메인메뉴>');
    if (giveupResult) {
      window.open('./Evaluation', '_self');
    } else {
      window.open('./home', '_self');
    }
  };
  useEffect(() => {
    getImageData();
  }, []);
  useEffect(() => {
    console.log(paints);
  }, [paints]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    const timerText = document.getElementById('timer');
    timerText.textContent = `Time: ${time}`;
    return () => clearInterval(timer);
  }, [time]);

  // user에 저장된 email을 이용해 myData를 업데이트
  useEffect(() => {
    setMyDatas();
  }, [props.user]);
  useEffect(async () => {
    await selectRandomImage();
    console.log(problem);
  }, [myData, paints]);


  return (
    <div id="solve">
      <div id="canvas-box">
        <input
          type="button"
          value="그림 불러오기"
          onClick={() => { //클릭할때마다 다시 로딩합니다.
            loadableCanvas.loadSaveData(
              localStorage.getItem('savedDrawing'),
            );
            console.log(loadPaint);
          }}
          // onClick={() => {
          //   loadableCanvas.loadSaveData(
          //     paints,
          //   );
          // }}
        />
        <CanvasDraw
          disabled
          canvasWidth="80%" //너비와 위치는 수정하세요.
          canvasHeight="800px"
          hideGrid
          ref={(canvasDraw) => (loadableCanvas = canvasDraw)}
          saveData={loadPaint}
        />
      </div>
      <div id="solve-tools">
        <div className="timer" id="timer">Time: 0</div>
        <div className="answer-box">
          <input
            className="answer"
            type="text"
            value={answer}
            onChange={handleAnswer}
          />
          <button onClick={onAnswer}>제출</button>
        </div>
        <button className="give-up" onClick={onGiveup}>
          포기
        </button>
      </div>
    </div>
  );
}


export default Solve;
