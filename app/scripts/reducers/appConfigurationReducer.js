export function configuration (state = {
  configuration:{
    capture: false
  }
}, action) {

  switch (action.type) {
    case "SET_CAPTURE": {
      return {...state,
          configuration:{
            capture: action.payload.configuration.capture
          }
      };
      break;
    }
  }
  return state
}

