const firebase = require("firebase");

var config = {
  apiKey: "AIzaSyBIG6hlZT8NYMQwQfAxVJ-VQ1VZkwm1cQk",
  authDomain: "thuexequytam-firebase.firebaseapp.com",
  databaseURL: "https://thuexequytam-firebase.firebaseio.com",
  projectId: "thuexequytam-firebase",
  messagingSenderId: "82777450298"
};

firebase.initializeApp(config);
const Db = firebase.firestore();
Db.settings({ timestampsInSnapshots: true });

module.exports = Db;
