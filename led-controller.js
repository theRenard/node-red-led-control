
var LedControl = require("rpi-led-control");
var displayText = require("./display-text");

var text = 'hello darling';
var delay = 1000;
var display = new LedControl(12,11,6); // data pin, clock pin, cs pin

module.exports = function (RED) {
  function LedController(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    display.setBrightness(0,15);

    node.on('input', function (msg) {

      displayText(text, delay, display);

    });
  }
  RED.nodes.registerType("led-controller", LedController);
}