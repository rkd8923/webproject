import React, { useState, useEffect } from 'react';
import './App.css';
import FirebaseTest from './components/FirebaseTest';
import firebase from './firebase';
import firebaseStorage from './firebase.storage';
// import Mainpage from './components/Mainpage'

function App() {
  const [user, setUser] = useState();

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
    <div className="App">
    </div>
  );
}

export default App;
