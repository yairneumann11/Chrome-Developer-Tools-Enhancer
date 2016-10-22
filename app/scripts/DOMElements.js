class DOMElements {
  constructor(window) {

    try{
      var topDocument       = window.top.document;
      var topWindow         = window.top;
      var codeMessages      = topDocument.querySelector('.console-group-messages');
      var consoleContainer  = topDocument.getElementById('console-prompt');

    }catch(e){
      throw "initialize chrome with the following flags - --disable-web-security --user-data-dir"
    }

    if( !consoleContainer ){
      throw "please open the console for the extension to work"
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
