const firebaseURL = 'https://fetchmind-6f8d6.firebaseio.com';

const getImageData = async () => {
  const response = await fetch(`${firebaseURL}/paints.json`, {
    method: 'GET',
  });
  const data = await response.json();
  return data; 
}
export default {
  getImageData,
}