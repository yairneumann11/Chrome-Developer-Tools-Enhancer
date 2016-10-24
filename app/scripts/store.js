
import {createStore, compose} from "redux";
import {syncHistoryWithStore} from "react-router-redux";
import {rootReducer} from "./reducers/index";


const defaultState = {
  "foo":"bar"
};

const store = createStore(rootReducer, defaultState);
export default store;
