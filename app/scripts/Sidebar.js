
import React from "react";
// import ReactDOM from "react-dom";
// import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import DOMElements from "./DOMElements";

let mainElements = new DOMElements(window);

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.toggleRecording = this.toggleRecording.bind(this);
    this.events = new Events();

  }


  toggleRecording(){
    if( !this.props.capture ){
      this.events.setConsoleEventListener(mainElements);
    }else{
      this.events.removeConsoleEventListener(mainElements);
    }

    this.props.toggleCapture();


  }

  clearCodes() {
    Storage.clear();

  }

  renderSidebarItems(codes) {
    let codesArr = Object.keys(codes);

    return codesArr.length && codesArr.map((site, index) =>{
        let siteCode = codesArr[site];

        return <SidebarItem key={index} site={site} code={siteCode} setSelectedSite={this.props.setSelectedSite.bind(null, site)} />
      }, this);

  }

  render() {

    let sidebarItems = this.renderSidebarItems(this.props.code);

    return (
      <div >
        <h3 className="page-header">
          Sites
          <i onClick={this.clearCodes} className="fa fa-trash header_icon delete_code"></i>
          <i onClick={this.toggleRecording} className={this.props.capture ? "fa fa-pause header_icon capture" : "fa fa-camera-retro header_icon capture"}></i>
        </h3>
        <hr></hr>
        <nav className="nav nav-pills nav-stacked">
          {sidebarItems}
        </nav>
      </div>
    );
  };

}

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);

  }

  render(){
    return <a className="nav-link truncate" onClick={this.props.setSelectedSite} >{this.props.site}</a>
  }

}

export default Sidebar;
