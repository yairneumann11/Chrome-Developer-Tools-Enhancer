'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Communication from "./communication";
import Events from "./events";
import DOMElements from "./DOMElements";


(function(topWindow, topDocument, GLOBAL, configurations){

  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
  );

  let mainElements = new DOMElements(window);

  console.log(mainElements);

  let pdw = {};

  let DEFAULT_CONFIGURATIONS = {
    "record" : true
  };


  if( !configurations ){

    configurations = DEFAULT_CONFIGURATIONS;
  }

  pdw.configurations = configurations;


  pdw.tabId = chrome.devtools.inspectedWindow.tabId;

  let consoleContainer = topDocument.getElementById('console-prompt');

  // function getInspectedWindowURL(){
  //
  //
  //     return new Promise((resolve, reject) => {
  //
  //       chrome.runtime.sendMessage(
  //         {
  //           devtools_get_url: true,
  //           tab_Id:chrome.devtools.inspectedWindow.tabId
  //         }, (response) =>
  //         {
  //           resolve(response);
  //         });
  //
  //     });
  //
  // }

  // function getCode(url){
  //
  //
  //   return new Promise((resolve, reject) => {
  //
  //     if( url )
  //     {
  //       chrome.storage.sync.get(url, (response)=>{
  //         resolve(response);
  //       });
  //
  //     }else{
  //       chrome.storage.sync.get((response)=>{
  //         resolve(response);
  //       });
  //
  //     }
  //
  //
  //   });
  //
  // }

  // function setUrlCode(url,code, cb){
  //
  //   getCode(url).then((savedCode)=>{
  //     let timestamp = (new Date).getTime();
  //
  //     if( Object.keys(savedCode).length === 0 )
  //     {
  //       code = timestamp + "$$_" + code;
  //
  //     }else{
  //
  //       let newCode = code + "@@" + timestamp + "$$_" + savedCode[url];
  //       code = newCode;
  //     }
  //
  //     let obj = {};
  //     obj[url]= code;
  //     chrome.storage.sync.set(obj, () => {
  //       cb();
  //     });
  //   });
  //
  //   // localStorage.setItem(url, code);
  //
  // }

  // function codeEvalListener(e, code){
  //
  //
  //   if( e.keyCode == 13 )
  //   {
  //
  //
  //     let codeMessages  = topDocument.querySelector('.console-group-messages');
  //     if( codeMessages && codeMessages.children &&  codeMessages.children.length){
  //       let messages = codeMessages.children;
  //       let lstMessage = messages[messages.length - 1];
  //
  //       if( lstMessage.className.indexOf("console-error-level") > -1) throw "unvalid JS";
  //     }
  //
  //     Communication.getTab().then((tab)=>{
  //       console.log(tab.url);
  //       console.log(code);
  //       let tabUrl = tab.url;
  //       if( tab && tab.url && code )
  //       {
  //         setUrlCode(tabUrl, code, ()=>{
  //           console.log("code saved");
  //         });
  //       }
  //     });
  //
  //   }
  // }

  function setEventListener(){
    consoleContainer.addEventListener('keydown', (e)=>{

      let code          = consoleContainer.innerText;

      setTimeout(()=>{
        Events.codeEvalListener(mainElements, e, code);
      },100)
    });
  }

  function removeEventListener(){
    consoleContainer.removeEventListener('keydown', Events.codeEvalListener);
  }



  function runCode(url) {
    Communication.getCode(url).then((code)=>{
      if ( Object.keys(code).length != 0 ){
        try{
        }catch(e){
          alert(e.message)
        }
      } else{
        throw "no code found";
      }

    });


  }

  pdw.startRecording = function(){
    setEventListener();
  };

  pdw.stopRecording = function(){
    removeEventListener();
  };

  function removeTable() {
    let table = document.getElementById("table-container");
    if( table ){
      table.parentNode.removeChild(table);
    }
  }

  function disectCode(code){

  }

  function buildTable(sites_code) {

    removeTable();

    let table_container = document.createElement("div");
    table_container.setAttribute("class", "table-responsive");
    table_container.setAttribute("id", "table-container");

    let table           = document.createElement("table");
    table.setAttribute("class", "code-table table");

    table_container.appendChild(table);

    let tbdy            = document.createElement('tbody');
    let header          = table.createTHead();
    let row             = header.insertRow(0);
    let cellSiteName    = row.insertCell(0);
    let cellSiteCode    = row.insertCell(1);

    cellSiteName.innerText = "Site URL";
    cellSiteCode.innerText = "Site Code";

    table.appendChild(tbdy);

    for( let site in sites_code )
    {
      let siteCodes                 = sites_code[site];
      let site_row                  = tbdy.insertRow();
      let sitesCodeArr              = siteCodes.split("@@");
      let cell_site_name_row        = site_row.insertCell();
      let cell_site_code_row        = site_row.insertCell();
      cell_site_name_row.innerText  = site;
      cell_site_code_row.innerText  = siteCodes.split("@@");



    }


    return table_container;
  }

  function parseCode(code){

  }

  function populateHistory() {
    Communication.getCode().then((code)=>{
      let table = buildTable(code);

      document.querySelector("main").appendChild(table);
    });
  }

  pdw.init = function(){

    alert("init");
    Communication.getTab().then( (tab)=>{
      console.log(tab);
      if(!tab || !tab.url) throw "no tab url";

      if (tab.url.match(/https?:\/\//g)) {

        runCode(tab.url);


        setEventListener();
      }
    } ) ;

  };


  populateHistory();

  document.getElementById("executescript").addEventListener("click", pdw.init);

  chrome.storage.onChanged.addListener((storageUpdate)=>{
    populateHistory();
  });

  // pdw.init();

  GLOBAL.pdw = pdw;

})(window.top, window.top.document, window, {
  "record": true
});



