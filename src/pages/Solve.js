import React, { useState, useEffect, useCallback } from 'react';
import AnswerPop from '../components/solve/answerPop.js'
import firebaseDb from '../firebase.db.js';
import { database } from 'firebase';


function Solve() {
  const [paints, setPaints] = useState([]);
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

  const onAnswer = (e) =>{
    e.preventDefault();
    
    window.open('src/components/solve/answerPop.html', 'window', 'width=100, height=200, left= 650, top=300');
  }

  const onGiveup = (e) =>{
    e.preventDefault();

    const giveupWin = window.open('', 'window', 'width=100, height=200, left= 650, top=300');
    giveupWin.document.write("<p>12321</p>");
  } 
  useEffect(() => {
    getImageData();
  }, [])
  useEffect(() => {
    console.log(paints);
  }, [paints])
  return (
    <div>
      <div style = {{textAlign : 'center'}}>
        <img src= {require('../20101209012239.jpg')} alt ='cy' />
      </div>
      <div id = 'timer' style = {{textAlign : 'right',  marginRight : '100px'}}>Time: 0
        </div>
        <form onSubmit={onAnswer} style = {{textAlign : 'center'}}>
          <input type = 'text' className = 'answer' />
          <input type = 'submit' value='입력' />
        </form>

        <form onSubmit= {onGiveup} style = {{textAlign : 'right', float : 'right'}}>
          <input type = 'submit' value= '포기' style = {{marginRight : '100px'}}/>
        </form>
    </div>
  );
}


export default Solve;