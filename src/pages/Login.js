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
    const users = await firebaseDb.getUserData();
    const currentUser = firebase.auth().currentUser;
    console.log(currentUser.email);
      // if (currentUser) {
      //   if(currentUser.email === users.testUser.id){
      //       //홈
      //   }else{
          
      //   }
      // } else {
      //   // No user is signed in.
      // }
  }, [])

  return (
    <div>
      <div>
        <button onClick={googleLogin}>google</button>
      </div>
    
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}  
export default Login;
