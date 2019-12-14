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

const pushImageData = async (drawing) => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'POST',
    body: JSON.stringify({
      id: 'dumb621',
      maker: 'dumbdumb',
      answer: 'Picasso',
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
