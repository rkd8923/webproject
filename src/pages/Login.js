import React, { useState } from 'react';
import firebase from './firebase';
import '../styles/Login.css';

const Login = (props) => {
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  const logout = async () => {
    firebase.auth().signOut();
  }

  return (
    <div id="login-box">
    </div>
  );
}  
export default Login;