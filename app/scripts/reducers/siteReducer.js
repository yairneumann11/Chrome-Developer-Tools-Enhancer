export function site (state = {
  selected_site:{
    site_url: "",
    code: []
  }
}, action) {

  switch (action.type) {
    case "CHROME_STORAGE_FIRST_SITE_CODE": {
      return {...state, selected_site: action.payload};
      break;
    }
    case "SELECT_SITE": {
      return {
        ...state,
        selected_site: action.payload
      };
      break;
    }

    case "SAVE_SITE_CODE": {
      return {
        ...state,
        selected_site: action.payload
      };
      break;
    }
    
    case "DELETE_SITE_CODE": {
      return {
        ...state,
        selected_site: action.payload
      };
      break;
    }

  }
  return state
}




export function sites (state = {
    chrome_storage:{},
    storage_loaded: false
}, action) {

  switch (action.type) {
    case "CHROME_STORAGE_DATA": {
      return { 
        ...state,  
        chrome_storage: action.payload.code, 
        storage_loaded: action.payload.storage_loaded 
      };
      break;
    }

  }
  
  switch (action.type) {
    case "CLEAR_STORAGE": {
      return { 
        ...state,  
        chrome_storage: action.payload.code, 
        storage_loaded: action.payload.storage_loaded 
      };
      break;
    }

  }
  return state
}
