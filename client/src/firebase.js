import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDALqqpyyu7suA080B1jeEZQYri4cbw9YY",
  authDomain: "webapp-clone-89754.firebaseapp.com",
  projectId: "webapp-clone-89754",
  storageBucket: "webapp-clone-89754.appspot.com",
  messagingSenderId: "583347991536",
  appId: "1:583347991536:web:d6071de29491f260c3a335",
  measurementId: "G-4P13VL2G50",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
