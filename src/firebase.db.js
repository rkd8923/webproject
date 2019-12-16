const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com';

const getImageData = async () => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'GET',
  });
  const data = await response.json();
  return data; 
}

const getUserData = async () => {
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'GET',
  });
  const data= await response.json();
  return data;
}

const getMyData = async (email) => {
  let result;
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'GET',
  });
  const data= await response.json();
  const dataArray = Object.values(data);
  dataArray.forEach((user) => {
    if (user.id === email) {
      result = user;
    }
  });
  return result;
}


const pushUserData = async ({ id, name, score }) => {
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      score,
    }),
  });
};

const pushImageData = async (maker = 'rlatpdnjs', answer, drawing) => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'POST',
    body: JSON.stringify({
      maker: `${maker}`,
      answer: `${answer}`,
      starpoint: [],
      image: `${drawing}`,
    }),
  });
};

export default {
  getImageData,
  getUserData,
  getMyData,
  pushImageData,
  pushUserData,
};
