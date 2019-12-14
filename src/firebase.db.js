const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com/';

const getImageData = async () => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

const pushImageData = async (drawing) => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'POST',
    header:
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
  pushImageData,
};
