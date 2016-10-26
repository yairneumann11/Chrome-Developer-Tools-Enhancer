'use strict';

import Communication from '../common/Communication'
import Storage from '../common/Storage'

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

export function saveSiteCode(code){
  return function(dispatch){
    Communication.getTab().then((tab)=> {
      console.log(tab.url);
      console.log(code);
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

          } );
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

