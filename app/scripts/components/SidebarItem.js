
import React from "react";
import { connect } from "react-redux";
import * as site from '../actions/siteActions'

import Storage from "../common/storage";
import Events from "../common/events";
import DOMElements from "../common/DOMElements";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import classNames from 'classnames';



@connect( (store) => {
  return {
    chrome_storage: store.chrome_storage.chrome_storage,
    selected_site: store.site.selected_site
  };
})

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this);

  }

  setSelectedSite(){
    let code = this.props.code;
    let site_url = this.props.site_url;

    this.props.dispatch( site.setSite(site_url, code) );

  }

  render(){

    var cls = classNames(
      "nav-link",
      "truncate",
      { "selected-nav-link": this.props.site_url === this.props.selected_site.site_url }
    );

    return <a className={cls} onClick={this.setSelectedSite.bind(this)} >{this.props.site_url}</a>
  }

}

export default SidebarItem;
