var express=require("express");
var app=express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static("/public"));


app.get("/", function(req, res){
	res.redirect("/task");
});

app.get("/task", function(req, res){
	request('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences', function (error, response, body) {
  if(error){
	  console.log("something went wrong");
	  console.log(error);
  }else{
	  if(response.statusCode ==200){
		 var data= JSON.parse(body);
		  //res.send(parseddata["paid"][0]["city"]);
		  res.render("index",{data:data});
	  }
	  
  }
});
});



app.listen(process.env.PORT|| 3000, process.env.IP,function(){
	console.log("server has started running");
});