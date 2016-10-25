'use strict';
import React from "react";
import { connect } from "react-redux";

import ContentCode from "./ContentCode";
import NoCode from "./NoCode";
import Utils from "../common/Utils";

import * as site from '../actions/siteActions'


@connect( (store) => {
  return {
    site: store.site.site,
    chrome_storage: store.chrome_storage.chrome_storage
  };
})

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
  componentWillMount(){
    this.props.dispatch(site.getSitesCode());
  }


  toggleLoader(){
    this.setState(
      {loaded: true}
    )
  }

  render() {
    Utils.log("App Render");
    Utils.log(this);
    let site = this.props.site;

    if( !this.props.chrome_storage ){
      return <NoCode />
    }else{
    return (
      <div className="container-fluid">
          <ContentCode code={this.props.code} setSelectedSite={this.props.setSelectedSite} selectedSite={this.props.selectedSite} componentLoaded={this.toggleLoader} />
      </div>
    )}
  }
}





export default App;


