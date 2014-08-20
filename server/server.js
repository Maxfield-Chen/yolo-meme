var express = require("express");
var app = express();

app.get("/", function(req,res){
  res.sendfile('./index.html');
});

app.post("/user/add", function(req,res){
  res.send("OK");
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Node server running on port: " + port);
});
