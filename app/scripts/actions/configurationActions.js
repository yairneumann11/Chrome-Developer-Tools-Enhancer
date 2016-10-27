'use strict';

import Communication from '../common/Communication'
import Events from '../common/events'
import DOMElements from '../common/DOMElements'


let evt = new Events();

export function toggleCapture(capture){
  return function(dispatch){

    let mainElements = new DOMElements(window);

    capture = !capture;

    capture ? evt.setConsoleEventListener(mainElements) : evt.removeConsoleEventListener(mainElements);

    return dispatch({
      type: "SET_CAPTURE",
      payload:{
        configuration:{
          capture: capture
        }
      }
    });
  }
}

export function setError(msg){
  return function(dispatch){
    console.log("setting error:" + msg);
    return dispatch({
      type: "SET_ERROR",
      payload:{
        configuration:{
          error: msg
        }
      }
    });
  }
}
