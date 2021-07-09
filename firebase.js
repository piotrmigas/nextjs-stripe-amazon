import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDXNYQTALwMzeUS96j_OcNDinkzEwEFzEI",
  authDomain: "fir-e4381.firebaseapp.com",
  projectId: "fir-e4381",
  storageBucket: "fir-e4381.appspot.com",
  messagingSenderId: "294430588186",
  appId: "1:294430588186:web:a4d4127b4f61f71f77c0a3",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;
