import * as firebase from 'firebase';
import 'firebase/storage';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);
export default firebase;