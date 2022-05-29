const  { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadString, uploadBytes, getDownloadURL } = require('firebase/storage');
const config = require('./index');

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports =  { storage, ref, uploadString, uploadBytes, getDownloadURL };
