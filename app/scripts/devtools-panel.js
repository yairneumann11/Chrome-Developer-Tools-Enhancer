'use strict';
import React from "react";
import Provider from "react-redux";
// import store from "./store";
import ReactDOM from "react-dom";
import Communication from "./common/communication";

import App from "./components/App";
import NoCode from "./components/NoCode";


let site;

  function getSelectedSite(storageUpdate, code){

    if(typeof storageUpdate === "string" ) return storageUpdate;

    if( storageUpdate && Object.keys(storageUpdate).length ){
      return Object.keys(storageUpdate)[0]
    }else{
      return Object.keys(code)[0]
    }
  }

  function setSelectedSite(site){
    init(site);
  }

  function renderApp(code, site){
    ReactDOM.render(
      <App code={code} selectedSite={site} setSelectedSite={setSelectedSite}/>,
      document.getElementById('app')
    );
  }

  function init(storageUpdate){
    Communication.getCode().then((code)=>{
      let hasCode =  Object.keys(code).length;

      if( hasCode ){

        site = getSelectedSite(storageUpdate, code);

        renderApp(code, site);
        // ReactDOM.render(
        //   <App code={code} selectedSite={site} setSelectedSite={setSelectedSite}/>,
        //   document.getElementById('app')
        // );
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




