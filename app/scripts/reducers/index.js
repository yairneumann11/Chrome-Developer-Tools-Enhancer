import {combineReducers} from 'redux';


import {site, sites} from "./siteReducer";

export const rootReducer =  combineReducers(
  {
    site:site,
    chrome_storage:sites
  }
);

export default rootReducer;




