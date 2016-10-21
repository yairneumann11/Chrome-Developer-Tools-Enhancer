'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import DOMElements from "./DOMElements";
import NoCode from "./NoCode";
import ContentCode from "./ContentCode";
import Loader from "./Loader";

class App extends React.Component {

  constructor(props){
    super(props);
    console.log(this);


    this.toggleLoader = this.toggleLoader.bind(this);

    chrome.storage.onChanged.addListener((storageUpdate)=> {
      this.update(storageUpdate);
    });

  }
  setStartingState() {
    console.log("componentDidMount");
    if( this.props.code && Object.keys(this.props.code).length )
    {
      this.setState(
        {
          hasCode:true,
          loaded: false
        }
      );
    }else{
      this.setState(
        {
          hasCode:false,
          loaded: true
        }
      );
      console.log("no code");
    }
  }
  componentWillMount(){
    this.setStartingState();
  }
  update() {

    Communication.getCode().then((code)=> {
      if( Object.keys(code).length )
      {
        this.setState({hasCode:true});
        console.log(code);

        // this.code = code;
      }else{
        this.setState({hasCode:false});
        console.log(code);
      }

      ReactDOM.render(
        <App code={code} />,
        document.getElementById('app')
      );

    })
  }

  toggleLoader(){
    this.setState(
      {loaded: true}
    )
  }

  render() {

    return (
      <div className="container-fluid">
        { this.state.loaded ? null: <Loader /> }
        {this.state.hasCode ?
          <ContentCode code={this.props.code} selectedSite="" componentLoaded={this.toggleLoader} /> : <NoCode/>}
      </div>
    );
  }
}

Communication.getCode().then((code)=>{
  ReactDOM.render(
    <App code={code}/>,
    document.getElementById('app')
  );
});

// (function (topWindow, topDocument, GLOBAL, configurations) {
//
//
//
//
//
//
//   // let mainElements = new DOMElements(window);
//   //
//   // console.log(mainElements);
//   //
//   // let pdw = {};
//   //
//   // let DEFAULT_CONFIGURATIONS = {
//   //   "record": true
//   // };
//   //
//   //
//   // if (!configurations) {
//   //
//   //   configurations = DEFAULT_CONFIGURATIONS;
//   // }
//   //
//   // pdw.configurations = configurations;
//   //
//   //
//   // pdw.tabId = chrome.devtools.inspectedWindow.tabId;
//   //
//   //
//   // function runCode(url) {
//   //   Communication.getCode(url).then((code)=> {
//   //     if (Object.keys(code).length != 0) {
//   //       try {
//   //       } catch (e) {
//   //         alert(e.message)
//   //       }
//   //     } else {
//   //       throw "no code found";
//   //     }
//   //
//   //   });
//   //
//   //
//   // }
//   //
//   // pdw.startRecording = function () {
//   //   setEventListener();
//   // };
//   //
//   // pdw.stopRecording = function () {
//   //   removeEventListener();
//   // };
//   //
//   // function removeTable() {
//   //   let table = document.getElementById("table-container");
//   //   if (table) {
//   //     table.parentNode.removeChild(table);
//   //   }
//   // }
//   //
//   // function disectCode(code) {
//   //
//   // }
//   //
//   // function buildTable(sites_code) {
//   //
//   //   removeTable();
//   //
//   //   let table_container = document.createElement("div");
//   //   table_container.setAttribute("class", "table-responsive");
//   //   table_container.setAttribute("id", "table-container");
//   //
//   //   let table = document.createElement("table");
//   //   table.setAttribute("class", "code-table table");
//   //
//   //   table_container.appendChild(table);
//   //
//   //   let tbdy = document.createElement('tbody');
//   //   let header = table.createTHead();
//   //   let row = header.insertRow(0);
//   //   let cellSiteName = row.insertCell(0);
//   //   let cellSiteCode = row.insertCell(1);
//   //
//   //   cellSiteName.innerText = "Site URL";
//   //   cellSiteCode.innerText = "Site Code";
//   //
//   //   table.appendChild(tbdy);
//   //
//   //   for (let site in sites_code) {
//   //     let siteCodes = sites_code[site];
//   //     let site_row = tbdy.insertRow();
//   //     let sitesCodeArr = siteCodes.split("@@");
//   //     let cell_site_name_row = site_row.insertCell();
//   //     let cell_site_code_row = site_row.insertCell();
//   //     cell_site_name_row.innerText = site;
//   //     cell_site_code_row.innerText = siteCodes.split("@@");
//   //
//   //
//   //   }
//   //
//   //
//   //   return table_container;
//   // }
//   //
//   // function parseCode(code) {
//   //
//   // }
//   //
//   // function getCode() {
//   //   return new Promise((resolve, reject) => {
//   //
//   //     Communication.getCode().then((code)=> {
//   //       resolve(code);
//   //     })
//   //
//   //   });
//   // }
//   //
//   // function populateHistory() {
//   //   Communication.getCode().then((code)=> {
//   //     let table = buildTable(code);
//   //
//   //     // document.querySelector("main").appendChild(table);
//   //   });
//   // }
//   //
//   // pdw.init = function () {
//   //
//   //   alert("init");
//   //   Communication.getTab().then((tab)=> {
//   //     console.log(tab);
//   //     if (!tab || !tab.url) throw "no tab url";
//   //
//   //     if (tab.url.match(/https?:\/\//g)) {
//   //
//   //       runCode(tab.url);
//   //
//   //
//   //       Events.setConsoleEventListener(mainElements);
//   //     }
//   //   });
//   //
//   // };
//   //
//   //
//   // // document.getElementById("executescript").addEventListener("click", pdw.init);
//   //
//   // chrome.storage.onChanged.addListener((storageUpdate)=> {
//   //   populateHistory();
//   // });
//   //
//   // // pdw.init();
//   //
//   // GLOBAL.pdw = pdw;
//
// })(window.top, window.top.document, window, {
//   "record": true
// });



