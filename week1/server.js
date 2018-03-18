// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var url = require('url');
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080); //not stand, its a experimental port num

function requestHandler(req, res) { //request from the client, response

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname); //everything after the host url
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200); //means successful standardized 
			res.end(data);
  		}
  	);
  	
  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}