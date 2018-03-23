$(function() {
  var audioPlayer =  $('<audio controls autoplay><source src="/output.ogg?noCache=' + Math.floor(Math.random() * 1000000) + '" type="audio/ogg">Your browser does not support the audio element :(</audio>');  
  $('#audioPlayer').html(audioPlayer);
});