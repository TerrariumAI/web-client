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

const firebaseConfig = {
  apiKey: "AIzaSyBt8vNHODTsGxeN8wU7rpgjmW9O5b0o__k",
  authDomain: "olamaai.firebaseapp.com",
  databaseURL: "https://olamaai.firebaseio.com",
  projectId: "olamaai",
  storageBucket: "olamaai.appspot.com",
  messagingSenderId: "193693743424"
};

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
