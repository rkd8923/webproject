import React, { useState, useEffect } from 'react';
import FirebaseTest from './components/FirebaseTest';
import firebase from './firebase';
import firebaseStorage from './firebase.storage';
import './styles/App.css';

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
    <div>
      <span>TEST</span>
    </div>
  );
}


export default App;