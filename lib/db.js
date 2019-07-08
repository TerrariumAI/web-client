import firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDpQXU2exKpLVi30gpsBK2ekX79wQU5Np0",
  authDomain: "olamai-d64a7.firebaseapp.com",
  databaseURL: "https://olamai-d64a7.firebaseio.com",
  projectId: "olamai-d64a7",
  storageBucket: "olamai-d64a7.appspot.com",
  messagingSenderId: "1045534123345",
  appId: "1:1045534123345:web:a319fd1bf081157e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default {
  firebase,
  db: firebase.firestore()
};
