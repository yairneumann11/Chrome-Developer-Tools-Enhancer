export function configuration (state = {
  configuration:{
    capture: false,
    error: ""
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
    case "SET_ERROR": {
      return {...state,
        configuration:{
          error: action.payload.configuration.error
        }
      };
      break;
    }
  }
  return state
}

