import Communication from "./communication";

class Storage {
  constructor(window) {

  }

  static clear() {
    chrome.storage.local.clear();
  }

  static onStorageChange(fn) {
    chrome.storage.onChanged.addListener((storageUpdate)=> {
      fn(storageUpdate);
    });

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

  static setUrlCode(url,code, cb){

    this.getCode(url).then((savedCode)=>{
      let timestamp = (new Date).getTime();

      if( Object.keys(savedCode).length === 0 )
      {
        code = code + "$$$" + timestamp;

      }else{

        let newCode = code + "$$$" + timestamp + "@@@" + savedCode[url];
        code = newCode;
      }

      let obj = {};
      obj[url]= code;
      chrome.storage.local.set(obj, () => {
        cb();
      });
    })

  }
}

export default Storage;
