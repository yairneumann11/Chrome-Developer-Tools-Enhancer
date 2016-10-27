
import React from "react";

import Storage from "../common/storage";
import Events from "../common/events";
import DOMElements from "../common/DOMElements";
import { connect } from "react-redux";

@connect( (store) => {
  return {
    error: store.configuration.configuration.error
  };
})

class Error extends React.Component {

  constructor(props){
    super(props);


    this.events    = new Events();
  }


  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="jumbotron_container">
            <div className="jumbotron">
              <h1 className="display-3">[ :(] Error [ :(]</h1>
              <hr className="m-y-2" />
              <p>{this.props.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
