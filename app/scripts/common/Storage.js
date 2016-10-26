import Utils from "./Utils";

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

  static deleteUrlCode(url, codeIndex, allSiteCode,cb){
    let newCode;
    try{
      codeIndex = parseInt(codeIndex.split("_")[1]);
      if( Utils.isNumeric(codeIndex) ){

        console.log(allSiteCode);
        allSiteCode.splice(codeIndex, 1);



        if( !allSiteCode.length ){
          chrome.storage.local.remove(url,(status)=>{
            console.log(status)
          })
        }else{
          newCode = {};
          newCode[url] = allSiteCode;
          chrome.storage.local.set( newCode ,(status)=>{
            console.log(status)
          })
        }

      }
    }catch (e){
      console.log(e.message);
    }
  }

  static setUrlCode(url,code, cb){

    this.getCode(url).then((savedCode)=>{
      let timestamp = (new Date).getTime();
      let output;
      let newCodeArr = [timestamp, code];



      if( savedCode && savedCode[url] ){
        savedCode[url].push(newCodeArr);
        output = savedCode;
      }else{
        output = {};
        output[url] = [newCodeArr];
      }

      chrome.storage.local.set(output, () => {
        cb(timestamp);
      });

    })

  }
}

export default Storage;
