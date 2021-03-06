var express=require("express");
var app=express();
var request = require('request');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


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
		 var mydatap=data["paid"];
		  var mydataf=data["free"];
		  //for removing exact duplicate entries
		  data["paid"]=Array.from(new Set(mydatap.map(JSON.stringify))).map(JSON.parse);
		  data["free"]=Array.from(new Set(mydataf.map(JSON.stringify))).map(JSON.parse);
		  
		  //for removing semantic duplicates
		  data["paid"].sort( function( a, b){ return a.conference_id - b.conference_id; } );
for( var i=0; i<data["paid"].length-1; i++ ) {
  if ( data["paid"][i].conference_id == data["paid"][i+1].conference_id ) {
    delete data["paid"][i];
  }
}
		  
		  
		  data["free"].sort( function( a, b){ return a.conference_id - b.conference_id; } );
for( var i=0; i<data["free"].length-1; i++ ) {
  if ( data["free"][i].conference_id == data["free"][i+1].conference_id ) {
    delete data["free"][i];
  }
}
		  
		  res.render("index",{datap:data["paid"],dataf:data["free"]});
		  
	  }
	  
  }
});
});



app.listen(process.env.PORT|| 3000, process.env.IP,function(){
	console.log("server has started running");
});