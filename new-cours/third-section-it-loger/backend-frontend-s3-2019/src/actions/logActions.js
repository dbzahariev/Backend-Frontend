/* eslint-disable no-loop-func */
import { SET_LOADING, GET_LOGS, LOGS_ERROR, ADD_LOG } from "./types";
import axios from "axios";

// Get logs from a server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get("/logs");
    console.log(res);

    dispatch({ type: GET_LOGS, payload: res.data });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: `Path: "${error.response.config.url}" is ${error.response.statusText}`
    });
  }
};

// Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    const res = await axios.post("/logs", log, {
      headers: { "Content-Type": "application/json" }
    });

    dispatch({ type: ADD_LOG, payload: res.data });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: LOGS_ERROR,
        payload: `Path: "${error.response.config.url}" is ${error.response.statusText}`
      });
    } else {
      console.log(error);
    }
  }
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING };
};
