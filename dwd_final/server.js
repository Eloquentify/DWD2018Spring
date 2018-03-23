// HTTP Portion
var https = require('https');
var fs = require('fs'); // Using the filesystem module

var credentials = {
  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-serve.pem')
};

var express = require('express');
var osc = require('node-osc');
var client = new osc.Client('127.0.0.1', 9000);
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var json = require('./keys.json');
var fs = require('fs'); // Using the filesystem module
var url = require('url');
var app = module.exports.app = express();
app.use(express.static(__dirname));

function requestHandler(req, res) {

    var parsedUrl = url.parse(req.url);
    console.log("The Request is: " + parsedUrl.pathname);
        
    fs.readFile(__dirname + parsedUrl.pathname, 
        // Callback function for reading
        function (err, data) {
            // if there is an error
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + parsedUrl.pathname);
            }
            // Otherwise, send the data, the contents of the file
            res.writeHead(200);
            res.end(data);
        }
    );
    
    /*
    res.writeHead(200);
    res.end("Life is wonderful");
    */
}


// WebSocket Portion
// WebSockets work with the HTTP server
var httpsServer = https.createServer(credentials, app);
var io = require('socket.io').listen(httpsServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
    // We are given a websocket object in our function
    function (socket) {
    
        console.log("We have a new client: " + socket.id);
        
        // When this user emits, client side: socket.emit('otherevent',some data);
        socket.on('mouse',
            function (data) {
                // Data comes in as whatever was sent, including objects
                console.log("Received: 'mouse' " + data.w + " " + data.h + " " + data.r);
                // Send it to all other clients
                client.send('/word', data.word, function () {});
                socket.broadcast.emit('mouse', data);
            }
        );
        
        
        socket.on('disconnect', function() {
            console.log("Client has disconnected " + socket.id);
        });
    }
);

var textToSpeech = new TextToSpeechV1({
  username: json.username,
  password: json.password,
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

var params = {
    text: 'is that working?',
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/ogg'
  };

textToSpeech
  .synthesize(params, function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    fs.writeFileSync('output.ogg', audio);
    console.log('audio.wav written with a corrected wav header');
});
httpsServer.listen(1337);