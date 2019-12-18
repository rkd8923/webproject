/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { database } from 'firebase';
import AnswerPop from '../components/solve/answerPop';
import firebaseDb from '../firebase.db';
import '../styles/Solve.css';

// timer는 useEffect 이용해서 구현해야함.
function Solve(props) {
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
      setMyData(my);
    }
  };
  const handleAnswer = (e) => {
    e.preventDefault();
    setAnswer(e.target.value);
  };
  // let time = 0;
  // setInterval (() => {
  //   const timer = document.getElementById('timer');
  //   time++;
  //   timer.textContent = `Time: ${time}`;
  // }, 1000)
  const getImageData = useCallback(async () => {
    const response = await firebaseDb.getImageData();
    setPaints(Object.values(response));
  }, [paints]);

  const selectRandomImage = () => {
    // paints에 있는 이미지오브젝트들 중에서
    // myData.solved 에는 없는 이미지 중, random으로 하나 선택해서
    // setProblem 하기

    console.log('구현예정');
  };

  const submit = () => {
    // imageObject의 정답과 확인 후 정답 여부 알려주기
    // 만약 정답일 경우, user의 데이터(score, solved) 해결해서 push
  };
  const giveUp = () => {
    // 포기 시 다시 home
  };
  const onAnswer = (e) => {
    e.preventDefault();

    const answerWin = window.open('', 'window', 'width=100, height=200, left= 650, top=300');
    answerWin.document.write("<div> <p>축하합니다</p> /br <form name='continue'> <input type='submit' value='다음 문제로'/> </form> <form name='stop'> <input type='submit' value='메인메뉴'> </form></div>");
  };

  const onGiveup = (e) => {
    e.preventDefault();

    const giveupWin = window.open('', 'window', 'width=100, height=200, left= 650, top=300');
    giveupWin.document.write('<p>12321</p>');
  };
  useEffect(() => {
    getImageData();
  }, []);
  useEffect(() => {
    console.log(paints);
  }, [paints]);

  // user에 저장된 email을 이용해 myData를 업데이트
  useEffect(() => {
    setMyDatas();
  }, [props.user]);
  useEffect(() => {
    selectRandomImage();
  }, [myData]);
  return (
    <div id="solve">
      <div id="canvas-box">
        <input
          type ="button"
          value="그림 불러오기"
          onClick ={() => {
            setLoadPaint(localStorage.getItem('savedDrawing'));
            console.log(localStorage.getItem('savedDrawing'));
            loadableCanvas.loadSaveData(
              loadPaint
            );
          }}
          // onClick={() => {
          //   loadableCanvas.loadSaveData(
          //     paints,
          //   );
          // }}
        />
        <CanvasDraw
          disabled
          canvasWidth ="80%"
          canvasHeight ="800px"
          hideGrid
          disabled
          ref={(canvasDraw) => (loadableCanvas = canvasDraw)}
          saveData={loadPaint}
        />
      </div>
      <div id="solve-tools">
        <div className="timer">time: 0</div>
        <div className="answer-box">
          <input
            className="answer"
            type="text"
            value={answer}
            onChange={handleAnswer}
          />
          <button onClick={submit}>제출</button>
        </div>
        <button className="give-up" onClick={giveUp}>
          포기
        </button>
      </div>
    </div>
  );
}


export default Solve;
