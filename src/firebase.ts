import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "housekeeping-simcheolhwan.firebaseapp.com",
  databaseURL: "https://housekeeping-simcheolhwan-default-rtdb.firebaseio.com",
  projectId: "housekeeping-simcheolhwan",
  appId: "1:576097322843:web:53486004a3bdc23cb2fc7e",
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.database()
