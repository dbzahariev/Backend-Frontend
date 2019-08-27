import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from "../config/types";

import axios from "axios";
import { headersConfig } from "../config/database";
import { setAlert } from "./alert";
import setAuthToken from "../Helpers/setAuthToken";

//Login user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Registration User
export const register = formData => async dispatch => {
  const body = JSON.stringify({
    name: formData.username,
    email: formData.email,
    password: formData.password
  });

  try {
    const res = await axios.post("/api/users", body, headersConfig);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Register success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch({ type: REGISTER_FAIL });
  }
};

//Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({
    email: email,
    password: password
  });

  try {
    const res = await axios.post("/api/auth", body, headersConfig);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch({ type: LOGIN_FAIL });
  }
};
