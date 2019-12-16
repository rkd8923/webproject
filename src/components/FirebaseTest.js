import React from 'react';

const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com/';
const FirebaseTest = () => {
  const getData = async () => {
    const response = await fetch(`${firebaseURL}/users.json`, {
      method: 'GET',
    });
    const data = await response.json();
  }
  return (
    <div>
      <button onClick={getData}>Click</button>
    </div>
  );
};

export default FirebaseTest;
