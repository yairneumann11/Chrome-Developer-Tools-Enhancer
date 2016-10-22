'use strict';
import React from "react";
import ReactDOM from "react-dom";
import Communication from "./communication";
// import Storage from "./storage";
// import Events from "./events";
// import DOMElements from "./DOMElements";
import NoCode from "./NoCode";
import ContentCode from "./ContentCode";
import Loader from "./Loader";
import Storage from "./Storage";

class App extends React.Component {

  constructor(props){
    super(props);
    console.log(this);


    this.toggleLoader = this.toggleLoader.bind(this);

    chrome.storage.onChanged.addListener((storageUpdate)=> {
      this.update(storageUpdate);
    });

  }
  setStartingState() {
    console.log("componentDidMount");
    if( this.props.code && Object.keys(this.props.code).length )
    {
      this.setState(
        {
          hasCode:true,
          loaded: false
        }
      );
    }else{
      this.setState(
        {
          hasCode:false,
          loaded: true
        }
      );
      console.log("no code");
    }
  }
  componentWillMount(){
    this.setStartingState();
  }
  update() {
    console.log("app:update");

    Storage.getCode().then((code)=> {

      let codeSites = Object.keys(code);

      if( codeSites.length && !this.state.hasCode )
      {
        this.setState({hasCode:true});
        console.log(code);

        // this.code = code;
      }

      if( !codeSites.length ){
        this.setState({hasCode:false});
        console.log(code);
      }

      console.log("ReactDOM:reander:app")
      ReactDOM.render(
        <App code={code} />,
        document.getElementById('app')
      );

    })
  }

  toggleLoader(){
    this.setState(
      {loaded: true}
    )
  }

  render() {

    return (
      <div className="container-fluid">
        { this.state.loaded ? null: <Loader /> }
        {this.state.hasCode ?
          <ContentCode code={this.props.code} selectedSite="" componentLoaded={this.toggleLoader} /> : <NoCode/>}
      </div>
    );
  }
}

Communication.getCode().then((code)=>{
  ReactDOM.render(
    <App code={code}/>,
    document.getElementById('app')
  );
});
