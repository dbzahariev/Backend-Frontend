/* eslint-disable */

import { REMOVE_ALERT, SET_ALERT } from "../types";

import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import React from "react";
import uuid from "uuid";

const AlertStates = props => {
  const initialState = [];
  const [state, dispatch] = React.useReducer(AlertReducer, initialState);

  // Set alert
  const setAlert = (msg, type, timeout = 3000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertStates;
