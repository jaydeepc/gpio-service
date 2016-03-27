var express = require('express');
var bodyParser = require('body-parser');
var gpio = require('pi-gpio');

var app = express();
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.get('/:pin', function(req, res){
  var pin = req.params.pin;

  gpio.open(pin, 'input', function(err) {
    gpio.read(pin, function(err, value) {
      res.send(200, {value: value});
      gpio.close(pin);
    });
  });
});

app.put('/:pin', function(req, res) {
  var pin = req.params.pin;
  var value = req.body.value;

  gpio.open(pin, 'output', function(err) {
    gpio.write(pin, value, function(err) {
      res.send(200);
      gpio.close(pin);
    });
  });
});

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});


