import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import firebaseDb from '../firebase.db';
import '../styles/Login.css';
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
  const [haveId, setHaveId] = useState(false);
  const [user, setUser] = useState();
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    checkHaveId();
  }
  // const logout = async () => {
  //   firebase.auth().signOut();
  // }
  firebase.auth().onAuthStateChanged((user) => {
    console.log(firebase.auth().currentUser);
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  })
  // const pushUserData = async () => {
  //   firebaseDb.pushUserData({
  //     id: 'testemail',
  //     name: 'testname',
  //     score: 0,
  //   });
  // }
  const checkHaveId = async () => {
    const users = await firebaseDb.getUserData();
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const currentUserId = currentUser.email;
      const usersData = Object.values(users);
      localStorage.setItem('userEmail', currentUserId);
      usersData.forEach((user) => {
        if (user.id === currentUserId) {
          setHaveId(true);
        }
      });
    }
  }
  // useEffect(() => {
  //   checkHaveId();
  // }, [])

  return (
    <div id="login">
      {/* {
        (!user)
        ? (<div>
            <button onClick={googleLogin}>
              <img
            </button>
          </div>)
        : (
          (!haveId) 
          ? (<div> <LoginForm/> </div>)
          : (<Link to="/home">Home</Link>)
        )
      } */}
      <div className="login-box">
        <div className="title">
          Fetch Mind
        </div>
        <button className="google-login">
          <img className="google-logo" src="/static/google_logo.png" width="80" />
          <span>Login with Google</span>  
        </button>
      </div>
      {/* <div>
        <button onClick={logout}>logout</button>
      </div> */}

      {/* <div>
        <button onClick={pushUserData}>push</button>
      </div> */}
    </div>
  );
}  
export default Login;
