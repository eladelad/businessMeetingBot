/**
 * Created by elad on 25/02/2017.
 */
var admin = require("firebase-admin");
var conf = require("./conf").conf;

var serviceAccount = require("./admin-sdk-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: conf.firebaseUrl
});

var db = admin.database();
exports.db = db;