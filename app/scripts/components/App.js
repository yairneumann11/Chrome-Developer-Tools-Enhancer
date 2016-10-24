'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Communication from "../common/communication";
// import Storage from "./storage";
// import Events from "./events";
// import DOMElements from "./DOMElements";
// import NoCode from "./NoCode";
import ContentCode from "./ContentCode";
import Loader from "./Loader";
import Utils from "../common/Utils";
import Storage from "../common/Storage";



class App extends React.Component {

  constructor(props){
    super(props);
console.log(this);


    this.toggleLoader = this.toggleLoader.bind(this);

    // chrome.storage.onChanged.addListener((storageUpdate)=> {
    //   this.update(storageUpdate);
    // });

  }
  setStartingState() {
    Utils.log("App:componentDidMount");
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

    }
  }



  toggleLoader(){
    this.setState(
      {loaded: true}
    )
  }

  render() {
    Utils.log("App Render");
    return (
      <div className="container-fluid">
          <ContentCode code={this.props.code} setSelectedSite={this.props.setSelectedSite} selectedSite={this.props.selectedSite} componentLoaded={this.toggleLoader} />
      </div>
    );
  }
}





export default App;


