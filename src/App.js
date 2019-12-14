import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Login, Drawingpage, Solve } from './pages';
import './styles/App.css';
import DrawingPage from './pages/Drawingpage';

function App() {
  // const [user, setUser] = useState();
  // firebase.auth().onAuthStateChanged((user) => {
  //   console.log(firebase.auth().currentUser);
  //   if (user) {
  //     setUser(user);
  //   } else {
  //     setUser();
  //   }
  // })
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route path="/home" component={Home} />
      <Route path="/Drawingpage" component={Drawingpage} />
      <Route path="/Solve" component={Solve} />
    </BrowserRouter>
  );
}


export default App;