export function site (state = {
  site:{
    site_url: "",
    code: []
  }
}, action) {

  switch (action.type) {
    case "CHROME_STORAGE_FIRST_SITE_CODE": {
      return {...state, site: action.payload};
      break;
    }
    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
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
