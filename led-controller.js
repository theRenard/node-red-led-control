var LedControl = require("./core.js");

module.exports = function (RED) {
  function LedController(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var lc = new LedControl();
    // lc.setBrightness(0,15);

    node.on('input', function (msg) {

      lc.setLed(0,1,1,0);

      lc.emitter.on('update', function ({
        dataPin,
        clkPin,
        csPin
      }) {
        node.send([{
          payload: dataPin
        }, {
          payload: csPin
        }, {
          payload: clkPin
        }]);
      })
    });
  }
  RED.nodes.registerType("led-controller", LedController);
}