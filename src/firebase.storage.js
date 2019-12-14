import firebase from './firebase';
//다운로드.jpg
const storage = firebase.storage();
const getImageUrl = async (fileName) => {
  const response = storage.ref().child(`images/${fileName}`).getDownloadURL();
  return response;
}
export default {
  getImageUrl,
}