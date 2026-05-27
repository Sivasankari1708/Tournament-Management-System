
import { initializeApp } from "firebase/app"

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth"

const firebaseConfig = {

  apiKey: "AIzaSyDPd7XP1LawOBdoF15mnT9U02oqw5RblwI",
  authDomain: "tournament-app-a25ec.firebaseapp.com",
  projectId: "tournament-app-a25ec",
  storageBucket: "tournament-app-a25ec.firebasestorage.app",
  messagingSenderId: "389916636935",
  appId: "1:389916636935:web:7823b6c0e1099c69cd37a2",
  measurementId: "G-86GQXFN07S"

}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export {

  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber

}