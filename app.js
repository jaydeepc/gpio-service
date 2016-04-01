var http = require('http');
var express = require('express');
var app = express();

var gpio = require("pi-gpio");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/on/:pin', function(req, res, next) {
  gpioPin = req.params.pin;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
    gpio.write(gpioPin, 1, function() {
      console.log('Pin '+ gpioPin +' is now HIGH.');
	res.send(200, {"status": "on"});
    });
  });
});

app.get('/off/:pin', function(req, res, next) {
  gpioPin = req.params.pin;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
		gpio.write(gpioPin, 0, function() {
			console.log('Pin '+ gpioPin +' is now LOW.');
			res.send(200, {"status": "off"});
		});
  });
});

app.get('/status', function(req, res, next) {
    gpioPin = req.query.pin;
    response_dict = {};
    for (i=0; i<gpioPin.length; i++){
        gpio.open(gpioPin, "output", function(err) {
		    gpio.read(gpioPin, function() {
			    console.log('Pin '+ gpioPin +' is.' + value);
			    response_dict[gpioPin[i]] = value;
		    });
        });
    }
    res.send(200, response_dict);
  });


app.get('/blink/:pin/:time', function(req, res) {
	gpioPin = req.params.pin;
	time = req.params.time;
	gpio.close(gpioPin);
  gpio.open(gpioPin, "output", function(err) {
    gpio.write(gpioPin, 1, function() {
      console.log('Pin '+ gpioPin +' is now HIGH.');
    });
    setTimeout(function() {
      gpio.write(gpioPin, 0, function() {
        console.log('Pin '+ gpioPin +' is now LOW.');
				res.sendStatus(200);
        gpio.close(gpioPin);
      });
    }, time);
  });
});

app.listen(3001);
console.log('App Server running at port 3001');
