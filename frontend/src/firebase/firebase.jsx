// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDci7UoLsPN29TphqmSszEljI4RTW5KT54",
  authDomain: "boalpacar-sl.firebaseapp.com",
  projectId: "boalpacar-sl",
  storageBucket: "boalpacar-sl.appspot.com",
  messagingSenderId: "465181943676",
  appId: "1:465181943676:web:533a5ed0ece28a9d1466f9",
  measurementId: "G-TX36S5D8BB",
};

const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth
const auth = getAuth(app);

// Exportar Auth y Google Provider para su uso en otros componentes
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };