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

const pushUserData = async ({id, name, score}) => {
  const response = await fetch(`${firebaseURL}/users.json`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      score,
    }),
  });
};

const pushImageData = async (id = 'skruddn', maker = 'rlatpdnjs', answer, drawing) => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'POST',
    body: JSON.stringify({
      id: `${id}`,
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
  pushImageData,
  pushUserData,
};
