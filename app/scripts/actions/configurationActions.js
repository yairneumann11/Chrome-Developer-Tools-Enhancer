'use strict';

import Communication from '../common/Communication'
import Events from '../common/events'
import DOMElements from '../common/DOMElements'

export function toggleCapture(capture){

  let evt = new Events();
  let mainElements = new DOMElements(window);

  capture ? evt.setConsoleEventListener(mainElements) : evt.removeConsoleEventListener(mainElements);

  capture = !capture;

    return ({
      type: "SET_CAPTURE",
      payload:{
        configuration:{
          capture: capture
        }
      }
    });
}
