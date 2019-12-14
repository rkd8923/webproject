import React, { useEffect } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import firebaseDb from '../firebase.db';
import '../styles/Login.css';


const Login = () => {
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  const logout = async () => {
    firebase.auth().signOut();
  }
  const pushUserData = async () => {
    firebaseDb.pushUserData({
      id: 'testemail',
      name: 'testname',
      score: 0,
    });
  }

  // useEffect( async () => {
  //   const users = await firebaseDb.getUserData();
  //   const currentUser = firebase.auth().currentUser;
  //   console.log(currentUser.email);
  //     if (currentUser.email) {
  //       if(currentUser.email === users.testUser.id){
  //         //홈
  //       }else{
  //         //유저등록
  //       }
  //     } else {
  //       //로그인필요
  //     }
  // }, [])

  return (
    <div>
      <Link to="/home">Home</Link>
      <div>
        <button onClick={googleLogin}>google</button>
      </div>
    
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
