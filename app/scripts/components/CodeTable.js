
import React from "react";

import brace from 'brace';
import AceEditor from 'react-ace';

import { connect } from "react-redux";
import * as site from '../actions/siteActions'


import CodeItem from './CodeItem';
import Events from '../common/events';
import Storage from '../common/Storage';
import Utils from '../common/Utils';



import 'brace/mode/java';
import 'brace/theme/github';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6




@connect( (store) => {
  return {
    chrome_storage: store.chrome_storage.chrome_storage,
    selected_site: store.site.selected_site
  };
})
class CodeTable extends React.Component {

  constructor(props){
    super(props);
    this.events = new Events();
    this.runAll = this.runAll.bind(this);
  }


  renderCodeTableItems(codes, site_url) {
    let siteCodesArr = this.props.code[this.props.selectedSite];
    // let codeSessions = this.parseCodeString(codeSessionsStr);

    return codes.map((codeSessionArr, index) =>{
        let siteCode  = codeSessionArr[1];
        let timestamp = codeSessionArr[0];

        return <CodeItem key={index} uniquq_id={"code_" + index} index={index} timestamp={timestamp} allSiteCode={siteCodesArr} site={site_url} code={siteCode}  />
      }, this);

  }

  runAll(){
    let code = this.props.selected_site.code;
    if( code ){
      for (let i = 0; i < code.length; i++) {
        let site = code[i];
        this.events.emmitScript(site[1]);
      }
    }else{
      throw 'state code not defined';
    }
  }

  render() {

    let code = this.props.selected_site.code;
    let site_url = this.props.selected_site.site_url;

     let codeItems = this.renderCodeTableItems(code, site_url);

    return (

        <div className="code-container">
          <header>
            <h3 className="page-header">{this.props.selected_site.site_url}
              <i onClick={this.runAll} className="fa fa-play header_icon play"></i>
            </h3>
          </header>
          <hr/>

          <main>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {codeItems}
            </ReactCSSTransitionGroup>
          </main>
        </div>
    );
  }
}

export default CodeTable;
