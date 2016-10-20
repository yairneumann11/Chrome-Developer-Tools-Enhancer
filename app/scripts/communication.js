class Communication {
  constructor() {

  }


  static getCode(url) {

    return new Promise((resolve, reject) => {

      if (url) {
        chrome.storage.sync.get(url, (response)=> {
          resolve(response);
        });

      } else {
        chrome.storage.sync.get((response)=> {
          resolve(response);
        });

      }


    });
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
