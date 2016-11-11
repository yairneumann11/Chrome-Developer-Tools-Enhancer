'use strict';

import Communication from '../common/Communication'
import Storage from '../common/Storage'
import Utils from '../common/Utils'

export function setSite(site, data){
  return function(dispatch){
    if( !site ){
      Communication.getTab().then((tab)=> {
        return dispatch({
          type: "SELECT_SITE",
          payload:{
            site_url:  tab.url,
            code: data.code,
            label: data.label
          }
        })
      })
    }

    return dispatch({
      type: "SELECT_SITE",
      payload:{
        site_url:  site,
        code: data.code,
        label: data.label
      }
    })
  }
}


export function getSitesCode(){
  return function(dispatch){
    Storage.getCode().then((code)=>{
      return dispatch( {
        type: "CHROME_STORAGE_DATA",
        payload:{
          storage_loaded: true,
          code
        }
      });
    });
  }
}

export function deleteSiteCode(url, codeIndex, allSiteCode, allCode,cb){
  return function(dispatch){
    let newCode;
    try{
      codeIndex = parseInt(codeIndex.split("_")[1]);

      if( Utils.isNumeric(codeIndex) ){

        allSiteCode.splice(codeIndex, 1);

        if( !allSiteCode.length ){
          // last code item in site, remove site from storage
          chrome.storage.local.remove(url,(status)=>{
            console.log(status);
            delete allCode[url];
            let sites = Object.keys(allCode);
            if( sites.length ){
              return dispatch( {  type: "DELETE_SITE_CODE", payload: {
                  code: allCode[sites[0]],
                  site_url: sites[0]
                }
              })
            }
          })
        }else{
          // remove code from site
          newCode = {};
          newCode[url] = allSiteCode;
          chrome.storage.local.set( newCode ,(status)=>{
            console.log(status);

            return dispatch( {  type: "DELETE_SITE_CODE", payload: {
                code: allSiteCode,
                site_url: url
              }
            })

          })
        }

      }
    }catch (e){
      console.log(e.message);
    }
  }
}

export function saveSiteCode(code){

  let site_obj = {
    code: [],
    site_url: "",
    label: ""
  };

  return function(dispatch){
    Communication.getTab().then((tab)=> {

      let tabUrl = tab.url;
      if (tab && tab.url && code) {

        site_obj = {
          code: code,
          site_url: tab.url,
          label: tab.url
        };

        Storage.setUrlCode(tabUrl, site_obj, (timestamp)=> {
          console.log("code saved");

          Storage.getCode().then( (code)=>{
            return dispatch( {  type: "SAVE_SITE_CODE", payload: {
                code: code[tab.url].code,
                site_url: tab.url,
                label: code[tab.url].label
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

export function deleteAllCode(){
  return function(dispatch){
    chrome.storage.local.clear( ()=>{
      dispatch( {  type: "CLEAR_STORAGE", payload:{
        code:{},
        storage_loaded:true
      }});
    })
  }
}

