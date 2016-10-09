'use strict';

// Enable chromereload by uncommenting this line:
 import './lib/livereload';





function proxyDevtools(data){
  chrome.runtime.sendMessage(
    data, (response) =>
    {
      console.log(response);
    });
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
console.log(request);
    if( request.target &&  request.target == "devtools")
    {
      proxyDevtools(request);
    }

    if( request.devtools_get_url && request.tab_Id )
    {
      console.log("devtools url");

      chrome.tabs.get(request.tab_Id, (tab)=>{
        try {
          sendResponse(tab);
        }catch (e){
          throw "couldn't stringify the response";
        }

      });
    }

    if( request.code )
    {
      //send code to content script
      chrome.tabs.sendMessage(request.tab_id, "var a = " + request.code, function(response) {
        console.log(response);
      });

      chrome.tabs.executeScript( request.tab_id, {code:JSON.stringify(request.code)}, function(results){ alert(results); } );

      console.log("sent code to BG");
    }

    // keep alive the onMessage because there is an async request inside the onMessage
    return true;

  });


chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});



