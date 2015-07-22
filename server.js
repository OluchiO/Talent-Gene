var express = require("express");
var session = require("express-session");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var request = require('request');
var port = 5000;

var passport = require("passport");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");


//use passport
require("./config/passport")(passport);
 


//Middleware

app.use(bodyParser());
app.use(cors());
app.use(express.static(__dirname + "/public"));


// required for passport
app.use(session({
    secret: "XXXXXXX"
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//endpoints 
app.post('/signup', passport.authenticate('local-signup', {}),
    function(req, res) {
        return res.status(200).json(req.user);
    });
//There is no login path available
app.post('/login', passport.authenticate('local-login', {}),
    function(req, res) {
        return res.status(200).json(req.user);
    });


app.post('/connect/finish', function(req, res) {
    var sessionTokenObject = req.body;
    // grab client secret from app settings page and `sign` `sessionTokenObject` with it.
    sessionTokenObject.clientSecret = 'YOUR-CLIENT-SECRET-FROM-HUMAN-API-HERE';

    request({
        method: 'POST',
        uri: 'https://user.humanapi.co/v1/connect/tokens',
        json: sessionTokenObject
    }, function(err, resp, body) {
        if (err) return res.send(422);
        // at this point if request was successfull body object
        // will have `accessToken`, `publicToken` and `humanId` associated in it.
        // You probably want to store these fields in your system in association to user's data.
        res.send(201, body);
    });


});

app.get('/connect/demo', function(req, res) {

    var headers = {
        'Authorization': 'Bearer ' + 'demo', //replace 'demo' with accessToken
        'Accept': 'application/json'
    };
    var url = 'https://api.humanapi.co/v1/human/genetic/traits?access_token=demo&source=23andme&limit=20'


    request({
        method: 'GET',
        uri: url,
        headers: headers
    }, function(err, resp, body) {
        var parsedResponse;
        if (err) return res.send(422);
        parsedResponse = JSON.parse(body);
        console.log(parsedResponse);
        res.send(parsedResponse);
    });


});





//MongoDB 
var mongooseUri = 'mongodb://localhost/genesApp';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected to your soul on:', mongooseUri);
})



//port
app.listen(port, function() {
    console.log('Using the port:', port);
})

//function

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
