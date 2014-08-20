var express = require("express");
var app = express();

//serving pages
app.get("/", function(req,res){
  res.sendfile('./server/index.html');
  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort("Com3", {
    baudrate: 9600
  });
  serialPort.on("open", function () {
    console.log('open');
    var dataString = '';
    serialPort.on('data', function(data) {
      dataString+= data;
      if(data.toString().indexOf("\n") > -1){
        console.log('data received: ' + dataString.trim());
        res.write(dataString);
      } else {
        console.log('adding data');
      }
    });
  });
});

app.post("/user/add", function(req,res){
  res.send("OK");
});

//Rfid response code
//Final Server Initialization 
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Node server running on port: " + port);
});
