import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDXHm8Ix9RP6bYa8Gk7rrWAtXa9bb_mHEQ',
    authDomain: 'demofirebase-9cd99.firebaseapp.com',
    projectId: 'demofirebase-9cd99',
    storageBucket: 'demofirebase-9cd99.appspot.com',
    messagingSenderId: '406107945378',
    appId: '1:406107945378:web:cbb17130269b723f89dafb',
    measurementId: 'G-KRX9MFP0YM',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
