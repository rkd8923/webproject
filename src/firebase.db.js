import firebase from './firebase';

const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com';

const getImageData = async () => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

const getUserData = async () => {
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

const getMyData = async (email) => {
  let result;
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'GET',
  });
  const data = await response.json();
  const dataArray = Object.entries(data);
  dataArray.forEach((user) => {
    if (user[1].id === email) {
      result = {
        dbId: user[0],
        myData: user[1],
      };
    }
  });
  return result;
};


const pushUserData = async ({ id, name, score }) => {
  await fetch(`${firebaseURL}/users.json`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      score,
    }),
  });
};

const pushImageData = async (maker, answer, drawing) => {
  await fetch(`${firebaseURL}/paints.json`, {
    method: 'POST',
    body: JSON.stringify({
      maker: `${maker}`,
      answer: `${answer}`,
      starpoint: [],
      image: `${drawing}`,
    }),
  });
};

const pushClearData = async ({ userId, userData }) => {
  firebase.database().ref(`users/${userId}`).set(userData);
};

export default {
  getImageData,
  getUserData,
  getMyData,
  pushImageData,
  pushUserData,
  pushClearData,
};
