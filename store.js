import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase";
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

let firebaseConfig = {
  apiKey: "AIzaSyDpQXU2exKpLVi30gpsBK2ekX79wQU5Np0",
  authDomain: "olamai-d64a7.firebaseapp.com",
  databaseURL: "https://olamai-d64a7.firebaseio.com",
  projectId: "olamai-d64a7",
  storageBucket: "olamai-d64a7.appspot.com",
  messagingSenderId: "1045534123345"
};

if (process.env.NODE_ENV == "development") {
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  };
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Check to make sure firebase isn't already initialized
if (!firebase.apps.length) {
  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig);
  // Initialize Cloud Firestore through Firebase
  const firestore = firebase.firestore();
}

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};

export function initializeStore() {
  return createStoreWithFirebase(rootReducer, initialState);
}
