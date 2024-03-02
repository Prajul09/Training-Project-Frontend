import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv1XGwbGZeTOKeTAV9NQi9JbUXlHSjZhE",
  authDomain: "flutter-training-93ad2.firebaseapp.com",
  databaseURL: "https://flutter-training-93ad2-default-rtdb.firebaseio.com",
  projectId: "flutter-training-93ad2",
  storageBucket: "flutter-training-93ad2.appspot.com",
  messagingSenderId: "592205274776",
  appId: "1:592205274776:web:3bcbdee4f7d0dafef77aed",
  measurementId: "G-217TV6T4VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);
export{imgDB}