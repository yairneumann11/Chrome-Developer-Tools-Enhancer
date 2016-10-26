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
    case "SET_SITE_CODE": {
      return {
        ...state,
        selected_site: action.payload
      }
      break;
    }
  }
  return state
}




export function sites (state = {
  chrome_storage:{}
}, action) {

  switch (action.type) {
    case "CHROME_STORAGE_DATA": {
      return {...state,  chrome_storage: action.payload};
      break;
    }

  }
  return state
}
