
import React from "react";

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';
// import Configuration from "Configuration.json"


class CodeItem extends React.Component {

  constructor(props){
    super(props);

  }

  parseDate(time){
    time = parseInt(time);
    return new Date(time);
  }

  saveCodeToState(code){
    console.log(code);
  }

  render() {

    let time = this.parseDate(this.props.timestamp);

    return (
      <div>
        <small>{this.props.index + ". " + time}<i className="fa fa-play play margin-left"></i></small>
        <hr/>
        <AceEditor
          mode="java"
          theme="github"
          name={this.props.uniquq_id}
          mode="javascript"
          maxLines={50}
          width="100%"
          onChange={this.saveCodeToState}
          editorProps={{$blockScrolling: true}}
          value={this.props.code}
        />
        <hr/>
      </div>


    );
  }
}


class CodeTable extends React.Component {

  constructor(props){
    super(props);

  }

  parseCodeString(str){
    let codesArr = [];
    if(str){
      str.split("@@@").map((item, index)=>{
        let codeArr   = item.split("$$$");
        let code      = codeArr[1];
        let timestamp = codeArr[0];
        codesArr.push([timestamp, code])
      })

    }
    return codesArr;
  }

  renderSidebarItems(codes) {
    let codeSessionsStr = this.props.code[this.props.selectedSite];
    let codeSessions = this.parseCodeString(codeSessionsStr);

    return codeSessions.length && codeSessions.map((codeSessionArr, index) =>{
        let siteCode  = codeSessionArr[0];
        let timestamp = codeSessionArr[1];

        return <CodeItem key={index} uniquq_id={"pdw_code_" + index} index={index} timestamp={timestamp} site={this.props.selectedSite} code={siteCode}  />
      }, this);

  }

  render() {

     let codeItems = this.renderSidebarItems(this.props.code);

    return (



        <div className="code-container">
          <header>
            <h3 className="page-header">{this.props.selectedSite}
              <i onClick={this.clearCodes} className="fa fa-play header_icon play"></i>
            </h3>
          </header>
          <hr/>

          <main>

            {codeItems}

          </main>

        </div>



    );
  }
}

export default CodeTable;
