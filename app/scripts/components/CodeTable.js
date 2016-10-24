
import React from "react";

import brace from 'brace';
import AceEditor from 'react-ace';
import Events from '../common/events';
import Storage from '../common/Storage';
import Utils from '../common/Utils';

import 'brace/mode/java';
import 'brace/theme/github';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6



class CodeItem extends React.Component {

  constructor(props){
    super(props);

    this.saveCodeToState = this.saveCodeToState.bind(this);
    this.runCode = this.runCode.bind(this);
    this.events = new Events();
    this.editorCode = this.props.code;

  }

  componentWillMount(){

    this.setState({
      code: this.props.code
    });
    console.log(this);
  }

  parseDate(time){
    time = parseInt(time);
    return new Date(time);
  }

  saveCodeToState(code){
    this.editorCode = code;
    console.log(code);
  }

  runCode(){
    if( this.editorCode ){
      this.events.emmitScript(this.editorCode);
    }else{
      throw 'state code not defined';
    }

  }

  setEditorCode(){
    this.editorCode = this.props.code;
  }

  deleteCode(codeIndex){
    Storage.deleteUrlCode(this.props.site, codeIndex, this.props.allSiteCode ,(status)=>{
      console.log(status)
    });


  }

  render() {

    let time = this.parseDate(this.props.timestamp);
    this.setEditorCode();
    return (
      <div className="code-editor-container">
        <small>{this.props.index + ". " + time}
          <i onClick={this.runCode} className="fa fa-play play margin-left"></i>
          <i onClick={this.deleteCode.bind(this, this.props.uniquq_id)} className="fa fa-trash header_icon delete_code"></i>
        </small>
        <hr/>
        <AceEditor
          theme="github"
          name={this.props.uniquq_id}
          mode="javascript"
          maxLines={50}
          width="100%"
          onChange={this.saveCodeToState}
          editorProps={{$blockScrolling: true}}
          value={this.editorCode}
        />
        <hr/>
      </div>


    );
  }
}


class CodeTable extends React.Component {

  constructor(props){
    super(props);
    this.events = new Events();
    this.runAll = this.runAll.bind(this);
  }

  // parseCodeString(str){
  //   let codesArr = [];
  //   if(str){
  //     str.split("@@@").map((item, index)=>{
  //       let codeArr   = item.split("$$$");
  //       let code      = codeArr[1];
  //       let timestamp = codeArr[0];
  //       codesArr.push([timestamp, code])
  //     })
  //
  //   }
  //   return codesArr;
  // }

  renderSidebarItems(codes) {
    let siteCodesArr = this.props.code[this.props.selectedSite];
    // let codeSessions = this.parseCodeString(codeSessionsStr);

    return siteCodesArr && siteCodesArr.length && siteCodesArr.map((codeSessionArr, index) =>{
        let siteCode  = codeSessionArr[1];
        let timestamp = codeSessionArr[0];

        return <CodeItem key={index} uniquq_id={"code_" + index} index={index} timestamp={timestamp} allSiteCode={siteCodesArr} site={this.props.selectedSite} code={siteCode}  />
      }, this);

  }

  runAll(){
    if( this.props.code[this.props.selectedSite] ){
      for (let i = 0; i < this.props.code[this.props.selectedSite].length; i++) {
        let site = this.props.code[this.props.selectedSite][i];
        this.events.emmitScript(site[1]);
      }
    }else{
      throw 'state code not defined';
    }
  }

  render() {

     let codeItems = this.renderSidebarItems(this.props.code);

    return (



        <div className="code-container">
          <header>
            <h3 className="page-header">{this.props.selectedSite}
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
