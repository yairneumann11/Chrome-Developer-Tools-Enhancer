import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as site from './actions/siteActions'
import reducer from './reducers';


function myServiceMiddleware(myService) {
  return ({ dispatch, getState }) => next => action => {
    if (action.type == 'SAVE_SITE_CODE'  ||  action.type == 'DELETE_SITE_CODE') {
      dispatch( site.getSitesCode() );
      // myService.doSomethingElse().then(result => dispatch({ type: 'SOMETHING_ELSE', result }))
    }
    return next(action);
  }
}

const serviceMiddleware = myServiceMiddleware(myService)

function myService(){
  console.log(arguments);
}

const middleware = applyMiddleware(promise(),thunk,   logger(), serviceMiddleware);

export default createStore(reducer, middleware);
