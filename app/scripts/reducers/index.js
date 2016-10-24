import {combineReducers} from 'redux';
import {routerReducer} from "react-router-redux";

import {sites} from "./sites";

const rootReducer = combineReducers({sites, routing : routerReducer});

export default rootReducer;


