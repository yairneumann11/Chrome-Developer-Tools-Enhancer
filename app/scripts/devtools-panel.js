'use strict';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import Communication from "./common/communication";
import App from "./components/App";
import NoCode from "./components/NoCode";



// store.subscribe(()=>{
//   console.log("store changed", store.getState())
// });
//
// store.dispatch({
//   type:"FETCH_USERS",
//   payload: axios.get("http://rest.learncode.academy/api/wstern/users")
// });



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
      <Provider store={store}>
        <App code={code} selectedSite={site} setSelectedSite={setSelectedSite}/>
      </Provider>,
      document.getElementById('app')
    );
  }

  function init(storageUpdate){
    console.log("init")
    Communication.getCode().then((code)=>{
      let hasCode =  Object.keys(code).length;

      if( hasCode ){

        site = getSelectedSite(storageUpdate, code);

        renderApp(code, site);

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




