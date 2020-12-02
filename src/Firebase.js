import firebase from 'firebase/app'
// import * as firebase from 'firebase';
import firestore from 'firebase/firestore';



const settings = {timestampsInSnapshots: true};

var firebaseConfig = {
    apiKey: "AIzaSyCIuEliZWxiPOWBWzrDPQ4LMA-B4YqG-bU",
    authDomain: "rain-assignment.firebaseapp.com",
    databaseURL: "https://rain-assignment.firebaseio.com",
    projectId: "rain-assignment",
    storageBucket: "rain-assignment.appspot.com",
    messagingSenderId: "123387719929",
    appId: "1:123387719929:web:491ad6c433a400f20ff228",
    measurementId: "G-Q1LF1SN161"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;