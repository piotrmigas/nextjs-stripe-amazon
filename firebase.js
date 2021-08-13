import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXNYQTALwMzeUS96j_OcNDinkzEwEFzEI",
  authDomain: "fir-e4381.firebaseapp.com",
  projectId: "fir-e4381",
  storageBucket: "fir-e4381.appspot.com",
  messagingSenderId: "294430588186",
  appId: "1:294430588186:web:a4d4127b4f61f71f77c0a3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
