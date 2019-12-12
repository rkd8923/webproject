import React from 'react';

const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com/';
const FirebaseTest = () => {
  const getData = async () => {
    const response = await fetch(`${firebaseURL}/user.json`, {
      method: 'GET',
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <button onClick={getData}>Click</button>
    </div>
  );
};

export default FirebaseTest;
