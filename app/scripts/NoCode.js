
import React from "react";
// import ReactDOM from "react-dom";
// import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import DOMElements from "./DOMElements";


let mainElements = new DOMElements(window);

class NoCode extends React.Component {

  constructor(props){
    super(props);

    this.runScript = this.runScript.bind(this);
    this.events    = new Events();
  }

  runScript(e) {
    let code = "console.log('hello PDW')";
    this.events.emmitInitialScript(mainElements, code);
    this.events.setCode(mainElements,e,code);
    this.events.setConsoleEventListener(mainElements);

  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="jumbotron_container">
            <div className="jumbotron">
              <h1 className="display-3">[ :(] No code was found</h1>
              <hr className="m-y-2" />
              <p>Press here to run some dummy code</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" id="exampleScript" onClick={this.runScript} role="button">console.log("hello world")</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoCode;
