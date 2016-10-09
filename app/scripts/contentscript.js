'use strict';
import './lib/livereload';

/*
 location.reload()@@1475163823478$$_console.log("yair")@@1475163818058$$_function a(){};@@1475073569399$$_eval("(1 + 2 ) + (3 +4)")@@1475073265325$$_console.log(15)@@1475044343679$$_console.log(14)@@1475044299618$$_1475044269759$$_console.log(13)
 */


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
