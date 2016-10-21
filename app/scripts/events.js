import Communication from "./communication";
import Storage from "./storage";
import DOMElements from "./DOMElements";



class Events {
  constructor() {


    this.consoleFunction = this.consoleFunction.bind(this)
  }


  removeConsoleEventListener(mainElements){
    mainElements.consoleContainer.removeEventListener('keydown', this.consoleFunction);
  }

  setConsoleEventListener(mainElements) {
    mainElements.consoleContainer.addEventListener('keydown', this.consoleFunction)
  }


  static manageConsoleEventListener(mainElements, action){

    let bindedFn = this.consoleFunction.bind(this, mainElements);

    if(action === "add"){
      mainElements.consoleContainer.addEventListener('keydown', bindedFn, true);
    }else if(action === "remove")
    {
      mainElements.consoleContainer.removeEventListener('keydown', bindedFn, true);
    }

  }



  emmitInitialScript(mainElements, script) {

    mainElements.consoleContainer.innerText = script;

    var eventObj = new mainElements.topWindow.Event("keydown");

    eventObj.keyCode = 13;
    eventObj.key = "Enter";
    eventObj.which = 13;

    mainElements.consoleContainer.parentElement.dispatchEvent(eventObj);

  }

  consoleFunction(e){
    let mainElements = new DOMElements(window);

    let code = mainElements.consoleContainer.innerText;

    setTimeout(()=> {
      try{
        this.codeEvalListener(mainElements, e, code);
      }catch(e){
        throw "unvalid JS"
      }

    }, 100)
  }



  setCode(mainElements, e, code){
    Communication.getTab().then((tab)=> {
      console.log(tab.url);
      console.log(code);
      let tabUrl = tab.url;
      if (tab && tab.url && code) {
        Storage.setUrlCode(tabUrl, code, ()=> {
          console.log("code saved");
        });
      }
    });
  }

  codeEvalListener(mainElements, e, code) {

    if (e.keyCode == 13) {


      // let mainElements.codeMessages  = mainElements.topDocument.querySelector('.console-group-messages');
      if (mainElements.codeMessages && mainElements.codeMessages.children && mainElements.codeMessages.children.length) {
        let messages = mainElements.codeMessages.children;
        let lstMessage = messages[messages.length - 1];

        if (lstMessage.className.indexOf("console-error-level") > -1) throw "unvalid JS";
      }

      this.setCode(mainElements, e, code);

    }

  }


}

export default Events;
