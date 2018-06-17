
var LedControl = require("rpi-led-control");

module.exports = function (RED) {
  function LedController(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    var lc = new LedControl(12,11,6); // data pin, clock pin, cs pin
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


    });
  }
  RED.nodes.registerType("led-controller", LedController);
}