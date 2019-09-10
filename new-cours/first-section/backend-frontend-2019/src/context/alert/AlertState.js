import { REMOVE_ALERT, SET_ALERT } from "../types";
import React, { useReducer } from "react";

import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";

const AlertState = props => {
  const [state, dispatch] = useReducer(AlertReducer, null);

  // Set alert
  const setAlert = (text, type) => {
    dispatch({ type: SET_ALERT, payload: { text, type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
