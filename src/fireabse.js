
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAb296vw9JBKUr9dIU04LouEait5-BqoOQ",
    authDomain: "photo-tagging-67bc5.firebaseapp.com",
    projectId: "photo-tagging-67bc5",
    storageBucket: "photo-tagging-67bc5.appspot.com",
    messagingSenderId: "952067521161",
    appId: "1:952067521161:web:bf6200a0a656946dc2a458"
  };

firebase.initializeApp(firebaseConfig);
//const db=firebaseApp.fireStore()
const auth=firebase.auth()

export { auth}

