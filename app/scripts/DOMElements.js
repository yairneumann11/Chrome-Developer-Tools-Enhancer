class DOMElements {
  constructor(window) {

    try{
      var topDocument = window.top.document;
      var topWindow = window.top;
      
    }catch(e){
      throw "initialize chrome with the following flags - --disable-web-security --user-data-dir"
    }


    return {
      topDocument : topDocument,
      topWindow : topWindow,
      window : window
    }
    
  }

}

export default DOMElements;
