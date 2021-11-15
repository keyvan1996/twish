// this file creates a admin user using the admin user's SDK from firebase
var admin = require("firebase-admin");

var serviceAccount = require("./twish-2dd01-firebase-adminsdk-urfse-9e4d605ca2.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://twish-2dd01-default-rtdb.firebaseio.com"
});

  
admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit()
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
