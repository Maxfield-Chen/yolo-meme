var express = require("express");
var app = express();

//serving pages
app.get("/", function(req,res){
  res.sendfile('./index.html');
});

app.post("/user/add", function(req,res){
  res.send("OK");
});

//Rfid response code
var SerialPort = require("serialport").SerialPort
//I'm not so sure about this com1 business, would appreciate review
var serialPort = new SerialPort("/com1", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  serialPort.write("ls\n", function(err, results) {
    console.log('err ' + err);
    console.log('results ' + results);
  });
});

//Final Server Initialization 
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Node server running on port: " + port);
});
