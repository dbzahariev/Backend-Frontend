import { CLEAR_USERS, GET_USER, SEARCH_USERS, SET_LOADING } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
