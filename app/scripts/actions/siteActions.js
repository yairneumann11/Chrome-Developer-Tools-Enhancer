'use strict';


export function setSite(site){
  return {
    type: "SET_SITE",
    site: site
  }
}

export function getSite(){
  return {
    type: "GET_SITE",
    site: "http://foo.com"
  }
}
