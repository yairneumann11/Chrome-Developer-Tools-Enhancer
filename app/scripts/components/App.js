'use strict';
import React from "react";
import { connect } from "react-redux";

import Error from "./Error";
import ContentCode from "./ContentCode";
import NoCode from "./NoCode";
import Loader from "./Loader";
import Utils from "../common/Utils";

import * as site from '../actions/siteActions'
import * as configuration from '../actions/configurationActions'


@connect( (store) => {
  return {
    site: store.site.selected_site,
    chrome_storage: store.chrome_storage.chrome_storage,
    storage_loaded: store.chrome_storage.storage_loaded,
    error: store.configuration.configuration.error
  };
})

class App extends React.Component {

  constructor(props){
    super(props);



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

    if( this.props.error ){
      return <Error />
    }else{
      if( !this.props.storage_loaded ){
        return <Loader />
      }

      if( !Object.keys(this.props.chrome_storage).length ){
        return <NoCode />
      }else{
        return (
          <div className="container-fluid">
            <ContentCode code={this.props.code} setSelectedSite={this.props.setSelectedSite} selectedSite={this.props.selectedSite} componentLoaded={this.toggleLoader} />
          </div>
        )}
    }



  }
}

export default App;
