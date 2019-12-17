import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import firebaseDb from '../firebase.db';
import '../styles/Login.css';
import LoginForm from '../components/Login/LoginForm';

const Login = (props) => {
  const [User, setUser] = useState();
  const [haveId, setHaveId] = useState(false);
  const checkHaveId = async () => {
    const users = await firebaseDb.getUserData();
    const usersData = Object.values(users);
    if (props.user) {
      usersData.forEach((user) => {
        if (user.id === props.user.email) {
          setHaveId(true);
        }
      });
    }
  };
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    checkHaveId();
  };
  // const logout = async () => {
  //   firebase.auth().signOut();
  // }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  });

  useEffect(() => {
    checkHaveId();
  }, [props.user]);

  return (
    <div id="login">
      <div className="login-box">
        <div className="title">
          Fetch Mind
        </div>
        {
          (!User)
            ? (
              <button className="google-login" onClick={googleLogin}>
                <img className="google-logo" src="/static/google_logo.png" width="80" />
                <span>Login with Google</span>
              </button>
            )
            : (
              (!haveId)
                ? (
                  <div>
                    <LoginForm user={props.user} setHaveId={setHaveId} />
                  </div>
                )
                : (
                  <Link to="/home">
                    <button className="enter-button">입장하기</button>
                  </Link>
                )
            )
        }
      </div>
    </div>
  );
};
export default Login;
