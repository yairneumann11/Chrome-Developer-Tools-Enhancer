import Communication from "./communication";
import Storage from "./storage";


class Events {
  constructor() {

  }

  static codeEvalListener(mainElements, e, code){

    if( e.keyCode == 13 )
    {


      let codeMessages  = mainElements.topDocument.querySelector('.console-group-messages');
      if( codeMessages && codeMessages.children &&  codeMessages.children.length){
        let messages = codeMessages.children;
        let lstMessage = messages[messages.length - 1];

        if( lstMessage.className.indexOf("console-error-level") > -1) throw "unvalid JS";
      }

      Communication.getTab().then((tab)=>{
        console.log(tab.url);
        console.log(code);
        let tabUrl = tab.url;
        if( tab && tab.url && code )
        {
          Storage.setUrlCode(tabUrl, code, ()=>{
            console.log("code saved");
          });
        }
      });

    }

}


}

export default Events;
