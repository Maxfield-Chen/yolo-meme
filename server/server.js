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
      //res.send(dataString);
    } else {
      console.log('adding data');
    }
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
