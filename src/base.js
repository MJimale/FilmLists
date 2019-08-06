import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/database';
import 'firebase/firestore';

// Initialize Firebase
var firebaseConfig = {
	apiKey: 'AIzaSyCo4bGMp7ej8A58ZkFVN6GuB-U_Uswk9_Q',
	authDomain: 'movielist-791a5.firebaseapp.com',
	databaseURL: 'https://movielist-791a5.firebaseio.com',
	projectId: 'movielist-791a5',
	storageBucket: 'movielist-791a5.appspot.com',
	messagingSenderId: '998063629028',
	appId: '1:998063629028:web:5f96cf3c3bc119e8'
};
//Env not need. Need to tighten up firebase security rules
/*const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
}; 


*/
const app = firebase.initializeApp(firebaseConfig);

export default app;
