import DOMElements from "./DOMElements";

class Communication {
  constructor() {

  }


  static getCode(url) {

    return new Promise((resolve, reject) => {

      if (url) {
        chrome.storage.local.get(url, (response)=> {
          resolve(response);
        });

      } else {
        chrome.storage.local.get((response)=> {
          resolve(response);
        });

      }


    });
  }

  static runCode(code) {
    let mainElements = new DOMElements(window);

    mainElements.consoleContainer.innerText = code;

    if (mainElements.codeMessages && mainElements.codeMessages.children && mainElements.codeMessages.children.length) {
      let messages = mainElements.codeMessages.children;
      let lstMessage = messages[messages.length - 1];

      if (lstMessage.className.indexOf("console-error-level") > -1) throw "unvalid JS";
    }

  }

  static getTab() {

    return new Promise((resolve, reject) => {

      chrome.runtime.sendMessage(
        {
          devtools_get_url: true,
          tab_Id: chrome.devtools.inspectedWindow.tabId
        }, (response) => {
          resolve(response);
        });

    });

  }


}

export default Communication;
