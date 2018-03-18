var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-serve.pem')
};
var multer = require('multer')
var upload = multer({dest:'public/uploads/'})
var $ = require('./jquery-3.3.1.js');
var express = require('express')
var app = express()
var figlet = require('figlet');
var mongojs = require('mongojs');
var config = require('./config.js');
var db = mongojs(config.username+":"+config.password+"@ds046367.mlab.com:46367/dwdonline2018", ["submissions"]);

var db_weather = mongojs(config.username+":"+config.password+"@ds046367.mlab.com:46367/dwdonline2018", ["weather"]);


app.use(express.static('public')); //'use' status calls middleware express 
//route index.html as a base 
app.set('view engine','ejs');


app.get('/templatetest', function(req, res) {
	var data = {person: {name: "Shawn", other: "blah"}};
    res.render('template.ejs', data);
});



var count =0;
var submissions = [];
var font_ran// = Math.floor(Math.random() *287);
var width = ["default", "full", "fitted", "controlled smushing", "universal smushing"];
var width_ran;
app.get('/somethingelse',function(req,res){
	count++;
	res.send('<html><body><h1>somethingelse'+count+'</h1></body></html>')
})

app.get('/formpost',function(req,res){
	font_ran = Math.floor(Math.random() *287);
	width_ran = Math.floor(Math.random() *5);
	//console.dir(font_ran);
	//console.log("They submitted: "+req.query.textfield);
	res.send("You submitted: "+req.query.textfield);
	// db.submissions.save({"keyword":"this is a test"},
	// 	function(err, saved) {
	// 	  if( err || !saved ) console.log("Not saved");
	// 	  else console.log("Saved");
	// });	
		
	//submissions.push(req.query.textfield);
	figlet.fonts(function(err, fonts) {
    if (err) {
        console.log('something went wrong...');
        console.dir(err);
        return;
    }
    //var leg = fonts.length;//287
		figlet.text(req.query.textfield, {
		    font: fonts[font_ran],
		    horizontalLayout: width[width_ran],
		    verticalLayout: 'default'
		}, function(err, data) {
		    if (err) {
		        console.log('Something went wrong...');
		        console.dir(err);
		        return;
		    }
		    
		    db.submissions.save({"keyword":req.query.textfield, "font":font_ran, "width":width_ran, "ASCII":data},
				function(err, saved) {
				  if( err || !saved ) console.log("Not saved");
				  else console.log("Saved");
			});	
			console.log(data);
		    submissions.push(data);
		    	
		});
	});
})

app.get('/display',function(req,res){
	db.submissions.find({}, function(err, saved) {
	  if (err || !saved) {
	  	console.log("No results");
	  }
	  else {
	  	saved.forEach(function(record) {
	    	console.log(record);
	  	});
		res.render('display.ejs', {thedata:saved});
	  }
	});	
})

var weather = [];
app.get('/ajax',function(req,res){
	$.ajax({
		  	url: "http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=metric",
		  	data: {}, success: function( result ) {
			  	//$('#result').html("The temp in NYC is: " + result.main.temp);
			  	db_weather.weather.save({"city":result.main.temp}, function(err, saved) {
				    if( err || !saved ) console.log("Not saved");
				    else {
				  	    console.log("Saved :");
				  	    console.log(result.main.temp+"\n");
				  	    weather.push();
				    }
				    res.render('ajax.ejs', {thedata:saved});

					});	
				},
				error: function(err) {
				  	alert(err);
				}
		});		
	// db_weather.weather.find({}, function(err, saved) {
	//   if (err || !saved) {
	//   	console.log("No results");
	//   }
	//   else {
	//   	saved.forEach(function(record) {
	//     	console.log(record);
	//   	});
	// 	res.send(saved);
	//   }
	// });	
})

app.post('/upload', upload.single('thefile'),function(req,res){
	console.log(req.file);
	res.send("uploaded: " + req.file);
	// req.file is the uploaded file information
  	// req.body will hold the other text fields
});
// app.listen(3000, function () { ///////////////////THIS PART IS REDUNDANT
//   console.log('Example app listening on port 3000!')
// })


var httpsServer = https.createServer(credentials, app);

//Default HTTPS Port
httpsServer.listen(1337);

