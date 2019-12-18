import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Login, Drawingpage, Solve, Evaluation } from './pages';
import firebase from './firebase';
import './styles/App.css';

const App = () => {
  const [user, setUser] = useState();
  firebase.auth().onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
    } else {
      setUser();
    }
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/"><Login user={user} /></Route>
        <Route path="/home">
          <Home user={user} />
        </Route>
        <Route path="/Drawingpage"><Drawingpage user={user} /></Route>
        <Route path="/Solve"><Solve user={user} /></Route>
        <Route path="/Evaluation"><Evaluation user={user} /></Route>
      </Switch>
    </Router>
  );
}


export default App;