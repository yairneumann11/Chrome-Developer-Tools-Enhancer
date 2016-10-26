
import React from "react";
import { connect } from "react-redux";

import brace from 'brace';
import AceEditor from 'react-ace';
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
class CodeItem extends React.Component {

  constructor(props){
    super(props);

    this.saveCodeToState = this.saveCodeToState.bind(this);
    this.runCode = this.runCode.bind(this);
    this.events = new Events();
    this.editorCode = this.props.selected_site.code;

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

export default CodeItem;
