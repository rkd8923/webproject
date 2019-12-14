import React, { useState, useEffect } from 'react';
import './App.css';
import FirebaseTest from './components/FirebaseTest';
import firebase from './firebase';
import firebaseStorage from './firebase.storage';
function App() {
  const [user, setUser] = useState();
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  const logout = async () => {
    firebase.auth().signOut();
  }
  firebase.auth().onAuthStateChanged((user) => {
    console.log('test', user);
    if (user) {
      setUser(user);
      console.log('user', user);
    } else {
      setUser();
      console.log('loginX');
    }
  })

  return (
    <div id="App">
      <FirebaseTest />
      <button onClick={googleLogin}>google</button>
    </div>
  );
}

export default App;
