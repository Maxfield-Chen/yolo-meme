var express = require("express");
var app = express();
var cardId = null;

app.use(express.static(__dirname + '/'));

//serving pages
app.get("/", function(req,res){
  res.sendfile('./server/index.html');
});

app.post("/status", function(req,res){
  console.log(cardId);
  res.end(cardId);
});

//Rfid response code
  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort("Com3", {
    baudrate: 9600
  });

  serialPort.on("open", function () {
    console.log('Rfid Card Reader Connected ');
    var dataString = '';
    serialPort.on('data', function(data) {
      dataString+= data;
      if(data.toString().indexOf("\n") > -1){
        console.log('data received: ' + dataString.trim());
        cardId = dataString.trim();
        dataString = '';
      } else {
        console.log('adding data');
      }
    });
  });
//Final Server Initialization 
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Node server running on port: " + port);
});
