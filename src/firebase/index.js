/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Initialize Firebase 
const config = {
   apiKey: "AIzaSyCjnYqo0yAXoHHU0uMg6ntspqab_6vh73s",
   authDomain: "bettys-hub.firebaseapp.com",
   databaseURL: "https://bettys-hub.firebaseio.com",
   projectId: "bettys-hub",
   storageBucket: "bettys-hub.appspot.com",
   messagingSenderId: "252479106913",
   appId: "1:252479106913:web:29c2ba453661ae2fb25f20",
   measurementId: "G-F0WLQ9EX31"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();
const storage = firebase.storage();

export {
   auth,
   googleAuthProvider,
   githubAuthProvider,
   facebookAuthProvider,
   twitterAuthProvider,
   database,
   storage
};
