import React, { useEffect } from 'react';
import firebase from '../firebase';
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
  useEffect( async () => {
    const test = await firebaseDb.getUserData();
    if (!users.id){

    }
    console.log('login test ' , test);
  }, [])

  return (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
}  
export default Login;
