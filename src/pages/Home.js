import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebaseDb from '../firebase.db';
import '../styles/Home.css';

const Home = (props) => {
  const [myData, setMyData] = useState();
  const setMyDatas = async () => {
    if (props.user) {
      const my = await firebaseDb.getMyData(props.user.email);
      setMyData(my);
    }
  };
  useEffect(() => {
    setMyDatas();
  }, [props.user]);
  useEffect(() => {
    console.log('Home', myData);
  }, [myData]);
  return (
    <div id="home">
      <div id="home-title">
        Fetch Mind
      </div>
      <div id="main-box">
        <div id="left-box">
          {
            (myData)
              ? (
                <div>
                  <div>{myData.name}</div>
                  <div>{myData.score}</div>
                </div>
              )
              : (<div>Loading...</div>)
          }
        </div>
        <div id="right-box">
          <Link to="/drawingpage">drawing</Link>
          <Link to="/solve">solve</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
