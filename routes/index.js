var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var conf = require('./conf').conf;

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    var base64str = base64_encode('kitten.jpg');
    var apiHost = conf.apiUrl;
    request({
        uri: 'http://www.google.com',
        headers: {
            'X-FullContact-APIKey': conf.apiKey,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }, function (error, response, body) {
        if (!error) {
            console.log(response);
        } else {
            console.log(error);
        }
    })

});

router.post('/', function(req, res){
   console.log(req);
    res.statusCode(200);
});


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;
