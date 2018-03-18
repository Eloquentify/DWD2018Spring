var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speechToText = new SpeechToTextV1({
  username: "9f2b9e90-a80b-4103-8ab7-d533b6387b7d",
  password: "nV0vQwhClFQw",
  url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});

var params = {
  // From file
  // audio: fs.createReadStream('./resources/speech.wav'),
  // content_type: 'audio/l16; rate=44100'
  audio: fs.createReadStream('./resources/speech.wav')
  .pipe(speechToText.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'))
};

speechToText.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});

// or streaming
fs.createReadStream('./resources/speech.wav')
  .pipe(speechToText.createRecognizeStream({ content_type: 'audio/l16; rate=44100' }))
  .pipe(fs.createWriteStream('./transcription.txt'));