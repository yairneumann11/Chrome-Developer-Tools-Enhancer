import {combineReducers} from 'redux';


import {site, sites} from "./siteReducer";
import { configuration } from "./appConfigurationReducer";

export const rootReducer =  combineReducers(
  {
    site,
    chrome_storage:sites,
    configuration
  }
);

export default rootReducer;




