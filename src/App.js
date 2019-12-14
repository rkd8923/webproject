import React from 'react';
import './App.css';
import Mainpage from './components/Mainpage'


function App() {
  return (
    <div className="App">
      <Mainpage/>
      {this.props.children}
    </div>
  );
}

export default App;
