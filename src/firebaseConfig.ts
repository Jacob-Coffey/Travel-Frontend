import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD6ZV3G1LJJ2iVRs1NNNlTJbwA7c50lcZA",
    authDomain: "final-d9541.firebaseapp.com",
    projectId: "final-d9541",
    storageBucket: "final-d9541.appspot.com",
    messagingSenderId: "353113159065",
    appId: "1:353113159065:web:e88c278f84d39a1d90cf08",
    measurementId: "G-ZW72ZK262J"
  };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void{
    signInWithPopup(auth, authProvider);
}

export function signOut(): void{
    auth.signOut();
}
