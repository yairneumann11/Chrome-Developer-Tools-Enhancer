import Communication from "./communication";

class Storage {
  constructor(window) {

  }

  static clear() {
    chrome.storage.sync.clear();
  }

  static onStorageChange(fn) {
    chrome.storage.onChanged.addListener((storageUpdate)=> {
      fn(storageUpdate);
    });

  }

  static setUrlCode(url,code, cb){

    Communication.getCode(url).then((savedCode)=>{
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
      chrome.storage.sync.set(obj, () => {
        cb();
      });
    })

  }
}

export default Storage;
