
import React from "react";

import { connect } from "react-redux";
import * as site from '../actions/siteActions'


import Communication from "../common/communication";
import Storage from "../common/storage";
import Events from "../common/events";
import Sidebar from "./Sidebar";
import CodeTable from "./CodeTable";

import classNames from 'classnames';


@connect( (store) => {
  return {
    selected_site: store.site.selected_site,
    chrome_storage: store.chrome_storage.chrome_storage,
    configuration: store.configuration.configuration

  };
})
class ContentCode extends React.Component {

  constructor(props){
    super(props);
    console.log(this);

    this.setSelectedSite = this.setSelectedSite.bind(this);

  }

  setInitialStoreSite(){

    if( !this.props.selected_site.site_url && this.props.chrome_storage )     {
      let chrome_storage = this.props.chrome_storage;
      let firstSite = Object.keys(chrome_storage)[0];
      this.props.dispatch(site.setSite( firstSite, chrome_storage[firstSite]  ));
    }

  }


  componentWillMount(){

  }

  componentDidMount(){
    this.setInitialStoreSite();

    console.log("componentDidMount!!!!!!");
  }

  setSelectedSite(site) {

    this.setState({
      selectedSite: site
    });

    console.log(this);

  }

  render() {

    var cls = classNames(
      "content_container",
      { "capture-frame": this.props.configuration.capture }
    );

    return (
      <div className={cls}>
        <div className="row">
        </div>
        <div className="row">
          <div className="col-sm-4">
            <Sidebar code={this.props.code} setSelectedSite={this.props.setSelectedSite}   />
          </div>
          <div className="col-sm-8">
            <CodeTable code={this.props.code} selectedSite={this.props.selectedSite}  />
          </div>
        </div>
      </div>
    );
  }
}

export default ContentCode;
