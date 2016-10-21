
import React from "react";
// import ReactDOM from "react-dom";
// import Communication from "./communication";
import Storage from "./storage";
import Events from "./events";
import DOMElements from "./DOMElements";


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
