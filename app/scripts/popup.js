'use strict';

console.log('\'Allo \'Allo! Popup');

/*
 communication with contentscript
 */
var port = chrome.runtime.connect(
  {name: "popup"}
);

port.onMessage.addListener(function(msg) {
  console.log(msg);
});



function startRecording(){

  chrome.runtime.sendMessage(
    {
      target: "devtools",
      start_recording:"start"
    }, (response) =>
    {
      console.log(response);
    });
  

}

document.getElementById("start_recording").addEventListener("click",startRecording);

function stopRecording(){

  chrome.runtime.sendMessage(
    {
      start_recording:"stop"
    }, (response) =>
    {
      console.log(response);
    });

}
