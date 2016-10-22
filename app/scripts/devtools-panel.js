'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Communication from "./communication";
// import Storage from "./storage";
// import Events from "./events";
// import DOMElements from "./DOMElements";

import ContentCode from "./ContentCode";
import Loader from "./Loader";
import Storage from "./Storage";
import App from "./App";
import NoCode from "./NoCode";




  function init(){
    Communication.getCode().then((code)=>{
      let hasCode =  Object.keys(code).length;

      if( hasCode ){

        ReactDOM.render(
          <App code={code}/>,
          document.getElementById('app')
        );
      }else{
        ReactDOM.render(
          <NoCode />,
          document.getElementById('app')
        );
      }
    });

  };

  init();



chrome.storage.onChanged.addListener((storageUpdate)=> {
  init(storageUpdate);
});




