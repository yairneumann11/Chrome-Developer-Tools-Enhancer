'use strict';

import Communication from '../common/Communication'
import Events from '../common/events'
import DOMElements from '../common/DOMElements'

export function toggleCapture(capture){
  return function(dispatch){
    let evt = new Events();
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
