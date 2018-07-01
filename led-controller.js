
var LedControl = require("rpi-led-control");
var displayText = require("./display-text");


module.exports = function (RED) {
  function LedController(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var brightness = config.brightness; // ex: 15
    var delay = config.delay; // ex: 500
    var dataPin = config.dataPin; // ex: 12
    var clockPin = config.clockPin; // ex: 11
    var csPin = config.csPin; // ex: 6

    var display = new LedControl(dataPin, clockPin, csPin); // data pin, clock pin, cs pin
    display.setBrightness(0,brightness);

    node.on('input', function (msg) {

      console.log(config);
      displayText(msg.payload, delay, display, function() {
        node.send(msg);
      });

    });
  }
  RED.nodes.registerType("led-controller", LedController);
}