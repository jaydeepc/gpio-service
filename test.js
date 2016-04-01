var http = require('http');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/status', function(req, res, next) {
    gpioPin = req.query.pin;
    response_dict = {};
    for (i=0; i<gpioPin.length; i++){
        response_dict[gpioPin[i]] = 1;
    }
    res.send(200, response_dict);
});


app.listen(3001);
console.log('App Server running at port 3001');
