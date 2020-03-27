import firebase from 'firebase'; 

const config = { 
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}; 

/*
const config = { 
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shopr-5e75c.firebaseapp.com",
  databaseURL: "https://shopr-5e75c.firebaseio.com",
  projectId: "shopr-5e75c",
  storageBucket: "gs://shopr-5e75c.appspot.com/",
  messagingSenderId: "549515251185",
  appId: "1:549515251185:web:2d32ef6fcef6188772c850"
}; 
*/

firebase.initializeApp(config); 

export default firebase;