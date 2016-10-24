
import React from "react";

import Storage from "../common/storage";
import Events from "../common/events";
import DOMElements from "../common/DOMElements";


class Loader extends React.Component {

  constructor(props){
    super(props);

    this.events    = new Events();
  }



  render() {
    return (
      <div className="overlay">
        <div className="loading-spinner">
          <i className="fa fa-spinner" ></i>
        </div>
      </div>
    );
  }
}

export default Loader;
