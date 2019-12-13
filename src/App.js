import React, { useState, useEffect } from 'react';
import './App.css';
import FirebaseTest from './components/FirebaseTest';


function App() {
  let time = 0;
  setInterval (() => {
    const timer = document.getElementById('timer');
    time++;
    timer.textContent = time;}, 1000);
  
  const onAnswer = (e) =>{
    e.preventDefault();
    
    window.open('https://www.naver.com', 'window', 'height : 100px');
    
  }
  return (
    <div>
      <div style = {{textAlign : 'center', float: 'none'}}>
        <img src= {require('./20101209012239.jpg')} alt ='cy' />
      </div>
      <div id = 'timer' style = {{textAlign : 'right',  marginRight : '100px', float: 'right'}}>0
        </div>



        <form onSubmit={onAnswer} style = {{textAlign : 'center'}}>
          <input type = 'text' className = 'answer' />
          <input type = 'submit' value='입력' />
        </form>

        <form style = {{textAlign : 'right'}}>
          <input name = 'giveup' type = 'submit' value= '포기' style = {{marginRight : '100px'}}/>
        </form>
      
    </div>
  );
}


export default App;
