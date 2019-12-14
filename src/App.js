import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      console.log('user', user);
    } else {
      setUser();
    }
  })

  return (
    <div>
      <span>TEST</span>
      <Login />
    </div>
  );
}


export default App;