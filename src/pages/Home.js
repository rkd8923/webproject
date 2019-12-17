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
      <div id="home-box">
        <div id="home-title">
        Fetch Mind
        </div>
        <div id="main-box">
          <div id="left-box">
            <div id="left-box-title">
              내 정보
            </div>
            <div id="left-box-content">
              {
                (myData)
                  ? (
                    <div>
                      <div>
                        닉네임 :&nbsp;
                        {myData.name}
                      </div>
                      <div>
                        내 점수 :&nbsp;
                        {myData.score}
                        &nbsp;점
                      </div>
                    </div>
                  )
                  : (<div>Loading...</div>)
              }
            </div>
          </div>
          <div id="right-box">
            <div id="right-box-drawing">
              <Link to="/drawingpage">문제 출제하기</Link>
            </div>
            <div id="right-box-solve">
              <Link to="/solve">문제 풀기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
