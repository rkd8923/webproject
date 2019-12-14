import React from 'react';
import firebase from '../firebase';
import '../styles/Login.css';

const Login = () => {
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  const logout = async () => {
    firebase.auth().signOut();
  }

  return (
    <div>
      <button onClick={googleLogin}>google</button>
    </div>
  );
}  
export default Login;