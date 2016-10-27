import * as configuration from '../actions/configurationActions'
import { connect } from "react-redux";
import store from "../store";


class DOMElements {
  constructor(window) {

    try{
      var topDocument       = window.top.document;
      var topWindow         = window.top;
      var codeMessages      = topDocument.querySelector('.console-group-messages');
      var consoleContainer  = topDocument.getElementById('console-prompt');

    }catch(e){
      store.dispatch(configuration.setError("initialize chrome with the following flags - --disable-web-security --user-data-dir"));
      return console.error ("initialize chrome with the following flags - --disable-web-security --user-data-dir")

    }

    if( !consoleContainer ){
      store.dispatch(configuration.setError("please open the console for the extension to work"));
      return console.error( "please open the console for the extension to work" )
    }

    return {
      topDocument : topDocument,
      topWindow : topWindow,
      window : window,
      codeMessages: codeMessages,
      consoleContainer: consoleContainer
    }

  }

}

export default DOMElements;
