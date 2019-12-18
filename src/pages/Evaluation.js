import React, { useState, useEffect, useCallback } from 'react';
import { database } from 'firebase';
import firebaseDb from '../firebase.db.js';
import '../styles/Evaluation.css';

function Evaluation() {
  const [starpoint, setStarpoint] = useState();
  const prob = localStorage.getItem('problem');
    console.log(prob);
  return (
    <div id="evaluation">
      <form>
        <label>
          5
          <input name="reservation['tos']" type="radio" value="5" onClick={(e) => setStarpoint(e.target.value)} />
        </label>
        <br />
        <label>
          4
          <input name="reservation['tos']" type="radio" value="4" onClick={(e) => setStarpoint(e.target.value)} />
        </label>
        <br />
        <label>
          3
          <input name="reservation['tos']" type="radio" value="3" onClick={(e) => setStarpoint(e.target.value)} />
        </label>
        <br />
        <label>
          2
          <input name="reservation['tos']" type="radio" value="2" onClick={(e) => setStarpoint(e.target.value)} />
        </label>
        <br />
        <label>
          1
          <input name="reservation['tos']" type="radio" value="1" onClick={(e) => setStarpoint(e.target.value)} />
        </label>
        <input type="submit" />
      </form>
      {`${starpoint}`}
    </div>
  );
}

export default Evaluation;
