import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbeCmf6WunZlVLx03YDlM9XKZp8GTMdfk",
  authDomain: "royal-fashion-f2034.firebaseapp.com",
  projectId: "royal-fashion-f2034",
  storageBucket: "royal-fashion-f2034.appspot.com",
  messagingSenderId: "246179221231",
  appId: "1:246179221231:web:e620d93d218cc41aff151a",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Google Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  propt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userShapshot = await getDoc(userDocRef);

  // if user data exists

  if (!userShapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`error creating the user `, error.message);
    }
  }
  return userDocRef;
};
