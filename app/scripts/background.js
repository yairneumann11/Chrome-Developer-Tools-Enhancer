'use strict';

// Enable chromereload by uncommenting this line:
// import './lib/livereload';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');


try
{
  chrome.webRequest.onBeforeRequest.addListener(function(e){
    chrome.runtime.reload()
  },{urls: ["http://*/*", "https://*/*"]}, ["blocking"]) ;
}
catch (ErrorMessage)
{
  alert('page:'+ErrorMessage) ;
}

