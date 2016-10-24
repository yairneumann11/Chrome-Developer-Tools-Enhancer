
import React from "react";

import Storage from "../common/storage";
import Events from "../common/events";
import DOMElements from "../common/DOMElements";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6



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
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {sidebarItems}
          </ReactCSSTransitionGroup>

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
