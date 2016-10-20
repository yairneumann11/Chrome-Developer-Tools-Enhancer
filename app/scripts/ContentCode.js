
import React from "react";
import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import Sidebar from "./Sidebar";
import CodeTable from "./CodeTable";

class ContentCode extends React.Component {

  constructor(props){
    super(props);
    console.log(this)

  }

  render() {
    return (
      <div className="content_container">
        <div className="row">
          <div className="col-sm-4">
            <Sidebar  code={this.props.code} />
          </div>
          <div className="col-sm-8">
            <CodeTable code={this.props.code}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentCode;
