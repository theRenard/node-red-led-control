var LedControl = require("./core.js");

module.exports = function (RED) {
  function LedController(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var lc = new LedControl();
    lc.setBrightness(0,15);

    node.on('input', function (msg) {


      var d1 = {x : 0, y:0, xvel:1, yvel :1};
      var d2 = {x : 0, y:0, xvel:1, yvel :1};

      var  startTime = Date.now();
      setInterval(loop, 10);

      function loop() {
        with(d1) {
          lc.setLed(0,x,y,0);
          lc.setLed(0,7-x,7-y,0);

          x+=xvel;

          if((x==8)||(x==-1)) {
            x-=xvel;
            xvel*=-1;
            y+=yvel;
            if((y==7)||(y==0)) yvel*=-1;
          }

          lc.setLed(0,x,y,1);
          lc.setLed(0,7-x,7-y,1);
        }
      }

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