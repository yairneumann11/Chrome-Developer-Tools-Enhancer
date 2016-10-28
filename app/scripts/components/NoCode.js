
import React from "react";

import store from "../store";
import * as site from '../actions/siteActions'
import * as configuration from '../actions/configurationActions'
import { connect } from "react-redux";

import Storage from "../common/storage";
import Events from "../common/events";
import DOMElements from "../common/DOMElements";


let mainElements = new DOMElements(window);

class NoCode extends React.Component {

  constructor(props){
    super(props);

    this.runScript = this.runScript.bind(this);
    this.events    = new Events();
  }

  runScript(e) {
    let code = "console.log('hello PDW')";
    store.dispatch(configuration.toggleCapture(false));
    // this.events.setConsoleEventListener(mainElements);
    this.events.emmitScript(code);
    // this.events.setCode(mainElements,e,code);
    // store.dispatch(site.saveSiteCode(code));
    store.dispatch( site.saveSiteCode(code) );

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
