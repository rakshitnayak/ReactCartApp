import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQniJEd2adyvSGo6Cwoyz0OE2t95sdejc",
  authDomain: "cart-af616.firebaseapp.com",
  projectId: "cart-af616",
  storageBucket: "cart-af616.appspot.com",
  messagingSenderId: "1062482533747",
  appId: "1:1062482533747:web:b770103db9ba466510b906",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
