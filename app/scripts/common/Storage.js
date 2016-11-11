import Utils from "./Utils";
import * as site from '../actions/siteActions'
import { connect } from "react-redux";
import store from "../store";

class Storage {
  constructor(window) {

  }

  static clear() {
    chrome.storage.local.clear();
    store.dispatch(site.deleteAllCode())
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

  static setUrlCode(selected_site_url,data, cb){

    this.getCode(selected_site_url).then((savedCode)=>{
      let timestamp = (new Date).getTime();
      let output;
      let newCodeArr = [timestamp, data.code];



      if( savedCode && savedCode[selected_site_url] ){
        savedCode[selected_site_url].code.push(newCodeArr);
        output = savedCode;
      }else{
        output = {};
        output[selected_site_url] = {
          code: [newCodeArr],
          label: "label_" + selected_site_url
        }
      }

      chrome.storage.local.set(output, () => {
        cb(timestamp);
      });

    })

  }
}

export default Storage;
