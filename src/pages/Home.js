import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
const Home = () => {
  return (
    <div id="home">
      <div id="home-title">
        Fetch Mind
      </div>
      <div id="main-box">
        <div id="left-box">
          <div>UserName</div>
          <div>UserScore</div>
          <div>Problems</div>
        </div>
        <div id="right-box">
          <Link to="/drawingpage">drawing</Link>
          <Link to="/solve">solve</Link>
        </div>
      </div>
    </div>
  );
}  
export default Home;
