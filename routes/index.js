var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var conf = require('../conf').conf;
var db = require('../firebaseConnector').db;
const util = require('util');


router.post('/firebase', function(req, res){
    var ref = db.ref("server/data");
    var vCardRef = ref.child("vCards");
    var newVCardRef = vCardRef.push(req.body);
    var vCardId = newVCardRef.key;
    res.send(vCardId);
});

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    var base64str = base64_encode('businesscard1.jpeg');
    console.log(conf.apiUrl);
    request({
        uri: conf.apiUrl,
        headers: {
            'X-FullContact-APIKey': conf.apiKey,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: { 'front': base64str }
    }, function (error, response, body) {
        if (!error) {
            console.log(body);
            console.log(response);
            res.send(JSON.stringify(body))
        } else {
            console.log(error);
            res.send(error)
        }
    })

});

router.post('/webhook', function(req, res){
    var vCardId = req.body.id;
    if (vCardId){
        var ref = db.ref("server/data");
        var vCardRef = ref.child("vCards").set(req.body);
        console.log(vCardId);
    } else {
        console.log(req.body);
    }
    res.status(200);
    res.send('ok');
});


function base64_encode(file) {
    file = __dirname + '/' + file;
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
