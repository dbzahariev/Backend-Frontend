import { SET_LOADING, LOGS_ERROR, GET_LOGS, ADD_LOG } from "../actions/types";

const initialState = { logs: null, current: null, loading: false, error: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      return { ...state, logs: action.payload, loading: false };
    }

    case SET_LOADING:
      return { ...state, loading: true };

    case ADD_LOG:
      return {
        ...state,
        logs: [...state.logs, action.payload],
        loading: false
      };

    case LOGS_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
