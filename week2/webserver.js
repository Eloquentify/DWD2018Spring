var express = require('express')
var app = express()
var figlet = require('figlet');

app.use(express.static('public')); //'use' status calls middleware express 
//route index.html as a base 
app.get('/', function (req, res) { //slashs are units for express...?!
  res.send('Hello World!')
})

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
		    console.log(data);
		    submissions.push(data);
		});
	});
})

app.get('/display',function(req,res){
	var html = "<html><body><pre>";
	for (var i = 0; i< submissions.length; i++){
		html = html+submissions[i]+"<br>";
	}
	html=html+"</pre></body></html>";
	res.send(html);

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
