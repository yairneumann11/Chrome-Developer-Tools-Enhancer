'use strict';
// import './lib/livereload';



function prepareCode(code){
  let newCode = code.split("@@");
  console.log(newCode);
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.run_code ){
      prepareCode(request.run_code);
      // sendResponse({farewell: "goodbye"});
    }

  });


//var observeDOM = (function(){
//  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
//    eventListenerSupported = window.addEventListener;
//
//  return function(obj, callback){
//    if( MutationObserver ){
//      // define a new observer
//      var obs = new MutationObserver(function(mutations, observer){
//        console.log(mutations);
//
//        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
//          callback();
//      });
//      // have the observer observe foo for changes in children
//      obs.observe( obj, { attributes:true, childList:true, subtree:true });
//    }
//    else if( eventListenerSupported ){
//      obj.addEventListener('DOMNodeInserted', callback, false);
//      obj.addEventListener('DOMNodeRemoved', callback, false);
//    }
//  }
//})();
//
//// Observe a specific DOM element:
//observeDOM( document.body ,function(){
//  console.log('dom changed');
//});
