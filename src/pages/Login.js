import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import firebaseDb from '../firebase.db';
import '../styles/Login.css';


const Login = () => {
  const [haveId, setHaveId] = useState(false);
  const [user, setUser] = useState();
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    checkHaveId();
  }
  const logout = async () => {
    firebase.auth().signOut();
  }
  firebase.auth().onAuthStateChanged((user) => {
    console.log(firebase.auth().currentUser);
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  })
  const pushUserData = async () => {
    firebaseDb.pushUserData({
      id: 'testemail',
      name: 'testname',
      score: 0,
    });
  }
  const checkHaveId = async () => {
    const users = await firebaseDb.getUserData();
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const currentUserId = currentUser.email;
      const usersData = Object.values(users);
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
    <div>
      {
        (!user)
        ? (<div>
            <button onClick={googleLogin}>google</button>
          </div>)
        : (
          (!haveId) 
          ? (<div>로그인폼이 필요</div>)
          : (<Link to="/home">Home</Link>)
        )
      }
      <div>
        <button onClick={logout}>logout</button>
      </div>

      <div>
        <button onClick={pushUserData}>push</button>
      </div>
    </div>
  );
}  
export default Login;
