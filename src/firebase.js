import firebase from "firebase";
import key from "./key/Keys";

//provide your own Firebase SDK Snippet > Config into the function
const firebaseApp = firebase.initializeApp(key.getFirebaseKey());

const db = firebaseApp.firestore();

export default db;
