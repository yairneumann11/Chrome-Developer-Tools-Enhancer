'use strict';

import Communication from '../common/Communication'
import Storage from '../common/Storage'
import Utils from '../common/Utils'

export function setSite(site, code){
  return ({
    type: "SELECT_SITE",
    payload:{
      site_url:  site,
      code: code
    }
  });
}


export function getSitesCode(){
  return function(dispatch){
    Communication.getCode().then((code)=>{
      return dispatch( {  type: "CHROME_STORAGE_DATA", payload:code} );
    });
  }
}

export function deleteSiteCode(url, codeIndex, allSiteCode,cb){
  return function(dispatch){
    let newCode;
    try{
      codeIndex = parseInt(codeIndex.split("_")[1]);

      if( Utils.isNumeric(codeIndex) ){

        allSiteCode.splice(codeIndex, 1);

        if( !allSiteCode.length ){
          // last code item in site, remove site from storage
          chrome.storage.local.remove(url,(status)=>{
            console.log(status)
          })
        }else{
          // remove code from site
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

    return dispatch( {  type: "DELETE_SITE_CODE", payload: {
        code: allSiteCode,
        site_url: url
      }
    })

  }
}

export function saveSiteCode(code){
  return function(dispatch){
    Communication.getTab().then((tab)=> {

      let tabUrl = tab.url;

      if (tab && tab.url && code) {
        Storage.setUrlCode(tabUrl, code, (timestamp)=> {
          console.log("code saved");

          Storage.getCode().then( (code)=>{
            return dispatch( {  type: "SAVE_SITE_CODE", payload: {
                code: code[tab.url],
                site_url: tab.url
              }
            })
          });
        });
      }
    });
  }
}

export function getFirstSiteCode(){
  return function(dispatch){
    Communication.getCode().then((code)=>{
      let sites = Object.keys(code);
      if( !sites.length ) {
        code = {};
      }else{
        code = code[sites[0]];
      }
      return dispatch( {
        type: "CHROME_STORAGE_FIRST_SITE_CODE",
        payload:{
          site_url:  sites[0],
          code: code
        }
      });
    });
  }
}

export function getSiteCode(site){
  return function(dispatch){
    Communication.getCode().then((code)=>{
      if(typeof site === "string" ) {
        return dispatch(
          {  type: "CHROME_STORAGE_SITE_CODE",
            payload:code[site]
          });
      }
    })
  }
}

export function getAllCode(){
  return function(dispatch){
    Communication.getCode().then((code)=>{
      dispatch( {  type: "CHROME_STORAGE_DATA", payload:code} );
    });
  }
}

