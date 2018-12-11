var express = require("express");
var app     = express();
app.use(express.static(__dirname + '/../'));


app.get('/',function(req,res){
    res.sendFile('index.html', { root: '../' });
  //It will find and locate index.html from View or Scripts
});

app.post('/', function (req, res) {
    console.log(req.body);
  });


app.listen(8080);

console.log("Running at Port 8080");